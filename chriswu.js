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
    
    let lastTouchTime = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isSlideshowTouch = false;
    
    // Handle touch start to track swipe gestures
    document.addEventListener('touchstart', function(e) {
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (slideshowContainer && slideshowContainer.contains(e.target)) {
            // Don't interfere with gallery images
            if (e.target.closest('.gallery img')) return;
            
            // Don't track if clicking on nav buttons
            if (e.target.closest('.slide-nav')) return;
            
            isSlideshowTouch = true;
            const touch = e.touches && e.touches[0];
            if (touch) {
                touchStartX = touch.clientX;
                touchStartY = touch.clientY;
                touchStartTime = Date.now();
            }
        } else {
            isSlideshowTouch = false;
        }
    }, { passive: true });
    
    // Use event delegation on document for reliability - desktop clicks
    document.addEventListener('click', function(e) {
        // Skip if this was a touch event (mobile)
        const timeSinceTouch = Date.now() - lastTouchTime;
        if (timeSinceTouch < 300) return; // Ignore click if touch happened recently
        
        // Don't interfere with gallery images
        if (e.target.closest('.gallery img')) return;
        
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (!slideshowContainer || !slideshowContainer.contains(e.target)) return;
        
        // Don't navigate if clicking on nav buttons
        if (e.target.closest('.slide-nav')) return;
        
        const rect = slideshowContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (rect.width > 0) {
            navigateSlide(x < rect.width / 2 ? -1 : 1);
        }
    });
    
    // Touch support for mobile - swipe gestures
    document.addEventListener('touchend', function(e) {
        // Don't interfere with gallery images
        if (e.target.closest('.gallery img')) return;
        
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (!slideshowContainer || !slideshowContainer.contains(e.target)) return;
        
        // Don't navigate if clicking on nav buttons
        if (e.target.closest('.slide-nav')) return;
        
        if (!isSlideshowTouch) return;
        
        const touch = e.changedTouches && e.changedTouches[0];
        if (!touch) return;
        
        const deltaX = touch.clientX - touchStartX;
        const deltaY = Math.abs(touch.clientY - touchStartY);
        const deltaTime = Date.now() - touchStartTime;
        const absDeltaX = Math.abs(deltaX);
        
        // Determine if it's a swipe or tap
        const isSwipe = absDeltaX > 30 && absDeltaX > deltaY && deltaTime < 500;
        const isTap = absDeltaX < 10 && deltaY < 10;
        
        if (isSwipe) {
            // Swipe detected - navigate based on direction
            e.preventDefault();
            lastTouchTime = Date.now();
            
            if (deltaX > 0) {
                // Swipe right = previous slide
                navigateSlide(-1);
            } else {
                // Swipe left = next slide
                navigateSlide(1);
            }
        } else if (isTap) {
            // Tap detected - navigate based on tap position
            e.preventDefault();
            lastTouchTime = Date.now();
            
            const rect = slideshowContainer.getBoundingClientRect();
            if (rect.width > 0) {
                const x = touch.clientX - rect.left;
                navigateSlide(x < rect.width / 2 ? -1 : 1);
            }
        }
        
        isSlideshowTouch = false;
    }, { passive: false });
    
    function initSlideshow() {
        const slideshowContainer = document.querySelector('.slideshow-container');
        const navLeft = document.querySelector('.slide-nav-left');
        const navRight = document.querySelector('.slide-nav-right');
        
        if (!slideshowContainer) return;
        
        // Reset current slide
        currentSlide = 0;
        
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
        
        slideshowContainer.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            this.style.cursor = x < rect.width / 2 ? leftArrowCursor : rightArrowCursor;
        });
        
        slideshowContainer.addEventListener('mouseleave', function() {
            this.style.cursor = '';
        });
        
        // Initialize first slide
        const slides = slideshowContainer.querySelectorAll('.slide');
        if (slides.length > 0) {
            showSlide(0);
        }
    }
    
    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSlideshow);
    } else {
        initSlideshow();
    }
    
    // Expose reinit function for project switching
    window.reinitSlideshow = function() {
        currentSlide = 0;
        initSlideshow();
    };
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
                // Reinitialize slideshow handlers
                if (window.reinitSlideshow) {
                    window.reinitSlideshow();
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
    
    let modal, modalImg, modalClose, modalBackdrop;
    
    function initModal() {
        modal = document.getElementById('image-modal');
        modalImg = document.getElementById('modal-img');
        modalClose = document.getElementById('modal-close');
        modalBackdrop = document.querySelector('.modal-backdrop');
        
        if (!modal || !modalImg) {
            // Retry if modal doesn't exist yet
            setTimeout(initModal, 100);
            return;
        }
        
        if (modalClose) {
            modalClose.addEventListener('click', function(e) {
                e.stopPropagation();
                closeModal();
            });
            modalClose.addEventListener('touchend', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeModal();
            }, { passive: false });
        }
        
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', function(e) {
                e.stopPropagation();
                closeModal();
            });
            modalBackdrop.addEventListener('touchend', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeModal();
            }, { passive: false });
        }
        
        window.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
    
    function openModal(img) {
        if (!modal || !modalImg) {
            initModal();
            if (!modal || !modalImg) return;
        }
        modal.classList.add('active');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        if (modalImg) {
            modalImg.src = '';
            modalImg.alt = '';
        }
        document.body.style.overflow = '';
    }
    
    let galleryLastTouchTime = 0;
    let galleryTouchStartX = 0;
    let galleryTouchStartY = 0;
    
    // Track touch start for gallery images
    document.addEventListener('touchstart', function(e) {
        const galleryImg = e.target.closest('.gallery img');
        if (galleryImg) {
            const touch = e.touches && e.touches[0];
            if (touch) {
                galleryTouchStartX = touch.clientX;
                galleryTouchStartY = touch.clientY;
            }
        }
    }, { passive: true });
    
    // Use event delegation for gallery images - desktop clicks
    document.addEventListener('click', function(e) {
        // Skip if this was a touch event (mobile)
        const timeSinceTouch = Date.now() - galleryLastTouchTime;
        if (timeSinceTouch < 300) return; // Ignore click if touch happened recently
        
        const galleryImg = e.target.closest('.gallery img');
        if (galleryImg) {
            e.preventDefault();
            e.stopPropagation();
            openModal(galleryImg);
            return false;
        }
    }, true); // Use capture phase
    
    // Touch support for mobile - gallery images
    document.addEventListener('touchend', function(e) {
        const galleryImg = e.target.closest('.gallery img');
        if (galleryImg) {
            const touch = e.changedTouches && e.changedTouches[0];
            if (!touch) return;
            
            // Check if it's a tap (not a swipe)
            const deltaX = Math.abs(touch.clientX - galleryTouchStartX);
            const deltaY = Math.abs(touch.clientY - galleryTouchStartY);
            if (deltaX > 10 || deltaY > 10) return; // It's a swipe, not a tap
            
            e.preventDefault();
            e.stopPropagation();
            galleryLastTouchTime = Date.now();
            openModal(galleryImg);
            return false;
        }
    }, { passive: false, capture: true });
    
    // Initialize modal on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModal);
    } else {
        initModal();
    }
})();
