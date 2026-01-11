// Enhanced Hamburger Menu Behavior
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.navbar-toggle');
    const links = document.querySelector('.navbar-links');
    const navbarLinks = document.querySelectorAll('.navbar-links a');

    // Toggle menu on hamburger click
    if (toggle && links) {
        toggle.addEventListener('click', function() {
            links.classList.toggle('active');
            toggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (links.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
}

    // Close menu when clicking on a navigation link
    navbarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (links && links.classList.contains('active')) {
                links.classList.remove('active');
                toggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && links && links.classList.contains('active')) {
            links.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', function(e) {
        if (links && links.classList.contains('active')) {
            if (!toggle.contains(e.target) && !links.contains(e.target)) {
                links.classList.remove('active');
                toggle.classList.remove('active');
                document.body.style.overflow = '';
    }
        }
    });

    // Handle window resize - close menu on desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900 && links && links.classList.contains('active')) {
            links.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Slideshow functionality
    const slides = document.querySelectorAll('.slide');
    const navLeft = document.querySelector('.slide-nav-left');
    const navRight = document.querySelector('.slide-nav-right');
    let currentSlide = 0;

    function showSlide(index) {
        // Get slides dynamically (in case they were recreated)
        const currentSlides = document.querySelectorAll('.slide');
        if (currentSlides.length === 0) return;
        
        // Remove active class from all slides
        currentSlides.forEach(slide => slide.classList.remove('active'));
        
        // Ensure index is within bounds
        if (index < 0) {
            currentSlide = currentSlides.length - 1;
        } else if (index >= currentSlides.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        // Add active class to current slide
        currentSlides[currentSlide].classList.add('active');
    }

    // Navigate to previous slide
    if (navLeft) {
        navLeft.addEventListener('click', function(e) {
            e.stopPropagation();
            showSlide(currentSlide - 1);
        });
    }

    // Navigate to next slide
    if (navRight) {
        navRight.addEventListener('click', function(e) {
            e.stopPropagation();
            showSlide(currentSlide + 1);
        });
    }

    // Initialize first slide
    if (slides.length > 0) {
        showSlide(0);
    }

    // Project data with images for each project
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

    // Function to switch project
    function switchProject(projectName) {
        const project = projects[projectName];
        if (!project) return;

        // Update slideshow images
        const slideshowWrapper = document.querySelector('.slideshow-wrapper');
        if (slideshowWrapper) {
            slideshowWrapper.innerHTML = '';
            project.images.forEach((imageSrc, index) => {
                const img = document.createElement('img');
                img.src = imageSrc;
                img.alt = `Slide ${index + 1}`;
                img.className = 'slide';
                // Handle image load errors
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

            // Reinitialize slideshow
            currentSlide = 0;
            // Wait a bit for images to start loading, then show first slide
            setTimeout(() => {
                showSlide(0);
            }, 100);
        }

        // Update text content
        const projectContents = document.querySelectorAll('.project-content');
        projectContents.forEach(content => {
            if (content.dataset.project === projectName) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        // Update button active state
        const buttons = document.querySelectorAll('.right-column-btn');
        buttons.forEach(btn => {
            if (btn.dataset.project === projectName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Initialize with the active project on page load
    const activeProjectBtn = document.querySelector('.right-column-btn.active');
    if (activeProjectBtn && activeProjectBtn.dataset.project) {
        switchProject(activeProjectBtn.dataset.project);
    }

    // Add click handlers to project links
    const projectLinks = document.querySelectorAll('.right-column-btn');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectName = this.dataset.project;
            if (projectName) {
                switchProject(projectName);
            }
        });
    });

    // Slideshow cursor change and click navigation based on mouse position
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        // Custom arrow cursors - hollow with thin border
        const leftArrowCursor = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M50 20 L30 40 L50 60' fill='none' stroke='%23333' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\") 40 40, auto";
        const rightArrowCursor = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M30 20 L50 40 L30 60' fill='none' stroke='%23333' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\") 40 40, auto";
        
        slideshowContainer.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const width = rect.width;
            const midpoint = width / 2;
            
            if (x < midpoint) {
                // Left half - show left arrow
                this.style.cursor = leftArrowCursor;
            } else {
                // Right half - show right arrow
                this.style.cursor = rightArrowCursor;
            }
        });

        slideshowContainer.addEventListener('mouseleave', function() {
            this.style.cursor = '';
        });

        // Click to navigate slides
        slideshowContainer.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const width = rect.width;
            const midpoint = width / 2;
            
            if (x < midpoint) {
                // Click left half - previous slide
                showSlide(currentSlide - 1);
            } else {
                // Click right half - next slide
                showSlide(currentSlide + 1);
            }
        });
    }

    // Function to reinitialize slideshow (for dynamic content)
    function reinitSlideshow() {
        const slides = document.querySelectorAll('.slide');
        if (slides.length > 0) {
            currentSlide = 0;
            showSlide(0);
            
            // Reattach click handlers for nav buttons
            const navLeft = document.querySelector('.slide-nav-left');
            const navRight = document.querySelector('.slide-nav-right');
            
            if (navLeft) {
                navLeft.addEventListener('click', function(e) {
                    e.stopPropagation();
                    showSlide(currentSlide - 1);
                });
            }
            
            if (navRight) {
                navRight.addEventListener('click', function(e) {
                    e.stopPropagation();
                    showSlide(currentSlide + 1);
                });
            }
        }
    }
});
