document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generate-video-btn");
  const videoModal = document.getElementById("video-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalControls = document.getElementById("modal-controls");
  const music = document.getElementById("video-music");
  const musicBtn = document.getElementById("music-control-btn");

  let musicMuted = false;
  let videoTimeout;

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

  modalCloseBtn.addEventListener("click", closeModal);
  videoModal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Music
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

  musicBtn.addEventListener("click", () => {
    musicMuted = !musicMuted;
    music.muted = musicMuted;
    updateMusicIcon();
  });

  // Animation Timeline
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

    // progress bar
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 0.1;
      bar.style.width = `${Math.min(progress, 100)}%`;
      if (progress >= 100) clearInterval(progressInterval);
    }, 10);

    // show buttons after animation
    videoTimeout = setTimeout(() => {
      // Add a class to transition to the final screen
      videoModal.querySelector('.video-screen').classList.add('is-finished');
      showControls();
      stopMusic();
    }, 10000);
  }

  // UPDATED to add a title and new button classes
  function showControls() {
    modalControls.innerHTML = `
      <div class="final-screen-content">
        <h3 class="final-title">Your Video is Ready!</h3>
        <div class="final-buttons">
            <button class="btn btn-primary btn-download" id="download-btn"><i data-lucide="download"></i> Download MP4</button>
            <button class="btn btn-icon" id="replay-btn" aria-label="Replay"><i data-lucide="rotate-cw"></i></button>
            <button class="btn btn-icon" id="close-video-btn" aria-label="Close"><i data-lucide="x"></i></button>
        </div>
      </div>
    `;
    lucide.createIcons();

    document.getElementById("replay-btn").addEventListener("click", () => {
      playMusic();
      runAnimation();
    });

    document.getElementById("close-video-btn").addEventListener("click", closeModal);

    document.getElementById("download-btn").addEventListener("click", () => {
      fakeAlert("Preparing your video…", 3000);
    });
  }

  // UPDATED to remove the 'is-finished' class on reset
  function resetState() {
    clearTimeout(videoTimeout);
    videoModal.querySelector('.video-screen').classList.remove('is-finished');
    const texts = videoModal.querySelectorAll(".video-text");
    texts.forEach((el) => {
      el.classList.remove("animate-in", "animate-out");
      el.style.opacity = "";
    });
    videoModal.querySelector("#video-progress").style.width = "0%";
    modalControls.innerHTML = "";
  }

  function closeModal() {
    stopMusic();
    videoModal.classList.remove("is-visible");
    document.body.style.overflow = "";
    resetState();
  }

  function fakeAlert(msg, delay) {
    const alert = document.createElement("div");
    alert.className = "custom-alert";
    alert.innerHTML = `<i data-lucide="loader" class="spin"></i><span>${msg}</span>`;
    document.body.appendChild(alert);
    lucide.createIcons();

    setTimeout(() => {
      alert.innerHTML = "✨ Your download is ready!";
      setTimeout(() => alert.remove(), 2000);
    }, delay);
  }

  const spinnerStyle = document.createElement("style");
  spinnerStyle.textContent = `
    @keyframes spin { to { transform: rotate(360deg); }}
    .spin { animation: spin 1s linear infinite; }
  `;
  document.head.appendChild(spinnerStyle);

  lucide.createIcons();
});