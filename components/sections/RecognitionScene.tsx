'use client';

import React from 'react';
import { certifications } from '@/lib/portfolioData';
import { soundSynth } from '@/lib/soundSynth';

export const RecognitionScene: React.FC = () => {
  return (
    <section id="recognition" className="relative w-full min-h-screen py-32 px-6 sm:px-12 md:px-20 z-10">
      <div className="max-w-6xl mx-auto space-y-32">
        {/* Part 1: Photography Recognition */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs text-red-highlight tracking-[0.3em] uppercase">
              // 04 &mdash; RECOGNITION
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-red-500/30 to-transparent" />
          </div>

          <div className="relative rounded-2xl p-8 sm:p-14 glass-panel overflow-hidden">
            {/* Subtle vintage warm ambient glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-vintage-warm/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl">
              <div className="font-mono text-xs text-vintage-warm tracking-[0.3em] uppercase mb-4">
                2022 &middot; RECOGNITION
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-text-primary tracking-tight leading-tight mb-6">
                AWARD-WINNING <br />
                <span className="italic text-red-cinematic">LANDSCAPE PHOTOGRAPHY</span>
              </h2>

              <p className="font-serif text-lg sm:text-xl text-text-secondary leading-relaxed mb-8 italic">
                &ldquo;A natural landscape photograph captured with my DSLR received an award in 2022.&rdquo;
              </p>

              <div className="inline-flex items-center gap-4 py-2 px-4 rounded bg-[#18090d]/60 border border-red-500/20 font-mono text-xs text-text-muted">
                <span className="w-2 h-2 rounded-full bg-red-highlight" />
                <span>DSLR OPTICS &middot; NATURAL GEOGRAPHY &middot; COLOR CHROMATICS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Credentials & Certifications */}
        <div id="credentials">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs text-red-highlight tracking-[0.3em] uppercase">
              // 05 &mdash; CREDENTIALS
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-red-500/30 to-transparent" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 className="font-serif text-4xl sm:text-5xl text-text-primary tracking-tight">
              VERIFIED <span className="italic text-red-cinematic">CREDENTIALS</span>
            </h2>
            <p className="font-mono text-xs text-text-muted tracking-widest uppercase">
              TEXT-BASED CREDENTIAL CODEX &middot; CONTINUOUS SPECIALIZATION
            </p>
          </div>

          {/* Text-Based 3D Credential Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                onMouseEnter={() => soundSynth.playHover()}
                className="relative rounded-xl p-6 sm:p-8 glass-panel glass-panel-hover flex flex-col justify-between min-h-[260px]"
              >
                <div>
                  <div className="flex justify-between items-center font-mono text-xs text-red-highlight tracking-widest uppercase mb-4">
                    <span>// {cert.number}</span>
                    {cert.issuer && (
                      <span className="text-text-muted tracking-wider">{cert.issuer}</span>
                    )}
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-text-primary font-normal leading-snug mb-4">
                    {cert.title}
                  </h3>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <div className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-2">
                    CORE FOCUS:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.focus.map((f) => (
                      <span
                        key={f}
                        className="text-[11px] font-sans px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-text-secondary"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
