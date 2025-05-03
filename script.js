// Memories auto focus & code check
function setupMemoriesForm() {
  const inputs = document.querySelectorAll('.code-input');
  inputs.forEach((input, idx) => {
    input.addEventListener('input', (e) => {
      if (e.target.value.length === 1 && idx < inputs.length - 1) {
        inputs[idx + 1].focus();
      }
      checkCode();
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && idx > 0) {
        inputs[idx - 1].focus();
      }
    });
  });
}
setupMemoriesForm();

function checkCode() {
  const code = Array.from(document.querySelectorAll('.code-input')).map(i => i.value).join('').toLowerCase();
  if (code === '0902') {
    showCountdown();
  }
}

function showCountdown() {
  document.getElementById('main-content').innerHTML = `
    <div class="countdown-container">
      <div id="countdown" style="
        font-size: 72px; 
        font-weight: bold;
        color: #b8d8ff;
        text-shadow: 0 0 20px rgba(184, 216, 255, 0.3);
        animation: pulse 1s infinite alternate;
      ">5</div>
    </div>
  `;
  let count = 5;
  const countdownEl = document.getElementById('countdown');
  const timer = setInterval(() => {
    count--;
    countdownEl.textContent = count;
    if (count <= 0) {
      clearInterval(timer);
      showAnniversaryPage();
    }
  }, 1000);
}

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const closeBtn = document.querySelector('.modal-close');
  
  // Open modal
  document.querySelectorAll('.show-modal').forEach(img => {
    img.addEventListener('click', function() {
      modal.classList.add('show');
      modalImg.src = this.src;
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close modal
  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
  
  closeBtn.addEventListener('click', closeModal);
  
  // Close when clicking outside the image
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Close with escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
});

// Music player functionality
const audioEl = document.getElementById('audio');
const musicPlayer = document.querySelector('.music-player');
if(audioEl && musicPlayer) {
  audioEl.addEventListener('play', ()=> musicPlayer.classList.add('playing'));
  audioEl.addEventListener('pause', ()=> musicPlayer.classList.remove('playing'));
}

// Music player controls
const playBtn = document.getElementById('play-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
let isPlaying = false;

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = '&#10073;&#10073;'; // pause icon
  } else {
    audio.pause();
    playBtn.innerHTML = '&#9654;'; // play icon
  }
});

audio.addEventListener('play', () => { 
  isPlaying = true; 
  playBtn.innerHTML = '&#10073;&#10073;'; 
});

audio.addEventListener('pause', () => { 
  isPlaying = false; 
  playBtn.innerHTML = '&#9654;'; 
});

audio.addEventListener('timeupdate', () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
  progressBar.max = Math.floor(audio.duration);
  durationEl.textContent = formatTime(audio.duration);
});

progressBar.addEventListener('input', () => {
  audio.currentTime = progressBar.value;
});

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

// Floating heart effect
const blessingBox = document.querySelector('.blessing-box');
function createHeart() {
  const heart = document.createElement('span');
  heart.className = 'blessing-heart';
  heart.innerHTML = '💗';
  heart.style.left = (Math.random() * 80 + 10) + 'px';
  heart.style.bottom = '10px';
  heart.style.fontSize = (Math.random() * 10 + 20) + 'px';
  heart.style.opacity = Math.random() * 0.4 + 0.6;
  blessingBox.appendChild(heart);
  setTimeout(() => heart.remove(), 2800);
}

setInterval(createHeart, 1200);

function showAnniversaryPage() {
  document.getElementById('main-content').innerHTML = `
    <div class="container">
      <div class="title">
        <span class="star">✦</span>
        Happy<br>
        <span class="star2">✦</span>
      </div>
      <div class="subtitle">3 month <span class="party">🎉</span></div>
      <div class="images">
        <img class="img-small show-modal floating-left" src="3.jpg" style="cursor:pointer;">
        <img class="img-main show-modal floating-main" src="1.jpg" style="cursor:pointer;">
        <img class="img-small2 show-modal floating-right" src="4.jpg" alt="img2" style="cursor:pointer;">
      </div>
      <!-- Music Player -->
      <div class="music-player">
        <div class="music-info">
          <img class="music-cover" src="cover.png" alt="cover">
          <div class="music-title-group">
            <div class="music-title">ตรงนี้ตลอดไป</div>
            <div class="music-artist">No One Else</div>
          </div>
        </div>
        <div class="music-progress-group">
          <span class="music-time" id="current-time">00:00</span>
          <input type="range" id="progress-bar" value="0" min="0" max="244" step="1">
          <span class="music-time" id="duration">04:04</span>
        </div>
        <div class="music-controls">
          <button id="prev-btn" class="music-btn">&#9664;&#9664;</button>
          <button id="play-btn" class="music-btn">&#9654;</button>
          <button id="next-btn" class="music-btn">&#9654;&#9654;</button>
        </div>
        <audio id="audio" src="song.mp3"></audio>
      </div>
      <!-- Blessing Box -->
      <div class="blessing-box">
        <span class="blessing-star">✦</span>
        <div class="blessing-message">
          Happy anniversary 3 months na babe<br>
          <br>
          I will take good care of you every month and every year and Ten years from now I want to see myself loving same person that I love today and it's you
          <br>
        </div>
      </div>
    </div>
  `;
  attachAnniversaryEvents();
}

function attachAnniversaryEvents() {
  // Modal
  document.querySelectorAll('.show-modal').forEach(img => {
    img.addEventListener('click', function() {
      const modal = document.getElementById('imageModal');
      const modalImg = document.getElementById('modalImage');
      modal.classList.add('show');
      modalImg.src = this.src;
      document.body.style.overflow = 'hidden';
    });
  });
  const modal = document.getElementById('imageModal');
  const closeBtn = document.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.onclick = function() {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    };
  }
  if (modal) {
    modal.onclick = function(e) {
      if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
      }
    };
  }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });

  // Music Player
  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('play-btn');
  const progressBar = document.getElementById('progress-bar');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');
  if (audio && playBtn && progressBar && currentTimeEl && durationEl) {
    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '&#10073;&#10073;';
      } else {
        audio.pause();
        playBtn.innerHTML = '&#9654;';
      }
    });
    audio.addEventListener('play', () => { playBtn.innerHTML = '&#10073;&#10073;'; });
    audio.addEventListener('pause', () => { playBtn.innerHTML = '&#9654;'; });
    audio.addEventListener('timeupdate', () => {
      progressBar.value = Math.floor(audio.currentTime);
      currentTimeEl.textContent = formatTime(audio.currentTime);
    });
    audio.addEventListener('loadedmetadata', () => {
      progressBar.max = Math.floor(audio.duration);
      durationEl.textContent = formatTime(audio.duration);
    });
    progressBar.addEventListener('input', () => {
      audio.currentTime = progressBar.value;
    });
  }

  // Floating heart effect
  const blessingBox = document.querySelector('.blessing-box');
  if (blessingBox) {
    function createHeart() {
      const heart = document.createElement('span');
      heart.className = 'blessing-heart';
      heart.innerHTML = '💗';
      heart.style.left = (Math.random() * 80 + 10) + 'px';
      heart.style.bottom = '10px';
      heart.style.fontSize = (Math.random() * 10 + 20) + 'px';
      heart.style.opacity = Math.random() * 0.4 + 0.6;
      blessingBox.appendChild(heart);
      setTimeout(() => heart.remove(), 2800);
    }
    setInterval(createHeart, 1200);
  }
}

alert('JS loaded!'); 
