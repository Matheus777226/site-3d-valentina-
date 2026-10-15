# Valentina Closet

Portfólio 3D de moda feminina, com universo interativo na abertura e editoriais navegáveis. React 19, TypeScript, Vite, Tailwind CSS 4, Three.js, React Three Fiber, Drei, GSAP/ScrollTrigger, Lenis e Framer Motion.

## Desenvolvimento

Node.js 24 e npm 11 (validados neste ambiente).

```sh
npm ci --cache /tmp/valentina-npm-cache
npm run dev
```

O servidor usa a porta 5173. Para validar produção:

```sh
npm run build
npm run preview -- --port 4173
```

Não há serviços de backend, chaves ou variáveis obrigatórias. O WhatsApp da loja é +55 47 99642-0364. Links usam `wa.me` e não enviam mensagens automaticamente.

## Experiência e desempenho

- O closet é um módulo dinâmico: Three.js/R3F/Drei são carregados de forma adiada na abertura em desktop (após 1,2 segundo); no mobile e com redução de movimento, somente após ativação explícita.
- Geometrias conceituais locais, sem downloads de modelos ou texturas. Nenhum GLB/GLTF foi fornecido; as peças não representam estoque ou caimento real.
- Mobile usa DPR máximo 1.25, sem sombras de contato, antialiasing ou rotação automática. Gestos sobre a cena preservam a rolagem da página; paletas e animações ligadas ao scroll continuam disponíveis.
- Desktop permite arrastar a cena na abertura, parallax e seção horizontal vinculada ao scroll. Mobile usa swipe nativo na seção editorial.
- A renderização 3D pausa fora da área visível. `prefers-reduced-motion` remove animações de scroll e flutuação automática.
- Fotografias locais, lazy loading abaixo da dobra, fontes locais e sem chamadas de CDN necessárias para renderizar.
- A estrutura é um portfólio de marca: quatro editoriais com detalhes, navegação entre projetos, apresentação da marca, menu mobile e contato via WhatsApp.
- 60 FPS é uma meta; ainda precisa ser medido em aparelhos físicos. O bundle 3D é separado e grande por incluir o motor; o Vite informa esse tamanho no build.

## Fotos reais das clientes

O anexo recebido descreve seis imagens, mas os arquivos não foram enviados. A seção `src/SocialProof.tsx` fica oculta até haver arquivos reais em `public/clientes/` com estes nomes:

- `IMG_4037(1).jpeg`
- `IMG_4034(1).jpeg`
- `IMG_4032.jpeg` (feedback de WhatsApp em destaque)
- `IMG_4035(1).jpeg`
- `IMG_4036(1).jpeg`
- `IMG_4031(1).jpeg`

Após adicionar, execute o build novamente. A seção usa masonry no desktop, swipe no mobile, proporção original, modal e CTA de WhatsApp. Não substitui imagens ausentes por stock e não inventa nomes ou avaliações. Publique apenas conteúdo autorizado, preservando os prints originais.

As fotografias editoriais temporárias têm origem documentada em `public/images/ATTRIBUTION.md`. Substitua pelas fotografias autorizadas da marca para a versão comercial.

## Validação realizada

Build TypeScript/Vite e smoke funcional em Chromium: cena 3D adiada em desktop, troca de paleta, quatro editoriais, navegação no modal e Escape, menu mobile, carregamento 3D manual em mobile, preservação do scroll, ausência de overflow horizontal em 390px e 320px e ausência de erros JavaScript. A validação em navegador usa renderização gráfica por software; não equivale a medir FPS em um celular real.

## Identidade visual

A referência enviada orienta a paleta: pink `#F5008B`, rosa `#F765BD`, blush `#FFECF6`, branco e ameixa `#790044` para contrastes. As cores e ajustes visuais ficam centralizados em `src/brand.css`. O símbolo vetorial de cabide foi desenhado para acompanhar a referência; não é o arquivo original do logotipo. Instagram informado na imagem: `@valentinaclosetloja`.
