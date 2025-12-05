'use client';

import { motion } from 'framer-motion';
import { ButtonProps } from '@/types';

export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles = `
    relative inline-flex items-center justify-center
    px-6 py-3 rounded-xl font-medium
    transition-all duration-300 ease-out
    overflow-hidden
  `;

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]
      text-white
      shadow-[0_0_20px_rgba(139,92,246,0.3)]
      hover:shadow-[0_0_30px_rgba(139,92,246,0.5),0_0_60px_rgba(6,182,212,0.3)]
    `,
    secondary: `
      bg-transparent
      border border-white/20
      text-white
      hover:bg-white/5
      hover:border-white/40
      shadow-[0_0_10px_rgba(255,255,255,0.05)]
      hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]
    `,
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      href={href}
      onClick={onClick}
      type={href ? undefined : type}
      className={combinedStyles}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </MotionComponent>
  );
}

export default Button;
