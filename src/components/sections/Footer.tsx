'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { LineIcon } from '@/components/ui/LineIcon';

/**
 * Footer Section Component
 * Requirements: 8.1, 8.2
 * - Display "Built with Next.js, GSAP & Three.js" text
 * - Dynamically display the current year
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#8B5CF6]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          {/* Built with text - Requirement 8.1 */}
          <div className="flex items-center gap-2 text-gray-400 text-sm font-mono">
            <LineIcon name="code-1" className="text-[#8B5CF6]" size="sm" />
            <span>Built with</span>
            <span className="text-white">Next.js</span>
            <span>,</span>
            <span className="text-[#8B5CF6]">GSAP</span>
            <span>&</span>
            <span className="text-[#06B6D4]">Three.js</span>
          </div>
          
          {/* Copyright with dynamic year - Requirement 8.2 */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>© {currentYear}</span>
            <span>R&apos;AFAT ALMAITA</span>
            <span className="text-gray-600">•</span>
            <span className="flex items-center gap-1">
              Made with <LineIcon name="heart" className="text-red-500" size="xs" />
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
