import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Capsule({ position, rotation, scale, color, speed }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003 * speed;
      meshRef.current.rotation.z += 0.002 * speed;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.003;
    }
  });
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        <capsuleGeometry args={[0.3, 0.6, 16, 32]} />
        <meshPhysicalMaterial color={color} transparent opacity={0.7} roughness={0.1} metalness={0.1} clearcoat={1} clearcoatRoughness={0.1} envMapIntensity={1} />
      </mesh>
    </Float>
  );
}

function Scene() {
  const capsules = useMemo(() => [
    { position: [2, 1, -1], rotation: [0.5, 0.3, 0], scale: 1, color: '#38bdf8', speed: 0.8 },
    { position: [-2, -0.5, -2], rotation: [1, 0.5, 0.3], scale: 0.7, color: '#06b6d4', speed: 1.2 },
    { position: [1, -1.5, -1.5], rotation: [0.2, 1, 0.5], scale: 0.9, color: '#0ea5e9', speed: 1 },
    { position: [-1.5, 1.5, -3], rotation: [0.8, 0.2, 1], scale: 0.6, color: '#67e8f9', speed: 0.9 },
    { position: [3, 0, -2], rotation: [1.2, 0.8, 0.2], scale: 0.8, color: '#22d3ee', speed: 1.1 },
    { position: [-0.5, 2, -1], rotation: [0.4, 1.2, 0.6], scale: 0.5, color: '#7dd3fc', speed: 0.7 },
    { position: [0, -2, -2.5], rotation: [1, 0.3, 0.8], scale: 0.75, color: '#38bdf8', speed: 1.3 },
    { position: [-3, 0, -1.5], rotation: [0.6, 0.9, 0.1], scale: 0.65, color: '#a5f3fc', speed: 0.6 },
  ], []);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#e0f2fe" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#06b6d4" />
      <directionalLight position={[0, 5, 5]} intensity={0.8} />
      {capsules.map((c, i) => <Capsule key={i} {...c} />)}
    </>
  );
}

const FloatingPills = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 ${className}`} style={{ pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default FloatingPills;
