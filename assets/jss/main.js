// =================================================== //
// CharanX - Main JavaScript File                      //
// "BOLD & TRUTH" Theme v1.0                           //
// =================================================== //

// ---- Main DOMContentLoaded Function ----
document.addEventListener('DOMContentLoaded', () => {

    // --- FORM HANDLING ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // This event listener is ready for when we connect it
            // to a service like Formspree as discussed.
            const statusDiv = document.getElementById('contact-form-status');
            if(statusDiv) {
                 // Example of showing a sending message,
                 // this will be activated by the form service.
                 // statusDiv.innerHTML = `<p class="text-blue-500 text-sm">Sending...</p>`;
            }
        });
    }

    // --- ANIMATIONS ON SCROLL ---
    const initAnimations = () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const fadeInObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-element, .fade-in-up, .fade-in').forEach(
            element => fadeInObserver.observe(element)
        );
    };


    // --- CAROUSEL INITIALIZATION ---
    const initCarousels = () => {
        document.querySelectorAll('.carousel-container').forEach(carousel => {
            const track = carousel.querySelector('.carousel-track');
            if (!track || !track.children.length) return;
            
            const slides = Array.from(track.children);
            const nextButton = carousel.querySelector('.carousel-button.next');
            const prevButton = carousel.querySelector('.carousel-button.prev');
            const dotsNav = carousel.querySelector('.carousel-indicators');
            let currentIndex = 0;

            if (dotsNav) {
                dotsNav.innerHTML = '';
                slides.forEach((_, index) => {
                    const dot = document.createElement('button');
                    dot.classList.add('carousel-indicator');
                    if (index === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => moveToSlide(index));
                    dotsNav.appendChild(dot);
                });
            }
            
            const moveToSlide = (targetIndex) => {
                const currentSlideWidth = slides[0].getBoundingClientRect().width;
                track.style.transform = `translateX(-${currentSlideWidth * targetIndex}px)`;
                currentIndex = targetIndex;
                if(dotsNav) {
                    Array.from(dotsNav.children).forEach((dot, index) => {
                        dot.classList.toggle('active', index === currentIndex);
                    });
                }
            };
            
            nextButton?.addEventListener('click', () => {
                const nextIndex = (currentIndex + 1) % slides.length;
                moveToSlide(nextIndex);
            });
            
            prevButton?.addEventListener('click', () => {
                const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
                moveToSlide(prevIndex);
            });

             window.addEventListener('resize', () => moveToSlide(currentIndex));
        });
    };


    // --- NAVIGATION HANDLING ---
    const initNavigation = () => {
        const menuButton = document.getElementById('menuButton');
        const closeMenuButton = document.getElementById('closeMenuButton');
        const sideNav = document.getElementById('sideNav');
        const navLinks = document.querySelectorAll('#sideNav a');
        const mainHeader = document.getElementById('mainHeader');

        const openSideNav = () => sideNav?.classList.add('open');
        const closeSideNav = () => sideNav?.classList.remove('open');

        menuButton?.addEventListener('click', openSideNav);
        closeMenuButton?.addEventListener('click', closeSideNav);
        navLinks.forEach(link => {
            link.addEventListener('click', closeSideNav);
        });

        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (mainHeader) {
                mainHeader.classList.toggle('header-scrolled', currentScroll > 50);
                mainHeader.classList.toggle('header-hidden', currentScroll > lastScroll && currentScroll > 100);
            }
            lastScroll = currentScroll <= 0 ? 0 : currentScroll;
        }, { passive: true });
    };

    // --- FOOTER YEAR ---
    const updateFooterYear = () => {
        const currentYearEl = document.getElementById('currentYear');
        if(currentYearEl) {
            currentYearEl.textContent = new Date().getFullYear();
        }
    };

    // --- INITIALIZE ALL SCRIPTS ---
    try {
        initNavigation();
        initAnimations();
        initCarousels();
        updateFooterYear();
    } catch (error) {
        console.error('Initialization error:', error);
    }
});