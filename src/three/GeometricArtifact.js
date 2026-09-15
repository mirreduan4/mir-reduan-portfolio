import * as THREE from 'three';

export class GeometricArtifact {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.speed = 1.0;
    this.init();
  }

  init() {
    // Outer wireframe icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(2.0, 1);
    const wireGeo = new THREE.WireframeGeometry(icoGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#ff2a4b'),
      transparent: true,
      opacity: 0.75,
      linewidth: 1.5
    });
    this.outerMesh = new THREE.LineSegments(wireGeo, wireMat);
    this.group.add(this.outerMesh);

    // Inner glowing octahedron
    const innerGeo = new THREE.OctahedronGeometry(1.0, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ff1a3c'),
      emissive: new THREE.Color('#800010'),
      roughness: 0.1,
      metalness: 0.9,
      wireframe: true
    });
    this.innerMesh = new THREE.Mesh(innerGeo, innerMat);
    this.group.add(this.innerMesh);

    // Orbiting ring
    const ringGeo = new THREE.TorusGeometry(2.7, 0.03, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ffffff'),
      transparent: true,
      opacity: 0.4
    });
    this.ring = new THREE.Mesh(ringGeo, ringMat);
    this.ring.rotation.x = Math.PI / 3;
    this.group.add(this.ring);

    // Second counter-rotating ring
    const ringGeo2 = new THREE.TorusGeometry(3.1, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ff4d6d'),
      transparent: true,
      opacity: 0.35
    });
    this.ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    this.ring2.rotation.y = Math.PI / 4;
    this.group.add(this.ring2);

    // Default position: lower down in the page corresponding to the Interactive Lab section
    this.group.position.set(0, -32, -4);
    this.scene.add(this.group);
  }

  update(time, mouse) {
    if (!this.group) return;

    this.outerMesh.rotation.x = time * 0.25 * this.speed;
    this.outerMesh.rotation.y = time * 0.35 * this.speed;

    this.innerMesh.rotation.x = -time * 0.4 * this.speed;
    this.innerMesh.rotation.z = time * 0.5 * this.speed;

    this.ring.rotation.z = time * 0.2 * this.speed;
    this.ring2.rotation.x = time * -0.15 * this.speed;

    // Interactive mouse influence
    this.group.rotation.y += (mouse.x * 0.5 - this.group.rotation.y) * 0.04;
  }

  setPulseRate(rate) {
    this.speed = rate;
  }
}
