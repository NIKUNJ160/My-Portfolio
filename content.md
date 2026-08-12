# Content Map — nikunj-portfolio

> Every piece of text, copy, and content on the live site.
> Last updated: August 2026

---

## 1. SEO & Meta

| Field | Value |
|---|---|
| `<title>` | Nikunj Pateliya \| Web Designer & Full-Stack Developer |
| `<meta description>` | Nikunj Pateliya - Web Designer & Full-Stack Developer portfolio |
| `<meta p:domain_verify>` | `129956d073186271cd7fcf5315605557` (Pinterest verification) |
| Favicon | `/favicon.png` |
| Language | `en` |

### Content Issues
- Meta description is generic — doesn't mention location (Gujarat), stack (Cloudflare, TypeScript), or differentiator
- No Open Graph tags (`og:title`, `og:image`, `og:description`)
- No Twitter Card tags
- No structured data / JSON-LD

---

## 2. Navigation

| Link | Label | Target |
|---|---|---|
| Logo | (image: `logo.jpg`) | `#` (scroll to top) |
| Work | "Work" | `#work` |
| Services | "Services" | `#services` |
| About | "About" | `#about` |
| Blog | "Blog" | `/blog` |
| CTA | "Let's Talk" | `#contact` |

---

## 3. Status Pill

**Text:** `● Open to Work`
**Position:** Fixed, top-right corner
**Font:** JetBrains Mono, 0.875rem

---

## 4. Hero Section

### Headline
```
Building Digital
Experiences.
```
- "Digital" is styled in muted color (`--text-muted`)
- Gradient text fill: white → gray

### Subtitle
```
I help brands and businesses stand out with high-end web design
and full-stack development.
```

### CTA Buttons
| Button | Style | Target |
|---|---|---|
| "View My Work" | Primary gradient | `#work` |
| "Contact Me" | Outline ghost | `#contact` |

### Content Issues
- No profile photo or avatar — purely typographic
- Subtitle mentions "high-end web design" but doesn't specify tech stack or location
- No social proof (client count, years experience, etc.)

---

## 5. Selected Work Section

### Heading
```
Selected Work
```

### Content Source
Projects are loaded dynamically from D1 via `/api/portfolio-data` → client-side hydration. Only `is_featured = 1` projects appear.

### Project Card Fields (from DB)
| Field | Type | Display |
|---|---|---|
| `title` | Text | Card heading |
| `description` | Text | 3-line clamped paragraph |
| `image_url` | URL | 16:10 thumbnail |
| `tags` | Comma-separated | Monospace tag pills |
| `project_url` | URL | "View Project →" link |
| `repo_url` | URL | **Not displayed on frontend** — only stored in DB |

### Empty State
```
Work in Progress
Projects are currently being uploaded. Check back soon!
```

### Error State
```
Failed to load projects. Please reload the page.
```
(Shown in red if API fetch fails)

---

## 6. Services Section

### Heading
```
Services
```

### Cards (hardcoded in template)

| Icon | Title | Description |
|---|---|---|
| ✦ | Web Design | Crafting visually stunning, user-centric interfaces. From high-fidelity mockups to polished final designs that align with your brand identity. |
| ⚡ | Development | Building robust, scalable web applications using modern stacks (PHP, React, Node.js). Fast, secure, and SEO-optimized. |
| 🚀 | SEO & Strategy | Optimizing your digital presence for search engines and performance. Ensuring your site reaches the right audience effectively. |

### Content Issues
- **Hardcoded** — the DB has a `services` table with CRUD admin, but the homepage template ignores it and renders these 3 static cards
- Development description mentions "PHP, React, Node.js" but the actual site is built on **TypeScript, Hono, Cloudflare Workers** — inaccurate
- Icons are emoji, not the icon library (Font Awesome) used elsewhere

---

## 7. About Me Section

### Heading
```
About Me
```

### Bio (3 paragraphs)

**Paragraph 1:**
```
I'm Nikunj Pateliya, a passionate Web Designer & Full-Stack Developer based in
Gujarat. I specialize in bridging the gap between design and engineering,
creating products that not only look great but perform flawlessly.
```

**Paragraph 2:**
```
With a deep understanding of modern web technologies, I help startups and
established businesses build their digital legacy. My approach is user-first,
focusing on clean code, accessibility, and pixel-perfect design.
```

**Paragraph 3:**
```
When I'm not coding, you can find me exploring new tech trends, contributing to
open source, or gaming.
```

### Skills Panel
Loaded dynamically from D1. Grouped by category:
- `frontend` → e.g. HTML, CSS, JavaScript, React, TypeScript
- `backend` → e.g. Node.js, PHP, Python
- `tools` → e.g. Git, Docker, Figma
- `other` → catch-all

