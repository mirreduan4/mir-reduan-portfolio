'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { soundSynth } from '@/lib/soundSynth';

interface PortraitCanvasProps {
  scrollProgress: number; // 0 to 1
  mousePos: { x: number; y: number };
  dragOffset?: { x: number; y: number };
  isCorePulseActive?: boolean;
  onCoreClick?: () => void;
}

export const PortraitCanvas: React.FC<PortraitCanvasProps> = ({
  scrollProgress,
  mousePos,
  dragOffset = { x: 0, y: 0 },
  onCoreClick,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const portraitMeshRef = useRef<THREE.Mesh | null>(null);
  const portraitMatRef = useRef<THREE.ShaderMaterial | null>(null);
  const fgParticlesRef = useRef<THREE.Points | null>(null);
  const bgParticlesRef = useRef<THREE.Points | null>(null);
  const rimLightRef = useRef<THREE.PointLight | null>(null);
  const coreGroupRef = useRef<THREE.Group | null>(null);
  const coreInnerRef = useRef<THREE.Mesh | null>(null);
  const coreRingsRef = useRef<THREE.Mesh[]>([]);
  const coreParticlesRef = useRef<THREE.Points | null>(null);
  const pulseIntensityRef = useRef<number>(0);
  const frameIdRef = useRef<number>(0);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());

  // Smooth interpolation references
  const targetScrollRef = useRef<number>(0);
  const currentScrollRef = useRef<number>(0);
  const targetMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetDragRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentDragRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    targetScrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    targetMouseRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    targetDragRef.current = dragOffset;
  }, [dragOffset]);

  // Handle Core Trigger
  const triggerCorePulse = () => {
    pulseIntensityRef.current = 1.0;
    soundSynth.playTick(240, 0.18); // Low pulse resonance
    if (onCoreClick) onCoreClick();
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Depth Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.038);
    sceneRef.current = scene;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.2);
    cameraRef.current = camera;

    // 3. WebGL Renderer with High Performance
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0a0809, 2.2);
    scene.add(ambientLight);

    // Primary Crimson Neon Rim Light
    const rimLight = new THREE.PointLight(0xc1121f, 16, 28);
    rimLight.position.set(4.0, 1.8, 4.0);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // Secondary Burgundy Fill Light
    const fillLight = new THREE.PointLight(0x350b10, 8, 22);
    fillLight.position.set(-4.0, -1.2, 3.0);
    scene.add(fillLight);

    // Subtle Warm Vintage Directional Light
    const vintageLight = new THREE.DirectionalLight(0xc8794a, 0.65);
    vintageLight.position.set(2, 6, -2);
    scene.add(vintageLight);

    // 5. Background Ambient Glow Mesh behind portrait
    const bgGlowGeo = new THREE.PlaneGeometry(16, 16);
    const bgGlowCanvas = document.createElement('canvas');
    bgGlowCanvas.width = 128;
    bgGlowCanvas.height = 128;
    const bgGlowCtx = bgGlowCanvas.getContext('2d');
    if (bgGlowCtx) {
      const g = bgGlowCtx.createRadialGradient(64, 64, 10, 64, 64, 64);
      g.addColorStop(0, 'rgba(193, 18, 31, 0.45)');
      g.addColorStop(0.4, 'rgba(53, 11, 16, 0.22)');
      g.addColorStop(1, 'rgba(5, 5, 5, 0)');
      bgGlowCtx.fillStyle = g;
      bgGlowCtx.fillRect(0, 0, 128, 128);
    }
    const bgGlowTex = new THREE.CanvasTexture(bgGlowCanvas);
    const bgGlowMat = new THREE.MeshBasicMaterial({
      map: bgGlowTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const bgGlowMesh = new THREE.Mesh(bgGlowGeo, bgGlowMat);
    bgGlowMesh.position.set(1.8, 0, -2.5);
    scene.add(bgGlowMesh);

    // 6. ENORMOUS Seamless 2.5D Portrait (NO Box, NO Frame, NO Card)
    const pHeight = 10.2;
    const pWidth = pHeight * 0.8003;
    const portraitGeo = new THREE.PlaneGeometry(pWidth, pHeight, 32, 32);

    // Custom Shader Material that softly feathers the edges into the dark void
    const portraitShaderMat = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: null },
        uOpacity: { value: 1.0 },
        uRimColor: { value: new THREE.Color('#c1121f') },
        uTime: { value: 0 },
        uPulse: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vViewPosition;

        void main() {
          vUv = uv;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        uniform float uOpacity;
        uniform vec3 uRimColor;
        uniform float uTime;
        uniform float uPulse;
        varying vec2 vUv;

        void main() {
          vec4 tex = texture2D(map, vUv);

          // Soft edge feathering so there is ZERO hard rectangular boundary
          float edgeX = smoothstep(0.0, 0.14, vUv.x) * smoothstep(1.0, 0.86, vUv.x);
          float edgeY = smoothstep(0.0, 0.16, vUv.y) * smoothstep(1.0, 0.94, vUv.y);
          float feather = edgeX * edgeY;

          vec3 col = tex.rgb;

          // Subtle pulse flash on Core activation
          col += uRimColor * uPulse * 0.25;

          gl_FragColor = vec4(col, tex.a * feather * uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    portraitMatRef.current = portraitShaderMat;

    const portraitMesh = new THREE.Mesh(portraitGeo, portraitShaderMat);
    portraitMeshRef.current = portraitMesh;

    // Load original portrait
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      '/images/portrait.png',
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        portraitShaderMat.uniforms.map.value = texture;

        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          portraitMesh.position.set(0.3, -0.4, -0.6);
          portraitMesh.scale.set(0.85, 0.85, 0.85);
        } else {
          portraitMesh.position.set(1.9, -0.2, 0.1);
          portraitMesh.scale.set(1.08, 1.08, 1.08);
        }

        scene.add(portraitMesh);
      },
      undefined,
      (err) => console.warn('Portrait texture load fallback', err)
    );

    // 7. Depth Layering: Dual Particle Systems (Background + Foreground)
    const createParticleCloud = (count: number, zMin: number, zMax: number, size: number) => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);
      const vels = new Float32Array(count * 3);

      const palette = [
        new THREE.Color('#c1121f'),
        new THREE.Color('#ff2635'),
        new THREE.Color('#8b0000'),
        new THREE.Color('#c8794a'),
        new THREE.Color('#350b10'),
      ];

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        pos[i3] = (Math.random() - 0.5) * 38;
        pos[i3 + 1] = (Math.random() - 0.5) * 32;
        pos[i3 + 2] = zMin + Math.random() * (zMax - zMin);

        vels[i3] = (Math.random() - 0.5) * 0.005;
        vels[i3 + 1] = Math.random() * 0.014 + 0.004;
        vels[i3 + 2] = (Math.random() - 0.5) * 0.005;

        const c = palette[Math.floor(Math.random() * palette.length)];
        cols[i3] = c.r;
        cols[i3 + 1] = c.g;
        cols[i3 + 2] = c.b;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));

      const dotCanvas = document.createElement('canvas');
      dotCanvas.width = 32;
      dotCanvas.height = 32;
      const dCtx = dotCanvas.getContext('2d');
      if (dCtx) {
        const g = dCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
        g.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        g.addColorStop(0.3, 'rgba(255, 38, 53, 0.65)');
        g.addColorStop(0.7, 'rgba(139, 0, 0, 0.2)');
        g.addColorStop(1, 'rgba(0, 0, 0, 0)');
        dCtx.fillStyle = g;
        dCtx.fillRect(0, 0, 32, 32);
      }
      const dotTex = new THREE.CanvasTexture(dotCanvas);

      const mat = new THREE.PointsMaterial({
        size,
        map: dotTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true,
        sizeAttenuation: true,
      });

      const pts = new THREE.Points(geo, mat);
      (pts as unknown as { velocities: Float32Array }).velocities = vels;
      return pts;
    };

    const isMobile = window.innerWidth < 768;
    const bgCount = isMobile ? 300 : 700;
    const bgParticles = createParticleCloud(bgCount, -8, -1.5, 0.5);
    scene.add(bgParticles);
    bgParticlesRef.current = bgParticles;

    const fgCount = isMobile ? 150 : 350;
    const fgParticles = createParticleCloud(fgCount, 0.5, 5.5, 0.65);
    scene.add(fgParticles);
    fgParticlesRef.current = fgParticles;

    // 8. SECTION 8: REDOXIDE CORE — SIGNATURE 3D OBJECT
    // Small dark-red luminous 3D core integrated into the world
    const coreGroup = new THREE.Group();
    coreGroupRef.current = coreGroup;

    // Dark metallic/glass outer core
    const coreOuterGeo = new THREE.IcosahedronGeometry(0.32, 2);
    const coreOuterMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#18090d'),
      emissive: new THREE.Color('#350b10'),
      metalness: 0.85,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.88,
    });
    const coreOuter = new THREE.Mesh(coreOuterGeo, coreOuterMat);
    coreGroup.add(coreOuter);

    // Glowing Inner Nucleus
    const coreInnerGeo = new THREE.OctahedronGeometry(0.18, 0);
    const coreInnerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ff2635'),
      wireframe: true,
    });
    const coreInner = new THREE.Mesh(coreInnerGeo, coreInnerMat);
    coreGroup.add(coreInner);
    coreInnerRef.current = coreInner;

    // Electromagnetic Orbiting Torus Rings
    const ring1Geo = new THREE.TorusGeometry(0.48, 0.008, 16, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#c1121f'),
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(0.56, 0.006, 16, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ff4d6d'),
      transparent: true,
      opacity: 0.45,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);
    coreRingsRef.current = [ring1, ring2];

    // Swirling Core Micro-Particles
    const corePCount = 45;
    const corePGeo = new THREE.BufferGeometry();
    const corePPos = new Float32Array(corePCount * 3);
    for (let i = 0; i < corePCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = 0.5 + Math.random() * 0.35;
      corePPos[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
      corePPos[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
      corePPos[i * 3 + 2] = rad * Math.cos(phi);
    }
    corePGeo.setAttribute('position', new THREE.BufferAttribute(corePPos, 3));
    const corePMat = new THREE.PointsMaterial({
      size: 0.08,
      color: new THREE.Color('#ff2635'),
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    const coreParticles = new THREE.Points(corePGeo, corePMat);
    coreGroup.add(coreParticles);
    coreParticlesRef.current = coreParticles;

    // Position Core strategically: hovering near hero/about transition
    coreGroup.position.set(-2.4, 0.6, 1.8);
    scene.add(coreGroup);

    // Raycaster for Core Click & Hover Detection
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handlePointerDown = (e: MouseEvent) => {
      mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouseVector, camera);

      const intersects = raycaster.intersectObjects([coreOuter, coreInner], true);
      if (intersects.length > 0) {
        triggerCorePulse();
      }
    };

    window.addEventListener('mousedown', handlePointerDown);

    // 9. Responsive Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (portraitMeshRef.current) {
        const mobile = w < 768;
        if (mobile) {
          portraitMeshRef.current.position.set(0.3, -0.4, -0.6);
          portraitMeshRef.current.scale.set(0.85, 0.85, 0.85);
          if (coreGroupRef.current) coreGroupRef.current.position.set(-1.2, 1.2, 1.0);
        } else {
          portraitMeshRef.current.position.set(1.9, -0.2, 0.1);
          portraitMeshRef.current.scale.set(1.08, 1.08, 1.08);
          if (coreGroupRef.current) coreGroupRef.current.position.set(-2.4, 0.6, 1.8);
        }
      }
    };

    window.addEventListener('resize', handleResize);

    // 10. Continuous Cinematic Camera, Drag, Parallax & Dive Transitions
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      const time = clockRef.current.getElapsedTime();

      // Smooth interpolation
      currentScrollRef.current += (targetScrollRef.current - currentScrollRef.current) * 0.055;
      currentMouseRef.current.x += (targetMouseRef.current.x - currentMouseRef.current.x) * 0.045;
      currentMouseRef.current.y += (targetMouseRef.current.y - currentMouseRef.current.y) * 0.045;
      currentDragRef.current.x += (targetDragRef.current.x - currentDragRef.current.x) * 0.08;
      currentDragRef.current.y += (targetDragRef.current.y - currentDragRef.current.y) * 0.08;

      const p = currentScrollRef.current;
      const mx = currentMouseRef.current.x;
      const my = currentMouseRef.current.y;
      const dx = currentDragRef.current.x; // Manual drag angle Y
      const dy = currentDragRef.current.y; // Manual drag angle X

      // Decay pulse intensity smoothly
      pulseIntensityRef.current *= 0.94;
      const pulse = pulseIntensityRef.current;

      // Update shader uniforms
      if (portraitMatRef.current) {
        portraitMatRef.current.uniforms.uTime.value = time;
        portraitMatRef.current.uniforms.uPulse.value = pulse;
      }

      // Check cursor proximity to portrait (right side of viewport)
      const isNearPortrait = mx > 0.15;
      const portraitProximityBoost = isNearPortrait ? (mx - 0.15) * 4.0 : 0;

      // Section 7: Cinematic Camera Dive Transitions
      // Hero (0-0.18), About (0.18-0.4), Skills (0.4-0.65), Projects (0.65-0.88), Contact (0.88-1.0)
      let camZ = 8.2;
      let camX = mx * 0.24 + dx * 0.5;
      let camY = -my * 0.18 - dy * 0.4;
      let camRotY = dx * 0.06;
      let camRotX = -dy * 0.05;

      // Boundary dives: Camera pushes slightly deeper at transition windows
      if (p > 0.14 && p < 0.22) {
        // Hero -> About Dive
        const t = Math.sin(((p - 0.14) / 0.08) * Math.PI);
        camZ -= t * 0.4;
        camX += t * 0.15;
      } else if (p > 0.36 && p < 0.44) {
        // About -> Skills Dive
        const t = Math.sin(((p - 0.36) / 0.08) * Math.PI);
        camZ -= t * 0.5;
        camRotY -= t * 0.03;
      } else if (p > 0.62 && p < 0.70) {
        // Skills -> Projects Dive
        const t = Math.sin(((p - 0.62) / 0.08) * Math.PI);
        camZ -= t * 0.45;
        camX -= t * 0.18;
      }

      if (camera) {
        camera.position.set(camX, camY, camZ);
        camera.rotation.set(camRotX, camRotY, 0);
      }

      // Choreograph Enormous Portrait Motion with Drag and Pulse Response
      if (portraitMeshRef.current) {
        const mesh = portraitMeshRef.current;
        const mobile = window.innerWidth < 768;
        const baseX = mobile ? 0.3 : 1.9;
        const baseY = mobile ? -0.4 : -0.2;
        const baseScale = mobile ? 0.85 : 1.08;

        let shiftX = 0;
        let shiftY = 0;
        let shiftZ = 0;
        let rotY = 0;
        let rotX = 0;
        let scaleMult = 1.0;

        if (p < 0.18) {
          const t = p / 0.18;
          shiftX = t * -0.25;
          shiftY = t * 0.15;
          shiftZ = t * -0.2;
          rotY = t * 0.06;
          rotX = t * -0.03;
          scaleMult = 1.0 + t * 0.04;
        } else if (p < 0.4) {
          const t = (p - 0.18) / 0.22;
          shiftX = -0.25 + t * 0.55;
          shiftY = 0.15 - t * 0.2;
          shiftZ = -0.2 + t * 0.3;
          rotY = 0.06 - t * 0.08;
          rotX = -0.03 + t * 0.04;
          scaleMult = 1.04 + t * 0.06;
        } else if (p < 0.65) {
          const t = (p - 0.4) / 0.25;
          shiftX = 0.3 - t * 0.4;
          shiftY = -0.05 + t * 0.1;
          shiftZ = 0.1 - t * 0.8;
          rotY = -0.02 + t * 0.05;
          rotX = 0.01 - t * 0.03;
          scaleMult = 1.1 - t * 0.08;
        } else if (p < 0.88) {
          const t = (p - 0.65) / 0.23;
          shiftX = -0.1 + t * 0.2;
          shiftY = 0.05 - t * 0.15;
          shiftZ = -0.7 + t * 0.2;
          rotY = 0.03 - t * 0.04;
          rotX = -0.02 + t * 0.02;
          scaleMult = 1.02;
        } else {
          const t = (p - 0.88) / 0.12;
          shiftX = 0.1 - t * 0.15;
          shiftY = -0.1 - t * 0.1;
          shiftZ = -0.5 - t * 0.5;
          rotY = -0.01;
          rotX = 0.0;
          scaleMult = 1.02 - t * 0.06;
        }

        const breath = Math.sin(time * 0.8) * 0.05;
        // Apply Drag Rotation & Depth Parallax
        mesh.position.x = baseX + shiftX + mx * 0.22 + dx * 0.35;
        mesh.position.y = baseY + shiftY + breath - my * 0.15 - dy * 0.3;
        mesh.position.z = shiftZ + pulse * 0.2;

        mesh.rotation.y = rotY + mx * 0.08 + dx * 0.08;
        mesh.rotation.x = rotX - my * 0.06 - dy * 0.07;
        mesh.rotation.z = Math.sin(time * 0.5) * 0.01;

        const currentScale = (baseScale + pulse * 0.05) * scaleMult;
        mesh.scale.set(currentScale, currentScale, currentScale);
      }

      // Animate REDOXIDE CORE
      if (coreGroupRef.current) {
        const core = coreGroupRef.current;
        // Hover reaction: check if mouse is close to core screen projection
        const coreSpeed = 1.0 + pulse * 4.0;
        core.rotation.y = time * 0.5 * coreSpeed;
        core.rotation.x = time * 0.35 * coreSpeed;

        if (coreInnerRef.current) {
          coreInnerRef.current.rotation.y = -time * 0.8 * coreSpeed;
        }

        coreRingsRef.current.forEach((r, idx) => {
          r.rotation.z = time * (idx === 0 ? 0.6 : -0.7) * coreSpeed;
        });

        if (coreParticlesRef.current) {
          coreParticlesRef.current.rotation.y = time * 0.8 * coreSpeed;
          coreParticlesRef.current.rotation.x = -time * 0.4 * coreSpeed;
        }

        // Float & gentle reaction to drag
        core.position.y = (window.innerWidth < 768 ? 1.2 : 0.6) + Math.sin(time * 1.2) * 0.08 - dy * 0.2;
        core.position.x = (window.innerWidth < 768 ? -1.2 : -2.4) + dx * 0.2;

        const cScale = 1.0 + pulse * 0.35;
        core.scale.set(cScale, cScale, cScale);
      }

      // Dynamic rim lighting moves & reacts to proximity & pulse
      if (rimLightRef.current) {
        rimLightRef.current.position.x = 4.0 + Math.sin(time * 0.6) * 0.5;
        rimLightRef.current.position.y = 1.8 + Math.cos(time * 0.5) * 0.4;
        rimLightRef.current.intensity = 16 + portraitProximityBoost + pulse * 14;
      }

      // Animate particles with drag sensitivity
      const animateCloud = (cloud: THREE.Points | null, speedMult: number, zParallax: number) => {
        if (!cloud) return;
        const posAttr = cloud.geometry.attributes.position as THREE.BufferAttribute;
        const pos = posAttr.array as Float32Array;
        const vels = (cloud as unknown as { velocities: Float32Array }).velocities;
        const count = pos.length / 3;

        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          pos[i3 + 1] += vels[i3 + 1] * (speedMult + pulse * 2.5);
          pos[i3] += Math.sin(time * 0.35 + i) * 0.002 + mx * 0.0015;

          if (pos[i3 + 1] > 18) {
            pos[i3 + 1] = -18;
            pos[i3] = (Math.random() - 0.5) * 38;
          }
        }
        posAttr.needsUpdate = true;
        cloud.rotation.y = dx * zParallax * 0.05;
        cloud.rotation.x = -dy * zParallax * 0.04;
      };

      animateCloud(bgParticlesRef.current, 1.0, 0.4);
      animateCloud(fgParticlesRef.current, 1.2, 0.9);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', handlePointerDown);
      if (renderer) renderer.dispose();
      if (container) container.innerHTML = '';
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 overflow-hidden"
      style={{ pointerEvents: 'auto' }}
      aria-hidden="true"
    />
  );
};
