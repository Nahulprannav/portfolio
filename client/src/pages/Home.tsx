import Scene3D from '@/components/Scene3D';

/**
 * Home Page
 * Design: Full-screen 3D interactive portfolio experience
 * - Immersive 3D environment
 * - Vehicle-based navigation
 * - Project exploration
 */

export default function Home() {
  return (
    <div className="w-full h-screen overflow-hidden bg-background">
      <Scene3D />
    </div>
  );
}
