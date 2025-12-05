'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { LineIcon } from '@/components/ui/LineIcon';
import type { Project } from '@/types';

/**
 * ProjectCard Component
 * Requirements: 5.1 - Project cards with gradient placeholder, title, description, tech stack, and CTA
 * Requirements: 5.2 - Parallax and motion fade-in effects on hover
 * Requirements: 10.4 - Reduced motion support for accessibility
 */

interface ProjectCardProps {
  project: Project;
  index?: number;
  prefersReducedMotion?: boolean;
}

export function ProjectCard({ project, index = 0, prefersReducedMotion = false }: ProjectCardProps) {
  // Mouse position for parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for parallax
  const springConfig = { stiffness: 150, damping: 15 };
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), springConfig);

  // Only enable parallax if user doesn't prefer reduced motion
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="relative group perspective-1000"
      initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: prefersReducedMotion ? 0.01 : 0.6, 
        delay: prefersReducedMotion ? 0 : index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={prefersReducedMotion ? {} : {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className={`
        relative rounded-2xl overflow-hidden
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-[0_0_20px_rgba(139,92,246,0.2)]
        hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]
        transition-shadow duration-300
      `}>
        {/* Gradient Placeholder Image */}
        <div className={`
          relative h-48 w-full overflow-hidden
          bg-gradient-to-br ${project.gradient}
        `}>
          {/* Animated overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-black/20"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Floating gradient orbs for visual interest */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium rounded-full
                  bg-white/5 text-gray-300 border border-white/10
                  hover:bg-white/10 hover:border-purple-500/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* View Details CTA Button */}
          {/* Respects reduced motion preference (Requirement 10.4) */}
          <motion.button
            className={`
              inline-flex items-center gap-2 px-4 py-2
              text-sm font-medium text-white
              bg-gradient-to-r from-purple-500 to-blue-500
              rounded-lg
              hover:from-purple-600 hover:to-blue-600
              transition-all duration-300
              shadow-[0_0_15px_rgba(139,92,246,0.3)]
              hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]
            `}
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
          >
            View Details
            <LineIcon name="link-2-angular-right" size="sm" />
          </motion.button>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
