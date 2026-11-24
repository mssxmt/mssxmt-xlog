// Shared, mutable motion state read by the WebGL scene each frame.
// Written by DOM listeners (BackgroundCanvas), read inside useFrame.
export const motion = {
  pointer: { x: 0, y: 0 }, // -1..1, smoothed in the scene
  scrollVel: 0, // decaying scroll velocity, drives glitch amount
  scrollY: 0,
};
