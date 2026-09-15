'use client';

import React, { useState, useEffect } from 'react';
import { soundSynth } from '@/lib/soundSynth';

interface FloatingNavProps {
  scrollProgress: number; // 0 to 1
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ scrollProgress }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  // Compute 01 - 07 current index based on scroll position
  const activeIndex = Math.min(7, Math.max(1, Math.floor(scrollProgress * 7) + 1));
  const activeIndexPadded = String(activeIndex).padStart(2, '0');

  const navItems = [
    { label: 'PORTRAIT EXPERIENCE', id: 'experience', num: '01' },
    { label: 'IDENTITY CODEX', id: 'about', num: '02' },
    { label: 'WHAT I CREATE', id: 'projects', num: '03' },
    { label: 'PHOTOGRAPHY RECOGNITION', id: 'recognition', num: '04' },
    { label: 'VERIFIED CREDENTIALS', id: 'credentials', num: '05' },
    { label: 'EDUCATION ARCHIVE', id: 'education', num: '06' },
    { label: 'TRANSMISSION', id: 'contact', num: '07' },
  ];

  const toggleAudio = () => {
    const active = soundSynth.toggleMute();
    setIsAudioActive(active);
  };

  const scrollToSection = (id: string) => {
    soundSynth.playTick(720, 0.05);
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Floating Interface HUD */}
      <nav
        className="fixed top-0 left-0 w-full z-40 px-6 sm:px-10 py-5 flex items-center justify-between pointer-events-none"
        aria-label="Floating HUD Navigation"
      >
        {/* Top-Left: REDOXIDE Brand */}
        <div className="pointer-events-auto">
          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('experience');
            }}
            onMouseEnter={() => soundSynth.playHover()}
            className="flex items-center gap-3 font-serif text-lg sm:text-xl font-bold tracking-tight text-text-primary group"
          >
            <span className="w-2 h-2 rounded-full bg-red-highlight group-hover:shadow-[0_0_10px_#ff2635] transition-all" />
            <span>REDOXIDE</span>
          </a>
        </div>

        {/* Top-Center: Small Scroll Progress Indicator (01 — 07) */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-text-muted tracking-widest pointer-events-auto px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/[0.06]">
          <span className="text-red-highlight">{activeIndexPadded}</span>
          <span className="text-white/20">&mdash;</span>
          <span>07</span>
        </div>

        {/* Top-Right: Audio Toggle & MENU / INDEX */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <button
            onClick={toggleAudio}
            onMouseEnter={() => soundSynth.playHover()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/[0.08] hover:border-red-500/40 text-text-muted hover:text-text-primary text-[10px] font-mono tracking-widest uppercase transition-all"
            aria-label="Toggle Audio Ambiance"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isAudioActive ? 'bg-red-highlight shadow-[0_0_8px_#ff2635] animate-pulse' : 'bg-white/30'
              }`}
            />
            <span className="hidden sm:inline">{isAudioActive ? 'AMB: ON' : 'AMB: OFF'}</span>
          </button>

          <button
            onClick={() => {
              soundSynth.playTick(600, 0.05);
              setIsMenuOpen(!isMenuOpen);
            }}
            onMouseEnter={() => soundSynth.playHover()}
            className="px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/[0.08] hover:border-red-cinematic text-text-primary text-[11px] font-mono tracking-widest uppercase transition-all"
            aria-label="Toggle Index Navigation"
          >
            {isMenuOpen ? '[CLOSE]' : 'MENU / INDEX'}
          </button>
        </div>
      </nav>

      {/* Fullscreen Overlay Index */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-16 md:p-24 transition-all"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex justify-between items-center max-w-5xl mx-auto w-full">
            <span className="font-mono text-xs text-red-highlight tracking-widest uppercase">
              // REDOXIDE MASTER INDEX
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="font-mono text-xs text-text-muted hover:text-text-primary transition-colors tracking-widest"
            >
              [CLOSE &times;]
            </button>
          </div>

          <div className="max-w-5xl mx-auto w-full my-auto space-y-4">
            {navItems.map((item) => (
              <div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToSection(item.id);
                }}
                onMouseEnter={() => soundSynth.playHover()}
                className="group flex items-baseline gap-6 cursor-pointer py-2 border-b border-white/[0.04] hover:border-red-cinematic/40 transition-colors"
              >
                <span className="font-mono text-xs text-red-highlight tracking-widest">
                  {item.num}
                </span>
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-text-secondary group-hover:text-text-primary group-hover:translate-x-3 transition-all duration-300">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto w-full font-mono text-[10px] text-text-muted tracking-widest flex justify-between">
            <div>CINEMATIC 2.5D INTERACTIVE RUNTIME</div>
            <div>STATUS: ONLINE</div>
          </div>
        </div>
      )}
    </>
  );
};
