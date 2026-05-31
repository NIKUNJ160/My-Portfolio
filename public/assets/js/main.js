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

    // Observe Sections and Cards
    const animatedElements = document.querySelectorAll('.section, .project-card, .service-card, .skill-category, .hero-section');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

});
