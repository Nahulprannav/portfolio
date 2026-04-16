import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * ProjectShowcase Component
 * Design: Interactive 3D project cards with neon aesthetics
 * - Glowing neon frames with dynamic colors
 * - Hover animations and scaling effects
 * - Floating motion in the world
 * - Click to interact and view details
 */

interface ProjectShowcaseProps {
  position: [number, number, number];
  title: string;
  description: string;
}

export default function ProjectShowcase({ position, title, description }: ProjectShowcaseProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Floating animation
    const floatOffset = Math.sin(state.clock.elapsedTime + position[0] * 0.5) * 0.5;
    groupRef.current.position.y = position[1] + floatOffset;

    // Rotation animation
    groupRef.current.rotation.y += delta * 0.3;

    // Scale animation on hover
    const targetScale = hovered ? 1.15 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        setClicked(!clicked);
      }}
    >
      {/* Outer glow frame */}
      <mesh position={[0, 0, -0.2]}>
        <boxGeometry args={[3.3, 2.3, 0.1]} />
        <meshBasicMaterial
          color={hovered ? '#ff006e' : '#00d4ff'}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main project card frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3, 2, 0.2]} />
        <meshStandardMaterial
          color={hovered ? '#ff006e' : '#00d4ff'}
          metalness={0.85}
          roughness={0.15}
          emissive={hovered ? '#ff006e' : '#00d4ff'}
          emissiveIntensity={hovered ? 0.6 : 0.25}
        />
      </mesh>

      {/* Inner content background */}
      <mesh position={[0, 0, 0.12]} castShadow>
        <boxGeometry args={[2.8, 1.8, 0.08]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          metalness={0.3} 
          roughness={0.8}
          emissive="#0a0e27"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Title display */}
      <mesh position={[0, 0.5, 0.2]} scale={[1, 1, 1]}>
        <planeGeometry args={[2.6, 0.6]} />
        <meshBasicMaterial map={createTextTexture(title, true, hovered)} />
      </mesh>

      {/* Description display */}
      <mesh position={[0, -0.2, 0.2]}>
        <planeGeometry args={[2.6, 0.6]} />
        <meshBasicMaterial map={createTextTexture(description, false, hovered)} />
      </mesh>

      {/* Corner accent lights */}
      <pointLight
        position={[1.2, 0.8, 0.5]}
        intensity={hovered ? 2.5 : 1.5}
        color={hovered ? '#ff006e' : '#00d4ff'}
        distance={8}
      />
      <pointLight
        position={[-1.2, -0.8, 0.5]}
        intensity={hovered ? 2.5 : 1.5}
        color={hovered ? '#ff006e' : '#00d4ff'}
        distance={8}
      />

      {/* Main glow light */}
      <pointLight
        position={[0, 0, 1]}
        intensity={hovered ? 3 : 1.5}
        color={hovered ? '#ff006e' : '#00d4ff'}
        distance={12}
        castShadow
      />

      {/* Clicked state - additional glow */}
      {clicked && (
        <mesh position={[0, 0, -0.3]}>
          <boxGeometry args={[3.5, 2.5, 0.1]} />
          <meshBasicMaterial
            color="#00d4ff"
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  );
}

function createTextTexture(text: string, isBold: boolean, isHovered: boolean): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Transparent background
  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.fillRect(0, 0, 512, 256);

  // Text color based on state
  const textColor = isHovered ? '#ff006e' : '#00d4ff';
  ctx.fillStyle = textColor;
  ctx.font = isBold ? 'bold 52px "Arial", sans-serif' : '36px "Arial", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Add text shadow for better visibility
  ctx.shadowColor = 'rgba(0, 212, 255, 0.5)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  // Draw text
  ctx.fillText(text, 256, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
