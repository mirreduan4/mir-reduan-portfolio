'use client';

import React, { useState } from 'react';
import { projects, ProjectItem } from '@/lib/portfolioData';
import { ProjectModal } from '../ui/ProjectModal';
import { soundSynth } from '@/lib/soundSynth';

export const ProjectsVault: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="relative w-full min-h-screen py-32 px-6 sm:px-12 md:px-20 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs text-red-highlight tracking-[0.3em] uppercase">
            // 03 &mdash; ARTIFACTS
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-red-500/30 to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight">
            WHAT I <span className="italic text-red-cinematic">CREATE</span>
          </h2>
          <p className="font-mono text-xs text-text-muted tracking-widest uppercase max-w-xs">
            FLOATING ARTIFACT VAULT &middot; SELECT SCHEMATIC TO EXPAND SPECIFICATION
          </p>
        </div>

        {/* 3D Glass / Metallic Project Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                soundSynth.playTick(660, 0.05);
                setSelectedProject(project);
              }}
              onMouseEnter={() => soundSynth.playHover()}
              className="group relative cursor-pointer rounded-xl p-6 sm:p-8 glass-panel glass-panel-hover overflow-hidden flex flex-col justify-between min-h-[340px]"
            >
              {/* Internal Red Reflection Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-cinematic/40 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between font-mono text-xs text-text-muted tracking-widest uppercase mb-4">
                  <span className="text-red-highlight">SPEC // {project.number}</span>
                  <span className="group-hover:text-red-cinematic transition-colors">[EXPAND]</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-text-primary font-normal tracking-tight mb-2 group-hover:text-red-highlight transition-colors">
                  {project.title}
                </h3>

                <div className="font-mono text-xs text-red-cinematic/90 tracking-wider mb-4">
                  {project.tagline}
                </div>

                <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                {project.focus.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.08] text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Inspection Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
