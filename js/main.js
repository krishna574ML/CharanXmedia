/**
 * ===================================================
 * --- InviteCrafter JS (Next Level Redesign) ---
 * ===================================================
 *
 * This script handles the 5 "Amazing Things" AND
 * the mobile navigation toggle.
 */

document.addEventListener('DOMContentLoaded', () => {

    const root = document.documentElement;

    /**
     * MOBILE NAVIGATION TOGGLE
     */
    const menuToggle = document.getElementById('menu-toggle');
    const navContent = document.getElementById('nav-content');

    if (menuToggle && navContent) {
        menuToggle.addEventListener('click', () => {
            navContent.classList.toggle('is-open');

            // Optional: Change icon from menu to close (X)
            const icon = menuToggle.querySelector('i');
            if (navContent.classList.contains('is-open')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons(); // Re-render the icon
        });
    }


    /**
     * AMAZING THING #1: INTERACTIVE HERO EVENT SELECTOR
     */
    const eventIcons = document.querySelectorAll('.event-icon');
    const heroCardImage = document.getElementById('hero-card-image');
    
    const eventImages = {
        wedding: { src: 'https://placehold.co/400x600/1e1b2f/ffffff?text=Elegant+Wedding', alt: 'Digital wedding invitation' },
        birthday: { src: 'https://placehold.co/400x600/2f1b1b/ffffff?text=Fun+Birthday', alt: 'Digital birthday invitation' },
        corporate: { src: 'https://placehold.co/400x600/1b222f/ffffff?text=Sleek+Corporate', alt: 'Digital corporate invitation' }
    };
    
    eventIcons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            const eventType = icon.dataset.event;
            const accentColor = icon.dataset.accent;
            root.style.setProperty('--accent-primary', accentColor);
            
            if (heroCardImage && eventImages[eventType]) {
                heroCardImage.src = eventImages[eventType].src;
                heroCardImage.alt = eventImages[eventType].alt;
            }

            eventIcons.forEach(i => i.classList.remove('active'));
            icon.classList.add('active');
        });
    });

    /**
     * AMAZING THING #2: "BEFORE & AFTER" CUSTOMIZATION SLIDER
     */
    const slider = document.getElementById('comparison-slider');
    if (slider) {
        const afterImage = slider.querySelector('.after');
        const handle = slider.querySelector('.slider-handle');
        let isDragging = false;

        const startDrag = () => isDragging = true;
        const stopDrag = () => isDragging = false;
        
        const onDrag = (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Prevent page scroll on touch
            const rect = slider.getBoundingClientRect();
            const x = (e.clientX || e.touches[0].clientX) - rect.left;
            let percentage = (x / rect.width) * 100;
            percentage = Math.max(0, Math.min(100, percentage));
            
            afterImage.style.width = `${percentage}%`;
            handle.style.left = `${percentage}%`;
        };
        
        handle.addEventListener('mousedown', startDrag);
        handle.addEventListener('touchstart', startDrag, { passive: false });
        
        window.addEventListener('mouseup', stopDrag);
        window.addEventListener('touchend', stopDrag);

        window.addEventListener('mousemove', onDrag);
        window.addEventListener('touchmove', onDrag, { passive: false });
    }
    
    /**
     * AMAZING THING #3: LIVE RSVP COUNTER
     */
    const rsvpCounter = document.getElementById('rsvp-counter');
    if (rsvpCounter) {
        let count = parseInt(rsvpCounter.textContent, 10);
        setInterval(() => {
            count += Math.floor(Math.random() * 3) + 1;
            rsvpCounter.textContent = count;
        }, 3000);
    }

    /**
     * AMAZING THING #4: INFINITE TESTIMONIAL SCROLLER
     */
    const scroller = document.querySelector('.testimonial-scroller');
    if (scroller) {
        const track = scroller.querySelector('.testimonial-track');
        const testimonials = Array.from(track.children);
        testimonials.forEach(testimonial => {
            const clone = testimonial.cloneNode(true);
            clone.setAttribute('aria-hidden', true);
            track.appendChild(clone);
        });
    }

    /**
     * AMAZING THING #5: INSTANT ACCENT COLOR CUSTOMIZER
     */
    const colorPalette = document.getElementById('color-palette');
    if (colorPalette) {
        const swatches = colorPalette.querySelectorAll('.color-swatch');
        swatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                const newColor = swatch.dataset.color;
                root.style.setProperty('--accent-primary', newColor);
                swatches.forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
            });
        });
    }
    
    lucide.createIcons();
});