Skills are displayed as hoverable pills inside a glass card.

### Content Issues
- Bio is generic — could be any developer
- No mention of Cloudflare Workers, Hono, or D1 (the actual stack)
- No metrics (years of experience, projects completed, clients served)
- Skills list doesn't highlight proficiency — the `proficiency` field exists in DB but isn't rendered

---

## 8. Blog Section

### Heading
```
Latest Posts
```
With a subheading label: "Writing" (uppercase, emerald color)

### Link
```
View All Posts →  (links to /blog)
```

### Content Source
3 most recent published blog posts from D1 (`is_published = 1`).

### Blog Card Fields
| Field | Display |
|---|---|
| `tags` | Up to 2 tag badges (emerald background) |
| `title` | Card heading |
| `excerpt` | 2-line clamped description |
| `created_at` | Formatted date (e.g. "Aug 11, 2026") |
| Reading time | Calculated from `content` word count ÷ 200 |

### Visibility
Section is `display: none` by default and only shown if ≥1 published post exists.

---

## 9. Contact Section

### Heading
```
Let's Work Together
```

### Subtitle
```
Have a project in mind? Send me a message and let's discuss.
```

### Form Fields
| Field | Type | Required | Validation |
|---|---|---|---|
| Name | `text` | Yes | Max 100 chars |
| Email | `email` | Yes | Max 254 chars, regex validated server-side |
| Message | `textarea` | Yes | Max 2000 chars |
| CSRF Token | `hidden` | Auto | HMAC time-windowed |

### CTA Button
```
Send Message
```
(Full-width, gradient style)

### Success Message
```
Message sent successfully! I'll get back to you soon.
```
(Green banner, appears after successful POST)

### Error Messages
| Condition | Message |
|---|---|
| Empty fields | Please fill in all fields. |
| Name too long | Name must be 100 characters or fewer. |
| Email too long | Email address is too long. |
| Message too long | Message must be 2000 characters or fewer. |
| Invalid email | Please enter a valid email address. |
| Rate limited | Too many submissions. Please try again later. |
| CSRF failure | Invalid request. Please refresh and try again. |
| Server error | Something went wrong. Please try again later. |

### Social Links (below form)
| Platform | URL | Icon |
|---|---|---|
| LinkedIn | `https://www.linkedin.com/in/nikunjpateliya1608` | `fab fa-linkedin` |
| GitHub | `https://github.com/NIKUNJ160` | `fab fa-github` |
| Instagram | `https://www.instagram.com/_nik__16/` | `fab fa-instagram` |
| WhatsApp | `https://wa.me/919328801435` | `fab fa-whatsapp` |

---

## 10. Footer

### Layout
Flexbox row — copyright left, admin link right.

### Copyright
```
© 2026 Nikunj Pateliya. All rights reserved.
```
(Year is dynamic via `new Date().getFullYear()`)

### Admin Link
```
Admin Panel →  (links to /admin)
```
Styled in muted color, 0.85rem — intentionally subtle but still visible.

### Content Issues
- Admin link is publicly visible — considered a security concern (from workspace audit)
- No "Made with" attribution or tech badge
- No sitemap link, privacy policy, or terms of service

---

## 11. External Resources Loaded

| Resource | CDN | Purpose |
|---|---|---|
| Inter (400, 500, 600, 700) | Google Fonts | Primary typeface |
| JetBrains Mono (400, 500) | Google Fonts | Monospace typeface |
| Font Awesome 6.4.0 | cdnjs.cloudflare.com | Social link icons (`fa-linkedin`, etc.) |

---

## 12. Content Improvement Roadmap

### High Priority
- [ ] **Fix Services section** — wire to DB instead of hardcoded; update copy to mention actual tech stack
- [ ] **Add profile photo** to hero or about section
- [ ] **Improve meta description** — include location, specialization, and differentiator
- [ ] **Add Open Graph + Twitter Card tags** for social sharing
- [ ] **Update development service copy** — replace "PHP, React, Node.js" with actual stack

### Medium Priority
- [ ] **Add social proof** — years of experience, project count, or testimonial quotes
- [ ] **Show `repo_url`** on project cards (GitHub icon link)
- [ ] **Display skill `proficiency`** — progress bar or visual indicator
- [ ] **Add structured data** (JSON-LD) for Person + Portfolio

### Low Priority
- [ ] **Rewrite bio** — make it specific and memorable, not generic
- [ ] **Add privacy policy** page (required for GDPR if EU visitors)
- [ ] **Remove visible admin link** from footer (access `/admin` directly)
- [ ] **Add alt text** for social icons (currently just `title` attributes)
