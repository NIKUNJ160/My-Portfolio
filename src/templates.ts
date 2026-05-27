// HTML Templates - renders the same design as the original PHP files

import type { ProjectRow, SkillRow, ServiceRow, MessageRow, BlogPostRow } from './env';

function escapeHtml(str: string | null | undefined): string {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ─── Base Layout ───

function baseHead(title: string, extraCss: string = ''): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="Nikunj Pateliya - Web Designer & Full-Stack Developer portfolio">
    <link rel="icon" href="/favicon.png" type="image/png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <meta name="p:domain_verify" content="129956d073186271cd7fcf5315605557">
    <link rel="stylesheet" href="/assets/css/style.css">
    ${extraCss}
</head>`;
}

// ─── Public Portfolio ───

type SkillsByCategory = Record<string, SkillRow[]>;

export function renderPortfolio(
    projects: ProjectRow[],
    skillsByCategory: SkillsByCategory,
    messageSent: boolean = false,
    errorMsg: string = '',
    csrfToken: string = '',
    recentPosts: BlogPostRow[] = []
): string {
    const projectCards = projects.length > 0
        ? projects.map(p => {
            const tags = (p.tags || '').split(',').map(t => t.trim()).filter(Boolean);
            let imgUrl = p.image_url || 'assets/images/placeholder.jpg';
            if (imgUrl && !imgUrl.startsWith('http') && !imgUrl.startsWith('/')) {
                imgUrl = '/' + imgUrl;
            }
            return `<article class="project-card">
            <img src="${escapeHtml(imgUrl)}" alt="${escapeHtml(p.title)}" class="project-thumb">
            <div class="project-content">
                <div class="project-tags">
                    ${tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
                </div>
                <h3 class="project-title">${escapeHtml(p.title)}</h3>
                <p class="project-desc">${escapeHtml(p.description)}</p>
                <a href="${escapeHtml(p.project_url)}" class="project-link">
                    View Project <span>&rarr;</span>
                </a>
            </div>
        </article>`;
        }).join('')
        : `<div class="project-card" style="grid-column: 1 / -1; text-align: center; padding: 4rem;">
        <h3 class="project-title">Work in Progress</h3>
        <p class="project-desc">Projects are currently being uploaded. Check back soon!</p>
      </div>`;

    const skillsHtml = Object.keys(skillsByCategory).length > 0
        ? Object.entries(skillsByCategory).map(([category, skills]) => `
        <div class="skill-category">
            <h4 class="skill-heading">${escapeHtml(category.charAt(0).toUpperCase() + category.slice(1))}</h4>
            <div class="skill-list">
                ${skills.map(s => `<div class="skill-pill">${escapeHtml(s.name)}</div>`).join('')}
            </div>
        </div>`).join('')
        : `<div class="skill-category">
        <h4 class="skill-heading">Frontend</h4>
        <div class="skill-list">
            <div class="skill-pill">HTML5</div><div class="skill-pill">CSS3</div>
            <div class="skill-pill">JavaScript</div><div class="skill-pill">React</div>
            <div class="skill-pill">Tailwind CSS</div>
        </div>
      </div>
      <div class="skill-category">
        <h4 class="skill-heading">Backend</h4>
        <div class="skill-list">
            <div class="skill-pill">PHP</div><div class="skill-pill">MySQL</div>
            <div class="skill-pill">Node.js</div><div class="skill-pill">Python</div>
        </div>
      </div>
      <div class="skill-category">
        <h4 class="skill-heading">Tools</h4>
        <div class="skill-list">
            <div class="skill-pill">Git</div><div class="skill-pill">Figma</div>
            <div class="skill-pill">VS Code</div>
        </div>
      </div>`;

    const successBanner = messageSent
        ? `<div style="background: rgba(52, 211, 153, 0.1); color: var(--accent-color); padding: 1rem; border-radius: 8px; margin-bottom: 2rem; text-align: center; border: 1px solid rgba(52, 211, 153, 0.2);">
        Message sent successfully! I'll get back to you soon.
      </div>` : '';

    const errorBanner = errorMsg
        ? `<div style="background: rgba(239, 68, 68, 0.1); color: #ef4444; padding: 1rem; border-radius: 8px; margin-bottom: 2rem; text-align: center; border: 1px solid rgba(239, 68, 68, 0.2);">
        ${escapeHtml(errorMsg)}
      </div>` : '';

    return `${baseHead('Nikunj Pateliya | Web Designer & Full-Stack Developer')}
<body>
    <!-- Fixed Status Pill -->
    <div class="status-pill">
        <span>●</span> Open to Work
    </div>

    <!-- Navigation -->
    <nav class="glass main-nav">
        <div class="container nav-container">
            <a href="#" class="nav-logo">
                <img src="/assets/images/logo.jpg" alt="Nikunj Pateliya">
            </a>
            <div class="nav-links">
                <a href="#work">Work</a>
                <a href="#services">Services</a>
                <a href="#about">About</a>
                <a href="/blog">Blog</a>
                <a href="#contact" class="btn">Let's Talk</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <header class="hero-section">
        <div class="container">
            <h1 class="hero-title">
                Building <span style="color: var(--text-muted);">Digital</span><br>
                Experiences.
            </h1>
            <p class="hero-subtitle">
                I help brands and businesses stand out with high-end web design and full-stack development.
            </p>
            <div class="hero-actions">
                <a href="#work" class="btn">View My Work</a>
                <a href="#contact" class="btn btn-outline">Contact Me</a>
            </div>
        </div>
    </header>

    <!-- Project Showcase -->
    <section id="work" class="section">
        <div class="container">
            <h2 style="margin-bottom: 2rem; font-size: 2.5rem;">Selected Work</h2>
            <div class="bento-grid">
                ${projectCards}
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="section">
        <div class="container">
            <h2 style="margin-bottom: 2rem; font-size: 2.5rem;">Services</h2>
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">✦</div>
                    <h3 class="service-title">Web Design</h3>
                    <p class="service-desc">Crafting visually stunning, user-centric interfaces. From high-fidelity mockups to polished final designs that align with your brand identity.</p>
                </div>
                <div class="service-card">
                    <div class="service-icon">⚡</div>
                    <h3 class="service-title">Development</h3>
                    <p class="service-desc">Building robust, scalable web applications using modern stacks (PHP, React, Node.js). Fast, secure, and SEO-optimized.</p>
                </div>
                <div class="service-card">
                    <div class="service-icon">🚀</div>
                    <h3 class="service-title">SEO & Strategy</h3>
                    <p class="service-desc">Optimizing your digital presence for search engines and performance. Ensuring your site reaches the right audience effectively.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- About & Skills Section -->
    <section id="about" class="section">
        <div class="container">
            <h2 style="margin-bottom: 3rem; font-size: 2.5rem;">About Me</h2>
            <div class="about-container">
                <div class="about-bio">
                    <p>I'm Nikunj Pateliya, a passionate Web Designer & Full-Stack Developer based in Gujarat. I specialize in bridging the gap between design and engineering, creating products that not only look great but perform flawlessly.</p>
                    <p>With a deep understanding of modern web technologies, I help startups and established businesses build their digital legacy. My approach is user-first, focusing on clean code, accessibility, and pixel-perfect design.</p>
                    <p>When I'm not coding, you can find me exploring new tech trends, contributing to open source, or gaming.</p>
                </div>
                <div class="skills-container">
                    ${skillsHtml}
                </div>
            </div>
        </div>
    </section>

    <!-- Blog Preview Section -->
    ${recentPosts.length > 0 ? `<section id="blog" class="section">
        <div class="container">
            <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:3rem;flex-wrap:wrap;gap:1rem;">
                <div>
                    <p style="color:var(--accent-color);font-size:0.85rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem;">Writing</p>
                    <h2 style="font-size:2.5rem;margin:0;">Latest Posts</h2>
                </div>
                <a href="/blog" style="color:var(--accent-color);font-weight:600;font-size:0.95rem;">View All Posts &rarr;</a>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem;">
                ${recentPosts.map(p => {
                    const rt = Math.max(1, Math.round(((p.content||'').replace(/<[^>]+>/g,'').match(/\\S+/g)||[]).length/200));
                    const d = (() => { try { return new Date(p.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}); } catch { return p.created_at; } })();
                    const ptags = (p.tags||'').split(',').map(t=>t.trim()).filter(Boolean);
                    return `<a href="/blog/${escapeHtml(p.slug)}" style="display:block;background:var(--bg-card);border:1px solid var(--border-color);border-radius:16px;padding:1.75rem;text-decoration:none;transition:all 0.3s ease;">
                        ${ptags.length?`<div style="display:flex;gap:0.4rem;flex-wrap:wrap;margin-bottom:0.75rem;">${ptags.slice(0,2).map(t=>`<span style="font-size:0.72rem;font-weight:600;padding:2px 8px;border-radius:99px;background:rgba(52,211,153,0.1);color:var(--accent-color);text-transform:uppercase;">${escapeHtml(t)}</span>`).join('')}</div>`:''}
                        <h3 style="font-size:1.1rem;font-weight:700;color:var(--text-primary);margin-bottom:0.6rem;line-height:1.4;">${escapeHtml(p.title)}</h3>
                        ${p.excerpt?`<p style="color:var(--text-secondary);font-size:0.88rem;line-height:1.6;margin-bottom:1rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${escapeHtml(p.excerpt)}</p>`:''}
                        <div style="display:flex;justify-content:space-between;color:var(--text-muted);font-size:0.8rem;padding-top:0.875rem;border-top:1px solid var(--border-color);">
                            <span>${d}</span><span style="color:var(--accent-color);font-weight:600;">${rt} min read &rarr;</span>
                        </div>
                    </a>`;
                }).join('')}
            </div>
        </div>
    </section>` : ''}

    <!-- Contact Section -->
    <section id="contact" class="section" style="margin-bottom: 4rem;">
        <div class="container">
            <h2 style="margin-bottom: 1rem; font-size: 2.5rem; text-align: center;">Let's Work Together</h2>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem;">Have a project in mind? Send me a message and let's discuss.</p>

            <div class="contact-container">
                ${successBanner}
                ${errorBanner}

                <form method="POST" action="/contact">
                    <input type="hidden" name="csrfToken" value="${escapeHtml(csrfToken)}">
                    <div class="form-group">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" id="name" name="name" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" id="email" name="email" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="message" class="form-label">Message</label>
                        <textarea id="message" name="message" class="form-control" required></textarea>
                    </div>
                    <button type="submit" class="btn" style="width: 100%;">Send Message</button>
                </form>

                <div class="contact-socials">
                    <a href="https://www.linkedin.com/in/nikunjpateliya1608" target="_blank" class="social-link" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
                    <a href="https://github.com/NIKUNJ160" target="_blank" class="social-link" title="GitHub"><i class="fab fa-github"></i></a>
                    <a href="https://www.instagram.com/_nik__16/" target="_blank" class="social-link" title="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="https://wa.me/919328801435" target="_blank" class="social-link" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                </div>
            </div>
        </div>
    </section>

    <!-- FIX MED-3: Admin FAB removed — do not advertise the admin panel to visitors. Access /admin directly. -->

    <footer class="footer">
        <div class="container" style="display: flex; justify-content: space-between; align-items: center;">
            <span>&copy; ${new Date().getFullYear()} Nikunj Pateliya. All rights reserved.</span>
            <a href="/admin" style="color: var(--text-muted); font-size: 0.85rem;">Admin Panel &rarr;</a>
        </div>
    </footer>

    <script src="/assets/js/main.js"></script>
</body>
</html>`;
}

// ─── Auth Pages ───

const authCss = `<style>
    .auth-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; }
    .auth-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 24px; padding: 3rem; width: 100%; max-width: 420px; }
    .auth-card h1 { font-size: 1.75rem; margin-bottom: 0.5rem; }
    .auth-card p.subtitle { color: var(--text-secondary); margin-bottom: 2rem; font-size: 0.95rem; }
    .auth-card .form-group { margin-bottom: 1.25rem; }
    .auth-card .btn { width: 100%; margin-top: 0.5rem; }
    .auth-link { text-align: center; margin-top: 1.5rem; color: var(--text-secondary); font-size: 0.9rem; }
    .auth-link a { color: var(--accent-color); font-weight: 600; }
    .error-msg { background: rgba(239, 68, 68, 0.1); color: #ef4444; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.9rem; border: 1px solid rgba(239, 68, 68, 0.2); }
    .success-msg { background: rgba(52, 211, 153, 0.1); color: var(--accent-color); padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.9rem; border: 1px solid rgba(52, 211, 153, 0.2); }
</style>`;

export function renderLogin(error: string = '', success: string = ''): string {
    return `${baseHead('Login | Nikunj Pateliya', authCss)}
<body>
    <div class="auth-container">
        <div class="auth-card">
            <h1>Welcome Back</h1>
            <p class="subtitle">Sign in to manage your portfolio</p>
            ${error ? `<div class="error-msg">${escapeHtml(error)}</div>` : ''}
            ${success ? `<div class="success-msg">${escapeHtml(success)}</div>` : ''}
            <form method="POST" action="/login">
                <div class="form-group">
                    <label class="form-label">Username</label>
                    <input type="text" name="username" class="form-control" required autofocus>
                </div>
                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" name="password" class="form-control" required>
                </div>
                <button type="submit" class="btn">Sign In</button>
            </form>
            <div class="auth-link">
                Don't have an account? <a href="/register">Register</a>
            </div>
            <div class="auth-link" style="margin-top: 0.75rem;">
                <a href="/" style="color: var(--text-secondary);">&larr; Back to Portfolio</a>
            </div>
        </div>
    </div>
</body>
</html>`;
}

export function renderRegister(error: string = ''): string {
    return `${baseHead('Register | Nikunj Pateliya', authCss)}
<body>
    <div class="auth-container">
        <div class="auth-card">
            <h1>Create Account</h1>
            <p class="subtitle">Register to manage your portfolio</p>
            ${error ? `<div class="error-msg">${escapeHtml(error)}</div>` : ''}
            <form method="POST" action="/register">
                <div class="form-group">
                    <label class="form-label">Username</label>
                    <input type="text" name="username" class="form-control" required autofocus minlength="3">
                </div>
                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" name="password" class="form-control" required minlength="12">
                </div>
                <div class="form-group">
                    <label class="form-label">Confirm Password</label>
                    <input type="password" name="confirm_password" class="form-control" required minlength="12">
                </div>
                <div class="form-group">
                    <label class="form-label">Invite Code</label>
                    <input type="text" name="invite_code" class="form-control" required>
                </div>
                <button type="submit" class="btn">Create Account</button>
            </form>
            <div class="auth-link">
                Already have an account? <a href="/login">Sign In</a>
            </div>
            <div class="auth-link" style="margin-top: 0.75rem;">
                <a href="/" style="color: var(--text-secondary);">&larr; Back to Portfolio</a>
            </div>
        </div>
    </div>
</body>
</html>`;
}

// ─── Admin Pages ───

const adminCss = `<style>
    .admin-layout { display: grid; grid-template-columns: 250px 1fr; min-height: 100vh; }
    .sidebar { background: var(--bg-card); border-right: 1px solid var(--border-color); padding: 2rem; display: flex; flex-direction: column; }
    .main-content { padding: 3rem; }
    .sidebar-menu { list-style: none; margin-top: 2rem; flex-grow: 1; }
    .sidebar-menu li { margin-bottom: 1rem; }
    .sidebar-menu a { display: block; padding: 10px 12px; border-radius: 8px; color: var(--text-secondary); font-weight: 500; }
    .sidebar-menu a:hover, .sidebar-menu a.active { background: rgba(255, 255, 255, 0.05); color: var(--text-primary); }
    .table-container { overflow-x: auto; background: var(--bg-card); border-radius: 12px; border: 1px solid var(--border-color); }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 16px; text-align: left; border-bottom: 1px solid var(--border-color); }
    th { font-weight: 600; color: var(--text-secondary); font-size: 0.9rem; }
    tr:last-child td { border-bottom: none; }
    .action-btn { padding: 6px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: 500; margin-right: 8px; border: none; cursor: pointer; }
    .btn-edit { background: rgba(52, 211, 153, 0.1); color: var(--accent-color); }
    .btn-delete { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
    .form-inline { display: flex; gap: 1rem; margin-bottom: 2rem; background: var(--bg-card); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-color); align-items: flex-end; flex-wrap: wrap; }
    .service-list { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
    .service-item { background: var(--bg-card); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-color); position: relative; }
    .btn-del-abs { position: absolute; top: 1rem; right: 1rem; background: rgba(239, 68, 68, 0.1); color: #ef4444; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; }
    .skill-item { display: inline-flex; align-items: center; background: rgba(255,255,255,0.05); padding: 6px 12px; border-radius: 99px; margin: 5px; border: 1px solid var(--border-color); }
    .del-x { margin-left: 8px; color: #ef4444; font-weight: bold; cursor: pointer; border:none; background:none; font-size: 1.1rem; }
    .message-card { background: var(--bg-card); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; }
    .message-header { display: flex; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 1rem; }
    .meta { color: var(--text-secondary); font-size: 0.9rem; }
    .status-new { color: var(--accent-color); font-weight: 600; }
    .btn-action { margin-left: 10px; font-size: 0.85rem; padding: 4px 10px; border-radius: 4px; border: none; cursor: pointer; }
    .btn-del { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
    .btn-read { background: rgba(52, 211, 153, 0.1); color: var(--accent-color); text-decoration: none; }
    .logout-btn { display: block; padding: 10px 12px; border-radius: 8px; color: #ef4444; font-weight: 500; background: rgba(239, 68, 68, 0.1); text-align: center; border: none; cursor: pointer; font-size: 0.95rem; width: 100%; font-family: inherit; }
    .alert-success { background: rgba(52, 211, 153, 0.1); color: var(--accent-color); padding: 1rem; border-radius: 8px; margin-bottom: 2rem; }
    @media (max-width: 768px) {
        .admin-layout { grid-template-columns: 1fr; }
        .sidebar { padding: 1rem; }
        .sidebar-menu { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem; }
        .form-inline { flex-direction: column; }
    }
</style>`;

function adminSidebar(activePage: string, username: string): string {
    return `<aside class="sidebar">
    <h2 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Admin Panel</h2>
    <p style="color: var(--text-secondary); font-size: 0.85rem;">Hi, ${escapeHtml(username)}</p>
    <ul class="sidebar-menu">
        <li><a href="/admin/projects" class="${activePage === 'projects' ? 'active' : ''}">Projects</a></li>
        <li><a href="/admin/skills" class="${activePage === 'skills' ? 'active' : ''}">Skills</a></li>
        <li><a href="/admin/services" class="${activePage === 'services' ? 'active' : ''}">Services</a></li>
        <li><a href="/admin/messages" class="${activePage === 'messages' ? 'active' : ''}">Messages</a></li>
        <li><a href="/admin/blog" class="${activePage === 'blog' ? 'active' : ''}">Blog Posts</a></li>
    </ul>
    <form method="POST" action="/logout">
        <button type="submit" class="logout-btn">Logout</button>
    </form>
  </aside>`;
}

export function renderAdminProjects(projects: ProjectRow[], username: string, msg: string = ''): string {
    const rows = projects.length > 0
        ? projects.map(p => {
            let imgUrl = p.image_url || '';
            if (imgUrl && !imgUrl.startsWith('http') && !imgUrl.startsWith('/')) {
                imgUrl = '/' + imgUrl;
            }
            return `<tr>
        <td><img src="${escapeHtml(imgUrl)}" alt="" style="width: 60px; height: 40px; object-fit: cover; border-radius: 4px;"></td>
        <td>${escapeHtml(p.title)}</td>
        <td>${escapeHtml(p.tags)}</td>
        <td>${p.is_featured ? 'Yes' : 'No'}</td>
        <td>
            <a href="/admin/projects/edit?id=${p.id}" class="action-btn btn-edit">Edit</a>
            <form method="POST" action="/admin/projects/delete" style="display: inline;" onsubmit="return confirm('Are you sure?');">
                <input type="hidden" name="id" value="${p.id}">
                <button type="submit" class="action-btn btn-delete">Delete</button>
            </form>
        </td>
      </tr>`;
        }).join('')
        : `<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-secondary);">No projects found.</td></tr>`;

    return `${baseHead('Manage Projects | Admin', adminCss)}
<body>
    <div class="admin-layout">
        ${adminSidebar('projects', username)}
        <main class="main-content">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h1>Projects</h1>
                <a href="/admin/projects/edit" class="btn">Add New Project</a>
            </div>
            ${msg ? `<div class="alert-success">${escapeHtml(msg)}</div>` : ''}
            <div class="table-container">
                <table>
                    <thead><tr><th>Image</th><th>Title</th><th>Tags</th><th>Featured</th><th>Actions</th></tr></thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        </main>
    </div>
</body></html>`;
}

export function renderProjectForm(project: ProjectRow | null, username: string): string {
    const isEdit = !!project;
    const title = isEdit ? 'Edit Project' : 'Add New Project';
    return `${baseHead(`${title} | Admin`, adminCss)}
<body>
    <div class="admin-layout">
        ${adminSidebar('projects', username)}
        <main class="main-content" style="max-width: 1050px;">
            <h1 style="margin-bottom: 2rem;">${title}</h1>
            <form method="POST" action="/admin/projects/save" style="display: grid; gap: 1.5rem;">
                ${isEdit ? `<input type="hidden" name="id" value="${project!.id}">` : ''}
                <div class="form-group">
                    <label class="form-label">Project Title</label>
                    <input type="text" name="title" class="form-control" required value="${escapeHtml(project?.title || '')}">
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea name="description" class="form-control" rows="5" required>${escapeHtml(project?.description || '')}</textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Tags (comma separated)</label>
                    <input type="text" name="tags" class="form-control" value="${escapeHtml(project?.tags || '')}" placeholder="PHP, React, CSS">
                </div>
                <div class="form-group">
                    <label class="form-label">Image URL or Local Path</label>
                    <input type="text" name="image_url" class="form-control" value="${escapeHtml(project?.image_url || '')}" placeholder="e.g. /assets/images/projects/photo.jpg or https://...">
                </div>
                <div class="form-group">
                    <label class="form-label">Project URL (Live Link)</label>
                    <input type="url" name="project_url" class="form-control" value="${escapeHtml(project?.project_url || '')}">
                </div>
                <div class="form-group">
                    <label class="form-label">Repository URL (GitHub)</label>
                    <input type="url" name="repo_url" class="form-control" value="${escapeHtml(project?.repo_url || '')}">
                </div>
                <div class="form-group">
                    <label class="form-label" style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                        <input type="checkbox" name="is_featured" ${project?.is_featured ? 'checked' : ''}>
                        Feature this project on homepage
                    </label>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <button type="submit" class="btn">Save Project</button>
                    <a href="/admin/projects" class="btn btn-outline" style="border: 1px solid var(--border-color);">Cancel</a>
                </div>
            </form>
        </main>
    </div>
</body></html>`;
}

export function renderAdminSkills(skills: SkillRow[], username: string): string {
    return `${baseHead('Skills | Admin', adminCss)}
<body>
    <div class="admin-layout">
        ${adminSidebar('skills', username)}
        <main class="main-content">
            <h1 style="margin-bottom: 2rem;">Manage Skills</h1>
            <form method="POST" action="/admin/skills/add" class="form-inline">
                <div style="flex-grow: 1;">
                    <label class="form-label">Skill Name</label>
                    <input type="text" name="name" class="form-control" placeholder="e.g. React" required>
                </div>
                <div style="width: 200px;">
                    <label class="form-label">Category</label>
                    <select name="category" class="form-control" required style="height: 46px;">
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="tools">Tools</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div style="width: 100px;">
                    <label class="form-label">Level %</label>
                    <input type="number" name="proficiency" class="form-control" value="80" min="0" max="100">
                </div>
                <button type="submit" class="btn">Add</button>
            </form>
            <h2 style="margin-bottom: 1rem; font-size: 1.25rem;">Current Skills</h2>
            <div>
                ${skills.map(s => `
                    <form method="POST" action="/admin/skills/delete" style="display: inline;">
                        <span class="skill-item">
                            ${escapeHtml(s.name)} (${escapeHtml(s.category)})
                            <input type="hidden" name="id" value="${s.id}">
                            <button type="submit" class="del-x" onclick="return confirm('Remove skill?');">&times;</button>
                        </span>
                    </form>
                `).join('')}
            </div>
        </main>
    </div>
</body></html>`;
}

export function renderAdminServices(services: ServiceRow[], username: string): string {
    return `${baseHead('Services | Admin', adminCss)}
<body>
    <div class="admin-layout">
        ${adminSidebar('services', username)}
        <main class="main-content">
            <h1 style="margin-bottom: 2rem;">Manage Services</h1>
            <form method="POST" action="/admin/services/add" style="background: var(--bg-card); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-color); margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem; font-size: 1.1rem;">Add New Service</h3>
                <div style="display: grid; gap: 1rem;">
                    <div>
                        <label class="form-label">Title</label>
                        <input type="text" name="title" class="form-control" required>
                    </div>
                    <div>
                        <label class="form-label">Icon (Emoji or Class)</label>
                        <input type="text" name="icon" class="form-control" placeholder="✦" required>
                    </div>
                    <div>
                        <label class="form-label">Description</label>
                        <textarea name="description" class="form-control" rows="3" required></textarea>
                    </div>
                    <button type="submit" class="btn">Add Service</button>
                </div>
            </form>
            <h2 style="margin-bottom: 1rem; font-size: 1.25rem;">Current Services</h2>
            <div class="service-list">
                ${services.map(s => `
                    <div class="service-item">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">${escapeHtml(s.icon)}</div>
                        <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem;">${escapeHtml(s.title)}</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">${escapeHtml(s.description)}</p>
                        <form method="POST" action="/admin/services/delete" onsubmit="return confirm('Delete service?');">
                            <input type="hidden" name="id" value="${s.id}">
                            <button type="submit" class="btn-del-abs">Delete</button>
                        </form>
                    </div>
                `).join('')}
            </div>
        </main>
    </div>
</body></html>`;
}

export function renderAdminMessages(messages: MessageRow[], username: string, msg: string = ''): string {
    const formatDate = (d: string): string => {
        try {
            return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
        } catch { return d; }
    };

    return `${baseHead('Messages | Admin', adminCss)}
<body>
    <div class="admin-layout">
        ${adminSidebar('messages', username)}
        <main class="main-content">
            <h1 style="margin-bottom: 2rem;">Inquiries</h1>
            ${msg ? `<div class="alert-success">${escapeHtml(msg)}</div>` : ''}
            ${messages.length === 0
            ? `<p style="color: var(--text-secondary);">No messages found.</p>`
            : messages.map(m => `
                <div class="message-card">
                    <div class="message-header">
                        <div>
                            <strong style="font-size: 1.1rem; display: block;">${escapeHtml(m.name)}</strong>
                            <span class="meta">${escapeHtml(m.email)}</span>
                        </div>
                        <div style="text-align: right;">
                            <div class="meta" style="margin-bottom: 5px;">${formatDate(m.created_at)}</div>
                            ${m.status === 'new'
                    ? `<span class="status-new">New</span>
                                 <form method="POST" action="/admin/messages/read" style="display: inline;">
                                     <input type="hidden" name="id" value="${m.id}">
                                     <button type="submit" class="btn-action btn-read">Mark Read</button>
                                 </form>`
                    : `<span class="meta">Read</span>`}
                        </div>
                    </div>
                    <p style="color: var(--text-primary); white-space: pre-wrap;">${escapeHtml(m.message)}</p>
                    <form method="POST" action="/admin/messages/delete" style="margin-top: 1rem; text-align: right;" onsubmit="return confirm('Delete this message?');">
                        <input type="hidden" name="id" value="${m.id}">
                        <button type="submit" class="btn-action btn-del">Delete</button>
                    </form>
                </div>
              `).join('')}
        </main>
    </div>
</body></html>`;
}

// ─── Blog CSS ───
const blogCss = `<style>
    .blog-hero { padding: 8rem 0 4rem; text-align: center; border-bottom: 1px solid var(--border-color); margin-bottom: 4rem; }
    .blog-hero-title { font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 800; margin-bottom: 1rem; }
    .blog-hero-sub { color: var(--text-secondary); font-size: 1.1rem; max-width: 480px; margin: 0 auto; }
    .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 2rem; }
    .blog-card { background: rgba(26, 26, 26, 0.45); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; overflow: hidden; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease; text-decoration: none; display: block; box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2); }
    .blog-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,0.5); border-color: rgba(52, 211, 153, 0.35); background: rgba(26, 26, 26, 0.65); }
    .blog-card-image { width: 100%; height: 210px; object-fit: cover; }
    .blog-card-image-placeholder { width: 100%; height: 210px; background: linear-gradient(135deg, var(--bg-secondary) 0%, rgba(52,211,153,0.06) 100%); display: flex; align-items: center; justify-content: center; font-size: 3rem; }
    .blog-card-body { padding: 1.75rem; }
    .blog-card-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.875rem; }
    .blog-card-tag { font-size: 0.72rem; font-weight: 600; padding: 3px 10px; border-radius: 99px; background: rgba(52,211,153,0.1); color: var(--accent-color); border: 1px solid rgba(52,211,153,0.2); letter-spacing: 0.04em; text-transform: uppercase; }
    .blog-card-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-primary); line-height: 1.4; }
    .blog-card-excerpt { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.65; margin-bottom: 1.25rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    .blog-card-meta { display: flex; justify-content: space-between; align-items: center; color: var(--text-muted); font-size: 0.82rem; padding-top: 1rem; border-top: 1px solid var(--border-color); }
    .blog-card-read { color: var(--accent-color); font-weight: 600; font-size: 0.88rem; }
    .blog-empty { text-align: center; padding: 6rem 2rem; color: var(--text-secondary); grid-column: 1 / -1; }
    .blog-empty h3 { font-size: 1.5rem; margin-bottom: 0.75rem; color: var(--text-primary); }
    /* Single post */
    .post-container { background: rgba(26, 26, 26, 0.45); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 24px; padding: 3rem; margin: 2rem auto 6rem; box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3); }
    @media (max-width: 768px) { .post-container { padding: 1.5rem; margin: 1rem auto 4rem; border-radius: 16px; } }
    .post-cover { position: relative; height: 460px; overflow: hidden; border-radius: 24px; margin: 2rem auto 3rem; max-width: 900px; }
    .post-cover img { width: 100%; height: 100%; object-fit: cover; }
    .post-cover-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 60%); border-radius: 24px; }
    .post-cover-placeholder { width: 100%; height: 100%; background: linear-gradient(135deg, var(--bg-secondary), rgba(52,211,153,0.08)); border-radius: 24px; display: flex; align-items: center; justify-content: center; font-size: 5rem; }
    .post-header { max-width: 800px; margin: 0 auto 3rem; padding: 0 1.5rem; }
    .post-back { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-size: 0.9rem; margin-bottom: 2rem; transition: color 0.2s; text-decoration: none; }
    .post-back:hover { color: var(--accent-color); }
    .post-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
    .post-title { font-size: clamp(1.75rem, 4vw, 3rem); font-weight: 800; line-height: 1.2; margin-bottom: 1.25rem; color: var(--text-primary); }
    .post-meta { display: flex; gap: 2rem; flex-wrap: wrap; color: var(--text-muted); font-size: 0.88rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border-color); }
    .post-body { max-width: 800px; margin: 0 auto; padding: 0 1.5rem 6rem; line-height: 1.85; font-size: 1.05rem; color: var(--text-secondary); }
    .post-body h2 { color: var(--text-primary); font-size: 1.6rem; font-weight: 700; margin: 2.5rem 0 1rem; }
    .post-body h3 { color: var(--text-primary); font-size: 1.25rem; font-weight: 600; margin: 2rem 0 0.75rem; }
    .post-body p { margin-bottom: 1.5rem; }
    .post-body a { color: var(--accent-color); text-decoration: underline; text-underline-offset: 3px; }
    .post-body ul, .post-body ol { margin: 0 0 1.5rem 1.5rem; }
    .post-body li { margin-bottom: 0.5rem; }
    .post-body blockquote { border-left: 3px solid var(--accent-color); padding: 0.5rem 0 0.5rem 1.5rem; margin: 2rem 0; color: var(--text-muted); font-style: italic; }
    .post-body code { background: var(--bg-card); padding: 2px 7px; border-radius: 5px; font-family: 'JetBrains Mono', monospace; font-size: 0.88em; border: 1px solid var(--border-color); }
    .post-body pre { background: var(--bg-card); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: 14px; overflow-x: auto; margin: 1.75rem 0; }
    .post-body pre code { background: none; border: none; padding: 0; }
    .post-body img { max-width: 100%; border-radius: 12px; margin: 1.5rem 0; }
    .post-body hr { border: none; border-top: 1px solid var(--border-color); margin: 2.5rem 0; }
</style>`;

function blogNav(active: string = ''): string {
    return `<nav class="glass main-nav">
        <div class="container nav-container">
            <a href="/" class="nav-logo"><img src="/assets/images/logo.jpg" alt="Nikunj Pateliya"></a>
            <div class="nav-links">
                <a href="/#work">Work</a>
                <a href="/#services">Services</a>
                <a href="/#about">About</a>
                <a href="/blog" style="${active==='blog'?'color:var(--accent-color);':''}">Blog</a>
                <a href="/#contact" class="btn">Let's Talk</a>
            </div>
        </div>
    </nav>`;
}

// ─── Blog Listing Page ───
export function renderBlog(posts: BlogPostRow[]): string {
    const formatDate = (d: string) => {
        try { return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }); }
        catch { return d; }
    };
    const readingTime = (content: string | null) => {
        const words = (content || '').replace(/<[^>]+>/g, '').match(/\S+/g)?.length ?? 0;
        return `${Math.max(1, Math.round(words / 200))} min read`;
    };

    const cards = posts.length > 0
        ? posts.map(p => {
            const tags = (p.tags || '').split(',').map(t => t.trim()).filter(Boolean);
            let imgUrl = p.cover_image_url || '';
            if (imgUrl && !imgUrl.startsWith('http') && !imgUrl.startsWith('/')) imgUrl = '/' + imgUrl;
            const imgHtml = imgUrl
                ? `<img src="${escapeHtml(imgUrl)}" alt="${escapeHtml(p.title)}" class="blog-card-image">`
                : `<div class="blog-card-image-placeholder">✍️</div>`;
            return `<a href="/blog/${escapeHtml(p.slug)}" class="blog-card">
                ${imgHtml}
                <div class="blog-card-body">
                    ${tags.length ? `<div class="blog-card-tags">${tags.map(t => `<span class="blog-card-tag">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
                    <h2 class="blog-card-title">${escapeHtml(p.title)}</h2>
                    ${p.excerpt ? `<p class="blog-card-excerpt">${escapeHtml(p.excerpt)}</p>` : ''}
                    <div class="blog-card-meta">
                        <span>${formatDate(p.created_at)}</span>
                        <span class="blog-card-read">${readingTime(p.content)} &rarr;</span>
                    </div>
                </div>
            </a>`;
        }).join('')
        : `<div class="blog-empty"><h3>No posts yet.</h3><p>Check back soon for new articles.</p></div>`;

    return `${baseHead('Blog | Nikunj Pateliya', blogCss)}
<body>
    ${blogNav('blog')}
    <div class="blog-hero">
        <div class="container">
            <p style="color:var(--accent-color);font-size:0.85rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:1rem;">Writing &amp; Thoughts</p>
            <h1 class="blog-hero-title">The Blog</h1>
            <p class="blog-hero-sub">Insights on web design, development, and the digital world.</p>
        </div>
    </div>
    <main class="section" style="padding-top:0;">
        <div class="container">
            <div class="blog-grid">${cards}</div>
        </div>
    </main>
    <footer class="footer">
        <div class="container" style="display:flex;justify-content:space-between;align-items:center;">
            <span>&copy; ${new Date().getFullYear()} Nikunj Pateliya. All rights reserved.</span>
            <a href="/" style="color:var(--text-muted);font-size:0.85rem;">&larr; Portfolio</a>
        </div>
    </footer>
    <script src="/assets/js/main.js"></script>
</body></html>`;
}

// ─── Single Blog Post Page ───
export function renderBlogPost(post: BlogPostRow): string {
    const formatDate = (d: string) => {
        try { return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }); }
        catch { return d; }
    };
    const words = (post.content || '').replace(/<[^>]+>/g, '').match(/\S+/g)?.length ?? 0;
    const readingTime = Math.max(1, Math.round(words / 200));
    const tags = (post.tags || '').split(',').map(t => t.trim()).filter(Boolean);
    let imgUrl = post.cover_image_url || '';
    if (imgUrl && !imgUrl.startsWith('http') && !imgUrl.startsWith('/')) imgUrl = '/' + imgUrl;

    const coverHtml = imgUrl
        ? `<div class="post-cover"><img src="${escapeHtml(imgUrl)}" alt="${escapeHtml(post.title)}"><div class="post-cover-overlay"></div></div>`
        : `<div class="post-cover" style="max-width:900px;margin:2rem auto 3rem;"><div class="post-cover-placeholder">✍️</div></div>`;

    return `${baseHead(`${escapeHtml(post.title)} | Blog | Nikunj Pateliya`, blogCss)}
<body>
    ${blogNav('blog')}
    <main style="padding-top:5rem;">
        <div class="container" style="max-width:900px;">
            <div class="post-container">
                <a href="/blog" class="post-back">&larr; Back to Blog</a>
                ${coverHtml}
                <div class="post-header" style="margin-top:2rem;margin-bottom:2rem;max-width:100%;padding:0;">
                    ${tags.length ? `<div class="post-tags">${tags.map(t => `<span class="blog-card-tag">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
                    <h1 class="post-title" style="margin-bottom:1rem;">${escapeHtml(post.title)}</h1>
                    <div class="post-meta" style="padding-bottom:1.5rem;">
                        <span>&#128197; ${formatDate(post.created_at)}</span>
                        <span>&#9203; ${readingTime} min read</span>
                        ${tags.length ? `<span>&#127991; ${tags.slice(0, 3).map(t => escapeHtml(t)).join(', ')}</span>` : ''}
                    </div>
                </div>
                <div class="post-body" style="padding:0;max-width:100%;">${post.content || '<p>No content yet.</p>'}</div>
            </div>
        </div>
    </main>
    <footer class="footer">
        <div class="container" style="display:flex;justify-content:space-between;align-items:center;">
            <span>&copy; ${new Date().getFullYear()} Nikunj Pateliya. All rights reserved.</span>
            <a href="/blog" style="color:var(--text-muted);font-size:0.85rem;">&larr; Back to Blog</a>
        </div>
    </footer>
    <script src="/assets/js/main.js"></script>
</body></html>`;
}

// ─── Admin: Blog Post List ───
export function renderAdminBlog(posts: BlogPostRow[], username: string, msg: string = ''): string {
    const rows = posts.length > 0
        ? posts.map(p => `<tr>
            <td style="font-weight:500;">${escapeHtml(p.title)}</td>
            <td><code style="font-size:0.78rem;color:var(--text-muted);">/blog/${escapeHtml(p.slug)}</code></td>
            <td>${(p.tags || '').split(',').filter(Boolean).slice(0, 2).map(t => `<span class="tag" style="font-size:0.75rem;">${escapeHtml(t.trim())}</span>`).join(' ')}</td>
            <td><span style="color:${p.is_published ? 'var(--accent-color)' : 'var(--text-muted)'};font-weight:600;">${p.is_published ? '&#10003; Published' : '&#9675; Draft'}</span></td>
            <td>
                <a href="/admin/blog/edit?id=${p.id}" class="action-btn btn-edit">Edit</a>
                <form method="POST" action="/admin/blog/delete" style="display:inline;" onsubmit="return confirm('Delete this post?');">
                    <input type="hidden" name="id" value="${p.id}">
                    <button type="submit" class="action-btn btn-delete">Delete</button>
                </form>
            </td>
        </tr>`).join('')
        : `<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-secondary);">No blog posts yet. Write your first one!</td></tr>`;

    return `${baseHead('Blog Posts | Admin', adminCss)}<body>
    <div class="admin-layout">
        ${adminSidebar('blog', username)}
        <main class="main-content">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;">
                <h1>Blog Posts</h1>
                <a href="/admin/blog/edit" class="btn">Write New Post</a>
            </div>
            ${msg ? `<div class="alert-success">${escapeHtml(msg)}</div>` : ''}
            <div class="table-container">
                <table>
                    <thead><tr><th>Title</th><th>Slug</th><th>Tags</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        </main>
    </div>
</body></html>`;
}

// ─── Admin: Blog Post Form (Create / Edit) ───
export function renderBlogPostForm(post: BlogPostRow | null, username: string): string {
    const isEdit = !!post;
    const formTitle = isEdit ? 'Edit Post' : 'Write New Post';
    const extraCss = adminCss + `<style>
        .editor { min-height: 420px; font-family: 'JetBrains Mono', monospace; font-size: 0.88rem; line-height: 1.6; resize: vertical; }
        .slug-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .slug-hint { color: var(--text-muted); font-size: 0.78rem; margin-top: 0.35rem; }
        @media (max-width: 640px) { .slug-row { grid-template-columns: 1fr; } }
    </style>`;
    return `${baseHead(`${formTitle} | Admin`, extraCss)}<body>
    <div class="admin-layout">
        ${adminSidebar('blog', username)}
        <main class="main-content" style="max-width:1050px;">
            <h1 style="margin-bottom:2rem;">${formTitle}</h1>
            <form method="POST" action="/admin/blog/save" style="display:grid;gap:1.5rem;">
                ${isEdit ? `<input type="hidden" name="id" value="${post!.id}">` : ''}
                <div class="slug-row">
                    <div class="form-group">
                        <label class="form-label">Post Title</label>
                        <input type="text" id="post-title" name="title" class="form-control" required
                            value="${escapeHtml(post?.title || '')}" oninput="autoSlug(this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Slug (URL)</label>
                        <input type="text" id="post-slug" name="slug" class="form-control" required
                            value="${escapeHtml(post?.slug || '')}" placeholder="my-awesome-post">
                        <p class="slug-hint">yoursite.com/blog/<span id="slug-preview">${escapeHtml(post?.slug || 'my-awesome-post')}</span></p>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Excerpt <span style="color:var(--text-muted);font-weight:400;">(short summary shown in cards)</span></label>
                    <textarea name="excerpt" class="form-control" rows="2"
                        placeholder="A brief, compelling summary of your post...">${escapeHtml(post?.excerpt || '')}</textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Content <span style="color:var(--text-muted);font-weight:400;">(HTML supported)</span></label>
                    <textarea name="content" class="form-control editor"
                        placeholder="&lt;p&gt;Start writing your post...&lt;/p&gt;">${escapeHtml(post?.content || '')}</textarea>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
                    <div class="form-group">
                        <label class="form-label">Cover Image URL</label>
                        <input type="text" name="cover_image_url" class="form-control"
                            value="${escapeHtml(post?.cover_image_url || '')}" placeholder="https://... or /assets/images/...">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Tags <span style="color:var(--text-muted);font-weight:400;">(comma separated)</span></label>
                        <input type="text" name="tags" class="form-control"
                            value="${escapeHtml(post?.tags || '')}" placeholder="Web Design, React, CSS">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label" style="display:flex;align-items:center;gap:10px;cursor:pointer;">
                        <input type="checkbox" name="is_published" ${post?.is_published ? 'checked' : ''}>
                        Publish this post (visible on /blog)
                    </label>
                </div>
                <div style="display:flex;gap:1rem;">
                    <button type="submit" class="btn">Save Post</button>
                    <a href="/admin/blog" class="btn btn-outline" style="border:1px solid var(--border-color);">Cancel</a>
                    ${isEdit && post!.is_published ? `<a href="/blog/${escapeHtml(post!.slug)}" target="_blank" class="btn btn-outline" style="border:1px solid var(--border-color);">View Live &rarr;</a>` : ''}
                </div>
            </form>
        </main>
    </div>
    <script>
        function autoSlug(val) {
            const el = document.getElementById('post-slug');
            if (el._edited) return;
            el.value = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            updatePreview();
        }
        function updatePreview() {
            const el = document.getElementById('post-slug');
            const prev = document.getElementById('slug-preview');
            if (prev) prev.textContent = el.value || 'my-awesome-post';
        }
        document.getElementById('post-slug').addEventListener('input', function() {
            this._edited = true;
            updatePreview();
        });
        updatePreview();
    </script>
</body></html>`;
}
