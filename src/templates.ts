export function layout(title: string, content: string, description: string = "Portfolio of Nikunj Pateliya", role?: 'admin' | 'user'): string {
  let roleHtml = '';
  let drawerRoleHtml = '';
  if (role === 'admin') {
    roleHtml = `
      <li><a class="nav-link" href="/admin/menu">Admin Panel</a></li>
      <li>
        <form action="/admin/logout" method="POST" style="display:inline; margin:0; padding:0;">
          <button type="submit" class="nav-link-btn" style="background:none; border:1px solid var(--border-glass); color:var(--text-primary); cursor:pointer; font-weight:600; font-size:0.85rem; padding:6px 16px; border-radius:99px;">Logout</button>
        </form>
      </li>
    `;
    drawerRoleHtml = `
      <li><a class="drawer-link" href="/admin/menu">Admin Panel</a></li>
      <li>
        <form action="/admin/logout" method="POST" style="margin:0; padding:0;">
          <button type="submit" class="drawer-link drawer-btn-logout" style="width:100%; text-align:left; background:none; border:1px solid var(--border-glass); color:var(--text-primary); cursor:pointer; font-weight:600; font-size:1rem; padding:12px 16px; border-radius:12px;">Logout</button>
        </form>
      </li>
    `;
  } else if (role === 'user') {
    roleHtml = `
      <li><a class="nav-link" href="/client/dashboard">My Portal</a></li>
      <li>
        <form action="/user/logout" method="POST" style="display:inline; margin:0; padding:0;">
          <button type="submit" class="nav-link-btn" style="background:none; border:1px solid var(--border-glass); color:var(--text-primary); cursor:pointer; font-weight:600; font-size:0.85rem; padding:6px 16px; border-radius:99px;">Logout</button>
        </form>
      </li>
    `;
    drawerRoleHtml = `
      <li><a class="drawer-link" href="/client/dashboard">My Portal</a></li>
      <li>
        <form action="/user/logout" method="POST" style="margin:0; padding:0;">
          <button type="submit" class="drawer-link drawer-btn-logout" style="width:100%; text-align:left; background:none; border:1px solid var(--border-glass); color:var(--text-primary); cursor:pointer; font-weight:600; font-size:1rem; padding:12px 16px; border-radius:12px;">Logout</button>
        </form>
      </li>
    `;
  } else {
    roleHtml = `<li><a class="nav-link-btn" href="/user/login">Clients</a></li>`;
    drawerRoleHtml = `<li><a class="drawer-link drawer-link-btn" href="/user/login">Clients</a></li>`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Nikunj Pateliya</title>
  <meta name="description" content="${description}">
  <link rel="icon" type="image/png" href="/favicon.png">
  <link rel="stylesheet" href="/assets/css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <script>
    (function() {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.className = savedTheme + '-theme';
    })();
  </script>
</head>
<body id="page-top">
  <nav class="navbar" id="mainNav">
    <div class="nav-container">
      <a class="nav-brand" href="/">Nikunj.P</a>
      <ul class="nav-menu">
        <li><a class="nav-link" href="/#home">Home</a></li>
        <li><a class="nav-link" href="/#about">About</a></li>
        <li><a class="nav-link" href="/#services">Services</a></li>
        <li><a class="nav-link" href="/#portfolio">Projects</a></li>
        <li><a class="nav-link" href="/#testimonials">Testimonials</a></li>
        <li><a class="nav-link" href="/#blog">Blog</a></li>
        <li><a class="nav-link" href="/user/login">Contact</a></li>
        ${roleHtml}
      </ul>
      <div class="nav-actions">
        <button id="theme-toggle" class="btn-theme" aria-label="Toggle visual theme" data-track-event="theme_toggle" data-track-category="ui">Theme</button>
        <button id="navToggle" class="nav-toggle-btn" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobileDrawer">
          <span class="hamburger-icon">
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
          </span>
        </button>
      </div>
    </div>
  </nav>

  <div id="navBackdrop" class="nav-drawer-backdrop"></div>
  <aside id="mobileDrawer" class="nav-drawer" aria-hidden="true">
    <div class="drawer-header">
      <a class="nav-brand" href="/">Nikunj.P</a>
      <button id="drawerClose" class="drawer-close-btn" aria-label="Close navigation menu">&times;</button>
    </div>
    <ul class="drawer-menu">
      <li><a class="drawer-link" href="/#home">Home</a></li>
      <li><a class="drawer-link" href="/#about">About</a></li>
      <li><a class="drawer-link" href="/#services">Services</a></li>
      <li><a class="drawer-link" href="/#portfolio">Projects</a></li>
      <li><a class="drawer-link" href="/#testimonials">Testimonials</a></li>
      <li><a class="drawer-link" href="/#blog">Blog</a></li>
      <li><a class="drawer-link" href="/user/login">Contact</a></li>
      ${drawerRoleHtml}
    </ul>
    <div class="drawer-footer">
      <button id="drawer-theme-toggle" class="btn-theme drawer-theme-btn" aria-label="Toggle visual theme" data-track-event="theme_toggle" data-track-category="ui">Theme</button>
    </div>
  </aside>
  
  <main id="main-scroll-container" data-scroll-container>
    ${content}
  </main>
  
  <div class="transition-curtain"></div>
  
  <div id="cookie-consent-banner" class="cookie-banner" style="display:none; position:fixed; bottom:20px; left:50%; transform:translateX(-50%); width:min(92%, 680px); background:var(--bg-card, rgba(255,255,255,0.95)); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); border:1px solid var(--border-glass, rgba(0,0,0,0.1)); border-radius:16px; padding:18px 24px; box-shadow:0 10px 30px rgba(0,0,0,0.15); z-index:99999; transition:all 0.3s ease;">
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px;">
      <div style="flex:1 1 300px;">
        <p style="margin:0 0 4px 0; font-weight:700; font-size:0.95rem; color:var(--text-primary);">Cookie Consent & Privacy Notice</p>
        <p style="margin:0; font-size:0.85rem; color:var(--text-secondary); line-height:1.4;">
          We use essential cookies for security and authentication. Read our <a href="/privacy" style="color:var(--text-primary); text-decoration:underline;">Privacy Policy</a> & <a href="/terms" style="color:var(--text-primary); text-decoration:underline;">Terms & Conditions</a>.
        </p>
      </div>
      <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
        <button id="cookie-accept-essential" class="btn-outline" style="font-size:0.85rem; padding:8px 14px; min-height:auto;">Essential Only</button>
        <button id="cookie-accept-all" class="btn" style="font-size:0.85rem; padding:8px 16px; min-height:auto;">Accept All</button>
      </div>
    </div>
  </div>
  <script>
    (function() {
      try {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
          const banner = document.getElementById('cookie-consent-banner');
          if (banner) banner.style.display = 'block';
        }
        document.getElementById('cookie-accept-all')?.addEventListener('click', function() {
          localStorage.setItem('cookie_consent', 'all');
          const banner = document.getElementById('cookie-consent-banner');
          if (banner) banner.style.display = 'none';
        });
        document.getElementById('cookie-accept-essential')?.addEventListener('click', function() {
          localStorage.setItem('cookie_consent', 'essential');
          const banner = document.getElementById('cookie-consent-banner');
          if (banner) banner.style.display = 'none';
        });
      } catch(e) {}
    })();
  </script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="/assets/js/tracker.js" defer></script>
  <script src="/assets/js/main.js"></script>
</body>
</html>`;
}

export function homePage(data: { projects: any[]; skills: any[]; services: any[]; blogPosts: any[]; testimonials?: any[]; metadata?: Record<string, string> }, role?: 'admin' | 'user'): string {
  const meta = data.metadata || {};
  const siteName = meta.site_name || 'Nikunj Pateliya';
  const publicRole = meta.public_role || 'Web Designer';
  const aboutBio1 = meta.about_bio_1 || 'Hi, I’m Nikunj Pateliya — a freelance web developer, Android creator, and website tester. I build and fine-tune high-performance digital products from the ground up, combining solid code architecture, precise quality testing, and modern UI design.';
  const aboutBio2 = meta.about_bio_2 || '';
  const heroImage = meta.hero_image_url || '/assets/images/uploads/hero-image.jpg';
  const profileImage = meta.about_profile_image || '/assets/images/uploads/about.jpeg';
  const cvUrl = meta.about_cv_url || '/assets/Nikunjkumar_Pateliya_CV.pdf';
  const instagramUrl = meta.social_instagram || 'https://www.instagram.com/_nik__16/';
  const githubUrl = meta.social_github || 'https://github.com/NIKUNJ160';
  const linkedinUrl = meta.social_linkedin || 'https://www.linkedin.com/in/nikunjpateliya1608';
  const whatsappUrl = meta.social_whatsapp || 'https://wa.me/919328801435';

  const icons = {
    web: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
    responsive: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`,
    creative: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 1 8 4.5l-2.5 2.5a6 6 0 1 0-11 0L4 6.5A10 10 0 0 1 12 2z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
    support: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
    idea: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5.5 5.5 0 0 0 7.5 5C6 6.3 5.5 7.6 5.5 9c0 1.3.5 2.6 1.5 3.5.7.8 1.3 1.5 1.5 2.5"></path><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line></svg>`,
    design: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path><path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"></path></svg>`
  };

  const servicesList = (data.services && data.services.length > 0) ? data.services : [];
  const servicesHtml = servicesList.length > 0
    ? servicesList.map((s: any) => `
      <div class="glass service-card" data-scroll>
        <div class="service-icon-box">
          ${s.icon || icons.web}
        </div>
        <h3>${s.title}</h3>
        <p>${s.desc || s.description || ''}</p>
      </div>
    `).join('')
    : `<p class="text-secondary" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">No services listed yet.</p>`;

  const defaultProjects = [
    { title: 'Corporate Portal', category: 'Web Development', class_name: 'gal_a', image_url: '/assets/images/uploads/gallery_img-01.jpg', content: 'Modern enterprise dashboard with secure client authentication and real-time project management.' },
    { title: 'Creative Layout', category: 'Creative Design', class_name: 'gal_b', image_url: '/assets/images/uploads/gallery_img-02.jpg', content: 'Bespoke design system featuring modular bento structures and custom fluid typography.' },
    { title: 'Brand Identity', category: 'Graphic Design', class_name: 'gal_c', image_url: '/assets/images/uploads/gallery_img-03.jpg', content: 'Complete brand guidelines, modern vector typography, and digital asset kit.' },
    { title: 'SaaS Dashboard', category: 'Web Development', class_name: 'gal_a', image_url: '/assets/images/uploads/gallery_img-04.jpg', content: 'High-performance metrics visualization interface with dark and light glassmorphism themes.' },
    { title: 'E-commerce App', category: 'Web Development', class_name: 'gal_a', image_url: '/assets/images/uploads/gallery_img-05.jpg', content: 'Responsive edge-rendered store with fast checkout workflows and instant search.' },
    { title: 'Digital Agency', category: 'Creative Design', class_name: 'gal_b', image_url: '/assets/images/uploads/gallery_img-06.jpg', content: 'Interactive showcase website with smooth GSAP animations and accessible navigation.' }
  ];

  const portfolioList = (data.projects && data.projects.length > 0) ? data.projects : defaultProjects;
  const portfolioHtml = portfolioList.map((p: any, idx: number) => {
    const title = p.title || 'Portfolio Project';
    const cat = p.category || p.cat || 'Portfolio';
    const img = p.image_url || p.img || '/assets/images/uploads/gallery_img-01.jpg';
    const desc = p.content || p.description || p.desc || 'High-performance digital project crafted with modern web architecture and responsive design.';
    const isOverflow = idx >= 6;
    return `
      <div class="glass gallery-item ${p.class_name || p.class || 'gal_a'} ${isOverflow ? 'hidden' : ''}" 
           data-scroll 
           data-overflow="${isOverflow ? 'true' : 'false'}"
           data-title="${title.replace(/"/g, '&quot;')}" 
           data-category="${cat.replace(/"/g, '&quot;')}" 
           data-img="${img}" 
           data-desc="${desc.replace(/"/g, '&quot;')}"
           tabindex="0"
           role="button"
           aria-label="View project: ${title.replace(/"/g, '&quot;')}"
           data-track-event="project_click" 
           data-track-category="engagement" 
           data-track-label="${title.replace(/"/g, '&quot;')}">
        <div class="gallery-image-wrapper">
          <img src="${img}" alt="${title.replace(/"/g, '&quot;')}" class="gallery-image" loading="lazy">
          <span class="gallery-hover-cta">Quick View ↗</span>
        </div>
        <div class="gallery-info">
          <h4>${title}</h4>
          <span class="gallery-category">${cat}</span>
        </div>
      </div>
    `;
  }).join('');

  const testimonialsList = (data.testimonials && data.testimonials.length > 0) ? data.testimonials : [];
  const testimonialsHtml = testimonialsList.length > 0
    ? testimonialsList.map((t: any) => `
      <div class="glass testimonial-card" data-scroll>
        <div class="testimonial-header">
          <img src="${t.img || '/assets/images/uploads/testi_01.png'}" alt="${t.name}" class="testimonial-avatar">
          <div class="testimonial-meta">
            <h4>${t.name}</h4>
            <span class="text-muted">${t.role}</span>
          </div>
        </div>
        <p class="testimonial-text">"${t.text}"</p>
      </div>
    `).join('')
    : `<p class="text-secondary" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">No testimonials published yet.</p>`;

  const latestBlogPosts = (data.blogPosts || []).slice(0, 3);
  const blogHtml = latestBlogPosts.length > 0
    ? latestBlogPosts.map((p: any) => `
      <article class="glass blog-card" data-scroll>
        <div class="blog-card-meta">
          <span class="blog-card-date">${new Date(p.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
        </div>
        <h3><a href="/blog/${p.slug}">${p.title}</a></h3>
        ${p.excerpt ? `<p class="text-secondary">${p.excerpt}</p>` : ''}
        <a href="/blog/${p.slug}" class="blog-read-more">Read More &rarr;</a>
      </article>
    `).join('')
    : `<p class="text-secondary" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">No blog articles published yet.</p>`;

  const content = `
    <section id="home" class="main-banner" style="background-image: url('${heroImage}');" data-scroll-section>
      <div class="heading">
        <span class="banner-greeting">HELLO, I'M</span>
        <h1 class="hero-title">${siteName}</h1>
        <h3 class="cd-headline">
          <span class="typewriter-text" data-words='["${publicRole}", "Full-Stack Developer", "Creative Concept Architect"]'>${publicRole}</span>
        </h3>
        <div class="hero-actions">
          <a href="#about" class="btn">Learn More</a>
          <a href="#portfolio" class="btn-outline" data-track-event="project_click" data-track-category="engagement" data-track-label="View Projects Done">View Projects Done</a>
        </div>
      </div>
    </section>


    <section id="about" class="section-container" data-scroll-section>
      <div class="about-row">
        <div class="about-col text-col" data-scroll>
          <span class="section-tag">INTRODUCTION</span>
          <h2 class="section-heading">About ${siteName}</h2>
          <p>${aboutBio1}</p>
          ${aboutBio2 ? `<p style="margin-top: 1rem;">${aboutBio2}</p>` : ''}
          <a href="${cvUrl}" class="btn" style="margin-top: 1.5rem;" target="_blank" download data-track-event="cv_download" data-track-category="conversion" data-track-label="cv_pdf">Download CV</a>
        </div>
        <div class="about-col image-col" data-scroll>
          <div class="profile-image-wrapper glass">
            <img src="${profileImage}" alt="${siteName}" class="profile-image">
          </div>
        </div>
      </div>
    </section>

    <section id="services" class="section-container" data-scroll-section>
      <div class="section-header">
        <span class="section-tag">CAPABILITIES</span>
        <h2 class="section-heading">Services Offered</h2>
      </div>
      <div class="services-grid">
        ${servicesHtml}
      </div>
    </section>

    <section id="portfolio" class="section-container" data-scroll-section>
      <div class="section-header">
        <div>
          <span class="section-tag">GALLERY</span>
          <h2 class="section-heading">Projects Done</h2>
        </div>
        <div class="gallery-menu">
          <button class="active filter-btn" data-filter="all" data-track-event="portfolio_filter" data-track-category="interaction" data-track-label="all">All</button>
          <button class="filter-btn" data-filter="gal_a" data-track-event="portfolio_filter" data-track-category="interaction" data-track-label="gal_a">Web Dev</button>
          <button class="filter-btn" data-filter="gal_b" data-track-event="portfolio_filter" data-track-category="interaction" data-track-label="gal_b">Creative</button>
          <button class="filter-btn" data-filter="gal_c" data-track-event="portfolio_filter" data-track-category="interaction" data-track-label="gal_c">Graphic</button>
        </div>
      </div>
      <div class="gallery-list">
        ${portfolioHtml}
      </div>
      ${portfolioList.length > 6 ? `
        <div class="section-cta" style="margin-top: 1.5rem; text-align: center;">
          <button id="toggleMoreProjects" class="btn-outline" style="font-size: 0.82rem; padding: 7px 22px; cursor: pointer;">
            Show All (${portfolioList.length}) &darr;
          </button>
        </div>` : ''}
    </section>

    <!-- Project Quick-View Modal -->
    <div id="projectModal" class="project-modal" aria-hidden="true" role="dialog" aria-labelledby="projectModalTitle">
      <div class="project-modal-backdrop" id="projectModalBackdrop"></div>
      <div class="project-modal-dialog glass">
        <button class="project-modal-close" id="projectModalClose" aria-label="Close dialog">&times;</button>
        <div class="project-modal-media">
          <img id="projectModalImg" src="" alt="Project Preview" class="project-modal-img">
        </div>
        <div class="project-modal-body">
          <span id="projectModalCat" class="project-modal-cat"></span>
          <h3 id="projectModalTitle" class="project-modal-title"></h3>
          <p id="projectModalDesc" class="project-modal-desc"></p>
        </div>
      </div>
    </div>

    <section id="testimonials" class="section-container" data-scroll-section>
      <div class="section-header">
        <span class="section-tag">FEEDBACK</span>
        <h2 class="section-heading">Testimonials</h2>
      </div>
      <div class="testimonials-grid">
        ${testimonialsHtml}
      </div>
    </section>

    <section id="blog" class="section-container" data-scroll-section>
      <div class="section-header">
        <span class="section-tag">ARTICLES</span>
        <h2 class="section-heading">Blog & Writing</h2>
      </div>
      <div class="blog-grid">
        ${blogHtml}
      </div>
      <div class="section-cta">
        <a href="/blog" class="btn-outline">View All Articles &rarr;</a>
      </div>
    </section>

    <section id="contact" class="section-container" data-scroll-section>
      <div class="section-header" style="text-align: center;">
        <span class="section-tag">LET'S TALK</span>
        <h2 class="section-heading">Contact Us</h2>
      </div>
      <div id="contact-msg" style="display:none; padding:1rem 1.5rem; border-radius:10px; font-weight:600; font-size:0.95rem; text-align:center; margin-bottom:1.2rem;"></div>
      <form id="contact-form" class="glass contact-form" data-scroll data-track-event="contact_form_submit" data-track-category="conversion" data-track-label="contact_form" novalidate>
        <div class="form-row">
          <input type="text" name="name" placeholder="Your Name" required class="form-input">
          <input type="email" name="email" placeholder="Your Email" required class="form-input">
        </div>
        <input type="tel" name="phone" placeholder="Your Phone Number" class="form-input">
        <textarea name="message" placeholder="Your Message" required class="form-textarea"></textarea>
        <button type="submit" id="contact-btn" class="btn" style="align-self: center;">Send Message</button>
      </form>
      <script>
        (function() {
          var form = document.getElementById('contact-form');
          var msgBox = document.getElementById('contact-msg');
          var btn = document.getElementById('contact-btn');
          if (!form) return;
          form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!form.checkValidity()) { form.reportValidity(); return; }
            btn.disabled = true;
            btn.textContent = 'Sending\u2026';
            msgBox.style.display = 'none';
            var data = new URLSearchParams(new FormData(form));
            fetch('/contact', { method: 'POST', body: data })
              .then(function(r) { return r.json(); })
              .then(function(res) {
                if (res.ok) {
                  msgBox.textContent = res.message;
                  msgBox.style.background = 'rgba(16,185,129,0.15)';
                  msgBox.style.color = '#10B981';
                  msgBox.style.border = '1px solid rgba(16,185,129,0.3)';
                  form.reset();
                } else {
                  msgBox.textContent = res.message;
                  msgBox.style.background = 'rgba(239,68,68,0.15)';
                  msgBox.style.color = '#EF4444';
                  msgBox.style.border = '1px solid rgba(239,68,68,0.3)';
                }
                msgBox.style.display = 'block';
              })
              .catch(function() {
                msgBox.textContent = 'Network error. Please check your connection and try again.';
                msgBox.style.background = 'rgba(239,68,68,0.15)';
                msgBox.style.color = '#EF4444';
                msgBox.style.border = '1px solid rgba(239,68,68,0.3)';
                msgBox.style.display = 'block';
              })
              .finally(function() {
                btn.disabled = false;
                btn.textContent = 'Send Message';
              });
          });
        })();
      </script>
    </section>


    <footer class="copyrights" data-scroll-section>
      <div class="footer-container">
        <div class="footer-top-row">
          <div class="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#portfolio">Projects Done</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms & Conditions</a>
            <a href="/user/login">Contact</a>
          </div>
          <div class="footer-social">
            <a href="${instagramUrl}" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Instagram" data-track-event="social_link_click" data-track-category="outbound" data-track-label="instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="GitHub" data-track-event="social_link_click" data-track-category="outbound" data-track-label="github">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="${linkedinUrl}" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="LinkedIn" data-track-event="social_link_click" data-track-category="outbound" data-track-label="linkedin">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM3.56 20.45h3.56V9H3.56v11.45zM22.22 0H1.78C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.78 24h20.44C23.2 24 24 23.22 24 22.26V1.74C24 .78 23.2 0 22.22 0z"/></svg>
            </a>
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="WhatsApp" data-track-event="social_link_click" data-track-category="outbound" data-track-label="whatsapp">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.68-2.09-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51l-.58-.01c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46s1.05 2.85 1.2 3.05c.15.2 2.07 3.16 5.01 4.43.7.3 1.25.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12 21.7A9.7 9.7 0 0 1 5.14 5.14 9.7 9.7 0 1 1 12 21.7zm0-21.7C5.37 0 0 5.37 0 12c0 2.12.55 4.1 1.52 5.82L0 24l6.35-1.49A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/></svg>
            </a>
          </div>
        </div>
        <p class="footer-copyright">&copy; 2026 ${siteName}. All Rights Reserved.</p>
      </div>
    </footer>
  `;

  return layout("Web Designer & Developer", content, "Portfolio of Nikunj Pateliya", role);
}

