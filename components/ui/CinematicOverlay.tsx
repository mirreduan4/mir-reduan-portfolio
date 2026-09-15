'use client';

import React, { useEffect, useRef, useState } from 'react';
import { soundSynth } from '@/lib/soundSynth';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

interface CinematicOverlayProps {
  mousePos: { x: number; y: number };
  onEasterEggTrigger?: () => void;
  isEasterEggActive?: boolean;
}

export const CinematicOverlay: React.FC<CinematicOverlayProps> = ({
  mousePos,
  isEasterEggActive = false,
}) => {
  const [isTouch, setIsTouch] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const ringPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const ringElRef = useRef<HTMLDivElement | null>(null);
  const dotElRef = useRef<HTMLDivElement | null>(null);

  // Auto-fade "MOVE · SCROLL · EXPLORE" hint after 5.5s
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5500);
    const handleFirstInteraction = () => {
      setShowHint(false);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('mousedown', handleFirstInteraction);
    };
    window.addEventListener('scroll', handleFirstInteraction, { passive: true });
    window.addEventListener('mousedown', handleFirstInteraction);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('mousedown', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  // Red Particle / Light Trail on Desktop Canvas
  useEffect(() => {
    if (isTouch) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animId: number;

    const redColors = ['#ff2635', '#c1121f', '#8b0000', '#ff4d6d'];

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;
      const dx = currentX - lastMouseRef.current.x;
      const dy = currentY - lastMouseRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Spawn subtle red light trail particles when moving
      if (speed > 1.5 && particlesRef.current.length < 65) {
        const pCount = Math.min(3, Math.ceil(speed / 8));
        for (let i = 0; i < pCount; i++) {
          particlesRef.current.push({
            x: currentX + (Math.random() - 0.5) * 6,
            y: currentY + (Math.random() - 0.5) * 6,
            vx: -dx * 0.08 + (Math.random() - 0.5) * 0.8,
            vy: -dy * 0.08 + (Math.random() - 0.5) * 0.8,
            size: Math.random() * 2.2 + 1.2,
            alpha: 0.65,
            decay: Math.random() * 0.025 + 0.02,
            color: redColors[Math.floor(Math.random() * redColors.length)],
          });
        }
      }

      lastMouseRef.current = { x: currentX, y: currentY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Render loop for particle trail and smooth cursor ring
    const renderLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0.01) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#c1121f';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Smooth trailing ring lerp
      const targetX = lastMouseRef.current.x;
      const targetY = lastMouseRef.current.y;
      ringPosRef.current.x += (targetX - ringPosRef.current.x) * 0.16;
      ringPosRef.current.y += (targetY - ringPosRef.current.y) * 0.16;

      if (ringElRef.current) {
        ringElRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0)`;
      }
      if (dotElRef.current) {
        dotElRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTouch]);

  return (
    <>
      {/* 1. Cinematic Radial Vignette */}
      <div className="cinematic-vignette" aria-hidden="true" />

      {/* 2. Jittering Analog Film Grain */}
      <div className="cinematic-grain" aria-hidden="true" />

      {/* 3. Subtle CRT Scanlines */}
      <div className="cinematic-scanlines" aria-hidden="true" />

      {/* 4. Canvas-based Red Light Trail (Desktop Only) */}
      {!isTouch && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-[9998]"
          aria-hidden="true"
        />
      )}

      {/* 5. Desktop Custom Interactive Reticle Cursor */}
      {!isTouch && (
        <>
          <div ref={dotElRef} className="custom-cursor-dot" aria-hidden="true" />
          <div ref={ringElRef} className="custom-cursor-ring" aria-hidden="true" />
        </>
      )}

      {/* 6. First-Visit Hint: "MOVE · SCROLL · EXPLORE" */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none font-mono text-[11px] tracking-[0.3em] uppercase text-text-muted/80 transition-opacity duration-1000 ${
          showHint ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/[0.08]">
          MOVE &middot; SCROLL &middot; EXPLORE
        </span>
      </div>

      {/* 7. Secret Easter Egg Flash Mode Overlay */}
      {isEasterEggActive && (
        <div
          className="fixed inset-0 z-[10000] pointer-events-none bg-black/90 backdrop-blur-md flex items-center justify-center transition-all duration-700 animate-fadeIn"
          aria-hidden="true"
        >
          <div className="text-center space-y-4">
            <div className="w-12 h-[1px] bg-red-cinematic mx-auto animate-pulse" />
            <h2 className="font-serif text-3xl sm:text-5xl text-text-primary tracking-widest uppercase">
              YOU FOUND THE OTHER SIDE.
            </h2>
            <p className="font-mono text-xs text-red-highlight tracking-[0.4em] uppercase">
              // REDOXIDE &middot; PARALLEL DIMENSION UNLOCKED
            </p>
          </div>
        </div>
      )}
    </>
  );
};
