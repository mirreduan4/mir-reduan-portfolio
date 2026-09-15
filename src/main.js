import { SceneManager } from './three/SceneManager.js';
import { CustomCursor } from './animations/cursor.js';
import { TextScramble } from './animations/textScramble.js';
import { ScrollController } from './animations/scrollController.js';
import { Navbar } from './components/Navbar.js';
import { ProjectModal } from './components/ProjectModal.js';
import { ContactForm } from './components/ContactForm.js';
import { projects } from './data/projectsData.js';
import { skillCategories, statistics } from './data/skillsData.js';
import { timelineEvents } from './data/timelineData.js';
import { sound } from './audio/SoundController.js';

class PortfolioApp {
  constructor() {
    this.initPreloader();
  }

  async initPreloader() {
    const preloader = document.getElementById('preloader');
    const fill = document.getElementById('loader-bar-fill');
    const status = document.getElementById('loader-status');

    const steps = [
      { pct: 25, label: 'COMPILING SHADER PIPELINE...' },
      { pct: 55, label: 'INITIALIZING 3D WEBGL VIEWPORT...' },
      { pct: 85, label: 'CALIBRATING CRIMSON EMBER SIMULATION...' },
      { pct: 100, label: 'SYSTEM READY // WELCOME TO ARCHIVE' }
    ];

    for (const step of steps) {
      if (fill) fill.style.width = `${step.pct}%`;
      if (status) status.textContent = step.label;
      await new Promise((r) => setTimeout(r, 220));
    }

    await new Promise((r) => setTimeout(r, 300));
    if (preloader) {
      preloader.classList.add('loaded');
    }

    // Boot main application components
    this.startApp();
  }

  startApp() {
    // 1. Initialize WebGL 3D Scene
    const canvasContainer = document.getElementById('webgl-canvas-container');
    this.sceneManager = new SceneManager(canvasContainer);

    // 2. Initialize Custom Reticle Cursor
    this.cursor = new CustomCursor();

    // 3. Initialize Navbar
    this.navbar = new Navbar();

    // 4. Initialize Project Modal
    this.modal = new ProjectModal();

    // 5. Initialize Contact Form
    this.contactForm = new ContactForm();

    // 6. Initialize Smooth Scroll Controller
    this.scrollController = new ScrollController(this.sceneManager);

    // 7. Render dynamic HTML data sections
    this.renderStats();
    this.renderSkills();
    this.renderProjects();
    this.renderTimeline();

    // 8. Initialize Text Scramble on Hero Subtitle
    this.initTextScramble();

    // 9. Initialize Interactive Lab controls
    this.initLabControls();
  }

  renderStats() {
    const container = document.getElementById('stats-container');
    if (!container) return;

    container.innerHTML = statistics
      .map(
        (stat) => `
      <div class="stat-box">
        <div class="stat-number">
          ${stat.prefix || ''}${stat.value}${stat.suffix || ''}
        </div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `
      )
      .join('');
  }

  renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;

    container.innerHTML = skillCategories
      .map(
        (cat) => `
      <div class="cyber-card">
        <h3 style="font-family: var(--font-display); font-size: 1.25rem; color: #fff; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
          <span>${cat.name}</span>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-red);">// STACK</span>
        </h3>
        <div>
          ${cat.skills
            .map(
              (skill) => `
            <div class="skill-row">
              <span class="skill-name">${skill.name}</span>
              <span class="skill-tag">${skill.tag}</span>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `
      )
      .join('');
  }

  renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = projects
      .map(
        (p) => `
      <div class="cyber-card project-card" data-project-id="${p.id}" data-interactive>
        <div>
          <div class="project-category">${p.category}</div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
        </div>

        <div>
          <div class="project-tags">
            ${p.tags.map((t) => `<span class="tag-badge">${t}</span>`).join('')}
          </div>

          <div class="project-card-footer">
            <span class="view-details-link">
              <span>INSPECT SCHEMATIC</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-red);">
              [REF: 0x${Math.floor(Math.random() * 8999 + 1000).toString(16).toUpperCase()}]
            </span>
          </div>
        </div>
      </div>
    `
      )
      .join('');

    // Attach click listeners to open project modal
    container.querySelectorAll('.project-card').forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-project-id');
        this.modal.open(id);
      });
    });
  }

  renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    container.innerHTML = timelineEvents
      .map(
        (event) => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-year">${event.year} // ${event.badge}</div>
        <h3 class="timeline-role">${event.role}</h3>
        <div class="timeline-org">${event.organization}</div>
        <p class="timeline-desc">${event.description}</p>
        <ul class="timeline-highlights">
          ${event.highlights
            .map((h) => `<li class="timeline-highlight-item">${h}</li>`)
            .join('')}
        </ul>
      </div>
    `
      )
      .join('');
  }

  initTextScramble() {
    const subtitleEl = document.getElementById('scramble-title');
    if (!subtitleEl) return;

    const scrambler = new TextScramble(subtitleEl);
    const phrases = [
      'CREATIVE TECHNOLOGIST // FULL-STACK ARCHITECT',
      '3D WEBGL DEVELOPER // GLSL SHADER SPECIALIST',
      'CLOUD SYSTEMS ENGINEER // NEXTGEN UI ARCHITECT',
      'AI SOLUTIONS & REAL-TIME GRAPH VISUALIZER'
    ];

    let counter = 0;
    const nextPhrase = () => {
      scrambler.setText(phrases[counter]).then(() => {
        setTimeout(nextPhrase, 3500);
      });
      counter = (counter + 1) % phrases.length;
    };

    nextPhrase();
  }

  initLabControls() {
    const btnNormal = document.getElementById('core-speed-normal');
    const btnOverclock = document.getElementById('core-speed-overclock');

    if (btnNormal && btnOverclock && this.sceneManager.artifact) {
      btnNormal.addEventListener('click', () => {
        this.sceneManager.artifact.setPulseRate(1.0);
        btnNormal.className = 'cyber-btn cyber-btn-primary';
        btnOverclock.className = 'cyber-btn cyber-btn-secondary';
        sound.playChirp(600, 0.08, 'triangle');
      });

      btnOverclock.addEventListener('click', () => {
        this.sceneManager.artifact.setPulseRate(3.5);
        btnOverclock.className = 'cyber-btn cyber-btn-primary';
        btnNormal.className = 'cyber-btn cyber-btn-secondary';
        sound.playChirp(1200, 0.12, 'sawtooth');
      });
    }
  }
}

// Instantiate once DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});
