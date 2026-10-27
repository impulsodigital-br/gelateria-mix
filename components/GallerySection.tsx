import { ProductGallery } from "./ProductGallery";
import { Reveal } from "./Reveal";
import { StoreGallery } from "./StoreGallery";
export function GallerySection() {
  return (
    <section id="galeria" className="bg-ink-2 py-20">
      <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">Galeria</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Dá água na <span className="italic text-neon">boca</span>.
          </h2>
        </Reveal>
        <ProductGallery />
        <StoreGallery />
      </div>
    </section>
  );
}
