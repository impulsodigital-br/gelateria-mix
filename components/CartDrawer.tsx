"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { brl, joinNames } from "@/lib/format";
import { Sheet } from "./Sheet";
import { WhatsAppCheckout } from "./WhatsAppCheckout";
export function CartDrawer() {
  const { isOpen, closeCart, lines, total, count, setQuantity, removeItem } = useCart();
  return (
    <Sheet open={isOpen} onClose={closeCart} title="Seu pedido" side="right">
      <div className="border-b border-line px-5 pb-4 pt-5 pr-16">
        <p className="eyebrow">Seu pedido</p>
        <h2 className="mt-1 font-display text-2xl font-semibold">
          {count === 0 ? "Pedido vazio" : `${count} ${count === 1 ? "item" : "itens"}`}
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {lines.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 py-10 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-3">
              <ShoppingBag className="h-7 w-7 text-neon" aria-hidden="true" />
            </span>
            <p className="max-w-[16rem] text-cream-dim">
              Você ainda não adicionou nada. Que tal explorar o cardápio?
            </p>
            <a href="#cardapio" onClick={closeCart} className="btn btn-primary">
              Explorar cardápio
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            <ul className="space-y-3">
              <AnimatePresence initial={false}>
                {lines.map((line) => (
                  <motion.li
                    key={line.item.key}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-2xl border border-line bg-ink p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-bold leading-tight">{line.product.name}</p>
                          <p className="mt-1 text-sm text-cream-dim">
                            {line.size ? `${line.size.label} · ` : ""}
                            {joinNames(line.flavors.map((f) => f.name))}
                          </p>
                          {line.surcharge > 0 && (
                            <p className="mt-0.5 text-xs font-semibold text-neon">
                              Inclui {brl(line.surcharge)} de sabor especial
                            </p>
                          )}
                          <p className="mt-1 text-xs text-white/60">Unitário: {brl(line.unit)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(line.item.key)}
                          aria-label={`Remover ${line.product.name} do pedido`}
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-full border border-line p-1">
                          <button
                            type="button"
                            onClick={() => setQuantity(line.item.key, line.item.quantity - 1)}
                            disabled={line.item.quantity <= 1}
                            aria-label="Diminuir quantidade"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 disabled:opacity-40"
                          >
                            <Minus className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <motion.span
                            key={line.item.quantity}
                            initial={{ scale: 1.25 }}
                            animate={{ scale: 1 }}
                            className="w-8 text-center font-bold tabular-nums"
                            aria-label={`Quantidade: ${line.item.quantity}`}
                          >
                            {line.item.quantity}
                          </motion.span>
                          <button
                            type="button"
                            onClick={() => setQuantity(line.item.key, line.item.quantity + 1)}
                            aria-label="Aumentar quantidade"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10"
                          >
                            <Plus className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                        <p className="font-display text-lg font-semibold">{brl(line.subtotal)}</p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            <div className="flex items-end justify-between border-t border-line pt-4">
              <div>
                <p className="text-sm text-white/65">Total dos produtos</p>
                <p className="text-xs text-white/50">
                  Entrega e outras condições são combinadas pelo WhatsApp.
                </p>
              </div>
              <motion.p
                key={total}
                initial={{ y: -6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-display text-3xl font-semibold"
              >
                {brl(total)}
              </motion.p>
            </div>
            <div className="border-t border-line pt-5">
              <WhatsAppCheckout />
            </div>
          </div>
        )}
      </div>
    </Sheet>
  );
}
