'use client';

import { motion } from 'framer-motion';
import { SectionHeadingProps } from '@/types';

export function SectionHeading({
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  const alignmentClasses = align === 'center' ? 'text-center' : 'text-left';

  return (
    <motion.div
      className={`mb-8 sm:mb-10 md:mb-12 ${alignmentClasses}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <h2
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-2">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
