'use client';

import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { usePathname } from 'next/navigation';
import { motion } from '../../lib/motion-store';

const INK = new THREE.Color('#e8e6df');
const ACCENT = new THREE.Color('#57d7c8');

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uGlitch;
  uniform vec2 uPointer;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    float wave = sin(p.x * 3.1 + uTime * 1.4) * cos(p.y * 4.3 - uTime * 1.1);
    p.z += wave * (0.03 + uGlitch * 0.35);
    p.z += sin(p.x * 14.0 + uTime * 22.0) * uGlitch * 0.05 * step(0.6, sin(p.y * 40.0 + uTime * 7.0));
    p.x += uPointer.x * 0.06 * p.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTex;
  uniform float uTime;
  uniform float uGlitch;
  uniform float uOpacity;
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying vec2 vUv;
  float hash(float n) { return fract(sin(n) * 43758.5453123); }
  void main() {
    vec2 uv = vUv;
    // horizontal slice displacement, stronger with glitch
    float slice = floor(uv.y * 28.0);
    float shift = (hash(slice + floor(uTime * 9.0)) - 0.5) * uGlitch * 0.09;
    uv.x += shift;
    float off = 0.004 + uGlitch * 0.022;
    float aC = texture2D(uTex, uv).a;
    float aR = texture2D(uTex, uv + vec2(off, 0.0)).a;
    float aB = texture2D(uTex, uv - vec2(off, 0.0)).a;
    float edge = max(aR, aB) - aC;
    vec3 col = uInk * aC + uAccent * edge * 1.6;
    float alpha = clamp(aC + edge, 0.0, 1.0) * uOpacity;
    // faint scanline
    alpha *= 0.94 + 0.06 * sin(vUv.y * 340.0);
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(col, alpha);
  }
`;

type Variant = { pos: [number, number, number]; scale: number; opacity: number };

function variantFor(path: string | null): Variant {
  if (!path || path === '/') return { pos: [0, 0.55, 0], scale: 1, opacity: 1 };
  if (path.startsWith('/blog/')) return { pos: [0, 2.1, -2.5], scale: 0.85, opacity: 0.13 };
  return { pos: [0, 1.9, -2], scale: 0.9, opacity: 0.34 };
}

function LogoPlane() {
  const tex = useTexture('/images/logo2.png');
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  const pathname = usePathname();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uGlitch: { value: 0 },
      uOpacity: { value: 1 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uTex: { value: tex },
      uInk: { value: INK },
      uAccent: { value: ACCENT },
    }),
    [tex]
  );
  const glitch = useRef(0);
  useFrame((state, delta) => {
    const m = matRef.current;
    const g = groupRef.current;
    if (!m || !g) return;
    m.uniforms.uTime.value = state.clock.elapsedTime;
    const target = THREE.MathUtils.clamp(Math.abs(motion.scrollVel) * 0.012, 0, 1);
    glitch.current = THREE.MathUtils.damp(glitch.current, target, 6, delta);
    m.uniforms.uGlitch.value = glitch.current;
    (m.uniforms.uPointer.value as THREE.Vector2).set(motion.pointer.x, motion.pointer.y);
    const v = variantFor(pathname);
    g.position.x = THREE.MathUtils.damp(g.position.x, v.pos[0], 3, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, v.pos[1], 3, delta);
    g.position.z = THREE.MathUtils.damp(g.position.z, v.pos[2], 3, delta);
    const s = THREE.MathUtils.damp(g.scale.x, v.scale, 3, delta);
    g.scale.setScalar(s);
    m.uniforms.uOpacity.value = THREE.MathUtils.damp(
      m.uniforms.uOpacity.value,
      v.opacity,
      3,
      delta
    );
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, motion.pointer.x * 0.14, 4, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -motion.pointer.y * 0.08, 4, delta);
  });
  return (
    <group ref={groupRef} position={[0, 0.55, 0]}>
      <mesh>
        <planeGeometry args={[6.6, 2.43, 48, 18]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function ParticleField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const points = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = -Math.random() * 6 - 0.5;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color: ACCENT,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
      depthWrite: false,
    });
    return new THREE.Points(geo, mat);
  }, [count]);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.014;
    ref.current.position.x = THREE.MathUtils.damp(
      ref.current.position.x,
      motion.pointer.x * -0.5,
      2,
      delta
    );
    ref.current.position.y = THREE.MathUtils.damp(
      ref.current.position.y,
      motion.pointer.y * 0.3,
      2,
      delta
    );
  });
  return <primitive ref={ref} object={points} />;
}

function WireShapes() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (a.current) {
      a.current.rotation.x += delta * 0.11;
      a.current.rotation.y += delta * 0.07;
    }
    if (b.current) {
      b.current.rotation.z += delta * 0.05;
      b.current.rotation.y -= delta * 0.09;
    }
  });
  return (
    <>
      <mesh ref={a} position={[-4.6, -1.6, -2.5]}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial color='#33333a' wireframe transparent opacity={0.6} />
      </mesh>
      <mesh ref={b} position={[4.9, 1.9, -3.5]}>
        <torusGeometry args={[0.95, 0.32, 8, 24]} />
        <meshBasicMaterial color='#2b2b31' wireframe transparent opacity={0.55} />
      </mesh>
    </>
  );
}

function Rig() {
  const { camera } = useThree();
  useFrame((state, delta) => {
    camera.position.x = THREE.MathUtils.damp(camera.position.x, motion.pointer.x * 0.55, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, -motion.pointer.y * 0.35, 2.5, delta);
    camera.lookAt(0, 0.3, 0);
    motion.scrollVel *= Math.pow(0.02, delta); // fast decay
  });
  return null;
}

export default function Scene() {
  const isNarrow = typeof window !== 'undefined' && window.innerWidth < 768;
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <LogoPlane />
      </Suspense>
      <ParticleField count={isNarrow ? 350 : 900} />
      <WireShapes />
      <Rig />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.5} luminanceThreshold={0.25} luminanceSmoothing={0.2} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
