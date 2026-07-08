import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '../hooks/scrollState';

const PRIMARY = new THREE.Color('#b5e93b');

/**
 * Particle field floating around the camera. The whole cloud slowly
 * rotates on its own, speeds up with scroll velocity and drifts
 * with the mouse for a subtle parallax feeling.
 */
function ParticleField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // random point in a flattened sphere around the origin
      const r = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random();
    }
    return { positions, sizes };
  }, [count]);

  useFrame((_, delta) => {
    if (!points.current) return;
    const speed = 0.02 + Math.min(Math.abs(scrollState.velocity) * 0.004, 0.25);
    points.current.rotation.y += delta * speed;
    points.current.rotation.x = scrollState.progress * 0.6;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color={PRIMARY}
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Two little planets orbiting the hero shape — named after my
 * whippets: Jupiter (the pale one, calm and steady) and Kepler
 * (dark mask, the young fast one).
 */
function Companions() {
  const jupiter = useRef<THREE.Mesh>(null);
  const kepler = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (jupiter.current) {
      jupiter.current.position.set(Math.cos(t * 0.25) * 2.6, Math.sin(t * 0.25) * 0.5, Math.sin(t * 0.25) * 2.6);
    }
    if (kepler.current) {
      kepler.current.position.set(Math.cos(-t * 0.45) * 3.4, Math.sin(-t * 0.45) * -0.7, Math.sin(-t * 0.45) * 3.4);
    }
  });

  return (
    <>
      {/* faint orbit paths */}
      <mesh rotation={[Math.PI / 2 - 0.19, 0, 0]}>
        <torusGeometry args={[2.6, 0.004, 6, 96]} />
        <meshBasicMaterial color={PRIMARY} transparent opacity={0.14} />
      </mesh>
      <mesh rotation={[Math.PI / 2 + 0.2, 0, 0]}>
        <torusGeometry args={[3.4, 0.004, 6, 96]} />
        <meshBasicMaterial color={PRIMARY} transparent opacity={0.1} />
      </mesh>
      {/* Jupiter — pale sand, the bigger one */}
      <mesh ref={jupiter}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#e3cfa8" roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Kepler — brindle with the dark mask, smaller and quicker */}
      <mesh ref={kepler}>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshStandardMaterial color="#6e5d4c" roughness={0.6} metalness={0.15} />
      </mesh>
    </>
  );
}

/**
 * Wireframe icosahedron in the middle distance — the visual anchor
 * of the hero. Spins with scroll progress and breathes slightly.
 */
function HeroShape() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const p = scrollState.progress;

    group.current.rotation.y += delta * 0.15;
    group.current.rotation.x = p * Math.PI * 1.5;
    // shape drifts to the side and shrinks as you scroll away from the hero
    group.current.position.x = 2.4 + p * 4;
    group.current.position.y = Math.sin(t * 0.6) * 0.2 - p * 2;
    const scale = 1 - Math.min(p * 2.5, 1) * 0.45;
    group.current.scale.setScalar(scale);
  });

  return (
    <group ref={group} position={[2.4, 0, 0]}>
      <mesh>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial color={PRIMARY} wireframe transparent opacity={0.5} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial color={PRIMARY} wireframe transparent opacity={0.22} />
      </mesh>
      <Companions />
    </group>
  );
}

/** Camera rig: mouse parallax + gentle scroll-driven dolly. */
function CameraRig() {
  useFrame((state) => {
    const { camera, pointer } = state;
    const p = scrollState.progress;
    const targetX = pointer.x * 0.6;
    const targetY = -pointer.y * 0.4 - p * 1.5;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z = 8 - p * 1.2;
    camera.lookAt(0, -p * 1.5, 0);
  });
  return null;
}

interface SceneProps {
  /** lighter scene on small screens */
  compact: boolean;
}

/**
 * Full-viewport 3D backdrop. Fixed behind the page content and
 * driven by scroll progress + mouse position.
 */
export default function Scene({ compact }: SceneProps) {
  return (
    <div className="scene-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, compact ? 1.5 : 2]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        eventSource={document.body}
        eventPrefix="client"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 3, 6]} intensity={1.4} />
        <ParticleField count={compact ? 900 : 2600} />
        {!compact && <HeroShape />}
        <CameraRig />
        <fog attach="fog" args={['#070a06', 10, 26]} />
      </Canvas>
    </div>
  );
}
