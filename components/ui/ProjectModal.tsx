'use client';

import React from 'react';
import { ProjectItem } from '@/lib/portfolioData';
import { soundSynth } from '@/lib/soundSynth';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl"
      onClick={() => {
        soundSynth.playTick(550, 0.05);
        onClose();
      }}
    >
      <div
        className="relative w-full max-w-2xl p-6 sm:p-10 rounded-2xl bg-[#0c080a] border border-red-500/30 shadow-2xl shadow-black overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Light */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-red-cinematic to-transparent" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="font-mono text-xs text-red-highlight tracking-widest uppercase mb-1">
              // PROJECT {project.number} &mdash; ARCHIVE SPEC
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-text-primary tracking-tight">
              {project.title}
            </h3>
            <div className="font-mono text-xs text-red-cinematic/90 tracking-wide mt-1">
              {project.tagline}
            </div>
          </div>

          <button
            onClick={() => {
              soundSynth.playTick(550, 0.05);
              onClose();
            }}
            className="p-2 text-text-muted hover:text-text-primary transition-colors font-mono text-sm"
            aria-label="Close Project Specification"
          >
            [ESC &times;]
          </button>
        </div>

        {/* Description */}
        <div className="mb-8 text-text-secondary text-sm sm:text-base leading-relaxed font-sans">
          <p>{project.description}</p>
          {project.note && (
            <div className="mt-4 p-3 rounded bg-red-950/20 border border-red-500/20 text-xs font-mono text-red-highlight">
              NOTICE: {project.note}
            </div>
          )}
        </div>

        {/* Focus Areas */}
        <div className="mb-8">
          <div className="font-mono text-xs tracking-widest text-text-muted uppercase mb-3">
            EXPLORATION VECTORS:
          </div>
          <div className="flex flex-wrap gap-2">
            {project.focus.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-mono rounded bg-[#18090d] border border-red-500/20 text-text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-end pt-4 border-t border-white/[0.08]">
          <button
            onClick={() => {
              soundSynth.playTick(550, 0.05);
              onClose();
            }}
            className="px-6 py-2.5 rounded font-mono text-xs tracking-widest text-text-primary bg-red-cinematic/80 hover:bg-red-cinematic transition-colors uppercase"
          >
            DISMISS SPEC
          </button>
        </div>
      </div>
    </div>
  );
};
