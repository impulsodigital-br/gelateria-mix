// Verificação automática do catálogo, preços e mensagem do WhatsApp.
// Rode com: npm run check
import {
  CATEGORIES,
  MILKSHAKE_FLAVORS,
  PRODUCTS,
  SUNDAE_FLAVORS,
  getProduct,
} from "../lib/catalog";
import { REVIEWS } from "../lib/reviews";
import { PRODUCT_PHOTOS, STORE_PHOTOS } from "../lib/gallery";
import { evaluateSelection, priceCart } from "../lib/pricing";
import type { CartItem } from "../lib/pricing";
import { buildOrderMessage, buildWhatsAppUrl, validateCustomer } from "../lib/whatsapp";
import { brl } from "../lib/format";
let failures = 0;
function assert(cond: boolean, msg: string) {
  if (!cond) {
    failures += 1;
    console.error(`  FALHOU: ${msg}`);
  } else {
    console.log(`  ok: ${msg}`);
  }
}
function price(productId: string, sizeId: string | undefined, flavorIds: string[]) {
  const r = evaluateSelection({ productId, sizeId, flavorIds });
  return r.ok ? r.unit : null;
}
console.log("Estrutura");
assert(CATEGORIES.length === 3, "3 categorias");
assert(PRODUCTS.length === 11, "11 produtos (4 sundae/milk-shake + 7 casquinhas e cia.)");
assert(MILKSHAKE_FLAVORS.length === 40, "40 sabores de milk-shake");
assert(SUNDAE_FLAVORS.length === 16, "16 sabores de sundae (13 + 3 especiais)");
assert(
  SUNDAE_FLAVORS.filter((f) => f.surcharge === 300).length === 3,
  "3 sabores especiais com R$ 3,00",
);
assert(
  PRODUCTS.filter((p) => p.category === "casquinhas").length === 7,
  "7 opções de casquinha/cascão/copinho",
);
assert(
  PRODUCT_PHOTOS.length === 4 && STORE_PHOTOS.length === 2,
  "galeria: 4 produtos + 2 estabelecimento",
);
assert(REVIEWS.length === 3, "3 espaços de avaliação");
assert(new Set(PRODUCTS.map((p) => p.id)).size === PRODUCTS.length, "ids de produto únicos");
console.log("Preços por tamanho");
const table: Record<string, number[]> = {
  sundae: [1500, 1700, 2000, 2400],
  "sundae-2-sabores": [1800, 2000, 2300, 2700],
  milkshake: [1400, 1600, 1900, 2200],
  "milkshake-2-sabores": [1700, 1900, 2200, 2500],
};
for (const [id, expected] of Object.entries(table)) {
  const p = getProduct(id)!;
  const got = p.sizes!.map((s) => s.price);
  assert(
    JSON.stringify(got) === JSON.stringify(expected),
    `${p.name}: ${got.map(brl).join(" / ")}`,
  );
}
const fixed: Record<string, number> = {
  casquinha: 600,
  cascao: 800,
  copinho: 1000,
  "casquinha-trufada": 1000,
  "cascao-trufado": 1300,
  "casquinha-de-acai": 1200,
  "cascao-de-acai": 1500,
};
for (const [id, expected] of Object.entries(fixed)) {
  const p = getProduct(id)!;
  assert(p.fixedPrice === expected, `${p.name}: ${brl(p.fixedPrice!)}`);
}
console.log("Regras de cálculo");
assert(price("sundae", "400ml", ["chocolate"]) === 1700, "Sundae 400 ml Chocolate = R$ 17,00");
assert(
  price("sundae", "400ml", ["ovomaltine"]) === 2000,
  "Sundae 400 ml Ovomaltine = R$ 20,00 (17 + 3)",
);
assert(
  price("sundae-2-sabores", "400ml", ["chocolate", "morango"]) === 2000,
  "Sundae 2 sabores 400 ml = R$ 20,00",
);
assert(
  price("sundae-2-sabores", "400ml", ["chocolate", "pistache"]) === 2300,
  "Com 1 especial = 20 + 3",
);
assert(
  price("sundae-2-sabores", "400ml", ["nutella-original", "pistache"]) === 2300,
  "2 especiais: adicional cobrado uma vez por item (regra padrão)",
);
assert(
  price("sundae-2-sabores", "400ml", ["chocolate", "chocolate"]) === 2000,
  "Sundae permite 2 sabores iguais",
);
assert(
  price("milkshake-2-sabores", "300ml", ["chocolate", "chocolate"]) === null,
  "Milk-shake 2 sabores exige sabores diferentes",
);
assert(
  price("milkshake", "500ml", ["ovomaltine"]) === 1900,
  "Milk-shake 500 ml Ovomaltine = R$ 19,00 (sem adicional)",
);
assert(price("milkshake", undefined, ["ovomaltine"]) === null, "Sem tamanho é inválido");
assert(price("milkshake", "500ml", []) === null, "Sem sabor é inválido");
assert(price("cascao-de-acai", undefined, ["nutella"]) === 1500, "Cascão de Açaí = R$ 15,00");
console.log("Carrinho e mensagem do WhatsApp");
const items: CartItem[] = [
  {
    key: "a",
    productId: "sundae-2-sabores",
    sizeId: "400ml",
    flavorIds: ["chocolate", "morango"],
    quantity: 2,
  },
  { key: "b", productId: "milkshake", sizeId: "500ml", flavorIds: ["ovomaltine"], quantity: 1 },
];
const cart = priceCart(items);
assert(cart.total === 5900, `Total = ${brl(cart.total)} (esperado R$ 59,00)`);
assert(cart.count === 3, "3 unidades no carrinho");
const message = buildOrderMessage(cart.lines, cart.total, {
  name: "Maria",
  mode: "entrega",
  address: "Rua das Flores, 100, Centro",
  payment: "Pix",
  notes: "",
});
console.log("\n" + message + "\n");
assert(message.includes("1. Sundae de 2 sabores"), "mensagem lista o sundae de 2 sabores");
assert(message.includes("Sabores: Chocolate e Morango"), "mensagem lista os dois sabores");
assert(
  message.includes("Subtotal: ") && message.includes("Total dos produtos:"),
  "mensagem traz subtotal e total",
);
assert(!message.includes("Observações"), "observações vazias não aparecem");
const url = buildWhatsAppUrl(message);
assert(url.startsWith("https://wa.me/5537998341183?text="), "URL usa o número oficial");
assert(
  decodeURIComponent(url.split("?text=")[1]) === message,
  "mensagem codificada com encodeURIComponent",
);
assert(
  Object.keys(validateCustomer({ name: "", mode: "retirada", address: "", payment: "", notes: "" }))
    .length === 1,
  "nome é obrigatório",
);
assert(
  "address" in
    validateCustomer({ name: "Ana", mode: "entrega", address: "", payment: "", notes: "" }),
  "endereço é obrigatório na entrega",
);
if (failures > 0) {
  console.error(`\n${failures} verificação(ões) falharam.`);
  process.exit(1);
}
console.log("\nTodas as verificações passaram.");
