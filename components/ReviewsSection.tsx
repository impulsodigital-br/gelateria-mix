import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/reviews";
import type { Review } from "@/lib/reviews";
import { Reveal } from "./Reveal";
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`Nota ${rating} de 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? "fill-amber-300 text-amber-300" : "text-white/20"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
function ReviewCard({ review }: { review: Review }) {
  if (!review.text) {
    return (
      <div className="flex h-full min-h-48 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/15 p-6 text-center">
        <p className="text-sm font-bold text-white/70">Avaliação a adicionar</p>
        <p className="mt-2 text-xs leading-relaxed text-white/50">
          Substitua por uma avaliação real de cliente em lib/reviews.ts.
        </p>
      </div>
    );
  }
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-line bg-ink-2 p-6">
      {review.rating !== null && <Stars rating={review.rating} />}
      <blockquote className="mt-4 flex-1 font-display text-xl leading-snug">
        “{review.text}”
      </blockquote>
      <figcaption className="mt-5 text-sm text-cream-dim">
        <span className="font-semibold text-white/85">{review.author ?? "Cliente da Mix"}</span>
        {review.date && <span> · {review.date}</span>}
        {review.sourceUrl && (
          <>
            {" · "}
            <a
              href={review.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-neon underline-offset-4 hover:underline"
            >
              ver avaliação
            </a>
          </>
        )}
      </figcaption>
    </figure>
  );
}
/** Exatamente 3 espaços de avaliações reais. Nenhuma nota ou nome é inventado. */
export function ReviewsSection() {
  return (
    <section id="avaliacoes" className="bg-ink py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">Avaliações</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            O que dizem sobre a <span className="italic text-neon">Mix</span>
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <li key={review.id}>
              <Reveal delay={i * 0.1} className="h-full">
                <ReviewCard review={review} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
