// CV Data Model
export interface CVData {
  personal: {
    name: string;
    titles: string[];
    location: string;
    email: string;
    phone: string;
    github: string;
    linkedin?: string;
  };
  summary: string;
  skills: {
    languages: string[];
    frontend?: string[];
    backend?: string[];
    databases?: string[];
    frameworks?: string[];
    aiMl: string[];
    tools?: string[];
  };
  projects: Project[];
  education: Education[];
}

// Project Model
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  gradient: string;
  link?: string;
}

// Education Model
export interface Education {
  institution: string;
  program: string;
  period?: string;
}

// Skill Category Model
export interface SkillCategory {
  name: string;
  skills: string[];
  icon: string;
}

// Animation Configuration
export interface AnimationConfig {
  duration: number;
  ease: string | number[];
  delay?: number;
  stagger?: number;
}

// Theme Configuration
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    glass: string;
  };
  spacing: number[];
  borderRadius: Record<string, string>;
}

// Contact Form Data
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Component Props
export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'purple' | 'blue' | 'cyan' | 'none';
}

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'textarea';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
}

export interface HeroProps {
  name: string;
  titles: string[];
  ctaButtons: { label: string; href: string; variant: 'primary' | 'secondary' }[];
}

export interface SkillsProps {
  categories: SkillCategory[];
}

export interface ProjectsProps {
  projects: Project[];
}

export interface EducationProps {
  items: Education[];
}

export interface AboutProps {
  summary: string;
  location: string;
}

// Capability Model for Experience Section
export interface Capability {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'fullstack' | 'ai';
}

export interface ExperienceProps {
  capabilities: Capability[];
}

export interface ParticleFieldProps {
  count?: number;
  color?: string;
  size?: number;
}

export interface FloatingIconsProps {
  icons: string[];
  radius?: number;
}
