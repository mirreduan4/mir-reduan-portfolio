import { sound } from '../audio/SoundController.js';

export class CustomCursor {
  constructor() {
    this.cursorDot = document.getElementById('cursor-dot');
    this.cursorRing = document.getElementById('cursor-ring');

    if (!this.cursorDot || !this.cursorRing) return;

    // Check if device is touch-primary
    if (window.matchMedia('(pointer: coarse)').matches) {
      this.cursorDot.style.display = 'none';
      this.cursorRing.style.display = 'none';
      return;
    }

    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.ring = { x: this.mouse.x, y: this.mouse.y };

    this.init();
  }

  init() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.cursorDot.style.transform = `translate3d(${this.mouse.x}px, ${this.mouse.y}px, 0)`;
    });

    // Add hover scale & sound triggers for interactive elements
    const interactiveSelectors = 'a, button, input, textarea, [data-interactive], .project-card, .skill-pill';
    
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        this.cursorRing.classList.add('cursor-hover');
        sound.playHover();
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        this.cursorRing.classList.remove('cursor-hover');
      }
    });

    document.addEventListener('mousedown', () => {
      this.cursorRing.classList.add('cursor-active');
      sound.playClick();
    });

    document.addEventListener('mouseup', () => {
      this.cursorRing.classList.remove('cursor-active');
    });

    this.render();
  }

  render() {
    // Smooth trailing ring
    this.ring.x += (this.mouse.x - this.ring.x) * 0.16;
    this.ring.y += (this.mouse.y - this.ring.y) * 0.16;

    this.cursorRing.style.transform = `translate3d(${this.ring.x}px, ${this.ring.y}px, 0)`;
    requestAnimationFrame(this.render.bind(this));
  }
}