export function loginPage(role: 'admin' | 'user', error?: string, success?: string): string {
  const title = role === 'admin' ? 'Admin Portal' : 'Client Login';
  const action = role === 'admin' ? '/admin/login' : '/user/login';

  const googleOAuthHtml = role === 'user' ? `
    <div style="margin: 1.25rem 0; text-align: center; position: relative;">
      <span style="background: var(--bg-card); padding: 0 10px; font-size: 0.8rem; color: var(--text-secondary); position: relative; z-index: 1;">OR</span>
      <div style="position: absolute; top: 50%; left: 0; right: 0; border-top: 1px solid var(--border-glass); z-index: 0;"></div>
    </div>
    <a href="/auth/google" class="btn-outline" style="display: flex; align-items: center; justify-content: center; gap: 10px; text-decoration: none; width: 100%; min-height: 42px; font-size: 0.9rem; font-weight: 600; box-sizing: border-box;">
      <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
      Continue with Google
    </a>
  ` : '';

  const content = `
    <section class="auth-section">
      <div class="glass auth-card">
        <h2>${title}</h2>
        ${error ? `<div class="auth-error">${error}</div>` : ''}
        ${success ? `<div class="auth-success" style="padding:10px; background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.3); color:#22c55e; border-radius:8px; margin-bottom:1rem; font-size:0.9rem;">${success}</div>` : ''}
        <form action="${action}" method="POST" class="auth-form">
          <input type="email" name="email" placeholder="Email Address" required class="form-input">
          <div style="display:flex; flex-direction:column; gap:4px;">
            <input type="password" name="password" placeholder="Password" required class="form-input">
            <div style="text-align:right;"><a href="/user/forgot-password" style="font-size:0.8rem; color:var(--text-secondary); text-decoration:underline;">Forgot password?</a></div>
          </div>
          <button type="submit" class="btn">Sign In</button>
        </form>
        ${googleOAuthHtml}
        ${role === 'user' ? `<p class="auth-footer" style="margin-top:1.5rem;">New here? <a href="/user/register">Register account</a></p>` : ''}
      </div>
    </section>
  `;
  return layout(title, content);
}

export function registerPage(error?: string, success?: string): string {
  const googleOAuthHtml = `
    <div style="margin: 1.25rem 0; text-align: center; position: relative;">
      <span style="background: var(--bg-card); padding: 0 10px; font-size: 0.8rem; color: var(--text-secondary); position: relative; z-index: 1;">OR</span>
      <div style="position: absolute; top: 50%; left: 0; right: 0; border-top: 1px solid var(--border-glass); z-index: 0;"></div>
    </div>
    <a href="/auth/google" class="btn-outline" style="display: flex; align-items: center; justify-content: center; gap: 10px; text-decoration: none; width: 100%; min-height: 42px; font-size: 0.9rem; font-weight: 600; box-sizing: border-box;">
      <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
      Continue with Google
    </a>
  `;

  const content = `
    <section class="auth-section">
      <div class="glass auth-card">
        <h2>Create Account</h2>
        ${error ? `<div class="auth-error">${error}</div>` : ''}
        ${success ? `<div class="auth-success" style="padding:10px; background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.3); color:#22c55e; border-radius:8px; margin-bottom:1rem; font-size:0.9rem;">${success}</div>` : ''}
        <form action="/user/register" method="POST" class="auth-form">
          <input type="email" name="email" placeholder="Email Address" required class="form-input">
          <input type="password" name="password" placeholder="Password (min 6 chars)" required minlength="6" class="form-input">
          <button type="submit" class="btn">Register</button>
        </form>
        ${googleOAuthHtml}
        <p class="auth-footer" style="margin-top:1.5rem;">Already have an account? <a href="/user/login">Login here</a></p>
      </div>
    </section>
  `;
  return layout("Register", content);
}

export function forgotPasswordPage(error?: string, success?: string): string {
  const content = `
    <section class="auth-section">
      <div class="glass auth-card">
        <h2>Reset Password</h2>
        <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:1.5rem;">
          Enter your registered email address and we will send you a link to reset your password.
        </p>
        ${error ? `<div class="auth-error">${error}</div>` : ''}
        ${success ? `<div class="auth-success" style="padding:10px; background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.3); color:#22c55e; border-radius:8px; margin-bottom:1rem; font-size:0.9rem;">${success}</div>` : ''}
        <form action="/user/forgot-password" method="POST" class="auth-form">
          <input type="email" name="email" placeholder="Email Address" required class="form-input">
          <button type="submit" class="btn">Send Reset Link</button>
        </form>
        <p class="auth-footer" style="margin-top:1.5rem;"><a href="/user/login">&larr; Back to Login</a></p>
      </div>
    </section>
  `;
  return layout("Forgot Password", content);
}

export function resetPasswordPage(error?: string, success?: string): string {
  const content = `
    <section class="auth-section">
      <div class="glass auth-card">
        <h2>Set New Password</h2>
        <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:1.5rem;">
          Please enter your new password below.
        </p>
        ${error ? `<div class="auth-error">${error}</div>` : ''}
        ${success ? `<div class="auth-success" style="padding:10px; background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.3); color:#22c55e; border-radius:8px; margin-bottom:1rem; font-size:0.9rem;">${success}</div>` : ''}
        <form action="/user/reset-password" method="POST" class="auth-form">
          <input type="password" name="password" placeholder="New Password" required minlength="6" class="form-input">
          <input type="password" name="confirm_password" placeholder="Confirm New Password" required minlength="6" class="form-input">
          <button type="submit" class="btn">Update Password</button>
        </form>
        <p class="auth-footer" style="margin-top:1.5rem;"><a href="/user/login">&larr; Back to Login</a></p>
      </div>
    </section>
  `;
  return layout("Reset Password", content);
}

export function blogListPage(posts: any[]): string {
  const postsHtml = posts.length
    ? posts.map(p => `
      <article class="glass blog-list-card" data-scroll>
        <div class="blog-list-meta">
          <span class="blog-card-date">${new Date(p.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <h2 class="blog-list-title"><a href="/blog/${p.slug}">${p.title}</a></h2>
        ${p.excerpt ? `<p class="blog-list-excerpt">${p.excerpt}</p>` : ''}
        <a href="/blog/${p.slug}" class="blog-read-more">Read Article &rarr;</a>
      </article>
    `).join('')
    : `<div class="glass blog-list-card" style="text-align:center; padding: 3rem;">
        <h3 style="margin-bottom:0.5rem;">No articles published yet</h3>
        <p class="text-secondary">Check back soon for new writing.</p>
      </div>`;

  const content = `
    <section class="section-container blog-page-hero" data-scroll-section>
      <div class="section-header">
        <span class="section-tag">ARTICLES</span>
        <h1 class="section-heading">Blog &amp; Writing</h1>
        <p class="text-secondary" style="margin-top:0.75rem; max-width:540px;">Thoughts on web development, performance, and building at the edge.</p>
      </div>
    </section>

    <section class="section-container" data-scroll-section>
      <div class="blog-list">
        ${postsHtml}
      </div>
      <div style="text-align:center; margin-top: 3rem;">
        <a href="/#blog" class="btn-outline">&larr; Back to Home</a>
      </div>
    </section>

    <footer class="copyrights" data-scroll-section>
      <div class="footer-container">
        <p>&copy; 2026 Nikunj Pateliya. All Rights Reserved.</p>
        <div class="footer-links">
          <a href="/">Home</a>
          <a href="/#about">About</a>
          <a href="/#services">Services</a>
          <a href="/#portfolio">Portfolio</a>
          <a href="/blog">Blog</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  `;

  return layout("Blog & Writing", content, "Articles and writing by Nikunj Pateliya on web development, performance, and edge computing.");
}

