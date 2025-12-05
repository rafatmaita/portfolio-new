import { CVData, SkillCategory, Project, Education, Capability } from '@/types';

// ============================================
// CV Data Constants
// Requirements: 1.1, 1.2, 3.4, 3.5, 3.6, 5.3, 5.4, 5.5, 6.3, 6.4
// ============================================

/**
 * Personal Information
 * Requirements: 1.1, 1.2 - Hero section name and titles
 */
export const personalInfo = {
  name: "R'AFAT ALMAITA",
  titles: [
    'Full-Stack Web Developer',
    'AI Prompt Engineer',
    'Software Engineer',
    'AI Model Trainer',
  ],
  location: 'Zarqa, Jordan',
  email: 'rafatmaita2030@gmail.com',
  phone: '+962-795721257',
  github: 'github.com/rafatalmaita',
  linkedin: 'linkedin.com/in/rafatmaita',
} as const;

/**
 * Professional Summary
 */
export const professionalSummary = `Full-stack web developer skilled in Node.js, TypeScript, Python, ASP.NET, and React.js, with experience building scalable applications using MongoDB and PostgreSQL. Passionate about AI model training, prompt engineering, and enhancing web applications with intelligent features. Currently leading development at Plus Connect.`;

/**
 * Skills Data
 * Requirements: 3.4, 3.5, 3.6 - Skills categorization
 */
export const skills = {
  languages: ['JavaScript', 'TypeScript', 'Python', 'C++', 'Java', 'C#'],
  frontend: ['React.js', 'Next.js', 'SCSS'],
  backend: ['Node.js', 'Express.js', 'NestJS', 'Flask', 'ASP.NET'],
  databases: ['MongoDB', 'PostgreSQL'],
  aiMl: ['AI Training', 'Prompt Engineering', 'AI-assisted Development', 'AI Integration'],
  tools: ['Git', 'GitHub', 'MVC Pattern', 'Agile/Scrum'],
} as const;


/**
 * Skill Categories for Skills Section
 */
export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    skills: [...skills.languages],
    icon: 'code',
  },
  {
    name: 'Frontend',
    skills: [...skills.frontend],
    icon: 'layers',
  },
  {
    name: 'Backend',
    skills: [...skills.backend],
    icon: 'server',
  },
  {
    name: 'Databases',
    skills: [...skills.databases],
    icon: 'database',
  },
  {
    name: 'AI & ML',
    skills: [...skills.aiMl],
    icon: 'brain',
  },
  {
    name: 'Tools',
    skills: [...skills.tools],
    icon: 'wrench',
  },
];

/**
 * Work Experience Data
 * Requirements: 4.1 - Experience section
 */
export const workExperience = [
  {
    id: 'plus-connect',
    title: 'Full-Stack Developer',
    company: 'Plus Connect',
    period: '09/2025 - Present',
    description: 'Leading the development of a multi-vendor Store Builder platform. Designing secure APIs using NestJS and building high-performance frontends with Next.js & SCSS.',
    icon: 'globe',
    category: 'fullstack',
  },
  {
    id: 'menadevs',
    title: 'Software Engineer & AI Training',
    company: 'MenaDevs',
    period: '05/2024 - 09/2025',
    description: 'Developed and optimized AI prompts to enhance model accuracy. Integrated AI solutions (chatbots, UI generation) within web apps using React.js and Next.js. Refined AI-generated backend code (Node.js, Python, ASP.NET).',
    icon: 'brain',
    category: 'ai',
  },
  {
    id: 'orange-academy',
    title: 'Full-Stack Web Developer Trainee',
    company: 'Orange Coding Academy',
    period: '08/2023 - 01/2024',
    description: 'Completed intensive training on Node.js, Express.js, MongoDB, and PostgreSQL. Developed over 10 projects in Agile Scrum environments.',
    icon: 'code',
    category: 'fullstack',
  },
];

/**
 * Capabilities Data
 * Requirements: 4.1 - Experience/Capabilities section
 */
