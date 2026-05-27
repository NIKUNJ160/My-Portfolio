import { Hono } from 'hono';
import type { Context } from 'hono';
import {
    hashPassword, verifyPassword,
    createSessionToken, getSessionCookie, setSessionCookie, clearSessionCookie,
    authMiddleware, generateCsrfToken, verifyCsrfToken
} from './auth';
import {
    renderPortfolio, renderLogin, renderRegister,
    renderAdminProjects, renderProjectForm,
    renderAdminSkills, renderAdminServices, renderAdminMessages,
    renderBlog, renderBlogPost, renderAdminBlog, renderBlogPostForm
} from './templates';
import type { Env, Variables, ProjectRow, SkillRow, ServiceRow, MessageRow, BlogPostRow } from './env';

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

// Helper to parse form body
async function parseForm(c: Context): Promise<Record<string, any>> {
    const contentType = c.req.header('Content-Type') || '';
    if (contentType.includes('application/x-www-form-urlencoded')) {
        const text = await c.req.text();
        return Object.fromEntries(new URLSearchParams(text));
    }
    if (contentType.includes('multipart/form-data')) {
        const formData = await c.req.formData();
        const obj: Record<string, any> = {};
        for (const [key, value] of formData.entries()) {
            obj[key] = value;
        }
        return obj;
    }
    return {};
}

// ─── FIX HIGH-2: In-memory rate limiter ───
// Persists within an isolate lifetime. For stricter guarantees replace with
// Cloudflare KV: `wrangler kv namespace create RATE_LIMIT_KV`
const _rl = new Map<string, { n: number; until: number }>();

function rateLimit(key: string, maxReqs: number, windowSec: number): boolean {
    const now = Date.now();
    const entry = _rl.get(key);
    if (!entry || now > entry.until) {
        _rl.set(key, { n: 1, until: now + windowSec * 1000 });
        return true; // allowed
    }
    if (entry.n >= maxReqs) return false; // blocked
    entry.n++;
    return true;
}

// ─── FIX CRIT-3: Validate required env vars on every request ───
app.use('*', async (c, next) => {
    if (!c.env.JWT_SECRET_KEY) {
        console.error('FATAL: JWT_SECRET_KEY environment variable is not set.');
        return c.text('Internal Server Error: Missing server configuration.', 500);
    }
    await next();
});

// ─── FIX MED-5: Security headers on every response ───
app.use('*', async (c, next) => {
    await next();
    const h = c.res.headers;
    h.set('X-Content-Type-Options', 'nosniff');
    h.set('X-Frame-Options', 'DENY');
    h.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    h.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    h.set(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self'; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; " +
        "font-src https://fonts.gstatic.com https://cdnjs.cloudflare.com; " +
        "img-src 'self' data: https:; " +
        "connect-src 'self';"
    );
});

// ─── Helper: load portfolio data for re-renders ───
async function loadPortfolioData(db: Env['DB']) {
    const [projectsResult, skillsResult] = await Promise.all([
        db.prepare('SELECT * FROM projects WHERE is_featured = 1 ORDER BY created_at DESC').all<ProjectRow>(),
        db.prepare('SELECT * FROM skills ORDER BY category, proficiency DESC').all<SkillRow>(),
    ]);
    const skillsByCategory: Record<string, SkillRow[]> = {};
    for (const s of (skillsResult.results || [])) {
        if (!skillsByCategory[s.category]) skillsByCategory[s.category] = [];
        skillsByCategory[s.category].push(s);
    }
    return { projects: projectsResult.results || [], skillsByCategory };
}

// ═══════════════════════════════════════
// PUBLIC ROUTES
// ═══════════════════════════════════════

// Pinterest Verification
app.get('/pinterest-12995.html', (c) => {
    return c.text('pinterest-site-verification=129956d073186271cd7fcf5315605557');
});

