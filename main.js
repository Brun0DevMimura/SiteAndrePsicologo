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
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function initAnimations() {
    const elements = document.querySelectorAll('.fade-in, .gallery-item, .hero-title');
    elements.forEach(el => observer.observe(el));

    // Fallback: If after 3 seconds some elements aren't visible, show them
    setTimeout(() => {
        document.querySelectorAll('.fade-in, .gallery-item, .hero-title').forEach(el => {
            el.classList.add('appear');
        });
    }, 3000);
}

// Scroll Handling
const navbar = document.querySelector('.navbar');
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

// Initial Run
document.addEventListener('DOMContentLoaded', () => {
    initKineticTypography();
    initAnimations();
});

// Last Resort: ensure things show up
window.onload = () => {
    document.querySelectorAll('.fade-in, .gallery-item, .hero-title').forEach(el => el.classList.add('appear'));
};
