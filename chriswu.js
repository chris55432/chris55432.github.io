// ============================================
// NAVBAR TOGGLE FUNCTIONALITY
// ============================================
(function() {
    'use strict';
    
    function initNavbar() {
        const toggle = document.querySelector('.navbar-toggle');
        const links = document.querySelector('.navbar-links');
        const navbarLinks = document.querySelectorAll('.navbar-links a');
        
        if (!toggle || !links) return;
        
        function closeMenu() {
            links.classList.remove('active');
            toggle.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
        }
        
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            links.classList.toggle('active');
            toggle.classList.toggle('active');
            const isOpen = links.classList.contains('active');
            document.body.classList.toggle('menu-open', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        
        navbarLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && links.classList.contains('active')) {
                closeMenu();
            }
        });
        
        document.addEventListener('click', function(e) {
            if (links.classList.contains('active')) {
                if (!toggle.contains(e.target) && !links.contains(e.target)) {
                    closeMenu();
                }
            }
        });
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 900 && links.classList.contains('active')) {
                closeMenu();
            }
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }
})();

// ============================================
// PROJECT SWITCHING
// ============================================
(function() {
    'use strict';
    
    function initProjectSwitching() {
        function folderImages(folder, prefix, captions) {
            return captions.map((caption, i) => ({
                src: folder + '/' + prefix + (i + 1) + '.webp',
                caption: caption
            }));
        }
        
        const projects = {
            midknight: {
                desktop: [
                    { src: 'desktop/images/midKnight/midknight1.webp', caption: 'Identity System' },
                    { src: 'desktop/images/midKnight/midknight2.webp', caption: 'Editorial Portraits' },
                    { src: 'desktop/images/midKnight/midknight2.3.webp', caption: 'Editorial campaign 01' },
                    { src: 'desktop/images/midKnight/midknight2.4.webp', caption: 'Editorial campaign 02' },
                    { src: 'desktop/images/midKnight/midknight2.5.webp', caption: 'Editorial campaign 03' },
                    {
                        stack: [
                            'desktop/images/midKnight/midknight3.2.webp',
                            'desktop/images/midKnight/midknight3.3.webp',
                            'desktop/images/midKnight/midknight3.4.webp'
                        ],
                        caption: 'Community and social media'
                    }
                ],
                mobile: [
                    {
                        stack: [
                            'mobile/images/midknight/midknight1.1.webp',
                            'mobile/images/midknight/midknight1.2.webp'
                        ],
                        caption: 'Visual Identity'
                    },
                    {
                        stack: [
                            'mobile/images/midknight/midknight2.1.webp',
                            'mobile/images/midknight/midknight2.2.webp'
                        ],
                        caption: 'Lookbook campaign 01'
                    },
                    {
                        stack: [
                            'mobile/images/midknight/midknight3.1.webp'
                        ],
                        caption: 'Editorial campaign'
                    },
                    {
                        stack: [
                            'mobile/images/midknight/midknight4.1.webp',
                            'mobile/images/midknight/midknight4.2.webp'
                        ],
                        caption: 'Community and social media'
                    },
                    {
                        stack: [
                            'mobile/images/midknight/midknight5.1.webp',
                            'mobile/images/midknight/midknight5.2.webp',
                            'mobile/images/midknight/midknight5.3.webp'
                        ],
                        caption: 'Look book campaign 02'
                    }
                ]
            },
            weitang: {
                desktop: [
                    {
                        stack: [
                            'desktop/images/weitang/weitang1.1.webp'
                        ],
                        caption: 'Identity System and logo wordmarks'
                    },
                    {
                        stack: [
                            'desktop/images/weitang/weitang1.2.webp'
                        ],
                        caption: 'Piazza Mascot'
                    },
                    {
                        stack: [
                            'desktop/images/weitang/weitang2.1.webp',
                            'desktop/images/weitang/weitang2.2.webp'
                        ],
                        caption: 'Menu and packaging'
                    },
                    {
                        stack: [
                            'desktop/images/weitang/weitang3.1.webp',
                            'desktop/images/weitang/weitang3.2.webp'
                        ],
                        caption: 'Advertisement campaign photoshoot'
                    },
                    {
                        stack: [
                            'desktop/images/weitang/weitang4.1.webp',
                            'desktop/images/weitang/weitang4.2.webp',
                            'desktop/images/weitang/weitang4.3.webp',
                            'desktop/images/weitang/weitang4.4.webp'
                        ],
                        caption: 'Pizzeria Pop-up'
                    }
                ],
                mobile: [
                    {
                        stack: [
                            'mobile/images/weitang/weitang1.1.webp',
                            'mobile/images/weitang/weitang1.2.webp',
                            'mobile/images/weitang/weitang1.3.webp',
                            'mobile/images/weitang/weitang1.4.webp',
                            'mobile/images/weitang/weitang1.5.webp'
                        ],
                        caption: 'Identity System'
                    },
                    {
                        stack: [
                            'mobile/images/weitang/weitang2.1.webp',
                            'mobile/images/weitang/weitang2.2.webp',
                            'mobile/images/weitang/weitang2.3.webp'
                        ],
                        caption: 'Menu and packaging'
                    },
                    {
                        stack: [
                            'mobile/images/weitang/weitang3.1.webp',
                            'mobile/images/weitang/weitang3.2.webp',
                            'mobile/images/weitang/weitang3.3.webp',
                            'mobile/images/weitang/weitang3.4.webp'
                        ],
                        caption: 'Advertisement campaign photoshoot'
                    },
                    {
                        stack: [
                            'mobile/images/weitang/weitang4.1.webp',
                            'mobile/images/weitang/weitang4.2.webp',
                            'mobile/images/weitang/weitang4.3.webp',
                            'mobile/images/weitang/weitang4.4.webp'
                        ],
                        caption: 'Pizzeria Pop-up'
                    }
                ]
            },
            dogeast: {
                desktop: [
                    { src: 'desktop/images/dogeast/dogeast1.1.webp', caption: 'Logo icon/wordmark' },
                    { src: 'desktop/images/dogeast/dogeast1.2.webp', caption: 'Identity/lettering system' },
                    { src: 'desktop/images/dogeast/dogeast1.3.webp', caption: 'Monthly playlist cover for Spotify' },
                    { src: 'desktop/images/dogeast/dogeast1.4.webp', caption: 'Stickers' },
                    { src: 'desktop/images/dogeast/dogeast1.5.webp', caption: 'Visual system' },
                    {
                        stack: [
                            'desktop/images/dogeast/dogeast2.1.webp',
                            'desktop/images/dogeast/dogeast2.2.webp',
                            'desktop/images/dogeast/dogeast2.3.webp'
                        ],
                        caption: '2023 winter drop campaign'
                    },
                    {
                        stack: [
                            'desktop/images/dogeast/dogeast3.1.webp',
                            'desktop/images/dogeast/dogeast3.2.webp',
                            'desktop/images/dogeast/dogeast3.3.webp',
                            'desktop/images/dogeast/dogeast3.1.webp',
                            'desktop/images/dogeast/dogeast3.4.webp',
                            'desktop/images/dogeast/dogeast3.5.webp'
                        ],
                        caption: '2024 summer drop campaign'
                    },
                    {
                        stack: [
                            'desktop/images/dogeast/dogeast4.1.webp',
                            'desktop/images/dogeast/dogeast4.2.webp',
                            'desktop/images/dogeast/dogeast4.3.webp',
                            'desktop/images/dogeast/dogeast4.4.webp'
                        ],
                        caption: '2025 summer drop campaign'
                    }
                ],
                mobile: [
                    {
                        stack: [
                            'mobile/images/dogeast/dogeast1.1.webp',
                            'mobile/images/dogeast/dogeast1.2.webp',
                            'mobile/images/dogeast/dogeast1.3.webp'
                        ],
                        caption: 'Identity/lettering system'
                    },
                    {
                        stack: [
                            'mobile/images/dogeast/dogeast2.1.webp',
                            'mobile/images/dogeast/dogeast2.2.webp'
                        ],
                        caption: 'Monthly playlist cover for Spotify'
                    },
                    {
                        stack: [
                            'mobile/images/dogeast/dogeast3.1.webp',
                            'mobile/images/dogeast/dogeast3.2.webp',
                            'mobile/images/dogeast/dogeast3.3.webp',
                            'mobile/images/dogeast/dogeast3.4.webp'
                        ],
                        caption: '2023 winter drop campaign'
                    },
                    {
                        stack: [
                            'mobile/images/dogeast/dogeast4.1.webp',
                            'mobile/images/dogeast/dogeast4.2.webp',
                            'mobile/images/dogeast/dogeast4.3.webp',
                            'mobile/images/dogeast/dogeast4.4.webp'
                        ],
                        caption: '2024 summer drop campaign'
                    },
                    {
                        stack: [
                            'mobile/images/dogeast/dogeast5.1.webp',
                            'mobile/images/dogeast/dogeast5.2.webp',
                            'mobile/images/dogeast/dogeast5.3.webp',
                            'mobile/images/dogeast/dogeast5.4.webp',
                            'mobile/images/dogeast/dogeast5.5.webp',
                            'mobile/images/dogeast/dogeast5.6.webp'
                        ],
                        caption: '2025 summer drop campaign'
                    },
                    {
                        stack: [
                            'mobile/images/dogeast/dogeast6.1.webp',
                            'mobile/images/dogeast/dogeast6.2.webp',
                            'mobile/images/dogeast/dogeast6.3.webp'
                        ],
                        caption: 'Spray paint on wooden panel'
                    }
                ]
            }
        };
        
        const mobileQuery = window.matchMedia('(max-width: 900px)');
        let currentProjectName = null;
        
        function getProjectImages(project) {
            return mobileQuery.matches ? project.mobile : project.desktop;
        }
        
        function renderGallery(projectName) {
            const project = projects[projectName];
            const gallery = document.querySelector('.project-gallery');
            if (!project || !gallery) return;
            
            gallery.innerHTML = '';
            getProjectImages(project).forEach((item, itemIndex) => {
                const figure = document.createElement('figure');
                figure.className = 'gallery-item';
                
                const caption = document.createElement('figcaption');
                caption.textContent = item.caption;

                figure.appendChild(caption);

                if (Array.isArray(item.stack) && item.stack.length > 0) {
                    const stack = document.createElement('div');
                    stack.className = 'gallery-stack';

                    item.stack.forEach((stackSrc, stackIndex) => {
                        const stackedImg = document.createElement('img');
                        stackedImg.src = stackSrc;
                        stackedImg.alt = `${item.caption} ${stackIndex + 1}`;
                        stackedImg.decoding = 'async';
                        stackedImg.loading = itemIndex === 0 && stackIndex === 0 ? 'eager' : 'lazy';
                        stackedImg.fetchPriority = itemIndex === 0 && stackIndex === 0 ? 'high' : 'auto';
                        stackedImg.onerror = function() {
                            console.warn('Failed to load image:', stackSrc);
                            this.style.display = 'none';
                        };
                        stack.appendChild(stackedImg);
                    });

                    figure.appendChild(stack);
                } else {
                    const img = document.createElement('img');
                    img.src = item.src;
                    img.alt = item.caption;
                    img.decoding = 'async';
                    img.loading = itemIndex === 0 ? 'eager' : 'lazy';
                    img.fetchPriority = itemIndex === 0 ? 'high' : 'auto';
                    img.onerror = function() {
                        console.warn('Failed to load image:', item.src);
                        figure.style.display = 'none';
                    };
                    figure.appendChild(img);
                }

                gallery.appendChild(figure);
            });
            
            const scroller = document.querySelector('.column-top');
            if (scroller) scroller.scrollTop = 0;
        }
        
        function switchProject(projectName) {
            if (!projects[projectName]) return;
            
            currentProjectName = projectName;
            renderGallery(projectName);
            
            if (mobileQuery.matches) {
                window.scrollTo(0, 0);
            }
            
            document.querySelectorAll('.project-content').forEach(content => {
                content.classList.toggle('active', content.dataset.project === projectName);
            });
            
            document.querySelectorAll('.right-column-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.project === projectName);
            });
        }
        
        const params = new URLSearchParams(window.location.search);
        const projectFromUrl = params.get('project');
        const activeProjectBtn = document.querySelector('.right-column-btn.active');
        const gallery = document.querySelector('.project-gallery');
        
        if (projectFromUrl && projects[projectFromUrl]) {
            switchProject(projectFromUrl);
        } else if (activeProjectBtn && activeProjectBtn.dataset.project) {
            switchProject(activeProjectBtn.dataset.project);
        }
        
        document.querySelectorAll('.right-column-btn').forEach(link => {
            link.addEventListener('click', function(e) {
                if (!this.dataset.project || !gallery) return;
                e.preventDefault();
                e.stopPropagation();
                switchProject(this.dataset.project);
            });
        });
        
        const onViewportChange = function() {
            if (currentProjectName && projects[currentProjectName]) {
                renderGallery(currentProjectName);
            }
        };
        
        if (typeof mobileQuery.addEventListener === 'function') {
            mobileQuery.addEventListener('change', onViewportChange);
        } else if (typeof mobileQuery.addListener === 'function') {
            mobileQuery.addListener(onViewportChange);
        }
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
    const mobileQuery = window.matchMedia('(max-width: 900px)');
    
    function getEnlargeableImage(target) {
        const homeImg = target.closest('.gallery img');
        if (homeImg) return homeImg;
        if (mobileQuery.matches) {
            return target.closest('.project-gallery img');
        }
        return null;
    }
    
    // Track touch start for gallery images
    document.addEventListener('touchstart', function(e) {
        const galleryImg = getEnlargeableImage(e.target);
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
        
        const galleryImg = getEnlargeableImage(e.target);
        if (galleryImg) {
            e.preventDefault();
            e.stopPropagation();
            openModal(galleryImg);
            return false;
        }
    }, true); // Use capture phase
    
    // Touch support for mobile - gallery images
    document.addEventListener('touchend', function(e) {
        const galleryImg = getEnlargeableImage(e.target);
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

// ============================================
// GALLERY SHUFFLE
// ============================================
(function() {
    'use strict';
    
    const POSTER_VERSION = '20260821b';
    const POSTER_COUNT = 45;
    const ABOVE_FOLD = 8;
    const posterImages = Array.from({ length: POSTER_COUNT }, (_, i) =>
        `images/poster/Poster-${i + 1}.webp?v=${POSTER_VERSION}`
    );
    
    function shuffleGallery() {
        const gallery = document.querySelector('.gallery');
        if (!gallery) return;
        
        const order = posterImages.map((_, i) => i);
        for (let i = order.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [order[i], order[j]] = [order[j], order[i]];
        }
        
        gallery.innerHTML = '';
        order.forEach((posterIndex, displayIndex) => {
            const img = document.createElement('img');
            img.src = posterImages[posterIndex];
            img.alt = `Poster ${posterIndex + 1}`;
            img.decoding = 'async';
            if (displayIndex < ABOVE_FOLD) {
                img.loading = 'eager';
                img.fetchPriority = 'high';
            } else {
                img.loading = 'lazy';
                img.fetchPriority = 'low';
            }
            gallery.appendChild(img);
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', shuffleGallery);
    } else {
        shuffleGallery();
    }
})();
