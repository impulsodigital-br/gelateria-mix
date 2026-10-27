import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { PhotoSlot } from "@/lib/gallery";
/** Um espaço de foto reutilizável: mostra a imagem ou um espaço reservado discreto para substituição. */
export function PhotoFrame({
  slot,
  sizes,
  className = "",
}: {
  slot: PhotoSlot;
  sizes: string;
  className?: string;
}) {
  return (
    <figure
      className={`group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-ink-2 ${className}`}
    >
      {slot.src ? (
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 border-2 border-dashed border-white/15 p-4 text-center">
          <ImageIcon className="h-7 w-7 text-white/40" aria-hidden="true" />
          <p className="text-sm font-bold text-white/70">{slot.label}</p>
          <p className="text-xs leading-relaxed text-white/50">
            Foto a adicionar. Substitua pelo arquivo real da loja.
          </p>
        </div>
      )}
      <figcaption className="sr-only">{slot.label}</figcaption>
    </figure>
  );
}
