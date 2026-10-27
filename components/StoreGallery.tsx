import { STORE_PHOTOS } from "@/lib/gallery";
import { PhotoFrame } from "./PhotoFrame";
import { Reveal } from "./Reveal";
/** Exatamente 2 espaços de fotos do estabelecimento. */
export function StoreGallery() {
  return (
    <div>
      <h3 className="mb-4 font-display text-xl font-semibold">O espaço</h3>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {STORE_PHOTOS.map((slot, i) => (
          <li key={slot.id}>
            <Reveal delay={i * 0.08}>
              <PhotoFrame
                slot={slot}
                sizes="(min-width: 640px) 30rem, 90vw"
                className="!aspect-[16/10]"
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
