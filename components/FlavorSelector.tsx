"use client";
import { motion } from "framer-motion";
import { Check, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Flavor } from "@/lib/catalog";
import { brl } from "@/lib/format";
interface FlavorSelectorProps {
  flavors: Flavor[];
  count: 1 | 2;
  allowDuplicates: boolean;
  /** Um item por espaço de sabor; "" = ainda não escolhido. */
  slots: string[];
  onChange: (slots: string[]) => void;
}
function normalize(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
export function FlavorSelector({
  flavors,
  count,
  allowDuplicates,
  slots,
  onChange,
}: FlavorSelectorProps) {
  const [activeSlot, setActiveSlot] = useState(0);
  const [query, setQuery] = useState("");
  const nameById = useMemo(() => new Map(flavors.map((f) => [f.id, f.name])), [flavors]);
  const hasSpecial = flavors.some((f) => (f.surcharge ?? 0) > 0);
  const showSearch = flavors.length > 12;
  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return q ? flavors.filter((f) => normalize(f.name).includes(q)) : flavors;
  }, [flavors, query]);
  const regular = filtered.filter((f) => !(f.surcharge && f.surcharge > 0));
  const special = filtered.filter((f) => f.surcharge && f.surcharge > 0);
  function pick(flavorId: string) {
    const next = [...slots];
    if (count === 1) {
      next[0] = next[0] === flavorId ? "" : flavorId;
      onChange(next);
      return;
    }
    if (next[activeSlot] === flavorId) {
      next[activeSlot] = "";
      onChange(next);
      return;
    }
    next[activeSlot] = flavorId;
    onChange(next);
    const emptyIndex = next.findIndex((v, i) => i !== activeSlot && !v);
    if (emptyIndex !== -1) setActiveSlot(emptyIndex);
  }
  function renderFlavor(flavor: Flavor) {
    const selectedIndex = slots.indexOf(flavor.id);
    const selected = selectedIndex !== -1;
    const takenByOtherSlot =
      count === 2 && !allowDuplicates && selected && selectedIndex !== activeSlot;
    return (
      <motion.button
        key={flavor.id}
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={() => pick(flavor.id)}
        disabled={takenByOtherSlot}
        aria-pressed={selected}
        className={`relative flex min-h-12 items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left text-sm font-semibold leading-tight transition-colors ${
          selected
            ? "border-neon bg-magenta/20 text-white"
            : "border-line bg-ink text-white/85 hover:border-white/40"
        } ${takenByOtherSlot ? "cursor-not-allowed opacity-60" : ""}`}
      >
        <span>
          {flavor.name}
          {flavor.surcharge ? (
            <span className="mt-0.5 block text-xs font-bold text-neon">
              + {brl(flavor.surcharge)}
            </span>
          ) : null}
        </span>
        {selected && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neon text-ink"
          >
            {count === 2 ? (
              <span className="text-[0.7rem] font-extrabold">{selectedIndex + 1}</span>
            ) : (
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </motion.span>
        )}
      </motion.button>
    );
  }
  return (
    <div>
      {count === 2 && (
        <div className="mb-3 grid grid-cols-2 gap-2" role="group" aria-label="Espaços de sabor">
          {Array.from({ length: 2 }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveSlot(i)}
              aria-pressed={activeSlot === i}
              className={`min-h-14 rounded-xl border px-3 py-2 text-left transition-colors ${
                activeSlot === i ? "border-neon bg-ink-3" : "border-line bg-ink"
              }`}
            >
              <span className="block text-xs font-bold uppercase tracking-wider text-white/60">
                Sabor {i + 1}
              </span>
              <span
                className={`block truncate text-sm font-semibold ${slots[i] ? "text-white" : "text-white/45"}`}
              >
                {slots[i] ? nameById.get(slots[i]) : "Toque para escolher"}
              </span>
            </button>
          ))}
        </div>
      )}
      {showSearch && (
        <label className="relative mb-3 block">
          <span className="sr-only">Buscar sabor</span>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar sabor"
            className="field !pl-10"
          />
        </label>
      )}
      {filtered.length === 0 && (
        <p className="py-4 text-sm text-white/60">Nenhum sabor encontrado para “{query}”.</p>
      )}
      {regular.length > 0 && (
        <div>
          {hasSpecial && (
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-white/60">
              Sabores tradicionais
            </p>
          )}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{regular.map(renderFlavor)}</div>
        </div>
      )}
      {special.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-neon">
            Sabores especiais · + {brl(special[0].surcharge ?? 0)}
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{special.map(renderFlavor)}</div>
        </div>
      )}
    </div>
  );
}
