import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Ground Component
 * Design: Large interactive ground plane with neon grid aesthetic
 * - Textured surface with glowing grid pattern
 * - Physics body for vehicle collision (managed externally)
 * - Atmospheric lighting effects
 */

export default function Ground() {
  const groundRef = useRef<THREE.Mesh>(null);
  const { scene } = useThree();

  useEffect(() => {
    // Create a ground plane physics body in the world
    // This will be accessed by the Vehicle component
  }, []);

  return (
    <>
      {/* Main ground plane */}
      <mesh ref={groundRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial
          color="#0a0e27"
          metalness={0.2}
          roughness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Grid helper for visual effect */}
      <gridHelper args={[200, 100]} position={[0, 0.01, 0]} />

      {/* Glowing ground effect */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Neon grid lines */}
      <lineSegments position={[0, 0.05, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[createGridLines(), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00d4ff" transparent opacity={0.4} linewidth={1} />
      </lineSegments>

      {/* Accent lighting */}
      <pointLight position={[50, 30, 50]} intensity={0.3} color="#ff006e" distance={150} />
      <pointLight position={[-50, 30, -50]} intensity={0.3} color="#00d4ff" distance={150} />
    </>
  );
}

function createGridLines(): Float32Array {
  const size = 200;
  const divisions = 100;
  const step = size / divisions;
  const half = size / 2;

  const points: number[] = [];

  // Horizontal lines
  for (let i = 0; i <= divisions; i++) {
    const pos = -half + i * step;
    points.push(-half, 0, pos, half, 0, pos);
  }

  // Vertical lines
  for (let i = 0; i <= divisions; i++) {
    const pos = -half + i * step;
    points.push(pos, 0, -half, pos, 0, half);
  }

  return new Float32Array(points);
}
