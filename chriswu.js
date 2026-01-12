// ============================================
// NAVBAR TOGGLE FUNCTIONALITY
// ============================================
(function() {
    'use strict';
    
    const toggle = document.querySelector('.navbar-toggle');
    const links = document.querySelector('.navbar-links');
    const navbarLinks = document.querySelectorAll('.navbar-links a');
    
    function closeMenu() {
        if (links) links.classList.remove('active');
        if (toggle) toggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (toggle && links) {
        toggle.addEventListener('click', function() {
            links.classList.toggle('active');
            toggle.classList.toggle('active');
            document.body.style.overflow = links.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    navbarLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && links && links.classList.contains('active')) {
            closeMenu();
        }
    });
    
    document.addEventListener('click', function(e) {
        if (links && links.classList.contains('active')) {
            if (!toggle.contains(e.target) && !links.contains(e.target)) {
                closeMenu();
            }
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900 && links && links.classList.contains('active')) {
            closeMenu();
        }
    });
})();

// ============================================
// SLIDESHOW FUNCTIONALITY
// ============================================
(function() {
    'use strict';
    
    let currentSlide = 0;
    const slideshowContainer = document.querySelector('.slideshow-container');
    const navLeft = document.querySelector('.slide-nav-left');
    const navRight = document.querySelector('.slide-nav-right');
    
    const leftArrowCursor = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M50 20 L30 40 L50 60' fill='none' stroke='%23333' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\") 40 40, auto";
    const rightArrowCursor = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M30 20 L50 40 L30 60' fill='none' stroke='%23333' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\") 40 40, auto";
    
    function showSlide(index) {
        const slides = document.querySelectorAll('.slide');
        if (slides.length === 0) return;
        
        slides.forEach(slide => slide.classList.remove('active'));
        
        if (index < 0) {
            currentSlide = slides.length - 1;
        } else if (index >= slides.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        slides[currentSlide].classList.add('active');
    }
    
    function navigateSlide(direction) {
        showSlide(currentSlide + direction);
    }
    
    if (navLeft) {
        navLeft.addEventListener('click', function(e) {
            e.stopPropagation();
            navigateSlide(-1);
        });
    }
    
    if (navRight) {
        navRight.addEventListener('click', function(e) {
            e.stopPropagation();
            navigateSlide(1);
        });
    }
    
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            this.style.cursor = x < rect.width / 2 ? leftArrowCursor : rightArrowCursor;
        });
        
        slideshowContainer.addEventListener('mouseleave', function() {
            this.style.cursor = '';
        });
        
        slideshowContainer.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            navigateSlide(e.clientX - rect.left < rect.width / 2 ? -1 : 1);
        });
    }
    
    // Initialize first slide
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        showSlide(0);
    }
})();

