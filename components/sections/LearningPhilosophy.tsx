'use client';

import React from 'react';

export const LearningPhilosophy: React.FC = () => {
  const steps = [
    { label: 'CURIOUS', desc: 'Questioning boundaries' },
    { label: 'RESEARCH', desc: 'Studying mechanics & paradigms' },
    { label: 'EXPERIMENT', desc: 'Testing raw hypotheses' },
    { label: 'BUILD', desc: 'Constructing prototypes' },
    { label: 'LEARN', desc: 'Extracting principles' },
    { label: 'REPEAT', desc: 'Evolving execution' },
  ];

  return (
    <section className="relative w-full py-32 px-6 sm:px-12 md:px-20 z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs text-red-highlight tracking-[0.3em] uppercase">
            // PHILOSOPHY
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-red-500/30 to-transparent" />
        </div>

        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="font-mono text-xs tracking-[0.3em] text-red-cinematic uppercase mb-4">
            THE WAY I LEARN
          </div>
          <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl text-text-primary tracking-tight font-bold mb-6">
            &ldquo;I learn by <span className="italic text-red-cinematic">doing.&rdquo;</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl mx-auto">
            True mastery doesn&rsquo;t live in passive observation. It emerges when ideas collide with concrete digital execution.
          </p>
        </div>

        {/* Cinematic Workflow Loop Conduit */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {steps.map((step, idx) => (
            <div
              key={step.label}
              className="relative p-5 rounded-lg glass-panel text-center group hover:border-red-500/40 transition-all duration-300"
            >
              <div className="font-mono text-[10px] text-red-highlight/80 tracking-widest uppercase mb-2">
                PHASE 0{idx + 1}
              </div>
              <div className="font-mono text-sm sm:text-base font-bold text-text-primary mb-1 group-hover:text-red-highlight transition-colors">
                {step.label}
              </div>
              <div className="font-sans text-[11px] text-text-muted leading-snug">
                {step.desc}
              </div>

              {/* Indicator Arrow */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-red-500/40 text-xs font-mono z-20">
                  &rarr;
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
