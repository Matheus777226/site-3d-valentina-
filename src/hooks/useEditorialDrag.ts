import { useEffect } from 'react';

/** Mouse dragging complements touch swipe without intercepting vertical scrolling. */
export function useEditorialDrag() {
  useEffect(() => {
    const track = document.querySelector<HTMLElement>('.proof-wall');
    if (!track) return;
    let active = false, moved = false, start = 0, initial = 0;
    const down = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      active = true; moved = false; start = event.clientX; initial = track.scrollLeft;
    };
    const move = (event: PointerEvent) => {
      if (!active) return;
      const delta = start - event.clientX;
      if (Math.abs(delta) < 8 && !moved) return;
      moved = true;
      event.preventDefault();
      track.style.scrollSnapType = 'none';
      track.scrollLeft = initial + delta;
    };
    const up = () => { active = false; track.style.scrollSnapType = ''; };
    const click = (event: MouseEvent) => {
      if (moved) { event.preventDefault(); event.stopPropagation(); moved = false; }
    };
    const preventImageDrag = (event: DragEvent) => event.preventDefault();
    track.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    track.addEventListener('click', click, true);
    track.addEventListener('dragstart', preventImageDrag);
    return () => {
      track.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      track.removeEventListener('click', click, true);
      track.removeEventListener('dragstart', preventImageDrag);
    };
  }, []);
}
