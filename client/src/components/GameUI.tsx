import React, { useState } from 'react';

/**
 * GameUI Component
 * Design: Overlay UI with game-like aesthetics
 * - Control instructions
 * - Stats display (speed, distance)
 * - Achievement notifications
 * - Neon-themed gaming interface
 */

interface GameUIProps {
  achievements: string[];
}

export default function GameUI({ achievements }: GameUIProps) {
  const [showHelp, setShowHelp] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Top-left: Title and branding */}
      <div className="absolute top-4 left-4 pointer-events-auto z-10">
        <div className="game-panel p-4 backdrop-blur-sm">
          <h1 className="neon-text text-2xl font-bold tracking-wider">PORTFOLIO</h1>
          <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
            Interactive 3D Experience
          </p>
        </div>
      </div>

      {/* Top-right: Real-time stats */}
      <div className="absolute top-4 right-4 pointer-events-auto z-10">
        <div className="game-panel p-4 space-y-3 backdrop-blur-sm">
          <div className="text-sm font-mono">
            <span className="text-muted-foreground">SPEED:</span>
            <span className="neon-text ml-3 text-lg font-bold">0</span>
          </div>
          <div className="text-sm font-mono">
            <span className="text-muted-foreground">DISTANCE:</span>
            <span className="neon-text ml-3 text-lg font-bold">0m</span>
          </div>
          <div className="text-xs text-muted-foreground mt-2 border-t border-border pt-2">
            FPS: 60
          </div>
        </div>
      </div>

      {/* Bottom-left: Controls and help */}
      <div className="absolute bottom-4 left-4 pointer-events-auto z-10">
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="game-button mb-3 uppercase font-bold text-xs tracking-wider"
        >
          {showHelp ? '✕ Hide' : '? Show'} Controls
        </button>

        {showHelp && (
          <div className="game-panel p-4 max-w-xs backdrop-blur-sm">
            <h3 className="neon-text text-sm font-bold mb-3 uppercase tracking-wider">
              CONTROLS
            </h3>
            <div className="text-xs space-y-2 text-foreground font-mono">
              <div className="flex justify-between">
                <span className="text-accent">W / ↑</span>
                <span className="text-muted-foreground">Forward</span>
              </div>
              <div className="flex justify-between">
                <span className="text-accent">A / ←</span>
                <span className="text-muted-foreground">Left</span>
              </div>
              <div className="flex justify-between">
                <span className="text-accent">S / ↓</span>
                <span className="text-muted-foreground">Backward</span>
              </div>
              <div className="flex justify-between">
                <span className="text-accent">D / →</span>
                <span className="text-muted-foreground">Right</span>
              </div>
              <div className="flex justify-between">
                <span className="text-accent">Mouse</span>
                <span className="text-muted-foreground">Look Around</span>
              </div>
              <div className="flex justify-between">
                <span className="text-accent">Click</span>
                <span className="text-muted-foreground">Interact</span>
              </div>
              <div className="mt-3 pt-3 border-t border-border text-muted-foreground text-xs">
                Explore the world and discover projects!
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom-right: Achievements */}
      {achievements.length > 0 && (
        <div className="absolute bottom-4 right-4 pointer-events-auto z-10">
          <div className="game-panel p-4 max-w-xs backdrop-blur-sm">
            <h3 className="neon-text text-sm font-bold mb-3 uppercase tracking-wider">
              ACHIEVEMENTS
            </h3>
            <div className="space-y-2">
              {achievements.map((achievement) => (
                <div key={achievement} className="text-xs text-accent font-mono flex items-center">
                  <span className="mr-2 text-lg">✓</span>
                  <span className="uppercase tracking-wider">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Center: Welcome message */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-5">
        <div className="game-panel p-8 text-center max-w-md backdrop-blur-sm">
          <p className="text-sm text-foreground leading-relaxed">
            Welcome to the interactive portfolio experience!
          </p>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
            Use WASD or Arrow keys to drive around and explore projects.
          </p>
          <div className="mt-4 text-xs text-accent font-mono">
            Press <span className="font-bold">?</span> for controls
          </div>
        </div>
      </div>
    </div>
  );
}
