import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { store, whatsappLink } from '../data';

export function VIPGroup() {
  const inviteLink = store.vipGroupUrl || whatsappLink(
    'Olá! Quero entrar no Grupo VIP da Valentina Closet. Pode me enviar o convite?',
  );

  return (
    <section className="vip-section" id="vip" aria-labelledby="vip-title">
      <div className="vip-copy">
        <span className="section-label">NOVIDADES EM PRIMEIRA MÃO</span>
        <h2 id="vip-title">Entre para o <em>Grupo VIP.</em></h2>
        <p>Receba os lançamentos, novidades e promoções da Valentina pelo WhatsApp.</p>
      </div>
      <div className="vip-actions">
        <a className="button button-primary" href={inviteLink} target="_blank" rel="noopener noreferrer">
          Quero entrar no Grupo VIP <ArrowUpRight size={20} aria-hidden="true" />
        </a>
        <p className="cta-note">
          {store.vipGroupUrl ? 'Abra o convite e participe do grupo.' : 'Peça o convite pelo WhatsApp da loja.'}
        </p>
      </div>
    </section>
  );
}

export function SalespersonJo() {
  const message = 'Oi, Jô! Vim pelo site da Valentina Closet. Quero ajuda para escolher um look e saber os tamanhos disponíveis.';
  const contact = new URL(store.joWhatsappUrl || whatsappLink(message));
  contact.searchParams.set('text', message);

  return (
    <section className="jo-section" id="jo" aria-labelledby="jo-title">
      {store.joPhoto && (
        <figure className="jo-portrait">
          <img src={store.joPhoto} alt="Jô, atendente da Valentina Closet" loading="lazy" decoding="async" width="1190" height="726" />
          <figcaption>Jô · Atendimento Valentina Closet</figcaption>
        </figure>
      )}
      <div className="jo-copy">
        <span className="section-label">UMA PESSOA DE VERDADE PARA TE AJUDAR</span>
        <h2 id="jo-title">Conte seu estilo.<br /><em>A Jô te ajuda a escolher.</em></h2>
        <p>Mande a foto do look que gostou ou conte o que procura. Tire suas dúvidas sobre peças, tamanhos e combinações.</p>
        <a className="button button-primary" href={contact.toString()} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={20} aria-hidden="true" /> Falar com a Jô <ArrowUpRight size={20} aria-hidden="true" />
        </a>
        <p className="cta-note">
          {store.joWhatsappUrl ? 'Converse diretamente com a Jô pelo WhatsApp.' : 'Atendimento pelo WhatsApp da loja.'}
        </p>
      </div>
    </section>
  );
}
