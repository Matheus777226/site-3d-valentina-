import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Menu, MessageCircle, Truck } from 'lucide-react';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/dm-sans/latin-600.css';
import './brand.css';
import './style.css';
import BrandLogo from './components/BrandLogo';
import Dialog from './components/Dialog';
import { VIPGroup, SalespersonJo } from './components/Community';
import Catalog from './components/Catalog';
import SocialProof from './SocialProof';
import { NewCollection, InstagramEditorial, VisitAndDelivery } from './components/StoreSections';
import { useEditorialDrag } from './hooks/useEditorialDrag';
import { instagram, store, whatsappLink } from './data';

const navigation = [
  ['Verão', '#novidades'], ['Catálogo', '#catalogo'], ['Clientes', '#clientes'],
  ['Falar com a Jô', '#jo'], ['Grupo VIP', '#vip'], ['Instagram', '#instagram'], ['Localização', '#loja'],
];
const conversation = whatsappLink('Olá! Vim pelo site da Valentina e quero ajuda para escolher meu próximo look.');

function App() {
  const [menu, setMenu] = useState(false);
  useEditorialDrag();
  return <>
    <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
    <header className="site-header">
      <BrandLogo />
      <nav aria-label="Navegação principal">
        {navigation.filter((_, index) => [0, 1, 4, 6].includes(index)).map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </nav>
      <a className="header-contact" href={conversation} target="_blank" rel="noopener noreferrer">Vamos conversar <ArrowUpRight size={18} /></a>
      <button className="menu-button" aria-label="Abrir menu" aria-expanded={menu} onClick={() => setMenu(true)}><Menu size={24} /></button>
    </header>
    <main id="conteudo">
      <section className="conversation-hero" id="inicio" aria-labelledby="hero-title">
        <p className="section-label">MODA FEMININA · BLUMENAU, SC</p>
        <h1 id="hero-title">Seu próximo look<br />começa com <em>uma conversa.</em></h1>
        <p className="hero-description">Conte o que você procura. A gente te ajuda a escolher<br className="desktop-break" /> as peças, tirar dúvidas e encontrar o seu estilo.</p>
        <div className="hero-actions">
          <a className="button button-primary hero-primary" href={conversation} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} />Conversar no WhatsApp <ArrowUpRight size={19} /></a>
          <a className="button button-secondary" href={store.catalogUrl} target="_blank" rel="noopener noreferrer">Ver catálogo <ArrowUpRight size={19} /></a>
        </div>
        <div className="hero-service"><span>Atendimento de verdade.</span><span>Moda que cabe no seu bolso.</span><span><Truck size={16} /> Enviamos para todo o Brasil.</span></div>
      </section>
      <NewCollection />
      <Catalog />
      <SocialProof />
      <SalespersonJo />
      <VIPGroup />
      <InstagramEditorial />
      <VisitAndDelivery />
    </main>
    <footer className="store-footer">
      <div className="footer-top"><BrandLogo /><p>Seu estilo, nossa conversa.</p><a className="text-link" href={conversation} target="_blank" rel="noopener noreferrer">Falar com a Valentina <ArrowUpRight size={18} /></a></div>
      <nav aria-label="Navegação do rodapé">{navigation.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Valentina Closet · Blumenau — SC</span><a href={instagram} target="_blank" rel="noopener noreferrer">@valentinaclosetloja</a></div>
    </footer>
    <a className="desktop-contact" href={conversation} target="_blank" rel="noopener noreferrer"><MessageCircle size={21} />Fale com a gente</a>
    <div className="mobile-contact-bar"><a className="button button-primary" href={conversation} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} />Conversar no WhatsApp<ArrowUpRight size={18} /></a></div>
    {menu && <Dialog label="Menu" onClose={() => setMenu(false)} className="menu-dialog">
      <span className="section-label">VÁ DIRETO AO QUE PROCURA</span>
      <nav aria-label="Menu mobile">{navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}<ArrowUpRight size={20} /></a>)}</nav>
      <a className="button button-primary" href={conversation} target="_blank" rel="noopener noreferrer">Conversar no WhatsApp <MessageCircle size={19} /></a>
    </Dialog>}
  </>;
}
createRoot(document.getElementById('root')!).render(<App />);
