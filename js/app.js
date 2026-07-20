/* ==========================================================================
   Ultimate BFF Luxury Website - Application Logic (Spatial Story Experience)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  if (window.AOS) AOS.init({ duration: 800, once: true });

  /* ------------------------------------------------------------------------
     1. Pre-Loader Welcome Screen & Opening Audio (prtiviraj.m4r)
     ------------------------------------------------------------------------ */
  const welcomeOverlay = document.getElementById('welcomeOverlay');
  const enterSiteBtn = document.getElementById('enterSiteBtn');
  const openingAudio = new Audio('./audio/prtiviraj.m4r');

  enterSiteBtn?.addEventListener('click', () => {
    // Play prtiviraj.m4r on website unboxing
    openingAudio.play().then(() => {
      console.log("Playing opening audio prtiviraj.m4r");
    }).catch(e => console.log(e));

    // Full screen confetti celebration
    if (window.confetti) {
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
      setTimeout(() => confetti({ particleCount: 80, spread: 100, origin: { y: 0.4 } }), 300);
    }

    // Hide welcome overlay smoothly
    welcomeOverlay?.classList.add('hidden');
    playChimeSound();
  });

  /* ------------------------------------------------------------------------
     2. Real Audio Database & Playlist Integration
     ------------------------------------------------------------------------ */
  const playlist = [
    {
      title: "Prithviraj Special Theme 🌟",
      artist: "Opening Friendship Anthem",
      src: "./audio/prtiviraj.m4r"
    },
    {
      title: "Balcony Serenade Special 🎶",
      artist: "Dedicated Song (O.m4r)",
      src: "./audio/O.m4r"
    },
    {
      title: "Theriyamele Tholaigiren 🎶",
      artist: "Special Friendship Track",
      src: "./audio/theriyamaley tholaigran.mp3.mpeg"
    },
    {
      title: "Bestie Special Tone - E ✨",
      artist: "Cute Melodic Tone",
      src: "./audio/E.m4r"
    },
    {
      title: "Surya Special Theme ⚡",
      artist: "Vibrant Energy Track",
      src: "./audio/surya.m4r"
    },
    {
      title: "Bestie Special Tone - SS ✨",
      artist: "Cute Tone",
      src: "./audio/ss.m4r"
    },
    {
      title: "Bestie Special Tone - Vignesh 🌟",
      artist: "Vignesh Tone",
      src: "./audio/vignesh.m4r"
    }
  ];

  let currentTrackIdx = 0;
  const realAudio = new Audio();
  realAudio.src = playlist[currentTrackIdx].src;

  const playTrackBtn = document.getElementById('playTrackBtn');
  const playIcon = document.getElementById('playIcon');
  const cassetteCard = document.getElementById('cassetteCard');
  const trackTitle = document.getElementById('trackTitle');
  const prevTrackBtn = document.getElementById('prevTrackBtn');
  const nextTrackBtn = document.getElementById('nextTrackBtn');

  function updateTrackUI() {
    if (trackTitle) trackTitle.textContent = playlist[currentTrackIdx].title;
    realAudio.src = playlist[currentTrackIdx].src;
  }

  updateTrackUI();

  playTrackBtn?.addEventListener('click', () => {
    if (realAudio.paused) {
      realAudio.play().then(() => {
        if (playIcon) playIcon.setAttribute('data-lucide', 'pause');
        if (window.lucide) lucide.createIcons();
        cassetteCard?.classList.add('playing');
      }).catch(err => {
        console.log("Audio playback error:", err);
      });
    } else {
      realAudio.pause();
      if (playIcon) playIcon.setAttribute('data-lucide', 'play');
      if (window.lucide) lucide.createIcons();
      cassetteCard?.classList.remove('playing');
    }
  });

  prevTrackBtn?.addEventListener('click', () => {
    currentTrackIdx = (currentTrackIdx - 1 + playlist.length) % playlist.length;
    updateTrackUI();
    if (!realAudio.paused) realAudio.play();
  });

  nextTrackBtn?.addEventListener('click', () => {
    currentTrackIdx = (currentTrackIdx + 1) % playlist.length;
    updateTrackUI();
    if (!realAudio.paused) realAudio.play();
  });

  realAudio.addEventListener('ended', () => {
    currentTrackIdx = (currentTrackIdx + 1) % playlist.length;
    updateTrackUI();
    realAudio.play();
  });

  /* ------------------------------------------------------------------------
     3. Dedicated Saree Balcony Audio Player (O.m4r)
     ------------------------------------------------------------------------ */
  const sareeAudio = new Audio('./audio/O.m4r');
  const playSareeAudioBtn = document.getElementById('playSareeAudioBtn');
  const sareePlayIcon = document.getElementById('sareePlayIcon');
  const sareeCard = document.getElementById('sareeCard');

  playSareeAudioBtn?.addEventListener('click', () => {
    if (sareeAudio.paused) {
      if (!realAudio.paused) realAudio.pause();
      sareeAudio.play().then(() => {
        if (sareePlayIcon) sareePlayIcon.setAttribute('data-lucide', 'pause');
        if (window.lucide) lucide.createIcons();
        sareeCard?.classList.add('playing-saree');
        if (window.confetti) confetti({ particleCount: 40, spread: 60 });
      }).catch(e => console.log(e));
    } else {
      sareeAudio.pause();
      if (sareePlayIcon) sareePlayIcon.setAttribute('data-lucide', 'play');
      if (window.lucide) lucide.createIcons();
      sareeCard?.classList.remove('playing-saree');
    }
  });

  sareeAudio.addEventListener('ended', () => {
    if (sareePlayIcon) sareePlayIcon.setAttribute('data-lucide', 'play');
    if (window.lucide) lucide.createIcons();
    sareeCard?.classList.remove('playing-saree');
  });

  /* ------------------------------------------------------------------------
     4. Photo Database (Including Saree Balcony Photo)
     ------------------------------------------------------------------------ */
  const photoBase = "image'/";
  const photoFiles = [
    "saree_balcony.jpg",
    "WhatsApp Image 2026-07-20 at 12.48.26 PM (1).jpeg",
    "WhatsApp Image 2026-07-20 at 1.07.57 PM.jpeg",
    "WhatsApp Image 2026-07-20 at 1.07.56 PM.jpeg",
    "WhatsApp Image 2026-07-20 at 1.07.55 PM.jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.28 PM.jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.29 PM (1).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.29 PM.jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.44 PM.jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.45 PM (1).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.45 PM (2).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.45 PM.jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.46 PM (1).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.46 PM (2).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.46 PM.jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.47 PM (1).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.47 PM (2).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.47 PM.jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.48 PM (1).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.48 PM (2).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.48 PM (3).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.48 PM.jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.49 PM (1).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.49 PM.jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.50 PM.jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.51 PM (1).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.51 PM (2).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.51 PM.jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.52 PM (1).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.52 PM (2).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.52 PM (3).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.52 PM.jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.53 PM (1).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.53 PM (2).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.53 PM.jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.54 PM (1).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.54 PM (2).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.55 PM (1).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.55 PM (2).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.55 PM (3).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.55 PM.jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.56 PM (1).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.56 PM (2).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.56 PM.jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.57 PM (1).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.57 PM (2).jpeg",
    "WhatsApp Image 2026-07-20 at 12.47.57 PM.jpeg",
    "WhatsApp Image 2026-07-20 at 12.48.26 PM.jpeg"
  ];

  const categories = ['style', 'outings', 'fitness'];
  const galleryData = photoFiles.map((file, idx) => {
    const category = categories[idx % categories.length];
    const captions = [
      "Ethnic Grace & Balcony Serenade 🌸",
      "Cute & Funny Bestie Moment 🤪",
      "Unforgettable Outdoor Moment ✨",
      "Stunning Style Check 🌿",
      "Gym Workout & Fitness Goals 💪",
      "Smiles & Pure Joy ✨"
    ];
    return {
      src: photoBase + file,
      category: category,
      caption: captions[idx % captions.length]
    };
  });

  /* ------------------------------------------------------------------------
     5. Sound Synthesizer (for UI interaction sound effects)
     ------------------------------------------------------------------------ */
  let soundEnabled = true;
  const soundToggle = document.getElementById('soundToggle');
  const soundIcon = document.getElementById('soundIcon');
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  function playTone(freq = 440, type = 'sine', duration = 0.15, gainVal = 0.1) {
    if (!soundEnabled) return;
    initAudio();
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  function playPopSound() { playTone(587.33, 'sine', 0.12, 0.15); }
  function playChimeSound() {
    if (!soundEnabled) return;
    [523.25, 659.25, 783.99, 1046.50].forEach((n, i) => {
      setTimeout(() => playTone(n, 'sine', 0.2, 0.12), i * 80);
    });
  }

  soundToggle?.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    if (soundIcon) soundIcon.setAttribute('data-lucide', soundEnabled ? 'volume-2' : 'volume-x');
    if (window.lucide) lucide.createIcons();
    if (soundEnabled) playPopSound();
  });

  /* ------------------------------------------------------------------------
     6. Custom Cursor & 3D Tilt Interaction
     ------------------------------------------------------------------------ */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorFollower = document.getElementById('cursor-follower');
  const heroAvatarCard = document.getElementById('heroAvatarCard');

  if (cursorDot && cursorFollower) {
    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`; cursorDot.style.top = `${mouseY}px`;

      if (heroAvatarCard) {
        const xPct = (e.clientX / window.innerWidth - 0.5) * 30;
        const yPct = (e.clientY / window.innerHeight - 0.5) * 30;
        heroAvatarCard.style.transform = `perspective(1000px) rotateY(${xPct}deg) rotateX(${-yPct}deg) scale(1.05)`;
      }
    });

    function animCursor() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      cursorFollower.style.left = `${followerX}px`; cursorFollower.style.top = `${followerY}px`;
      requestAnimationFrame(animCursor);
    }
    animCursor();
  }

  if (window.Lenis) {
    const lenis = new Lenis({ duration: 1.2 });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  /* ------------------------------------------------------------------------
     7. Cute Corner Mood Translator Logic
     ------------------------------------------------------------------------ */
  const funnyQuoteBubble = document.getElementById('funnyQuoteBubble');
  const moodBtns = document.querySelectorAll('.mood-btn');

  moodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      moodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const newQuote = btn.getAttribute('data-quote');
      if (funnyQuoteBubble) {
        funnyQuoteBubble.style.opacity = '0';
        funnyQuoteBubble.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          funnyQuoteBubble.textContent = newQuote;
          funnyQuoteBubble.style.opacity = '1';
          funnyQuoteBubble.style.transform = 'translateY(0)';
        }, 200);
      }
      playChimeSound();
      if (window.confetti) confetti({ particleCount: 25, spread: 50 });
    });
  });

  /* ------------------------------------------------------------------------
     8. Three.js Background Canvas (Cyan Particle Field)
     ------------------------------------------------------------------------ */
  const bgCanvas = document.getElementById('bg-canvas');
  if (bgCanvas && window.THREE) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: bgCanvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const count = 120;
    const geometry = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 20;
      pos[i + 1] = (Math.random() - 0.5) * 20;
      pos[i + 2] = (Math.random() - 0.5) * 10;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: 0x00f5d4, size: 0.18, transparent: true, opacity: 0.75 });
    const points = new THREE.Points(geometry, mat);
    scene.add(points);
    camera.position.z = 5;

    function animThree() {
      requestAnimationFrame(animThree);
      points.rotation.y += 0.001;
      points.rotation.x += 0.0005;
      renderer.render(scene, camera);
    }
    animThree();
  }

  /* ------------------------------------------------------------------------
     9. Photo Collage Masonry
     ------------------------------------------------------------------------ */
  const photoUniverseGrid = document.getElementById('photoUniverseGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderPhotos(filter = 'all') {
    if (!photoUniverseGrid) return;
    photoUniverseGrid.innerHTML = '';
    const filtered = filter === 'all' ? galleryData : galleryData.filter(d => d.category === filter);

    filtered.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'polaroid-item';
      card.innerHTML = `
        <div class="polaroid-img-wrapper">
          <img src="${item.src}" alt="${item.caption}" loading="lazy">
        </div>
        <div class="polaroid-note">${item.caption}</div>
      `;
      card.addEventListener('click', () => openLightbox(item));
      photoUniverseGrid.appendChild(card);
    });
  }

  renderPhotos('all');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPhotos(btn.getAttribute('data-filter'));
      playPopSound();
    });
  });

  // Lightbox
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(item) {
    if (lightboxImg) lightboxImg.src = item.src;
    if (lightboxCaption) lightboxCaption.textContent = item.caption;
    lightboxModal?.classList.add('active');
    playPopSound();
  }
  lightboxClose?.addEventListener('click', () => lightboxModal?.classList.remove('active'));

  /* ------------------------------------------------------------------------
     10. Scratch-Off Secret Letter Canvas
     ------------------------------------------------------------------------ */
  const scratchCanvas = document.getElementById('scratch-canvas');
  if (scratchCanvas) {
    const ctx = scratchCanvas.getContext('2d');
    const container = scratchCanvas.parentElement;
    scratchCanvas.width = container.offsetWidth;
    scratchCanvas.height = container.offsetHeight;

    ctx.fillStyle = '#9d4edd';
    ctx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
    ctx.font = 'bold 22px Fredoka';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch Me With Mouse / Finger ✨', scratchCanvas.width / 2, scratchCanvas.height / 2);

    let isScratching = false;

    function scratch(e) {
      if (!isScratching) return;
      const rect = scratchCanvas.getBoundingClientRect();
      const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 32, 0, Math.PI * 2);
      ctx.fill();
      playPopSound();
    }

    scratchCanvas.addEventListener('mousedown', (e) => { isScratching = true; scratch(e); });
    scratchCanvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', () => { isScratching = false; });

    scratchCanvas.addEventListener('touchstart', (e) => { isScratching = true; scratch(e); });
    scratchCanvas.addEventListener('touchmove', scratch);
    window.addEventListener('touchend', () => { isScratching = false; });
  }

  /* ------------------------------------------------------------------------
     11. Speech Bubble Quiz
     ------------------------------------------------------------------------ */
  const quizQuestions = [
    { question: "Who is the funniest in our duo? 😂", options: ["You!", "Me!", "Equally Hilarious!"], correct: 2 },
    { question: "What is our main hangout routine? 🛍️", options: ["Fries + Shopping + Gossip", "Gym Workouts", "Both!"], correct: 2 },
    { question: "Who talks more on late night phone calls? 📞", options: ["You!", "Me!", "Both non-stop!"], correct: 2 },
    { question: "What is our friendship rule #1? ✨", options: ["Always Support Each Other", "Never Judge", "Forever Best Friends!"], correct: 2 }
  ];

  let qIdx = 0, score = 0;
  const qTitle = document.getElementById('quizQuestion');
  const qOpts = document.getElementById('quizOptions');
  const qProg = document.getElementById('quizProgress');
  const qScore = document.getElementById('quizScore');

  function renderQuiz() {
    if (!qTitle || !qOpts) return;
    const q = quizQuestions[qIdx];
    qTitle.textContent = q.question;
    if (qProg) qProg.textContent = `Question ${qIdx + 1}/${quizQuestions.length}`;
    if (qScore) qScore.textContent = `Score: ${score}`;

    qOpts.innerHTML = '';
    q.options.forEach((opt) => {
      const b = document.createElement('div');
      b.className = 'speech-bubble-option';
      b.innerHTML = `<span>${opt}</span> <i data-lucide="sparkles"></i>`;
      b.addEventListener('click', () => {
        score += 10;
        playChimeSound();
        if (window.confetti) confetti({ particleCount: 30 });
        qIdx++;
        if (qIdx < quizQuestions.length) renderQuiz();
        else {
          qTitle.textContent = "🎉 Best Friends Forever! Score: " + score;
          qOpts.innerHTML = `<button class="whimsical-btn mt-3" onclick="location.reload()">Play Again ✨</button>`;
        }
      });
      qOpts.appendChild(b);
    });
    if (window.lucide) lucide.createIcons();
  }

  renderQuiz();

  /* ------------------------------------------------------------------------
     12. Memory Wheel Canvas
     ------------------------------------------------------------------------ */
  const wheelCanvas = document.getElementById('memory-wheel-canvas');
  const spinWheelBtn = document.getElementById('spinWheelBtn');

  if (wheelCanvas) {
    const ctx = wheelCanvas.getContext('2d');
    const segs = ['Fitness 💪', 'Outings 🛍️', 'Fun Days 😂', 'Memories 🌟', 'Trips 🎉', 'Secrets 💎'];
    const colors = ['#00f5d4', '#9d4edd', '#00b4d8', '#ffd166', '#f8961e', '#c77dff'];
    let curAngle = 0;

    function drawWheel() {
      ctx.clearRect(0, 0, 320, 320);
      const arc = (Math.PI * 2) / segs.length;
      for (let i = 0; i < segs.length; i++) {
        const a = curAngle + i * arc;
        ctx.beginPath();
        ctx.fillStyle = colors[i];
        ctx.moveTo(160, 160);
        ctx.arc(160, 160, 150, a, a + arc);
        ctx.lineTo(160, 160);
        ctx.fill();

        ctx.save();
        ctx.translate(160, 160);
        ctx.rotate(a + arc / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#0a0e1a';
        ctx.font = 'bold 15px Fredoka';
        ctx.fillText(segs[i], 135, 5);
        ctx.restore();
      }
    }
    drawWheel();

    let isSpinning = false;
    spinWheelBtn?.addEventListener('click', () => {
      if (isSpinning) return;
      isSpinning = true;
      const targetAngle = Math.PI * 8 + Math.random() * Math.PI * 4;
      const start = performance.now();
      function spinAnim(now) {
        const elapsed = now - start;
        if (elapsed < 4000) {
          const progress = elapsed / 4000;
          const ease = 1 - Math.pow(1 - progress, 3);
          curAngle = ease * targetAngle;
          drawWheel();
          playTone(500 + Math.random() * 200, 'triangle', 0.05, 0.05);
          requestAnimationFrame(spinAnim);
        } else {
          isSpinning = false;
          playChimeSound();
          if (window.confetti) confetti({ particleCount: 50 });
          showMemoryModal();
        }
      }
      requestAnimationFrame(spinAnim);
    });
  }

  function showMemoryModal() {
    const memoryModalEl = document.getElementById('memoryModal');
    const modalTitle = document.getElementById('memoryModalTitle');
    const modalImg = document.getElementById('memoryModalImg');
    const modalDesc = document.getElementById('memoryModalDesc');
    const randomPhoto = galleryData[Math.floor(Math.random() * galleryData.length)];

    if (modalTitle) modalTitle.textContent = "Throwback Memory Unlocked! 🎉";
    if (modalImg) modalImg.src = randomPhoto.src;
    if (modalDesc) modalDesc.textContent = randomPhoto.caption;

    if (memoryModalEl && window.bootstrap) {
      const modal = new bootstrap.Modal(memoryModalEl);
      modal.show();
    }
  }

  /* ------------------------------------------------------------------------
     13. Wish Sky Lanterns
     ------------------------------------------------------------------------ */
  const wishForm = document.getElementById('wishForm');
  const wishInput = document.getElementById('wishInput');
  const lanternsArea = document.getElementById('lanternsArea');

  const defaultWishes = [
    "To 100 more spontaneous shopping sprees! 🛍️",
    "May our laugh sessions never end! 😂",
    "Best friends today, tomorrow, and forever! 🌟"
  ];

  function renderLanterns() {
    if (!lanternsArea) return;
    const saved = JSON.parse(localStorage.getItem('bff_wishes') || '[]');
    const all = [...defaultWishes, ...saved];
    lanternsArea.innerHTML = '';

    all.forEach((w, i) => {
      const l = document.createElement('div');
      l.className = 'wish-lantern';
      l.style.left = `${(i * 28 + 5) % 75}%`;
      l.style.top = `${(i * 55 + 20) % 220}px`;
      l.style.animationDelay = `${i * 1.2}s`;
      l.textContent = w;
      lanternsArea.appendChild(l);
    });
  }

  wishForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = wishInput.value.trim();
    if (val) {
      const saved = JSON.parse(localStorage.getItem('bff_wishes') || '[]');
      saved.push(val);
      localStorage.setItem('bff_wishes', JSON.stringify(saved));
      wishInput.value = '';
      renderLanterns();
      playChimeSound();
      if (window.confetti) confetti({ particleCount: 30 });
    }
  });

  renderLanterns();

  /* ------------------------------------------------------------------------
     14. Compliments & Celebration
     ------------------------------------------------------------------------ */
  const compliments = [
    "You bring so much sunshine wherever you go!",
    "The world is brighter and happier because of you.",
    "You make every day feel like a special celebration.",
    "Your laugh is genuinely the most contagious thing ever!",
    "You are one in a million, bestie!"
  ];

  const complimentText = document.getElementById('complimentText');
  document.getElementById('newComplimentBtn')?.addEventListener('click', () => {
    const comp = compliments[Math.floor(Math.random() * compliments.length)];
    if (complimentText) {
      complimentText.style.opacity = 0;
      setTimeout(() => {
        complimentText.textContent = `"${comp}"`;
        complimentText.style.opacity = 1;
      }, 200);
    }
    playChimeSound();
  });

  document.getElementById('celebrateBtn')?.addEventListener('click', () => {
    playChimeSound();
    if (window.confetti) {
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      setTimeout(() => confetti({ particleCount: 100, spread: 120, origin: { y: 0.3 } }), 400);
    }
  });

  document.getElementById('startBtn')?.addEventListener('click', () => {
    document.getElementById('saree-serenade')?.scrollIntoView({ behavior: 'smooth' });
    playPopSound();
  });
});
