import { useRef, useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import Dialog from './components/Dialog';
import { whatsapp } from './data';
import palco from './assets/clientes/cliente-palco.jpg';
import poa from './assets/clientes/cliente-poa.jpg';
import azul from './assets/clientes/cliente-azul.jpg';
import rosa from './assets/clientes/cliente-rosa.jpg';
const entries = [
  [palco, 'Look no palco — registro compartilhado nos stories da loja.'],
  [poa, 'Regata de poá — cliente compartilhando seu look Valentina.'],
  [azul, 'Vestido azul — registro compartilhado nos stories da loja.'],
  [rosa, 'Blusa rosa e saia preta — look compartilhado por cliente.'],
];
export default function SocialProof() {
  const [open, setOpen] = useState<string | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) => {
    const el = track.current;
    if (!el) return;
    const step = (el.querySelector('button')?.getBoundingClientRect().width || 280) + 32;
    el.scrollBy({ left: direction * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  const available = entries;

  return <section className="social-proof" id="clientes" aria-labelledby="social-title">
    <div className="section-kicker"><span>05 / QUEM VESTE VALENTINA</span><span>EXPERIÊNCIAS COMPARTILHADAS</span></div>
    <div className="proof-heading"><h2 id="social-title">Elas vestem<br /><em>Valentina.</em></h2><div><p>Mais do que roupas. Looks que fazem parte de momentos, histórias e personalidades.</p><strong>7 mil+</strong><p>Mais de 7 mil pessoas acompanham a Valentina todos os dias.</p><a className="text-link" href="https://www.instagram.com/valentinaclosetloja/" target="_blank" rel="noopener noreferrer">Encontre a gente no Instagram <ArrowUpRight size={17} /></a></div></div>
    {available.length > 0 ? <div className="proof-wall" ref={track} id="customer-carousel" role="region" aria-label="Fotos de clientes — carrossel" tabIndex={0}>{available.map(([file, caption], i) => <button key={file} className={`proof-print proof-print-${i}`} aria-label={`Ampliar: ${caption}`} data-view onClick={() => setOpen(file)}><img src={file} alt={caption} loading="lazy" /><span>{caption}</span></button>)}</div> : <div className="proof-pending">{[["Fotos de clientes", "Seu look, sua história."], ["Mensagens recebidas", "O carinho de quem veste."], ["Na vida real", "Momentos com a Valentina."]].map(([label, text], i) => <div className={`proof-placeholder proof-placeholder-${i}`} key={label}><span>0{i + 1} / {label}</span><em>{text}</em><small>ESPAÇO RESERVADO<br />Aguardando conteúdo real autorizado.</small></div>)}</div>}
    {available.length > 0 && <div className="proof-controls"><span>DESLIZE PARA CONHECER AS HISTÓRIAS</span><div><button aria-label="Fotos anteriores" aria-controls="customer-carousel" onClick={() => move(-1)}><ArrowLeft size={20} /></button><button aria-label="Próximas fotos" aria-controls="customer-carousel" onClick={() => move(1)}><ArrowRight size={20} /></button></div></div>}
    <a className="text-link" href={whatsapp} target="_blank" rel="noopener noreferrer" data-magnetic>Quero encontrar meu look também <ArrowUpRight size={19} /></a>
    {open && <Dialog label="Foto compartilhada por cliente" onClose={() => setOpen(null)} className="proof-dialog"><img src={open} alt={entries.find(([file]) => file === open)?.[1]} /></Dialog>}
  </section>;
}
