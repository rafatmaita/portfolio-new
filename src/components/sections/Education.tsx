'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { LineIcon } from '@/components/ui/LineIcon';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading, GlassCard } from '@/components/ui';
import { education } from '@/lib/constants';
import { useReducedMotion } from '@/hooks';
import type { EducationProps, Education as EducationType } from '@/types';

// Register GSAP ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Timeline Item Component
 * Requirements: 6.1, 6.3, 6.4 - Timeline design with education entries
 */
interface TimelineItemProps {
  item: EducationType;
  index: number;
  isLast: boolean;
}

function TimelineItem({ item, index, isLast }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;
  const iconName = index === 0 ? 'graduation' : 'book';
  const glowColor = isEven ? 'purple' : 'cyan';

  return (
    <div
      ref={itemRef}
      className="timeline-item relative flex items-center gap-8 md:gap-12"
    >
      {/* Timeline connector line */}
      {!isLast && (
        <div
          className="timeline-line absolute left-[23px] md:left-1/2 top-16 w-0.5 h-[calc(100%+2rem)] -translate-x-1/2"
          style={{
            background: `linear-gradient(180deg, ${isEven ? 'rgba(139, 92, 246, 0.5)' : 'rgba(6, 182, 212, 0.5)'} 0%, ${!isEven ? 'rgba(139, 92, 246, 0.3)' : 'rgba(6, 182, 212, 0.3)'} 100%)`,
          }}
        />
      )}

      {/* Timeline node/dot */}
      <div
        className={`
          timeline-node absolute left-0 md:left-1/2 z-10
          w-12 h-12 rounded-full flex items-center justify-center
          -translate-x-0 md:-translate-x-1/2
          ${isEven
            ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 text-purple-400 border border-purple-500/50'
            : 'bg-gradient-to-br from-cyan-500/30 to-blue-500/30 text-cyan-400 border border-cyan-500/50'
          }
          shadow-lg
        `}
        style={{
          boxShadow: isEven
            ? '0 0 20px rgba(139, 92, 246, 0.3)'
            : '0 0 20px rgba(6, 182, 212, 0.3)',
        }}
      >
        <LineIcon name={iconName} size="lg" />
      </div>

      {/* Content card - alternating sides on desktop */}
      <div
        className={`
          ml-16 md:ml-0 md:w-[calc(50%-3rem)]
          ${isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}
        `}
      >
        <GlassCard glow={glowColor as 'purple' | 'cyan'} hover className="group">
          {/* Institution badge */}
          <div
            className={`
              inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-4
              ${isEven
                ? 'bg-purple-500/20 text-purple-300'
                : 'bg-cyan-500/20 text-cyan-300'
              }
            `}
          >
            <LineIcon name={iconName} size="sm" />
            <span>Education</span>
          </div>

          {/* Institution name */}
          <h3
            className={`
              text-xl md:text-2xl font-bold mb-2
              ${isEven ? 'text-purple-200' : 'text-cyan-200'}
              group-hover:text-white transition-colors duration-300
            `}
          >
            {item.institution}
          </h3>

          {/* Program */}
          <p className="text-gray-300 text-lg mb-3">
            {item.program}
          </p>

          {/* Period if available */}
          {item.period && (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <LineIcon name="calendar" size="sm" />
              <span>{item.period}</span>
            </div>
          )}

          {/* Decorative gradient line */}
          <div
            className={`
              h-0.5 mt-4 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300
              ${isEven
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500'
              }
            `}
          />
        </GlassCard>
      </div>
    </div>
  );
}


/**
 * Education Section Component
 * Requirements: 6.1, 6.2, 6.3, 6.4
 *
 * Features:
 * - Vertical timeline design (6.1)
 * - GSAP scroll-triggered transitions (6.2)
 * - Hashemite University display (6.3)
 * - Orange Coding Academy display (6.4)
 */
export function Education({ items = education }: EducationProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  /**
   * GSAP Timeline Animations
   * Requirements: 6.2 - Scroll-triggered GSAP transitions with stagger effect
   * Requirements: 10.4 - Reduced motion support for accessibility
   */
  useEffect(() => {
    if (!timelineRef.current || typeof window === 'undefined') return;

    // Skip GSAP animations if user prefers reduced motion
    if (prefersReducedMotion) {
      // Just show elements immediately without animation
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      const timelineNodes = timelineRef.current?.querySelectorAll('.timeline-node');
      const timelineLines = timelineRef.current?.querySelectorAll('.timeline-line');
      
      timelineItems?.forEach((item) => {
        (item as HTMLElement).style.opacity = '1';
        (item as HTMLElement).style.transform = 'none';
      });
      timelineNodes?.forEach((node) => {
        (node as HTMLElement).style.opacity = '1';
        (node as HTMLElement).style.transform = 'none';
      });
      timelineLines?.forEach((line) => {
        (line as HTMLElement).style.opacity = '1';
        (line as HTMLElement).style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Animate timeline items with stagger
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      if (timelineItems && timelineItems.length > 0) {
        gsap.fromTo(
          timelineItems,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate timeline nodes separately for a pop effect
      const timelineNodes = timelineRef.current?.querySelectorAll('.timeline-node');
      if (timelineNodes && timelineNodes.length > 0) {
        gsap.fromTo(
          timelineNodes,
          {
            scale: 0,
            rotation: -180,
          },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.3,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate timeline lines
      const timelineLines = timelineRef.current?.querySelectorAll('.timeline-line');
      if (timelineLines && timelineLines.length > 0) {
        gsap.fromTo(
          timelineLines,
          {
            scaleY: 0,
            transformOrigin: 'top',
          },
          {
            scaleY: 1,
            duration: 0.8,
            stagger: 0.3,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, timelineRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            transform: 'translate(30%, -20%)',
          }}
        />
        <div
          className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
            transform: 'translate(-30%, 20%)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <SectionHeading
          title="Education"
          subtitle="Academic foundation and professional training"
        />

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative mt-16">
          {/* Central timeline line for desktop */}
          {/* Respects reduced motion preference (Requirement 10.4) */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            style={{
              background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.3) 0%, rgba(6, 182, 212, 0.3) 50%, transparent 100%)',
            }}
            initial={{ scaleY: prefersReducedMotion ? 1 : 0, transformOrigin: 'top' }}
            animate={isInView ? { scaleY: 1 } : { scaleY: prefersReducedMotion ? 1 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 1, delay: prefersReducedMotion ? 0 : 0.2, ease: 'easeOut' }}
          />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-16">
            {items.map((item, index) => (
              <TimelineItem
                key={`${item.institution}-${index}`}
                item={item}
                index={index}
                isLast={index === items.length - 1}
              />
            ))}
          </div>
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

export default Education;
