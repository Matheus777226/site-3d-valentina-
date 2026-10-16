# Valentina Closet

Site institucional editorial em português: React 19, TypeScript, Vite, Tailwind CSS 4, Three.js/R3F/Drei, GSAP/ScrollTrigger, Lenis e Framer Motion. Não possui carrinho, checkout ou preços.

## Desenvolvimento e validação

Node 24 e npm 11 validados neste ambiente.

```sh
npm ci --cache /tmp/valentina-npm-cache
npm run dev
npm run build
npm run test:e2e
```

Vite serve desenvolvimento na porta 5173; `npm run preview -- --port 4173` serve o build. Endereços locais servem à validação interna, não são links públicos. Os testes usam Chromium do sistema quando disponível; em outro ambiente, execute `npx playwright install chromium`.

## Publicação na Vercel

Importe o repositório com preset **Vite**, instalação `npm ci`, build `npm run build` e diretório de saída `dist`. Não há backend, segredo ou variável obrigatória. Publicação não é feita automaticamente por este projeto.

## Conteúdo configurável

`src/data.ts` centraliza WhatsApp da loja, Instagram, localização, links e fotos dos editoriais. O número +55 47 99642-0364 foi fornecido pela proprietária.

- `vipGroupUrl`: convite verificado do grupo. Enquanto vazio, oferece pedir convite pelo WhatsApp da loja, com aviso explícito.
- `joWhatsappUrl`: contato direto verificado da Jô. Enquanto vazio, oferece pedir atendimento dela pelo WhatsApp da loja.
- `joPhoto`: fotografia autorizada. Enquanto vazio, aparece um placeholder identificado.
- O hero usa a fotografia real da fachada enviada pela proprietária, em `public/images/valentina-fachada.jpg`.
- A seção de prova social usa os quatro prints enviados pela proprietária: `cliente-palco.jpg`, `cliente-poa.jpg`, `cliente-azul.jpg` e `cliente-rosa.jpg`, em `public/clientes/`. Os arquivos são preservados completos, com swipe, arraste, setas e ampliação em modal. Não há avaliações inventadas.
- Para trocar ou adicionar histórias, atualize `entries` em `src/SocialProof.tsx` e recompile. Fotos reais de bastidores e retrato individual da Jô continuam pendentes. As demais fotografias editoriais de referência têm origem em `public/images/ATTRIBUTION.md`.

## Design e desempenho

A paleta atual segue o briefing institucional: rosa #DF2A93, rosa secundário #E96DB7, suave #F8D8EA, branco, grafite #17191D e cinza #8B8B8B. Textos pequenos usam grafite para legibilidade. Tokens em `src/brand.css`.

A escultura de seda é geometria procedural real, renderizada em WebGL. Não representa produto ou estoque. Nenhum modelo GLB foi fornecido. O módulo 3D é separado e carregado ao se aproximar da área visível; mobile usa geometrias reduzidas, DPR 1 e iluminação simplificada. Renderização pausa fora da tela e em abas ocultas. Há fallback para indisponibilidade de WebGL.

Desktop tem passarela fixada durante rolagem vertical, parallax, conceitos sequenciais e cursor contextual. Mobile usa galerias com swipe e fluxo normal. O mouse permite arrastar as galerias. Redução de movimento remove animações e pinning, preservando todo o conteúdo. Diálogos têm contenção e restauração de foco e fechamento por Escape.

Imagens abaixo da dobra e mapa usam lazy loading. Fontes e fotos são locais. O motor 3D ainda gera aviso de chunk grande no Vite; atingir 60 FPS exige medição em aparelhos físicos. Testes Chromium por software não equivalem a medir desempenho real em celular.
