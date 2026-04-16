// Preloader Handler - Registered at the very top for safety
(function() {
    const handleLoading = () => {
        const preloader = document.getElementById('preloader');
        if (preloader && !preloader.classList.contains('loaded')) {
            preloader.classList.add('loaded');
            if (typeof initAnimations === 'function') initAnimations();
        }
    };

    window.addEventListener('load', () => setTimeout(handleLoading, 1200));
    setTimeout(handleLoading, 5000); // 5s Fallback
})();

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileLinks = mobileMenu.querySelectorAll('a');

function openMobileMenu() {
    if (hamburger) hamburger.classList.add('active');
    if (mobileMenu) mobileMenu.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    if (hamburger) hamburger.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
}

if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// FAQ Toggle
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

/**
 * Intersection Observer for scroll animations
 */
const observerOptions = {
    threshold: 0.01,
    rootMargin: '0px 0px -20px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
        } else {
            entry.target.classList.remove('appear');
        }
    });
}, observerOptions);

function initAnimations() {
    const elements = document.querySelectorAll('.fade-in, .gallery-item, .hero-title');
    elements.forEach(el => observer.observe(el));
}

// Scroll Handling
const navbar = document.querySelector('.navbar');
const logoImage = document.querySelector('.logo-image');
const scrollProgress = document.getElementById('scrollProgress');
const bgParallax = document.querySelector('.bg-parallax');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (currentScroll / totalHeight) * 100;
    
    if (scrollProgress) scrollProgress.style.width = `${progress}%`;
    if (navbar) {
        if (currentScroll > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }

    if (logoImage) {
        // Rotate logo based on scroll percentage (720 degrees total)
        // This ensures it returns to 0 degrees at the very bottom
        const rotation = (currentScroll / totalHeight) * 720; 
        logoImage.style.transform = `rotate(${rotation}deg)`;
    }

    if (bgParallax) {
        const scale = 1 + (currentScroll / 5000);
        bgParallax.style.transform = `scale(${scale})`;
    }

    if (heroContent) {
        heroContent.style.transform = `translateY(${currentScroll * 0.4}px)`;
        heroContent.style.opacity = 1 - (currentScroll / 700);
    }
});

// WhatsApp Visibility
const whatsappFloat = document.getElementById('whatsappFloat');
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollPosition / totalHeight) * 100;
    if (whatsappFloat) {
        if (scrollPercentage >= 50) whatsappFloat.classList.add('visible');
        else whatsappFloat.classList.remove('visible');
    }
});

/**
 * Kinetic Typography
 */
function initKineticTypography() {
    const title = document.querySelector('.hero-title');
    if (!title) return;

    const content = Array.from(title.childNodes);
    title.innerHTML = '';

    content.forEach((node) => {
        if (node.nodeName === 'BR') {
            title.appendChild(document.createElement('br'));
            return;
        }

        const text = node.textContent.trim();
        if (!text) return;

        const words = text.split(/\s+/);
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word-span';
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';
            wordSpan.style.marginRight = '0.3em';
            
            if (node.nodeType === 1 && node.classList.contains('highlight') || word.toLowerCase().includes('estruturamente')) {
                wordSpan.classList.add('highlight');
            }

            [...word].forEach((char, charIndex) => {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                charSpan.classList.add('char');
                charSpan.style.transitionDelay = `${(wordIndex * 0.1) + (charIndex * 0.03)}s`;
                wordSpan.appendChild(charSpan);
            });
            title.appendChild(wordSpan);
        });
    });
}

// Auto-scroll especialistas
function initAutoScrollSpecialists() {
    const slider = document.querySelector('.specialists-slider');
    if (!slider) return;

    let isHovering = false;

    slider.addEventListener('mouseenter', () => isHovering = true);
    slider.addEventListener('mouseleave', () => isHovering = false);
    slider.addEventListener('touchstart', () => isHovering = true);
    slider.addEventListener('touchend', () => isHovering = false);

    setInterval(() => {
        if (isHovering) return;
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        const firstCard = slider.querySelector('.specialist-card');
        if (!firstCard) return;
        const cardWidth = firstCard.offsetWidth + 16;
        if (slider.scrollLeft >= maxScroll - 10) {
            slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
    }, 4000);
}

/**
 * Lightbox Gallery
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.querySelector('img').src,
        caption: item.querySelector('.gallery-overlay span').textContent
    }));

    function showImage(index) {
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        currentIndex = index;
        
        lightboxImg.src = images[currentIndex].src;
        lightboxCaption.textContent = images[currentIndex].caption;
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            showImage(index);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex - 1);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex + 1);
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });
}

// Typewriter Effect
function initTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    const typeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.getAttribute('data-text');
                let i = 0;
                el.innerHTML = '';
                
                function type() {
                    if (i < text.length) {
                        el.innerHTML += text.charAt(i);
                        i++;
                        setTimeout(type, 100);
                    }
                }
                type();
                typeObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    typewriterElements.forEach(el => typeObserver.observe(el));
}

// Initial Run
document.addEventListener('DOMContentLoaded', () => {
    initKineticTypography();
    initAutoScrollSpecialists();
    initLightbox();
    initTypewriter();
});
