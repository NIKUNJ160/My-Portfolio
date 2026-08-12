# Tech Stack — nikunj-portfolio

> Architecture, tooling, and infrastructure reference.
> Last updated: August 2026

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    Cloudflare Edge                    │
│                                                       │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────┐ │
│  │  Workers KV   │   │  Hono Router │   │  D1 DB   │ │
│  │  (rate limit  │◄──│  (index.ts)  │──►│ (SQLite) │ │
│  │   planned)    │   │              │   │          │ │
│  └──────────────┘   └──────┬───────┘   └──────────┘ │
│                             │                         │
│                      ┌──────┴───────┐                │
│                      │ Static Assets│                │
│                      │   (public/)  │                │
│                      └──────────────┘                │
└─────────────────────────────────────────────────────┘
         ▲                    ▲
         │                    │
    HTTPS Request       GitHub Actions
    (visitor)           (auto deploy)
```

**Runtime:** Cloudflare Workers (V8 isolates — no Node.js, no container)
**Rendering:** Server-rendered HTML templates (no React/Vue/Svelte) + client-side hydration via vanilla JS `fetch('/api/portfolio-data')`
**Database:** Cloudflare D1 (serverless SQLite at the edge)

---

## 2. Dependency Map

### Production Dependencies

| Package | Version | Purpose |
|---|---|---|
| `hono` | `^4.13.1` | Lightweight edge-first web framework — routing, middleware, context |

> **Total production dependencies: 1.** Zero bloat.

### Dev Dependencies

| Package | Version | Purpose |
|---|---|---|
| `@cloudflare/workers-types` | `^5.20260810.1` | TypeScript type definitions for Workers runtime APIs |
| `typescript` | `^5.9.3` | TypeScript compiler for type checking |
| `wrangler` | `^4.120.0` | Cloudflare CLI — local dev, D1 management, deployment |

---

## 3. Source Code Structure

```
src/
├── index.ts       # Hono app — routes, middleware, CRUD handlers (520 lines)
├── auth.ts        # Auth module — PBKDF2 hashing, JWT sessions, CSRF, cookies (193 lines)
├── env.ts         # TypeScript interfaces — Env bindings, DB row types (79 lines)
└── templates.ts   # Server-side HTML templates — all pages rendered here (982 lines)

public/
├── assets/
│   ├── css/style.css    # Full design system (907 lines)
│   ├── js/main.js       # Client hydration, liquid bg, scroll animations (261 lines)
│   └── images/
│       ├── logo.jpg     # Nav logo (192 KB — oversized)
│       └── projects/    # User-uploaded project thumbnails
├── github.svg           # Social icon
├── instagram.svg        # Social icon
└── linkedin.svg         # Social icon

schema.sql               # D1 database schema (6 tables)
wrangler.toml             # Cloudflare deployment config (prod + staging)
tsconfig.json             # TypeScript strict config
```

---

## 4. Database Schema (D1 / SQLite)

### Tables

| Table | Purpose | Row Count (est.) |
|---|---|---|
| `users` | Admin authentication | 1 (single admin) |
| `projects` | Portfolio showcase items | ~5–20 |
| `messages` | Contact form submissions | Growing |
| `skills` | Technology skills by category | ~15–30 |
| `services` | Service offerings | ~3–5 |
| `blog_posts` | Blog content with slugs | ~0–10 |

### Key Schema Details

```sql
-- Skills categories are enum-constrained
CHECK(category IN ('frontend', 'backend', 'tools', 'other'))

-- Message status is enum-constrained
CHECK(status IN ('new', 'read', 'replied'))

-- Blog posts use unique slugs for URL routing
slug TEXT NOT NULL UNIQUE

-- All timestamps use SQLite datetime('now') default
```

### D1 Databases

| Environment | Database Name | Database ID |
|---|---|---|
| Production | `portfolio-db` | `d9e46eaa-6f5f-428c-98e2-b67f4da500ba` |
| Staging | `portfolio-db-staging` | `6bef5707-9471-4ceb-803a-8203ca3a0831` |

---

## 5. Authentication & Security

### Password Hashing
- **Algorithm:** PBKDF2 (Web Crypto API)
- **Iterations:** 100,000
- **Hash:** SHA-256
- **Salt:** 16 bytes random per password
- **Storage format:** `<salt_hex>:<hash_hex>`

### Session Management
- **Format:** Custom JWT (HS256 HMAC)
- **Lifetime:** 2 hours (was 7 days — hardened)
- **Cookie flags:** `HttpOnly; SameSite=Strict; Secure`
- **Verification:** Constant-time comparison (`timingSafeEqual`)

### CSRF Protection
- **Method:** Time-windowed HMAC tokens (1-hour windows)
- **Accepts:** Current and previous window (handles boundary edge cases)
- **Derived from:** `JWT_SECRET_KEY` — no server state needed

### Rate Limiting
- **Implementation:** In-memory `Map` per isolate (not persistent across cold starts)
- **Contact form:** 5 requests / IP / hour
- **Login:** 10 attempts / IP / 15 minutes
- **Registration:** 3 attempts / IP / hour

### Security Headers (all responses)
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: default-src 'self'; script-src 'self'; ...
```

