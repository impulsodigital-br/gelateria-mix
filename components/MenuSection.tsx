"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CATEGORIES, productsByCategory } from "@/lib/catalog";
import type { CategoryId, Product } from "@/lib/catalog";
import { CategoryNavigation } from "./CategoryNavigation";
import { ProductCard } from "./ProductCard";
import { ProductCustomizer } from "./ProductCustomizer";
import { Reveal } from "./Reveal";
export function MenuSection() {
  const [category, setCategory] = useState<CategoryId>("sundaes");
  const [customizing, setCustomizing] = useState<Product | null>(null);
  const current = CATEGORIES.find((c) => c.id === category)!;
  const products = productsByCategory(category);
  return (
    <section id="cardapio" className="bg-ink-2 pb-20">
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Reveal>
          <p className="eyebrow">Cardápio</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Escolha, personalize e <span className="italic text-neon">peça</span>.
          </h2>
          <p className="mt-4 max-w-xl text-cream-dim">
            Monte quantos itens quiser e continue navegando: o seu pedido fica guardado até você
            finalizar pelo WhatsApp.
          </p>
        </Reveal>
        <div className="mt-8">
          <CategoryNavigation active={category} onChange={setCategory} />
        </div>
        <div
          id="painel-cardapio"
          role="tabpanel"
          aria-labelledby={`tab-${category}`}
          className="mt-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <p className="mb-5 text-sm text-white/60">{current.blurb}</p>
              <div
                className={`grid gap-5 ${category === "casquinhas" ? "sm:grid-cols-2 lg:grid-cols-3" : "lg:grid-cols-2"}`}
              >
                {products.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={i}
                    onCustomize={setCustomizing}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <ProductCustomizer product={customizing} onClose={() => setCustomizing(null)} />
    </section>
  );
}