export const capabilities: Capability[] = [
  {
    id: 'fullstack-web',
    title: 'Full-Stack Web Development',
    description: 'Building scalable, responsive web applications using modern frameworks like Next.js, React, and Node.js with clean architecture principles.',
    icon: 'globe',
    category: 'fullstack',
  },
  {
    id: 'api-design',
    title: 'API Design & Architecture',
    description: 'Designing secure RESTful APIs with NestJS and Express.js, implementing robust authentication and comprehensive documentation.',
    icon: 'server',
    category: 'fullstack',
  },
  {
    id: 'database-design',
    title: 'Database Design & Optimization',
    description: 'Architecting efficient database schemas with PostgreSQL and MongoDB, implementing optimized queries for high-performance applications.',
    icon: 'database',
    category: 'fullstack',
  },
  {
    id: 'prompt-engineering',
    title: 'AI Prompt Engineering',
    description: 'Crafting effective prompts for large language models to achieve precise, consistent, and high-quality AI-generated outputs.',
    icon: 'sparkles',
    category: 'ai',
  },
  {
    id: 'model-training',
    title: 'AI Model Training',
    description: 'Training and optimizing AI models for specific use cases, improving accuracy and domain-specific performance.',
    icon: 'brain',
    category: 'ai',
  },
  {
    id: 'ai-integration',
    title: 'AI Integration',
    description: 'Integrating AI capabilities into web applications, from chatbots to intelligent UI generation and content automation systems.',
    icon: 'cpu',
    category: 'ai',
  },
];

/**
 * Projects Data
 * Requirements: 5.3, 5.4, 5.5 - Featured projects
 */
export const projects: Project[] = [
  {
    id: 'divine-secrets-store',
    title: 'Divine Secrets Store',
    description: 'A skincare e-commerce platform featuring product catalog, shopping cart, secure checkout, and user account management with a focus on elegant user experience.',
    techStack: ['Node.js', 'Express.js', 'PostgreSQL', 'React.js'],
    gradient: 'from-pink-500 to-purple-500',
    link: undefined,
  },
  {
    id: 'gearupshop',
    title: 'GearUpShop',
    description: 'An automotive accessories e-commerce platform with secure payment processing, inventory management, and an intuitive shopping experience for car enthusiasts.',
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'React.js'],
    gradient: 'from-purple-500 to-blue-500',
    link: undefined,
  },
  {
    id: 'book-reading-platform',
    title: 'Book-Reading Platform',
    description: 'A digital library platform enabling users to discover, read, and organize their book collections with personalized recommendations and reading progress tracking.',
    techStack: ['HTML5', 'CSS', 'JavaScript'],
    gradient: 'from-cyan-500 to-blue-500',
    link: undefined,
  },
];

/**
 * Education Data
 * Requirements: 6.3, 6.4 - Education timeline
 */
export const education: Education[] = [
  {
    institution: 'Hashemite University',
    program: "Bachelor's in Software Engineering",
    period: '2020 - 2024',
  },
  {
    institution: 'Coding Academy by Orange',
    program: 'Full-Stack Web Development Bootcamp',
    period: '2023 - 2024',
  },
];

/**
 * Complete CV Data Object
 */
export const cvData: CVData = {
  personal: {
    name: personalInfo.name,
    titles: [...personalInfo.titles],
    location: personalInfo.location,
    email: personalInfo.email,
    phone: personalInfo.phone,
    github: personalInfo.github,
    linkedin: personalInfo.linkedin,
  },
  summary: professionalSummary,
  skills: {
    languages: [...skills.languages],
    frontend: [...skills.frontend],
    backend: [...skills.backend],
    databases: [...skills.databases],
    aiMl: [...skills.aiMl],
    tools: [...skills.tools],
  },
  projects,
  education,
};


/**
 * Hero Section CTA Buttons
 */
export const heroCtaButtons = [
  {
    label: 'View Projects',
    href: '#projects',
    variant: 'primary' as const,
  },
  {
    label: 'Get in Touch',
    href: '#contact',
    variant: 'secondary' as const,
  },
];

/**
 * Navigation Links
 */
export const navigationLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Social Links
 */
export const socialLinks = [
  {
    name: 'GitHub',
    url: `https://${personalInfo.github}`,
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: `https://${personalInfo.linkedin}`,
    icon: 'linkedin',
  },
  {
    name: 'Email',
    url: `mailto:${personalInfo.email}`,
    icon: 'mail',
  },
];

/**
 * Site Metadata
 */
export const siteMetadata = {
  title: "R'afat Almaita | Full-Stack Developer & AI Prompt Engineer",
  description: "Portfolio of R'afat Almaita, a Software Engineer based in Jordan specializing in Next.js, NestJS, and AI Integration. Experienced in building scalable web applications and AI model training.",
  author: personalInfo.name,
  keywords: [
    'Full-Stack Developer',
    'AI Prompt Engineer',
    'Software Engineer Jordan',
    'Next.js Developer',
    'NestJS',
    'React.js',
    'Web Development',
    'Rafat Maita',
  ],
};
