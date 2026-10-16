import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Mouse dragging mirrors native mobile swipe, including the pinned runway. */
export function useEditorialDrag() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>('.runway-track, .proof-pending, .proof-wall, .instagram-strip').forEach(track => {
      let active = false, moved = false, start = 0, initial = 0;
      const pinned = () => track.closest('.runway.is-horizontal') !== null;
      const down = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse' || event.button !== 0) return;
        active = true; moved = false; start = event.clientX;
        initial = pinned() ? window.scrollY : track.scrollLeft;
      };
      const move = (event: PointerEvent) => {
        if (!active) return;
        const delta = start - event.clientX;
        if (Math.abs(delta) < 8 && !moved) return;
        moved = true; event.preventDefault();
        if (pinned()) {
          const trigger = ScrollTrigger.getById('runway');
          if (trigger) window.scrollTo({ top: Math.max(trigger.start, Math.min(trigger.end, initial + delta * 2)), behavior: 'instant' });
        } else track.scrollLeft = initial + delta;
      };
      const up = () => { active = false; };
      const click = (event: MouseEvent) => { if (moved) { event.preventDefault(); event.stopPropagation(); moved = false; } };
      const preventImageDrag = (event: DragEvent) => event.preventDefault();
      track.addEventListener('pointerdown', down);
      window.addEventListener('pointermove', move, { passive: false });
      window.addEventListener('pointerup', up);
      track.addEventListener('click', click, true);
      track.addEventListener('dragstart', preventImageDrag);
      cleanups.push(() => {
        track.removeEventListener('pointerdown', down);
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        track.removeEventListener('click', click, true);
        track.removeEventListener('dragstart', preventImageDrag);
      });
    });
    return () => cleanups.forEach(cleanup => cleanup());
  }, []);
}
