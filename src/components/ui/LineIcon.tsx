'use client';

import { cn } from '@/lib/utils';

interface LineIconProps {
  name: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
};

/**
 * LineIcon Component
 * Wrapper for Lineicons v5 icon font
 * 
 * @param name - Icon name without 'lni-' prefix (e.g., 'github', 'linkedin', 'envelope')
 * @param className - Additional CSS classes
 * @param size - Predefined size options
 */
export function LineIcon({ name, className, size = 'md' }: LineIconProps) {
  return (
    <i 
      className={cn(
        'lni',
        `lni-${name}`,
        sizeClasses[size],
        className
      )}
      aria-hidden="true"
    />
  );
}

export default LineIcon;
