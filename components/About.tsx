import { Clock, MapPin } from "lucide-react";
import { BUSINESS, BUSINESS_HOURS, FULL_ADDRESS } from "@/lib/config";
import { Reveal } from "./Reveal";
import { Wave } from "./Wave";
export function About() {
  const hoursOf = (day: number) => BUSINESS_HOURS.find((h) => h.day === day)!.text;
  return (
    <section id="sobre" className="relative bg-ink pt-20">
      <div className="absolute inset-x-0 top-0 -translate-y-full">
        <Wave fill="#0a0709" className="-mb-px" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Sobre a Mix</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Mais sabor para os <span className="italic text-neon">seus momentos</span>.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-dim">
            A Gelateria Mix é um ponto de encontro para quem gosta de transformar uma pausa em um
            momento especial. No coração de Arcos, você encontra opções de sobremesas geladas para
            descobrir novos sabores e aproveitar seus favoritos.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="rounded-3xl border border-line bg-ink-2 p-6">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-neon" aria-hidden="true" />
              <div>
                <p className="font-bold">
                  Centro de {BUSINESS.city}, {BUSINESS.state}
                </p>
                <address className="mt-1 text-sm not-italic leading-relaxed text-cream-dim">
                  {FULL_ADDRESS}
                  <br />
                  {BUSINESS.address.reference}
                </address>
              </div>
            </div>
            <div className="mt-5 flex gap-3 border-t border-line pt-5">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-neon" aria-hidden="true" />
              <div className="text-sm text-cream-dim">
                <p className="font-bold text-white">Horários</p>
                <p className="mt-1">Seg.: {hoursOf(1)}</p>
                <p>Ter. a sex.: {hoursOf(2)}</p>
                <p>Sáb.: {hoursOf(6)}</p>
                <p>Dom.: {hoursOf(0)}</p>
                <a
                  href="#localizacao"
                  className="mt-2 inline-block font-semibold text-neon underline-offset-4 hover:underline"
                >
                  Ver horários completos
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
