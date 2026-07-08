/**
 * Shared scroll state, written by Lenis on every scroll frame and
 * read inside the three.js render loop. Kept as a plain mutable
 * object on purpose — updating React state 60x per second would
 * re-render the whole tree for no reason.
 */
export const scrollState = {
  /** 0 at the top of the page, 1 at the very bottom */
  progress: 0,
  /** current smoothed scroll velocity from Lenis */
  velocity: 0,
};
