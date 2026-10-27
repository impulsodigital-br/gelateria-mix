// ÚNICA fonte de verdade de produtos, tamanhos, sabores e preços.
// Todos os valores monetários estão em CENTAVOS (inteiros) para evitar erros de ponto flutuante.
// Nenhum componente deve ter preço escrito à mão: sempre usar este arquivo + lib/pricing.ts.
export type CategoryId = "sundaes" | "milkshakes" | "casquinhas";
export interface Flavor {
  id: string;
  name: string;
  /** Adicional em centavos (ex.: sabores especiais de sundae). */
  surcharge?: number;
}
export interface Size {
  id: string;
  label: string;
  /** Preço base em centavos. */
  price: number;
}
export interface Product {
  id: string;
  category: CategoryId;
  name: string;
  description: string;
  /** "sized": preço por tamanho. "fixed": preço único. */
  kind: "sized" | "fixed";
  sizes?: Size[];
  fixedPrice?: number;
  /** Quantidade de sabores que o cliente precisa escolher. */
  flavorCount: 1 | 2;
  flavorLabel: string;
  flavors: Flavor[];
  /** Permite escolher o mesmo sabor nos dois espaços (apenas quando flavorCount = 2). */
  allowDuplicateFlavors: boolean;
  /** Texto original informado no cardápio (preservado). */
  originalNote?: string;
}
export interface Category {
  id: CategoryId;
  label: string;
  shortLabel: string;
  blurb: string;
}
// ---------------------------------------------------------------------------
// REGRAS COMERCIAIS CONFIGURÁVEIS
// ---------------------------------------------------------------------------
export const PRICING_RULES = {
  /**
   * Como cobrar o adicional dos sabores especiais de sundae (R$ 3,00) quando o
   * produto tem 2 sabores:
   *  - "once-per-item": cobra o adicional UMA vez por sundae, se houver ao menos um sabor especial.
   *  - "per-special-flavor": cobra o adicional por cada sabor especial escolhido.
   * A regra comercial não foi confirmada; o padrão evita cobrança dupla no mesmo produto.
   */
  specialSurchargeMode: "once-per-item" as "once-per-item" | "per-special-flavor",
};
const SPECIAL_SURCHARGE = 300; // R$ 3,00
// ---------------------------------------------------------------------------
// Utilitário local para gerar ids estáveis a partir dos nomes
// ---------------------------------------------------------------------------
function slug(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
function flavors(names: string[], surcharge?: number): Flavor[] {
  return names.map((name) => ({ id: slug(name), name, ...(surcharge ? { surcharge } : {}) }));
}
function sizes(prices: [number, number, number, number]): Size[] {
  const labels = [300, 400, 500, 700];
  return labels.map((ml, i) => ({ id: `${ml}ml`, label: `${ml} ml`, price: prices[i] * 100 }));
}
// ---------------------------------------------------------------------------
// CATEGORIAS
// ---------------------------------------------------------------------------
export const CATEGORIES: Category[] = [
  {
    id: "sundaes",
    label: "Sundaes",
    shortLabel: "Sundaes",
    blurb: "Tradicional ou com 2 sabores.",
  },
  {
    id: "milkshakes",
    label: "Milk-shakes",
    shortLabel: "Milk-shakes",
    blurb: "40 sabores para escolher.",
  },
  {
    id: "casquinhas",
    label: "Casquinhas, Cascões e Copinhos",
    shortLabel: "Casquinhas e cia.",
    blurb: "Sete opções, do clássico ao trufado.",
  },
];
// ---------------------------------------------------------------------------
// SABORES
// ---------------------------------------------------------------------------
export const SUNDAE_FLAVORS: Flavor[] = [
  ...flavors([
    "Baunilha ao Chocolate",
    "Cookies Branco",
    "Creme de Avelã",
    "Creme de Valsa",
    "Chocolate",
    "Ferrero Rocher",
    "Frutas Vermelhas",
    "Maracujá",
    "Morango",
    "Ninho",
    "Prestígio",
    "Rafaello",
    "Trufa",
  ]),
  ...flavors(["Nutella Original", "Ovomaltine", "Pistache"], SPECIAL_SURCHARGE),
];
export const MILKSHAKE_FLAVORS: Flavor[] = flavors([
  "Baunilha",
  "Baunilha ao Chocolate",
  "Beijinho",
  "Biscoito",
  "Bombom Trufado",
  "Brigadeiro",
  "Céu Azul",
  "Cereja",
  "Chocolate",
  "Chocolate Suíço",
  "Choconinho",
  "Chocobis",
  "Chocomenta",
  "Coco Branco",
  "Coco Queimado",
  "Creme",
  "Danoninho",
  "Ferrero Rocher",
  "Flocos",
  "Frutas Vermelhas",
  "Floresta Negra",
  "Kinder Ovo",
  "Laka Flocado",
  "Laka Trufado",
  "Leite Condensado",
  "Leite Ninho",
  "Limão",
  "Maracujá",
  "Menta",
  "Milho Verde",
  "Morango",
  "Ninho Trufado",
  "Ninho Flocado",
  "Nutella",
  "Ovomaltine",
  "Paçoquinha",
  "Sensação",
  "Sonho de Valsa",
  "Trufa",
  "Vinho",
]);
// ---------------------------------------------------------------------------
// PRODUTOS
// ---------------------------------------------------------------------------
export const PRODUCTS: Product[] = [
  // --- Sundaes ---
  {
    id: "sundae",
    category: "sundaes",
    name: "Sundae tradicional",
    description: "Sundae em quatro tamanhos, com o sabor da sua escolha.",
    kind: "sized",
    sizes: sizes([15, 17, 20, 24]),
    flavorCount: 1,
    flavorLabel: "Sabor",
    flavors: SUNDAE_FLAVORS,
    allowDuplicateFlavors: false,
  },
  {
    id: "sundae-2-sabores",
    category: "sundaes",
    name: "Sundae de 2 sabores",
    description: "Dois sabores no mesmo copo, nos mesmos quatro tamanhos.",
    kind: "sized",
    sizes: sizes([18, 20, 23, 27]),
    flavorCount: 2,
    flavorLabel: "Sabor",
    flavors: SUNDAE_FLAVORS,
    // Cardápio informa "dois sabores distintos ou iguais" — configurável.
    allowDuplicateFlavors: true,
  },
  // --- Milk-shakes ---
  {
    id: "milkshake",
    category: "milkshakes",
    name: "Milk-shake tradicional",
    description: "Milk-shake em quatro tamanhos, com 40 sabores para escolher.",
    kind: "sized",
    sizes: sizes([14, 16, 19, 22]),
    flavorCount: 1,
    flavorLabel: "Sabor",
    flavors: MILKSHAKE_FLAVORS,
    allowDuplicateFlavors: false,
  },
  {
    id: "milkshake-2-sabores",
    category: "milkshakes",
    name: "Milk-shake de 2 sabores",
    description: "Escolha exatamente dois sabores entre os 40 disponíveis.",
    kind: "sized",
    sizes: sizes([17, 19, 22, 25]),
    flavorCount: 2,
    flavorLabel: "Sabor",
    flavors: MILKSHAKE_FLAVORS,
    // "Exatamente dois sabores" — por padrão, dois sabores diferentes. Configurável.
    allowDuplicateFlavors: false,
  },
  // --- Casquinhas, Cascões e Copinhos ---
  {
    id: "casquinha",
    category: "casquinhas",
    name: "Casquinha",
    description: "Sorvete na casquinha.",
    kind: "fixed",
    fixedPrice: 600,
    flavorCount: 1,
    flavorLabel: "Sabor",
    flavors: flavors(["Chocolate", "Baunilha", "Misto"]),
    allowDuplicateFlavors: false,
    originalNote: "Chocolate, baunilha ou misto",
  },
  {
    id: "cascao",
    category: "casquinhas",
    name: "Cascão",
    description: "Sorvete no cascão.",
    kind: "fixed",
    fixedPrice: 800,
    flavorCount: 1,
    flavorLabel: "Sabor",
    flavors: flavors(["Chocolate", "Baunilha", "Misto"]),
    allowDuplicateFlavors: false,
    originalNote: "Chocolate, baunilha ou misto",
  },
  {
    id: "copinho",
    category: "casquinhas",
    name: "Copinho",
    description: "Sorvete no copinho.",
    kind: "fixed",
    fixedPrice: 1000,
    flavorCount: 1,
    flavorLabel: "Sabor",
    flavors: flavors(["Chocolate", "Baunilha", "Misto"]),
    allowDuplicateFlavors: false,
    originalNote: "Chocolate, baunilha ou misto",
  },
  {
    id: "casquinha-trufada",
    category: "casquinhas",
    name: "Casquinha Trufada",
    description: "Casquinha trufada.",
    kind: "fixed",
    fixedPrice: 1000,
    flavorCount: 1,
    flavorLabel: "Sabor",
    flavors: flavors(["Nutella", "Chocolate", "Pistache"]),
    allowDuplicateFlavors: false,
    originalNote: "Nutella, chocolate ou pistache",
  },
  {
    id: "cascao-trufado",
    category: "casquinhas",
    name: "Cascão Trufado",
    description: "Cascão trufado.",
    kind: "fixed",
    fixedPrice: 1300,
    flavorCount: 1,
    flavorLabel: "Sabor",
    flavors: flavors(["Nutella", "Chocolate", "Pistache"]),
    allowDuplicateFlavors: false,
    originalNote: "Nutella, chocolate ou pistache",
  },
  {
    id: "casquinha-de-acai",
    category: "casquinhas",
    name: "Casquinha de Açaí",
    description: "Casquinha de açaí.",
    kind: "fixed",
    fixedPrice: 1200,
    flavorCount: 1,
    flavorLabel: "Sabor",
    flavors: flavors(["Nutella", "Chocolate", "Pistache"]),
    allowDuplicateFlavors: false,
    originalNote: "Trufado Nutella, chocolate ou pistache",
  },
  {
    id: "cascao-de-acai",
    category: "casquinhas",
    name: "Cascão de Açaí",
    description: "Cascão de açaí.",
    kind: "fixed",
    fixedPrice: 1500,
    flavorCount: 1,
    flavorLabel: "Sabor",
    flavors: flavors(["Nutella", "Chocolate", "Pistache"]),
    allowDuplicateFlavors: false,
    originalNote: "Trufado Nutella, chocolate ou pistache",
  },
];
export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
export function productsByCategory(category: CategoryId): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}
/** Menor preço base do produto (usado em "a partir de"). */
export function startingPrice(product: Product): number {
  if (product.kind === "fixed") return product.fixedPrice ?? 0;
  return Math.min(...(product.sizes ?? []).map((s) => s.price));
}
