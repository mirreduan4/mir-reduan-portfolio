'use client';

import React from 'react';
import { skillGroups } from '@/lib/portfolioData';
import { GlassSkillCard } from '../ui/GlassSkillCard';

interface PortraitScrollExperienceProps {
  scrollProgress: number;
  mousePos: { x: number; y: number };
}

export const PortraitScrollExperience: React.FC<PortraitScrollExperienceProps> = ({
  scrollProgress,
  mousePos,
}) => {
  return (
    <section className="relative w-full h-[320vh] pointer-events-none z-[5]" id="experience">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Intro Hero Typography (fades smoothly as scroll begins) */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 md:p-16 z-10 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 5),
            transform: `translate3d(0, -${scrollProgress * 150}px, 0)`,
          }}
        >
          {/* Top spacer */}
          <div />

          {/* Hero Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded border border-red-500/25 bg-red-950/20 text-red-cinematic text-xs font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-red-highlight animate-pulse" />
              <span>DIGITAL UNIVERSE // 2026</span>
            </div>

            <h1 className="font-serif text-[clamp(2.5rem,12vw,5rem)] sm:text-7xl md:text-8xl font-bold tracking-tight text-text-primary leading-[0.9] mb-4">
              REDOXIDE
            </h1>

            <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-red-highlight uppercase mb-6">
              Digital Creator &middot; AI Explorer &middot; Tech Enthusiast
            </p>

            <p className="font-sans text-sm sm:text-base text-text-secondary max-w-lg leading-relaxed mb-8">
              Navigating the confluence of artificial intelligence, visual storytelling, and interactive digital architectures.
            </p>

            <div className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-text-muted uppercase">
              <span className="w-8 h-[1px] bg-red-500/50" />
              <span>SCROLL TO ENTER</span>
            </div>
          </div>

          {/* Bottom Telemetry */}
          <div className="flex justify-between items-end font-mono text-[10px] tracking-widest text-text-muted">
            <div>INDEX // 01 &mdash; 07</div>
            <div className="text-red-highlight">2.5D WEBGL ACTIVE</div>
          </div>
        </div>

        {/* Floating 3D Glass Skill Cards around Portrait */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {skillGroups.map((group, idx) => (
            <GlassSkillCard
              key={group.id}
              skillGroup={group}
              progress={scrollProgress}
              index={idx}
              mousePos={mousePos}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
