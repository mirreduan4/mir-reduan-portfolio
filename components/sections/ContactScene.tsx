'use client';

import React, { useState } from 'react';

import { soundSynth } from '@/lib/soundSynth';

const socialLinks = [
  {
    label: 'Facebook',
    handle: '@7h.mir.reduan',
    url: 'https://www.facebook.com/7h.mir.reduan',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    handle: '@7h.mir_reduan',
    url: 'https://www.instagram.com/7h.mir_reduan/',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98C.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98 1.28.058 1.688.072 4.948.072s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
      </svg>
    ),
  },
  {
    label: 'RedOxide FB',
    handle: 'RedOxideOfficial',
    url: 'https://www.facebook.com/RedOxideOfficial',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Medium',
    handle: '@mirreduan',
    url: 'https://medium.com/@mirreduan',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z" />
      </svg>
    ),
  },
  {
    label: 'Discord',
    handle: 'Join Server',
    url: 'https://discord.gg/RTz233FjqN',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0c-.164-.386-.404-.875-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.08.08 0 0 0 .032.054 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
];

export const ContactScene: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const email = 'mirreduan4@gmail.com';

  const handleCopy = () => {
    soundSynth.playTick(990, 0.06);
    navigator.clipboard.writeText(email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen py-28 sm:py-32 px-5 sm:px-12 md:px-20 z-10 flex flex-col justify-between"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#080305]/60 to-[#030102] z-0" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-cinematic/10 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto w-full pt-16">
        <div className="flex items-center gap-4 mb-14 sm:mb-16">
          <span className="font-mono text-xs text-red-highlight tracking-[0.3em] uppercase">
            // 07 &mdash; TRANSMISSION
          </span>

          <div className="h-[1px] flex-1 bg-gradient-to-r from-red-500/30 to-transparent" />
        </div>

        <div className="space-y-8 max-w-3xl">
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary tracking-tight font-normal leading-[0.95]">
            LET&rsquo;S BUILD <br />
            <span className="italic text-red-cinematic">SOMETHING.</span>
          </h2>

          <p className="font-sans text-sm sm:text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed">
            Have an idea, project or opportunity? Let&rsquo;s explore what&rsquo;s possible.
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={handleCopy}
              onMouseEnter={() => soundSynth.playHover()}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-red-cinematic hover:bg-red-highlight text-text-primary font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-xl shadow-red-950/50 hover:shadow-red-500/20"
            >
              {copied ? 'EMAIL COPIED' : 'GET IN TOUCH →'}
            </button>

            <a
              href={`mailto:${email}`}
              onMouseEnter={() => soundSynth.playHover()}
              className="px-5 sm:px-6 py-3 sm:py-4 rounded-lg glass-panel hover:border-red-500/40 text-text-primary font-mono text-xs tracking-wider uppercase transition-colors"
            >
              DIRECT SIGNAL [EMAIL]
            </a>
          </div>

          {/* Social Links — Icon Grid */}
          <div className="pt-10 sm:pt-12">
            <p className="font-mono text-[10px] text-text-muted tracking-[0.3em] uppercase mb-5">
              // SIGNAL CHANNELS
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} — ${s.handle}`}
                  onMouseEnter={() => soundSynth.playHover()}
                  className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-lg glass-panel hover:border-red-500/50 hover:bg-[#18090d]/80 transition-all duration-300"
                  title={`${s.label}: ${s.handle}`}
                >
                  <span
                    className="w-4 h-4 text-text-muted group-hover:text-red-highlight transition-colors flex-shrink-0"
                    aria-hidden="true"
                  >
                    {s.icon}
                  </span>

                  <span className="font-mono text-[10px] tracking-wider text-text-muted group-hover:text-text-primary transition-colors uppercase whitespace-nowrap">
                    {s.label}
                  </span>

                  <span className="absolute -top-[1px] left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-red-cinematic/0 group-hover:via-red-cinematic/50 to-transparent transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 max-w-5xl mx-auto w-full pt-24 sm:pt-32 pb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.08] font-mono text-xs text-text-muted text-center sm:text-left">
          <div>
            <span className="text-text-primary font-bold tracking-wider">
              REDOXIDE
            </span>{' '}
            &mdash; Digital Creator &middot; AI Explorer &middot; Tech Enthusiast
          </div>

          <div>
            &copy; 2026 REDOXIDE &middot; ALL CHANNELS SECURED
          </div>
        </div>

        <div className="w-full h-[1.5px] mt-8 bg-gradient-to-r from-transparent via-red-cinematic to-transparent animate-subtle-pulse" />
      </footer>
    </section>
  );
};