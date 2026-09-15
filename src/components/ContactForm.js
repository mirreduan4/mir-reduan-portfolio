import { sound } from '../audio/SoundController.js';

export class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.statusEl = document.getElementById('form-status');
    this.submitBtn = document.getElementById('submit-btn');

    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Keystroke sound feedback on focus
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach((input) => {
      input.addEventListener('keydown', (e) => {
        if (e.key.length === 1) {
          sound.playChirp(1200 + Math.random() * 400, 0.02, 'sine');
        }
      });
    });
  }

  handleSubmit() {
    const name = document.getElementById('sender-name')?.value.trim();
    const email = document.getElementById('sender-email')?.value.trim();
    const message = document.getElementById('sender-message')?.value.trim();

    if (!name || !email || !message) {
      this.setStatus('ERROR // ALL TRANSMISSION FIELDS REQUIRED', 'error');
      sound.playChirp(300, 0.15, 'sawtooth');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.setStatus('ERROR // INVALID FREQUENCY FORMAT (EMAIL)', 'error');
      sound.playChirp(300, 0.15, 'sawtooth');
      return;
    }

    // Success simulation with cyber audio and clear feedback
    sound.playTransmission();
    this.submitBtn.disabled = true;
    this.submitBtn.innerHTML = '<span>ENCRYPTING...</span>';

    setTimeout(() => {
      this.setStatus('TRANSMISSION ACKNOWLEDGED // SIGNAL ROUTED TO MIR REDUAN', 'success');
      this.submitBtn.innerHTML = '<span>SIGNAL DISPATCHED</span>';
      this.form.reset();

      setTimeout(() => {
        this.submitBtn.disabled = false;
        this.submitBtn.innerHTML = `
          <span>TRANSMIT PACKET</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        `;
      }, 4000);
    }, 1200);
  }

  setStatus(msg, type) {
    if (!this.statusEl) return;
    this.statusEl.textContent = msg;
    this.statusEl.className = `form-status ${type}`;
  }
}
