import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
const ArtScene = lazy(() => import('./ArtScene'));
class SceneBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <span className="scene-unavailable">A MODA SE TRANSFORMA</span> : this.props.children; }
}
export default function LazySculpture({ variant = 'hero', reduced }: { variant?: 'hero' | 'bridge'; reduced: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!root.current) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      timer = setTimeout(() => setReady(true), variant === 'hero' ? 650 : 100);
      observer.disconnect();
    }, { rootMargin: '100px' });
    observer.observe(root.current);
    return () => { observer.disconnect(); clearTimeout(timer); };
  }, [variant]);
  return <div ref={root} className={`sculpture-layer sculpture-${variant}`}><SceneBoundary>{ready && <Suspense fallback={null}><ArtScene variant={variant} reduced={reduced} /></Suspense>}</SceneBoundary></div>;
}