export function blogDetailPage(post: any): string {
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const content = `
    <section class="section-container blog-post-page" data-scroll-section>
      <div class="blog-post-header">
        <a href="/blog" class="blog-back-link">&larr; All Articles</a>
        <span class="blog-card-date" style="margin-top: 1rem; display:block;">${formattedDate}</span>
        <h1 class="blog-post-title">${post.title}</h1>
        ${post.excerpt ? `<p class="blog-post-excerpt">${post.excerpt}</p>` : ''}
      </div>
    </section>

    <section class="section-container" data-scroll-section>
      <div class="glass blog-post-body">
        ${post.body || post.content || '<p>Content coming soon.</p>'}
      </div>
      <div style="text-align:center; margin-top: 3rem;">
        <a href="/blog" class="btn-outline">&larr; Back to All Articles</a>
      </div>
    </section>

    <footer class="copyrights" data-scroll-section>
      <div class="footer-container">
        <p>&copy; 2026 Nikunj Pateliya. All Rights Reserved.</p>
        <div class="footer-links">
          <a href="/">Home</a>
          <a href="/#about">About</a>
          <a href="/#services">Services</a>
          <a href="/#portfolio">Portfolio</a>
          <a href="/blog">Blog</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  `;

  return layout(post.title, content, post.excerpt || `${post.title} — Blog by Nikunj Pateliya`);
}

export function privacyPage(role?: 'admin' | 'user'): string {
  const content = `
    <div class="section-container" style="padding-top:120px; padding-bottom:60px;">
      <a href="/" style="color:var(--text-secondary); text-decoration:none; display:inline-block; margin-bottom:1.5rem;">&larr; Back to Home</a>
      <div class="bento-box" style="margin-bottom:2rem;">
        <h1 style="font-size:clamp(1.8rem, 4vw, 2.5rem); letter-spacing:-0.03em; margin-bottom:0.5rem; overflow-wrap:break-word;">Privacy Policy</h1>
        <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:2rem;">Effective Date: August 20, 2026 | Last Updated: August 20, 2026</p>
        
        <div style="display:grid; gap:1.75rem; line-height:1.7; color:var(--text-primary);">
          <section>
            <h2 style="font-size:1.3rem; margin-bottom:0.5rem; color:var(--text-primary);">1. Data Controller & Overview</h2>
            <p style="color:var(--text-secondary);">
              This Privacy Policy explains how <strong>Nikunj Pateliya</strong> ("we", "us", or "our"), operating as a Web Designer & Full-Stack Developer based in Gujarat, India, collects, uses, and protects your information when you visit <strong>nikunjpateliya.site</strong> (the "Website").
            </p>
            <p style="color:var(--text-secondary);">
              We are committed to maintaining data privacy and fulfilling our obligations under applicable data protection frameworks, including the EU General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and the Information Technology Act of India.
            </p>
          </section>

          <section>
            <h2 style="font-size:1.3rem; margin-bottom:0.5rem; color:var(--text-primary);">2. Information We Collect</h2>
            <ul style="color:var(--text-secondary); padding-left:1.25rem;">
              <li><strong>Contact & Inquiry Data:</strong> When you submit messages via our Contact Form or Project Proposal Request page, we collect your Name, Email Address, Project Budget, and Message details.</li>
              <li><strong>Essential Session Data:</strong> For authenticated users (administrators and registered clients), we store essential HTTP-only cookies (<code>auth_token</code>) to maintain your secure login session.</li>
              <li><strong>Server Logs & Security Data:</strong> Edge network infrastructure automatically collects temporary access records, including IP addresses, browser user-agent strings, and request timestamps to monitor server health and prevent malicious rate-limiting abuse.</li>
            </ul>
          </section>

          <section>
            <h2 style="font-size:1.3rem; margin-bottom:0.5rem; color:var(--text-primary);">3. Legal Basis for Processing (GDPR Art. 6)</h2>
            <p style="color:var(--text-secondary);">We process your personal information under the following legal bases:</p>
            <ul style="color:var(--text-secondary); padding-left:1.25rem;">
              <li><strong>Pre-contractual & Contractual Steps (Art. 6(1)(b)):</strong> To respond to your portfolio inquiries, discuss service proposals, or deliver client portal services.</li>
              <li><strong>Legitimate Interests (Art. 6(1)(f)):</strong> To safeguard network security, prevent DDoS attacks, and optimize website stability.</li>
            </ul>
          </section>

          <section>
            <h2 style="font-size:1.3rem; margin-bottom:0.5rem; color:var(--text-primary);">4. Third-Party Cloud Sub-Processors</h2>
            <p style="color:var(--text-secondary);">We do not sell, rent, or trade your personal data. We utilize trusted cloud sub-processors exclusively to operate and host this website:</p>
            <ul style="color:var(--text-secondary); padding-left:1.25rem;">
              <li><strong>Cloudflare, Inc.:</strong> Global Edge CDN network, DNS routing, and Cloudflare Workers runtime infrastructure.</li>
              <li><strong>Supabase, Inc.:</strong> Serverless PostgreSQL database cloud hosting for contact submissions, blog posts, and authenticated user profiles.</li>
            </ul>
          </section>

          <section>
            <h2 style="font-size:1.3rem; margin-bottom:0.5rem; color:var(--text-primary);">5. Cookies & Local Storage</h2>
            <p style="color:var(--text-secondary);">
              We use strictly necessary cookies (<code>auth_token</code>) for admin and client portal authentication. We do not deploy intrusive third-party cross-site advertising trackers. Your cookie preferences are remembered locally in your browser (<code>localStorage</code>).
            </p>
          </section>

          <section>
            <h2 style="font-size:1.3rem; margin-bottom:0.5rem; color:var(--text-primary);">6. Your Legal Rights</h2>
            <p style="color:var(--text-secondary);">Depending on your location (e.g. EU/EEA, UK, California, India), you possess specific data rights:</p>
            <ul style="color:var(--text-secondary); padding-left:1.25rem;">
              <li><strong>Right to Access:</strong> Request details or copies of the personal data held about you.</li>
              <li><strong>Right to Rectification & Erasure:</strong> Request correction or complete deletion ("Right to be Forgotten") of your contact messages.</li>
              <li><strong>Right to Data Portability & Objection:</strong> Request export of your data or object to processing.</li>
            </ul>
            <p style="color:var(--text-secondary); margin-top:0.5rem;">To exercise any of these rights, please reach out via our contact form.</p>
          </section>

          <section>
            <h2 style="font-size:1.3rem; margin-bottom:0.5rem; color:var(--text-primary);">7. Contact Information</h2>
            <p style="color:var(--text-secondary);">
              If you have any questions or privacy inquiries, contact:<br>
              <strong>Nikunj Pateliya</strong><br>
              Web Designer & Full-Stack Developer<br>
              Gujarat, India<br>
              Website: <a href="/#contact" style="color:var(--text-primary); text-decoration:underline;">nikunjpateliya.site/#contact</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  `;
  return layout("Privacy Policy", content, "Privacy Policy for Nikunj Pateliya's portfolio website", role);
}

export function termsPage(role?: 'admin' | 'user'): string {
  const content = `
    <div class="section-container" style="padding-top:120px; padding-bottom:60px;">
      <a href="/" style="color:var(--text-secondary); text-decoration:none; display:inline-block; margin-bottom:1.5rem;">&larr; Back to Home</a>
      <div class="bento-box" style="margin-bottom:2rem;">
        <h1 style="font-size:clamp(1.8rem, 4vw, 2.5rem); letter-spacing:-0.03em; margin-bottom:0.5rem; overflow-wrap:break-word;">Terms & Conditions</h1>
        <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:2rem;">Effective Date: August 20, 2026 | Last Updated: August 20, 2026</p>
        
        <div style="display:grid; gap:1.75rem; line-height:1.7; color:var(--text-primary);">
          <section>
            <h2 style="font-size:1.3rem; margin-bottom:0.5rem; color:var(--text-primary);">1. Acceptance of Terms</h2>
            <p style="color:var(--text-secondary);">
              By accessing, browsing, or using <strong>nikunjpateliya.site</strong> (the "Website"), you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please discontinue site usage immediately.
            </p>
          </section>

          <section>
            <h2 style="font-size:1.3rem; margin-bottom:0.5rem; color:var(--text-primary);">2. Intellectual Property Rights</h2>
            <p style="color:var(--text-secondary);">
              All original content, site architecture, responsive designs, custom code, logos, visual graphics, articles, and documentation published on this Website are the sole intellectual property of <strong>Nikunj Pateliya</strong>, unless explicitly stated otherwise.
            </p>
            <p style="color:var(--text-secondary);">
              You may view and share portfolio links for informational purposes. You may not copy, re-sell, re-license, reverse-engineer, or commercially exploit any software, design, or asset from this Website without explicit written consent.
            </p>
          </section>

          <section>
            <h2 style="font-size:1.3rem; margin-bottom:0.5rem; color:var(--text-primary);">3. Professional Freelance Services & Inquiries</h2>
            <p style="color:var(--text-secondary);">
              The work samples, service descriptions, and capabilities displayed on this Website represent professional freelance web development and design services.
            </p>
            <p style="color:var(--text-secondary);">
              Submitting a contact form message or project proposal request does not create a binding service contract or obligation. Professional engagements commence only upon mutual execution of a formal Master Services Agreement or contract detailing project scope, deliverables, and payment terms.
            </p>
          </section>

          <section>
            <h2 style="font-size:1.3rem; margin-bottom:0.5rem; color:var(--text-primary);">4. Acceptable Website Usage</h2>
            <p style="color:var(--text-secondary);">When utilizing our contact form or client portal, you agree not to:</p>
            <ul style="color:var(--text-secondary); padding-left:1.25rem;">
              <li>Transmit unsolicited spam, commercial advertisements, or phishing attempts.</li>
              <li>Attempt unauthorized administrative access, brute-force security controls, or probe server infrastructure.</li>
              <li>Deploy automated bots or scrapers in a manner that degrades service performance.</li>
            </ul>
          </section>

          <section>
            <h2 style="font-size:1.3rem; margin-bottom:0.5rem; color:var(--text-primary);">5. Limitation of Liability & Warranty Disclaimer</h2>
            <p style="color:var(--text-secondary);">
              This Website is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied. Nikunj Pateliya does not warrant that the website will operate uninterrupted or error-free.
            </p>
            <p style="color:var(--text-secondary);">
              To the maximum extent permitted by applicable law, Nikunj Pateliya shall not be liable for any direct, indirect, incidental, or consequential damages resulting from site availability, data loss, or reliance on information presented herein.
            </p>
          </section>

          <section>
            <h2 style="font-size:1.3rem; margin-bottom:0.5rem; color:var(--text-primary);">6. Third-Party Links</h2>
            <p style="color:var(--text-secondary);">
              The Website contains links to third-party platforms (e.g., GitHub, LinkedIn, Instagram, WhatsApp). We are not responsible for the privacy practices, content, or availability of third-party external services.
            </p>
          </section>

          <section>
            <h2 style="font-size:1.3rem; margin-bottom:0.5rem; color:var(--text-primary);">7. Governing Law & Dispute Resolution</h2>
            <p style="color:var(--text-secondary);">
              These Terms and Conditions shall be governed by and construed in accordance with the laws of <strong>India</strong>. Any legal action or dispute arising under these Terms shall be subject to the exclusive jurisdiction of the competent courts situated in <strong>Gujarat, India</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  `;
  return layout("Terms & Conditions", content, "Terms & Conditions for Nikunj Pateliya's portfolio website", role);
}

