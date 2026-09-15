import * as THREE from 'three';

export class Embers {
  constructor(scene, count = 1200) {
    this.scene = scene;
    this.count = count;
    this.init();
  }

  init() {
    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.count * 3);
    const scales = new Float32Array(this.count);
    const velocities = new Float32Array(this.count * 3);
    const colors = new Float32Array(this.count * 3);

    // Color palette: deep red, neon crimson, vivid amber/ruby, and soft rose
    const colorChoices = [
      new THREE.Color('#ff1a3c'),
      new THREE.Color('#ff3b56'),
      new THREE.Color('#d90429'),
      new THREE.Color('#ff758f'),
      new THREE.Color('#9b0018')
    ];

    for (let i = 0; i < this.count; i++) {
      const i3 = i * 3;
      // Spread across a wide 3D space
      positions[i3] = (Math.random() - 0.5) * 45;
      positions[i3 + 1] = (Math.random() - 0.5) * 35;
      positions[i3 + 2] = (Math.random() - 0.5) * 35;

      scales[i] = Math.random() * 0.8 + 0.2;

      velocities[i3] = (Math.random() - 0.5) * 0.008;
      velocities[i3 + 1] = Math.random() * 0.018 + 0.005; // Gentle upward drift
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.008;

      const c = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.velocities = velocities;

    // Create a circular glowing ember sprite
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, 'rgba(255, 42, 75, 0.9)');
    grad.addColorStop(0.65, 'rgba(217, 4, 41, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);

    this.material = new THREE.PointsMaterial({
      size: 0.65,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      sizeAttenuation: true
    });

    this.mesh = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  update(time, mouse) {
    if (!this.geometry) return;
    const positions = this.geometry.attributes.position.array;

    for (let i = 0; i < this.count; i++) {
      const i3 = i * 3;

      // Drift upward and oscillate with sine wave
      positions[i3 + 1] += this.velocities[i3 + 1];
      positions[i3] += Math.sin(time * 0.5 + i) * 0.005;
      positions[i3 + 2] += Math.cos(time * 0.5 + i) * 0.005;

      // Subtle mouse gravity influence
      positions[i3] += mouse.x * 0.004;
      positions[i3 + 1] += mouse.y * 0.004;

      // Wrap around bounds
      if (positions[i3 + 1] > 18) {
        positions[i3 + 1] = -18;
        positions[i3] = (Math.random() - 0.5) * 45;
        positions[i3 + 2] = (Math.random() - 0.5) * 35;
      }
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.mesh.rotation.y = time * 0.02;
  }

  destroy() {
    if (this.mesh) {
      this.scene.remove(this.mesh);
      this.geometry.dispose();
      this.material.dispose();
    }
  }
}