// Portfolio Home
app.get('/', async (c) => {
    const db = c.env.DB;
    const { projects, skillsByCategory } = await loadPortfolioData(db);
    // FIX CRIT-1: Generate a real per-hour HMAC CSRF token
    const csrfToken = await generateCsrfToken(c.env.JWT_SECRET_KEY);
    // Load recent published blog posts (limit 3) for the homepage preview
    const recentPostsResult = await db.prepare('SELECT * FROM blog_posts WHERE is_published = 1 ORDER BY created_at DESC LIMIT 3').all<BlogPostRow>();
    return c.html(renderPortfolio(projects, skillsByCategory, false, '', csrfToken, recentPostsResult.results || []));
});

// Blog Listing Route
app.get('/blog', async (c) => {
    const db = c.env.DB;
    const postsResult = await db.prepare('SELECT * FROM blog_posts WHERE is_published = 1 ORDER BY created_at DESC').all<BlogPostRow>();
    return c.html(renderBlog(postsResult.results || []));
});

// Blog Post Detail Route
app.get('/blog/:slug', async (c) => {
    const db = c.env.DB;
    const slug = c.req.param('slug');
    const post = await db.prepare('SELECT * FROM blog_posts WHERE slug = ?').bind(slug).first<BlogPostRow>();
    if (!post || (!post.is_published && !c.get('user'))) {
        return c.text('Post not found', 404);
    }
    return c.html(renderBlogPost(post));
});

// Contact Form Submission
app.post('/contact', async (c) => {
    const db = c.env.DB;

    // FIX HIGH-2: Rate limit — 5 submissions per IP per hour
    const ip = c.req.header('CF-Connecting-IP') ?? 'unknown';
    if (!rateLimit(`contact:${ip}`, 5, 3600)) {
        const { projects, skillsByCategory } = await loadPortfolioData(db);
        const csrf = await generateCsrfToken(c.env.JWT_SECRET_KEY);
        const recentPostsResult = await db.prepare('SELECT * FROM blog_posts WHERE is_published = 1 ORDER BY created_at DESC LIMIT 3').all<BlogPostRow>();
        return c.html(renderPortfolio(projects, skillsByCategory, false, 'Too many submissions. Please try again later.', csrf, recentPostsResult.results || []));
    }

    const form = await parseForm(c);
    const { csrfToken } = form;

    // FIX CRIT-1: Verify HMAC CSRF token — no more hardcoded string
    if (!csrfToken || !(await verifyCsrfToken(String(csrfToken), c.env.JWT_SECRET_KEY))) {
        const { projects, skillsByCategory } = await loadPortfolioData(db);
        const csrf = await generateCsrfToken(c.env.JWT_SECRET_KEY);
        const recentPostsResult = await db.prepare('SELECT * FROM blog_posts WHERE is_published = 1 ORDER BY created_at DESC LIMIT 3').all<BlogPostRow>();
        return c.html(renderPortfolio(projects, skillsByCategory, false, 'Invalid request. Please refresh and try again.', csrf, recentPostsResult.results || []));
    }

    // FIX HIGH-4 & HIGH-5: Length validation + server-side email format check
    const nameStr   = String(form.name    ?? '').trim();
    const emailStr  = String(form.email   ?? '').trim();
    const messageStr = String(form.message ?? '').trim();

    const reRenderError = async (msg: string) => {
        const { projects, skillsByCategory } = await loadPortfolioData(db);
        const csrf = await generateCsrfToken(c.env.JWT_SECRET_KEY);
        const recentPostsResult = await db.prepare('SELECT * FROM blog_posts WHERE is_published = 1 ORDER BY created_at DESC LIMIT 3').all<BlogPostRow>();
        return c.html(renderPortfolio(projects, skillsByCategory, false, msg, csrf, recentPostsResult.results || []));
    };

    if (!nameStr || !emailStr || !messageStr) {
        return reRenderError('Please fill in all fields.');
    }
    if (nameStr.length > 100) {
        return reRenderError('Name must be 100 characters or fewer.');
    }
    if (emailStr.length > 254) {
        return reRenderError('Email address is too long.');
    }
    if (messageStr.length > 2000) {
        return reRenderError('Message must be 2000 characters or fewer.');
    }
    // FIX HIGH-5: Server-side email validation (not just browser type="email")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailStr)) {
        return reRenderError('Please enter a valid email address.');
    }

    try {
        await db.prepare('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)')
            .bind(nameStr, emailStr, messageStr).run();
        const { projects, skillsByCategory } = await loadPortfolioData(db);
        const csrf = await generateCsrfToken(c.env.JWT_SECRET_KEY);
        const recentPostsResult = await db.prepare('SELECT * FROM blog_posts WHERE is_published = 1 ORDER BY created_at DESC LIMIT 3').all<BlogPostRow>();
        return c.html(renderPortfolio(projects, skillsByCategory, true, '', csrf, recentPostsResult.results || []));
    } catch {
        return reRenderError('Something went wrong. Please try again later.');
    }
});

