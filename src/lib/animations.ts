import { Variants, Transition } from 'framer-motion';
import gsap from 'gsap';

// ============================================
// Framer Motion Variants
// Requirements: 10.1 - Framer Motion scroll reveal animations
// ============================================

/**
 * Fade in animation variant
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/**
 * Fade in with direction variants
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};


export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/**
 * Slide up animation variant
 */
export const slideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/**
 * Scale animation variant
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/**
 * Stagger container variant for child animations
 */
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Stagger item variant (use with staggerContainer)
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ============================================
// Framer Motion Transition Presets
// ============================================

export const smoothTransition: Transition = {
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94],
};

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
};

// ============================================
// GSAP Utility Functions
// Requirements: 10.2 - GSAP cinematic animations
// ============================================

/**
 * Hero reveal animation - cinematic text reveal
 */
export const heroReveal = (element: HTMLElement | null, options?: { delay?: number }) => {
  if (!element) return;
  
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 100,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
      delay: options?.delay ?? 0,
    }
  );
};

/**
 * Text split animation - character by character reveal
 */
export const textSplitReveal = (element: HTMLElement | null, options?: { delay?: number; stagger?: number }) => {
  if (!element) return;
  
  const text = element.textContent || '';
  element.innerHTML = text
    .split('')
    .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
    .join('');
  
  const chars = element.querySelectorAll('span');
  
  return gsap.fromTo(
    chars,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: options?.stagger ?? 0.02,
      ease: 'power2.out',
      delay: options?.delay ?? 0,
    }
  );
};


/**
 * Timeline stagger animation - for lists and grids
 */
export const timelineStagger = (
  elements: HTMLElement[] | NodeListOf<Element> | null,
  options?: { delay?: number; stagger?: number; direction?: 'up' | 'down' | 'left' | 'right' }
) => {
  if (!elements || (Array.isArray(elements) && elements.length === 0)) return;
  
  const direction = options?.direction ?? 'up';
  const fromVars: gsap.TweenVars = { opacity: 0 };
  
  switch (direction) {
    case 'up':
      fromVars.y = 40;
      break;
    case 'down':
      fromVars.y = -40;
      break;
    case 'left':
      fromVars.x = 40;
      break;
    case 'right':
      fromVars.x = -40;
      break;
  }
  
  return gsap.fromTo(
    elements,
    fromVars,
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      stagger: options?.stagger ?? 0.15,
      ease: 'power2.out',
      delay: options?.delay ?? 0,
    }
  );
};

/**
 * Glow pulse animation - for neon effects
 */
export const glowPulse = (element: HTMLElement | null, options?: { color?: string; duration?: number }) => {
  if (!element) return;
  
  const color = options?.color ?? 'rgba(139, 92, 246, 0.5)';
  const duration = options?.duration ?? 2;
  
  return gsap.to(element, {
    boxShadow: `0 0 30px ${color}, 0 0 60px ${color}`,
    duration: duration,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

/**
 * Parallax scroll effect
 */
export const parallaxScroll = (element: HTMLElement | null, options?: { speed?: number }) => {
  if (!element) return;
  
  const speed = options?.speed ?? 0.5;
  
  return gsap.to(element, {
    y: () => window.scrollY * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

/**
 * Scroll-triggered reveal animation
 */
export const scrollReveal = (element: HTMLElement | null, options?: { delay?: number; y?: number }) => {
  if (!element) return;
  
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: options?.y ?? 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      delay: options?.delay ?? 0,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

/**
 * Floating animation - for 3D-like hover effects
 */
export const floatingAnimation = (element: HTMLElement | null, options?: { amplitude?: number; duration?: number }) => {
  if (!element) return;
  
  const amplitude = options?.amplitude ?? 10;
  const duration = options?.duration ?? 3;
  
  return gsap.to(element, {
    y: amplitude,
    duration: duration,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

// ============================================
// Animation Configuration Constants
// ============================================

export const animationConfig = {
  // Framer Motion
  fadeIn: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  slideUp: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  stagger: { staggerChildren: 0.1 },
  
  // GSAP
  heroReveal: { duration: 1.2, ease: 'power3.out' },
  textSplit: { duration: 0.8, stagger: 0.02 },
  
  // Lenis
  smoothScroll: { lerp: 0.1, duration: 1.2 },
} as const;

// ============================================
// Reduced Motion Variants
// Requirements: 10.4 - Reduced motion support for accessibility
// ============================================

/**
 * Reduced motion variants - instant transitions for accessibility
 * Use these when prefers-reduced-motion is enabled
 */
export const reducedMotionVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } },
  },
  fadeInUp: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } },
  },
  slideUp: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } },
  },
  staggerItem: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } },
  },
} as const;

/**
 * Get animation variants based on reduced motion preference
 * @param variants - The full animation variants
 * @param prefersReducedMotion - Whether user prefers reduced motion
 * @returns Appropriate variants based on preference
 */
export function getMotionVariants(
  variantName: keyof typeof reducedMotionVariants,
  prefersReducedMotion: boolean
): Variants {
  if (prefersReducedMotion) {
    return reducedMotionVariants[variantName];
  }
  
  switch (variantName) {
    case 'fadeIn':
      return fadeIn;
    case 'fadeInUp':
      return fadeInUp;
    case 'slideUp':
      return slideUp;
    case 'staggerContainer':
      return staggerContainer;
    case 'staggerItem':
      return staggerItem;
    default:
      return fadeIn;
  }
}
