import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ArrowDown, Menu, X, Sparkles, Box } from 'lucide-react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/cormorant-garamond/latin-600.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/dm-sans/latin-600.css';
import './style.css';
import './brand.css';
import SocialProof from './SocialProof';

const Closet = lazy(() => import('./scene'));
gsap.registerPlugin(ScrollTrigger);
const whatsapp = 'https://wa.me/5547996420364';
function BrandLogo() {
  return <a className="brand-logo" href="#inicio" aria-label="Valentina Closet início">
    <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M31 23c-6-4-3-13 3-12 7 1 7 7 3 12l-4 7c-1 2-1 4 1 5 3 2 6-1 5-4-1-3-4-3-7 0l-4 5c-5 5-13 7-20 10-5 2-5 7 1 7h44c5 0 6-4 2-6L39 38" />
    </svg>
    <span className="wordmark brand-name">VALENTINA<span>C L O S E T</span></span>
  </a>;
}
const projects = [
  { name: 'Essência urbana', category: 'Alfaiataria & atitude', image: '/images/look-1.jpg', detail: 'Uma exploração de linhas, contrastes e personalidade. A alfaiataria encontra a liberdade do dia a dia em um editorial sobre presença.', mood: 'Estrutura · Contraste · Confiança' },
  { name: 'O movimento de ser', category: 'Fluidez & expressão', image: '/images/look-2.jpg', detail: 'Cor, fluidez e movimento. Uma direção visual que celebra a liberdade de experimentar novas versões de si mesma.', mood: 'Cor · Leveza · Movimento' },
  { name: 'Entre texturas', category: 'Textura & naturalidade', image: '/images/look-3.jpg', detail: 'Superfícies que convidam a olhar de perto. Uma composição de volumes e texturas que traduz conforto em expressão pessoal.', mood: 'Textura · Volume · Liberdade' },
  { name: 'Naturalmente você', category: 'Identidade & delicadeza', image: '/images/look-4.jpg', detail: 'O encontro entre delicadeza e identidade. Um estudo editorial de tons suaves e combinações que deixam a personalidade aparecer.', mood: 'Naturalidade · Suavidade · Identidade' },
];

class SceneBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="scene-placeholder">Explore o universo Valentina pelos editoriais abaixo. O 3D não está disponível neste dispositivo.</div> : this.props.children; }
}