export function adminMenuPage(
  users: any[],
  messages: any[],
  projects: any[] = [],
  clientAssets: any[] = [],
  error?: string,
  success?: string,
  extra?: {
    allProjects?: any[];
    allBlogs?: any[];
    allServices?: any[];
    allTestimonials?: any[];
    metadata?: any;
  }
): string {
  const allBlogs = extra?.allBlogs || [];
  const allProjects = extra?.allProjects || [];
  const allServices = extra?.allServices || [];
  const allTestimonials = extra?.allTestimonials || [];
  const metadata = extra?.metadata || {};

  /* ---- Render HTML Lists ---- */
  const usersHtml = users.map(u => `
    <tr>
      <td><strong>${u.email}</strong></td>
      <td><span class="role-badge role-${u.role}">${u.role}</span></td>
      <td>
        ${u.role !== 'admin' ? `
          <form action="/admin/menu/users/delete" method="POST" style="display:inline; margin:0;">
            <input type="hidden" name="id" value="${u.id}">
            <button type="submit" class="btn-delete" onclick="return confirm('Delete user ${u.email}?')">Delete</button>
          </form>
        ` : '<span class="text-muted" style="font-size:0.75rem;">Protected</span>'}
      </td>
    </tr>
  `).join('');

  const messagesHtml = messages.map(m => `
    <div class="glass message-card">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; gap: 0.5rem;">
        <h4 style="margin: 0; font-size: 1rem; font-weight: 700;">${m.subject}</h4>
        <span class="status-badge" style="font-size:0.7rem; padding: 2px 8px; background: rgba(255,255,255,0.08); color: var(--text-primary);">${m.status}</span>
      </div>
      <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0.5rem; line-height: 1.5;">${m.body}</p>
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-glass); padding-top: 0.5rem; margin-top: 0.5rem;">
        <small class="text-muted">${new Date(m.created_at).toLocaleString()}</small>
        <form action="/admin/menu/messages/delete" method="POST" style="margin:0;">
          <input type="hidden" name="id" value="${m.id}">
          <button type="submit" class="btn-delete" style="padding: 3px 8px; font-size: 0.75rem;" onclick="return confirm('Delete message?')">Delete</button>
        </form>
      </div>
    </div>
  `).join('');

  const projectsOptionsHtml = projects.map(p => `
    <option value="${p.id}">${p.title} (${p.client_email})</option>
  `).join('');

  const projectsHtml = projects.map(p => `
    <div class="glass message-card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; gap: 0.5rem;">
        <h4 style="margin:0; font-weight: 700; font-size: 1rem;">${p.title}</h4>
        <span class="status-badge status-${p.status}" style="font-size:0.7rem; padding: 2px 8px;">${p.status}</span>
      </div>
      <small style="display:block; margin-bottom:0.5rem;" class="text-muted">Client: <strong>${p.client_email}</strong></small>
      <div style="display:flex; gap:0.75rem; flex-wrap:wrap; font-size:0.78rem; margin-bottom:0.5rem;">
        ${p.figma_link ? `<a href="${p.figma_link}" target="_blank" style="color:var(--accent-color); font-weight:600;">Figma</a>` : ''}
        ${p.staging_link ? `<a href="${p.staging_link}" target="_blank" style="color:var(--accent-color); font-weight:600;">Staging</a>` : ''}
        ${p.production_link ? `<a href="${p.production_link}" target="_blank" style="color:var(--accent-color); font-weight:600;">Production</a>` : ''}
      </div>
      <div style="border-top:1px solid var(--border-glass); padding-top:0.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <small class="text-muted">Created: ${new Date(p.created_at).toLocaleDateString()}</small>
        <div style="display:flex; gap:0.5rem; align-items:center;">
          <a href="/admin/clients/${p.id}" class="btn" style="padding:4px 12px; font-size:0.75rem;">Manage Client &rarr;</a>
          <form action="/admin/client/delete" method="POST" style="margin:0;">
            <input type="hidden" name="id" value="${p.id}">
            <button type="submit" class="btn-delete" style="padding: 4px 8px; font-size:0.75rem;" onclick="return confirm('Delete client portal and all milestone/invoices?')">Delete</button>
          </form>
        </div>
      </div>
    </div>
  `).join('');

  const clientAssetsHtml = clientAssets.map(a => `
    <div class="glass message-card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; gap: 0.5rem;">
        <h4 style="margin: 0; font-size: 0.95rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><a href="${a.file_url}" target="_blank" download style="color:var(--accent-color); font-weight:600;">${a.file_name}</a></h4>
        <span class="role-badge role-user" style="font-size:0.65rem; padding: 2px 8px;">${a.category}</span>
      </div>
      <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.5rem;">${a.description || 'No notes.'}</p>
      <small style="display:block; margin-bottom:0.25rem;" class="text-muted">Client: <strong>${a.client_email}</strong></small>
      <small class="text-muted" style="font-size: 0.75rem;">Uploaded: ${new Date(a.created_at).toLocaleDateString()}</small>
    </div>
  `).join('');

  const testimonialsListHtml = allTestimonials.map(t => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0.8rem; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: 8px; gap: 1rem; margin-bottom: 0.5rem;">
      <div style="flex: 1; font-size: 0.85rem; min-width: 0;">
        <strong style="color:var(--text-primary);">${t.name}</strong>
        <span style="font-size: 0.75rem; color: var(--text-secondary); display: block;">${t.role}</span>
        <span style="font-size: 0.75rem; color: var(--text-secondary); display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">"${t.text}"</span>
      </div>
      <form action="/admin/testimonial/delete" method="POST" style="margin:0; flex-shrink:0;">
        <input type="hidden" name="id" value="${t.id}">
        <button type="submit" class="btn-delete" style="padding: 3px 8px; font-size: 0.72rem;" onclick="return confirm('Delete testimonial from ${t.name}?')">Delete</button>
      </form>
    </div>
  `).join('');

  const servicesListHtml = allServices.map(s => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0.8rem; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: 8px; gap: 1rem; margin-bottom: 0.5rem;">
      <div style="flex: 1; font-size: 0.85rem; min-width: 0;">
        <strong style="color:var(--text-primary);">${s.title}</strong>
        <span style="font-size: 0.75rem; color: var(--text-secondary); display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${s.description}</span>
      </div>
      <form action="/admin/service/delete" method="POST" style="margin:0; flex-shrink:0;">
        <input type="hidden" name="id" value="${s.id}">
        <button type="submit" class="btn-delete" style="padding: 3px 8px; font-size: 0.72rem;" onclick="return confirm('Delete service ${s.title}?')">Delete</button>
      </form>
    </div>
  `).join('');

  const projectsListHtml = allProjects.map(p => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0.8rem; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: 8px; gap: 1rem; margin-bottom: 0.5rem;">
      <div style="flex: 1; font-size: 0.85rem; min-width: 0;">
        <strong style="color:var(--text-primary);">${p.title}</strong>
        <span class="role-badge role-user" style="font-size:0.65rem; padding: 1px 6px; margin-left: 6px;">${p.category || 'Portfolio'}</span>
      </div>
      <form action="/admin/content/delete" method="POST" style="margin:0; flex-shrink:0;">
        <input type="hidden" name="id" value="${p.id}">
        <button type="submit" class="btn-delete" style="padding: 3px 8px; font-size: 0.72rem;" onclick="return confirm('Delete project ${p.title}?')">Delete</button>
      </form>
    </div>
  `).join('');

  const blogsListHtml = allBlogs.map(b => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0.8rem; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: 8px; gap: 1rem; margin-bottom: 0.5rem;">
      <div style="flex: 1; font-size: 0.85rem; min-width: 0;">
        <strong style="color:var(--text-primary);">${b.title}</strong>
        <span class="role-badge role-admin" style="font-size:0.65rem; padding: 1px 6px; margin-left: 6px;">/blog/${b.slug}</span>
      </div>
      <form action="/admin/content/delete" method="POST" style="margin:0; flex-shrink:0;">
        <input type="hidden" name="id" value="${b.id}">
        <button type="submit" class="btn-delete" style="padding: 3px 8px; font-size: 0.72rem;" onclick="return confirm('Delete blog ${b.title}?')">Delete</button>
      </form>
    </div>
  `).join('');

  const content = `
    <div class="admin-dashboard-v2">
      
      <!-- Top Alert Banners -->
      ${error ? `<div class="alert-banner alert-error" style="margin-bottom:1.5rem; padding:1rem; border-radius:10px; background:rgba(239,68,68,0.12); color:#EF4444; border:1px solid rgba(239,68,68,0.3); font-weight:600;">${error}</div>` : ''}
      ${success ? `<div class="alert-banner alert-success" style="margin-bottom:1.5rem; padding:1rem; border-radius:10px; background:rgba(16,185,129,0.12); color:#10B981; border:1px solid rgba(16,185,129,0.3); font-weight:600;">${success}</div>` : ''}

      <div class="admin-layout-container">
        
        <!-- Sidebar Navigation -->
        <aside class="admin-sidebar-v2 glass">
          <div class="admin-sidebar-header">
            <h3 class="admin-sidebar-title">Admin Console</h3>
            <span class="admin-sidebar-subtitle">Nikunj Pateliya Portfolio</span>
          </div>

          <ul class="admin-nav-menu">
            <li>
              <button class="admin-nav-link active" data-tab="tab-overview">
                <svg class="admin-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="1"></rect><rect x="14" y="3" width="7" height="5" rx="1"></rect><rect x="14" y="12" width="7" height="9" rx="1"></rect><rect x="3" y="16" width="7" height="5" rx="1"></rect></svg>
                Overview
              </button>
            </li>
            <li>
              <button class="admin-nav-link" data-tab="tab-clients">
                <svg class="admin-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                Clients &amp; Proposals
              </button>
            </li>
            <li>
              <button class="admin-nav-link" data-tab="tab-content">
                <svg class="admin-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                Content Manager
              </button>
            </li>
            <li>
              <button class="admin-nav-link" data-tab="tab-settings">
                <svg class="admin-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                Settings &amp; Users
              </button>
            </li>
          </ul>

          <div style="margin-top:auto; padding-top:16px; border-top:1px solid var(--border-glass); display:flex; flex-direction:column; gap:10px;">
            <a href="/admin/data" class="btn-outline" style="text-align:center; font-size:0.82rem; padding:8px 12px;">Raw Database Data</a>
            <form action="/admin/logout" method="POST" style="margin:0;">
              <button type="submit" class="btn-delete" style="width:100%; padding:8px 12px; font-size:0.82rem;">Sign Out</button>
            </form>
          </div>
        </aside>

        <!-- Main Panel Content -->
        <main class="admin-main-panel">
          
          <!-- TAB 1: OVERVIEW -->
          <div id="tab-overview" class="admin-tab-pane active">
            
            <!-- KPI Stat Cards -->
            <div class="admin-kpi-grid">
              <div class="admin-kpi-card glass">
                <div class="admin-kpi-info">
                  <h4>Active Client Projects</h4>
                  <p class="admin-kpi-number">${projects.length}</p>
                </div>
                <div class="admin-kpi-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                </div>
              </div>

              <div class="admin-kpi-card glass">
                <div class="admin-kpi-info">
                  <h4>Published Articles</h4>
                  <p class="admin-kpi-number">${allBlogs.length}</p>
                </div>
                <div class="admin-kpi-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
                </div>
              </div>

              <div class="admin-kpi-card glass">
                <div class="admin-kpi-info">
                  <h4>Visitor Messages</h4>
                  <p class="admin-kpi-number">${messages.length}</p>
                </div>
                <div class="admin-kpi-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
              </div>

              <div class="admin-kpi-card glass">
                <div class="admin-kpi-info">
                  <h4>System Users</h4>
                  <p class="admin-kpi-number">${users.length}</p>
                </div>
                <div class="admin-kpi-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
              </div>
            </div>

            <!-- Quick Actions Grid -->
            <div class="glass" style="padding:20px; border-radius:16px;">
              <div class="admin-section-header" style="margin-bottom:16px;">
                <h3 class="admin-section-title">Quick Action Center</h3>
              </div>
              <div class="admin-actions-grid">
                <button class="admin-action-btn" onclick="openAdminModal('modal-add-milestone')">
                  <span>➕ Add Milestone</span>
                </button>
                <button class="admin-action-btn" onclick="openAdminModal('modal-add-invoice')">
                  <span>💳 Add Invoice</span>
                </button>
                <button class="admin-action-btn" onclick="openAdminModal('modal-create-blog')">
                  <span>✍️ Add Blog Post</span>
                </button>
                <button class="admin-action-btn" onclick="openAdminModal('modal-create-project')">
                  <span>🚀 Add Portfolio Project</span>
                </button>
                <button class="admin-action-btn" onclick="openAdminModal('modal-create-service')">
                  <span>🛠️ Add Service</span>
                </button>
                <a href="/admin/proposals" class="admin-action-btn">
                  <span>📑 Review Proposals</span>
                </a>
              </div>
            </div>

            <!-- Recent Activity Split -->
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:20px;">
              
              <!-- Recent Messages -->
              <div class="glass" style="padding:20px; border-radius:16px;">
                <div class="admin-section-header" style="margin-bottom:14px;">
                  <h3 class="admin-section-title">Recent Visitor Messages</h3>
                  <button class="btn-outline" style="font-size:0.75rem; padding:4px 10px;" onclick="switchAdminTab('tab-settings')">View All &rarr;</button>
                </div>
                <div style="display:flex; flex-direction:column; gap:10px;">
                  ${messages.length ? messages.slice(0, 3).map(m => `
                    <div style="padding:10px 12px; background:rgba(255,255,255,0.03); border:1px solid var(--border-glass); border-radius:10px;">
                      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                        <strong style="font-size:0.88rem;">${m.subject}</strong>
                        <small class="text-muted" style="font-size:0.7rem;">${new Date(m.created_at).toLocaleDateString()}</small>
                      </div>
                      <p style="font-size:0.82rem; color:var(--text-secondary); margin:0; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">${m.body}</p>
                    </div>
                  `).join('') : '<p class="text-secondary" style="font-size:0.88rem;">No messages yet.</p>'}
                </div>
              </div>

              <!-- Active Projects Summary -->
              <div class="glass" style="padding:20px; border-radius:16px;">
                <div class="admin-section-header" style="margin-bottom:14px;">
                  <h3 class="admin-section-title">Client Projects Summary</h3>
                  <button class="btn-outline" style="font-size:0.75rem; padding:4px 10px;" onclick="switchAdminTab('tab-clients')">Manage All &rarr;</button>
                </div>
                <div style="display:flex; flex-direction:column; gap:10px;">
                  ${projects.length ? projects.slice(0, 3).map(p => `
                    <div style="padding:10px 12px; background:rgba(255,255,255,0.03); border:1px solid var(--border-glass); border-radius:10px; display:flex; justify-content:space-between; align-items:center;">
                      <div>
                        <strong style="font-size:0.88rem; display:block;">${p.title}</strong>
                        <small class="text-muted" style="font-size:0.75rem;">${p.client_email}</small>
                      </div>
                      <span class="status-badge status-${p.status}" style="font-size:0.68rem; padding:2px 8px;">${p.status}</span>
                    </div>
                  `).join('') : '<p class="text-secondary" style="font-size:0.88rem;">No client projects created yet.</p>'}
                </div>
              </div>

            </div>

          </div>

          <!-- TAB 2: CLIENTS & PROPOSALS -->
          <div id="tab-clients" class="admin-tab-pane">
            
            <!-- Proposal Reviewer Banner -->
            <div class="glass" style="padding:20px; border-radius:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; background:linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.12));">
              <div>
                <h3 style="margin:0 0 4px 0; font-size:1.1rem; color:var(--text-primary);">Client Proposals Reviewer</h3>
                <p style="margin:0; font-size:0.85rem; color:var(--text-secondary);">Review incoming client scope requests and convert them automatically into project portals.</p>
              </div>
              <a href="/admin/proposals" class="btn">Open Proposals Reviewer &rarr;</a>
            </div>

            <!-- Client Projects Hub -->
            <div class="glass" style="padding:20px; border-radius:16px;">
              <div class="admin-section-header" style="margin-bottom:16px;">
                <h3 class="admin-section-title">Active Client Portals</h3>
                <div style="display:flex; gap:10px;">
                  <button class="btn" style="font-size:0.8rem; padding:6px 14px;" onclick="openAdminModal('modal-add-milestone')">+ Add Milestone</button>
                  <button class="btn" style="font-size:0.8rem; padding:6px 14px;" onclick="openAdminModal('modal-add-invoice')">+ Add Invoice</button>
                </div>
              </div>

              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:16px;">
                ${projectsHtml.length ? projectsHtml : '<p class="text-secondary" style="grid-column:1/-1;">No client projects created yet.</p>'}
              </div>
            </div>

            <!-- Client Uploads & Deliverables -->
            <div class="glass" style="padding:20px; border-radius:16px;">
              <div class="admin-section-header" style="margin-bottom:16px;">
                <h3 class="admin-section-title">Client Files &amp; Assets</h3>
              </div>
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:16px;">
                ${clientAssetsHtml.length ? clientAssetsHtml : '<p class="text-secondary" style="grid-column:1/-1;">No files uploaded by clients yet.</p>'}
              </div>
            </div>

          </div>

          <!-- TAB 3: CONTENT MANAGER -->
          <div id="tab-content" class="admin-tab-pane">
            
            <div class="admin-section-header">
              <h3 class="admin-section-title">Website Content &amp; Portfolio Manager</h3>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button class="btn" style="font-size:0.8rem; padding:6px 12px;" onclick="openAdminModal('modal-create-blog')">+ New Blog</button>
                <button class="btn" style="font-size:0.8rem; padding:6px 12px;" onclick="openAdminModal('modal-create-project')">+ New Project</button>
                <button class="btn" style="font-size:0.8rem; padding:6px 12px;" onclick="openAdminModal('modal-create-service')">+ New Service</button>
                <button class="btn" style="font-size:0.8rem; padding:6px 12px;" onclick="openAdminModal('modal-create-testimonial')">+ New Testimonial</button>
              </div>
            </div>

            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:20px;">
              
              <!-- 1. Blog Articles -->
              <div class="glass" style="padding:20px; border-radius:16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                  <h4 style="margin:0; font-size:1.05rem; color:var(--accent-color);">Blog Articles (${allBlogs.length})</h4>
                  <button class="btn-outline" style="font-size:0.75rem; padding:3px 8px;" onclick="openAdminModal('modal-create-blog')">+ Add</button>
                </div>
                <div style="max-height:280px; overflow-y:auto; padding-right:4px;">
                  ${blogsListHtml.length ? blogsListHtml : '<p class="text-secondary" style="font-size:0.85rem;">No blog articles published.</p>'}
                </div>
              </div>

              <!-- 2. Portfolio Projects -->
              <div class="glass" style="padding:20px; border-radius:16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                  <h4 style="margin:0; font-size:1.05rem; color:var(--accent-color);">Portfolio Projects (${allProjects.length})</h4>
                  <button class="btn-outline" style="font-size:0.75rem; padding:3px 8px;" onclick="openAdminModal('modal-create-project')">+ Add</button>
                </div>
                <div style="max-height:280px; overflow-y:auto; padding-right:4px;">
                  ${projectsListHtml.length ? projectsListHtml : '<p class="text-secondary" style="font-size:0.85rem;">No portfolio projects added.</p>'}
                </div>
              </div>

              <!-- 3. Services Offered -->
              <div class="glass" style="padding:20px; border-radius:16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                  <h4 style="margin:0; font-size:1.05rem; color:var(--accent-color);">Services Offered (${allServices.length})</h4>
                  <button class="btn-outline" style="font-size:0.75rem; padding:3px 8px;" onclick="openAdminModal('modal-create-service')">+ Add</button>
                </div>
                <div style="max-height:280px; overflow-y:auto; padding-right:4px;">
                  ${servicesListHtml.length ? servicesListHtml : '<p class="text-secondary" style="font-size:0.85rem;">No services added.</p>'}
                </div>
              </div>

              <!-- 4. Testimonials -->
              <div class="glass" style="padding:20px; border-radius:16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                  <h4 style="margin:0; font-size:1.05rem; color:var(--accent-color);">Testimonials (${allTestimonials.length})</h4>
                  <button class="btn-outline" style="font-size:0.75rem; padding:3px 8px;" onclick="openAdminModal('modal-create-testimonial')">+ Add</button>
                </div>
                <div style="max-height:280px; overflow-y:auto; padding-right:4px;">
                  ${testimonialsListHtml.length ? testimonialsListHtml : '<p class="text-secondary" style="font-size:0.85rem;">No testimonials added.</p>'}
                </div>
              </div>

            </div>

          </div>

          <!-- TAB 4: SETTINGS & USERS -->
          <div id="tab-settings" class="admin-tab-pane">
            
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:20px;">
              
              <!-- Website Bio & Metadata Config (Form + JSON Editor) -->
              <div class="glass" style="padding:24px; border-radius:16px; margin-bottom:20px; grid-column: 1 / -1;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:18px; border-bottom:1px solid var(--border-glass); padding-bottom:14px;">
                  <div>
                    <h3 class="admin-section-title" style="margin:0;">Website Bio &amp; Metadata Config</h3>
                    <p style="margin:4px 0 0 0; font-size:0.85rem; color:var(--text-secondary);">
                      Manage site profile details, bio paragraphs, social media links, and raw JSON database config in real-time.
                    </p>
                  </div>
                  <div style="display:flex; gap:8px;">
                    <button id="btn-mode-form" type="button" class="btn" style="font-size:0.8rem; padding:6px 14px;" onclick="switchMetadataMode('form')">Form Editor</button>
                    <button id="btn-mode-json" type="button" class="btn-outline" style="font-size:0.8rem; padding:6px 14px;" onclick="switchMetadataMode('json')">JSON Database Config</button>
                  </div>
                </div>

                <!-- Form Mode -->
                <div id="metadata-mode-form">
                  <form action="/admin/metadata/update" method="POST" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:16px;">
                    <div class="admin-form-group">
                      <label>Site / Public Name</label>
                      <input type="text" name="site_name" value="${metadata.site_name || 'Nikunj Pateliya'}" required class="form-input">
                    </div>
                    <div class="admin-form-group">
                      <label>Public Role / Tagline</label>
                      <input type="text" name="public_role" value="${metadata.public_role || 'Web Designer & Full-Stack Developer'}" required class="form-input">
                    </div>
                    <div class="admin-form-group">
                      <label>Location</label>
                      <input type="text" name="location" value="${metadata.location || 'Gujarat, India'}" class="form-input">
                    </div>
                    <div class="admin-form-group">
                      <label>Contact Email</label>
                      <input type="email" name="contact_email" value="${metadata.contact_email || 'hello@nikunjpateliya.site'}" class="form-input">
                    </div>
                    <div class="admin-form-group">
                      <label>Contact Phone / WhatsApp</label>
                      <input type="text" name="contact_phone" value="${metadata.contact_phone || '+91 93288 01435'}" class="form-input">
                    </div>
                    <div class="admin-form-group" style="grid-column: 1 / -1;">
                      <label>Meta Description (SEO)</label>
                      <textarea name="meta_description" class="form-textarea" style="height:60px;">${metadata.meta_description || 'Portfolio of Nikunj Pateliya, showcasing web design and full-stack development work.'}</textarea>
                    </div>
                    <div class="admin-form-group" style="grid-column: 1 / -1;">
                      <label>Intro Bio Paragraph 1</label>
                      <textarea name="about_bio_1" class="form-textarea" style="height:75px;" required>${metadata.about_bio_1 || 'Hi, I’m Nikunj Pateliya — a freelance web developer, Android creator, and website tester. I build and fine-tune high-performance digital products from the ground up, combining solid code architecture, precise quality testing, and modern UI design.'}</textarea>
                    </div>
                    <div class="admin-form-group" style="grid-column: 1 / -1;">
                      <label>Detail Bio Paragraph 2</label>
                      <textarea name="about_bio_2" class="form-textarea" style="height:75px;">${metadata.about_bio_2 || ''}</textarea>
                    </div>
                    <div class="admin-form-group">
                      <label>Hero Banner Image Link / URL</label>
                      <div style="display:flex; gap:10px; align-items:center;">
                        <input type="text" id="input-hero-image" name="hero_image_url" value="${metadata.hero_image_url || '/assets/images/uploads/hero-image.jpg'}" placeholder="https://... or /assets/images/..." required class="form-input" oninput="previewImage('input-hero-image', 'preview-hero-image')">
                        <img id="preview-hero-image" src="${metadata.hero_image_url || '/assets/images/uploads/hero-image.jpg'}" alt="Hero Banner Preview" style="width:54px; height:36px; object-fit:cover; border-radius:6px; border:1px solid var(--border-glass);" onerror="this.src='/assets/images/uploads/hero-image.jpg'">
                      </div>
                    </div>
                    <div class="admin-form-group">
                      <label>Profile Image Link / URL</label>
                      <div style="display:flex; gap:10px; align-items:center;">
                        <input type="text" id="input-profile-image" name="about_profile_image" value="${metadata.about_profile_image || '/assets/images/uploads/nik.jpeg'}" placeholder="https://... or /assets/images/..." required class="form-input" oninput="previewImage('input-profile-image', 'preview-profile-image')">
                        <img id="preview-profile-image" src="${metadata.about_profile_image || '/assets/images/uploads/nik.jpeg'}" alt="Profile Preview" style="width:36px; height:36px; object-fit:cover; border-radius:50%; border:1px solid var(--border-glass);" onerror="this.src='/assets/images/uploads/nik.jpeg'">
                      </div>
                    </div>
                    <div class="admin-form-group">
                      <label>CV Download URL / Path</label>
                      <input type="text" name="about_cv_url" value="${metadata.about_cv_url || '/assets/Nikunjkumar_Pateliya_CV.pdf'}" required class="form-input">
                    </div>
                    <div class="admin-form-group">
                      <label>GitHub Profile URL</label>
                      <input type="url" name="social_github" value="${metadata.social_github || 'https://github.com/NIKUNJ160'}" class="form-input">
                    </div>
                    <div class="admin-form-group">
                      <label>LinkedIn Profile URL</label>
                      <input type="url" name="social_linkedin" value="${metadata.social_linkedin || 'https://www.linkedin.com/in/nikunjpateliya1608'}" class="form-input">
                    </div>
                    <div class="admin-form-group">
                      <label>Instagram Profile URL</label>
                      <input type="url" name="social_instagram" value="${metadata.social_instagram || 'https://www.instagram.com/_nik__16/'}" class="form-input">
                    </div>
                    <div class="admin-form-group">
                      <label>WhatsApp Contact URL</label>
                      <input type="url" name="social_whatsapp" value="${metadata.social_whatsapp || 'https://wa.me/919328801435'}" class="form-input">
                    </div>
                    <div style="grid-column: 1 / -1; margin-top:8px;">
                      <button type="submit" class="btn">Save Form Config</button>
                    </div>
                  </form>
                </div>

                <!-- JSON Mode -->
                <div id="metadata-mode-json" style="display:none;">
                  <form action="/admin/metadata/json-update" method="POST" onsubmit="return validateJsonSubmit()">
                    <div style="margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                      <span style="font-size:0.85rem; color:var(--text-secondary);">Direct JSON Database Config Editor (Real-Time Upsert):</span>
                      <button type="button" class="btn-outline" style="font-size:0.75rem; padding:3px 10px;" onclick="formatJsonTextarea()">Format JSON</button>
                    </div>
                    <textarea id="json-config-textarea" name="config_json" class="form-textarea" style="height:320px; font-family:monospace; font-size:0.85rem; line-height:1.4; white-space:pre; tab-size:2;" required>${JSON.stringify({
                      site_name: metadata.site_name || 'Nikunj Pateliya',
                      public_role: metadata.public_role || 'Web Designer & Full-Stack Developer',
                      location: metadata.location || 'Gujarat, India',
                      contact_email: metadata.contact_email || 'hello@nikunjpateliya.site',
                      contact_phone: metadata.contact_phone || '+91 93288 01435',
                      meta_description: metadata.meta_description || 'Portfolio of Nikunj Pateliya, showcasing web design and full-stack development work.',
                      about_bio_1: metadata.about_bio_1 || 'Hi, I’m Nikunj Pateliya — a freelance web developer, Android creator, and website tester. I build and fine-tune high-performance digital products from the ground up, combining solid code architecture, precise quality testing, and modern UI design.',
                      about_bio_2: metadata.about_bio_2 || '',
                      hero_image_url: metadata.hero_image_url || '/assets/images/uploads/hero-image.jpg',
                      about_profile_image: metadata.about_profile_image || '/assets/images/uploads/nik.jpeg',
                      about_cv_url: metadata.about_cv_url || '/assets/Nikunjkumar_Pateliya_CV.pdf',
                      social_github: metadata.social_github || 'https://github.com/NIKUNJ160',
                      social_linkedin: metadata.social_linkedin || 'https://www.linkedin.com/in/nikunjpateliya1608',
                      social_instagram: metadata.social_instagram || 'https://www.instagram.com/_nik__16/',
                      social_whatsapp: metadata.social_whatsapp || 'https://wa.me/919328801435'
                    }, null, 2)}</textarea>
                    <div style="margin-top:12px; display:flex; gap:10px;">
                      <button type="submit" class="btn">Apply &amp; Save JSON Config</button>
                    </div>
                  </form>
                </div>
              </div>

              <!-- Registered Users Table -->
              <div class="glass" style="padding:20px; border-radius:16px;">
                <h3 class="admin-section-title" style="margin-bottom:14px;">System User Accounts</h3>
                <div class="table-responsive" style="max-height:360px; overflow-y:auto;">
                  <table class="users-table" style="width:100%;">
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${usersHtml}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            <!-- Visitor Messages List -->
            <div class="glass" style="padding:20px; border-radius:16px;">
              <h3 class="admin-section-title" style="margin-bottom:14px;">All Visitor Contact Messages</h3>
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:14px; max-height:400px; overflow-y:auto; padding-right:4px;">
                ${messagesHtml.length ? messagesHtml : '<p class="text-secondary">No visitor messages received.</p>'}
              </div>
            </div>

          </div>

        </main>

      </div>
    </div>

    <!-- MODAL DIALOGS -->

    <!-- Modal 1: Add Milestone -->
    <div id="modal-add-milestone" class="admin-modal-overlay">
      <div class="admin-modal-box glass">
        <div class="admin-modal-header">
          <h3 class="admin-modal-title">Add Milestone to Client</h3>
          <button class="admin-modal-close" onclick="closeAdminModal('modal-add-milestone')">&times;</button>
        </div>
        <form action="/admin/milestone/create" method="POST">
          <div class="admin-form-group">
            <label>Select Client Project</label>
            <select name="project_id" required class="form-input" style="background:var(--bg-secondary); color:var(--text-primary); border: 1px solid var(--border-glass);">
              <option value="" disabled selected>Select Project...</option>
              ${projectsOptionsHtml}
            </select>
          </div>
          <div class="admin-form-group">
            <label>Milestone Title</label>
            <input type="text" name="title" placeholder="e.g. Complete Wireframes" required class="form-input">
          </div>
          <div class="admin-form-group">
            <label>Description</label>
            <textarea name="description" placeholder="Details about this milestone..." class="form-textarea" style="height:60px;"></textarea>
          </div>
          <div class="admin-form-group">
            <label>Due Date</label>
            <input type="date" name="due_date" required class="form-input">
          </div>
          <div class="admin-form-group">
            <label>Status</label>
            <select name="status" class="form-input" style="background:var(--bg-secondary); color:var(--text-primary); border: 1px solid var(--border-glass);">
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button type="submit" class="btn" style="width:100%; margin-top:8px;">Add Milestone</button>
        </form>
      </div>
    </div>

    <!-- Modal 2: Add Invoice -->
    <div id="modal-add-invoice" class="admin-modal-overlay">
      <div class="admin-modal-box glass">
        <div class="admin-modal-header">
          <h3 class="admin-modal-title">Create Client Invoice</h3>
          <button class="admin-modal-close" onclick="closeAdminModal('modal-add-invoice')">&times;</button>
        </div>
        <form action="/admin/invoice/create" method="POST">
          <div class="admin-form-group">
            <label>Select Client Project</label>
            <select name="project_id" required class="form-input" style="background:var(--bg-secondary); color:var(--text-primary); border: 1px solid var(--border-glass);">
              <option value="" disabled selected>Select Project...</option>
              ${projectsOptionsHtml}
            </select>
          </div>
          <div class="admin-form-group">
            <label>Invoice Number</label>
            <input type="text" name="invoice_number" placeholder="e.g. INV-2026-01" required class="form-input">
          </div>
          <div class="admin-form-group">
            <label>Amount ($)</label>
            <input type="number" step="0.01" name="amount" placeholder="e.g. 1250.00" required class="form-input">
          </div>
          <div class="admin-form-group">
            <label>Due Date</label>
            <input type="date" name="due_date" required class="form-input">
          </div>
          <div class="admin-form-group">
            <label>Payment URL (Stripe / Razorpay)</label>
            <input type="url" name="payment_url" placeholder="https://buy.stripe.com/..." class="form-input">
          </div>
          <div class="admin-form-group">
            <label>Status</label>
            <select name="status" class="form-input" style="background:var(--bg-secondary); color:var(--text-primary); border: 1px solid var(--border-glass);">
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          <button type="submit" class="btn" style="width:100%; margin-top:8px;">Create Invoice</button>
        </form>
      </div>
    </div>

    <!-- Modal 3: Create Blog Article -->
    <div id="modal-create-blog" class="admin-modal-overlay">
      <div class="admin-modal-box glass">
        <div class="admin-modal-header">
          <h3 class="admin-modal-title">Publish New Blog Article</h3>
          <button class="admin-modal-close" onclick="closeAdminModal('modal-create-blog')">&times;</button>
        </div>
        <form action="/admin/content/create" method="POST">
          <input type="hidden" name="type" value="blog">
          <div class="admin-form-group">
            <label>Article Title</label>
            <input type="text" name="title" placeholder="e.g. Optimizing Web Core Vitals" required class="form-input">
          </div>
          <div class="admin-form-group">
            <label>Slug (URL identifier)</label>
            <input type="text" name="slug" placeholder="e.g. web-core-vitals" required class="form-input">
          </div>
          <div class="admin-form-group">
            <label>Body Content (HTML / Markdown)</label>
            <textarea name="content" placeholder="Article content body..." class="form-textarea" style="height:120px;" required></textarea>
          </div>
          <button type="submit" class="btn" style="width:100%; margin-top:8px;">Publish Article</button>
        </form>
      </div>
    </div>

    <!-- Modal 4: Create Portfolio Project -->
    <div id="modal-create-project" class="admin-modal-overlay">
      <div class="admin-modal-box glass">
        <div class="admin-modal-header">
          <h3 class="admin-modal-title">Add Portfolio Project Entry</h3>
          <button class="admin-modal-close" onclick="closeAdminModal('modal-create-project')">&times;</button>
        </div>
        <form action="/admin/content/create" method="POST">
          <input type="hidden" name="type" value="project">
          <div class="admin-form-group">
            <label>Project Title</label>
            <input type="text" name="title" placeholder="e.g. SaaS Analytics Portal" required class="form-input">
          </div>
          <div class="admin-form-group">
            <label>Category</label>
            <input type="text" name="category" placeholder="e.g. Web Development" required class="form-input">
          </div>
          <div class="admin-form-group">
            <label>Gallery Filter Class</label>
            <select name="class_name" required class="form-input" style="background:var(--bg-secondary); color:var(--text-primary); border: 1px solid var(--border-glass);">
              <option value="gal_a">Web Development (gal_a)</option>
              <option value="gal_b">Creative Design (gal_b)</option>
              <option value="gal_c">Graphic Design (gal_c)</option>
            </select>
          </div>
          <div class="admin-form-group">
            <label>Image File Path</label>
            <input type="text" name="image_url" placeholder="/assets/images/uploads/gallery_img-01.jpg" required class="form-input">
          </div>
          <div class="admin-form-group">
            <label>Project Description</label>
            <textarea name="content" placeholder="Short description..." class="form-textarea" style="height:70px;" required></textarea>
          </div>
          <button type="submit" class="btn" style="width:100%; margin-top:8px;">Add Portfolio Entry</button>
        </form>
      </div>
    </div>

    <!-- Modal 5: Create Service -->
    <div id="modal-create-service" class="admin-modal-overlay">
      <div class="admin-modal-box glass">
        <div class="admin-modal-header">
          <h3 class="admin-modal-title">Add Service Offered</h3>
          <button class="admin-modal-close" onclick="closeAdminModal('modal-create-service')">&times;</button>
        </div>
        <form action="/admin/service/create" method="POST">
          <div class="admin-form-group">
            <label>Service Title</label>
            <input type="text" name="title" placeholder="e.g. Edge Analytics" required class="form-input">
          </div>
          <div class="admin-form-group">
            <label>Service Description</label>
            <textarea name="description" placeholder="Detailed service description..." class="form-textarea" style="height:70px;" required></textarea>
          </div>
          <div class="admin-form-group">
            <label>Icon SVG Code</label>
            <textarea name="icon" placeholder='<svg class="icon-svg" viewBox="0 0 24 24">...</svg>' class="form-textarea" style="height:70px;" required></textarea>
          </div>
          <button type="submit" class="btn" style="width:100%; margin-top:8px;">Add Service</button>
        </form>
      </div>
    </div>

    <!-- Modal 6: Create Testimonial -->
    <div id="modal-create-testimonial" class="admin-modal-overlay">
      <div class="admin-modal-box glass">
        <div class="admin-modal-header">
          <h3 class="admin-modal-title">Add Client Testimonial</h3>
          <button class="admin-modal-close" onclick="closeAdminModal('modal-create-testimonial')">&times;</button>
        </div>
        <form action="/admin/testimonial/create" method="POST">
          <div class="admin-form-group">
            <label>Client Name</label>
            <input type="text" name="name" placeholder="e.g. James Fernando" required class="form-input">
          </div>
          <div class="admin-form-group">
            <label>Role / Company / Location</label>
            <input type="text" name="role" placeholder="e.g. Manager at Racer" required class="form-input">
          </div>
          <div class="admin-form-group">
            <label>Testimonial Text</label>
            <textarea name="text" placeholder="Client feedback text..." class="form-textarea" style="height:80px;" required></textarea>
          </div>
          <div class="admin-form-group">
            <label>Avatar Image Path (Optional)</label>
            <input type="text" name="img" placeholder="/assets/images/uploads/testi_01.png" class="form-input">
          </div>
          <button type="submit" class="btn" style="width:100%; margin-top:8px;">Add Testimonial</button>
        </form>
      </div>
    </div>

    <!-- Client-Side Admin JS Scripting -->
    <script>
      function switchAdminTab(tabId) {
        document.querySelectorAll('.admin-nav-link').forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
        });
        document.querySelectorAll('.admin-tab-pane').forEach(pane => {
          pane.classList.toggle('active', pane.id === tabId);
        });
      }

      function switchMetadataMode(mode) {
        const formDiv = document.getElementById('metadata-mode-form');
        const jsonDiv = document.getElementById('metadata-mode-json');
        const btnForm = document.getElementById('btn-mode-form');
        const btnJson = document.getElementById('btn-mode-json');
        if (mode === 'json') {
          if (formDiv) formDiv.style.display = 'none';
          if (jsonDiv) jsonDiv.style.display = 'block';
          if (btnForm) btnForm.className = 'btn-outline';
          if (btnJson) btnJson.className = 'btn';
        } else {
          if (formDiv) formDiv.style.display = 'block';
          if (jsonDiv) jsonDiv.style.display = 'none';
          if (btnForm) btnForm.className = 'btn';
          if (btnJson) btnJson.className = 'btn-outline';
        }
      }

      function formatJsonTextarea() {
        const textarea = document.getElementById('json-config-textarea');
        if (!textarea) return;
        try {
          const parsed = JSON.parse(textarea.value);
          textarea.value = JSON.stringify(parsed, null, 2);
        } catch (e) {
          alert('Invalid JSON syntax: ' + e.message);
        }
      }

      function validateJsonSubmit() {
        const textarea = document.getElementById('json-config-textarea');
        if (!textarea) return false;
        try {
          JSON.parse(textarea.value);
          return true;
        } catch (e) {
          alert('Cannot submit. JSON syntax error: ' + e.message);
          return false;
        }
      }

      document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.admin-nav-link').forEach(btn => {
          btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            if (targetTab) switchAdminTab(targetTab);
          });
        });

        // Close modal when clicking overlay backdrop
        document.querySelectorAll('.admin-modal-overlay').forEach(overlay => {
          overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
              overlay.classList.remove('active');
            }
          });
        });
      });

      function openAdminModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('active');
      }

      function closeAdminModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
      }
    </script>
  `;
  return layout("Admin Management Console", content, "Admin Control Panel", "admin");
}