### Environment Secrets
| Secret | Set via | Notes |
|---|---|---|
| `JWT_SECRET_KEY` | `wrangler secret put` | Must be set — app returns 500 if missing |
| `INVITE_CODE` | `wrangler secret put` | Required for registration |
| `ALLOW_REGISTRATION` | `wrangler.toml` [vars] | `"false"` in prod, `"true"` in staging |

---

## 6. API Endpoints

### Public

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/` | Render portfolio homepage (SSR + CSRF token) |
| `GET` | `/api/portfolio-data` | JSON API — projects, skills, recent posts (used by client hydration) |
| `GET` | `/blog` | Blog listing page |
| `GET` | `/blog/:slug` | Individual blog post |
| `POST` | `/contact` | Contact form submission (CSRF + rate limited) |

### Auth

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/login` | Login page |
| `POST` | `/login` | Authenticate (rate limited) |
| `GET` | `/register` | Registration page (gated by `ALLOW_REGISTRATION`) |
| `POST` | `/register` | Create account (requires invite code, rate limited) |
| `POST` | `/logout` | Clear session cookie |

### Admin (protected by `authMiddleware`)

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/admin/projects` | List all projects |
| `GET` | `/admin/projects/edit` | Project create/edit form |
| `POST` | `/admin/projects/save` | Upsert project |
| `POST` | `/admin/projects/delete` | Delete project |
| `GET` | `/admin/skills` | List all skills |
| `POST` | `/admin/skills/add` | Add skill |
| `POST` | `/admin/skills/delete` | Delete skill |
| `GET` | `/admin/services` | List all services |
| `POST` | `/admin/services/add` | Add service |
| `POST` | `/admin/services/delete` | Delete service |
| `GET` | `/admin/messages` | List contact messages |
| `POST` | `/admin/messages/read` | Mark message as read |
| `POST` | `/admin/messages/delete` | Delete message |
| `GET` | `/admin/blog` | List blog posts |
| `GET` | `/admin/blog/edit` | Blog post create/edit form |
| `POST` | `/admin/blog/save` | Upsert blog post |
| `POST` | `/admin/blog/delete` | Delete blog post |

---

## 7. CI/CD Pipeline

### Production Deploy ([`deploy.yml`](file:///d:/portfolio/.github/workflows/deploy.yml))

```
push to main
    ↓
┌──────────────────────┐
│   quality (Job 1)    │  npm ci → tsc --noEmit → npm audit --audit-level=high
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│   migrate (Job 2)    │  wrangler d1 execute portfolio-db --remote --file=schema.sql
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│   deploy (Job 3)     │  wrangler deploy → deployment summary
└──────────────────────┘
```

- **Trigger:** Push to `main` only
- **Concurrency:** `group: production-deploy, cancel-in-progress: true`
- **Timeouts:** 10 min (quality, deploy), 5 min (migrate)

### Rollback ([`rollback.yml`](file:///d:/portfolio/.github/workflows/rollback.yml))
- **Trigger:** Manual `workflow_dispatch`
- **Inputs:** Required reason + optional deployment ID
- **Command:** `wrangler rollback`

---

## 8. NPM Scripts

| Script | Command | Purpose |
|---|---|---|
| `dev` | `wrangler dev` | Local development server |
| `build` | `npm run typecheck` | Type-check only (no emit) |
| `deploy` | `wrangler deploy` | Manual deploy to production |
| `db:init` | `wrangler d1 execute ... --local` | Apply schema to local D1 |
| `db:deploy` | `wrangler d1 execute ... --remote` | Apply schema to production D1 |
| `typecheck` | `tsc --noEmit` | TypeScript strict check |

---

## 9. TypeScript Configuration

| Setting | Value | Rationale |
|---|---|---|
| `target` | `ESNext` | Workers V8 supports latest JS |
| `module` | `ESNext` | ESM required by Workers |
| `moduleResolution` | `bundler` | Wrangler bundles with esbuild |
| `strict` | `true` | Full strict mode enabled |
| `noEmit` | `true` | Type-check only — Wrangler does the build |
| `types` | `@cloudflare/workers-types` | Workers runtime API types |
| `jsx` | `react-jsx` | Defined but unused currently |

---

## 10. Known Technical Debt

1. **Rate limiter is in-memory** — resets on cold start; should migrate to Workers KV
2. **Templates are a 982-line monolith** — needs component extraction
3. **No test suite** — zero unit or integration tests
4. **No linter** (ESLint/Biome) in pipeline
5. **Schema migrations are additive only** — `CREATE TABLE IF NOT EXISTS` can't handle ALTER TABLE
6. **Logo image is 192 KB** for a 36px render — needs resize + WebP
7. **No cache-busting** on `style.css` and `main.js` — stale after deploys
8. **`jsx: react-jsx`** in tsconfig but no JSX is used anywhere
