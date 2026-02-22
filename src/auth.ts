// Auth utilities for Cloudflare Workers (Web Crypto API)

import type { Context, Next } from 'hono';
import type { Env, SessionPayload, Variables } from './env';

const JWT_SECRET_KEY = 'portfolio-secret-key-change-in-production';
const COOKIE_NAME = 'session_token';

// --- Password Hashing (PBKDF2) ---

export async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const keyMaterial = await crypto.subtle.importKey(
        'raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']
    );
    const hash = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
        keyMaterial, 256
    );
    const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
    const hashHex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    return `${saltHex}:${hashHex}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
    const [saltHex, storedHashHex] = stored.split(':');
    const salt = new Uint8Array(saltHex.match(/.{2}/g)!.map(b => parseInt(b, 16)));
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        'raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']
    );
    const hash = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
        keyMaterial, 256
    );
    const hashHex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex === storedHashHex;
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

async function createHmac(message: string): Promise<string> {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        'raw', encoder.encode(JWT_SECRET_KEY),
        { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
    return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function createSessionToken(userId: number, username: string): Promise<string> {
    const header = base64UrlEncode({ alg: 'HS256', typ: 'JWT' });
    const payload = base64UrlEncode({
        sub: userId,
        username,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days
    });
    const signature = await createHmac(`${header}.${payload}`);
    return `${header}.${payload}.${base64UrlEncode(signature)}`;
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
    try {
        const [header, payload, signature] = token.split('.');
        const expectedSig = await createHmac(`${header}.${payload}`);
        if (base64UrlEncode(expectedSig) !== signature) return null;
        const data = JSON.parse(base64UrlDecode(payload)) as SessionPayload;
        if (data.exp < Math.floor(Date.now() / 1000)) return null;
        return data;
    } catch {
        return null;
    }
}

// --- Cookie Helpers ---

export function getSessionCookie(cookieHeader: string | undefined): string | null {
    if (!cookieHeader) return null;
    const cookies = cookieHeader.split(';').map(c => c.trim());
    const session = cookies.find(c => c.startsWith(`${COOKIE_NAME}=`));
    return session ? session.split('=')[1] : null;
}

export function setSessionCookie(token: string): string {
    return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`;
}

export function clearSessionCookie(): string {
    return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
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
    const session = await verifySessionToken(cookie);
    if (!session) {
        return c.redirect('/login');
    }
    c.set('user', session);
    await next();
}
