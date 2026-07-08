import { lazy, Suspense, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import WhyMe from './sections/WhyMe';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import LegalPage from './pages/LegalPage';

// three.js is heavy — keep it in its own chunk so the page shows up fast
const Scene = lazy(() => import('./three/Scene'));

gsap.registerPlugin(ScrollTrigger);

type Route = 'home' | 'imprint' | 'privacy';

/** Tiny hash router: '#/imprint' and '#/privacy' are pages, everything else is home. */
function useRoute(): Route {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (hash.startsWith('#/imprint')) return 'imprint';
  if (hash.startsWith('#/privacy')) return 'privacy';
  return 'home';
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isSmallScreen = window.matchMedia('(max-width: 900px)').matches;

export default function App() {
  const route = useRoute();
  const showScene = route === 'home' && !prefersReducedMotion;

  useSmoothScroll(!prefersReducedMotion);

  // scroll-triggered reveal animations for the home sections
  useEffect(() => {
    if (route !== 'home' || prefersReducedMotion) return;

    const batch = ScrollTrigger.batch('.reveal', {
      start: 'top 88%',
      once: true,
      onEnter: (elements) =>
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
        }),
    });
    ScrollTrigger.refresh();

    return () => batch.forEach((trigger) => trigger.kill());
  }, [route]);

  return (
    <>
      {showScene ? (
        <Suspense fallback={<div className="static-backdrop" aria-hidden="true" />}>
          <Scene compact={isSmallScreen} />
        </Suspense>
      ) : (
        <div className="static-backdrop" aria-hidden="true" />
      )}

      <div className="site-content">
        <Navbar />
        {route === 'home' ? (
          <main>
            <Hero />
            <WhyMe />
            <Skills />
            <Projects />
            <Contact />
          </main>
        ) : (
          <LegalPage page={route} />
        )}
        <Footer />
      </div>
    </>
  );
}
