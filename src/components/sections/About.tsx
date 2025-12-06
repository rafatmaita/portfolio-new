'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { LineIcon } from '@/components/ui/LineIcon';
import { AboutProps } from '@/types';
import { getMotionVariants } from '@/lib/animations';
import { useReducedMotion } from '@/hooks';

/**
 * About Section Component
 * Requirements: 2.1, 2.2, 2.3, 2.4
 * 
 * Features:
 * - Professional summary from CV (2.2)
 * - Location display showing "Jordan" (2.4)
 * - Motion reveal animations on scroll (2.1)
 * - Subtle code-themed background animations (2.3)
 */
export function About({ summary, location }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  // Get appropriate animation variants based on reduced motion preference
  // Requirements: 10.4 - Reduced motion support for accessibility
  const containerVariants = getMotionVariants('staggerContainer', prefersReducedMotion);
  const itemVariants = getMotionVariants('staggerItem', prefersReducedMotion);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Code-themed background animations (Requirement 2.3) */}
      {/* Respects reduced motion preference (Requirement 10.4) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating code symbols - static when reduced motion is preferred */}
        <motion.div
          className="absolute top-20 left-[10%] text-white/5 text-6xl font-mono"
          animate={prefersReducedMotion ? { opacity: 0.07 } : {
            y: [0, -20, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {'</>'}
        </motion.div>
        
        <motion.div
          className="absolute top-40 right-[15%] text-white/5 text-5xl font-mono"
          animate={prefersReducedMotion ? { opacity: 0.06 } : {
            y: [0, 15, 0],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          {'{ }'}
        </motion.div>
        
        <motion.div
          className="absolute bottom-32 left-[20%] text-white/5 text-4xl font-mono"
          animate={prefersReducedMotion ? { opacity: 0.06 } : {
            y: [0, -15, 0],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        >
          {'//'}
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 right-[25%] text-white/5 text-5xl font-mono"
          animate={prefersReducedMotion ? { opacity: 0.07 } : {
            y: [0, 20, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        >
          {'=>'}
        </motion.div>

        {/* Gradient glow accents */}
        <div 
          className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
            transform: 'translate(50%, 50%)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
        {/* Section Heading with motion reveal (Requirement 2.1) */}
        <SectionHeading
          title="About Me"
          subtitle="Crafting digital experiences with code and creativity"
        />

        {/* Content with stagger animations (Requirement 2.1) */}
        {/* Respects reduced motion preference (Requirement 10.4) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {/* Main Summary Card (Requirement 2.2) */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <GlassCard glow="purple" className="h-full">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#06B6D4]/20 border border-white/10 flex items-center justify-center">
                  <LineIcon name="monitor-code" className="text-[#8B5CF6]" size="xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    Professional Summary
                  </h3>
                  <p className="text-sm text-white/50 font-mono">
                    {'// who_am_i.md'}
                  </p>
                </div>
              </div>
              
              <p className="text-white/80 leading-relaxed text-lg">
                {summary}
              </p>

              {/* Code-themed decorative element */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-white/40 font-mono text-sm">
                  <LineIcon name="code-1" size="sm" />
                  <span>const passion = </span>
                  <span className="text-[#8B5CF6]">&quot;Building the future&quot;</span>
                  <span>;</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Location & Quick Info Card (Requirement 2.4) */}
          <motion.div variants={itemVariants}>
            <GlassCard glow="cyan" className="h-full">
              <div className="flex flex-col h-full">
                {/* Location Display */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-gradient-to-br from-[#06B6D4]/20 to-[#8B5CF6]/20 border border-white/10 flex items-center justify-center">
                      <LineIcon name="map-marker-1" className="text-[#06B6D4]" size="lg" />
                    </div>
                    <span className="text-white/50 text-sm font-mono">location</span>
                  </div>
                  <p className="text-2xl font-semibold text-white">
                    {location}
                  </p>
                </div>

                {/* Decorative code block */}
                <div className="flex-1 p-4 rounded-xl bg-black/30 border border-white/5 font-mono text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <LineIcon name="code-s" className="text-[#8B5CF6]" size="sm" />
                    <span className="text-white/40">developer.json</span>
                  </div>
                  <div className="space-y-1 text-white/60">
                    <p><span className="text-[#06B6D4]">&quot;status&quot;</span>: <span className="text-green-400">&quot;Available&quot;</span>,</p>
                    <p><span className="text-[#06B6D4]">&quot;focus&quot;</span>: <span className="text-[#F472B6]">&quot;AI & Web&quot;</span>,</p>
                    <p><span className="text-[#06B6D4]">&quot;coffee&quot;</span>: <span className="text-yellow-400">true</span></p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom neon edge */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), rgba(139, 92, 246, 0.3), transparent)',
        }}
      />
    </section>
  );
}

export default About;
