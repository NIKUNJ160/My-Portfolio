document.addEventListener('DOMContentLoaded', () => {
    
    // ─── Liquid Ambient Background & Smooth Cursor Tracking ───
    const initLiquidBg = () => {
        if (document.querySelector('.liquid-bg')) return;

        // Create container
        const container = document.createElement('div');
        container.className = 'liquid-bg';

        // Create static floating blobs
        const b1 = document.createElement('div');
        b1.className = 'blob blob-1';
        const b2 = document.createElement('div');
        b2.className = 'blob blob-2';
        const b3 = document.createElement('div');
        b3.className = 'blob blob-3';
        
        // Create mouse cursor trailing blob
        const cursorBlob = document.createElement('div');
        cursorBlob.className = 'blob blob-cursor';

        container.appendChild(b1);
        container.appendChild(b2);
        container.appendChild(b3);
        container.appendChild(cursorBlob);

        // Prepend to body so it sits behind all content
        document.body.insertBefore(container, document.body.firstChild);

        // Position states
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let trailX = mouseX;
        let trailY = mouseY;
        let isFirstMove = true;

        // Mouse movement listener
        document.addEventListener('mousemove', (e) => {
            mouseX = e.pageX;
            mouseY = e.pageY;
            if (isFirstMove) {
                trailX = mouseX;
                trailY = mouseY;
                isFirstMove = false;
            }
        });

        // Animation Loop using spring-like linear interpolation (lerp)
        const updateBlob = () => {
            // Buttery-smooth lag transition (0.06 ease factor)
            trailX += (mouseX - trailX) * 0.06;
            trailY += (mouseY - trailY) * 0.06;

            cursorBlob.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate3d(-50%, -50%, 0)`;

            requestAnimationFrame(updateBlob);
        };

        updateBlob();
    };

    // Initialize Liquid Background
    initLiquidBg();

    // ─── Smooth Scrolling for Anchor Links ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ─── Intersection Observer for Fade-in Animations ───
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    window.fadeObserver = observer;

    // Observe static sections initially
    const staticAnimatedElements = document.querySelectorAll('.section, .service-card, .hero-section');
    staticAnimatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // ─── Client-Side Hydration & Preloader ───

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function renderProjects(projects) {
        const container = document.getElementById('projects-container');
        if (!container) return;
        if (!projects || projects.length === 0) {
            container.innerHTML = `<div class="project-card" style="grid-column: 1 / -1; text-align: center; padding: 4rem;">
                <h3 class="project-title">Work in Progress</h3>
                <p class="project-desc">Projects are currently being uploaded. Check back soon!</p>
            </div>`;
            return;
        }
        container.innerHTML = projects.map(p => {
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
                    <a href="${escapeHtml(p.project_url)}" class="project-link" target="_blank">
                        View Project <span>&rarr;</span>
                    </a>
                </div>
            </article>`;
        }).join('');
    }

    function renderSkills(skillsByCategory) {
        const container = document.getElementById('skills-container');
        if (!container) return;
        const categories = Object.keys(skillsByCategory || {});
        if (categories.length === 0) {
            container.innerHTML = `<p style="color:var(--text-secondary);">No skills listed.</p>`;
            return;
        }
        container.innerHTML = Object.entries(skillsByCategory).map(([category, skills]) => `
            <div class="skill-category">
                <h4 class="skill-heading">${escapeHtml(category.charAt(0).toUpperCase() + category.slice(1))}</h4>
                <div class="skill-list">
                    ${skills.map(s => `<div class="skill-pill">${escapeHtml(s.name)}</div>`).join('')}
                </div>
            </div>`).join('');
    }

    function renderBlog(recentPosts) {
        const container = document.getElementById('blog-posts-container');
        const blogSection = document.getElementById('blog');
        if (!container) return;
        if (!recentPosts || recentPosts.length === 0) {
            if (blogSection) blogSection.style.display = 'none';
            return;
        }
        if (blogSection) blogSection.style.display = 'block';
        
        container.innerHTML = recentPosts.map(p => {
            const rt = Math.max(1, Math.round(((p.content || '').replace(/<[^>]+>/g, '').match(/\S+/g) || []).length / 200));
            const d = (() => {
                try {
                    return new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                } catch {
                    return p.created_at;
                }
            })();
            const ptags = (p.tags || '').split(',').map(t => t.trim()).filter(Boolean);
            return `<a href="/blog/${escapeHtml(p.slug)}" style="display:block;background:var(--bg-card);border:1px solid var(--border-color);border-radius:16px;padding:1.75rem;text-decoration:none;transition:all 0.3s ease;">
                ${ptags.length ? `<div style="display:flex;gap:0.4rem;flex-wrap:wrap;margin-bottom:0.75rem;">${ptags.slice(0, 2).map(t => `<span style="font-size:0.72rem;font-weight:600;padding:2px 8px;border-radius:99px;background:rgba(52,211,153,0.1);color:var(--accent-color);text-transform:uppercase;">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
                <h3 style="font-size:1.1rem;font-weight:700;color:var(--text-primary);margin-bottom:0.6rem;line-height:1.4;">${escapeHtml(p.title)}</h3>
                ${p.excerpt ? `<p style="color:var(--text-secondary);font-size:0.88rem;line-height:1.6;margin-bottom:1rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${escapeHtml(p.excerpt)}</p>` : ''}
                <div style="display:flex;justify-content:space-between;color:var(--text-muted);font-size:0.8rem;padding-top:0.875rem;border-top:1px solid var(--border-color);">
                    <span>${d}</span><span style="color:var(--accent-color);font-weight:600;">${rt} min read &rarr;</span>
                </div>
            </a>`;
        }).join('');
    }

    const initPreloader = () => {
        const bar = document.getElementById('page-progress');
        if (!bar) return;
        
        // Start preloader movement
        bar.style.width = '30%';
        
        setTimeout(() => {
            if (bar.style.width === '30%') {
                bar.style.width = '60%';
            }
        }, 150);

        fetch('/api/portfolio-data')
            .then(res => {
                if (!res.ok) throw new Error('Data fetch failed');
                return res.json();
            })
            .then(data => {
                bar.style.width = '100%';
                
                // Hydrate HTML
                renderProjects(data.projects);
                renderSkills(data.skillsByCategory);
                renderBlog(data.recentPosts);

                // Observe newly added elements for fade-in scroll animation
                setTimeout(() => {
                    const dynamicElements = document.querySelectorAll('#projects-container .project-card, #skills-container .skill-category, #blog-posts-container > a');
                    dynamicElements.forEach(el => {
                        el.classList.add('fade-in');
                        window.fadeObserver.observe(el);
                    });
                }, 50);

                // Fade out progress preloader
                setTimeout(() => {
                    bar.style.opacity = '0';
                    setTimeout(() => {
                        bar.style.display = 'none';
                    }, 400);
                }, 300);
            })
            .catch(err => {
                console.error('Error hydrating page:', err);
                bar.style.width = '100%';
                setTimeout(() => {
                    bar.style.opacity = '0';
                    setTimeout(() => {
                        bar.style.display = 'none';
                    }, 400);
                }, 300);

                // Graceful fallback
                const pContainer = document.getElementById('projects-container');
                if (pContainer) {
                    pContainer.innerHTML = `<p style="color:#ef4444;text-align:center;grid-column: 1 / -1;padding:2rem;">Failed to load projects. Please reload the page.</p>`;
                }
            });
    };

    // Hydrate data and manage preloader
    initPreloader();

});
