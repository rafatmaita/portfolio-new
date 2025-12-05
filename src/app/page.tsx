'use client';

import { SmoothScrollProvider } from '@/components/providers';
import {
  Hero,
  About,
  Skills,
  Experience,
  Projects,
  Education,
  Contact,
  Footer,
} from '@/components/sections';
import { Navigation } from '@/components/ui';
import {
  personalInfo,
  heroCtaButtons,
  professionalSummary,
  skillCategories,
  capabilities,
  projects,
  education,
} from '@/lib/constants';

/**
 * Main Portfolio Page
 * Requirements: 9.1 - Apply Lenis smooth scrolling behavior
 * Requirements: 9.2 - Smooth scroll to section on nav link click
 * 
 * Assembles all sections in correct order:
 * 1. Hero - Landing section with particles and animated text
 * 2. About - Professional summary and background
 * 3. Skills - Categorized technical skills with 3D elements
 * 4. Experience - Capabilities and expertise
 * 5. Projects - Featured project showcase
 * 6. Education - Educational background timeline
 * 7. Contact - Contact form and information
 * 8. Footer - Attribution and copyright
 */
export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* Navigation with smooth scroll behavior (Requirement 9.2) */}
      <Navigation />
      
      <main className="relative min-h-screen bg-[var(--background)] text-white overflow-x-hidden">
        {/* Background gradient overlay - Requirements: 9.3, 11.3 */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Subtle grid pattern for engineering aesthetic */}
          <div className="absolute inset-0 bg-grid-pattern opacity-50" />
          
          {/* Gradient glow orbs */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[150px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[180px]" />
        </div>

        {/* Page sections with data from constants */}
        <Hero
          name={personalInfo.name}
          titles={[...personalInfo.titles]}
          ctaButtons={heroCtaButtons}
        />
        <About
          summary={professionalSummary}
          location={personalInfo.location}
        />
        <Skills categories={skillCategories} />
        <Experience capabilities={capabilities} />
        <Projects projects={projects} />
        <Education items={education} />
        <Contact />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
