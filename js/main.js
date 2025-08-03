document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    const generateBtn = document.getElementById("generate-video-btn");
    const videoModal = document.getElementById("video-modal");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalControls = document.getElementById("modal-controls");
    const music = document.getElementById("video-music");
    const musicBtn = document.getElementById("music-control-btn");
    let musicMuted = false;
    let videoTimeout;

    // Generate video button click
    generateBtn.addEventListener("click", () => {
        const bride = document.getElementById("bride-name").value || "Name 1";
        const groom = document.getElementById("groom-name").value || "Name 2"; 
        const date = document.getElementById("event-date").value || "December 25, 2025";

        videoModal.querySelector("#video-text-bride").textContent = bride;
        videoModal.querySelector("#video-text-groom").textContent = groom;
        videoModal.querySelector("#video-text-date").textContent = date;

        document.body.style.overflow = "hidden";
        videoModal.classList.add("is-visible");
        playMusic();
        runAnimation();
    });

    // Close modal
    modalCloseBtn.addEventListener("click", closeModal);
    
    // Close on escape key
    videoModal.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

    // Close modal function
    function closeModal() {
        videoModal.classList.remove("is-visible");
        document.body.style.overflow = "";
        stopMusic();
        resetState();
        if (videoTimeout) clearTimeout(videoTimeout);
    }

    // Music functions
    function playMusic() {
        music.currentTime = 0;
        music.muted = musicMuted;
        music.volume = 0.5;
        music.play().catch(() => {}); // ignore autoplay block
        updateMusicIcon();
    }

    function stopMusic() {
        music.pause();
    }

    function updateMusicIcon() {
        const iconName = musicMuted ? "volume-x" : "volume-2";
        musicBtn.innerHTML = `<i data-lucide="${iconName}"></i>`;
        lucide.createIcons();
    }

    // Music toggle
    musicBtn.addEventListener("click", () => {
        musicMuted = !musicMuted;
        music.muted = musicMuted;
        updateMusicIcon();
    });

    // Animation timeline
    function runAnimation() {
        const brideEl = videoModal.querySelector("#video-text-bride");
        const groomEl = videoModal.querySelector("#video-text-groom");
        const dateEl = videoModal.querySelector("#video-text-date");
        const bar = videoModal.querySelector("#video-progress");
        
        resetState();

        // Show Name 1
        setTimeout(() => brideEl.classList.add("animate-in"), 500);
        setTimeout(() => {
            brideEl.classList.replace("animate-in", "animate-out");
        }, 3500);

        // Show Name 2  
        setTimeout(() => {
            brideEl.classList.remove("animate-out");
            groomEl.classList.add("animate-in");
        }, 4000);
        setTimeout(() => {
            groomEl.classList.replace("animate-in", "animate-out");
        }, 7000);

        // Show Date
        setTimeout(() => {
            groomEl.classList.remove("animate-out");
            dateEl.classList.add("animate-in");
        }, 7500);

        // Progress bar animation
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 0.1;
            bar.style.width = `${Math.min(progress, 100)}%`;
            if (progress >= 100) clearInterval(progressInterval);
        }, 10);

        // Show final screen
        videoTimeout = setTimeout(() => {
            videoModal.querySelector('.video-screen').classList.add('is-finished');
            showControls();
            stopMusic();
        }, 10000);
    }

    // Reset animation state
    function resetState() {
        const textElements = videoModal.querySelectorAll('.video-text');
        textElements.forEach(el => {
            el.classList.remove('animate-in', 'animate-out');
        });
        
        const progressBar = videoModal.querySelector('#video-progress');
        progressBar.style.width = '0%';
        
        const videoScreen = videoModal.querySelector('.video-screen');
        videoScreen.classList.remove('is-finished');
        
        modalControls.innerHTML = '';
    }

    // Show final controls
    function showControls() {
        modalControls.innerHTML = `
            <div class="final-screen-content">
                <h3 class="final-title">Your Video Invitation is Ready!</h3>
                <div class="final-buttons">
                    <button class="btn btn-icon">
                        <i data-lucide="share-2"></i>
                    </button>
                    <button class="btn btn-download">
                        <i data-lucide="download"></i>
                        Get HD Video ₹299
                    </button>
                    <button class="btn btn-icon">
                        <i data-lucide="heart"></i>
                    </button>
                </div>
            </div>
        `;
        lucide.createIcons();
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe animated elements
    const animatedElements = document.querySelectorAll('.category-card, .feature-card, .testimonial-card, .step');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // Add loading states
    function showAlert(message, type = 'info') {
        const alert = document.createElement('div');
        alert.className = `custom-alert alert-${type}`;
        alert.innerHTML = `
            <i data-lucide="info"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(alert);
        
        lucide.createIcons();
        
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }

    // Form validation
    const inputs = document.querySelectorAll('.form-group input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = var(--border);
            }
        });
        
        input.addEventListener('input', function() {
            this.style.borderColor = var(--border);
        });
    });

    // Category card interactions
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            showAlert('Template category selected! Choose your preferred design.', 'success');
        });
    });

    console.log('KuttyInvites initialized successfully! 🎉');
});
