import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import Dialog from './components/Dialog';
import { whatsappLink } from './data';
import palco from './assets/clientes/cliente-palco.jpg';
import poa from './assets/clientes/cliente-poa.jpg';
import azul from './assets/clientes/cliente-azul.jpg';
import rosa from './assets/clientes/cliente-rosa.jpg';

const entries = [
  { image: palco, caption: 'Look no palco — registro compartilhado nos stories da loja.', label: 'Estilo para os seus momentos.' },
  { image: poa, caption: 'Regata de poá — cliente compartilhando seu look Valentina.', label: 'Valentina no dia a dia.' },
  { image: azul, caption: 'Vestido azul — registro compartilhado nos stories da loja.', label: 'Cor para viver novas histórias.' },
  { image: rosa, caption: 'Blusa rosa e saia preta — look compartilhado por cliente.', label: 'Um look com a sua personalidade.' },
];

export default function SocialProof() {
  const [open, setOpen] = useState<number | null>(null);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const track = useRef<HTMLDivElement>(null);

  const updateControls = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setCanPrevious(el.scrollLeft > 2);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    updateControls();
    const observer = new ResizeObserver(updateControls);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateControls]);

  const move = (direction: number) => {
    const el = track.current;
    if (!el) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = (el.querySelector('button')?.getBoundingClientRect().width || 280) + gap;
    el.scrollBy({
      left: direction * step,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  return (
    <section className="social-proof" id="clientes" aria-labelledby="social-title">
      <div className="proof-heading">
        <div>
          <span className="section-label">NA VIDA REAL</span>
          <h2 id="social-title">Elas já vestem <em>Valentina.</em></h2>
          <p>Looks compartilhados pelas nossas clientes. Toque para ver cada foto.</p>
        </div>
        <p className="proof-followers"><strong>7 mil+</strong> pessoas acompanham a Valentina no Instagram.</p>
      </div>
      <div
        className="proof-wall"
        ref={track}
        id="customer-carousel"
        role="region"
        aria-label="Fotos de clientes — carrossel"
        tabIndex={0}
        onScroll={updateControls}
        onKeyDown={event => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            move(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}
      >
        {entries.map((entry, index) => (
          <button className="proof-print" key={entry.image} aria-label={`Ampliar: ${entry.caption}`} onClick={() => setOpen(index)}>
            <img src={entry.image} alt={entry.caption} loading="lazy" decoding="async" onLoad={updateControls} />
            <span>{entry.label} <ArrowUpRight size={16} aria-hidden="true" /></span>
          </button>
        ))}
      </div>
      <div className="proof-bottom">
        <div className="proof-controls">
          <span>Deslize para ver mais</span>
          <div>
            <button aria-label="Fotos anteriores" aria-controls="customer-carousel" disabled={!canPrevious} onClick={() => move(-1)}><ArrowLeft size={20} aria-hidden="true" /></button>
            <button aria-label="Próximas fotos" aria-controls="customer-carousel" disabled={!canNext} onClick={() => move(1)}><ArrowRight size={20} aria-hidden="true" /></button>
          </div>
        </div>
        <a className="button button-primary" href={whatsappLink('Olá! Vi os looks das clientes no site da Valentina e quero ajuda para escolher o meu.')} target="_blank" rel="noopener noreferrer">
          Quero ajuda para escolher meu look <ArrowUpRight size={20} aria-hidden="true" />
        </a>
      </div>
      {open !== null && (
        <Dialog label="Foto compartilhada por cliente" onClose={() => setOpen(null)} className="proof-dialog">
          <img src={entries[open].image} alt={entries[open].caption} />
        </Dialog>
      )}
    </section>
  );
}