function App() {
  const reduced = useReducedMotion();
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [scene, setScene] = useState(false);
  const [active, setActive] = useState(0);
  const horizontal = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const dialog = useRef<HTMLDivElement>(null);

  // Load the desktop experience after the page settles; mobile activates it on request.
  useEffect(() => {
    if (reduced || !matchMedia('(min-width: 1000px)').matches) return;
    const timer = window.setTimeout(() => setScene(true), 1200);
    return () => clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ smoothWheel: true, anchors: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => gsap.from(el, { y: 32, opacity: 0, duration: .85, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } }));
      gsap.to('.portfolio-backdrop', { yPercent: 22, ease: 'none', scrollTrigger: { trigger: '.portfolio-hero', start: 'top top', end: 'bottom top', scrub: true } });
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1000px)', () => {
        if (horizontal.current) gsap.to(horizontal.current, { x: () => -Math.max(0, horizontal.current!.scrollWidth - horizontal.current!.clientWidth), ease: 'none', scrollTrigger: { trigger: '.editorial', start: 'top top', end: '+=900', pin: true, scrub: 1, invalidateOnRefresh: true } });
      });
    });
    return () => { ctx.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, [reduced]);

  useEffect(() => {
    if (!menu && selected === null) return;
    document.body.style.overflow = 'hidden';
    const frame = requestAnimationFrame(() => dialog.current?.querySelector<HTMLElement>('button, a[href]')?.focus());
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenu(false); setSelected(null); }
      if (e.key === 'Tab') {
        const targets = dialog.current?.querySelectorAll<HTMLElement>('button, a[href]');
        if (!targets?.length) return;
        const first = targets[0], last = targets[targets.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', key);
    return () => { cancelAnimationFrame(frame); document.body.style.overflow = ''; window.removeEventListener('keydown', key); trigger.current?.focus({ preventScroll: true }); };
  }, [menu, selected]);

  useEffect(() => { const frame = requestAnimationFrame(() => ScrollTrigger.refresh()); return () => cancelAnimationFrame(frame); }, [scene]);
  const openProject = (i: number, el: HTMLElement) => { trigger.current = el; setSelected(i); };

  return <>
    <div className="announcement">VALENTINA CLOSET <span>A MODA se transforma</span></div>
    <header>
      <BrandLogo />
      <nav aria-label="Navegação principal"><a href="#inicio">Universo 3D <span className="tiny-badge">EXPLORE</span></a><a href="#editoriais">Editoriais</a><a href="#essencia">A marca</a></nav>
      <div className="header-actions"><a className="header-cta" href="#contato">Vamos conversar <ArrowUpRight size={14} /></a><button className="menu-button" onClick={e => { trigger.current = e.currentTarget; setMenu(true); }} aria-label="Abrir menu"><Menu /></button></div>
    </header>

    <main>
      <section className="portfolio-hero" id="inicio" aria-labelledby="hero-title">
        <div className="portfolio-hero-copy">
          <div className="eyebrow"><i /> MODA, SOB UMA NOVA PERSPECTIVA</div>
          <h1 id="hero-title">Vista sua<br /><em>dimensão.</em></h1>
          <p>Um olhar sobre moda, identidade e movimento.<br />Entre no universo criativo da Valentina Closet.</p>
          <a href="#editoriais" className="button dark">Explore os editoriais <ArrowUpRight size={19} /></a>
          <div className="hero-bottom"><span className="small-star" aria-hidden="true"><Sparkles size={29} strokeWidth={1.2} /></span><span>Um universo de possibilidades.<br /><b>Uma essência que é só sua.</b></span><a href="#editoriais" className="scroll-link" aria-label="Descer para os editoriais"><ArrowDown size={18} /></a></div>
        </div>
        <div className="portfolio-stage">
          <span className="portfolio-backdrop" aria-hidden="true">V.</span>
          <span className="stage-label">01 / UNIVERSO VALENTINA</span>
          {scene ? <SceneBoundary><Suspense fallback={<div className="scene-placeholder">Abrindo uma nova dimensão…</div>}><Closet color={active} sectionId="inicio" /></Suspense></SceneBoundary> : <button className="scene-launch" onClick={() => setScene(true)}><div className="closet-illustration"><span /><span /><span /></div><span className="round-play"><Box size={25} /></span><strong>Explore o universo 3D</strong><span>Toque para entrar</span></button>}
          <div className="stage-caption"><span>Formas que flutuam.<br /><em>Estilo que permanece.</em></span><span className="stage-number">V / 001</span></div>
          <div className="stage-controls" aria-label="Paleta do universo 3D">{['Pink', 'Blush', 'Ameixa'].map((color, i) => <button aria-label={`Paleta ${color}`} aria-pressed={active === i} className={active === i ? 'chosen' : ''} onClick={() => setActive(i)} key={color}><i style={{ background: ['#f5008b', '#f765bd', '#790044'][i] }} /><span>{color}</span></button>)}</div>
        </div>
        <div className="portfolio-hero-foot"><span>PORTFÓLIO DE MODA & IDENTIDADE</span><span>{scene ? 'Role para mover a perspectiva' : 'Uma experiência para descobrir no seu ritmo'} <ArrowDown size={12} /></span></div>
      </section>

      <div className="marquee" aria-hidden="true"><span>MODA COMO EXPRESSÃO</span><i><Sparkles size={24} strokeWidth={1.2} /></i><span>IDENTIDADE EM MOVIMENTO</span><i><Sparkles size={24} strokeWidth={1.2} /></i><span>O UNIVERSO VALENTINA</span><i><Sparkles size={24} strokeWidth={1.2} /></i></div>

      <section className="portfolio-projects section" id="editoriais">
        <div className="section-top" data-reveal><div><div className="eyebrow">02 / OLHARES SELECIONADOS</div><h2>Além do look.<br /><em>Uma história.</em></h2></div><p>Um portfólio de formas, texturas e atitudes.<br />Explore as inspirações que traduzem nosso universo.</p></div>
        <div className="project-grid">{projects.map((project, i) => <motion.article key={project.name} className="project-card" whileHover={reduced ? undefined : { y: -6 }}>
          <button className="project-cover" onClick={e => openProject(i, e.currentTarget)} aria-label={`Explorar editorial ${project.name}`}><img src={project.image} alt={`Referência editorial: ${project.name}`} loading="lazy" /><span className="project-cover-number">0{i + 1}</span><span className="project-open"><ArrowUpRight size={22} /></span><span className="project-cover-caption">VER EDITORIAL</span></button>
          <div className="project-heading"><div><p>{project.category}</p><h3><button onClick={e => openProject(i, e.currentTarget)}>{project.name}</button></h3></div><span>0{i + 1} / 04</span></div>
        </motion.article>)}</div>
        <p className="editorial-note">Estudos visuais com imagens editoriais de referência.</p>
      </section>

      <section className="editorial" aria-label="Narrativa visual em movimento"><div className="editorial-track" ref={horizontal}>
        <div className="editorial-intro"><div className="eyebrow">03 / UM UNIVERSO EM MOVIMENTO</div><h2>Não é só<br />sobre vestir.<br /><em>É sobre ser.</em></h2><p>Uma narrativa para percorrer no seu ritmo.</p><ArrowRight size={28} /></div>
        <div className="story-card"><img src="/images/look-3.jpg" alt="Estudo de texturas e movimento" loading="lazy" /><div><span>01 / TEXTURA</span><h3>O detalhe<br />muda tudo.</h3></div></div>
        <div className="story-card"><img src="/images/look-1.jpg" alt="Estudo de alfaiataria e identidade" loading="lazy" /><div><span>02 / PRESENÇA</span><h3>Uma identidade<br />que se move.</h3></div></div>
        <div className="editorial-end"><Sparkles size={32} /><h3>A sua essência.<br />Em cada dimensão.</h3><a href="#essencia">Conheça a marca <ArrowUpRight size={17} /></a></div>
      </div></section>

      <section id="essencia" className="essence section"><div className="essence-image" data-reveal><img src="/images/closet.jpg" alt="Referência visual de curadoria de roupas" loading="lazy" /><span>O OLHAR VALENTINA.</span></div><div data-reveal><div className="eyebrow">04 / A MARCA</div><h2>Uma essência.<br /><em>Infinitas versões.</em></h2><p>Acreditamos na moda como expressão de identidade. Nas texturas que despertam sensações. No movimento que transforma um look em presença.</p><p>Este é o nosso portfólio: um espaço para compartilhar o olhar Valentina e explorar novas possibilidades de estilo.</p><a className="text-link" href="#contato">Entre no nosso universo <ArrowUpRight size={18} /></a></div></section>
      <SocialProof />
      <section className="closing portfolio-contact" id="contato"><span className="eyebrow">05 / VAMOS CRIAR CONEXÕES</span><h2>O próximo capítulo<br /><em>começa com uma conversa.</em></h2><p>Para conhecer a marca, compartilhar uma ideia<br />ou encontrar novas possibilidades.</p><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="button dark">Converse com a Valentina <ArrowUpRight size={18} /></a><a className="brand-social" href="https://www.instagram.com/valentinaclosetloja/" target="_blank" rel="noopener noreferrer">@valentinaclosetloja <ArrowUpRight size={14} /></a></section>
    </main>
    <footer><BrandLogo /><p>A MODA se transforma.</p><span>© {new Date().getFullYear()} Valentina Closet</span><a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Conversar no WhatsApp"><ArrowUpRight size={19} /></a></footer>

    <AnimatePresence>{menu && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .2 }} className="overlay"><div ref={dialog} className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu"><button className="close" onClick={() => setMenu(false)} aria-label="Fechar menu"><X /></button>{[['Universo 3D', 'inicio'], ['Editoriais', 'editoriais'], ['A marca', 'essencia'], ['Contato', 'contato']].map(([text, id]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{text}<ArrowUpRight /></a>)}</div></motion.div>}
      {selected !== null && <motion.div className="overlay modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .2 }} onClick={() => setSelected(null)}><div ref={dialog} className="look-modal" role="dialog" aria-modal="true" aria-labelledby="editorial-title" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setSelected(null)} aria-label="Fechar editorial"><X /></button><img src={projects[selected].image} alt={projects[selected].name} /><div className="look-details"><div className="eyebrow">EDITORIAL / 0{selected + 1}</div><h2 id="editorial-title">{projects[selected].name}</h2><p>{projects[selected].detail}</p><div className="editorial-mood">{projects[selected].mood}</div><p className="editorial-note">Estudo visual com fotografia de referência.</p><a className="text-link" href={`${whatsapp}?text=${encodeURIComponent(`Olá! Conheci o editorial “${projects[selected].name}” no portfólio da Valentina e gostaria de conversar.`)}`} target="_blank" rel="noopener noreferrer">Vamos conversar <ArrowUpRight size={17} /></a><div className="project-pagination"><button onClick={() => setSelected((selected + projects.length - 1) % projects.length)} aria-label="Editorial anterior">← Anterior</button><span>0{selected + 1} / 04</span><button onClick={() => setSelected((selected + 1) % projects.length)} aria-label="Próximo editorial">Próximo →</button></div></div></div></motion.div>}
    </AnimatePresence>
  </>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
