import { useEffect, useRef } from 'react';
import gsap from 'gsap';
export default function Cursor({ reduced }: { reduced: boolean }) {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced || !matchMedia('(hover: hover) and (pointer: fine)').matches || !cursor.current) return;
    const node = cursor.current;
    const x = gsap.quickTo(node, 'x', { duration: .18, ease: 'power3.out' });
    const y = gsap.quickTo(node, 'y', { duration: .18, ease: 'power3.out' });
    const move = (event: PointerEvent) => {
      x(event.clientX); y(event.clientY);
      node.style.opacity = '1';
      const target = event.target as Element;
      const view = !!target.closest('[data-view]');
      node.dataset.mode = view ? 'view' : target.closest('a,button') ? 'action' : 'default';
      node.textContent = view ? 'VIEW' : '';
    };
    const leave = () => { node.style.opacity = '0'; };
    document.documentElement.classList.add('custom-cursor');
    window.addEventListener('pointermove', move);
    document.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    return () => { document.documentElement.classList.remove('custom-cursor'); window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); window.removeEventListener('blur', leave); gsap.killTweensOf(node); };
  }, [reduced]);
  return <div className="art-cursor" ref={cursor} aria-hidden="true" />;
}
