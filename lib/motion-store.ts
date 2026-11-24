// Shared, mutable motion state. Written by DOM listeners (SmoothScroll /
// BackgroundCanvas), read inside the WebGL render loop. One clock: the
// scene's useFrame reads everything from here; nothing here triggers
// React renders.
export const motion = {
  pointer: { x: 0, y: 0 }, // -1..1
  scrollVel: 0, // smoothed scroll velocity (Lenis velocity when active)
  scrollY: 0,
  pageProgress: 0, // 0..1 across the whole document
  heroProgress: 0, // 0..1 across the first viewport height
  introDone: false, // preloader finished; the point cloud may form
  hoverJacket: null as string | null, // data-gl-jacket key currently hovered
};
