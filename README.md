# Valentina Closet

Site de moda feminina em português, focado em levar a cliente ao atendimento pelo WhatsApp. React 19, TypeScript, Vite e Tailwind CSS. Não possui carrinho, checkout ou preços.

## Desenvolvimento

Node 24 e npm 11 validados neste ambiente.

```sh
npm ci --cache /tmp/valentina-npm-cache
npm run dev
npm run build
npm run test:e2e
```

Vite serve desenvolvimento na porta 5173. `npm run preview -- --port 4173` serve o build. Endereços locais servem à validação interna, não são links públicos. Os testes usam Chromium do sistema quando disponível; em outro ambiente, execute `npx playwright install chromium`.

## Jornada e chamadas para contato

A abertura apresenta acesso direto ao WhatsApp e ao catálogo. O restante da página mantém somente coleção de verão, catálogo, fotos de clientes, atendimento com a Jô, Grupo VIP, Instagram e localização. O celular tem um botão persistente de contato, além das chamadas em cada seção. As mensagens vêm preenchidas conforme o assunto; abrir um link não envia a mensagem automaticamente.

A navegação usa rolagem normal, sem cenas 3D, seções presas ao scroll ou galerias editoriais repetidas. As fotos de clientes mantêm swipe e ampliação. O menu e a ampliação de imagens têm controle de foco e fechamento por Escape. Fontes e imagens são locais, com carregamento adiado abaixo da dobra. A página respeita a preferência de redução de movimento.

## Dados e imagens

`src/data.ts` centraliza os dados da loja e os links. O catálogo e o atendimento têm destinos diferentes, fornecidos pela proprietária:

- Atendimento: `https://wa.me/5547996420364`.
- Catálogo: `https://wa.me/c/554732226894`.
- Instagram: `https://www.instagram.com/valentinaclosetloja/`.
- Endereço: Rua Júlio Michel, 262, Blumenau, Santa Catarina, Brasil.

`vipGroupUrl` continua vazio até receber um convite verificado; o botão pede o convite pelo WhatsApp da loja. `joWhatsappUrl` continua vazio até receber um contato direto verificado; o botão solicita atendimento da Jô no WhatsApp da loja. Não há links fictícios para grupo ou número não confirmado.

A arte de verão está em `src/assets/looks/colecao-verao.png`, o retrato da Jô em `src/assets/equipe/jo.jpg`, a fachada em `public/images/valentina-fachada.jpg` e os quatro prints originais em `src/assets/clientes/`. Todos foram fornecidos pela proprietária. Os registros do carrossel ficam em `src/SocialProof.tsx`. Não há avaliações inventadas. A origem dos arquivos está documentada em `public/images/ATTRIBUTION.md`.

A identidade visual usa rosa, rosa claro, branco e grafite. Tokens em `src/brand.css`.

## Validação e publicação

A suíte Playwright verifica chamadas para WhatsApp com mensagens apropriadas, destino do catálogo, links internos, navegação mobile, menu por teclado, carrossel de clientes, imagens completas, ausência de overflow horizontal e redução de movimento.

Na Vercel, use o preset **Vite**, instalação `npm ci`, build `npm run build` e diretório de saída `dist`. Não há backend, segredo ou variável obrigatória. Um push no GitHub só publica o site automaticamente se o repositório já estiver conectado a um projeto de hospedagem com essa configuração.
