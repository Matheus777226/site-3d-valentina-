import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, ArrowLeft, ArrowRight, Menu, MessageCircle, Sparkles } from 'lucide-react';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/cormorant-garamond/latin-600.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/dm-sans/latin-600.css';
import './brand.css';
import './style.css';
import BrandLogo from './components/BrandLogo';
import LazySculpture from './components/LazySculpture';
import Dialog from './components/Dialog';
import Cursor from './components/Cursor';
import { VIPGroup, SalespersonJo } from './components/Community';
import Catalog from './components/Catalog';
import SocialProof from './SocialProof';
import { NewCollection, HumanExperience, InstagramEditorial, VisitAndDelivery } from './components/StoreSections';
import { useEditorialDrag } from './hooks/useEditorialDrag';
import { useCampaignMotion } from './hooks/useCampaignMotion';
import { concepts, instagram, looks, whatsapp, store } from './data';

function App() {
  const reduced = !!useReducedMotion();
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  useCampaignMotion(reduced);
  useEditorialDrag();
  const openLook = (index: number) => setSelected(index);
  return <>
    <a className="skip-link" href="#manifesto">Ir para o conteúdo</a>
    <header className="site-header"><BrandLogo /><nav aria-label="Navegação principal"><a href="#inicio" data-magnetic>Início</a><a href="#loja" data-magnetic>Localização</a><a href="#looks" data-magnetic>Looks</a><a href="#catalogo" data-magnetic>Catálogo</a><a href="#clientes" data-magnetic>Clientes</a><a href="#vip" data-magnetic>Grupo VIP</a><a href="#contato" data-magnetic>Contato</a></nav><a className="header-contact" href={whatsapp} target="_blank" rel="noopener noreferrer" data-magnetic>Conversar pelo WhatsApp <ArrowUpRight size={15} /></a><button className="menu-button" aria-label="Abrir menu" onClick={() => setMenu(true)}><Menu size={23} /></button></header>
    <main>
      <section className="campaign-hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-topline"><span>MODA FEMININA MODERNA E ACESSÍVEL.</span><span>BLUMENAU / ENVIAMOS PARA TODO O BRASIL.</span></div>
        <h1 id="hero-title" className="hero-title"><span className="hero-title-first">A moda</span><span className="hero-title-last">te<br /><em>transforma.</em></span></h1>
        <div className="hero-portrait-anchor"><div className="hero-portrait" data-tilt><img src="/images/valentina-fachada.jpg" alt="Mulher em frente à Valentina Closet, com a fachada e a vitrine da loja ao fundo" fetchPriority="high" width="1280" height="960" /><span className="photo-index">VALENTINA CLOSET / BLUMENAU</span></div></div>
        <span className="hero-echo" aria-hidden="true">V</span><span className="hero-brand-stamp">VALENTINA / CLOSET</span>
        <LazySculpture reduced={reduced} />
        <div className="hero-note"><p>A qualidade que você procura,<br />que cabe no seu bolso.</p><small>Descubra uma nova forma de expressar quem você é.</small></div>
        <div className="hero-actions"><a className="hero-explore" href="#manifesto" data-magnetic><span>Conheça a Valentina Closet</span><ArrowDown size={18} /></a></div>
        <div className="hero-bottomline"><span>MODA DE VERDADE, PARA A VIDA REAL.</span><span>DESCUBRA A VALENTINA <span aria-hidden="true">↓</span></span></div>
      </section>

      <NewCollection />
      <Catalog />
      <section className="manifesto" id="manifesto" aria-labelledby="manifesto-title">
        <div className="section-kicker"><span>02 / O NOSSO JEITO DE VER A MODA</span><span>FEITO PARA SENTIR.</span></div>
        <div className="manifesto-composition"><h2 id="manifesto-title"><span className="manifesto-line"><span className="manifesto-word">NÃO É SÓ</span></span><span className="manifesto-line"><span className="manifesto-word">SOBRE ROUPA.</span></span><span className="manifesto-line manifesto-front"><span className="manifesto-word">É SOBRE</span> <em className="manifesto-word">como</em></span><span className="manifesto-line manifesto-front"><em className="manifesto-word">você se sente.</em></span></h2><figure className="manifesto-photo"><img src={looks[1].image} alt="Look da Valentina com estampa verde" loading="lazy" width="851" height="1280" /><figcaption>EXPRESSÃO, SEM PEDIR LICENÇA.</figcaption></figure></div>
        <div className="manifesto-footer"><span className="small-cross" aria-hidden="true">+</span><p>Acreditamos na moda que desperta algo.<br />No detalhe que muda o dia. Na liberdade de ser<br />muitas — e continuar sendo você.</p><a href="#looks" className="text-link" data-magnetic>Entre nessa história <ArrowUpRight size={18} /></a></div>
      </section>

      <section className="runway" id="looks" aria-label="Passarela de editoriais">
        <div className="runway-heading"><span>Cada look para cada personalidade.</span><span>Seu estilo conta uma história. Qual é a sua?</span></div>
        <div className="runway-track">{looks.map((look, i) => <article className={`look-panel look-panel-${i}`} key={look.name}>
          <span className="look-background-word" aria-hidden="true">{['PRESENÇA', 'LIBERDADE', 'TEXTURA', 'ESSÊNCIA', 'OLHAR'][i]}</span>
          <span className="look-number">0{i + 1}<small>/ 05</small></span>
          <button className="look-image-button" aria-label={`Ver editorial ${look.name}`} onClick={() => openLook(i)} data-view><img className="look-photo" src={look.image} alt={look.name} loading="lazy" width={i === 3 || i === 4 ? 1020 : 370} height={i === 3 || i === 4 ? 700 : 390} /><span className="look-open"><ArrowUpRight size={28} /></span></button>
          <div className="look-caption"><span>{look.category}</span><h2>{look.name}</h2><p>{look.line}</p><button className="text-link" onClick={() => openLook(i)} data-magnetic>Ver detalhes <ArrowUpRight size={17} /></button></div>
        </article>)}</div>
        <div className="runway-foot"><span>CINCO FORMAS DE SENTIR.</span><span className="runway-desktop-hint">CONTINUE ROLANDO <ArrowRight size={17} /></span><span className="runway-mobile-hint">DESLIZE PARA EXPLORAR <ArrowRight size={17} /></span></div>
      </section>

      <section className="art-bridge" aria-label="Escultura digital de seda"><span className="bridge-orbit" aria-hidden="true" /><LazySculpture variant="bridge" reduced={reduced} /><div className="art-bridge-copy"><span>ENTRE A FORMA E O SENTIR</span><p>Há um universo<br /><em>em cada detalhe.</em></p></div><span className="bridge-footnote">ESTUDO DE FORMA / SEDA EM MOVIMENTO</span></section>

      <section className="concepts" id="universo" aria-labelledby="concepts-title"><h2 id="concepts-title" className="sr-only">O universo Valentina em quatro conceitos</h2><div className="concepts-stage">{concepts.map((concept, i) => <article className="concept-frame" key={concept.title}><div className="concept-photo"><img src={concept.image} alt={`Editorial sobre ${concept.title.toLowerCase()}`} loading="lazy" /><span>O UNIVERSO VALENTINA / 0{i + 1}</span></div><div className="concept-copy"><span className="concept-index">0{i + 1}<small>/ 04</small></span><span className="eyebrow">O NOSSO JEITO DE SER</span><h3>{concept.title}</h3><em>{concept.subtitle}</em><p>{concept.copy}</p><div className="concept-dots" aria-hidden="true">{concepts.map((_, j) => <i key={j} className={j === i ? 'active' : ''} />)}</div></div></article>)}</div></section>

      <section className="art-gallery" aria-labelledby="gallery-title"><div className="section-kicker"><span>FRAGMENTOS DO NOSSO UNIVERSO</span><span>UM MOODBOARD VIVO.</span></div><h2 id="gallery-title">SEJA TODAS<br /><em>as suas versões.</em></h2><div className="gallery-composition">{[2, 0, 3, 1, 4].map((index, i) => <figure className={`gallery-piece gallery-piece-${i}`} key={index}><motion.button whileHover={reduced ? undefined : { scale: 1.025 }} transition={{ duration: .35 }} data-view aria-label={`Explorar ${looks[index].name}`} onClick={() => openLook(index)}><img src={looks[index].image} alt={looks[index].name} loading="lazy" /></motion.button><figcaption><span>0{i + 1}</span>{looks[index].mood}</figcaption></figure>)}<div className="gallery-annotation"><Sparkles size={35} strokeWidth={.8} /><span>O EXTRAORDINÁRIO<br />ESTÁ EM VOCÊ.</span></div></div><p className="reference-note">Looks da Valentina Closet. Consulte a disponibilidade no catálogo.</p></section>

      <div className="type-interlude" aria-hidden="true">{[0, 1].map(row => <div className={`ticker-row ticker-row-${row}`} key={row}><div className="ticker-track">{[0, 1].map(copy => <span key={copy}>VALENTINA CLOSET <i>✳︎</i> A MODA SE TRANSFORMA <i>✳︎</i> </span>)}</div></div>)}</div>
      <HumanExperience />
      <SocialProof /><VIPGroup /><SalespersonJo />
      <InstagramEditorial />
      <VisitAndDelivery />
      <section className="campaign-contact" id="contato"><div className="section-kicker"><span>O PRÓXIMO LOOK COMEÇA COM UMA CONVERSA</span><a href={instagram} target="_blank" rel="noopener noreferrer">@VALENTINACLOSETLOJA <ArrowUpRight size={15} /></a></div><p>Gostou de algum estilo ou quer conhecer as novidades?</p><h2>Vamos<br /><em>conversar?</em></h2><a className="contact-orb" href={whatsapp} target="_blank" rel="noopener noreferrer" data-magnetic><MessageCircle size={27} strokeWidth={1.3} /><span>Conversar pelo<br />WhatsApp</span></a><div className="contact-bottom"><span>MODA PARA EXPRESSAR QUEM VOCÊ É.</span><span>DE BLUMENAU PARA TODO O BRASIL.</span></div></section>
    </main>
    <footer className="store-footer"><div className="footer-brand"><BrandLogo /><p>Moda feminina moderna e acessível.</p><span>Blumenau — SC</span></div><nav aria-label="Navegação do rodapé">{[['Início', '#inicio'], ['Novidades', '#novidades'], ['Looks', '#looks'], ['Catálogo', '#catalogo'], ['Localização', '#loja'], ['Grupo VIP', '#vip'], ['Falar com a Jô', '#jo']].map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav><div className="footer-social"><a href={instagram} target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={14} /></a><a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={14} /></a><a href={store.linktree} target="_blank" rel="noopener noreferrer">linktr.ee/valentinaclosetloja <ArrowUpRight size={14} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} VALENTINA CLOSET</span><span>A MODA SE TRANSFORMA.</span><a href="#inicio" aria-label="Voltar ao início">VOLTAR AO TOPO ↑</a></div></footer>
    <a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Conversar pelo WhatsApp da Valentina Closet"><MessageCircle size={23} /><span>Vamos encontrar seu look?</span></a>
    <Cursor reduced={reduced} />
    {menu && <Dialog label="Menu" onClose={() => setMenu(false)} className="menu-dialog"><span className="eyebrow">EXPLORE O UNIVERSO</span>{[['Início', 'inicio'], ['Localização', 'loja'], ['Looks', 'looks'], ['Catálogo', 'catalogo'], ['Clientes', 'clientes'], ['Grupo VIP', 'vip'], ['Contato', 'contato']].map(([label, id], i) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}><small>0{i + 1}</small>{label}<ArrowUpRight size={23} /></a>)}</Dialog>}
    {selected !== null && <Dialog label={`Editorial ${looks[selected].name}`} onClose={() => setSelected(null)} className="editorial-dialog"><img className="dialog-photo" src={looks[selected].image} alt={looks[selected].name} /><div className="dialog-copy"><span className="eyebrow">EDITORIAL / 0{selected + 1}</span><h2>{looks[selected].name}</h2><p>{looks[selected].description}</p><span className="editorial-mood">{looks[selected].mood}</span><p className="reference-note">Fotografia fornecida pela loja. Consulte tamanhos e disponibilidade.</p><a className="text-link" href={`${whatsapp}?text=${encodeURIComponent(`Olá! Conheci o editorial “${looks[selected].name}” no portfólio da Valentina e gostaria de conversar.`)}`} target="_blank" rel="noopener noreferrer">Vamos conversar <ArrowUpRight size={18} /></a><div className="dialog-pagination"><button aria-label="Editorial anterior" onClick={() => setSelected((selected + looks.length - 1) % looks.length)}><ArrowLeft size={18} /> Anterior</button><span>0{selected + 1} / 05</span><button aria-label="Próximo editorial" onClick={() => setSelected((selected + 1) % looks.length)}>Próximo <ArrowRight size={18} /></button></div></div></Dialog>}
  </>;
}
createRoot(document.getElementById('root')!).render(<App />);
