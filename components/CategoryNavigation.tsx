"use client";
import { motion } from "framer-motion";
import { CATEGORIES, productsByCategory } from "@/lib/catalog";
import type { CategoryId } from "@/lib/catalog";
interface CategoryNavigationProps {
  active: CategoryId;
  onChange: (id: CategoryId) => void;
}
export function CategoryNavigation({ active, onChange }: CategoryNavigationProps) {
  return (
    <div className="sticky top-16 z-30 -mx-4 border-y border-line bg-ink/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
      <div
        role="tablist"
        aria-label="Categorias do cardápio"
        className="mx-auto flex max-w-6xl gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {CATEGORIES.map((cat) => {
          const selected = cat.id === active;
          const total = productsByCategory(cat.id).length;
          return (
            <button
              key={cat.id}
              id={`tab-${cat.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls="painel-cardapio"
              onClick={() => onChange(cat.id)}
              className={`relative min-h-12 shrink-0 rounded-full px-5 text-sm font-bold transition-colors sm:px-6 ${
                selected ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="categoria-ativa"
                  className="absolute inset-0 rounded-full bg-magenta"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              {!selected && (
                <span
                  className="absolute inset-0 rounded-full border border-line"
                  aria-hidden="true"
                />
              )}
              <span className="relative flex items-center gap-2">
                <span className="sm:hidden">{cat.shortLabel}</span>
                <span className="hidden sm:inline">{cat.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${selected ? "bg-white/20" : "bg-white/10"}`}
                >
                  {total}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
