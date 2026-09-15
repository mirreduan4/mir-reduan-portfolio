import * as THREE from 'three';

export class HologramPortrait {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.targetRotation = { x: 0, y: 0 };
    this.currentRotation = { x: 0, y: 0 };
    this.init();
  }

  init() {
    const loader = new THREE.TextureLoader();
    
    // Load the user's high-impact portrait
    loader.load('/image/portarit.png.png', (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;

      // Card geometry matching portrait aspect ratio (approx 4:5 or 3.2:4)
      const width = 3.6;
      const height = 4.6;
      const planeGeo = new THREE.PlaneGeometry(width, height, 32, 32);

      // Material for portrait plane
      const planeMat = new THREE.MeshPhysicalMaterial({
        map: texture,
        transparent: true,
        roughness: 0.2,
        metalness: 0.1,
        clearcoat: 0.5,
        clearcoatRoughness: 0.1,
        side: THREE.DoubleSide
      });

      this.portraitMesh = new THREE.Mesh(planeGeo, planeMat);
      this.portraitMesh.position.z = 0.05;
      this.group.add(this.portraitMesh);

      // Futuristic glass backing plate
      const backGeo = new THREE.BoxGeometry(width + 0.15, height + 0.15, 0.08);
      const backMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#0a0a0e'),
        roughness: 0.3,
        metalness: 0.8,
        reflectivity: 0.9,
        clearcoat: 0.8
      });
      const backMesh = new THREE.Mesh(backGeo, backMat);
      backMesh.position.z = -0.02;
      this.group.add(backMesh);

      // Crimson Neon Rim Border Frame
      const wireEdges = new THREE.EdgesGeometry(backGeo);
      const wireMat = new THREE.LineBasicMaterial({
        color: new THREE.Color('#ff2a4b'),
        linewidth: 2,
        transparent: true,
        opacity: 0.85
      });
      const wireframe = new THREE.LineSegments(wireEdges, wireMat);
      wireframe.position.z = -0.01;
      this.group.add(wireframe);

      // Atmospheric crimson backlight halo
      const glowGeo = new THREE.PlaneGeometry(width * 1.35, height * 1.35);
      
      const glowCanvas = document.createElement('canvas');
      glowCanvas.width = 128;
      glowCanvas.height = 128;
      const ctx = glowCanvas.getContext('2d');
      const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 64);
      grad.addColorStop(0, 'rgba(255, 26, 60, 0.6)');
      grad.addColorStop(0.5, 'rgba(217, 4, 41, 0.25)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);

      const glowTex = new THREE.CanvasTexture(glowCanvas);
      const glowMat = new THREE.MeshBasicMaterial({
        map: glowTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      });

      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      glowMesh.position.z = -0.25;
      this.group.add(glowMesh);

      // Positioning in scene
      this.group.position.set(2.8, 0, 0);
      this.scene.add(this.group);
    });
  }

  update(time, mouse) {
    if (!this.group) return;

    // Smooth floating hovering animation
    this.group.position.y = Math.sin(time * 1.2) * 0.15;

    // Mouse tilt tracking
    this.targetRotation.y = mouse.x * 0.28;
    this.targetRotation.x = -mouse.y * 0.22;

    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.08;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.08;

    this.group.rotation.x = this.currentRotation.x;
    this.group.rotation.y = this.currentRotation.y;
    this.group.rotation.z = Math.sin(time * 0.8) * 0.02;
  }

  setResponsivePosition(isMobile) {
    if (!this.group) return;
    if (isMobile) {
      this.group.position.set(0, 0.6, -1.5);
      this.group.scale.set(0.72, 0.72, 0.72);
    } else {
      this.group.position.set(2.6, 0.1, 0);
      this.group.scale.set(1, 1, 1);
    }
  }

  destroy() {
    if (this.group) {
      this.scene.remove(this.group);
    }
  }
}
