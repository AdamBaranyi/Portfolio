import { useRef } from 'react';
import type { ReactNode } from 'react';

const MAX_TILT = 7; // degrees

/**
 * Wraps its children in a card that tilts in 3D towards the cursor.
 * Falls back to a plain card when the user prefers reduced motion.
 */
export default function TiltCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1100px) rotateX(${-y * MAX_TILT}deg) rotateY(${x * MAX_TILT}deg)`;
  };

  const handleLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}
