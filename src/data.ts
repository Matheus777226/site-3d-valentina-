import joPortrait from './assets/equipe/jo.jpg';
import look1 from './assets/looks/1-Foto-1.jpg';
import look2 from './assets/looks/2-Foto-2.jpg';
import look3 from './assets/looks/3-Foto-3.jpg';
import look4 from './assets/looks/4-Foto-4.jpg';
import look5 from './assets/looks/5-Foto-5.jpg';
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
export const looks = [
  { name: 'Essência urbana', line: 'A cidade é sua.', category: 'CONJUNTO / PRESENÇA', image: look1, description: 'Conjunto em tom terroso, com blusa de um ombro só e shorts. Consulte tamanhos e disponibilidade com a equipe.', mood: 'Estrutura. Contraste. Confiança.' },
  { name: 'O movimento de ser', line: 'Deixe acontecer.', category: 'FLUIDEZ / EXPRESSÃO', image: look2, description: 'Cor que acompanha o gesto. Uma composição sobre leveza, espontaneidade e a liberdade de se transformar.', mood: 'Cor. Leveza. Movimento.' },
  { name: 'Entre texturas', line: 'Sinta cada detalhe.', category: 'TEXTURA / NATURALIDADE', image: look3, description: 'Top rosa e saia branca com trama aberta e franjas. Uma combinação de cor e textura para expressar seu estilo.', mood: 'Textura. Volume. Liberdade.' },
  { name: 'Naturalmente você', line: 'Presença sem esforço.', category: 'IDENTIDADE / DELICADEZA', image: look4, description: 'Vermelho em destaque, com recortes e silhueta curta. Consulte as opções disponíveis na loja.', mood: 'Naturalidade. Suavidade. Identidade.' },
  { name: 'O olhar Valentina', line: 'Escolhas com intenção.', category: 'CURADORIA / ENCONTROS', image: look5, description: 'Vestido preto de alças, com acabamento de efeito brilhante. Personalidade em uma peça versátil.', mood: 'Cuidado. Descoberta. Conexão.' },
];
export const concepts = [
  { title: 'Elegância', subtitle: 'Está no jeito de ser.', copy: 'Um gesto, uma textura, uma escolha. O que fica é a presença.', image: look4 },
  { title: 'Personalidade', subtitle: 'O detalhe é você.', copy: 'A moda ganha sentido quando encontra a sua própria voz.', image: look3 },
  { title: 'Atitude', subtitle: 'Ocupe seu espaço.', copy: 'Linhas que acompanham quem não precisa pedir licença para ser.', image: look1 },
  { title: 'Estilo', subtitle: 'Sempre em transformação.', copy: 'Você muda. A sua expressão também. Explore cada possibilidade.', image: look2 },
];
