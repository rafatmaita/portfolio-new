'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeading, GlassCard, LineIcon } from '@/components/ui';
import { getMotionVariants } from '@/lib/animations';
import { capabilities } from '@/lib/constants';
import { useReducedMotion } from '@/hooks';
import type { ExperienceProps, Capability } from '@/types';

/**
 * Icon mapping for capability cards (Lineicons v5 names)
 */
const iconMap: Record<string, string> = {
  globe: 'globe-1',
  server: 'storage-hdd-2',
  database: 'database-2',
  sparkles: 'star-fat',
  brain: 'bulb-2',
  cpu: 'gear-1',
};

/**
 * Capability Card Component
 * Requirements: 4.1, 4.2 - Capability cards with hover micro-interactions
 */
interface CapabilityCardProps {
  capability: Capability;
  index: number;
  prefersReducedMotion?: boolean;
}

function CapabilityCard({ capability, prefersReducedMotion = false }: Omit<CapabilityCardProps, 'index'>) {
  const isAI = capability.category === 'ai';
  const glow = isAI ? 'cyan' : 'purple';
  const iconName = iconMap[capability.icon] || 'world';
  const itemVariants = getMotionVariants('staggerItem', prefersReducedMotion);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={prefersReducedMotion ? {} : { 
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
    >
      <GlassCard glow={glow} hover={false} className="h-full group cursor-pointer">
        {/* Icon Container with hover effect */}
        {/* Respects reduced motion preference (Requirement 10.4) */}
        <motion.div 
          className={`
            inline-flex p-3 rounded-xl mb-4
            ${isAI 
              ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400' 
              : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400'
            }
            transition-all duration-300
            group-hover:scale-110
          `}
          whileHover={prefersReducedMotion ? {} : { rotate: [0, -10, 10, 0] }}
          transition={prefersReducedMotion ? {} : { duration: 0.5 }}
        >
          <LineIcon name={iconName} size="xl" />
        </motion.div>

        {/* Title */}
        <h3 className={`
          text-xl font-semibold mb-3
          ${isAI ? 'text-cyan-300' : 'text-purple-300'}
          group-hover:text-white transition-colors duration-300
        `}>
          {capability.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {capability.description}
        </p>

        {/* Hover indicator line */}
        {/* Respects reduced motion preference (Requirement 10.4) */}
        <motion.div 
          className={`
            h-0.5 mt-4 rounded-full
            ${isAI 
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500'
            }
          `}
          initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
          whileHover={prefersReducedMotion ? {} : { scaleX: 1 }}
          transition={prefersReducedMotion ? {} : { duration: 0.3 }}
          style={{ originX: 0 }}
        />
      </GlassCard>
    </motion.div>
  );
}

/**
 * Experience Section Component
 * Requirements: 4.1, 4.2, 4.3
 * 
 * Features:
 * - Combines full-stack and AI capabilities (4.1)
 * - Micro-interaction animations on hover (4.2)
 * - Vertical stagger animations on scroll (4.3)
 */
export function Experience({ capabilities: capabilitiesData = capabilities }: ExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  // Get appropriate animation variants based on reduced motion preference
  // Requirements: 10.4 - Reduced motion support for accessibility
  const containerVariants = getMotionVariants('staggerContainer', prefersReducedMotion);

  // Separate capabilities by category
  const fullstackCapabilities = capabilitiesData.filter(c => c.category === 'fullstack');
  const aiCapabilities = capabilitiesData.filter(c => c.category === 'ai');

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            transform: 'translate(-30%, -50%)',
          }}
        />
        <div 
          className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
            transform: 'translate(30%, 50%)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <SectionHeading
          title="Experience & Capabilities"
          subtitle="Bridging full-stack development with cutting-edge AI technologies"
        />

        {/* Full-Stack Capabilities - Requirements: 4.1, 4.3 */}
        <div className="mb-16">
          {/* Respects reduced motion preference (Requirement 10.4) */}
          <motion.div
            initial={{ opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion ? 0 : -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion ? 0 : -20 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-2 rounded-lg bg-purple-500/20">
              <LineIcon name="globe-1" className="text-purple-400" size="lg" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Full-Stack Development</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {fullstackCapabilities.map((capability) => (
              <CapabilityCard
                key={capability.id}
                capability={capability}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </motion.div>
        </div>

        {/* AI Capabilities - Requirements: 4.1, 4.3 */}
        <div>
          {/* Respects reduced motion preference (Requirement 10.4) */}
          <motion.div
            initial={{ opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion ? 0 : -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion ? 0 : -20 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, delay: prefersReducedMotion ? 0 : 0.3 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-2 rounded-lg bg-cyan-500/20">
              <LineIcon name="bulb-2" className="text-cyan-400" size="lg" />
            </div>
            <h3 className="text-2xl font-semibold text-white">AI & Machine Learning</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {aiCapabilities.map((capability) => (
              <CapabilityCard
                key={capability.id}
                capability={capability}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom neon edge */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.3), transparent)',
        }}
      />
    </section>
  );
}

export default Experience;
