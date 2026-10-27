import { PRICING_RULES, getProduct } from "./catalog";
import type { Flavor, Product, Size } from "./catalog";
/** Item guardado no carrinho: apenas ids e quantidade. O preço nunca é guardado. */
export interface CartItem {
  /** Chave da linha (produto + tamanho + sabores). */
  key: string;
  productId: string;
  sizeId?: string;
  flavorIds: string[];
  quantity: number;
}
export interface PricedLine {
  item: CartItem;
  product: Product;
  size?: Size;
  flavors: Flavor[];
  base: number;
  surcharge: number;
  unit: number;
  subtotal: number;
}
export interface Selection {
  productId: string;
  sizeId?: string;
  flavorIds: string[];
}
export type SelectionStatus =
  | {
      ok: true;
      product: Product;
      size?: Size;
      flavors: Flavor[];
      base: number;
      surcharge: number;
      unit: number;
    }
  | { ok: false; reason: string };
/** Valida uma seleção e calcula o preço unitário a partir do catálogo. */
export function evaluateSelection(sel: Selection): SelectionStatus {
  const product = getProduct(sel.productId);
  if (!product) return { ok: false, reason: "Produto não encontrado." };
  let size: Size | undefined;
  let base: number;
  if (product.kind === "sized") {
    size = product.sizes?.find((s) => s.id === sel.sizeId);
    if (!size) return { ok: false, reason: "Escolha o tamanho." };
    base = size.price;
  } else {
    base = product.fixedPrice ?? 0;
  }
  if (sel.flavorIds.length !== product.flavorCount) {
    return {
      ok: false,
      reason: product.flavorCount === 1 ? "Escolha o sabor." : "Escolha os dois sabores.",
    };
  }
  const flavors: Flavor[] = [];
  for (const id of sel.flavorIds) {
    const f = product.flavors.find((x) => x.id === id);
    if (!f) return { ok: false, reason: "Sabor inválido." };
    flavors.push(f);
  }
  if (
    product.flavorCount === 2 &&
    !product.allowDuplicateFlavors &&
    sel.flavorIds[0] === sel.flavorIds[1]
  ) {
    return { ok: false, reason: "Escolha dois sabores diferentes." };
  }
  const specials = flavors.filter((f) => (f.surcharge ?? 0) > 0);
  let surcharge = 0;
  if (specials.length > 0) {
    surcharge =
      PRICING_RULES.specialSurchargeMode === "per-special-flavor"
        ? specials.reduce((sum, f) => sum + (f.surcharge ?? 0), 0)
        : Math.max(...specials.map((f) => f.surcharge ?? 0));
  }
  return { ok: true, product, size, flavors, base, surcharge, unit: base + surcharge };
}
export function makeKey(sel: Selection): string {
  const product = getProduct(sel.productId);
  const flavorPart =
    product && product.flavorCount === 2
      ? [...sel.flavorIds].sort().join("+")
      : sel.flavorIds.join("+");
  return [sel.productId, sel.sizeId ?? "-", flavorPart].join("|");
}
/** Converte um item do carrinho em linha com preços. Retorna null se o item for inválido. */
export function priceItem(item: CartItem): PricedLine | null {
  const res = evaluateSelection(item);
  if (!res.ok) return null;
  const quantity = Math.max(1, Math.floor(item.quantity));
  return {
    item: { ...item, quantity },
    product: res.product,
    size: res.size,
    flavors: res.flavors,
    base: res.base,
    surcharge: res.surcharge,
    unit: res.unit,
    subtotal: res.unit * quantity,
  };
}
export function priceCart(items: CartItem[]): {
  lines: PricedLine[];
  total: number;
  count: number;
} {
  const lines = items.map(priceItem).filter((l): l is PricedLine => l !== null);
  return {
    lines,
    total: lines.reduce((sum, l) => sum + l.subtotal, 0),
    count: lines.reduce((sum, l) => sum + l.item.quantity, 0),
  };
}
