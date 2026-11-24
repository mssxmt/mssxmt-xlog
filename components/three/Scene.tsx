'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing';
import { usePathname } from 'next/navigation';
import { motion } from '../../lib/motion-store';

const INK = new THREE.Color('#e8e6df');
const ACCENT = new THREE.Color('#57d7c8');
const LOGO_W = 6.6;
const LOGO_H = 2.43;

/* ---------------------------------- logo underlay plane ---------------------------------- */

const planeVertex = /* glsl */ `
  uniform float uTime;
  uniform float uGlitch;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    float wave = sin(p.x * 3.1 + uTime * 1.4) * cos(p.y * 4.3 - uTime * 1.1);
    p.z += wave * (0.02 + uGlitch * 0.18);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;
const planeFragment = /* glsl */ `
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
    float slice = floor(uv.y * 28.0);
    float shift = (hash(slice + floor(uTime * 9.0)) - 0.5) * uGlitch * 0.05;
    uv.x += shift;
    float off = 0.003 + uGlitch * 0.012;
    float aC = texture2D(uTex, uv).a;
    float aR = texture2D(uTex, uv + vec2(off, 0.0)).a;
    float aB = texture2D(uTex, uv - vec2(off, 0.0)).a;
    float edge = max(aR, aB) - aC;
    vec3 col = uInk * aC + uAccent * edge * 1.4;
    float alpha = clamp(aC + edge, 0.0, 1.0) * uOpacity;
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(col, alpha);
  }
`;

/* ---------------------------------- logo point cloud ---------------------------------- */

const pointsVertex = /* glsl */ `
  attribute vec3 aRand;
  attribute float aSeed;
  uniform float uTime;
  uniform float uForm;
  uniform float uDisperse;
  uniform float uOpacity;
  uniform vec2 uPointerWorld;
  uniform float uSize;
  varying float vMix;
  varying float vFade;
  void main() {
    float d = clamp(uDisperse + (1.0 - uForm) * 1.3, 0.0, 1.8);
    vMix = clamp(d, 0.0, 1.0);
    vec3 p = position + aRand * d * 1.5;
    p.x += sin(uTime * 0.6 + aSeed * 19.0) * 0.035;
    p.y += cos(uTime * 0.5 + aSeed * 23.0) * 0.035;
    p.z += sin(uTime * 0.4 + aSeed * 29.0) * 0.05;
    vec2 toPt = p.xy - uPointerWorld;
    float dist = length(toPt);
    float push = smoothstep(1.15, 0.0, dist) * 0.5;
    p.xy += normalize(toPt + vec2(0.0001)) * push * (0.35 + d * 0.7);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uSize * (1.0 / -mv.z);
    vFade = uOpacity * (0.55 + 0.45 * sin(aSeed * 40.0 + uTime * 0.8));
    gl_Position = projectionMatrix * mv;
  }
`;
const pointsFragment = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying float vMix;
  varying float vFade;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float m = smoothstep(0.5, 0.12, length(c));
    vec3 col = mix(uInk, uAccent, vMix * 0.85);
    gl_FragColor = vec4(col, m * vFade);
  }
`;

type Variant = { pos: [number, number, number]; scale: number; plane: number; points: number };
function variantFor(path: string | null): Variant {
  if (!path || path === '/') return { pos: [0, 0.55, 0], scale: 1, plane: 0.3, points: 0.95 };
  if (path.startsWith('/blog/')) return { pos: [0, 2.1, -2.5], scale: 0.85, plane: 0.05, points: 0.1 };
  return { pos: [0, 1.9, -2], scale: 0.9, plane: 0.12, points: 0.3 };
}

function useLogoPoints(count: number) {
  const [points, setPoints] = useState<THREE.Points | null>(null);
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.src = '/images/logo2.png';
    img.onload = () => {
      if (cancelled) return;
      const W = 300;
      const H = Math.round((W * 471) / 1280);
      const cv = document.createElement('canvas');
      cv.width = W;
      cv.height = H;
      const ctx = cv.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, W, H);
      const data = ctx.getImageData(0, 0, W, H).data;
      const homes: number[] = [];
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          if (data[(y * W + x) * 4 + 3] > 110) homes.push(x, y);
        }
      }
      const total = homes.length / 2;
      const stride = Math.max(1, Math.floor(total / count));
      const pos: number[] = [];
      const rand: number[] = [];
      const seed: number[] = [];
      for (let i = 0; i < total; i += stride) {
        const px = homes[i * 2];
        const py = homes[i * 2 + 1];
        pos.push((px / W - 0.5) * LOGO_W, (0.5 - py / H) * LOGO_H, (Math.random() - 0.5) * 0.06);
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        const r = 0.5 + Math.random() * 1.8;
        rand.push(
          r * Math.sin(ph) * Math.cos(th),
          r * Math.sin(ph) * Math.sin(th),
          r * Math.cos(ph) * 0.7
        );
        seed.push(Math.random());
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3));
      geo.setAttribute('aRand', new THREE.BufferAttribute(new Float32Array(rand), 3));
      geo.setAttribute('aSeed', new THREE.BufferAttribute(new Float32Array(seed), 1));
      const mat = new THREE.ShaderMaterial({
        vertexShader: pointsVertex,
        fragmentShader: pointsFragment,
        uniforms: {
          uTime: { value: 0 },
          uForm: { value: 0 },
          uDisperse: { value: 0 },
          uOpacity: { value: 0.95 },
          uPointerWorld: { value: new THREE.Vector2(99, 99) },
          uSize: { value: 30 },
          uInk: { value: INK },
          uAccent: { value: ACCENT },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      setPoints(new THREE.Points(geo, mat));
    };
    return () => {
      cancelled = true;
    };
  }, [count]);
  return points;
}

