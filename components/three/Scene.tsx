'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing';
import { usePathname } from 'next/navigation';
import { Effect, BlendFunction } from 'postprocessing';
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
  attribute vec3 aRing;
  attribute vec3 aBand;
  uniform float uTime;
  uniform float uForm;
  uniform float uDisperse;
  uniform float uOpacity;
  uniform vec2 uPointerWorld;
  uniform float uSize;
  uniform vec2 uBurstOrigin;
  uniform float uBurstT;
  uniform float uAttract;
  uniform vec2 uAttractPos;
  uniform float uMorphA;
  uniform float uMorphB;
  uniform float uBass;
  varying float vMix;
  varying float vFade;
  void main() {
    vec3 base = position;
    base = mix(base, aRing, uMorphA);
    base = mix(base, aBand, uMorphB);
    float fly = sin(3.14159 * uMorphA) * (1.0 - uMorphB) + sin(3.14159 * uMorphB);
    vec3 p = base + aRand * fly * 0.4;
    float d = clamp(uDisperse + (1.0 - uForm) * 1.3, 0.0, 1.8);
    vMix = clamp(d, 0.0, 1.0);
    p += aRand * d * 1.5;
    p.x += sin(uTime * 0.6 + aSeed * 19.0) * 0.035;
    p.y += cos(uTime * 0.5 + aSeed * 23.0) * 0.035;
    p.z += sin(uTime * 0.4 + aSeed * 29.0) * 0.05;
    vec2 toPt = p.xy - uPointerWorld;
    float dist = length(toPt);
    float push = smoothstep(1.15, 0.0, dist) * 0.5;
    p.xy += normalize(toPt + vec2(0.0001)) * push * (0.35 + d * 0.7);
    float bt = uTime - uBurstT;
    float glow = 0.0;
    if (bt > 0.0 && bt < 2.4) {
      float r = length(p.xy - uBurstOrigin);
      float waveR = bt * 3.4;
      float band = exp(-abs(r - waveR) * 3.0) * (1.0 - bt / 2.4);
      vec2 dir = normalize(p.xy - uBurstOrigin + vec2(0.0001));
      p.xy += dir * band * 1.1;
      p.z += band * 0.6;
      glow = band;
    }
    vec2 toA = uAttractPos - p.xy;
    float ad = length(toA);
    p.xy += toA * uAttract * 0.5 * smoothstep(3.2, 0.0, ad);
    p += aRand * uBass * 0.22;
    vMix = clamp(max(vMix, glow * 1.3), 0.0, 1.0);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uSize * (1.0 + uBass * 0.4 + glow * 0.6) * (1.0 / -mv.z);
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
      const ring: number[] = [];
      const bandArr: number[] = [];
      for (let i = 0; i < total; i += stride) {
        const px = homes[i * 2];
        const py = homes[i * 2 + 1];
        const hx = (px / W - 0.5) * LOGO_W;
        const hy = (0.5 - py / H) * LOGO_H;
        pos.push(hx, hy, (Math.random() - 0.5) * 0.06);
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        const r = 0.5 + Math.random() * 1.8;
        rand.push(
          r * Math.sin(ph) * Math.cos(th),
          r * Math.sin(ph) * Math.sin(th),
          r * Math.cos(ph) * 0.7
        );
        const sd = Math.random();
        seed.push(sd);
        // chapter morph targets: an elliptical ring (around the jacket
        // chapter) and a thin band (the index chapter)
        const t = hx / LOGO_W + 0.5;
        const ang = t * Math.PI * 2 * 3 + hy * 0.6;
        const rr = 2.3 + (sd - 0.5) * 0.55;
        ring.push(Math.cos(ang) * rr * 1.18, Math.sin(ang) * rr * 0.85, (sd - 0.5) * 0.35);
        bandArr.push(hx * 1.12, (sd - 0.5) * 0.36, (sd - 0.5) * 0.1);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3));
      geo.setAttribute('aRand', new THREE.BufferAttribute(new Float32Array(rand), 3));
      geo.setAttribute('aSeed', new THREE.BufferAttribute(new Float32Array(seed), 1));
      geo.setAttribute('aRing', new THREE.BufferAttribute(new Float32Array(ring), 3));
      geo.setAttribute('aBand', new THREE.BufferAttribute(new Float32Array(bandArr), 3));
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
          uBurstOrigin: { value: new THREE.Vector2(0, 0) },
          uBurstT: { value: -100 },
          uAttract: { value: 0 },
          uAttractPos: { value: new THREE.Vector2(99, 99) },
          uMorphA: { value: 0 },
          uMorphB: { value: 0 },
          uBass: { value: 0 },
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
  const burstSeen = useRef(0);
  const morphA = useRef(0);
  const morphB = useRef(0);
  const bell = (p: number, a: number, b: number, c: number, d: number) =>
    Math.min(THREE.MathUtils.smoothstep(p, a, b), 1 - THREE.MathUtils.smoothstep(p, c, d));
  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const v = variantFor(pathname);
    const home = !pathname || pathname === '/';
    // chapter morph (home only): logo -> ring -> band by page progress
    morphA.current = THREE.MathUtils.damp(
      morphA.current,
      home ? bell(motion.pageProgress, 0.10, 0.26, 0.48, 0.62) : 0,
      3.5,
      delta
    );
    morphB.current = THREE.MathUtils.damp(
      morphB.current,
      home ? bell(motion.pageProgress, 0.66, 0.80, 0.94, 1.05) : 0,
      3.5,
      delta
    );
    const morphed = Math.max(morphA.current, morphB.current);
    // hero scroll: on home the assembly lifts and recedes as the hero leaves
    const lift = home ? motion.heroProgress * 1.5 : 0;
    const recede = home ? motion.heroProgress * -1.2 : 0;
    let ty = v.pos[1] + lift;
    let tz = v.pos[2] + recede;
    if (home) {
      ty = THREE.MathUtils.lerp(ty, 0.15, morphA.current);
      tz = THREE.MathUtils.lerp(tz, -0.3, morphA.current);
      ty = THREE.MathUtils.lerp(ty, 0.35, morphB.current);
    }
    g.position.x = THREE.MathUtils.damp(g.position.x, v.pos[0], 3, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, ty, 3, delta);
    g.position.z = THREE.MathUtils.damp(g.position.z, tz, 3, delta);
    const s = THREE.MathUtils.damp(g.scale.x, v.scale, 3, delta);
    g.scale.setScalar(s);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, motion.pointer.x * 0.13, 4, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -motion.pointer.y * 0.07, 4, delta);

    const velDisperse = THREE.MathUtils.clamp(motion.scrollVel * 0.055, 0, 1);
    const scrollDisperse = home ? motion.heroProgress * 1.1 * (1 - morphed) : 0.25;
    disperse.current = THREE.MathUtils.damp(
      disperse.current,
      Math.min(1.25, Math.max(velDisperse, scrollDisperse * (home ? 1 : 0.4)) + motion.audio.bass * 0.35),
      5,
      delta
    );
    form.current = THREE.MathUtils.damp(form.current, motion.introDone ? 1 : 0, 1.6, delta);

    if (planeMat.current) {
      planeMat.current.uniforms.uTime.value = state.clock.elapsedTime;
      planeMat.current.uniforms.uGlitch.value = disperse.current * 0.7;
      planeMat.current.uniforms.uOpacity.value = THREE.MathUtils.damp(
        planeMat.current.uniforms.uOpacity.value,
        v.plane * (1 - (home ? motion.heroProgress : 0)) * (1 - morphed),
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
      const pw = new THREE.Vector2(
        motion.pointer.x * (vp.width / 2) - g.position.x,
        -motion.pointer.y * (vp.height / 2) - g.position.y
      );
      (m.uniforms.uPointerWorld.value as THREE.Vector2).copy(pw);
      (m.uniforms.uAttractPos.value as THREE.Vector2).copy(pw);
      m.uniforms.uAttract.value = THREE.MathUtils.damp(
        m.uniforms.uAttract.value as number,
        motion.attract ? 1 : 0,
        6,
        delta
      );
      if (motion.burstSeq !== burstSeen.current) {
        burstSeen.current = motion.burstSeq;
        m.uniforms.uBurstT.value = state.clock.elapsedTime;
        (m.uniforms.uBurstOrigin.value as THREE.Vector2).set(
          motion.burstNDC.x * (vp.width / 2) - g.position.x,
          motion.burstNDC.y * (vp.height / 2) - g.position.y
        );
      }
      m.uniforms.uMorphA.value = morphA.current;
      m.uniforms.uMorphB.value = morphB.current;
      m.uniforms.uBass.value = motion.audio.bass;
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


/* ---------------------------------- index-row generative preview ---------------------------------- */

const previewVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const previewFragment = /* glsl */ `
  uniform float uSeed;
  uniform float uTime;
  uniform float uShow;
  varying vec2 vUv;
  float hash(float n) { return fract(sin(n) * 43758.5453); }
  float waveY(float x, float seed, float t) {
    float f1 = 5.0 + hash(seed) * 9.0;
    float f2 = 11.0 + hash(seed + 7.0) * 14.0;
    float f3 = 23.0 + hash(seed + 13.0) * 20.0;
    return 0.5
      + sin(x * f1 + t * (0.7 + hash(seed + 3.0)) + seed) * 0.16
      + sin(x * f2 - t * 1.13 + seed * 2.0) * 0.09
      + sin(x * f3 + t * 1.9) * 0.045;
  }
  void main() {
    vec2 uv = vUv;
    vec3 col = vec3(0.043, 0.043, 0.055);
    vec2 g = fract(uv * vec2(36.0, 24.0)) - 0.5;
    col += vec3(0.10) * smoothstep(0.32, 0.1, length(g));
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      float y = waveY(uv.x, uSeed + fi * 17.0, uTime + fi * 0.7);
      float line = smoothstep(0.012 + fi * 0.006, 0.0, abs(uv.y - y));
      vec3 lc = i == 0 ? vec3(0.34, 0.84, 0.78) : vec3(0.91, 0.90, 0.87) * (0.5 - fi * 0.12);
      col += lc * line * (0.9 - fi * 0.22);
    }
    float sweep = smoothstep(0.06, 0.0, abs(fract(uTime * 0.13 + uSeed) - uv.x));
    col += vec3(0.05, 0.09, 0.08) * sweep;
    float fr = step(uv.x, 0.012) + step(0.988, uv.x) + step(uv.y, 0.018) + step(0.982, uv.y);
    col = mix(col, vec3(0.55, 0.54, 0.5), clamp(fr, 0.0, 1.0) * 0.8);
    gl_FragColor = vec4(col, 0.94 * uShow);
  }
`;

/** A cursor-following "signal card" for index rows: each article seeds
 *  its own waveform. Trails the pointer with lag, tilts with velocity. */
function PreviewPlane() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const show = useRef(0);
  const pos = useRef(new THREE.Vector3(0, 0, 0.6));
  const prevX = useRef(0);
  const key = useRef<string | null>(null);
  const pathname = usePathname();
  useFrame((state, delta) => {
    const m = mesh.current;
    const mt = mat.current;
    if (!m || !mt) return;
    const hr = motion.hoverRow;
    const active = !!hr && (pathname === '/' || pathname === '/blog');
    if (active && hr && hr.key !== key.current) {
      key.current = hr.key;
      mt.uniforms.uSeed.value = hr.seed;
      show.current = Math.min(show.current, 0.2); // flicker on switch
    }
    if (!active) key.current = null;
    show.current = THREE.MathUtils.damp(show.current, active ? 1 : 0, 8, delta);
    m.visible = show.current > 0.02;
    if (!m.visible) return;
    mt.uniforms.uShow.value = show.current;
    mt.uniforms.uTime.value = state.clock.elapsedTime;
    const vp = state.viewport.getCurrentViewport(state.camera, new THREE.Vector3(0, 0, 0.6));
    const tx = Math.min(
      motion.pointer.x * (vp.width / 2) + 1.2 + state.camera.position.x,
      vp.width / 2 - 0.3
    );
    const ty = -motion.pointer.y * (vp.height / 2) + 0.45 + state.camera.position.y;
    pos.current.x = THREE.MathUtils.damp(pos.current.x, tx, 6.5, delta);
    pos.current.y = THREE.MathUtils.damp(pos.current.y, ty, 6.5, delta);
    pos.current.z = 0.6;
    m.position.copy(pos.current);
    const vel = (pos.current.x - prevX.current) / Math.max(delta, 0.001);
    prevX.current = pos.current.x;
    m.rotation.z = THREE.MathUtils.damp(
      m.rotation.z,
      THREE.MathUtils.clamp(-vel * 0.02, -0.28, 0.28),
      6,
      delta
    );
    const sc = 0.85 + show.current * 0.15;
    m.scale.set(sc, sc, 1);
  });
  return (
    <mesh ref={mesh} visible={false} renderOrder={5}>
      <planeGeometry args={[1.9, 1.25]} />
      <shaderMaterial
        ref={mat}
        vertexShader={previewVertex}
        fragmentShader={previewFragment}
        uniforms={{ uSeed: { value: 0 }, uTime: { value: 0 }, uShow: { value: 0 } }}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/* ---------------------------------- flowmap post pass ---------------------------------- */

const flowFragment = /* glsl */ `
  uniform sampler2D tFlow;
  uniform float uStrength;
  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec3 flow = texture2D(tFlow, uv).rgb;
    vec2 vel = (flow.rg - 0.5) * 2.0;
    float mag = flow.b;
    vec2 off = vel * mag * uStrength * 0.05;
    float r = texture2D(inputBuffer, uv + off * 1.6).r;
    float g = texture2D(inputBuffer, uv + off).g;
    float b = texture2D(inputBuffer, uv - off * 0.6).b;
    outputColor = vec4(vec3(r, g, b), inputColor.a);
  }
`;

class FlowEffect extends Effect {
  constructor(texture: THREE.Texture) {
    super('FlowEffect', flowFragment, {
      blendFunction: BlendFunction.NORMAL,
      uniforms: new Map<string, THREE.Uniform>([
        ['tFlow', new THREE.Uniform(texture)],
        ['uStrength', new THREE.Uniform(0)],
      ]),
    });
  }
}

const FLOW_W = 160;
const FLOW_H = 90;

/** CPU velocity field (Lusion-style screen paint at 1/12 resolution):
 *  pointer velocity is stamped into a small texture that decays every
 *  frame; the FlowEffect pass refracts the whole frame by it. */
function FlowField() {
  const { texture, data } = useMemo(() => {
    const data = new Uint8Array(FLOW_W * FLOW_H * 4);
    for (let i = 0; i < FLOW_W * FLOW_H; i++) {
      data[i * 4] = 128;
      data[i * 4 + 1] = 128;
      data[i * 4 + 2] = 0;
      data[i * 4 + 3] = 255;
    }
    const texture = new THREE.DataTexture(data, FLOW_W, FLOW_H, THREE.RGBAFormat);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return { texture, data };
  }, []);
  const effect = useMemo(() => new FlowEffect(texture), [texture]);
  const prev = useRef({ x: 0, y: 0 });
  const pathname = usePathname();
  useFrame((_, delta) => {
    for (let i = 0; i < FLOW_W * FLOW_H; i++) {
      const o = i * 4;
      data[o] = 128 + (data[o] - 128) * 0.972;
      data[o + 1] = 128 + (data[o + 1] - 128) * 0.972;
      data[o + 2] = data[o + 2] * 0.94;
    }
    const vx = (motion.pointer.x - prev.current.x) / 2; // NDC -> uv units
    const vy = -(motion.pointer.y - prev.current.y) / 2;
    prev.current.x = motion.pointer.x;
    prev.current.y = motion.pointer.y;
    const speed = Math.hypot(vx, vy);
    if (speed > 0.0004) {
      const cx = ((motion.pointer.x + 1) / 2) * FLOW_W;
      const cy = ((1 - motion.pointer.y) / 2) * FLOW_H;
      const R = 5;
      for (let y = Math.max(0, Math.floor(cy - R)); y < Math.min(FLOW_H, cy + R); y++) {
        for (let x = Math.max(0, Math.floor(cx - R)); x < Math.min(FLOW_W, cx + R); x++) {
          const dx = x - cx;
          const dy = y - cy;
          const d2 = dx * dx + dy * dy;
          if (d2 > R * R) continue;
          const fall = Math.exp(-d2 / (R * R * 0.5));
          const o = (y * FLOW_W + x) * 4;
          data[o] = THREE.MathUtils.clamp(data[o] + vx * 5200 * fall, 0, 255);
          data[o + 1] = THREE.MathUtils.clamp(data[o + 1] + vy * 5200 * fall, 0, 255);
          data[o + 2] = Math.min(255, data[o + 2] + speed * 5200 * fall);
        }
      }
    }
    texture.needsUpdate = true;
    const article = pathname?.startsWith('/blog/');
    const home = !pathname || pathname === '/';
    const target = article ? 0 : home ? (motion.heroProgress < 0.7 ? 1 : 0.3) : 0.4;
    const u = effect.uniforms.get('uStrength');
    if (u) u.value = THREE.MathUtils.damp(u.value as number, target, 3, delta);
  });
  return <primitive object={effect} />;
}

/** Audio-reactive chromatic aberration: the offset breathes with bass. */
function PostRig({ caRef }: { caRef: React.RefObject<unknown> }) {
  useFrame(() => {
    const eff = caRef.current as {
      offset?: { set: (x: number, y: number) => void };
      uniforms?: Map<string, { value?: { set?: (x: number, y: number) => void } }>;
    } | null;
    if (!eff) return;
    const s = 0.00045 + motion.audio.bass * 0.0024 + Math.min(motion.scrollVel * 0.000008, 0.0006);
    if (eff.offset?.set) eff.offset.set(s, s);
    else eff.uniforms?.get('offset')?.value?.set?.(s, s);
  });
  return null;
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
  const caRef = useRef(null);
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
      <PreviewPlane />
      <Rig />
      <PostRig caRef={caRef} />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.32} luminanceThreshold={0.32} luminanceSmoothing={0.25} mipmapBlur />
        <FlowField />
        <ChromaticAberration
          ref={caRef}
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
