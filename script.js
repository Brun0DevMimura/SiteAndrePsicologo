// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileLinks = mobileMenu.querySelectorAll('a');

function openMobileMenu() {
    hamburger.classList.add('active');
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

mobileOverlay.addEventListener('click', closeMobileMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// FAQ Toggle
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
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
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Lógica do Carrossel Hero
const carouselItems = document.querySelectorAll('.carousel-item');
let currentImageIndex = 0;

function rotateCarousel() {
    if (carouselItems.length <= 1) return;
    carouselItems[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % carouselItems.length;
    carouselItems[currentImageIndex].classList.add('active');
}

setInterval(rotateCarousel, 4000); // Troca a imagem a cada 4 segundos

// Lógica do Modal de Especialistas
const specialistCards = document.querySelectorAll('.specialist-card');
const modalOverlay = document.getElementById('specialistModalOverlay');
const modalContent = document.getElementById('specialistModalContent');

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

specialistCards.forEach(card => {
    card.addEventListener('click', () => {
        const photo = card.dataset.photo;
        const name = card.dataset.name;
        const title = card.dataset.title;
        const crp = card.dataset.crp;
        const bio = card.dataset.bio.trim();
        const instagram = card.dataset.instagram;

        modalContent.innerHTML = `
      <button class="modal-close-btn" id="modalCloseBtn">&times;</button>
      <div class="modal-header">
        <img src="${photo}" alt="Foto de ${name}" class="modal-photo">
        <div class="modal-title-group">
          <h3>${name}</h3>
          <div class="specialist-title">${title}</div>
          <div class="specialist-crp">${crp}</div>
          ${instagram ? `
            <a href="${instagram}" target="_blank" rel="noopener noreferrer" class="modal-instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Instagram
            </a>` : ''}
        </div>
      </div>
      <div class="modal-body">
        <p>${bio.replace(/\n/g, '</p><p>')}</p>
      </div>
      <a href="#contato" class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: var(--spacing-lg);">
        Agendar com ${name.split(' ')[0]}
      </a>
    `;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
        modalContent.querySelector('.btn-primary').addEventListener('click', closeModal);
    });
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Lógica do Carrossel Lightbox (Espaço)
const galleryImgs = document.querySelectorAll('.space-gallery img');
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.getElementById('closeLightbox');
const prevBtn = document.getElementById('prevImage');
const nextBtn = document.getElementById('nextImage');
const currentNum = document.getElementById('currentImageNum');
const totalNum = document.getElementById('totalImagesNum');

let currentGalleryIndex = 0;
const imagesList = Array.from(galleryImgs).map(img => ({
    src: img.src,
    alt: img.alt
}));

totalNum.textContent = imagesList.length;

function openLightbox(index) {
    currentGalleryIndex = index;
    updateLightbox();
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateLightbox() {
    const imgData = imagesList[currentGalleryIndex];
    lightboxImage.style.opacity = '0';

    setTimeout(() => {
        lightboxImage.src = imgData.src;
        lightboxImage.alt = imgData.alt;
        lightboxImage.style.opacity = '1';
        currentNum.textContent = currentGalleryIndex + 1;
    }, 100);
}

function nextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % imagesList.length;
    updateLightbox();
}

function prevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + imagesList.length) % imagesList.length;
    updateLightbox();
}

galleryImgs.forEach((img, index) => {
    img.parentElement.style.cursor = 'pointer';
    img.parentElement.addEventListener('click', () => {
        openLightbox(index);
    });
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nextImage();
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    prevImage();
});

closeLightbox.addEventListener('click', () => {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
});

lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Teclado para navegação
document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;

    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});
// WhatsApp Scroll Visibility
const whatsappFloat = document.getElementById('whatsappFloat');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollPosition / totalHeight) * 100;

    if (scrollPercentage >= 50) {
        whatsappFloat.classList.add('visible');
    } else {
        whatsappFloat.classList.remove('visible');
    }
});
