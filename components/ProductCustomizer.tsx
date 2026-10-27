"use client";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/catalog";
import { PRICING_RULES } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { brl, joinNames } from "@/lib/format";
import { evaluateSelection } from "@/lib/pricing";
import { FlavorSelector } from "./FlavorSelector";
import { Sheet } from "./Sheet";
interface ProductCustomizerProps {
  product: Product | null;
  onClose: () => void;
}
export function ProductCustomizer({ product, onClose }: ProductCustomizerProps) {
  return (
    <Sheet
      open={product !== null}
      onClose={onClose}
      title={product ? `Personalizar ${product.name}` : "Personalizar"}
      side="bottom"
    >
      {product && <CustomizerBody key={product.id} product={product} onClose={onClose} />}
    </Sheet>
  );
}
function CustomizerBody({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addItem } = useCart();
  const [sizeId, setSizeId] = useState<string | undefined>(product.sizes?.[0]?.id);
  const [slots, setSlots] = useState<string[]>(() =>
    Array.from({ length: product.flavorCount }, () => ""),
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const chosenFlavorIds = slots.filter(Boolean);
  const status = useMemo(
    () => evaluateSelection({ productId: product.id, sizeId, flavorIds: chosenFlavorIds }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product.id, sizeId, slots],
  );
  useEffect(() => {
    if (!justAdded) return;
    const t = window.setTimeout(onClose, 450);
    return () => window.clearTimeout(t);
  }, [justAdded, onClose]);
  const unit = status.ok ? status.unit : null;
  const total = unit !== null ? unit * quantity : null;
  const flavorsComplete = chosenFlavorIds.length === product.flavorCount;
  function handleAdd() {
    if (!status.ok) return;
    addItem(
      { productId: product.id, sizeId, flavorIds: chosenFlavorIds },
      quantity,
      `${product.name}${status.size ? ` ${status.size.label}` : ""} · ${joinNames(status.flavors.map((f) => f.name))}`,
    );
    setJustAdded(true);
  }
  const surchargeHint =
    product.flavors.some((f) => f.surcharge) &&
    PRICING_RULES.specialSurchargeMode === "once-per-item" &&
    product.flavorCount === 2
      ? "O adicional de sabor especial é cobrado uma vez por sundae."
      : null;
  return (
    <>
      <div className="border-b border-line px-5 pb-4 pt-5 pr-16">
        <p className="eyebrow">Personalizar</p>
        <h3 className="mt-1 font-display text-2xl font-semibold">{product.name}</h3>
        {product.originalNote && (
          <p className="mt-1 text-sm text-cream-dim">{product.originalNote}</p>
        )}
      </div>
      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
        {product.kind === "sized" && product.sizes && (
          <fieldset>
            <legend className="mb-2 text-sm font-bold text-white">1. Tamanho</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {product.sizes.map((s) => {
                const active = s.id === sizeId;
                return (
                  <motion.button
                    key={s.id}
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSizeId(s.id)}
                    aria-pressed={active}
                    className={`min-h-16 rounded-xl border px-3 py-2 text-left transition-colors ${
                      active
                        ? "border-neon bg-magenta/20"
                        : "border-line bg-ink hover:border-white/40"
                    }`}
                  >
                    <span className="block text-sm font-bold">{s.label}</span>
                    <span className="block text-sm text-cream-dim">{brl(s.price)}</span>
                  </motion.button>
                );
              })}
            </div>
          </fieldset>
        )}
        <div>
          <p className="mb-2 text-sm font-bold text-white">
            {product.kind === "sized" ? "2. " : "1. "}
            {product.flavorCount === 1 ? "Sabor" : "Escolha os dois sabores"}
          </p>
          <FlavorSelector
            flavors={product.flavors}
            count={product.flavorCount}
            allowDuplicates={product.allowDuplicateFlavors}
            slots={slots}
            onChange={setSlots}
          />
          {product.flavorCount === 2 && (
            <p className="mt-3 text-xs text-white/60">
              {product.allowDuplicateFlavors
                ? "Você pode repetir o mesmo sabor nos dois espaços."
                : "Os dois sabores precisam ser diferentes."}{" "}
              {surchargeHint}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">{product.kind === "sized" ? "3. " : "2. "}Quantidade</p>
          <div className="flex items-center gap-1 rounded-full border border-line bg-ink p-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Diminuir quantidade"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/10 disabled:opacity-40"
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>
            <motion.span
              key={quantity}
              initial={{ scale: 1.25, opacity: 0.4 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-9 text-center text-lg font-bold tabular-nums"
              aria-live="polite"
            >
              {quantity}
            </motion.span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(99, q + 1))}
              aria-label="Aumentar quantidade"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/10"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-line bg-ink-3 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
        <div className="mb-3 flex items-end justify-between gap-3" aria-live="polite">
          <div className="min-w-0 text-sm">
            {status.ok ? (
              <>
                <p className="text-cream-dim">
                  {brl(status.base)}
                  {status.surcharge > 0 && (
                    <span className="font-semibold text-neon">
                      {" "}
                      + {brl(status.surcharge)} sabor especial
                    </span>
                  )}
                  {quantity > 1 && <span> · {quantity} un.</span>}
                </p>
              </>
            ) : (
              <p className="text-white/70">
                {flavorsComplete
                  ? status.reason
                  : product.flavorCount === 1
                    ? "Escolha o sabor para continuar."
                    : "Escolha os dois sabores para continuar."}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-white/60">Total</p>
            <motion.p
              key={total ?? "none"}
              initial={{ y: -6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-display text-2xl font-semibold"
            >
              {total !== null ? brl(total) : "—"}
            </motion.p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!status.ok || justAdded}
          className="btn btn-primary w-full"
        >
          <ShoppingBag className="h-5 w-5" aria-hidden="true" />
          {justAdded ? "Adicionado!" : "Adicionar ao pedido"}
        </button>
      </div>
    </>
  );
}
