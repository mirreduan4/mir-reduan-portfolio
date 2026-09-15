'use client';

import React, { useState } from 'react';
import { soundSynth } from '@/lib/soundSynth';

export const ContactScene: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const emailPlaceholder = 'contact@redoxide.dev';

  const handleCopy = () => {
    soundSynth.playTick(990, 0.06);
    navigator.clipboard.writeText(emailPlaceholder);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="relative w-full min-h-screen py-32 px-6 sm:px-12 md:px-20 z-10 flex flex-col justify-between">
      {/* Background Darkening with Red Vignette Glow */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#080305]/60 to-[#030102] z-0" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-cinematic/10 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto w-full pt-16">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-red-highlight tracking-[0.3em] uppercase">
            // 07 &mdash; TRANSMISSION
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-red-500/30 to-transparent" />
        </div>

        <div className="space-y-8 max-w-3xl">
          <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl text-text-primary tracking-tight font-normal leading-[0.95]">
            LET&rsquo;S BUILD <br />
            <span className="italic text-red-cinematic">SOMETHING.</span>
          </h2>

          <p className="font-sans text-base sm:text-xl text-text-secondary max-w-xl leading-relaxed">
            Have an idea, project or opportunity? Let&rsquo;s explore what&rsquo;s possible.
          </p>

          <div className="pt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={handleCopy}
              onMouseEnter={() => soundSynth.playHover()}
              className="px-8 py-4 rounded-lg bg-red-cinematic hover:bg-red-highlight text-text-primary font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-xl shadow-red-950/50 hover:shadow-red-500/20"
            >
              {copied ? 'FREQUENCY COPIED TO CLIPBOARD' : 'GET IN TOUCH &rarr;'}
            </button>

            <a
              href={`mailto:${emailPlaceholder}`}
              onMouseEnter={() => soundSynth.playHover()}
              className="px-6 py-4 rounded-lg glass-panel hover:border-red-500/40 text-text-primary font-mono text-xs tracking-wider uppercase transition-colors"
            >
              DIRECT SIGNAL [EMAIL]
            </a>
          </div>

          <div className="pt-12 flex flex-wrap items-center gap-8 font-mono text-xs text-text-muted tracking-widest uppercase">
            <a href="#" className="hover:text-red-highlight transition-colors">
              [GITHUB &middot; PLACEHOLDER]
            </a>
            <a href="#" className="hover:text-red-highlight transition-colors">
              [LINKEDIN &middot; PLACEHOLDER]
            </a>
            <a href="#" className="hover:text-red-highlight transition-colors">
              [X / TWITTER &middot; PLACEHOLDER]
            </a>
          </div>
        </div>
      </div>

      {/* Section 20: Minimal Cinematic Footer */}
      <footer className="relative z-10 max-w-5xl mx-auto w-full pt-32 pb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.08] font-mono text-xs text-text-muted">
          <div>
            <span className="text-text-primary font-bold tracking-wider">REDOXIDE</span> &mdash; Digital Creator &middot; AI Explorer &middot; Tech Enthusiast
          </div>
          <div>
            &copy; 2026 REDOXIDE &middot; ALL CHANNELS SECURED
          </div>
        </div>

        {/* Subtle animated red line / light as the final visual element */}
        <div className="w-full h-[1.5px] mt-8 bg-gradient-to-r from-transparent via-red-cinematic to-transparent animate-subtle-pulse" />
      </footer>
    </section>
  );
};