function LogoAssembly() {
  const tex = useTexture('/images/logo2.png');
  const groupRef = useRef<THREE.Group>(null);
  const planeMat = useRef<THREE.ShaderMaterial>(null);
  const pathname = usePathname();
  const isNarrow = typeof window !== 'undefined' && window.innerWidth < 768;
  const logoPoints = useLogoPoints(isNarrow ? 2400 : 5200);
  const planeUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uGlitch: { value: 0 },
      uOpacity: { value: 0.3 },
      uTex: { value: tex },
      uInk: { value: INK },
      uAccent: { value: ACCENT },
    }),
    [tex]
  );
  const disperse = useRef(0);
  const form = useRef(0);
  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const v = variantFor(pathname);
    const home = !pathname || pathname === '/';
    // hero scroll: on home the assembly lifts and recedes as the hero leaves
    const lift = home ? motion.heroProgress * 1.5 : 0;
    const recede = home ? motion.heroProgress * -1.2 : 0;
    g.position.x = THREE.MathUtils.damp(g.position.x, v.pos[0], 3, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, v.pos[1] + lift, 3, delta);
    g.position.z = THREE.MathUtils.damp(g.position.z, v.pos[2] + recede, 3, delta);
    const s = THREE.MathUtils.damp(g.scale.x, v.scale, 3, delta);
    g.scale.setScalar(s);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, motion.pointer.x * 0.13, 4, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -motion.pointer.y * 0.07, 4, delta);

    const velDisperse = THREE.MathUtils.clamp(motion.scrollVel * 0.055, 0, 1);
    const scrollDisperse = home ? motion.heroProgress * 1.1 : 0.25;
    disperse.current = THREE.MathUtils.damp(
      disperse.current,
      Math.max(velDisperse, scrollDisperse * (home ? 1 : 0.4)),
      5,
      delta
    );
    form.current = THREE.MathUtils.damp(form.current, motion.introDone ? 1 : 0, 1.6, delta);

    if (planeMat.current) {
      planeMat.current.uniforms.uTime.value = state.clock.elapsedTime;
      planeMat.current.uniforms.uGlitch.value = disperse.current * 0.7;
      planeMat.current.uniforms.uOpacity.value = THREE.MathUtils.damp(
        planeMat.current.uniforms.uOpacity.value,
        v.plane * (1 - (home ? motion.heroProgress : 0)),
        3,
        delta
      );
    }
    if (logoPoints) {
      const m = logoPoints.material as THREE.ShaderMaterial;
      m.uniforms.uTime.value = state.clock.elapsedTime;
      m.uniforms.uForm.value = form.current;
      m.uniforms.uDisperse.value = disperse.current;
      m.uniforms.uOpacity.value = THREE.MathUtils.damp(
        m.uniforms.uOpacity.value as number,
        v.points,
        3,
        delta
      );
      const vp = state.viewport.getCurrentViewport(state.camera, new THREE.Vector3(0, 0, 0));
      (m.uniforms.uPointerWorld.value as THREE.Vector2).set(
        motion.pointer.x * (vp.width / 2) - g.position.x,
        motion.pointer.y * (vp.height / 2) - g.position.y
      );
      m.uniforms.uSize.value = 30 * state.gl.getPixelRatio();
    }
  });
  return (
    <group ref={groupRef} position={[0, 0.55, 0]}>
      <mesh>
        <planeGeometry args={[LOGO_W, LOGO_H, 48, 18]} />
        <shaderMaterial
          ref={planeMat}
          vertexShader={planeVertex}
          fragmentShader={planeFragment}
          uniforms={planeUniforms}
          transparent
          depthWrite={false}
        />
      </mesh>
      {logoPoints && <primitive object={logoPoints} />}
    </group>
  );
}

/* ---------------------------------- DOM-synced jacket planes ---------------------------------- */

const jacketVertex = /* glsl */ `
  uniform float uBend;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    p.z += sin(uv.y * 3.14159) * uBend;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;
const jacketFragment = /* glsl */ `
  uniform sampler2D uTex;
  uniform float uWarp;
  uniform float uTime;
  varying vec2 vUv;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
  }
  void main() {
    vec2 uv = vUv;
    float n = noise(uv * 6.0 + uTime * 0.35) - 0.5;
    uv += n * uWarp * 0.09;
    float shift = uWarp * 0.012;
    float r = texture2D(uTex, uv + vec2(shift, 0.0)).r;
    float g = texture2D(uTex, uv).g;
    float b = texture2D(uTex, uv - vec2(shift, 0.0)).b;
    float a = texture2D(uTex, uv).a;
    gl_FragColor = vec4(r, g, b, a);
  }
