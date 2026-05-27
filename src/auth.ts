// Auth utilities for Cloudflare Workers (Web Crypto API)

import type { Context, Next } from 'hono';
import type { Env, SessionPayload, Variables } from './env';

const COOKIE_NAME = 'session_token';

// --- Constant-time comparison helper ---
// FIX LOW-1: No early exit on length mismatch — length difference is folded into result.
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
    const len = Math.max(a.length, b.length);
    let res = a.length ^ b.length; // length mismatch contributes to result
    for (let i = 0; i < len; i++) {
        res |= (a[i] ?? 0) ^ (b[i] ?? 0);
    }
    return res === 0;
}

// Helper to convert hex string to Uint8Array
function hexToUint8Array(hex: string): Uint8Array {
    const arr = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        arr[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }
    return arr;
}

// --- Password Hashing (PBKDF2) ---

export async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const keyMaterial = await crypto.subtle.importKey(
        'raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']
    );
    // FIX MED-2: 210,000 iterations per NIST SP 800-132 (2023) recommendation
    const hash = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt, iterations: 210000, hash: 'SHA-256' },
        keyMaterial, 256
    );
    const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
    const hashHex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    return `${saltHex}:${hashHex}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
    const parts = stored.split(':');
    if (parts.length !== 2) return false;

    const [saltHex, storedHashHex] = parts;
    const saltMatch = saltHex.match(/.{2}/g);
    if (!saltMatch) return false;

    const salt = new Uint8Array(saltMatch.map(b => parseInt(b, 16)));
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        'raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']
    );
    // FIX MED-2: Same iteration count as hashPassword
    const hash = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt, iterations: 210000, hash: 'SHA-256' },
        keyMaterial, 256
    );

    const computedHash = new Uint8Array(hash);
    const storedHash = hexToUint8Array(storedHashHex);

    // Constant-time comparison
    return timingSafeEqual(computedHash, storedHash);
}

// --- JWT Session Tokens ---

function base64UrlEncode(data: string | object): string {
    const str = typeof data === 'string' ? data : JSON.stringify(data);
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    return atob(str);
}

async function createHmac(message: string, secretKey: string): Promise<Uint8Array> {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        'raw', encoder.encode(secretKey),
        { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
    return new Uint8Array(sig);
}

export async function createSessionToken(userId: number, username: string, secretKey: string): Promise<string> {
    const header = base64UrlEncode({ alg: 'HS256', typ: 'JWT' });
    const payload = base64UrlEncode({
        sub: userId,
        username,
        iat: Math.floor(Date.now() / 1000),
        // FIX MED-1: Reduced from 7 days to 2 hours to limit stolen-token window.
        // For full invalidation, add a KV-backed token blocklist (see README).
        exp: Math.floor(Date.now() / 1000) + (2 * 60 * 60) // 2 hours
    });
    const signature = await createHmac(`${header}.${payload}`, secretKey);
    const signatureHex = Array.from(signature).map(b => b.toString(16).padStart(2, '0')).join('');
    return `${header}.${payload}.${base64UrlEncode(signatureHex)}`;
}

export async function verifySessionToken(token: string, secretKey: string): Promise<SessionPayload | null> {
    try {
        const [header, payload, signatureEncoded] = token.split('.');
        if (!header || !payload || !signatureEncoded) return null;

        const expectedSig = await createHmac(`${header}.${payload}`, secretKey);
        const expectedSigHex = Array.from(expectedSig).map(b => b.toString(16).padStart(2, '0')).join('');
        const expectedSigEncoded = base64UrlEncode(expectedSigHex);

        // Constant-time comparison
        const a = new TextEncoder().encode(expectedSigEncoded);
        const b = new TextEncoder().encode(signatureEncoded);

        if (!timingSafeEqual(a, b)) return null;

        const data = JSON.parse(base64UrlDecode(payload)) as SessionPayload;
        if (data.exp < Math.floor(Date.now() / 1000)) return null;
        return data;
    } catch {
        return null;
    }
}

// --- CSRF Tokens (time-windowed HMAC, 1-hour windows) ---
// FIX CRIT-1: Replaces the hardcoded 'fixed-csrf-token-for-now' with a real HMAC token.
// Token is derived from a per-hour window + JWT_SECRET_KEY — no server state needed.

export async function generateCsrfToken(secret: string): Promise<string> {
    const window = Math.floor(Date.now() / (1000 * 60 * 60));
    const sig = await createHmac(`csrf:${window}`, secret);
    return Array.from(sig).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyCsrfToken(token: string, secret: string): Promise<boolean> {
    if (!token) return false;
    const now = Math.floor(Date.now() / (1000 * 60 * 60));
    // Accept current and previous window to handle hour-boundary edge cases
    for (const w of [now, now - 1]) {
        const sig = await createHmac(`csrf:${w}`, secret);
        const expected = Array.from(sig).map(b => b.toString(16).padStart(2, '0')).join('');
        const a = new TextEncoder().encode(expected);
        const b = new TextEncoder().encode(token);
        if (timingSafeEqual(a, b)) return true;
    }
    return false;
}

// --- Cookie Helpers ---

export function getSessionCookie(cookieHeader: string | undefined): string | null {
    if (!cookieHeader) return null;
    const cookies = cookieHeader.split(';').map(c => c.trim());
    const session = cookies.find(c => c.startsWith(`${COOKIE_NAME}=`));
    if (!session) return null;
    return session.substring(session.indexOf('=') + 1);
}

export function setSessionCookie(token: string): string {
    // FIX: SameSite=Strict (was Lax) — admin panel never needs cross-site cookie sending
    return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${2 * 60 * 60}; Secure`;
}

export function clearSessionCookie(): string {
    return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0; Secure`;
}

// --- Auth Middleware ---

export async function authMiddleware(
    c: Context<{ Bindings: Env; Variables: Variables }>,
    next: Next
): Promise<Response | void> {
    const cookie = getSessionCookie(c.req.header('Cookie'));
    if (!cookie) {
        return c.redirect('/login');
    }
    const session = await verifySessionToken(cookie, c.env.JWT_SECRET_KEY);
    if (!session) {
        return c.redirect('/login');
    }
    c.set('user', session);
    await next();
}
