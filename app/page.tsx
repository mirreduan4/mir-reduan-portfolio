'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const PortraitCanvas = dynamic(
  () => import('@/components/3d/PortraitCanvas').then((mod) => mod.PortraitCanvas),
  { ssr: false }
);

const CinematicOverlay = dynamic(
  () => import('@/components/ui/CinematicOverlay').then((mod) => mod.CinematicOverlay),
  { ssr: false }
);

const FloatingNav = dynamic(
  () => import('@/components/ui/FloatingNav').then((mod) => mod.FloatingNav),
  { ssr: false }
);

import { PortraitScrollExperience } from '@/components/sections/PortraitScrollExperience';
import { AboutEditorial } from '@/components/sections/AboutEditorial';
import { ProjectsVault } from '@/components/sections/ProjectsVault';
import { RecognitionScene } from '@/components/sections/RecognitionScene';
import { EducationArchive } from '@/components/sections/EducationArchive';
import { LearningPhilosophy } from '@/components/sections/LearningPhilosophy';
import { ContactScene } from '@/components/sections/ContactScene';

export default function RedoxideHome() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      setScrollProgress(progress);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x: normX, y: normY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-bg-primary text-text-primary selection:bg-red-accent selection:text-white">
      {/* 1. Global Cinematic Overlays (Vignette, Film Grain, Scanlines, Cursor) */}
      <CinematicOverlay mousePos={mousePos} />

      {/* 2. WebGL 2.5D Portrait & Atmospheric Particle Canvas */}
      <PortraitCanvas scrollProgress={scrollProgress} mousePos={mousePos} />

      {/* 3. Minimal Floating Navigation & HUD Index */}
      <FloatingNav scrollProgress={scrollProgress} />

      {/* 4. Hero Viewport & Scroll-Linked 3D Glass Skill Cards */}
      <PortraitScrollExperience scrollProgress={scrollProgress} mousePos={mousePos} />

      {/* 5. Editorial About Scene: WHO IS REDOXIDE? */}
      <AboutEditorial />

      {/* 6. Artifacts & Projects Vault: WHAT I CREATE */}
      <ProjectsVault />

      {/* 7. Photography Recognition & Verified Credentials */}
      <RecognitionScene />

      {/* 8. Education Archive */}
      <EducationArchive />

      {/* 9. Learning Philosophy: "I learn by doing." */}
      <LearningPhilosophy />

      {/* 10. Transmission & Minimal Cinematic Footer */}
      <ContactScene />
    </main>
  );
}
