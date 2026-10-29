import joPortrait from './assets/equipe/jo.jpg';
// Store contact is configured here; number supplied by the owner in this conversation.
export const store = {
  name: 'Valentina Closet | Moda Feminina',
  whatsappNumber: '5547996420364',
  instagram: 'https://www.instagram.com/valentinaclosetloja/',
  linktree: 'https://linktr.ee/valentinaclosetloja',
  catalogUrl: 'https://wa.me/c/554732226894',
  vipGroupUrl: '', // Add the verified WhatsApp group invitation here.
  joWhatsappUrl: '', // Add Jô’s verified direct contact here.
  joPhoto: joPortrait,
  street: 'Rua Júlio Michel, 262',
  cityStateCountry: 'Blumenau, Santa Catarina, Brasil',
  maps: 'https://www.google.com/maps/search/?api=1&query=Rua%20J%C3%BAlio%20Michel%2C%20262%2C%20Blumenau%2C%20Santa%20Catarina%2C%20Brasil',
};
export const whatsapp = `https://wa.me/${store.whatsappNumber}`;
export const instagram = store.instagram;

// A context-specific draft opens in WhatsApp; nothing is sent automatically.
export function whatsappLink(message: string) {
  return `${whatsapp}?text=${encodeURIComponent(message)}`;
}
