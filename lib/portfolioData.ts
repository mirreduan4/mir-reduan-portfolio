export interface SkillGroup {
  id: string;
  category: string;
  skills: string[];
  index: string;
  position: 'neck' | 'shoulder' | 'arm' | 'lower' | 'opposite' | 'deep';
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'tech-ai',
    category: 'TECHNOLOGY & AI',
    skills: ['AI Exploration', 'AI Tools & Workflows', 'Prompt Engineering', 'Technology Research', 'Digital Tools'],
    index: '01',
    position: 'neck'
  },
  {
    id: 'visual-design',
    category: 'VISUAL & DESIGN',
    skills: ['Photo Editing', 'Graphic Design', 'Poster Design'],
    index: '02',
    position: 'shoulder'
  },
  {
    id: 'content-media',
    category: 'CONTENT & MEDIA',
    skills: ['Video Editing', 'Content Creation', 'Photography / Photoshoot', 'Visual Storytelling'],
    index: '03',
    position: 'arm'
  },
  {
    id: 'development',
    category: 'DEVELOPMENT',
    skills: ['Web Development', 'Game Development', 'Interactive Digital Experiences'],
    index: '04',
    position: 'lower'
  },
  {
    id: 'analysis-creative',
    category: 'ANALYSIS & CREATIVE',
    skills: ['Analysis', 'Research', 'Story Writing', 'Creative Ideation', 'Teaching'],
    index: '05',
    position: 'opposite'
  },
  {
    id: 'personal-interests',
    category: 'PERSONAL INTERESTS',
    skills: ['Gaming', 'Athletics'],
    index: '06',
    position: 'deep'
  }
];

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  focus: string[];
  note?: string;
}

export const projects: ProjectItem[] = [
  {
    id: 'redoxide-platform',
    number: '01',
    title: 'REDOXIDE',
    tagline: 'Digital Content & Creative Technology',
    description: 'A personal digital platform exploring technology, artificial intelligence, gaming and useful digital tools through short-form content and visual storytelling.',
    focus: ['AI', 'Technology', 'Gaming', 'Content Creation', 'Research']
  },
  {
    id: 'ai-exploration',
    number: '02',
    title: 'AI EXPLORATION',
    tagline: 'Experimenting with the Future',
    description: 'Exploring emerging AI tools, creative workflows and practical applications of artificial intelligence across content creation, research, design and productivity.',
    focus: ['LLM Workflows', 'Generative Media', 'Prompt Architecture', 'Tool Research']
  },
  {
    id: 'visual-lab',
    number: '03',
    title: 'VISUAL LAB',
    tagline: 'Photography · Editing · Graphic Design',
    description: 'A collection of visual experiments spanning photography, photo manipulation, poster design, graphic composition and digital artwork.',
    focus: ['Composition', 'Color Grading', 'DSLR Cinematics', 'Poster Systems']
  },
  {
    id: 'digital-stories',
    number: '04',
    title: 'DIGITAL STORIES',
    tagline: 'Storytelling Through Visual Media',
    description: 'Exploring storytelling through writing, visual composition, video editing and cinematic concepts.',
    focus: ['Narrative Design', 'Cinematography', 'Pacing & Rhythm', 'Micro-Essays']
  },
  {
    id: 'web-experiences',
    number: '05',
    title: 'WEB EXPERIENCES',
    tagline: 'Designing Interactive Digital Experiences',
    description: 'Exploring web development with a focus on immersive interfaces, interaction, visual design and experimental digital experiences.',
    focus: ['WebGL & Three.js', 'Interactive Audio', 'GSAP Motion', 'Spatial UI'],
    note: 'This cinematic portfolio represents the primary active web experience.'
  },
  {
    id: 'game-experiments',
    number: '06',
    title: 'GAME & INTERACTIVE EXPERIMENTS',
    tagline: 'Gaming · Game Development · Interactive Ideas',
    description: 'Exploring game mechanics, interactive experiences and the creative possibilities of games as a medium.',
    focus: ['Spatial Mechanics', 'Interactive Prototypes', 'Game Loops', 'World Building']
  }
];

export interface CertificationItem {
  id: string;
  number: string;
  title: string;
  issuer?: string;
  focus: string[];
}

export const certifications: CertificationItem[] = [
  {
    id: 'gemini-ai',
    number: '01',
    title: 'GEMINI CERTIFIED AI EDUCATOR',
    issuer: 'Google Gemini',
    focus: ['Artificial Intelligence', 'AI-assisted Education', 'Digital Learning']
  },
  {
    id: 'cyber-hygiene',
    number: '02',
    title: 'CYBER HYGIENE & SECURITY COURSE',
    focus: ['Cyber Hygiene', 'Digital Security', 'Online Safety']
  },
  {
    id: 'machine-learning',
    number: '03',
    title: 'MACHINE LEARNING COURSE',
    issuer: 'Udemy',
    focus: ['Machine Learning', 'Artificial Intelligence', 'Data & Model Fundamentals']
  }
];

export interface EducationItem {
  category: 'FORMAL EDUCATION' | 'ISLAMIC EDUCATION' | 'SELF-DIRECTED LEARNING';
  title: string;
  institution?: string;
  stream?: string;
  description?: string;
}

export const educationArchive: EducationItem[] = [
  {
    category: 'FORMAL EDUCATION',
    title: 'Higher Secondary Certificate (HSC)',
    stream: 'Humanities',
    institution: 'BAF Shaheen College Dhaka'
  },
  {
    category: 'ISLAMIC EDUCATION',
    title: 'Hifz-ul-Qur\'an',
    institution: 'Qawmi Madrasa'
  },
  {
    category: 'SELF-DIRECTED LEARNING',
    title: 'Artificial Intelligence',
    description: 'Multiple courses and extensive independent study of AI tools, workflows and practical applications.'
  },
  {
    category: 'SELF-DIRECTED LEARNING',
    title: 'Technology',
    description: 'Continuous independent study of modern technology, digital tools and emerging technologies.'
  }
];
