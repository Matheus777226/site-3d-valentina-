import { ArrowUpRight } from 'lucide-react';
import { store, whatsappLink } from '../data';

export default function Catalog() {
  return (
    <section className="catalog-section" id="catalogo" aria-labelledby="catalog-title">
      <div className="catalog-copy">
        <span className="section-label">VÁ DIRETO AO QUE VOCÊ PROCURA</span>
        <h2 id="catalog-title">Abra o catálogo.<br /><em>Escolha o seu próximo look.</em></h2>
        <p>Veja as peças e mande suas favoritas para a nossa equipe. A gente te ajuda com tamanhos e disponibilidade.</p>
      </div>
      <div className="catalog-actions">
        <a className="button button-primary" href={store.catalogUrl} target="_blank" rel="noopener noreferrer">
          Ver catálogo no WhatsApp <ArrowUpRight size={20} aria-hidden="true" />
        </a>
        <a className="text-link" href={whatsappLink('Olá! Quero ajuda para escolher um look do catálogo da Valentina Closet.')} target="_blank" rel="noopener noreferrer">
          Prefiro ajuda para escolher <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
