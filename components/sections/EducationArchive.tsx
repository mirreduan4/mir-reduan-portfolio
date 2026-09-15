'use client';

import React from 'react';
import { educationArchive } from '@/lib/portfolioData';

export const EducationArchive: React.FC = () => {
  return (
    <section id="education" className="relative w-full min-h-screen py-32 px-6 sm:px-12 md:px-20 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs text-red-highlight tracking-[0.3em] uppercase">
            // 06 &mdash; KNOWLEDGE FOUNDATION
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-red-500/30 to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight">
            EDUCATION <span className="italic text-red-cinematic">ARCHIVE</span>
          </h2>
          <p className="font-mono text-xs text-text-muted tracking-widest uppercase">
            FORMAL &middot; ISLAMIC &middot; SELF-DIRECTED RESEARCH
          </p>
        </div>

        {/* Timeline / Conduit Layout */}
        <div className="space-y-6">
          {educationArchive.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-xl glass-panel relative flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-red-500/30 transition-colors"
            >
              <div className="max-w-2xl">
                <div className="font-mono text-[11px] text-red-highlight tracking-widest uppercase mb-1">
                  {item.category}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-text-primary mb-2">
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="text-sm text-text-secondary leading-relaxed font-sans">
                    {item.description}
                  </p>
                ) : (
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-text-muted">
                    {item.stream && (
                      <span className="px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-text-primary/90">
                        {item.stream}
                      </span>
                    )}
                    {item.institution && <span>{item.institution}</span>}
                  </div>
                )}
              </div>

              <div className="font-mono text-xs text-text-muted tracking-widest shrink-0 uppercase">
                VERIFIED ARCHIVE
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
