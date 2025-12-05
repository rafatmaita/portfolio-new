'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import type { FloatingIconsProps } from '@/types';

interface FloatingElementProps {
  text: string;
  position: [number, number, number];
  index: number;
}

/**
 * Simple seeded random number generator for deterministic positions
 * This ensures consistent positions across re-renders
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function FloatingElement({ text, position, index }: FloatingElementProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create unique animation offset based on index
  const offset = useMemo(() => index * 0.5, [index]);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Subtle rotation animation
    meshRef.current.rotation.y = Math.sin(time * 0.3 + offset) * 0.2;
    meshRef.current.rotation.x = Math.cos(time * 0.2 + offset) * 0.1;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={meshRef} position={position}>
        {/* Glass-like rounded box */}
        <boxGeometry args={[1.2, 0.5, 0.1]} />
        <meshStandardMaterial
          color="#8B5CF6"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.8}
        />
        
        {/* Text label */}
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={1}
        >
          {text}
        </Text>
      </mesh>
    </Float>
  );
}

export function FloatingIcons({ 
  icons, 
  radius = 3 
}: FloatingIconsProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Calculate positions in a circular/spherical arrangement
  // Using seeded random for deterministic positions
  const positions = useMemo(() => {
    return icons.map((_, index) => {
      const angle = (index / icons.length) * Math.PI * 2;
      const seed1 = index * 3 + 1;
      const seed2 = index * 3 + 2;
      const seed3 = index * 3 + 3;
      const y = (seededRandom(seed1) - 0.5) * 2;
      const x = Math.cos(angle) * radius * (0.7 + seededRandom(seed2) * 0.3);
      const z = Math.sin(angle) * radius * (0.7 + seededRandom(seed3) * 0.3);
      return [x, y, z] as [number, number, number];
    });
  }, [icons, radius]);

  // Slow rotation of entire group
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={groupRef}>
      {icons.map((icon, index) => (
        <FloatingElement
          key={`${icon}-${index}`}
          text={icon}
          position={positions[index]}
          index={index}
        />
      ))}
    </group>
  );
}

export default FloatingIcons;
