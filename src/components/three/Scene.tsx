'use client';

import { Suspense, useSyncExternalStore, ReactNode, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';

interface SceneProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
}

/**
 * Check if WebGL is supported
 * Requirements: 10.3 - WebGL fallback for unsupported browsers
 */
function isWebGLSupported(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/**
 * Check if user prefers reduced motion
 * Requirements: 10.4 - Reduced motion support for accessibility
 */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Default fallback gradient background
 * Shown when WebGL is not supported or reduced motion is preferred
 */
function GradientFallback() {
  return (
    <div 
      className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20"
      aria-hidden="true"
    />
  );
}

/**
 * Scene Component - Three.js Canvas wrapper
 * Requirements: 10.3 - Lightweight R3F components
 * Requirements: 10.4 - Reduced motion support for accessibility
 * 
 * Features:
 * - WebGL support detection with fallback
 * - Reduced motion preference detection
 * - Performance-optimized Canvas settings
 * - Suspense boundary for lazy loading
 */
export function Scene({ 
  children, 
  className = '', 
  fallback 
}: SceneProps) {
  // Use useSyncExternalStore for reduced motion preference
  const subscribeToReducedMotion = useCallback((callback: () => void) => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', callback);
    return () => mediaQuery.removeEventListener('change', callback);
  }, []);
  
  const getReducedMotionSnapshot = useCallback(() => prefersReducedMotion(), []);
  const getReducedMotionServerSnapshot = useCallback(() => false, []);
  
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  
  // Check WebGL support (only needs to be checked once, doesn't change)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const subscribeToWebGL = useCallback((_callback: () => void) => {
    // WebGL support doesn't change, so no subscription needed
    return () => {};
  }, []);
  
  const getWebGLSnapshot = useCallback(() => isWebGLSupported(), []);
  const getWebGLServerSnapshot = useCallback(() => false, []);
  
  const webGLSupported = useSyncExternalStore(
    subscribeToWebGL,
    getWebGLSnapshot,
    getWebGLServerSnapshot
  );

  // Show fallback if WebGL not supported or reduced motion preferred
  if (!webGLSupported || reducedMotion) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        {fallback || <GradientFallback />}
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 1.5]} // Limit DPR for better performance
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false, // Disable stencil buffer for performance
          depth: true,
        }}
        style={{ background: 'transparent' }}
        frameloop="always" // Continuous rendering for animations
      >
        <Suspense fallback={null}>
          {/* Ambient lighting for subtle illumination */}
          <ambientLight intensity={0.5} />
          
          {/* Point light for depth */}
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          
          {children}
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Scene;
