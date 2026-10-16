import { ArrowUpRight } from 'lucide-react';
import { store } from '../data';

export default function Catalog() {
  return <section className="catalog-section" id="catalogo" aria-labelledby="catalog-title">
    <div className="catalog-art" aria-hidden="true"><span className="catalog-orbit" /><div className="catalog-cover"><span>VALENTINA<br />CLOSET</span><em>Seu próximo<br />look.</em><span>CATÁLOGO DA LOJA <ArrowUpRight size={26} /></span></div><span className="catalog-art-note">MODA PARA EXPRESSAR QUEM VOCÊ É.</span></div>
    <div className="catalog-copy"><span className="eyebrow">EXPLORE AS ESCOLHAS DA VALENTINA</span><h2 id="catalog-title">Seu estilo.<br /><em>Novas possibilidades.</em></h2><p>Conheça o catálogo da loja, encontre suas peças favoritas e descubra o que combina com você.</p><a className="pill-button" href={store.catalogUrl} target="_blank" rel="noopener noreferrer" data-magnetic>Ver catálogo no WhatsApp <ArrowUpRight size={21} /></a><small>O catálogo abre no WhatsApp em uma nova aba.</small></div>
  </section>;
}
