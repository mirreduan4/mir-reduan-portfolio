import { sound } from '../audio/SoundController.js';
import { projects } from '../data/projectsData.js';

export class ProjectModal {
  constructor() {
    this.dialog = document.getElementById('project-modal');
    this.titleEl = document.getElementById('modal-title');
    this.categoryEl = document.getElementById('modal-category');
    this.subtitleEl = document.getElementById('modal-subtitle');
    this.descEl = document.getElementById('modal-desc');
    this.tagsEl = document.getElementById('modal-tags');
    this.metricsEl = document.getElementById('modal-metrics');
    this.demoBtn = document.getElementById('modal-demo-btn');
    this.repoBtn = document.getElementById('modal-repo-btn');
    this.closeBtn = document.getElementById('modal-close');

    this.init();
  }

  init() {
    if (!this.dialog) return;

    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Light dismiss (click backdrop to close)
    this.dialog.addEventListener('click', (e) => {
      const rect = this.dialog.getBoundingClientRect();
      const isInDialog =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!isInDialog) {
        this.close();
      }
    });

    // Handle ESC key
    this.dialog.addEventListener('cancel', () => {
      sound.playClick();
    });
  }

  open(projectId) {
    const project = projects.find((p) => p.id === projectId);
    if (!project || !this.dialog) return;

    sound.playChirp(720, 0.08, 'triangle');

    this.titleEl.textContent = project.title;
    this.categoryEl.textContent = project.category;
    this.subtitleEl.textContent = project.subtitle;
    this.descEl.textContent = project.description;

    // Tags
    this.tagsEl.innerHTML = project.tags
      .map((t) => `<span class="tag-badge">${t}</span>`)
      .join('');

    // Metrics
    this.metricsEl.innerHTML = project.metrics
      .map(
        (m) => `
        <div class="stat-box" style="padding: 1rem;">
          <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); margin-bottom: 0.25rem;">${m.label}</div>
          <div style="font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; color: #fff;">${m.value}</div>
        </div>
      `
      )
      .join('');

    // Links
    if (this.demoBtn) this.demoBtn.href = project.liveUrl;
    if (this.repoBtn) this.repoBtn.href = project.repoUrl;

    this.dialog.showModal();
  }

  close() {
    if (this.dialog && this.dialog.open) {
      sound.playClick();
      this.dialog.close();
    }
  }
}
