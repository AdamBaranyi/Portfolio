import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollState } from './scrollState';

gsap.registerPlugin(ScrollTrigger);

/**
 * Sets up Lenis smooth scrolling and keeps GSAP's ScrollTrigger
 * in sync with it. Also mirrors the scroll progress into the
 * shared scrollState so the 3D scene can react to it.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      // smooth-scroll in-page anchors and keep them below the fixed navbar
      anchors: { offset: -20 },
    });

    lenis.on('scroll', (e: Lenis) => {
      scrollState.progress = e.limit > 0 ? e.scroll / e.limit : 0;
      scrollState.velocity = e.velocity;
      ScrollTrigger.update();
    });

    // Drive Lenis from GSAP's ticker so both share one RAF loop
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [enabled]);
}
