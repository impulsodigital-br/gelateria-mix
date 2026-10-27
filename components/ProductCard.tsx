"use client";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { startingPrice } from "@/lib/catalog";
import { brl } from "@/lib/format";
interface ProductCardProps {
  product: Product;
  index: number;
  onCustomize: (product: Product) => void;
}
export function ProductCard({ product, index, onCustomize }: ProductCardProps) {
  const specialCount = product.flavors.filter((f) => (f.surcharge ?? 0) > 0).length;
  const regularCount = product.flavors.length - specialCount;
  const specialSurcharge = product.flavors.find((f) => (f.surcharge ?? 0) > 0)?.surcharge ?? 0;
  const flavorInfo =
    product.kind === "fixed"
      ? null
      : specialCount > 0
        ? `${regularCount} sabores tradicionais e ${specialCount} especiais (+ ${brl(specialSurcharge)})`
        : `${product.flavors.length} sabores`;
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group flex flex-col rounded-3xl border border-line bg-ink-2 p-5 transition-colors hover:border-neon/50 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-semibold leading-tight">{product.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-cream-dim">{product.description}</p>
        </div>
        {product.kind === "fixed" && (
          <p className="shrink-0 font-display text-2xl font-semibold text-neon">
            {brl(product.fixedPrice ?? 0)}
          </p>
        )}
      </div>
      {product.kind === "sized" && product.sizes && (
        <dl className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {product.sizes.map((s) => (
            <div key={s.id} className="rounded-xl border border-line bg-ink px-3 py-2.5">
              <dt className="text-xs font-semibold text-white/60">{s.label}</dt>
              <dd className="mt-0.5 text-base font-bold">{brl(s.price)}</dd>
            </div>
          ))}
        </dl>
      )}
      {product.kind === "fixed" && product.originalNote && (
        <p className="mt-4 text-sm font-semibold text-white/85">{product.originalNote}</p>
      )}
      {flavorInfo && <p className="mt-4 text-sm text-white/65">{flavorInfo}</p>}
      <button
        type="button"
        onClick={() => onCustomize(product)}
        className="btn btn-primary mt-6 w-full"
        aria-label={`Escolher e adicionar ${product.name} ao pedido${product.kind === "sized" ? `, a partir de ${brl(startingPrice(product))}` : ""}`}
      >
        <Plus className="h-5 w-5" aria-hidden="true" />
        {product.kind === "sized" ? "Escolher e adicionar" : "Adicionar ao pedido"}
      </button>
    </motion.article>
  );
}
