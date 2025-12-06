'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { LineIcon } from '@/components/ui/LineIcon';
import { personalInfo } from '@/lib/constants';
import { getMotionVariants } from '@/lib/animations';
import { useReducedMotion } from '@/hooks';
import { ContactFormData } from '@/types';

// Form validation errors interface
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// Submission state type
type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Contact Section Component
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 * - Terminal-style UI design
 * - Name, Email, Message input fields
 * - Contact info display (email, phone)
 * - Form validation
 * - Command-line submission animation
 */
export function Contact() {
  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  
  // Validation errors state
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Submission state
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  
  // Terminal animation refs
  const terminalRef = useRef<HTMLDivElement>(null);
  const commandLineRef = useRef<HTMLDivElement>(null);
  
  // Reduced motion preference
  // Requirements: 10.4 - Reduced motion support for accessibility
  const prefersReducedMotion = useReducedMotion();
  const containerVariants = getMotionVariants('staggerContainer', prefersReducedMotion);
  const itemVariants = getMotionVariants('staggerItem', prefersReducedMotion);


  /**
   * Validate email format
   */
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validate form fields
   * Requirements: 7.5 - Prevent submission with empty fields
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Check name - must not be empty or whitespace only
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Check email - must not be empty and must be valid format
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email.trim())) {
      newErrors.email = 'Invalid email format';
    }
    
    // Check message - must not be empty or whitespace only
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle input changes
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  /**
   * Animate terminal command execution
   * Requirements: 7.3 - Command-line "send_message" animation
   */
  const animateTerminalCommand = async () => {
    if (!commandLineRef.current) return;
    
    // Create typing animation for command
    const tl = gsap.timeline();
    
    tl.to(commandLineRef.current, {
      opacity: 1,
      duration: 0.2,
    });
    
    // Simulate command execution
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return tl;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Start submission animation
    setSubmissionState('submitting');
    
    try {
      // Animate terminal command
      await animateTerminalCommand();
      
      // Simulate API call (in real app, this would send to backend)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success state
      setSubmissionState('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setSubmissionState('idle');
      }, 3000);
      
    } catch {
      setSubmissionState('error');
      setTimeout(() => setSubmissionState('idle'), 3000);
    }
  };


  return (
    <section
      id="contact"
      className="relative min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8B5CF6]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          title="Get In Touch"
          subtitle="Let's build something amazing together"
          align="center"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mt-10 sm:mt-12 md:mt-16">
          {/* Contact Form - Terminal Style */}
          {/* Respects reduced motion preference (Requirement 10.4) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <GlassCard glow="purple" hover={false} className="overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 pb-4 border-b border-white/10 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-gray-400 text-sm font-mono">
                    <LineIcon name="monitor-code" className="inline-block mr-2" size="sm" />
                    contact_terminal
                  </span>
                </div>
              </div>
              
              {/* Terminal Content */}
              <div ref={terminalRef} className="font-mono">
                {/* Command prompt header */}
                <div className="text-gray-400 text-sm mb-6">
                  <span className="text-[#8B5CF6]">rafat@portfolio</span>
                  <span className="text-white">:</span>
                  <span className="text-[#06B6D4]">~/contact</span>
                  <span className="text-white">$ </span>
                  <span className="text-green-400">init_message</span>
                </div>
                
                {/* Form */}
                <form onSubmit={handleSubmit} noValidate>
                  <motion.div variants={itemVariants}>
                    <Input
                      label="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name..."
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <Input
                      label="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email..."
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <Input
                      label="message"
                      name="message"
                      type="textarea"
                      placeholder="Type your message..."
                      value={formData.message}
                      onChange={handleChange}
                      error={errors.message}
                      required
                    />
                  </motion.div>

                  
                  {/* Command Line Animation Area */}
                  <AnimatePresence mode="wait">
                    {submissionState === 'submitting' && (
                      <motion.div
                        ref={commandLineRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mb-4 text-sm"
                      >
                        <div className="text-gray-400">
                          <span className="text-[#8B5CF6]">$</span> send_message --to=rafat
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <motion.div
                            className="w-2 h-2 bg-[#8B5CF6] rounded-full"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          />
                          <span className="text-[#06B6D4]">Encrypting and sending message...</span>
                        </div>
                      </motion.div>
                    )}
                    
                    {submissionState === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30"
                      >
                        <div className="flex items-center gap-2 text-green-400">
                          <LineIcon name="check-circle-1" size="lg" />
                          <span className="font-mono text-sm">
                            Message sent successfully! [exit code: 0]
                          </span>
                        </div>
                      </motion.div>
                    )}
                    
                    {submissionState === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30"
                      >
                        <div className="flex items-center gap-2 text-red-400">
                          <LineIcon name="xmark-circle" size="lg" />
                          <span className="font-mono text-sm">
                            Error: Failed to send message. Please try again.
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Submit Button */}
                  {/* Respects reduced motion preference (Requirement 10.4) */}
                  <motion.div variants={itemVariants} className="mt-6">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full group"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {submissionState === 'submitting' ? (
                          <>
                            <motion.div
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                              animate={prefersReducedMotion ? {} : { rotate: 360 }}
                              transition={prefersReducedMotion ? {} : { duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <LineIcon name="telegram" className="transition-transform group-hover:translate-x-1" size="sm" />
                            ./send_message
                          </>
                        )}
                      </span>
                    </Button>
                  </motion.div>
                </form>
              </div>
            </GlassCard>
          </motion.div>

          
          {/* Contact Information */}
          {/* Respects reduced motion preference (Requirement 10.4) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Direct Contact Card */}
            <motion.div variants={itemVariants}>
              <GlassCard glow="cyan" hover={true}>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <LineIcon name="monitor-code" className="text-[#06B6D4]" size="lg" />
                  Direct Contact
                </h3>
                
                <div className="space-y-4">
                  {/* Email */}
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center">
                      <LineIcon name="envelope-1" className="text-white" size="lg" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-400 text-xs sm:text-sm font-mono">$ cat email.txt</p>
                      <p className="text-white group-hover:text-[#8B5CF6] transition-colors text-sm sm:text-base truncate">
                        {personalInfo.email}
                      </p>
                    </div>
                  </a>
                  
                  {/* Phone */}
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-lg bg-gradient-to-br from-[#06B6D4] to-[#8B5CF6] flex items-center justify-center">
                      <LineIcon name="phone" className="text-white" size="lg" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-400 text-xs sm:text-sm font-mono">$ cat phone.txt</p>
                      <p className="text-white group-hover:text-[#06B6D4] transition-colors text-sm sm:text-base">
                        {personalInfo.phone}
                      </p>
                    </div>
                  </a>
                </div>
              </GlassCard>
            </motion.div>
            
            {/* Availability Status Card */}
            <motion.div variants={itemVariants}>
              <GlassCard glow="purple" hover={true}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    {/* Only animate ping if user doesn't prefer reduced motion */}
                    {!prefersReducedMotion && (
                      <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                    )}
                  </div>
                  <span className="text-green-400 font-mono text-sm">
                    status: available
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  Currently open to new opportunities and collaborations. 
                  Feel free to reach out for projects, consulting, or just to say hello!
                </p>
              </GlassCard>
            </motion.div>
            
            {/* Response Time Card */}
            <motion.div variants={itemVariants}>
              <GlassCard glow="blue" hover={true}>
                <div className="font-mono text-sm">
                  <div className="text-gray-400 mb-2">
                    <span className="text-[#8B5CF6]">$</span> get_response_time
                  </div>
                  <div className="text-white">
                    <span className="text-[#06B6D4]">→</span> Usually within 24-48 hours
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
