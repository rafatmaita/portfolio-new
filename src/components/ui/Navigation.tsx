'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from '@/components/providers';
import { navigationLinks, personalInfo } from '@/lib/constants';
import { useReducedMotion } from '@/hooks';
import { LineIcon } from '@/components/ui/LineIcon';

/**
 * Navigation Component
 * Requirements: 9.2 - Smooth scroll to section on nav link click
 * Requirements: 10.4 - Reduced motion support for accessibility
 * 
 * Features:
 * - Fixed navigation bar with glass morphism effect
 * - Smooth scroll to sections using Lenis
 * - Mobile responsive hamburger menu
 * - Active section highlighting
 */
export function Navigation() {
  const { lenis } = useSmoothScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Handle scroll to detect active section and navbar background
  useEffect(() => {
    const handleScroll = () => {
      // Add background when scrolled
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section using Lenis (Requirement 9.2)
  const scrollToSection = useCallback((href: string) => {
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement && lenis) {
      lenis.scrollTo(targetElement, {
        offset: 0,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else if (targetElement) {
      // Fallback for when Lenis isn't available
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }

    setIsOpen(false);
  }, [lenis]);

  // Handle link click
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <>
      {/* Desktop Navigation */}
      {/* Respects reduced motion preference (Requirement 10.4) */}
      <motion.nav
        initial={{ y: prefersReducedMotion ? 0 : -100, opacity: prefersReducedMotion ? 1 : 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-purple-500/5'
            : 'bg-white/[0.02] backdrop-blur-md'
        }`}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo / Name */}
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              className="text-lg font-bold gradient-text hover:opacity-80 transition-opacity"
            >
              {personalInfo.name.split(' ')[0]}
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navigationLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'text-white/60 hover:text-white/90'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId={prefersReducedMotion ? undefined : "activeSection"}
                        className="absolute inset-0 rounded-lg bg-white/10"
                        transition={prefersReducedMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <LineIcon name="xmark" size="xl" /> : <LineIcon name="menu-hamburger-1" size="xl" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {/* Respects reduced motion preference (Requirement 10.4) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: prefersReducedMotion ? 0 : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: prefersReducedMotion ? 0 : '100%' }}
              transition={prefersReducedMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 bottom-0 w-64 bg-white/5 backdrop-blur-2xl border-l border-white/10 shadow-xl"
            >
              <div className="flex flex-col pt-20 px-6">
                {navigationLinks.map((link, index) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      initial={{ opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion ? 0 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: prefersReducedMotion ? 0 : index * 0.05 }}
                      className={`py-3 text-lg font-medium border-b border-white/5 transition-colors ${
                        isActive
                          ? 'text-white'
                          : 'text-white/60 hover:text-white/90'
                      }`}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;
