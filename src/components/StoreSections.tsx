import { ArrowUpRight, Instagram, MapPin, MessageCircle } from 'lucide-react';
import summerCollection from '../assets/looks/colecao-verao.png';
import { store, instagram, whatsappLink } from '../data';

export function NewCollection() {
  return <section className="new-collection" id="novidades" aria-labelledby="collection-title">
    <div className="collection-photo"><img src={summerCollection} alt="Campanha Coleção Verão da Valentina Closet: top rosa e saia branca de franjas" loading="lazy" decoding="async" width="633" height="934" /></div>
    <div className="collection-copy">
      <span className="section-label">O PRÓXIMO LOOK TEM CLIMA DE VERÃO</span>
      <h2 id="collection-title">Nova coleção<br /><em>de verão</em><br />chegando!</h2>
      <p>Gostou da coleção? Fale com a gente para saber das novidades, tamanhos e disponibilidade.</p>
      <a className="button button-primary" href={whatsappLink('Olá! Quero saber mais sobre a nova coleção de verão da Valentina Closet.')} target="_blank" rel="noopener noreferrer">Quero saber da coleção <ArrowUpRight size={20} /></a>
      <span className="cta-note">Tire suas dúvidas direto com a nossa equipe.</span>
    </div>
  </section>;
}

export function InstagramEditorial() {
  return <section className="instagram-section" id="instagram" aria-labelledby="instagram-title">
    <div className="instagram-heading"><Instagram size={30} strokeWidth={1.5} /><div><span className="section-label">MAIS DE 7 MIL PESSOAS COM A GENTE</span><h2 id="instagram-title">Seu próximo look<br /><em>pode estar nos stories.</em></h2></div></div>
    <div className="instagram-actions"><p>Acompanhe as novidades da loja.<br /><strong>@valentinaclosetloja</strong></p><a className="button button-secondary" href={instagram} target="_blank" rel="noopener noreferrer">Seguir no Instagram <ArrowUpRight size={20} /></a></div>
  </section>;
}

export function VisitAndDelivery() {
  return <section className="visit-store" id="loja" aria-labelledby="visit-title">
    <figure className="store-photo"><img src="/images/valentina-fachada.jpg" alt="Fachada e vitrine da Valentina Closet em Blumenau" loading="lazy" width="1280" height="960" /></figure>
    <div className="visit-copy"><span className="section-label"><MapPin size={16} /> VENHA CONHECER A LOJA</span><h2 id="visit-title">A Valentina<br /><em>está perto de você.</em></h2><address>{store.street}<br />{store.cityStateCountry}</address><div className="visit-actions"><a className="button button-primary" href={store.maps} target="_blank" rel="noopener noreferrer">Como chegar <ArrowUpRight size={20} /></a><a className="text-link" href={whatsappLink('Olá! Gostaria de confirmar o horário de atendimento da Valentina para visitar a loja.')} target="_blank" rel="noopener noreferrer">Confirmar horário <MessageCircle size={18} /></a></div><p className="cta-note">Está longe? Enviamos para todo o Brasil. <a href={whatsappLink('Olá! Gostaria de consultar a entrega da Valentina para o meu CEP.')} target="_blank" rel="noopener noreferrer">Consulte a entrega.</a></p></div>
  </section>;
}
