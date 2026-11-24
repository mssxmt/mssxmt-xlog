// Shared, mutable motion state. Written by DOM listeners (SmoothScroll /
// BackgroundCanvas / rows / audio engine), read inside the WebGL render
// loop. One clock: the scene's useFrame reads everything from here;
// nothing here triggers React renders.
export const motion = {
  pointer: { x: 0, y: 0 }, // -1..1
  scrollVel: 0, // smoothed scroll velocity (Lenis velocity when active)
  scrollY: 0,
  pageProgress: 0, // 0..1 across the whole document
  heroProgress: 0, // 0..1 across the first viewport height
  introDone: false, // preloader finished; the point cloud may form
  hoverJacket: null as string | null, // data-gl-jacket key currently hovered
  // v3 — interactions
  burstNDC: { x: 0, y: 0.25 }, // last click/tap position (NDC) for the shockwave
  burstSeq: 0, // increments per burst; the scene consumes changes
  attract: false, // long-press: points are pulled toward the pointer
  audio: { on: false, bass: 0, high: 0 }, // Tone.js analyser levels, smoothed
  hoverRow: null as { key: string; seed: number } | null, // index row hovered
};
