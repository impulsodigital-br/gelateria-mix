// Exatamente 3 espaços de avaliação. Os textos abaixo foram transcritos dos prints
// de avaliações reais enviados pela loja. Não há nome do avaliador nos prints, então
// nenhum nome é exibido. Para completar, preencha `author`, `date` e `sourceUrl`.
//
// Para um espaço ainda vazio, deixe `text: null` — o site exibirá "Avaliação a adicionar".
export interface Review {
  id: string;
  author: string | null;
  /** 1 a 5. Use null quando a nota não for conhecida (nenhuma estrela será exibida). */
  rating: number | null;
  text: string | null;
  date: string | null;
  sourceUrl: string | null;
}
export const REVIEWS: [Review, Review, Review] = [
  {
    id: "avaliacao-1",
    author: null,
    rating: 5,
    text: "Opções variadas de sorvetes, sundae e Milk Shake, todos deliciosos.",
    date: null,
    sourceUrl: null,
  },
  {
    id: "avaliacao-2",
    author: null,
    rating: 5,
    text: "O melhor da cidade, não troco de jeito nenhum \u{1F60D}\u{1F497}",
    date: null,
    sourceUrl: null,
  },
  {
    id: "avaliacao-3",
    author: null,
    rating: 5,
    text: "Ambiente agradável, entrega rápida e preço justo!",
    date: null,
    sourceUrl: null,
  },
];
