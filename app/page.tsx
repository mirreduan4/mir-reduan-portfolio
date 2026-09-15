'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const PortraitCanvas = dynamic(
  () =>
    import('@/components/3d/PortraitCanvas').then(
      (mod) => mod.PortraitCanvas
    ),
  { ssr: false }
);

const CinematicOverlay = dynamic(
  () =>
    import('@/components/ui/CinematicOverlay').then(
      (mod) => mod.CinematicOverlay
    ),
  { ssr: false }
);

const FloatingNav = dynamic(
  () =>
    import('@/components/ui/FloatingNav').then(
      (mod) => mod.FloatingNav
    ),
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
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const [isCorePulseActive, setIsCorePulseActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        maxScroll > 0
          ? Math.min(1, Math.max(0, scrollY / maxScroll))
          : 0;

      setScrollProgress(progress);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      setMousePos({
        x: normX,
        y: normY,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    let currentDrag = {
      x: 0,
      y: 0,
    };

    const MAX_DRAG = 0.21;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const dx = (e.clientX - startX) / window.innerWidth;
      const dy = (e.clientY - startY) / window.innerHeight;

      currentDrag = {
        x: Math.max(-MAX_DRAG, Math.min(MAX_DRAG, dx)),
        y: Math.max(-MAX_DRAG, Math.min(MAX_DRAG, dy)),
      };

      setDragOffset({
        ...currentDrag,
      });
    };

    const onMouseUp = () => {
      if (!isDragging) return;

      isDragging = false;

      const spring = setInterval(() => {
        currentDrag.x *= 0.88;
        currentDrag.y *= 0.88;

        setDragOffset({
          x: currentDrag.x,
          y: currentDrag.y,
        });

        if (
          Math.abs(currentDrag.x) < 0.001 &&
          Math.abs(currentDrag.y) < 0.001
        ) {
          clearInterval(spring);

          setDragOffset({
            x: 0,
            y: 0,
          });
        }
      }, 16);
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const handleCoreClick = () => {
    setIsCorePulseActive(true);

    setTimeout(() => {
      setIsCorePulseActive(false);
    }, 1200);
  };

  const handleEasterEggTrigger = () => {
    setIsEasterEggActive(true);

    setTimeout(() => {
      setIsEasterEggActive(false);
    }, 4000);
  };

  return (
    <main className="relative min-h-screen bg-bg-primary text-text-primary selection:bg-red-accent selection:text-white overflow-x-hidden">
      <CinematicOverlay
        mousePos={mousePos}
        isEasterEggActive={isEasterEggActive}
        onEasterEggTrigger={handleEasterEggTrigger}
      />

      <PortraitCanvas
        scrollProgress={scrollProgress}
        mousePos={mousePos}
        dragOffset={dragOffset}
        isCorePulseActive={isCorePulseActive}
        onCoreClick={handleCoreClick}
      />

      <FloatingNav scrollProgress={scrollProgress} />

      <PortraitScrollExperience
        scrollProgress={scrollProgress}
        mousePos={mousePos}
      />

      <AboutEditorial />

      <ProjectsVault />

      <RecognitionScene />

      <EducationArchive />

      <LearningPhilosophy />

      <ContactScene />
    </main>
  );
}