// ============================================
// PROJECT SWITCHING
// ============================================
(function() {
    'use strict';
    
    function initProjectSwitching() {
        const projects = {
        frnd: {
            images: [
                'images/FRND/FRND-1.jpg',
                'images/FRND/FRND-2.jpg',
                'images/FRND/FRND-3.jpg',
                'images/FRND/FRND-4.jpg',
                'images/FRND/FRND-5.jpg',
                'images/FRND/FRND-wt1.jpg',
                'images/FRND/FRND-wt2.jpg',
                'images/FRND/FRND-wt3.jpg',
                'images/FRND/FRND-wt4.jpg',
                'images/FRND/FRND-wt5.jpg',
                'images/FRND/FRND-wt6.jpg',
                'images/FRND/FRND-wt7.jpg',
                'images/FRND/FRND-wt8.jpg',
                'images/FRND/FRND-wt9.jpg',
                'images/FRND/FRND-wt10.jpg',
                'images/FRND/FRND-ls1.jpg',
                'images/FRND/FRND-ls2.jpg',
                'images/FRND/FRND-ls3.jpg',
                'images/FRND/FRND-ls4.jpg',
                'images/FRND/FRND-ls5.jpg',
                'images/FRND/FRND-ls6.jpg',
                'images/FRND/FRND-ls7.jpg',
                'images/FRND/FRND-ls8.jpg',
                'images/FRND/FRND-ls9.jpg'
            ]
        },
        mouggan: {
            images: [
                'images/MOUGGAN/mouggan-ads1.jpg',
                'images/MOUGGAN/mouggan-ads2.jpg',
                'images/MOUGGAN/mouggan-banner1.jpg',
                'images/MOUGGAN/mouggan-banner2.jpg',
                'images/MOUGGAN/mouggan-banner3.jpg',
                'images/MOUGGAN/mouggan-banner4.jpg',
                'images/MOUGGAN/mouggan-banner5.jpg',
                'images/MOUGGAN/mouggan-banner6.jpg',
                'images/MOUGGAN/mouggan-web1.jpg',
                'images/MOUGGAN/mouggan-web2.jpg',
                'images/MOUGGAN/mouggan-web3.jpg',
                'images/MOUGGAN/mouggan-web4.jpg',
                'images/MOUGGAN/mouggan-web5.jpg'
            ]
        },
        dogeast: {
            images: [
                'images/DOGEAST/DG_DROP1-1.jpg',
                'images/DOGEAST/DG_DROP1-2.jpg',
                'images/DOGEAST/DG_DROP1-3.jpg',
                'images/DOGEAST/DG_DROP1-4.jpg',
                'images/DOGEAST/DG_DROP1-5.jpg',
                'images/DOGEAST/DG_DROP1-6.jpg',
                'images/DOGEAST/DG_DROP1-7.jpg',
                'images/DOGEAST/DG_DROP1-8.jpg',
                'images/DOGEAST/DG_DROP1-9.jpg',
                'images/DOGEAST/DG_DROP2-1.png',
                'images/DOGEAST/DG_DROP2-2.png',
                'images/DOGEAST/DG_DROP2-3.jpg',
                'images/DOGEAST/DG_DROP2-4.jpg',
                'images/DOGEAST/DG_DROP2-5.jpg',
                'images/DOGEAST/DG_DROP2-6.jpg',
                'images/DOGEAST/DG_DROP2-7.jpg',
                'images/DOGEAST/DG_DROP2-8.jpg',
                'images/DOGEAST/DG_DROP3-1.jpg',
                'images/DOGEAST/DG_DROP3-2.jpg',
                'images/DOGEAST/DG_DROP3-3.jpg',
                'images/DOGEAST/DG_DROP3-4.jpg',
                'images/DOGEAST/DG_DROP3-5.jpg',
                'images/DOGEAST/DG_DROP3-6.jpg',
                'images/DOGEAST/DG_DROP3-7.jpg',
                'images/DOGEAST/DG_DROP3-8.jpg',
                'images/DOGEAST/DG_DROP3-9.jpg',
                'images/DOGEAST/DG_DROP4-1.jpg',
                'images/DOGEAST/DG_DROP4-2.jpg',
                'images/DOGEAST/DG_DROP4-3.jpg'
            ]
        }
    };
    
    function switchProject(projectName) {
        const project = projects[projectName];
        if (!project) return;
        
        const slideshowWrapper = document.querySelector('.slideshow-wrapper');
        if (slideshowWrapper) {
            slideshowWrapper.innerHTML = '';
            project.images.forEach((imageSrc, index) => {
                const img = document.createElement('img');
                img.src = imageSrc;
                img.alt = `Slide ${index + 1}`;
                img.className = 'slide';
                img.onerror = function() {
                    console.warn('Failed to load image:', imageSrc);
                    this.style.display = 'none';
                };
                img.onload = function() {
                    this.style.display = '';
                };
                if (index === 0) {
                    img.classList.add('active');
                }
                slideshowWrapper.appendChild(img);
            });
            
            setTimeout(() => {
                const slides = document.querySelectorAll('.slide');
                if (slides.length > 0) {
                    slides.forEach(slide => slide.classList.remove('active'));
                    slides[0].classList.add('active');
                }
            }, 100);
        }
        
        document.querySelectorAll('.project-content').forEach(content => {
            content.classList.toggle('active', content.dataset.project === projectName);
        });
        
        document.querySelectorAll('.right-column-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.project === projectName);
        });
    }
    
        const activeProjectBtn = document.querySelector('.right-column-btn.active');
        if (activeProjectBtn && activeProjectBtn.dataset.project) {
            switchProject(activeProjectBtn.dataset.project);
        }
        
        document.querySelectorAll('.right-column-btn').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (this.dataset.project) {
                    switchProject(this.dataset.project);
                }
            });
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProjectSwitching);
    } else {
        initProjectSwitching();
    }
})();

// ============================================
// IMAGE MODAL FUNCTIONALITY
// ============================================
(function() {
    'use strict';
    
    const galleryImages = document.querySelectorAll('.gallery img');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalClose = document.getElementById('modal-close');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    
    if (!modal || !modalImg) return;
    
    function openModal(img) {
        modal.classList.add('active');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        modalImg.src = '';
        modalImg.alt = '';
        document.body.style.overflow = '';
    }
    
    galleryImages.forEach(img => {
        img.addEventListener('click', () => openModal(img));
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }
    
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
})();