`;

type JacketEntry = { el: HTMLElement; key: string; src: string };

function JacketRig() {
  const pathname = usePathname();
  const [entries, setEntries] = useState<JacketEntry[]>([]);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const hoverState = useRef<number[]>([]);

  useEffect(() => {
    // wait a tick for the routed page to mount
    const t = setTimeout(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>('[data-gl-jacket]'));
      setEntries(
        els.map((el) => ({ el, key: el.dataset.glJacket || '', src: el.dataset.src || '' }))
      );
    }, 60);
    return () => {
      clearTimeout(t);
      document.documentElement.classList.remove('gl-active');
    };
  }, [pathname]);

  const textures = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const map = new Map<string, THREE.Texture>();
    entries.forEach((e) => {
      if (!map.has(e.src)) {
        const t = loader.load(e.src);
        t.colorSpace = THREE.SRGBColorSpace;
        map.set(e.src, t);
      }
    });
    return map;
  }, [entries]);

  useFrame((state, delta) => {
    if (!entries.length) return;
    document.documentElement.classList.add('gl-active');
    const cam = state.camera as THREE.PerspectiveCamera;
    const dist = cam.position.z;
    const visibleH = 2 * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * dist;
    const wpp = visibleH / window.innerHeight; // world units per pixel at z=0
    entries.forEach((e, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;
      const r = e.el.getBoundingClientRect();
      if (r.bottom < -80 || r.top > window.innerHeight + 80 || r.width === 0) {
        mesh.visible = false;
        return;
      }
      mesh.visible = true;
      mesh.position.x = (r.left + r.width / 2 - window.innerWidth / 2) * wpp + cam.position.x;
      mesh.position.y = -(r.top + r.height / 2 - window.innerHeight / 2) * wpp + cam.position.y;
      mesh.scale.set(r.width * wpp, r.height * wpp, 1);
      const mat = mesh.material as THREE.ShaderMaterial;
      const hovered = motion.hoverJacket === e.key ? 1 : 0;
      hoverState.current[i] = THREE.MathUtils.damp(hoverState.current[i] || 0, hovered, 8, delta);
      const warp = THREE.MathUtils.clamp(
        hoverState.current[i] + Math.abs(motion.scrollVel) * 0.012,
        0,
        1.4
      );
      mat.uniforms.uWarp.value = THREE.MathUtils.damp(mat.uniforms.uWarp.value as number, warp, 10, delta);
      mat.uniforms.uBend.value = THREE.MathUtils.clamp(motion.scrollVel * 0.004, 0, 0.25);
      mat.uniforms.uTime.value = state.clock.elapsedTime;
    });
  });

  if (!entries.length) return null;
  return (
    <>
      {entries.map((e, i) => (
        <mesh
          key={e.key + e.src}
          ref={(m) => {
            meshRefs.current[i] = m;
          }}
        >
          <planeGeometry args={[1, 1, 24, 24]} />
          <shaderMaterial
            vertexShader={jacketVertex}
            fragmentShader={jacketFragment}
            uniforms={{
              uTex: { value: textures.get(e.src) || null },
              uWarp: { value: 0 },
              uBend: { value: 0 },
              uTime: { value: 0 },
            }}
            transparent
          />
        </mesh>
      ))}
    </>
  );
}

/* ---------------------------------- camera rig ---------------------------------- */

function Rig() {
  const pathname = usePathname();
  useFrame((state, delta) => {
    const cam = state.camera;
    const home = !pathname || pathname === '/';
    const targetZ = home ? 8 + motion.pageProgress * 2.4 : 8;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, motion.pointer.x * 0.55, 2.5, delta);
    cam.position.y = THREE.MathUtils.damp(
      cam.position.y,
      -motion.pointer.y * 0.35 + (home ? motion.heroProgress * 0.5 : 0),
      2.5,
      delta
    );
    cam.position.z = THREE.MathUtils.damp(cam.position.z, targetZ, 2.5, delta);
    cam.lookAt(0, 0.3, 0);
    if (!motion.introDone) return;
    motion.scrollVel *= Math.pow(0.03, delta);
  });
  return null;
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <LogoAssembly />
      </Suspense>
      <JacketRig />
      <Rig />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.32} luminanceThreshold={0.32} luminanceSmoothing={0.25} mipmapBlur />
        <ChromaticAberration
          offset={new THREE.Vector2(0.00045, 0.00045)}
          radialModulation={false}
          modulationOffset={0}
        />
        <Noise premultiply opacity={0.13} />
        <Vignette eskil={false} offset={0.22} darkness={0.78} />
      </EffectComposer>
    </Canvas>
  );
}
