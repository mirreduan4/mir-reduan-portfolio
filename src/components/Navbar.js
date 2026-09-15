import { sound } from '../audio/SoundController.js';

export class Navbar {
  constructor() {
    this.audioBtn = document.getElementById('audio-toggle');
    this.audioIndicator = document.getElementById('audio-indicator');
    this.audioLabel = document.getElementById('audio-label');
    this.clockEl = document.getElementById('live-clock');

    this.init();
  }

  init() {
    // Audio Toggle Handler
    if (this.audioBtn) {
      this.audioBtn.addEventListener('click', () => {
        const isAudioActive = this.audioBtn.classList.toggle('active');
        const active = sound.toggleMute();
        
        if (active) {
          if (this.audioIndicator) this.audioIndicator.classList.add('active');
          if (this.audioLabel) this.audioLabel.textContent = 'AUDIO: ON';
        } else {
          if (this.audioIndicator) this.audioIndicator.classList.remove('active');
          if (this.audioLabel) this.audioLabel.textContent = 'AUDIO: OFF';
        }
      });
    }

    // Live clock update
    this.updateClock();
    setInterval(this.updateClock.bind(this), 1000);
  }

  updateClock() {
    if (!this.clockEl) return;
    const now = new Date();
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMins = String(now.getUTCMinutes()).padStart(2, '0');
    const utcSecs = String(now.getUTCSeconds()).padStart(2, '0');
    this.clockEl.textContent = `UTC ${utcHours}:${utcMins}:${utcSecs}`;
  }
}
