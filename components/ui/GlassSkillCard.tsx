'use client';

import React from 'react';
import { SkillGroup } from '@/lib/portfolioData';
import { soundSynth } from '@/lib/soundSynth';

interface GlassSkillCardProps {
  skillGroup: SkillGroup;
  progress: number; // 0 to 1
  index: number;
  mousePos: { x: number; y: number };
}

export const GlassSkillCard: React.FC<GlassSkillCardProps> = ({
  skillGroup,
  progress,
  index,
  mousePos,
}) => {
  // Staggered emergence windows based on index
  const startTrigger = 0.08 + index * 0.09;
  const peakTrigger = startTrigger + 0.12;
  const endTrigger = peakTrigger + 0.28;

  let opacity = 0;
  let scale = 0.75;
  let blur = 14;
  let translateZ = -60;
  let rotX = 10;
  let rotY = -12;

  if (progress < startTrigger) {
    opacity = 0;
    blur = 16;
    scale = 0.7;
    translateZ = -80;
  } else if (progress < peakTrigger) {
    const t = (progress - startTrigger) / (peakTrigger - startTrigger);
    const ease = t * t * (3 - 2 * t);
    opacity = ease;
    scale = 0.75 + ease * 0.25;
    blur = 14 * (1 - ease);
    translateZ = -60 + ease * 60;
    rotX = 10 * (1 - ease);
    rotY = -12 * (1 - ease);
  } else if (progress < endTrigger) {
    opacity = 1;
    scale = 1;
    blur = 0;
    translateZ = 0;
    rotX = 0;
    rotY = 0;
  } else {
    const t = Math.min(1, (progress - endTrigger) / 0.15);
    opacity = 1 - t * 0.85;
    scale = 1 - t * 0.15;
    blur = t * 10;
    translateZ = -t * 60;
  }

  // Interactive mouse tilt
  const tiltX = mousePos.y * -6 + rotX;
  const tiltY = mousePos.x * 8 + rotY;

  // SAFE PLACEMENT:
  // Face is located at upper right (top 15% to 42%, right 15% to 45%).
  // Cards are positioned safely around the periphery, shoulder, chest, and left side, NEVER obscuring the face:
  const positionClasses: Record<string, string> = {
    neck: 'top-[22%] left-[4%] sm:left-[8%] lg:left-[12%]',
    shoulder: 'top-[42%] left-[4%] sm:left-[8%] lg:left-[10%]',
    arm: 'top-[64%] left-[5%] sm:left-[10%] lg:left-[14%]',
    lower: 'bottom-[14%] right-[5%] sm:right-[10%] lg:right-[14%]',
    opposite: 'bottom-[28%] right-[6%] sm:right-[14%] lg:right-[20%]',
    deep: 'top-[52%] right-[4%] sm:right-[8%] lg:right-[12%]',
  };

  if (opacity <= 0.01) return null;

  return (
    <div
      className={`absolute ${positionClasses[skillGroup.position] || 'top-1/2 left-1/2'} z-20 pointer-events-auto transition-all duration-300 ease-out`}
      style={{
        opacity,
        filter: blur > 0.5 ? `blur(${blur}px)` : 'none',
        transform: `perspective(1000px) translate3d(0, 0, ${translateZ}px) scale(${scale}) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
      }}
      onMouseEnter={() => soundSynth.playHover()}
    >
      <div className="relative group max-w-[270px] sm:max-w-[300px] p-4 sm:p-5 rounded-lg backdrop-blur-xl bg-[#0e0a0c]/75 border border-red-500/20 shadow-2xl shadow-black/90 hover:border-red-cinematic/60 hover:bg-[#18090d]/85 transition-all duration-300">
        {/* Subtle red edge glow line */}
        <div className="absolute -top-[1px] left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-red-cinematic/70 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <span className="text-[10px] font-mono tracking-widest text-red-highlight uppercase">
            // {skillGroup.index}
          </span>
          <span className="text-[10px] font-mono tracking-wider text-text-muted uppercase">
            {skillGroup.category}
          </span>
        </div>

        {/* Skill Pills */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {skillGroup.skills.map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-sans px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-text-primary/90 group-hover:border-red-500/30 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
