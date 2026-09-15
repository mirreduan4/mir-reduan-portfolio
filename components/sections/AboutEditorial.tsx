'use client';

import React from 'react';

export const AboutEditorial: React.FC = () => {
  return (
    <section id="about" className="relative w-full min-h-screen py-32 px-6 sm:px-12 md:px-20 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-red-highlight tracking-[0.3em] uppercase">
            // 02 &mdash; IDENTITY
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-red-500/30 to-transparent" />
        </div>

        {/* Asymmetric Composition: Content anchored to Left/Center, leaving Right open for the Giant Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-text-primary tracking-tight leading-[1.02]">
              WHO IS <br />
              <span className="italic text-red-cinematic">REDOXIDE?</span>
            </h2>

            <div className="glass-panel p-8 sm:p-10 rounded-xl relative overflow-hidden backdrop-blur-2xl bg-[#0c080a]/80 border-red-500/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-cinematic/5 rounded-full blur-2xl pointer-events-none" />

              <p className="font-serif text-xl sm:text-2xl text-text-primary/95 leading-relaxed mb-6 font-normal">
                &ldquo;I’m a multidisciplinary digital creator driven by curiosity, experimentation and the desire to build things that feel different.&rdquo;
              </p>

              <div className="space-y-5 text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
                <p>
                  My interests span across technology, artificial intelligence, visual creativity, photography, video production, gaming and digital storytelling.
                </p>
                <p>
                  I enjoy learning how things work, experimenting with emerging tools and turning ideas into visual experiences.
                </p>
                <p>
                  From creating digital content and designing visuals to exploring AI, developing web experiences and studying new technologies, I’m constantly moving between creativity and technology.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-red-500/15">
                <p className="font-mono text-xs sm:text-sm text-red-highlight tracking-wider uppercase">
                  &ldquo;I don’t like staying inside one box. I like learning what’s beyond it.&rdquo;
                </p>
              </div>
            </div>

            {/* Micro Pillars */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-[#0e0a0c]/70 border border-white/[0.05]">
                <div className="font-mono text-[10px] text-red-cinematic tracking-widest uppercase mb-1">AXIS 01</div>
                <div className="font-serif text-sm sm:text-base text-text-primary">Curiosity</div>
              </div>
              <div className="p-4 rounded-lg bg-[#0e0a0c]/70 border border-white/[0.05]">
                <div className="font-mono text-[10px] text-red-cinematic tracking-widest uppercase mb-1">AXIS 02</div>
                <div className="font-serif text-sm sm:text-base text-text-primary">Experiment</div>
              </div>
              <div className="p-4 rounded-lg bg-[#0e0a0c]/70 border border-white/[0.05]">
                <div className="font-mono text-[10px] text-red-cinematic tracking-widest uppercase mb-1">AXIS 03</div>
                <div className="font-serif text-sm sm:text-base text-text-primary">Execution</div>
              </div>
            </div>
          </div>

          {/* Right Column: Open spatial viewport allowing the giant 3D portrait to dominate behind */}
          <div className="hidden lg:block lg:col-span-5 pointer-events-none">
            <div className="h-full min-h-[400px] flex items-end justify-end p-8 text-right font-mono text-[10px] text-text-muted/60 tracking-widest uppercase">
              <div>
                <div>PARALLAX // AXIS-Z</div>
                <div className="text-red-highlight/60">PORTRAIT ANCHOR ACTIVE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