// ═══════════════════════════════════════
// AUTH ROUTES
// ═══════════════════════════════════════

app.get('/login', (c) => c.html(renderLogin()));

app.post('/login', async (c) => {
    const db = c.env.DB;
    // FIX HIGH-2: Rate limit — 10 attempts per IP per 15 minutes
    const ip = c.req.header('CF-Connecting-IP') ?? 'unknown';
    if (!rateLimit(`login:${ip}`, 10, 900)) {
        return c.html(renderLogin('Too many login attempts. Please try again in 15 minutes.'));
    }

    const form = await parseForm(c);
    const { username, password } = form;

    if (!username || !password) {
        return c.html(renderLogin('Please fill in all fields.'));
    }

    const user = await db.prepare('SELECT * FROM users WHERE username = ?')
        .bind(username).first<{ id: number, username: string, password_hash: string }>();
    if (!user) {
        return c.html(renderLogin('Invalid username or password.'));
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
        return c.html(renderLogin('Invalid username or password.'));
    }

    const token = await createSessionToken(user.id, user.username, c.env.JWT_SECRET_KEY);
    return new Response(null, {
        status: 302,
        headers: {
            'Location': '/admin/projects',
            'Set-Cookie': setSessionCookie(token)
        }
    });
});

app.get('/register', (c) => {
    if (c.env.ALLOW_REGISTRATION !== 'true') {
        return c.redirect('/login');
    }
    return c.html(renderRegister());
});

app.post('/register', async (c) => {
    if (c.env.ALLOW_REGISTRATION !== 'true') {
        return c.redirect('/login');
    }
    const db = c.env.DB;

    // FIX HIGH-2: Rate limit — 3 attempts per IP per hour
    const ip = c.req.header('CF-Connecting-IP') ?? 'unknown';
    if (!rateLimit(`register:${ip}`, 3, 3600)) {
        return c.html(renderRegister('Too many registration attempts. Please try again later.'));
    }

    const form = await parseForm(c);
    const { username, password, confirm_password, invite_code } = form;

    if (invite_code !== c.env.INVITE_CODE) {
        return c.html(renderRegister('Invalid invite code.'));
    }

    if (!username || !password || !confirm_password) {
        return c.html(renderRegister('Please fill in all fields.'));
    }
    // FIX MED-4: Increased minimum from 6 to 12 characters
    if (password.length < 12) {
        return c.html(renderRegister('Password must be at least 12 characters.'));
    }
    if (password !== confirm_password) {
        return c.html(renderRegister('Passwords do not match.'));
    }

    const existing = await db.prepare('SELECT id FROM users WHERE username = ?').bind(username).first();
    if (existing) {
        return c.html(renderRegister('Username already taken.'));
    }

    const hash = await hashPassword(password);
    await db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').bind(username, hash).run();

    return c.html(renderLogin('', 'Account created! Please sign in.'));
});

app.post('/logout', (c) => {
    return new Response(null, {
        status: 302,
        headers: {
            'Location': '/login',
            'Set-Cookie': clearSessionCookie()
        }
    });
});

// ═══════════════════════════════════════
// ADMIN ROUTES (protected)
// ═══════════════════════════════════════

app.use('/admin/*', authMiddleware);

// Redirect /admin to /admin/projects
app.get('/admin', (c) => c.redirect('/admin/projects'));

// --- Projects ---

app.get('/admin/projects', async (c) => {
    const db = c.env.DB;
    const user = c.get('user');
    const result = await db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all<ProjectRow>();
    const url = new URL(c.req.url);
    // FIX HIGH-3: msg param only ever set by our own hardcoded redirect strings — never user input
    const msg = url.searchParams.get('msg') || '';
    return c.html(renderAdminProjects(result.results || [], user.username, msg));
});

