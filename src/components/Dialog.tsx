import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
export default function Dialog({ children, label, onClose, className = '' }: { children: ReactNode; label: string; onClose: () => void; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    const app = document.getElementById('root');
    const wasInert = app?.inert ?? false;
    if (app) app.inert = true;
    document.body.style.overflow = 'hidden';
    root.current?.querySelector<HTMLElement>('button')?.focus();
    const handle = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close.current();
      if (event.key !== 'Tab') return;
      const elements = root.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]');
      if (!elements?.length) return;
      const first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', handle);
    return () => { document.body.style.overflow = overflow; if (app) app.inert = wasInert; window.removeEventListener('keydown', handle); previous?.focus({ preventScroll: true }); };
  }, []);
  return createPortal(<div className="dialog-backdrop" data-lenis-prevent onClick={onClose}><div className={`dialog ${className}`} ref={root} role="dialog" aria-modal="true" aria-label={label} onClick={e => e.stopPropagation()}><button className="dialog-close" aria-label="Fechar" onClick={onClose}><X size={21} /></button>{children}</div></div>, document.body);
}
