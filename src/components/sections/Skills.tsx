'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { SectionHeading, GlassCard, LineIcon } from '@/components/ui';
import { getMotionVariants } from '@/lib/animations';
import { skillCategories } from '@/lib/constants';
import { useReducedMotion } from '@/hooks';
import type { SkillsProps, SkillCategory } from '@/types';

// Lazy load Three.js components for better performance
// Requirements: 10.4 - Performance optimization
const Scene = dynamic(() => import('@/components/three/Scene'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10" />
  )
});
const FloatingIcons = dynamic(() => import('@/components/three/FloatingIcons'), { ssr: false });

// Icon mapping for skill categories (Lineicons names)
const categoryIcons: Record<string, string> = {
  code: 'code',
  layers: 'layers',
  brain: 'bulb',
  server: 'server',
  database: 'database',
  wrench: 'cog',
};

// Glow colors for each category
const categoryGlows: Record<string, 'purple' | 'blue' | 'cyan'> = {
  Languages: 'purple',
  Frontend: 'cyan',
  Backend: 'blue',
  Databases: 'purple',
  'AI & ML': 'cyan',
  Tools: 'blue',
};

interface SkillCategoryCardProps {
  category: SkillCategory;
  index: number;
  prefersReducedMotion?: boolean;
}

function SkillCategoryCard({ category, index, prefersReducedMotion = false }: SkillCategoryCardProps) {
  const glow = categoryGlows[category.name] || 'purple';
  const iconName = categoryIcons[category.icon] || 'code';
  const itemVariants = getMotionVariants('staggerItem', prefersReducedMotion);

  return (
    <motion.div variants={itemVariants}>
      <GlassCard glow={glow} className="h-full">
        {/* Category Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`
            p-2 rounded-lg
            ${glow === 'purple' ? 'bg-purple-500/20 text-purple-400' : ''}
            ${glow === 'blue' ? 'bg-blue-500/20 text-blue-400' : ''}
            ${glow === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' : ''}
          `}>
            <LineIcon name={iconName} size="xl" />
          </div>
          <h3 className={`
            text-xl font-semibold
            ${glow === 'purple' ? 'text-purple-300' : ''}
            ${glow === 'blue' ? 'text-blue-300' : ''}
            ${glow === 'cyan' ? 'text-cyan-300' : ''}
          `}>
            {category.name}
          </h3>
        </div>

        {/* Glowing Divider */}
        <div className={`
          h-px mb-6 opacity-50
          ${glow === 'purple' ? 'bg-gradient-to-r from-transparent via-purple-500 to-transparent' : ''}
          ${glow === 'blue' ? 'bg-gradient-to-r from-transparent via-blue-500 to-transparent' : ''}
          ${glow === 'cyan' ? 'bg-gradient-to-r from-transparent via-cyan-500 to-transparent' : ''}
        `} />

        {/* Skills List */}
        {/* Respects reduced motion preference (Requirement 10.4) */}
        <ul className="space-y-3">
          {category.skills.map((skill, skillIndex) => (
            <motion.li
              key={skill}
              className="flex items-center gap-2 text-gray-300"
              initial={{ opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion ? 0 : -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: prefersReducedMotion ? 0 : index * 0.1 + skillIndex * 0.05,
                duration: prefersReducedMotion ? 0.01 : 0.3 
              }}
            >
              <span className={`
                w-1.5 h-1.5 rounded-full
                ${glow === 'purple' ? 'bg-purple-400' : ''}
                ${glow === 'blue' ? 'bg-blue-400' : ''}
                ${glow === 'cyan' ? 'bg-cyan-400' : ''}
              `} />
              {skill}
            </motion.li>
          ))}
        </ul>
      </GlassCard>
    </motion.div>
  );
}

export function Skills({ categories = skillCategories }: SkillsProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // Get appropriate animation variants based on reduced motion preference
  // Requirements: 10.4 - Reduced motion support for accessibility
  const containerVariants = getMotionVariants('staggerContainer', prefersReducedMotion);
  
  // Collect all skills for floating icons
  const allSkills = categories.flatMap(cat => cat.skills);

  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 px-4 md:px-8 overflow-hidden"
    >
      {/* 3D Floating Icons Background - Requirements: 3.2 */}
      {/* Only render 3D scene if user doesn't prefer reduced motion (Requirement 10.4) */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <Scene>
            <FloatingIcons icons={allSkills.slice(0, 8)} radius={4} />
          </Scene>
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="Technologies and tools I work with to bring ideas to life"
        />

        {/* Skills Grid - Requirements: 3.1, 3.3 */}
        {/* Respects reduced motion preference (Requirement 10.4) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category, index) => (
            <SkillCategoryCard
              key={category.name}
              category={category}
              index={index}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>
      </div>

      {/* Background Gradient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}

export default Skills;
