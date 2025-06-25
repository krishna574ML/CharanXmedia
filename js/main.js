/**
 * ===================================================
 * --- InviteCrafter JS (Next Level Redesign) ---
 * ===================================================
 *
 * This script handles the 5 "Amazing Things":
 * 1. Interactive Hero Event Selector
 * 2. "Before & After" Customization Slider
 * 3. Live RSVP Counter
 * 4. Infinite Testimonial Scroller
 * 5. Instant Accent Color Customizer
 */

document.addEventListener('DOMContentLoaded', () => {

    const root = document.documentElement;

    /**
     * AMAZING THING #1: INTERACTIVE HERO EVENT SELECTOR
     */
    const eventIcons = document.querySelectorAll('.event-icon');
    const heroCardImage = document.getElementById('hero-card-image');
    const heroCard = document.getElementById('hero-card');

    const eventImages = {
        wedding: {
            src: 'https://placehold.co/400x600/1e1b2f/ffffff?text=Elegant+Wedding',
            alt: 'Digital wedding invitation'
        },
        birthday: {
            src: 'https://placehold.co/400x600/2f1b1b/ffffff?text=Fun+Birthday',
            alt: 'Digital birthday invitation'
        },
        corporate: {
            src: 'https://placehold.co/400x600/1b222f/ffffff?text=Sleek+Corporate',
            alt: 'Digital corporate invitation'
        }
    };
    
    eventIcons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            const eventType = icon.dataset.event;
            const accentColor = icon.dataset.accent;

            // Update accent color
            root.style.setProperty('--accent-primary', accentColor);
            
            // Update hero image
            if (heroCardImage && eventImages[eventType]) {
                heroCardImage.src = eventImages[eventType].src;
                heroCardImage.alt = eventImages[eventType].alt;
            }

            // Update active icon
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
            const rect = slider.getBoundingClientRect();
            // Use touch or mouse coordinates
            const x = (e.clientX || e.touches[0].clientX) - rect.left;
            let percentage = (x / rect.width) * 100;
            // Clamp between 0 and 100
            percentage = Math.max(0, Math.min(100, percentage));
            
            afterImage.style.width = `${percentage}%`;
            handle.style.left = `${percentage}%`;
        };
        
        handle.addEventListener('mousedown', startDrag);
        handle.addEventListener('touchstart', startDrag);
        
        window.addEventListener('mouseup', stopDrag);
        window.addEventListener('touchend', stopDrag);

        window.addEventListener('mousemove', onDrag);
        window.addEventListener('touchmove', onDrag);
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
        }, 3000); // Update every 3 seconds
    }

    /**
     * AMAZING THING #4: INFINITE TESTIMONIAL SCROLLER
     */
    const scroller = document.querySelector('.testimonial-scroller');
    if (scroller) {
        const track = scroller.querySelector('.testimonial-track');
        // Clone testimonials for seamless loop
        const testimonials = Array.from(track.children);
        testimonials.forEach(testimonial => {
            const clone = testimonial.cloneNode(true);
            clone.setAttribute('aria-hidden', true); // Hide clones from screen readers
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

                // Update active swatch
                swatches.forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
            });
        });
    }
    
    // Re-initialize Lucide Icons
    lucide.createIcons();
});