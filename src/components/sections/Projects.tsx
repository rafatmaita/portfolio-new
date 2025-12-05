'use client';

import { motion } from 'framer-motion';
import { SectionHeading, ProjectCard } from '@/components/ui';
import { getMotionVariants } from '@/lib/animations';
import { projects } from '@/lib/constants';
import { useReducedMotion } from '@/hooks';
import type { ProjectsProps } from '@/types';

/**
 * Projects Section Component
 * Requirements: 5.1 - Project cards with screenshot placeholder, title, description, tech stack, and CTA
 * Requirements: 5.2 - Parallax and motion fade-in effects
 * Requirements: 5.3 - GearUpShop project with Node.js, MongoDB, React stack
 * Requirements: 5.4 - Divine Secrets Store project with Node.js, PostgreSQL, React stack
 * Requirements: 5.5 - Book Reading Platform project with HTML5, JavaScript, CSS stack
 */

export function Projects({ projects: projectsData = projects }: ProjectsProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // Get appropriate animation variants based on reduced motion preference
  // Requirements: 10.4 - Reduced motion support for accessibility
  const containerVariants = getMotionVariants('staggerContainer', prefersReducedMotion);

  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 px-4 md:px-8 overflow-hidden"
    >
      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          title="Featured Projects"
          subtitle="A selection of projects showcasing my expertise in full-stack development"
        />

        {/* Projects Grid */}
        {/* Respects reduced motion preference (Requirement 10.4) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>
      </div>

      {/* Background Gradient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-2/3 right-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}

export default Projects;
