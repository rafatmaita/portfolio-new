'use client';

import { motion } from 'framer-motion';
import { GlassCardProps } from '@/types';

const glowStyles = {
  purple: 'shadow-[0_0_20px_rgba(139,92,246,0.3),0_0_40px_rgba(139,92,246,0.1)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4),0_0_60px_rgba(139,92,246,0.2)]',
  blue: 'shadow-[0_0_20px_rgba(59,130,246,0.3),0_0_40px_rgba(59,130,246,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4),0_0_60px_rgba(59,130,246,0.2)]',
  cyan: 'shadow-[0_0_20px_rgba(6,182,212,0.3),0_0_40px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4),0_0_60px_rgba(6,182,212,0.2)]',
  none: '',
};

export function GlassCard({
  children,
  className = '',
  hover = true,
  glow = 'purple',
}: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6
        bg-white/5 backdrop-blur-xl
        border border-white/10
        ${glowStyles[glow]}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover ? { 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : undefined}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;
