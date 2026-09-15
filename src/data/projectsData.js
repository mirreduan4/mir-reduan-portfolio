export const projects = [
  {
    id: "neuro-mesh",
    title: "NEURO//MESH 3D",
    category: "WebGL / Neural Visualizer",
    subtitle: "Real-time 3D neural latent space explorer & graph computing engine",
    description: "An interactive high-dimensional data visualization platform powered by Three.js, WebGL compute shaders, and custom GLSL particle simulations. Renders 100,000+ interactive nodes with dynamic graph clustering and spatial audio feedback.",
    tags: ["Three.js", "GLSL Shaders", "Web Audio API", "TypeScript", "Vite"],
    metrics: [
      { label: "Rendering Rate", value: "60 FPS @ 100k Nodes" },
      { label: "Compute Latency", value: "< 14ms Latent Query" },
      { label: "Architecture", value: "Zero-dependency GLSL" }
    ],
    liveUrl: "https://github.com/mirreduan",
    repoUrl: "https://github.com/mirreduan",
    accentColor: "#ff2a4b",
    featured: true
  },
  {
    id: "aegis-sentinel",
    title: "AEGIS//SENTINEL",
    category: "AI Security & Telemetry",
    subtitle: "Autonomous cloud perimeter defense & real-time telemetry dashboard",
    description: "Enterprise cyber telemetry cockpit streaming distributed metrics via WebSockets with military-grade HUD UI, anomaly detection triggers, automated incident containment, and cryptographic ledger verification.",
    tags: ["React", "FastAPI", "WebSockets", "Docker", "Tailwind CSS"],
    metrics: [
      { label: "Event Throughput", value: "2.4M Events/sec" },
      { label: "Threat Detection", value: "99.8% Accuracy" },
      { label: "Cold Start", value: "180ms Edge Exec" }
    ],
    liveUrl: "https://github.com/mirreduan",
    repoUrl: "https://github.com/mirreduan",
    accentColor: "#ff4d6d",
    featured: true
  },
  {
    id: "hyper-pulse",
    title: "HYPER//PULSE",
    category: "Fintech / High-Frequency",
    subtitle: "Algorithmic liquidity router & low-latency execution interface",
    description: "Next-generation financial terminal featuring order book depth visualizer, microsecond price ticks, automated portfolio rebalancing, and dark-mode tactical UI with canvas-rendered candlestick charting.",
    tags: ["Next.js", "Rust / WASM", "Tailwind", "Canvas API", "PostgreSQL"],
    metrics: [
      { label: "Chart Frame Rate", value: "120Hz Hardware Sync" },
      { label: "Execution Speed", value: "Sub-millisecond" },
      { label: "Uptime SLA", value: "99.99%" }
    ],
    liveUrl: "https://github.com/mirreduan",
    repoUrl: "https://github.com/mirreduan",
    accentColor: "#ff1a3c",
    featured: true
  },
  {
    id: "nexus-forge",
    title: "NEXUS//FORGE",
    category: "Creative Dev / Spatial",
    subtitle: "Collaborative 3D spatial studio and generative shader workshop",
    description: "Browser-based creative engine empowering digital artists to compose volumetric scenes, bake physics-based materials, compile procedural procedural noise shaders, and export optimized assets in glTF / USDZ formats.",
    tags: ["Three.js", "WebXR", "GLSL", "Node.js", "PWA"],
    metrics: [
      { label: "Asset Compression", value: "68% DRACO Mesh" },
      { label: "Shader Compilation", value: "Realtime WebWorker" },
      { label: "Spatial Support", value: "WebXR Standard" }
    ],
    liveUrl: "https://github.com/mirreduan",
    repoUrl: "https://github.com/mirreduan",
    accentColor: "#ff2a4b",
    featured: false
  }
];
