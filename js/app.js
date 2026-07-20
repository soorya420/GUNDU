/* ==========================================================================
   Ultimate BFF Luxury Website - Application Logic (Spatial Story Experience)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  if (window.AOS) {
    AOS.init({ duration: 800, once: true });
    window.addEventListener('load', () => AOS.refresh());
    window.addEventListener('resize', () => AOS.refresh());
  }

  /* ------------------------------------------------------------------------
     0. Floating Scroll Back to Top Button Logic
     ------------------------------------------------------------------------ */
  const backToTopBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playPopSound();
  });

  /* ------------------------------------------------------------------------
     1. SEQUENTIAL AUDIO FLOW (Zero Overlap Guaranteed)
        Step A: Welcome Screen Click -> Plays Opening Song: prtiviraj.m4r
        Step B: When prtiviraj.m4r COMPLETES -> Plays nanum rowdy than song.m4r
     ------------------------------------------------------------------------ */
  const welcomeOverlay = document.getElementById('welcomeOverlay');
  const enterSiteBtn = document.getElementById('enterSiteBtn');

  // Master Audio Objects
  const openingAudio = new Audio('./audio/prtiviraj.m4r');
  const mainBffAudio = new Audio('./audio/nanum rowdy than song.m4r');
  const sareeAudio = new Audio('./audio/O.m4r');
  const kovAudio = new Audio('./audio/kov.m4r');
  const dhanushAudio = new Audio('./audio/dhanush.m4r');
  const spAudio = new Audio('./audio/sp.m4r');
  const playerAudio = new Audio();

  let isMuted = false;

  // Helper to stop all currently playing audio before starting a new track
  function stopAllAudioExcept(targetAudio) {
    [openingAudio, mainBffAudio, sareeAudio, kovAudio, dhanushAudio, spAudio, playerAudio].forEach(audio => {
      if (audio && audio !== targetAudio && !audio.paused) {
        audio.pause();
      }
    });
  }

  function setMasterMute(muted) {
    isMuted = muted;
    [openingAudio, mainBffAudio, sareeAudio, kovAudio, dhanushAudio, spAudio, playerAudio].forEach(audio => {
      if (audio) audio.muted = muted;
    });
  }

  // When User Clicks Unlock Special Gift
  enterSiteBtn?.addEventListener('click', () => {
    // Hide overlay
    welcomeOverlay?.classList.add('hidden');
    
    // Confetti
    if (window.confetti) {
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
      setTimeout(() => confetti({ particleCount: 80, spread: 100, origin: { y: 0.4 } }), 300);
    }

    // Step A: Play opening song prtiviraj.m4r cleanly
    stopAllAudioExcept(openingAudio);
    openingAudio.currentTime = 0;
    openingAudio.muted = isMuted;
    openingAudio.play().then(() => {
      console.log("Playing Opening Song: prtiviraj.m4r");
    }).catch(e => console.log("Audio play blocked by browser:", e));
  });

  // Step B: When prtiviraj.m4r COMPLETES -> Start nanum rowdy than song.m4r
  openingAudio.addEventListener('ended', () => {
    console.log("Opening Song completed! Now starting nanum rowdy than song.m4r");
    stopAllAudioExcept(mainBffAudio);
    mainBffAudio.currentTime = 0;
    mainBffAudio.muted = isMuted;
    mainBffAudio.play().then(() => {
      console.log("Playing Main Background Song: nanum rowdy than song.m4r");
    }).catch(e => console.log(e));
  });

  /* ------------------------------------------------------------------------
     2. Master Sound & Audio Toggle Button
     ------------------------------------------------------------------------ */
  const soundToggle = document.getElementById('soundToggle');
  const soundIcon = document.getElementById('soundIcon');
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  function playTone(freq = 440, type = 'sine', duration = 0.15, gainVal = 0.1) {
    if (isMuted) return;
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
    if (isMuted) return;
    [523.25, 659.25, 783.99, 1046.50].forEach((n, i) => {
      setTimeout(() => playTone(n, 'sine', 0.2, 0.12), i * 80);
    });
  }

  soundToggle?.addEventListener('click', () => {
    setMasterMute(!isMuted);
    if (soundIcon) soundIcon.setAttribute('data-lucide', isMuted ? 'volume-x' : 'volume-2');
    if (window.lucide) lucide.createIcons();
    if (!isMuted) playPopSound();
  });

  /* ------------------------------------------------------------------------
     3. Real Audio Database & Retro Player Playlist
     ------------------------------------------------------------------------ */
  const playlist = [
    {
      title: "Naanum Rowdy Dhaan Theme 🎶",
      artist: "Main Friendship Song",
      src: "./audio/nanum rowdy than song.m4r"
    },
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
      title: "Kovam & Moods Serenade 🎭",
      artist: "9 Expressions Special (kov.m4r)",
      src: "./audio/kov.m4r"
    },
    {
      title: "Dhanush Special Theme 🎶",
      artist: "Secret Letter Song (dhanush.m4r)",
      src: "./audio/dhanush.m4r"
    },
    {
      title: "SP Royal Serenade 👑",
      artist: "SP Special Track (sp.m4r)",
      src: "./audio/sp.m4r"
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
  playerAudio.src = playlist[currentTrackIdx].src;

  const playTrackBtn = document.getElementById('playTrackBtn');
  const playIcon = document.getElementById('playIcon');
  const cassetteCard = document.getElementById('cassetteCard');
  const trackTitle = document.getElementById('trackTitle');
  const prevTrackBtn = document.getElementById('prevTrackBtn');
  const nextTrackBtn = document.getElementById('nextTrackBtn');

  function updateTrackUI() {
    if (trackTitle) trackTitle.textContent = playlist[currentTrackIdx].title;
    playerAudio.src = playlist[currentTrackIdx].src;
    playerAudio.muted = isMuted;
  }

  updateTrackUI();

  playTrackBtn?.addEventListener('click', () => {
    if (playerAudio.paused) {
      stopAllAudioExcept(playerAudio);
      playerAudio.muted = isMuted;
      playerAudio.play().then(() => {
        if (playIcon) playIcon.setAttribute('data-lucide', 'pause');
        if (window.lucide) lucide.createIcons();
        cassetteCard?.classList.add('playing');
      }).catch(err => {
        console.log("Audio playback error:", err);
      });
    } else {
      playerAudio.pause();
      if (playIcon) playIcon.setAttribute('data-lucide', 'play');
      if (window.lucide) lucide.createIcons();
      cassetteCard?.classList.remove('playing');
    }
  });

  prevTrackBtn?.addEventListener('click', () => {
    currentTrackIdx = (currentTrackIdx - 1 + playlist.length) % playlist.length;
    updateTrackUI();
    stopAllAudioExcept(playerAudio);
    playerAudio.play();
    if (playIcon) playIcon.setAttribute('data-lucide', 'pause');
    if (window.lucide) lucide.createIcons();
    cassetteCard?.classList.add('playing');
  });

  nextTrackBtn?.addEventListener('click', () => {
    currentTrackIdx = (currentTrackIdx + 1) % playlist.length;
    updateTrackUI();
    stopAllAudioExcept(playerAudio);
    playerAudio.play();
    if (playIcon) playIcon.setAttribute('data-lucide', 'pause');
    if (window.lucide) lucide.createIcons();
    cassetteCard?.classList.add('playing');
  });

  playerAudio.addEventListener('ended', () => {
    currentTrackIdx = (currentTrackIdx + 1) % playlist.length;
    updateTrackUI();
    playerAudio.play();
  });

  /* ------------------------------------------------------------------------
     4. Dedicated Saree Balcony Audio Player (O.m4r)
     ------------------------------------------------------------------------ */
  const playSareeAudioBtn = document.getElementById('playSareeAudioBtn');
  const sareePlayIcon = document.getElementById('sareePlayIcon');
  const sareeCard = document.getElementById('sareeCard');

  playSareeAudioBtn?.addEventListener('click', () => {
    if (sareeAudio.paused) {
      stopAllAudioExcept(sareeAudio);
      sareeAudio.muted = isMuted;
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
     4B. Dedicated 9 Moods & Kovam Serenade Section (kov.m4r + 9 Grid)
     ------------------------------------------------------------------------ */
  const playKovamAudioBtn = document.getElementById('playKovamAudioBtn');
  const kovamPlayIcon = document.getElementById('kovamPlayIcon');
  const kovamPlayText = document.getElementById('kovamPlayText');
  const kovamMoodsCard = document.getElementById('kovamMoodsCard');
  const moodSpatialCard = document.getElementById('moodSpatialCard');
  const moodQuoteEmoji = document.getElementById('moodQuoteEmoji');
  const moodQuoteTitle = document.getElementById('moodQuoteTitle');
  const moodQuoteText = document.getElementById('moodQuoteText');
  const currentMoodName = document.getElementById('currentMoodName');
  const moodTileCards = document.querySelectorAll('.mood-tile-card');

  // Play/Pause Kovam Track
  playKovamAudioBtn?.addEventListener('click', () => {
    if (kovAudio.paused) {
      stopAllAudioExcept(kovAudio);
      kovAudio.muted = isMuted;
      kovAudio.play().then(() => {
        if (kovamPlayIcon) kovamPlayIcon.setAttribute('data-lucide', 'pause');
        if (kovamPlayText) kovamPlayText.textContent = "Pause Kovam Track 🎵";
        if (window.lucide) lucide.createIcons();
        kovamMoodsCard?.classList.add('playing-kovam');
        if (window.confetti) confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
      }).catch(e => console.log(e));
    } else {
      kovAudio.pause();
      if (kovamPlayIcon) kovamPlayIcon.setAttribute('data-lucide', 'play');
      if (kovamPlayText) kovamPlayText.textContent = "Play Kovam Track 🎵";
      if (window.lucide) lucide.createIcons();
      kovamMoodsCard?.classList.remove('playing-kovam');
    }
  });

  kovAudio.addEventListener('ended', () => {
    if (kovamPlayIcon) kovamPlayIcon.setAttribute('data-lucide', 'play');
    if (kovamPlayText) kovamPlayText.textContent = "Play Kovam Track 🎵";
    if (window.lucide) lucide.createIcons();
    kovamMoodsCard?.classList.remove('playing-kovam');
  });

  // 3D Tilt Effect on Master Photo Frame
  moodSpatialCard?.addEventListener('mousemove', (e) => {
    const rect = moodSpatialCard.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = (-y / rect.height) * 18;
    const rotY = (x / rect.width) * 18;
    moodSpatialCard.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  moodSpatialCard?.addEventListener('mouseleave', () => {
    moodSpatialCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });

  // Emoji Particles Generator
  function spawnEmojiBurst(x, y, emojiStr) {
    const particleCount = 10;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'emoji-particle';
      p.textContent = emojiStr;
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      
      const dx = (Math.random() - 0.5) * 180;
      const rot = (Math.random() - 0.5) * 90;
      p.style.setProperty('--dx', `${dx}px`);
      p.style.setProperty('--rot', `${rot}deg`);
      
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1400);
    }
  }

  // Interactive Click Handlers for 9 Mood Cards
  moodTileCards.forEach(card => {
    // Set custom color CSS var
    const color = card.getAttribute('data-color') || '#00f5d4';
    card.style.setProperty('--tile-color', color);

    card.addEventListener('click', (e) => {
      moodTileCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const emoji = card.getAttribute('data-emoji') || '😊';
      const title = card.getAttribute('data-title') || 'Mood';
      const quote = card.getAttribute('data-quote') || '';

      if (moodQuoteEmoji) moodQuoteEmoji.textContent = emoji;
      if (moodQuoteTitle) moodQuoteTitle.textContent = title;
      if (moodQuoteText) moodQuoteText.textContent = `"${quote}"`;
      if (currentMoodName) currentMoodName.textContent = `${emoji} ${title}`;

      playPopSound();
      spawnEmojiBurst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, emoji);
    });
  });

  /* ------------------------------------------------------------------------
     4C. Dedicated 3D Spatial Prism Stage (3 New Attached Images)
     ------------------------------------------------------------------------ */
  const prism3dStage = document.getElementById('prism3dStage');
  const prismPrevBtn = document.getElementById('prismPrevBtn');
  const prismNextBtn = document.getElementById('prismNextBtn');
  const prismAutoBtn = document.getElementById('prismAutoBtn');
  const prismAutoLabel = document.getElementById('prismAutoLabel');
  const prismStageContainer = document.getElementById('prismStageContainer');
  const holoEmoji = document.getElementById('holoEmoji');
  const holoTitle = document.getElementById('holoTitle');
  const holoDesc = document.getElementById('holoDesc');
  const prismCards = document.querySelectorAll('.prism-card');

  let currentRotationY = 0;
  let isAutoSpinning = true;
  let autoSpinInterval = null;

  const prismData = {
    0: { emoji: '🍹', title: 'Café Sip & Refreshment 🍹✨', desc: 'Cooling off with ice-cold beverages & sweet laughter over endless stories!' },
    120: { emoji: '👑', title: 'Outdoor Lounge Queen 👑', desc: 'Queen energy unlocked! Relaxed posture & unbothered royal peacefulness!' },
    240: { emoji: '🌸', title: 'Pergola Grace & Vines 🌿🌸', desc: 'Effortless elegance & natural grace amidst wooden pergolas and green vines!' }
  };

  function updatePrismStage() {
    if (prism3dStage) {
      prism3dStage.style.transform = `rotateY(${currentRotationY}deg)`;
    }
    
    // Normalize angle (0, 120, 240)
    let normalized = ((-currentRotationY % 360) + 360) % 360;
    let closestKey = 0;
    let minDiff = 360;
    [0, 120, 240].forEach(angle => {
      let diff = Math.abs(normalized - angle);
      if (diff < minDiff) {
        minDiff = diff;
        closestKey = angle;
      }
    });

    const info = prismData[closestKey];
    if (info) {
      if (holoEmoji) holoEmoji.textContent = info.emoji;
      if (holoTitle) holoTitle.textContent = info.title;
      if (holoDesc) holoDesc.textContent = info.desc;
    }
  }

  function startAutoSpin() {
    stopAutoSpin();
    isAutoSpinning = true;
    if (prismAutoLabel) prismAutoLabel.textContent = "Pause 3D Spin";
    prismAutoBtn?.classList.add('active-prism-btn');
    autoSpinInterval = setInterval(() => {
      currentRotationY -= 120;
      updatePrismStage();
    }, 3800);
  }

  function stopAutoSpin() {
    isAutoSpinning = false;
    if (prismAutoLabel) prismAutoLabel.textContent = "Resume 3D Spin";
    prismAutoBtn?.classList.remove('active-prism-btn');
    if (autoSpinInterval) clearInterval(autoSpinInterval);
  }

  startAutoSpin();

  prismAutoBtn?.addEventListener('click', () => {
    if (isAutoSpinning) {
      stopAutoSpin();
    } else {
      startAutoSpin();
    }
    playPopSound();
  });

  prismPrevBtn?.addEventListener('click', () => {
    currentRotationY += 120;
    updatePrismStage();
    playPopSound();
  });

  prismNextBtn?.addEventListener('click', () => {
    currentRotationY -= 120;
    updatePrismStage();
    playPopSound();
  });

  // Mouse Parallax for Prism Stage
  prismStageContainer?.addEventListener('mousemove', (e) => {
    const rect = prismStageContainer.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = (-y / rect.height) * 15;
    const rotY_offset = (x / rect.width) * 15;
    if (prism3dStage) {
      prism3dStage.style.transform = `rotateX(${rotX}deg) rotateY(${currentRotationY + rotY_offset}deg)`;
    }
  });

  prismStageContainer?.addEventListener('mouseleave', () => {
    updatePrismStage();
  });

  // Click card to center or flip
  prismCards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      playChimeSound();
    });
  });

  /* ------------------------------------------------------------------------
     4D. Dedicated SP Special Serenade Section (sp.m4r + sp_special_vibe.jpg)
     ------------------------------------------------------------------------ */
  const playSpAudioBtn = document.getElementById('playSpAudioBtn');
  const spPlayIcon = document.getElementById('spPlayIcon');
  const spPlayText = document.getElementById('spPlayText');
  const spSerenadeCard = document.getElementById('spSerenadeCard');
  const spSpatialFrame = document.getElementById('spSpatialFrame');

  playSpAudioBtn?.addEventListener('click', () => {
    if (spAudio.paused) {
      stopAllAudioExcept(spAudio);
      spAudio.muted = isMuted;
      spAudio.play().then(() => {
        if (spPlayIcon) spPlayIcon.setAttribute('data-lucide', 'pause');
        if (spPlayText) spPlayText.textContent = "Pause SP Special Track 🎵";
        if (window.lucide) lucide.createIcons();
        spSerenadeCard?.classList.add('playing-sp');
        if (window.confetti) confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      }).catch(e => console.log(e));
    } else {
      spAudio.pause();
      if (spPlayIcon) spPlayIcon.setAttribute('data-lucide', 'play');
      if (spPlayText) spPlayText.textContent = "Play SP Special Track 🎵";
      if (window.lucide) lucide.createIcons();
      spSerenadeCard?.classList.remove('playing-sp');
    }
  });

  spAudio.addEventListener('ended', () => {
    if (spPlayIcon) spPlayIcon.setAttribute('data-lucide', 'play');
    if (spPlayText) spPlayText.textContent = "Play SP Special Track 🎵";
    if (window.lucide) lucide.createIcons();
    spSerenadeCard?.classList.remove('playing-sp');
  });

  // 3D Mouse Parallax Effect for SP Spatial Frame
  spSpatialFrame?.addEventListener('mousemove', (e) => {
    const rect = spSpatialFrame.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = (-y / rect.height) * 16;
    const rotY = (x / rect.width) * 16;
    spSpatialFrame.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  spSpatialFrame?.addEventListener('mouseleave', () => {
    spSpatialFrame.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });

  /* ------------------------------------------------------------------------
     5. Photo Database (Including Saree Balcony, 3D Prism & SP Photos)
     ------------------------------------------------------------------------ */
  const photoBase = "image'/";
  const photoFiles = [
    "sp_special_vibe.jpg",
    "priya_cafe_sip.jpg",
    "priya_pergola_grace.jpg",
    "priya_wicker_throne.jpg",
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
      "Cute & Funny Gundu Priya Moment 🤪",
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
     10. Interactive 3 Scratch-Off Canvas Cards
     ------------------------------------------------------------------------ */
  function setupScratchCanvas(canvasId, titleText) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    
    canvas.width = container.offsetWidth || 300;
    canvas.height = container.offsetHeight || 280;

    // Fill with metallic purple overlay
    ctx.fillStyle = '#9d4edd';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = 'bold 18px Fredoka';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch Me ✨', canvas.width / 2, canvas.height / 2);

    let isScratching = false;

    function scratch(e) {
      if (!isScratching) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.fill();
      playPopSound();
    }

    canvas.addEventListener('mousedown', (e) => { isScratching = true; scratch(e); });
    canvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', () => { isScratching = false; });

    canvas.addEventListener('touchstart', (e) => { isScratching = true; scratch(e); });
    canvas.addEventListener('touchmove', scratch);
    window.addEventListener('touchend', () => { isScratching = false; });
  }

  // Initialize all 3 Scratch Cards
  setupScratchCanvas('scratch-canvas-1', 'Secret Letter');
  setupScratchCanvas('scratch-canvas-2', 'Top 5 Promises');
  setupScratchCanvas('scratch-canvas-3', 'Bucket List');

  /* ------------------------------------------------------------------------
     11. Speech Bubble Quiz (15 QUESTIONS TOTAL!)
     ------------------------------------------------------------------------ */
  const quizQuestions = [
    { question: "1. Who is the funniest in our duo? 😂", options: ["Gundu Priya!", "Me!", "Equally Hilarious!"], correct: 2 },
    { question: "2. What is our main hangout routine? 🛍️", options: ["Fries + Shopping + Gossip", "Gym Workouts", "Both!"], correct: 2 },
    { question: "3. Who talks more on late night phone calls? 📞", options: ["Gundu Priya!", "Me!", "Both non-stop!"], correct: 2 },
    { question: "4. What happens when Gundu Priya gets angry? 😤", options: ["'I'll never talk to you!' (comes back in 5 mins)", "Ignores for 1 sec", "Demands Boba & Fries!"], correct: 0 },
    { question: "5. Who is the ultimate Shopping Spree Queen? 🛍️", options: ["Gundu Priya!", "Me!", "Both RIP Wallets!"], correct: 2 },
    { question: "6. What is our #1 Friendship Rule? ✨", options: ["Always Support Each Other", "Never Judge", "Forever Gundu Priya & Bestie!"], correct: 2 },
    { question: "7. Who takes longer to get ready for an outing? 👗", options: ["Gundu Priya!", "Me!", "Both take 2 hours!"], correct: 0 },
    { question: "8. What is our official mood when food arrives? 🍟", options: ["Silent eating mode 😋", "Photo shoot first 📸", "Dancing with joy! 💃"], correct: 1 },
    { question: "9. Who gives the best advice during drama? 💡", options: ["Gundu Priya!", "Me!", "We solve it together!"], correct: 2 },
    { question: "10. Who is the bigger Drama Queen? 👑", options: ["Gundu Priya (100%)", "Me!", "Both 200% Drama!"], correct: 2 },
    { question: "11. What is Gundu Priya's secret superpower? 🌟", options: ["Making anyone smile instantly", "Unstoppable laughter", "Being the best friend ever!"], correct: 2 },
    { question: "12. How did our friendship start? ✨", options: ["Unplanned & Unexpected bond!", "From Day 1 magic", "Gifted by the Universe!"], correct: 0 },
    { question: "13. Who remembers all inside jokes & dates? 📅", options: ["Gundu Priya!", "Me!", "Both memory champions!"], correct: 2 },
    { question: "14. What is our dream travel plan? ✈️", options: ["Beach Resort Trip", "Shopping Capital Spree", "Road Trip with Endless Music!"], correct: 2 },
    { question: "15. How long will this friendship last? ❤️", options: ["Today, Tomorrow & Forever!", "100+ Years minimum!", "Infinite Lifetime! ✨"], correct: 2 }
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
          qTitle.textContent = "🎉 Gundu Priya & Bestie Quiz Passed! Final Score: " + score + "/150 ✨";
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

    if (modalTitle) modalTitle.textContent = "Gundu Priya Throwback Memory Unlocked! 🎉";
    if (modalImg) modalImg.src = randomPhoto.src;
    if (modalDesc) modalDesc.textContent = randomPhoto.caption;

    if (memoryModalEl && window.bootstrap) {
      const modal = new bootstrap.Modal(memoryModalEl);
      modal.show();
    }
  }

  /* ------------------------------------------------------------------------
     13. Wish Sky Lanterns (Strict Center & Wrap Alignment)
     ------------------------------------------------------------------------ */
  const wishForm = document.getElementById('wishForm');
  const wishInput = document.getElementById('wishInput');
  const lanternsArea = document.getElementById('lanternsArea');

  const defaultWishes = [
    "To 100 more spontaneous shopping sprees with Gundu Priya! 🛍️",
    "May our laugh sessions never end! 😂",
    "Gundu Priya & Bestie today, tomorrow, and forever! 🌟"
  ];

  function renderLanterns() {
    if (!lanternsArea) return;
    const saved = JSON.parse(localStorage.getItem('bff_wishes') || '[]');
    const all = [...defaultWishes, ...saved];
    lanternsArea.innerHTML = '';

    all.forEach((w, i) => {
      const l = document.createElement('div');
      l.className = 'wish-lantern';
      l.style.animationDelay = `${(i * 1.1) % 4}s`;
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
     14. User Heartfelt Quotes Compliment Generator
     ------------------------------------------------------------------------ */
  const compliments = [
    "I take Friendship with Gundu Priya very seriously. For me, it has Commitment, Loyalty, Expectations and Love.",
    "I don't call someone a friend until I genuinely feel love for that person.",
    "Some bonds aren't chosen, they're gifted by the Universe... like Gundu Priya ✨",
    "Unplanned friendship, Unexpected bond, Right time, Right person, that's Gundu Priya! ✨",
    "Friendship is cute when Gundu Priya gets angry with you and says she'll never talk to you, but later comes back just to remind you: 'I'm still angry!' 😤😂"
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

  /* ------------------------------------------------------------------------
     15. PRIVATE SECTION: "Something I Want to Say to You" (Password: sp2003)
     ------------------------------------------------------------------------ */
  const CORRECT_PASS = 'sp2003';
  let isUnlocked = sessionStorage.getItem('priya_notes_unlocked') === 'true';

  const navPrivateBtn = document.getElementById('navPrivateBtn');
  const privateGateForm = document.getElementById('privateGateForm');
  const privatePasswordInput = document.getElementById('privatePasswordInput');
  const passwordErrorAlert = document.getElementById('passwordErrorAlert');
  const passwordGateCard = document.getElementById('passwordGateCard');
  const unlockedNotesContainer = document.getElementById('unlockedNotesContainer');
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');
  const eyeIcon = document.getElementById('eyeIcon');
  const lockVaultBtn = document.getElementById('lockVaultBtn');
  const lockIconCircle = document.getElementById('lockIconCircle');
  const addNewNoteBtn = document.getElementById('addNewNoteBtn');
  const noteEditorForm = document.getElementById('noteEditorForm');
  const noteEditorModal = document.getElementById('noteEditorModal');
  const editNoteId = document.getElementById('editNoteId');
  const noteTitleInput = document.getElementById('noteTitleInput');
  const noteDateInput = document.getElementById('noteDateInput');
  const noteContentInput = document.getElementById('noteContentInput');

  let bootstrapModalInstance = null;
  if (noteEditorModal && window.bootstrap) {
    bootstrapModalInstance = new bootstrap.Modal(noteEditorModal);
  }

  // Header Nav Button Click
  navPrivateBtn?.addEventListener('click', () => {
    const section = document.getElementById('private-notes-section');
    section?.scrollIntoView({ behavior: 'smooth' });
    if (!isUnlocked && privatePasswordInput) {
      setTimeout(() => privatePasswordInput.focus(), 600);
    }
    playPopSound();
  });

  // Show/Hide Password Toggle
  togglePasswordBtn?.addEventListener('click', () => {
    if (privatePasswordInput) {
      if (privatePasswordInput.type === 'password') {
        privatePasswordInput.type = 'text';
        if (eyeIcon) eyeIcon.setAttribute('data-lucide', 'eye-off');
      } else {
        privatePasswordInput.type = 'password';
        if (eyeIcon) eyeIcon.setAttribute('data-lucide', 'eye');
      }
      if (window.lucide) lucide.createIcons();
    }
  });

  function unlockVault() {
    isUnlocked = true;
    sessionStorage.setItem('priya_notes_unlocked', 'true');
    
    if (lockIconCircle) {
      lockIconCircle.style.transform = 'rotate(360deg) scale(1.2)';
    }

    if (window.confetti) confetti({ particleCount: 80, spread: 90, origin: { y: 0.5 } });
    playChimeSound();

    setTimeout(() => {
      window.location.href = 'notes.html';
    }, 500);
  }

  function lockVault() {
    isUnlocked = false;
    sessionStorage.removeItem('priya_notes_unlocked');
    unlockedNotesContainer?.classList.add('d-none');
    passwordGateCard?.classList.remove('d-none');
    if (privatePasswordInput) privatePasswordInput.value = '';
    passwordErrorAlert?.classList.add('d-none');
    if (lockIconCircle) lockIconCircle.style.transform = 'none';
    playPopSound();
  }

  lockVaultBtn?.addEventListener('click', lockVault);

  function verifyAndUnlock() {
    const entered = privatePasswordInput?.value ? privatePasswordInput.value.trim() : '';
    if (entered.toLowerCase() === CORRECT_PASS.toLowerCase()) {
      passwordErrorAlert?.classList.add('d-none');
      unlockVault();
    } else {
      passwordErrorAlert?.classList.remove('d-none');
      passwordGateCard?.classList.remove('shake-anim');
      void passwordGateCard?.offsetWidth; // force reflow
      passwordGateCard?.classList.add('shake-anim');
      playTone(200, 'sawtooth', 0.2, 0.2);
    }
  }

  passwordGateForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    verifyAndUnlock();
  });

  document.getElementById('unlockVaultBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    verifyAndUnlock();
  });

  if (isUnlocked) {
    passwordGateCard?.classList.add('d-none');
    unlockedNotesContainer?.classList.remove('d-none');
    renderNotes();
  }

  /* --- NOTES CRUD LOGIC --- */
  const DEFAULT_NOTES = [
    {
      id: 'note-1',
      title: 'Something I Want to Say to You ✨',
      date: 'Heartfelt Letter • Part 1',
      content: 'Priya,\n\nYou already know how much I like you.\n\nI don’t feel lust towards you. And I can’t even say I’m “in love” with you, because the truth is… I don’t even know what love really is right now.\n\nAll I know is that I don’t lust after you, and I don’t know if this is love either. I won’t say “I’m in love with you” because I feel like those words have limits. What I feel for you goes beyond what I can describe.\n\nI’ve met and dated people before, but I’ve never felt this way about anyone. It’s not because I can’t be with someone else—it’s because, for me, you’re enough. I don’t feel like giving my time, effort, or even my money to anyone else. If I want to do something for someone, it’s you.\n\nPeople say that in a man’s life, there will be one woman who becomes different from everyone else. After her, everyone else is just another person he meets. That’s exactly who you are to me.\n\nYour happiness means more to me than my own.\n\nYou’re like my childhood friend, my best friend, my safe place, my family—everything to me. Please don’t become a stranger as life moves forward.\n\nPeople might think it’s just attraction or that I’m saying all this because of my age. But it isn’t. Even I don’t know why I feel this way. I still haven’t figured it out. I just know that you mean so much to me.\n\nI can’t stay distant from you. I can’t go long without getting scolded by you either.\n\nYou’re the one person whose mood decides how my entire day goes. I don’t even know if you realize that, but it’s true.\n\nDo you know how much I respect you? I’ll give you one example. I can kneel before you anywhere, anytime—not because I’m forced to, not because I’m scared of you, but out of pure respect, admiration, and affection.\n\nIf you tell me something, I’ll listen. If you ask me to leave, I’ll leave.\n\nSo… I’ll stop.\n\nI really miss you sometimes. I wish I could spend more time with you, but I don’t even know if that’ll ever happen.\n\nI just wanted you to know how I truly feel. Nothing more, nothing less.'
    },
    {
      id: 'note-2',
      title: 'There’s Something I’ve Never Told You… 🤍',
      date: 'Heartfelt Letter • Part 2',
      content: 'There’s something I’ve never told you…\n\nI really want to hug you. I want it so badly.\n\nBut I know that if I ever hug you, I’ll probably break down and cry. Not because I’m weak, but because I’ve been holding in so many feelings for so long.\n\nJust being close to you would be enough to make all those emotions come out.\n\n\nYou asked me once, “Surya, are you possessive about me?”\n\nYes, I am.\n\nBut I always remind myself that my possessiveness should never hurt you or take away your freedom. I never want my feelings to become a burden for you.\n\nI just want you to always be the one girl who has a special place in my life. That’s all.\n\nEven when I’m possessive, it’s because I care about you deeply—not because I want to control you.'
    },
    {
      id: 'note-3',
      title: 'You Used to Ask Me, “Why?”… 🌟',
      date: 'Heartfelt Letter • Part 3',
      content: 'You used to ask me, “Why?” Right?\n\nBecause you’re the only person who has truly stood by me. No matter how angry you get with me, you still check on me and look out for me in your own way.\n\nYou’ve done so much for me. You may not always say it out loud, but you’ve done things that many people wouldn’t have done.\n\nYou’ll always be the last girl I’ll truly trust. I don’t know what the future holds, but if there’s one person I’ll always choose, it’s you.\n\nI know many people may come into my life, but I don’t want anyone else. That’s my choice. No matter where life takes us, I’ll always choose you.\n\nAnd yes… if you don’t talk to me, it’ll hurt me more than I can explain. I’ll probably be angry, disappointed, and broken for a while. But even then, I won’t hate you, and I won’t stop caring about you.\n\nSome people become a part of your life for a while. You became a part of who I am. But you’re always on my mind. No matter what I’m doing, you somehow cross my mind every single day.\n\nThe reason I always talk to you is because I never want you to feel alone or hurt. I always want to see you happy, confident, and carrying yourself with the same attitude, strength, and smile that make you who you are. I want my Priya to always have high standards!'
    }
  ];

  function getSavedNotes() {
    const saved = localStorage.getItem('priya_secret_notes');
    if (!saved) return DEFAULT_NOTES;
    try {
      return JSON.parse(saved);
    } catch (e) {
      return DEFAULT_NOTES;
    }
  }

  function saveNotes(notes) {
    localStorage.setItem('priya_secret_notes', JSON.stringify(notes));
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
  }

  function renderNotes() {
    const grid = document.getElementById('privateNotesGrid');
    if (!grid) return;
    const notes = getSavedNotes();

    if (notes.length === 0) {
      grid.innerHTML = `
        <div class="col-12 text-center py-4">
          <p class="text-cyan fs-5">No notes found. Click "Add Note 📝" to write a new note!</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = notes.map(n => `
      <div class="col-lg-4 col-md-6" data-aos="fade-up">
        <div class="note-card shadow-lg">
          <div class="note-card-title">${escapeHtml(n.title)}</div>
          ${n.date ? `<div class="note-card-date">📅 ${escapeHtml(n.date)}</div>` : ''}
          <div class="note-card-content">${escapeHtml(n.content)}</div>
          <div class="note-card-actions">
            <button class="btn-note-action btn-edit" onclick="window.openEditNoteModal('${n.id}')">Edit ✏️</button>
            <button class="btn-note-action btn-delete" onclick="window.deleteNote('${n.id}')">Delete 🗑️</button>
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }

  addNewNoteBtn?.addEventListener('click', () => {
    if (editNoteId) editNoteId.value = '';
    if (noteTitleInput) noteTitleInput.value = '';
    if (noteDateInput) noteDateInput.value = '';
    if (noteContentInput) noteContentInput.value = '';
    document.getElementById('noteModalTitle').textContent = 'Add New Note 📝';
    if (bootstrapModalInstance) bootstrapModalInstance.show();
    playPopSound();
  });

  window.openEditNoteModal = function(id) {
    const notes = getSavedNotes();
    const note = notes.find(n => n.id === id);
    if (!note) return;

    if (editNoteId) editNoteId.value = note.id;
    if (noteTitleInput) noteTitleInput.value = note.title;
    if (noteDateInput) noteDateInput.value = note.date || '';
    if (noteContentInput) noteContentInput.value = note.content;
    document.getElementById('noteModalTitle').textContent = 'Edit Note ✏️';
    if (bootstrapModalInstance) bootstrapModalInstance.show();
    playPopSound();
  };

  window.deleteNote = function(id) {
    if (confirm('Are you sure you want to delete this note?')) {
      let notes = getSavedNotes();
      notes = notes.filter(n => n.id !== id);
      saveNotes(notes);
      renderNotes();
      playPopSound();
    }
  };

  noteEditorForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = editNoteId?.value;
    const title = noteTitleInput?.value.trim();
    const date = noteDateInput?.value.trim();
    const content = noteContentInput?.value.trim();

    if (!title || !content) return;

    let notes = getSavedNotes();

    if (id) {
      // Edit existing note
      const idx = notes.findIndex(n => n.id === id);
      if (idx !== -1) {
        notes[idx] = { id, title, date, content };
      }
    } else {
      // Add new note
      const newId = 'note-' + Date.now();
      notes.unshift({ id: newId, title, date, content });
    }

    saveNotes(notes);
    renderNotes();
    if (bootstrapModalInstance) bootstrapModalInstance.hide();
    playChimeSound();
  });
});

