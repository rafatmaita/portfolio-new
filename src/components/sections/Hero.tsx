'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/Button';
import { HeroProps } from '@/types';
import { getMotionVariants } from '@/lib/animations';
import { useReducedMotion } from '@/hooks';

// Lazy load Three.js components for better performance
// Requirements: 10.4 - Performance optimization
const Scene = dynamic(() => import('@/components/three/Scene'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20" />
  )
});
const ParticleField = dynamic(() => import('@/components/three/ParticleField'), { ssr: false });

/**
 * Hero Section Component
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 10.2
 * 
 * Features:
 * - Three.js particle background
 * - GSAP cinematic name reveal animation
 * - Animated cycling role titles
 * - CTA buttons with glow effects
 * - Animated scroll indicator
 * - Gradient glow aesthetics
 */
export function Hero({ name, titles, ctaButtons }: HeroProps) {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const nameRevealedRef = useRef(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isNameRevealed, setIsNameRevealed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Get appropriate animation variants based on reduced motion preference
  // Requirements: 10.4 - Reduced motion support for accessibility
  const containerVariants = getMotionVariants('staggerContainer', prefersReducedMotion);
  const itemVariants = getMotionVariants('staggerItem', prefersReducedMotion);

  // GSAP cinematic name reveal animation (Requirement 10.2)
  // Respects reduced motion preference (Requirement 10.4)
  useEffect(() => {
    if (!nameRef.current) return;

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      const chars = nameRef.current.querySelectorAll('.char');
      chars.forEach((char) => {
        (char as HTMLElement).style.opacity = '1';
      });
      // Use ref to track revealed state to avoid setState in effect
      nameRevealedRef.current = true;
      return;
    }

    const ctx = gsap.context(() => {
      // Split name into characters for reveal
      const chars = nameRef.current!.querySelectorAll('.char');
      
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 100,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.05,
          ease: 'power3.out',
          onComplete: () => {
            nameRevealedRef.current = true;
          },
        }
      );
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Cycle through role titles (Requirement 1.2)
  // Check nameRevealedRef periodically to start title cycling
  useEffect(() => {
    // Start cycling after a delay to allow name reveal animation
    const startDelay = setTimeout(() => {
      setIsNameRevealed(true);
    }, prefersReducedMotion ? 100 : 1500);
    
    return () => clearTimeout(startDelay);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isNameRevealed) return;
    
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [titles.length, isNameRevealed]);

  // Split name into characters for animation
  const nameChars = name.split('').map((char, index) => (
    <span
      key={index}
      className="char inline-block"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient glow overlays (Requirement 1.6) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left purple glow */}
        <div 
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            transform: 'translate(-30%, -30%)',
          }}
        />
        {/* Bottom-right cyan glow */}
        <div 
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
            transform: 'translate(30%, 30%)',
          }}
        />
        {/* Center accent glow */}
        <div 
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(244, 114, 182, 0.3) 0%, transparent 60%)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Three.js Particle Background (Requirement 1.3) */}
      <Scene className="z-0">
        <ParticleField count={600} color="#8B5CF6" size={0.015} />
        <ParticleField count={300} color="#06B6D4" size={0.01} />
      </Scene>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Name Typography (Requirement 1.1) */}
          <h1
            ref={nameRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            style={{ perspective: '1000px' }}
          >
            <span className="gradient-text">{nameChars}</span>
          </h1>

          {/* Animated Role Titles (Requirement 1.2) */}
          {/* Respects reduced motion preference (Requirement 10.4) */}
          <div className="h-12 sm:h-14 md:h-16 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTitleIndex}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -30 }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-xl sm:text-2xl md:text-3xl text-white/80 font-light absolute inset-0 flex items-center justify-center"
              >
                <span className="inline-flex items-center gap-2">
                  <span 
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]"
                    style={{ boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)' }}
                  />
                  {titles[currentTitleIndex]}
                </span>
              </motion.p>
            </AnimatePresence>
          </div>

          {/* CTA Buttons (Requirement 1.4) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            {ctaButtons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant}
                href={button.href}
              >
                {button.label}
              </Button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator (Requirement 1.5) */}
      {/* Respects reduced motion preference (Requirement 10.4) */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: prefersReducedMotion ? 0 : 2, duration: prefersReducedMotion ? 0.01 : 0.6 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white/80 transition-colors cursor-pointer"
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={prefersReducedMotion ? {} : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-sm font-light tracking-wider">Scroll</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.a>
      </motion.div>

      {/* Neon edge effect at bottom (Requirement 1.6) */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), rgba(6, 182, 212, 0.5), transparent)',
        }}
      />
    </section>
  );
}

export default Hero;
