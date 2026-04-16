import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sky, Environment, Html } from '@react-three/drei';

import * as THREE from 'three';
import Vehicle from './Vehicle';
import Ground from './Ground';
import ProjectShowcase from './ProjectShowcase';
import GameUI from './GameUI';

/**
 * 3D Scene Component
 * Design Philosophy: Neon-lit gaming environment with interactive 3D portfolio
 * - Dark atmospheric background with vibrant neon accents
 * - Physics-based vehicle controls
 * - Interactive project showcases scattered in the world
 */

function SceneContent() {
  const { camera } = useThree();
  const [showUI, setShowUI] = useState(true);
  const [achievements, setAchievements] = useState<string[]>([]);

  useEffect(() => {
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  const handleAchievementUnlock = (achievement: string) => {
    if (!achievements.includes(achievement)) {
      setAchievements([...achievements, achievement]);
    }
  };

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ff006e" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00d4ff" />

      {/* Environment */}
      <Sky sunPosition={[100, 20, 100]} />
      <Environment preset="night" />

      {/* Ground */}
      <Ground />

      {/* Vehicle */}
      <Vehicle onAchievementUnlock={handleAchievementUnlock} />

      {/* Project Showcases */}
      <ProjectShowcase position={[10, 0.5, 10]} title="Project 1" description="Interactive 3D Experience" />
      <ProjectShowcase position={[-10, 0.5, 10]} title="Project 2" description="Web Development" />
      <ProjectShowcase position={[10, 0.5, -10]} title="Project 3" description="Design System" />
      <ProjectShowcase position={[-10, 0.5, -10]} title="Project 4" description="Full Stack App" />

      {/* UI - using Html for DOM inside canvas */}
      {showUI && (
        <Html fullscreen>
          <GameUI achievements={achievements} />
        </Html>
      )}
    </>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 10], fov: 75 }}
      gl={{ antialias: true, alpha: true }}
      className="w-full h-full"
    >
      <SceneContent />
    </Canvas>
  );
}