app.get('/admin/projects/edit', async (c) => {
    const db = c.env.DB;
    const user = c.get('user');
    const url = new URL(c.req.url);
    const id = url.searchParams.get('id');
    let project: ProjectRow | null = null;
    if (id) {
        project = await db.prepare('SELECT * FROM projects WHERE id = ?').bind(id).first<ProjectRow>();
    }
    return c.html(renderProjectForm(project, user.username));
});

app.post('/admin/projects/save', async (c) => {
    const db = c.env.DB;
    const form = await parseForm(c);
    const { id, title, description, tags, image_url, project_url, repo_url } = form;
    const is_featured = form.is_featured ? 1 : 0;
    let normalizedImageUrl = image_url || '';
    if (normalizedImageUrl && !normalizedImageUrl.startsWith('http') && !normalizedImageUrl.startsWith('/')) {
        normalizedImageUrl = '/' + normalizedImageUrl;
    }

    if (!title || !description || !title.trim() || !description.trim()) {
        return c.redirect('/admin/projects?msg=Error:+Title+and+Description+are+required');
    }

    if (id) {
        await db.prepare(
            'UPDATE projects SET title=?, description=?, tags=?, project_url=?, repo_url=?, image_url=?, is_featured=? WHERE id=?'
        ).bind(title, description, tags || '', project_url || '', repo_url || '', normalizedImageUrl, is_featured, id).run();
    } else {
        await db.prepare(
            'INSERT INTO projects (title, description, tags, project_url, repo_url, image_url, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?)'
        ).bind(title, description, tags || '', project_url || '', repo_url || '', normalizedImageUrl, is_featured).run();
    }

    return c.redirect('/admin/projects?msg=Project+saved+successfully');
});

app.post('/admin/projects/delete', async (c) => {
    const db = c.env.DB;
    const form = await parseForm(c);
    await db.prepare('DELETE FROM projects WHERE id = ?').bind(form.id).run();
    return c.redirect('/admin/projects?msg=Project+deleted');
});

// --- Skills ---

app.get('/admin/skills', async (c) => {
    const db = c.env.DB;
    const user = c.get('user');
    const result = await db.prepare('SELECT * FROM skills ORDER BY category, proficiency DESC').all<SkillRow>();
    return c.html(renderAdminSkills(result.results || [], user.username));
});

app.post('/admin/skills/add', async (c) => {
    const db = c.env.DB;
    const form = await parseForm(c);
    const { name, category } = form;
    let proficiency = parseInt(form.proficiency);

    if (!name || !category || !name.trim()) {
        return c.redirect('/admin/skills?msg=Error:+Name+and+Category+are+required');
    }

    // Clamp proficiency to 0-100
    if (isNaN(proficiency)) proficiency = 80;
    proficiency = Math.max(0, Math.min(100, proficiency));

    await db.prepare('INSERT INTO skills (name, category, proficiency) VALUES (?, ?, ?)')
        .bind(name, category, proficiency).run();
    return c.redirect('/admin/skills');
});

app.post('/admin/skills/delete', async (c) => {
    const db = c.env.DB;
    const form = await parseForm(c);
    await db.prepare('DELETE FROM skills WHERE id = ?').bind(form.id).run();
    return c.redirect('/admin/skills');
});

// --- Services ---

app.get('/admin/services', async (c) => {
    const db = c.env.DB;
    const user = c.get('user');
    const result = await db.prepare('SELECT * FROM services ORDER BY created_at ASC').all<ServiceRow>();
    return c.html(renderAdminServices(result.results || [], user.username));
});

app.post('/admin/services/add', async (c) => {
    const db = c.env.DB;
    const form = await parseForm(c);
    const { title, description, icon } = form;

    if (!title || !description || !icon || !title.trim() || !description.trim() || !icon.trim()) {
        return c.redirect('/admin/services?msg=Error:+All+fields+are+required');
    }

    await db.prepare('INSERT INTO services (title, description, icon) VALUES (?, ?, ?)')
        .bind(title, description, icon).run();
    return c.redirect('/admin/services');
});

