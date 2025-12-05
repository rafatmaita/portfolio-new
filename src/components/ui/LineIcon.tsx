'use client';

import { cn } from '@/lib/utils';

interface LineIconProps {
  name: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

const sizeClasses = {
  xs: 'text-xs',      // 12px
  sm: 'text-sm',      // 14px
  md: 'text-lg',      // 18px
  lg: 'text-xl',      // 20px
  xl: 'text-2xl',     // 24px (default)
  '2xl': 'text-3xl',  // 30px
  '3xl': 'text-4xl',  // 36px
  '4xl': 'text-5xl',  // 48px
};

/**
 * LineIcon Component
 * Wrapper for Lineicons v5 icon font
 * 
 * @param name - Icon name without 'lni-' prefix (e.g., 'github', 'linkedin', 'envelope')
 * @param className - Additional CSS classes
 * @param size - Predefined size options (default: 'xl' = 24px)
 */
export function LineIcon({ name, className, size = 'xl' }: LineIconProps) {
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
