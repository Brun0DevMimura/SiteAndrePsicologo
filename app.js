// Optimized and Robust Site Logic v2.1
(function() {
    // 1. Critical Preloader (already in HTML fallback, but here for double safety)
    const hidePreloader = () => {
        const preloader = document.getElementById('preloader');
        if (preloader && !preloader.classList.contains('loaded')) {
            preloader.classList.add('loaded');
            initAll();
        }
    };
    window.addEventListener('load', () => setTimeout(hidePreloader, 1000));
    setTimeout(hidePreloader, 5000);

    function initAll() {
        safeRun(initKineticTypography);
        safeRun(initScrollEffects);
        safeRun(initAutoScrollSpecialists);
        safeRun(initLightbox);
        safeRun(initIntersectionObservers);
    }

    function safeRun(fn) {
        try { fn(); } catch(e) { console.error('Site Error:', e); }
    }

    // --- Kinetic Typography ---
    function initKineticTypography() {
        const title = document.querySelector('.hero-title');
        if (!title) return;
        const nodes = Array.from(title.childNodes);
        title.innerHTML = '';
        nodes.forEach(node => {
            if (node.nodeName === 'BR') { title.appendChild(document.createElement('br')); return; }
            const text = node.textContent.trim();
            if (!text) return;
            text.split(/\s+/).forEach((word, wordIndex) => {
                const span = document.createElement('span');
                span.className = 'word-span';
                if (node.nodeType === 1 && node.classList.contains('highlight') || word.toLowerCase().includes('estruturamente')) span.classList.add('highlight');
                [...word].forEach((char, charIndex) => {
                    const cSpan = document.createElement('span');
                    cSpan.textContent = char;
                    cSpan.className = 'char';
                    cSpan.style.transitionDelay = `${(wordIndex * 0.1) + (charIndex * 0.03)}s`;
                    span.appendChild(cSpan);
                });
                title.appendChild(span);
                title.appendChild(document.createTextNode(' '));
            });
        });
    }

    // --- Scroll Effects ---
    function initScrollEffects() {
        const navbar = document.querySelector('.navbar');
        const scrollProgress = document.getElementById('scrollProgress');
        const bgParallax = document.querySelector('.bg-parallax');
        const heroContent = document.querySelector('.hero-content');

        window.addEventListener('scroll', () => {
            const scroll = window.pageYOffset;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            
            if (scrollProgress && height > 0) scrollProgress.style.width = `${(scroll / height) * 100}%`;
            if (navbar) scroll > 50 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled');
            if (bgParallax) bgParallax.style.transform = `scale(${1 + (scroll / 5000)})`;
            if (heroContent) {
                heroContent.style.transform = `translateY(${scroll * 0.3}px)`;
                heroContent.style.opacity = 1 - (scroll / 800);
            }
            if (height > 0) {
                document.documentElement.style.setProperty('--logo-rotate', `${(scroll / height) * 720}deg`);
            }
        });
    }

    // --- Intersection Observers (Animations & Typewriter) ---
    function initIntersectionObservers() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    // Check if it's a typewriter
                    if (entry.target.classList.contains('typewriter') && !entry.target.classList.contains('typed')) {
                        runTypewriter(entry.target);
                    }
                } else {
                    // Cyclic animations
                    entry.target.classList.remove('appear');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in, .gallery-item, .hero-title, .typewriter').forEach(el => observer.observe(el));
    }

    function runTypewriter(el) {
        const text = el.getAttribute('data-text');
        if (!text) return;
        el.classList.add('typed');
        let i = 0;
        el.innerHTML = '';
        function type() {
            if (i < text.length) {
                el.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 60);
            }
        }
        type();
    }

    // --- Auto Scroll Specialists ---
    function initAutoScrollSpecialists() {
        const slider = document.querySelector('.specialists-slider');
        if (!slider) return;
        let hovering = false;
        slider.onmouseenter = () => hovering = true;
        slider.onmouseleave = () => hovering = false;
        setInterval(() => {
            if (hovering) return;
            const card = slider.querySelector('.specialist-card');
            if (!card) return;
            if (slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth - 10)) slider.scrollTo({left: 0, behavior: 'smooth'});
            else slider.scrollBy({left: card.offsetWidth + 16, behavior: 'smooth'});
        }, 4000);
    }

    // --- Lightbox ---
    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;
        const img = document.getElementById('lightboxImg');
        const cap = document.getElementById('lightboxCaption');
        const items = document.querySelectorAll('.gallery-item');
        let current = 0;
        const data = Array.from(items).map(i => ({ src: i.querySelector('img').src, txt: i.querySelector('span').textContent }));

        const show = (idx) => {
            if (idx < 0) idx = data.length - 1;
            if (idx >= data.length) idx = 0;
            current = idx;
            img.src = data[current].src;
            cap.textContent = data[current].txt;
        };

        items.forEach((it, idx) => it.onclick = () => {
            show(idx);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const close = () => { lightbox.classList.remove('active'); document.body.style.overflow = ''; };
        document.querySelector('.lightbox-close').onclick = close;
        document.querySelector('.lightbox-prev').onclick = (e) => { e.stopPropagation(); show(current - 1); };
        document.querySelector('.lightbox-next').onclick = (e) => { e.stopPropagation(); show(current + 1); };
        lightbox.onclick = (e) => { if (e.target === lightbox) close(); };
        document.onkeydown = (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') show(current - 1);
            if (e.key === 'ArrowRight') show(current + 1);
        };
    }
})();