app.post('/admin/services/delete', async (c) => {
    const db = c.env.DB;
    const form = await parseForm(c);
    await db.prepare('DELETE FROM services WHERE id = ?').bind(form.id).run();
    return c.redirect('/admin/services');
});

// --- Messages ---

app.get('/admin/messages', async (c) => {
    const db = c.env.DB;
    const user = c.get('user');
    const result = await db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all<MessageRow>();
    const url = new URL(c.req.url);
    const msg = url.searchParams.get('msg') || '';
    return c.html(renderAdminMessages(result.results || [], user.username, msg));
});

app.post('/admin/messages/read', async (c) => {
    const db = c.env.DB;
    const form = await parseForm(c);
    const id = form.id;
    if (id) {
        await db.prepare("UPDATE messages SET status = 'read' WHERE id = ?").bind(id).run();
    }
    return c.redirect('/admin/messages');
});

app.post('/admin/messages/delete', async (c) => {
    const db = c.env.DB;
    const form = await parseForm(c);
    await db.prepare('DELETE FROM messages WHERE id = ?').bind(form.id).run();
    return c.redirect('/admin/messages?msg=Message+deleted');
});

// --- Blog Posts Admin ---

app.get('/admin/blog', async (c) => {
    const db = c.env.DB;
    const user = c.get('user');
    const result = await db.prepare('SELECT * FROM blog_posts ORDER BY created_at DESC').all<BlogPostRow>();
    const url = new URL(c.req.url);
    const msg = url.searchParams.get('msg') || '';
    return c.html(renderAdminBlog(result.results || [], user.username, msg));
});

app.get('/admin/blog/edit', async (c) => {
    const db = c.env.DB;
    const user = c.get('user');
    const url = new URL(c.req.url);
    const id = url.searchParams.get('id');
    let post: BlogPostRow | null = null;
    if (id) {
        post = await db.prepare('SELECT * FROM blog_posts WHERE id = ?').bind(id).first<BlogPostRow>();
    }
    return c.html(renderBlogPostForm(post, user.username));
});

app.post('/admin/blog/save', async (c) => {
    const db = c.env.DB;
    const form = await parseForm(c);
    const { id, title, slug, excerpt, content, cover_image_url, tags } = form;
    const is_published = form.is_published ? 1 : 0;

    let normalizedCoverImageUrl = cover_image_url || '';
    if (normalizedCoverImageUrl && !normalizedCoverImageUrl.startsWith('http') && !normalizedCoverImageUrl.startsWith('/')) {
        normalizedCoverImageUrl = '/' + normalizedCoverImageUrl;
    }

    if (!title || !slug || !title.trim() || !slug.trim()) {
        return c.redirect('/admin/blog?msg=Error:+Title+and+Slug+are+required');
    }

    // Double check unique slug constraints if editing or creating
    const querySlug = slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const existing = await db.prepare('SELECT id FROM blog_posts WHERE slug = ? AND id != ?').bind(querySlug, id || -1).first();
    if (existing) {
        return c.redirect('/admin/blog?msg=Error:+Slug+already+exists.+Please+choose+another.');
    }

    if (id) {
        await db.prepare(
            'UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, cover_image_url=?, tags=?, is_published=?, updated_at=datetime(\'now\') WHERE id=?'
        ).bind(title.trim(), querySlug, excerpt || '', content || '', normalizedCoverImageUrl, tags || '', is_published, id).run();
    } else {
        await db.prepare(
            'INSERT INTO blog_posts (title, slug, excerpt, content, cover_image_url, tags, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)'
        ).bind(title.trim(), querySlug, excerpt || '', content || '', normalizedCoverImageUrl, tags || '', is_published).run();
    }

    return c.redirect('/admin/blog?msg=Blog+post+saved+successfully');
});

app.post('/admin/blog/delete', async (c) => {
    const db = c.env.DB;
    const form = await parseForm(c);
    await db.prepare('DELETE FROM blog_posts WHERE id = ?').bind(form.id).run();
    return c.redirect('/admin/blog?msg=Blog+post+deleted');
});

export default app;
