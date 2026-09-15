import * as THREE from 'three';
import { Embers } from './Embers.js';
import { HologramPortrait } from './HologramPortrait.js';
import { GeometricArtifact } from './GeometricArtifact.js';

export class SceneManager {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollY = 0;
    this.targetScrollY = 0;
    this.clock = new THREE.Clock();

    this.init();
    this.initLights();
    this.initObjects();
    this.addEvents();
    this.animate();
  }

  init() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x060608, 0.025);

    this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 0.1, 100);
    this.camera.position.set(0, 0, 7.5);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    this.container.appendChild(this.renderer.domElement);
  }

  initLights() {
    // Ambient dark base
    const ambient = new THREE.AmbientLight(0x0a0a10, 2.0);
    this.scene.add(ambient);

    // Primary Crimson Neon Rim Light
    this.rimLight = new THREE.PointLight(0xff1a3c, 12, 25);
    this.rimLight.position.set(4, 2, 3);
    this.scene.add(this.rimLight);

    // Secondary Ruby Fill Light
    this.fillLight = new THREE.PointLight(0x9b0018, 6, 20);
    this.fillLight.position.set(-4, -1, 2);
    this.scene.add(this.fillLight);

    // Soft cool accent light from top
    const coolRim = new THREE.DirectionalLight(0x8899aa, 0.8);
    coolRim.position.set(0, 5, -2);
    this.scene.add(coolRim);
  }

  initObjects() {
    this.embers = new Embers(this.scene, 1400);
    this.hologram = new HologramPortrait(this.scene);
    this.artifact = new GeometricArtifact(this.scene);

    this.checkResponsive();
  }

  addEvents() {
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: true });
  }

  onMouseMove(e) {
    this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  onTouchMove(e) {
    if (e.touches.length > 0) {
      this.mouse.targetX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
    }
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.checkResponsive();
  }

  checkResponsive() {
    const isMobile = this.width < 768;
    if (this.hologram) {
      this.hologram.setResponsivePosition(isMobile);
    }
  }

  updateScroll(scrollRatio) {
    // scrollRatio: 0 (top) to 1 (bottom of document)
    this.targetScrollY = scrollRatio;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // Smooth mouse lerp
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Smooth scroll interpolation
    this.scrollY += (this.targetScrollY - this.scrollY) * 0.08;

    // Camera motion choreography tied to scroll and mouse
    const cameraBaseY = -this.scrollY * 32;
    this.camera.position.y = cameraBaseY + this.mouse.y * 0.3;
    this.camera.position.x = this.mouse.x * 0.4;
    this.camera.rotation.y = -this.mouse.x * 0.03;
    this.camera.rotation.x = this.mouse.y * 0.02;

    // Dynamic light movement
    if (this.rimLight) {
      this.rimLight.position.x = 3.5 + Math.sin(time * 0.8) * 0.8;
      this.rimLight.position.y = cameraBaseY + 2 + Math.cos(time * 0.6) * 0.5;
    }

    // Update 3D components
    if (this.embers) {
      this.embers.update(time, this.mouse);
    }
    if (this.hologram) {
      this.hologram.update(time, this.mouse);
    }
    if (this.artifact) {
      this.artifact.update(time, this.mouse);
    }

    this.renderer.render(this.scene, this.camera);
  }
}
