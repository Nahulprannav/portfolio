import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

/**
 * Vehicle Component
 * Design: Driveable car with physics simulation
 * - WASD/Arrow keys for movement
 * - Smooth camera following
 * - Neon-styled vehicle with glowing effects
 */

interface VehicleProps {
  onAchievementUnlock?: (achievement: string) => void;
}

export default function Vehicle({ onAchievementUnlock }: VehicleProps) {
  const vehicleRef = useRef<THREE.Group>(null);
  const { camera, scene } = useThree();
  const vehicleBodyRef = useRef<CANNON.Body | null>(null);
  const worldRef = useRef<CANNON.World | null>(null);
  
  const keysPressed = useRef<Record<string, boolean>>({});
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0);
  const lastPosition = useRef(new THREE.Vector3(0, 0, 0));
  const totalDistance = useRef(0);
  const achievementsUnlocked = useRef<Set<string>>(new Set());

  // Initialize physics world
  useEffect(() => {
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);
    world.defaultContactMaterial.friction = 0.3;
    world.defaultContactMaterial.restitution = 0.3;
    worldRef.current = world;

    // Create ground body
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({ mass: 0 });
    groundBody.addShape(groundShape);
    groundBody.position.y = 0;
    world.addBody(groundBody);

    // Create vehicle body
    const vehicleShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.4, 1));
    const vehicleBody = new CANNON.Body({ mass: 1 });
    vehicleBody.addShape(vehicleShape);
    vehicleBody.position.set(0, 2, 0);
    vehicleBody.linearDamping = 0.3;
    vehicleBody.angularDamping = 0.3;
    world.addBody(vehicleBody);
    vehicleBodyRef.current = vehicleBody;

    return () => {
      if (worldRef.current) {
        worldRef.current.removeBody(groundBody);
        worldRef.current.removeBody(vehicleBody);
      }
    };
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
      keysPressed.current[e.code.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
      keysPressed.current[e.code.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Update vehicle physics and camera
  useFrame((state, delta) => {
    if (!vehicleBodyRef.current || !vehicleRef.current || !worldRef.current) return;

    // Step physics world
    worldRef.current.step(1 / 60, delta, 3);

    const acceleration = 0.5;
    const maxSpeed = 0.3;
    const friction = 0.95;

    let currentSpeed = Math.sqrt(
      vehicleBodyRef.current.velocity.x ** 2 + vehicleBodyRef.current.velocity.z ** 2
    );

    let moveX = 0;
    let moveZ = 0;

    // Forward/Backward
    if (keysPressed.current['w'] || keysPressed.current['arrowup']) moveZ -= acceleration;
    if (keysPressed.current['s'] || keysPressed.current['arrowdown']) moveZ += acceleration;

    // Left/Right
    if (keysPressed.current['a'] || keysPressed.current['arrowleft']) moveX -= acceleration;
    if (keysPressed.current['d'] || keysPressed.current['arrowright']) moveX += acceleration;

    // Apply movement
    const newVelX = (vehicleBodyRef.current.velocity.x + moveX) * friction;
    const newVelZ = (vehicleBodyRef.current.velocity.z + moveZ) * friction;

    // Clamp speed
    const velocityLength = Math.sqrt(newVelX ** 2 + newVelZ ** 2);
    if (velocityLength > maxSpeed) {
      const scale = maxSpeed / velocityLength;
      vehicleBodyRef.current.velocity.x = newVelX * scale;
      vehicleBodyRef.current.velocity.z = newVelZ * scale;
    } else {
      vehicleBodyRef.current.velocity.x = newVelX;
      vehicleBodyRef.current.velocity.z = newVelZ;
    }

    // Rotate vehicle to face movement direction
    if (moveX !== 0 || moveZ !== 0) {
      const angle = Math.atan2(moveX, moveZ);
      vehicleRef.current.rotation.y = angle;
    }

    // Update mesh position from physics body
    vehicleRef.current.position.copy(vehicleBodyRef.current.position as any);
    vehicleRef.current.quaternion.copy(vehicleBodyRef.current.quaternion as any);

    // Update distance tracking
    const currentPos = new THREE.Vector3(
      vehicleBodyRef.current.position.x,
      0,
      vehicleBodyRef.current.position.z
    );
    const dist = currentPos.distanceTo(lastPosition.current);
    totalDistance.current += dist;
    lastPosition.current.copy(currentPos);
    setDistance(Math.round(totalDistance.current));

    // Smooth camera follow
    const targetCameraPos = new THREE.Vector3(
      vehicleBodyRef.current.position.x + 5,
      vehicleBodyRef.current.position.y + 3,
      vehicleBodyRef.current.position.z + 5
    );

    camera.position.lerp(targetCameraPos, 0.1);
    camera.lookAt(
      vehicleBodyRef.current.position.x,
      vehicleBodyRef.current.position.y + 1,
      vehicleBodyRef.current.position.z
    );

    setSpeed(Math.round(currentSpeed * 100));

    // Check for achievements
    if (distance > 100 && !achievementsUnlocked.current.has('explorer') && onAchievementUnlock) {
      onAchievementUnlock('explorer');
      achievementsUnlocked.current.add('explorer');
    }
  });

  return (
    <group ref={vehicleRef}>
      {/* Vehicle body - main chassis */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 0.8, 2]} />
        <meshStandardMaterial 
          color="#00d4ff" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#00d4ff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Vehicle cabin - cockpit area */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.6, 1.2]} />
        <meshStandardMaterial 
          color="#ff006e" 
          metalness={0.6} 
          roughness={0.3}
          emissive="#ff006e"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Wheels */}
      {[
        [-0.5, -0.4, 0.5],
        [0.5, -0.4, 0.5],
        [-0.5, -0.4, -0.5],
        [0.5, -0.4, -0.5],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Headlights - cyan */}
      <pointLight 
        position={[0.3, 0.2, 1]} 
        intensity={2} 
        color="#00d4ff" 
        distance={10}
        castShadow
      />
      <pointLight 
        position={[-0.3, 0.2, 1]} 
        intensity={2} 
        color="#00d4ff" 
        distance={10}
        castShadow
      />

      {/* Rear lights - magenta */}
      <pointLight 
        position={[0.3, 0.2, -1]} 
        intensity={1} 
        color="#ff006e" 
        distance={8}
      />
      <pointLight 
        position={[-0.3, 0.2, -1]} 
        intensity={1} 
        color="#ff006e" 
        distance={8}
      />
    </group>
  );
}