export function adminClientDetailPage(data: {
  project: any;
  assets: any[];
  milestones: any[];
  invoices: any[];
  error?: string;
  success?: string;
}): string {
  const { project, assets, milestones, invoices, error, success } = data;
  const projectId = project.id;

  const statusColors: Record<string, string> = {
    onboarding: '#3B82F6',
    wireframing: '#8B5CF6',
    development: '#F59E0B',
    testing: '#EC4899',
    completed: '#10B981',
  };
  const statusColor = statusColors[project.status] || '#6B7280';

  /* ---- Milestones ---- */
  const msStatusIcon: Record<string, string> = {
    completed: '&#10003;',
    in_progress: '&#8635;',
    pending: '&#9679;',
  };
  const msStatusColor: Record<string, string> = {
    completed: '#10B981',
    in_progress: '#F59E0B',
    pending: '#6B7280',
  };

  const milestonesHtml = milestones.length
    ? milestones.map((m: any, i: number) => `
      <div style="display:flex; gap:1rem; align-items:flex-start; padding: 1rem 0; ${i < milestones.length - 1 ? 'border-bottom:1px solid var(--border-glass);' : ''}">
        <div style="display:flex; flex-direction:column; align-items:center; flex-shrink:0;">
          <span style="font-size:1.1rem; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:${msStatusColor[m.status] || '#6B7280'}20; color:${msStatusColor[m.status] || '#6B7280'}; border:2px solid ${msStatusColor[m.status] || '#6B7280'};">${msStatusIcon[m.status] || '&#9679;'}</span>
          ${i < milestones.length - 1 ? '<div style="width:2px; flex:1; min-height:20px; background:var(--border-glass); margin-top:4px;"></div>' : ''}
        </div>
        <div style="flex:1; min-width:0;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.25rem;">
            <strong style="font-size:0.95rem;">${m.title}</strong>
            <span style="font-size:0.68rem; font-weight:700; padding:2px 10px; border-radius:99px; background:${msStatusColor[m.status] || '#6B7280'}20; color:${msStatusColor[m.status] || '#6B7280'}; border:1px solid ${msStatusColor[m.status] || '#6B7280'}40;">${m.status.replace('_', ' ')}</span>
          </div>
          ${m.description ? `<p style="font-size:0.85rem; color:var(--text-secondary); margin:0 0 0.25rem 0;">${m.description}</p>` : ''}
          ${m.due_date ? `<small style="color:var(--text-secondary);">Due: ${new Date(m.due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</small>` : ''}
        </div>
      </div>
    `).join('')
    : '<p style="color:var(--text-secondary); padding: 1rem 0;">No milestones added yet.</p>';

  /* ---- Invoices ---- */
  const invStatusColor: Record<string, string> = {
    paid: '#10B981',
    unpaid: '#F59E0B',
    overdue: '#EF4444',
  };

  const totalBilled = invoices.reduce((sum: number, inv: any) => sum + parseFloat(inv.amount), 0);
  const totalPaid = invoices.filter((inv: any) => inv.status === 'paid').reduce((sum: number, inv: any) => sum + parseFloat(inv.amount), 0);

  const invoicesHtml = invoices.length
    ? `
      <div style="display:flex; gap:1rem; margin-bottom:1.25rem; flex-wrap:wrap;">
        <div style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:0.75rem 1.25rem;">
          <div style="font-size:0.68rem; color:var(--text-secondary); font-weight:700; text-transform:uppercase; letter-spacing:0.05em;">Total Billed</div>
          <div style="font-size:1.3rem; font-weight:800; color:#10B981;">Rs.${totalBilled.toLocaleString('en-IN')}</div>
        </div>
        <div style="background:rgba(59,130,246,0.1); border:1px solid rgba(59,130,246,0.3); border-radius:8px; padding:0.75rem 1.25rem;">
          <div style="font-size:0.68rem; color:var(--text-secondary); font-weight:700; text-transform:uppercase; letter-spacing:0.05em;">Collected</div>
          <div style="font-size:1.3rem; font-weight:800; color:#3B82F6;">Rs.${totalPaid.toLocaleString('en-IN')}</div>
        </div>
        <div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:8px; padding:0.75rem 1.25rem;">
          <div style="font-size:0.68rem; color:var(--text-secondary); font-weight:700; text-transform:uppercase; letter-spacing:0.05em;">Outstanding</div>
          <div style="font-size:1.3rem; font-weight:800; color:#EF4444;">Rs.${(totalBilled - totalPaid).toLocaleString('en-IN')}</div>
        </div>
      </div>
      <div class="table-responsive">
        <table class="users-table" style="width:100%;">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            ${invoices.map((inv: any) => `
              <tr>
                <td style="font-family:monospace; font-weight:600;">${inv.invoice_number}</td>
                <td style="font-weight:700;">Rs.${parseFloat(inv.amount).toLocaleString('en-IN')}</td>
                <td>${inv.due_date ? new Date(inv.due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}</td>
                <td><span style="font-size:0.68rem; font-weight:700; padding:3px 10px; border-radius:99px; background:${invStatusColor[inv.status] || '#6B7280'}20; color:${invStatusColor[inv.status] || '#6B7280'}; border:1px solid ${invStatusColor[inv.status] || '#6B7280'}40;">${inv.status}</span></td>
                <td>${inv.payment_url ? `<a href="${inv.payment_url}" target="_blank" style="color:var(--accent-color); font-size:0.8rem; font-weight:600;">Pay Link</a>` : '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `
    : '<p style="color:var(--text-secondary); padding: 0.5rem 0;">No invoices created yet.</p>';

  /* ---- Assets ---- */
  const categoryEmoji: Record<string, string> = {
    'Logo': '&#128444;',
    'Content/Copy': '&#128196;',
    'Credentials': '&#128273;',
    'Design References': '&#127912;',
    'Other': '&#128206;',
  };
  const categoryColors: Record<string, string> = {
    'Logo': '#8B5CF6',
    'Content/Copy': '#3B82F6',
    'Credentials': '#EF4444',
    'Design References': '#F59E0B',
    'Other': '#6B7280',
  };

  const assetsHtml = assets.length
    ? assets.map((a: any) => `
      <div style="display:flex; align-items:center; gap:0.75rem; padding:0.75rem; background:rgba(255,255,255,0.03); border-radius:8px; border:1px solid var(--border-glass); margin-bottom:0.5rem;">
        <div style="font-size:1.4rem; flex-shrink:0;">${categoryEmoji[a.category] || '&#128206;'}</div>
        <div style="flex:1; min-width:0;">
          <a href="${a.file_url}" target="_blank" download style="color:var(--accent-color); font-weight:600; font-size:0.875rem; word-break:break-all;">${a.file_name}</a>
          ${a.description ? `<p style="font-size:0.78rem; color:var(--text-secondary); margin:2px 0 0 0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${a.description}</p>` : ''}
          <small style="font-size:0.7rem; color:var(--text-secondary);">${new Date(a.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</small>
        </div>
        <span style="flex-shrink:0; font-size:0.65rem; font-weight:700; padding:3px 8px; border-radius:99px; background:${categoryColors[a.category] || '#6B7280'}20; color:${categoryColors[a.category] || '#6B7280'}; border:1px solid ${categoryColors[a.category] || '#6B7280'}40;">${a.category}</span>
      </div>
    `).join('')
    : '<p style="color:var(--text-secondary);">No files uploaded by this client yet.</p>';

  const content = `
    <style>
      .client-detail-page { padding: 120px 24px 60px; max-width: 1200px; margin: 0 auto; }
      .client-section { padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; }
      .detail-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); gap: 1.5rem; }
      .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
      @media(max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
      .section-title { font-size: 1rem; font-weight: 800; letter-spacing: -0.01em; color: var(--accent-color); margin: 0 0 1.25rem 0; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-glass); }
      .alert-banner { padding: 0.875rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-weight: 600; font-size: 0.9rem; }
      .alert-success { background: rgba(16, 185, 129, 0.12); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.3); }
      .alert-error   { background: rgba(239, 68, 68, 0.12);  color: #EF4444;  border: 1px solid rgba(239, 68, 68, 0.3);  }
      details summary::-webkit-details-marker { display: none; }
    </style>

    <div class="client-detail-page">

      <!-- Page Header -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:2rem; flex-wrap:wrap; gap:1rem;">
        <div>
          <a href="/admin/menu" style="font-size:0.82rem; color:var(--text-secondary); text-decoration:none; display:inline-flex; align-items:center; gap:0.3rem; margin-bottom:0.5rem;">&larr; Back to Admin Panel</a>
          <h2 style="margin:0; font-size:1.6rem; font-weight:800;">${project.title}</h2>
          <p style="margin:0.25rem 0 0; color:var(--text-secondary); font-size:0.875rem;">Client: <strong>${project.client_email}</strong></p>
        </div>
        <span style="font-size:0.78rem; font-weight:700; padding:6px 18px; border-radius:99px; background:${statusColor}20; color:${statusColor}; border:1px solid ${statusColor}40; text-transform:capitalize;">${project.status}</span>
      </div>

      ${error ? `<div class="alert-banner alert-error">&#9888; ${error}</div>` : ''}
      ${success ? `<div class="alert-banner alert-success">&#10003; ${success}</div>` : ''}

      <!-- Project Settings -->
      <section class="client-section glass">
        <h3 class="section-title">&#9881; Project Settings</h3>
        <form action="/admin/clients/${projectId}/project/update" method="POST">
          <div class="form-row" style="margin-bottom:0.75rem;">
            <div>
              <label style="display:block; font-size:0.78rem; font-weight:700; margin-bottom:0.3rem; color:var(--text-secondary);">Project Status</label>
              <select name="status" class="form-input" style="background:var(--bg-secondary); color:var(--text-primary); border:1px solid var(--border-glass);">
                ${['onboarding', 'wireframing', 'development', 'testing', 'completed'].map(s =>
    `<option value="${s}" ${project.status === s ? 'selected' : ''}>${s.charAt(0).toUpperCase() + s.slice(1)}</option>`
  ).join('')}
              </select>
            </div>
            <div>
              <label style="display:block; font-size:0.78rem; font-weight:700; margin-bottom:0.3rem; color:var(--text-secondary);">Figma Link</label>
              <input type="url" name="figma_link" value="${project.figma_link || ''}" placeholder="https://figma.com/..." class="form-input">
            </div>
            <div>
              <label style="display:block; font-size:0.78rem; font-weight:700; margin-bottom:0.3rem; color:var(--text-secondary);">Staging Link</label>
              <input type="url" name="staging_link" value="${project.staging_link || ''}" placeholder="https://staging.example.com" class="form-input">
            </div>
            <div>
              <label style="display:block; font-size:0.78rem; font-weight:700; margin-bottom:0.3rem; color:var(--text-secondary);">Production Link</label>
              <input type="url" name="production_link" value="${project.production_link || ''}" placeholder="https://example.com" class="form-input">
            </div>
          </div>
          <button type="submit" class="btn" style="margin-top:0.25rem;">Save Settings</button>
        </form>
      </section>

      <!-- 2-column grid: Milestones + Billing -->
      <div class="detail-grid">

        <!-- Milestones -->
        <section class="client-section glass">
          <h3 class="section-title">Milestones (${milestones.length})</h3>
          <div>${milestonesHtml}</div>
          <details style="border-top:1px solid var(--border-glass); padding-top:1rem; margin-top:0.5rem;">
            <summary style="cursor:pointer; font-weight:700; font-size:0.875rem; color:var(--accent-color); user-select:none; list-style:none;">+ Add New Milestone</summary>
            <form action="/admin/clients/${projectId}/milestone" method="POST" style="margin-top:1rem; display:flex; flex-direction:column; gap:0.75rem;">
              <input type="text" name="title" placeholder="Milestone title (e.g. Deliver Wireframes)" required class="form-input">
              <textarea name="description" placeholder="Optional description..." class="form-textarea" style="height:70px;"></textarea>
              <div class="form-row">
                <div>
                  <label style="display:block; font-size:0.78rem; font-weight:700; margin-bottom:0.3rem; color:var(--text-secondary);">Due Date</label>
                  <input type="date" name="due_date" class="form-input">
                </div>
                <div>
                  <label style="display:block; font-size:0.78rem; font-weight:700; margin-bottom:0.3rem; color:var(--text-secondary);">Status</label>
                  <select name="status" class="form-input" style="background:var(--bg-secondary); color:var(--text-primary); border:1px solid var(--border-glass);">
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="btn">Add Milestone</button>
            </form>
          </details>
        </section>

        <!-- Billing -->
        <section class="client-section glass">
          <h3 class="section-title">Billing &amp; Invoices (${invoices.length})</h3>
          ${invoicesHtml}
          <details style="border-top:1px solid var(--border-glass); padding-top:1rem; margin-top:1rem;">
            <summary style="cursor:pointer; font-weight:700; font-size:0.875rem; color:var(--accent-color); user-select:none; list-style:none;">+ Add New Invoice</summary>
            <form action="/admin/clients/${projectId}/invoice" method="POST" style="margin-top:1rem; display:flex; flex-direction:column; gap:0.75rem;">
              <div class="form-row">
                <div>
                  <label style="display:block; font-size:0.78rem; font-weight:700; margin-bottom:0.3rem; color:var(--text-secondary);">Invoice #</label>
                  <input type="text" name="invoice_number" placeholder="INV-001" required class="form-input">
                </div>
                <div>
                  <label style="display:block; font-size:0.78rem; font-weight:700; margin-bottom:0.3rem; color:var(--text-secondary);">Amount</label>
                  <input type="number" step="0.01" name="amount" placeholder="15000.00" required class="form-input">
                </div>
              </div>
              <div class="form-row">
                <div>
                  <label style="display:block; font-size:0.78rem; font-weight:700; margin-bottom:0.3rem; color:var(--text-secondary);">Due Date</label>
                  <input type="date" name="due_date" class="form-input">
                </div>
                <div>
                  <label style="display:block; font-size:0.78rem; font-weight:700; margin-bottom:0.3rem; color:var(--text-secondary);">Status</label>
                  <select name="status" class="form-input" style="background:var(--bg-secondary); color:var(--text-primary); border:1px solid var(--border-glass);">
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>
              <input type="url" name="payment_url" placeholder="Payment / Stripe URL (optional)" class="form-input">
              <button type="submit" class="btn">Add Invoice</button>
            </form>
          </details>
        </section>

      </div>

      <!-- Client Assets -->
      <section class="client-section glass">
        <h3 class="section-title">Client Uploaded Assets (${assets.length})</h3>
        ${assetsHtml}
      </section>

    </div>
  `;

  return layout(`Client: ${project.title}`, content, `Admin view for ${project.client_email}`, 'admin');
}

export function adminDataPage(blogPosts: any[], siteConfig: any[]): string {
  const blogsHtml = blogPosts.map(p => `
    <tr>
      <td>${p.title}</td>
      <td>${p.slug}</td>
      <td><span class="role-badge ${p.is_published ? 'role-admin' : 'role-user'}">${p.is_published ? 'Published' : 'Draft (Project)'}</span></td>
      <td>${new Date(p.created_at).toLocaleDateString()}</td>
    </tr>
  `).join('');

  const configHtml = siteConfig.map(c => `
    <tr>
      <td><code>${c.key}</code></td>
      <td>${c.value}</td>
    </tr>
  `).join('');

  const content = `
    <div class="admin-dashboard">
      <header class="dashboard-header">
        <h2>Admin Data Access</h2>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <a href="/admin/menu" class="btn-outline">Back to Dashboard</a>
          <form action="/admin/logout" method="POST" style="margin:0;">
            <button type="submit" class="btn-outline">Logout</button>
          </form>
        </div>
      </header>
      
      <div class="dashboard-grid">
        <section class="dashboard-col glass" style="flex: 2; border-radius:12px;">
          <h3>Content (Projects & Blog Posts)</h3>
          <div class="table-responsive">
            <table class="users-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                ${blogsHtml.length ? blogsHtml : '<tr><td colspan="4" class="text-center text-secondary">No content entries found.</td></tr>'}
              </tbody>
            </table>
          </div>
        </section>

        <section class="dashboard-col glass" style="flex: 1; border-radius:12px;">
          <h3>Site Metadata</h3>
          <div class="table-responsive">
            <table class="users-table">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                ${configHtml.length ? configHtml : '<tr><td colspan="2" class="text-center text-secondary">No metadata found.</td></tr>'}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  `;
  return layout("Data Access", content, "Site DB Data Access", "admin");
}

export function clientDashboardPage(data: {
  client: any;
  project: any;
  milestones: any[];
  invoices: any[];
  assets: any[];
  error?: string;
  success?: string;
}): string {
  const { client, project, milestones, invoices, assets, error, success } = data;

  if (!project) {
    const noProjectContent = `
      <section class="auth-section" style="padding-top: 120px;">
        <div class="glass auth-card" style="text-align: center; max-width: 600px; border-radius:12px;">
          <h2>Client Portal</h2>
          <p style="margin: 1.5rem 0; color: var(--text-secondary);">Your client portal has been registered (Email: <strong>${client.email}</strong>), but there are currently no active projects assigned to your account.</p>
          <p style="color: var(--text-muted);">Please contact Nikunj Pateliya to setup and activate your dashboard.</p>
          <a href="/" class="btn" style="margin-top: 1.5rem;">Back to Home</a>
        </div>
      </section>
    `;
    return layout("Client Portal", noProjectContent, "My Portal", "user");
  }

  const milestonesHtml = milestones.length
    ? milestones.map(m => {
      let statusClass = 'pending';
      let statusLabel = 'Pending';
      if (m.status === 'completed') {
        statusClass = 'completed';
        statusLabel = 'Completed';
      } else if (m.status === 'in_progress') {
        statusClass = 'in_progress';
        statusLabel = 'In Progress';
      }

      return `
          <div class="timeline-item ${statusClass}">
            <div class="timeline-content">
              <div class="timeline-header">
                <h4 style="margin:0; font-weight:700;">${m.title}</h4>
                <span class="status-badge status-${statusClass}" style="font-size:0.7rem; padding:2px 8px;">${statusLabel}</span>
              </div>
              <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:0.25rem; margin-top:0.25rem;">${m.description || ''}</p>
              ${m.due_date ? `<small style="color:var(--text-muted);">Due Date: ${new Date(m.due_date).toLocaleDateString()}</small>` : ''}
            </div>
          </div>
        `;
    }).join('')
    : '<p class="text-secondary">No project milestones scheduled yet.</p>';

  const invoicesHtml = invoices.length
    ? invoices.map(i => {
      let statusLabel = i.status.toUpperCase();
      let statusClass = `invoice-${i.status}`;

      return `
          <tr>
            <td><strong>${i.invoice_number}</strong></td>
            <td>$${parseFloat(i.amount).toFixed(2)}</td>
            <td>${i.due_date ? new Date(i.due_date).toLocaleDateString() : 'N/A'}</td>
            <td><span class="invoice-status ${statusClass}">${statusLabel}</span></td>
            <td>
              ${i.status !== 'paid' && i.payment_url
          ? `<a href="${i.payment_url}" target="_blank" class="btn" style="padding: 4px 12px; font-size: 0.8rem;">Pay Invoice</a>`
          : i.status === 'paid' ? '<span style="color:#10B981; font-weight:600;">✓ Settled</span>' : 'Pending Link'}
            </td>
          </tr>
        `;
    }).join('')
    : '<tr><td colspan="5" class="text-secondary" style="text-align:center;">No invoices billed yet.</td></tr>';

  const assetsHtml = assets.length
    ? assets.map(a => `
        <div class="glass asset-card" style="border: 1px solid var(--border-glass); border-radius: 8px; padding: 1rem; position: relative;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem; gap:0.5rem;">
            <h4 style="margin:0; font-size:1.05rem;"><a href="${a.file_url}" target="_blank" download="${a.file_name}" style="color:var(--accent-color); font-weight:600;">${a.file_name}</a></h4>
            <span class="role-badge role-user" style="font-size:0.7rem; padding:2px 8px;">${a.category}</span>
          </div>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin:0 0 0.5rem;">${a.description || 'No description notes added.'}</p>
          <small class="text-muted" style="font-size:0.75rem;">Uploaded on: ${new Date(a.created_at).toLocaleDateString()}</small>
        </div>
      `).join('')
    : '<p class="text-secondary" style="grid-column: 1/-1;">No files uploaded yet. Use the form below to upload your project assets.</p>';

  const content = `
    <style>
      .client-dashboard {
        padding: 120px 24px 60px;
        max-width: 1200px;
        margin: 0 auto;
      }
      .client-welcome {
        margin-bottom: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .client-welcome h1 {
        font-size: clamp(1.75rem, 4vw, 2.5rem);
        font-weight: 800;
        margin-bottom: 0.5rem;
        letter-spacing: -0.02em;
        overflow-wrap: break-word;
      }
      .status-badge {
        display: inline-block;
        padding: 6px 16px;
        border-radius: 99px;
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
      }
      .status-onboarding { background: #3B82F6; color: white; }
      .status-wireframing { background: #8B5CF6; color: white; }
      .status-development { background: #F59E0B; color: white; }
      .status-testing { background: #EC4899; color: white; }
      .status-completed { background: #10B981; color: white; }

      .dashboard-section {
        margin-bottom: 3rem;
      }
      .dashboard-section h2 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid var(--border-glass);
        padding-bottom: 0.5rem;
      }
      
      .resources-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
        gap: 1.5rem;
      }
      .resource-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
        transition: var(--transition-smooth);
        text-decoration: none;
        color: inherit;
        border-radius: 12px;
      }
      .resource-card:hover {
        border-color: var(--border-glass-hover);
        transform: translateY(-2px);
      }
      .resource-icon-box {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(16, 185, 129, 0.1);
        border-radius: 8px;
        color: var(--accent-color);
        flex-shrink: 0;
      }
      .resource-info h3 {
        margin: 0 0 0.25rem 0;
        font-size: 1.1rem;
        font-weight: 700;
      }

      .timeline {
        position: relative;
        padding-left: 2rem;
      }
      .timeline::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 7px;
        width: 2px;
        background: var(--border-glass);
      }
      .timeline-item {
        position: relative;
        margin-bottom: 2rem;
      }
      .timeline-item::before {
        content: '';
        position: absolute;
        left: -2rem;
        top: 6px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--bg-primary);
        border: 3px solid var(--border-glass);
        transition: var(--transition-smooth);
        z-index: 2;
      }
      .timeline-item.completed::before {
        background: #10B981;
        border-color: #10B981;
      }
      .timeline-item.in_progress::before {
        background: #F59E0B;
        border-color: #F59E0B;
      }
      .timeline-item.pending::before {
        background: var(--text-muted);
        border-color: var(--border-glass);
      }
      .timeline-content {
        background: var(--bg-glass);
        border: 1px solid var(--border-glass);
        border-radius: 8px;
        padding: 1rem 1.5rem;
      }
      .timeline-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
      }

      .upload-form, .message-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 2rem;
        border-radius: 12px;
      }
      .alert-banner {
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        font-weight: 600;
      }
      .alert-success { background: rgba(16, 185, 129, 0.15); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.3); }
      .alert-error { background: rgba(239, 68, 68, 0.15); color: #EF4444; border: 1px solid rgba(239, 68, 68, 0.3); }

      .invoices-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
      }
      .invoices-table th, .invoices-table td {
        padding: 12px 16px;
        text-align: left;
        border-bottom: 1px solid var(--border-glass);
      }
      .invoice-status {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        padding: 2px 8px;
        border-radius: 4px;
      }
      .invoice-paid { background: rgba(16, 185, 129, 0.15); color: #10B981; }
      .invoice-unpaid { background: rgba(245, 158, 11, 0.15); color: #F59E0B; }
      .invoice-overdue { background: rgba(239, 68, 68, 0.15); color: #EF4444; }

      .asset-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
        gap: 1.5rem;
        margin-top: 1.5rem;
      }
      .asset-card {
        padding: 1rem;
        border: 1px solid var(--border-glass);
        border-radius: 8px;
      }
      .asset-card h4 {
        margin-bottom: 0.25rem;
      }
      
      .dashboard-grid-two {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: clamp(1rem, 2.5cqi, 2rem);
      }
      @media (max-width: 900px) {
        .dashboard-grid-two {
          grid-template-columns: 1fr;
        }
      }
    </style>

    <div class="client-dashboard">
      <div class="client-welcome">
        <div>
          <span class="text-muted" style="font-family: var(--font-mono); font-size: 0.9rem;">CLIENT PORTAL</span>
          <h1>Project: ${project.title}</h1>
          <p class="text-secondary">${project.description || 'Welcome to your project portal!'}</p>
        </div>
        <div>
          <span class="status-badge status-${project.status}">Status: ${project.status}</span>
        </div>
      </div>

      ${error ? `<div class="alert-banner alert-error">${error}</div>` : ''}
      ${success ? `<div class="alert-banner alert-success">${success}</div>` : ''}

      <section class="dashboard-section">
        <h2>Shared Resources</h2>
        <div class="resources-grid">
          ${project.figma_link ? `
            <a href="${project.figma_link}" target="_blank" class="glass resource-card">
              <div class="resource-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path><path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"></path></svg>
              </div>
              <div class="resource-info">
                <h3>Figma Wireframes & Design</h3>
                <span class="text-muted" style="font-size:0.85rem;">Click to view designs</span>
              </div>
            </a>
          ` : ''}
          ${project.staging_link ? `
            <a href="${project.staging_link}" target="_blank" class="glass resource-card">
              <div class="resource-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <div class="resource-info">
                <h3>Staging Live Preview</h3>
                <span class="text-muted" style="font-size:0.85rem;">Inspect coded interface</span>
              </div>
            </a>
          ` : ''}
          ${project.production_link ? `
            <a href="${project.production_link}" target="_blank" class="glass resource-card">
              <div class="resource-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </div>
              <div class="resource-info">
                <h3>Production Launched Link</h3>
                <span class="text-muted" style="font-size:0.85rem;">Live website URL</span>
              </div>
            </a>
          ` : ''}
        </div>
      </section>

      <div class="dashboard-grid-two">
        <div>
          <section class="dashboard-section">
            <h2>Project Milestones & Timeline</h2>
            <div class="timeline">
              ${milestonesHtml}
            </div>
          </section>

          <section class="dashboard-section">
            <h2>Billing & Invoices</h2>
            <div class="glass" style="padding:1.5rem; border-radius:12px;">
              <div class="table-responsive">
                <table class="invoices-table">
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Amount</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${invoicesHtml}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>

        <div>
          <section class="dashboard-section">
            <h2>Deliver Brand Assets & Notes</h2>
            
            <form action="/client/upload" method="POST" enctype="multipart/form-data" class="glass upload-form">
              <h4 style="margin:0; color:var(--accent-color);">Submit Assets or Credentials</h4>
              
              <select name="category" required class="form-input" style="background:var(--bg-secondary); color:var(--text-primary); border: 1px solid var(--border-glass);">
                <option value="Logo">Logo / Brand Identity</option>
                <option value="Content/Copy">Website Content / Copywriting</option>
                <option value="Credentials">Credentials / API Keys</option>
                <option value="Design References">Design References / Inspiration</option>
                <option value="Other" selected>Other Assets</option>
              </select>

              <textarea name="description" placeholder="Write any notes, instructions, credentials or text briefs here..." class="form-textarea" style="height:100px;" required></textarea>

              <div>
                <label style="display:block; margin-bottom:0.5rem; font-size:0.9rem; font-weight:600;">Attach File (Max 10MB)</label>
                <input type="file" name="file" class="form-input" required style="padding:8px; background:var(--bg-secondary); border: 1px solid var(--border-glass);">
              </div>

              <button type="submit" class="btn">Upload Asset & Submit Details</button>
            </form>

            <div style="margin-top: 2rem;">
              <h3 style="font-size:1.2rem; margin-bottom:1rem;">Your Uploaded Files</h3>
              <div style="display:flex; flex-direction:column; gap:1rem;">
                ${assetsHtml}
              </div>
            </div>
          </section>

          <section class="dashboard-section" style="margin-top:2rem;">
            <h2>Need Support or Have Feedback?</h2>
            <form action="/client/message" method="POST" class="glass message-form">
              <input type="text" name="subject" placeholder="Subject / Query topic" required class="form-input">
              <textarea name="body" placeholder="Write your message or detailed feedback..." required class="form-textarea" style="height:100px;"></textarea>
              <button type="submit" class="btn">Send Support Message</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  `;
  return layout("Client Portal Dashboard", content, "My Portal", "user");
}

export function proposalRequestPage(): string {
  const content = `
    <div class="section-container" style="padding-top:120px;">
      <div class="bento-box">
        <h1 style="margin-bottom:1rem; font-size:clamp(1.5rem, 4vw, 2rem); letter-spacing:-0.03em; overflow-wrap:break-word;">Request a Project</h1>
        <p style="color:var(--text-secondary); margin-bottom:2rem;">Fill out the details below to submit a proposal. We will review it and get back to you shortly.</p>
        <form action="/api/proposals" method="POST" class="contact-form" data-track-event="proposal_request_submit" data-track-category="conversion" data-track-label="proposal_request_form">
          <input type="text" name="title" placeholder="Project Title" required class="form-input">
          <textarea name="content_description" placeholder="Project Description & Content" required class="form-textarea" style="height:100px;"></textarea>
          <input type="number" name="budget" placeholder="Estimated Budget (USD)" class="form-input">
          <textarea name="tech_requirements" placeholder="Technical Requirements (Optional)" class="form-textarea" style="height:80px;"></textarea>
          <textarea name="design_requirements" placeholder="Design Requirements (Optional)" class="form-textarea" style="height:80px;"></textarea>
          <button type="submit" class="btn">Submit Proposal</button>
        </form>
      </div>
    </div>
  `;
  return layout("Request a Project", content, "Submit a project proposal", "user");
}

export function proposalListPage(proposals: any[], role: 'admin' | 'user'): string {
  const proposalsHtml = proposals.length > 0
    ? proposals.map(p => `
      <div class="bento-box" style="margin-bottom:1rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem; flex-wrap:wrap; gap:0.5rem;">
          <h3 style="margin:0; overflow-wrap:break-word;">${p.title}</h3>
          <span style="padding:4px 8px; border-radius:4px; font-size:0.8rem; background:var(--bg-card); border:1px solid var(--border-glass);">
            ${p.status.toUpperCase()}
          </span>
        </div>
        <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:1rem;">
          Budget: $${p.budget || 'N/A'} | Created: ${new Date(p.created_at).toLocaleDateString()}
        </p>
        <a href="${role === 'admin' ? '/admin' : '/client'}/proposals/${p.id}" class="btn" style="display:inline-flex; font-size:0.85rem; padding:6px 12px; min-height:36px;">View Details</a>
      </div>
    `).join('')
    : '<p style="color:var(--text-secondary);">No proposals found.</p>';

  const content = `
    <div class="section-container" style="padding-top:120px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem; flex-wrap:wrap; gap:1rem;">
        <h1 style="font-size:clamp(1.5rem, 4vw, 2rem); letter-spacing:-0.03em; overflow-wrap:break-word;">Project Proposals</h1>
        ${role === 'user' ? `<a href="/client/proposals/new" class="btn">Request Project</a>` : ''}
      </div>
      <div style="display:grid; gap:1rem;">
        ${proposalsHtml}
      </div>
    </div>
  `;
  return layout("Project Proposals", content, "Manage project proposals", role);
}

export function proposalDetailsPage(proposal: any, comments: any[], role: 'admin' | 'user'): string {
  const commentsHtml = comments.length > 0
    ? comments.map(c => `
      <div style="margin-bottom:1rem; padding:1rem; background:var(--bg-card); border-radius:8px; border:1px solid var(--border-glass); overflow-wrap:break-word;">
        <div style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:0.5rem;">
          <strong>User ID: ${c.user_id}</strong> on ${new Date(c.created_at).toLocaleString()}
        </div>
        <div>${c.comment}</div>
      </div>
    `).join('')
    : '<p style="color:var(--text-secondary);">No comments yet.</p>';

  const actionForm = role === 'admin' && proposal.status !== 'approved' && proposal.status !== 'rejected'
    ? `
      <div style="margin-top:2rem; padding-top:1rem; border-top:1px solid var(--border-glass);">
        <form action="/api/proposals/${proposal.id}/approve" method="POST" style="display:inline;">
          <button type="submit" class="btn" style="background:#22c55e; color:white;">Approve Proposal</button>
        </form>
      </div>
    ` : '';

  const content = `
    <div class="section-container" style="padding-top:120px;">
      <a href="${role === 'admin' ? '/admin' : '/client'}/proposals" style="color:var(--text-secondary); text-decoration:none; display:inline-block; margin-bottom:1rem;">&larr; Back to Proposals</a>
      <div class="bento-box" style="margin-bottom:2rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
          <h1 style="font-size:clamp(1.5rem, 4vw, 2rem); margin:0; overflow-wrap:break-word;">${proposal.title}</h1>
          <span style="padding:4px 8px; border-radius:4px; font-size:0.8rem; background:var(--bg-card); border:1px solid var(--border-glass);">
            STATUS: ${proposal.status.toUpperCase()}
          </span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(100%, 200px), 1fr)); gap:1rem; margin-bottom:1.5rem;">
          <div>
            <strong>Budget:</strong> $${proposal.budget || 'N/A'}
          </div>
          <div>
            <strong>Client ID:</strong> ${proposal.client_id}
          </div>
        </div>
        <div style="margin-bottom:1.5rem;">
          <strong>Description:</strong>
          <p style="color:var(--text-secondary); white-space:pre-wrap; overflow-wrap:break-word;">${proposal.content_description}</p>
        </div>
        <div style="margin-bottom:1.5rem;">
          <strong>Tech Requirements:</strong>
          <p style="color:var(--text-secondary); white-space:pre-wrap; overflow-wrap:break-word;">${proposal.tech_requirements || 'None'}</p>
        </div>
        <div style="margin-bottom:1.5rem;">
          <strong>Design Requirements:</strong>
          <p style="color:var(--text-secondary); white-space:pre-wrap; overflow-wrap:break-word;">${proposal.design_requirements || 'None'}</p>
        </div>
        ${actionForm}
      </div>

      <div class="bento-box">
        <h2 style="font-size:clamp(1.25rem, 3vw, 1.5rem); margin-bottom:1rem;">Negotiation / Comments</h2>
        <div style="margin-bottom:1.5rem;">
          ${commentsHtml}
        </div>
        <form action="/api/proposals/${proposal.id}/comments" method="POST" class="contact-form" data-track-event="proposal_comment_submit" data-track-category="engagement" data-track-label="proposal_comment_${proposal.id}">
          <textarea name="comment" placeholder="Add a comment or ask for changes..." required class="form-textarea" style="height:80px;"></textarea>
          <button type="submit" class="btn">Post Comment</button>
        </form>
      </div>
    </div>
  `;
  return layout(proposal.title, content, "Proposal Details", role);
}
