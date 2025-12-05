'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { ParticleFieldProps } from '@/types';

/**
 * Simple seeded random number generator for deterministic particle positions
 * This ensures consistent positions across re-renders
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export function ParticleField({ 
  count = 500, 
  color = '#8B5CF6', 
  size = 0.02 
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Generate particle positions using seeded random for deterministic results
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread particles in a sphere-like distribution using seeded random
      positions[i3] = (seededRandom(i * 6 + 1) - 0.5) * 10;
      positions[i3 + 1] = (seededRandom(i * 6 + 2) - 0.5) * 10;
      positions[i3 + 2] = (seededRandom(i * 6 + 3) - 0.5) * 10;
      
      // Seeded random velocities for movement
      velocities[i3] = (seededRandom(i * 6 + 4) - 0.5) * 0.01;
      velocities[i3 + 1] = (seededRandom(i * 6 + 5) - 0.5) * 0.01;
      velocities[i3 + 2] = (seededRandom(i * 6 + 6) - 0.5) * 0.01;
    }
    
    return { positions, velocities };
  }, [count]);

  // Animate particles
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Add subtle wave motion
      positions[i3] += particles.velocities[i3] + Math.sin(time + i * 0.1) * 0.001;
      positions[i3 + 1] += particles.velocities[i3 + 1] + Math.cos(time + i * 0.1) * 0.001;
      positions[i3 + 2] += particles.velocities[i3 + 2];
      
      // Wrap particles around boundaries
      if (Math.abs(positions[i3]) > 5) positions[i3] *= -0.9;
      if (Math.abs(positions[i3 + 1]) > 5) positions[i3 + 1] *= -0.9;
      if (Math.abs(positions[i3 + 2]) > 5) positions[i3 + 2] *= -0.9;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Slow rotation of entire particle system
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.1;
  });

  // Create buffer attribute
  const positionAttribute = useMemo(() => {
    return new THREE.BufferAttribute(particles.positions, 3);
  }, [particles.positions]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={positionAttribute} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default ParticleField;
