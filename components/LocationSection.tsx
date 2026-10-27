import { MapPin, MessageCircle, Navigation } from "lucide-react";
import {
  BUSINESS,
  FULL_ADDRESS,
  MAPS_DIRECTIONS_URL,
  MAPS_EMBED_URL,
  WHATSAPP_BASE_URL,
} from "@/lib/config";
import { BusinessHours } from "./BusinessHours";
import { InstagramIcon } from "./InstagramIcon";
import { Reveal } from "./Reveal";
export function LocationSection() {
  return (
    <section id="localizacao" className="bg-ink-2 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">Localização e contato</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Venha nos <span className="italic text-neon">visitar</span>.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-6">
              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-neon" aria-hidden="true" />
                <address className="not-italic leading-relaxed">
                  <span className="font-bold">{BUSINESS.name}</span>
                  <br />
                  <span className="text-cream-dim">{FULL_ADDRESS}</span>
                  <br />
                  <span className="text-cream-dim">{BUSINESS.address.reference}</span>
                </address>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <Navigation className="h-5 w-5" aria-hidden="true" />
                  Como chegar
                </a>
                <a
                  href={WHATSAPP_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  WhatsApp {BUSINESS.whatsappDisplay}
                </a>
                <a
                  href={BUSINESS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  <InstagramIcon className="h-5 w-5" aria-hidden="true" />
                  {BUSINESS.instagramHandle}
                </a>
              </div>
              <div className="rounded-3xl border border-line bg-ink p-3 sm:p-4">
                <h3 className="px-3 pb-2 pt-1 font-display text-xl font-semibold">
                  Horários de funcionamento
                </h3>
                <BusinessHours />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-80 overflow-hidden rounded-3xl border border-line bg-ink sm:h-96 lg:h-full lg:min-h-[28rem]">
              <iframe
                title="Mapa com a localização da Gelateria Mix, Praça Floriano Peixoto, 177, Arcos, MG"
                src={MAPS_EMBED_URL}
                className="h-full w-full border-0 grayscale-[0.3] invert-[0.92] hue-rotate-180"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
