# Gelateria Mix — Site oficial (Arcos, MG)
Site com catálogo, carrinho e pedido pelo WhatsApp. Next.js + React + TypeScript + Tailwind CSS + Framer Motion + Lucide.
## Como rodar
    npm install
    npm run dev        # http://localhost:3000
    npm run check      # confere catálogo, preços e mensagem do WhatsApp
    npm run build && npm start
## Onde editar
- Produtos, sabores, tamanhos e preços (em centavos): `lib/catalog.ts`
- Regra do adicional de R$ 3,00 em sundae de 2 sabores: `PRICING_RULES` em `lib/catalog.ts`
- Dados da loja, horários, links e logotipo: `lib/config.ts`
- Fotos da galeria (4 produtos + 2 estabelecimento): `lib/gallery.ts` e `public/images/`
- Avaliações (exatamente 3): `lib/reviews.ts`
- Cálculo de preços: `lib/pricing.ts` | Mensagem do WhatsApp: `lib/whatsapp.ts` | Carrinho: `lib/cart.tsx`
## Publicar na Vercel
1. Suba a pasta para um repositório no GitHub.
2. Na Vercel, importe o repositório (Framework: Next.js, sem configuração extra).
3. Opcional: defina `NEXT_PUBLIC_SITE_URL` com o domínio definitivo para ativar a URL canônica.
## Pendências para a loja
- Enviar o arquivo do logotipo e informar em `BUSINESS.logoSrc` (`lib/config.ts`).
- Enviar 2 fotos do estabelecimento (`lib/gallery.ts`, `STORE_PHOTOS`).
- Preencher nome/data/link das 3 avaliações (`lib/reviews.ts`).
- Confirmar a regra do adicional dos sabores especiais quando o sundae tem 2 sabores especiais.
