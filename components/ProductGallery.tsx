import { PRODUCT_PHOTOS } from "@/lib/gallery";
import { PhotoFrame } from "./PhotoFrame";
import { Reveal } from "./Reveal";
/** Exatamente 4 espaços de fotos de produtos. */
export function ProductGallery() {
  return (
    <div>
      <h3 className="mb-4 font-display text-xl font-semibold">Nossos produtos</h3>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {PRODUCT_PHOTOS.map((slot, i) => (
          <li key={slot.id}>
            <Reveal delay={i * 0.08}>
              <PhotoFrame slot={slot} sizes="(min-width: 1024px) 14rem, 45vw" />
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
