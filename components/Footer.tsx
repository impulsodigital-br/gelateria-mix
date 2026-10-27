import { MessageCircle } from "lucide-react";
import { BUSINESS, FULL_ADDRESS, NAV_LINKS, WHATSAPP_BASE_URL } from "@/lib/config";
import { InstagramIcon } from "./InstagramIcon";
import { Logo } from "./Logo";
export function Footer() {
  return (
    <footer className="border-t border-line bg-ink pb-28 pt-12 md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-dim">
            {BUSINESS.tagline}. {BUSINESS.address.neighborhood} de {BUSINESS.city}, {BUSINESS.state}
            .
          </p>
        </div>
        <nav aria-label="Rodapé">
          <p className="text-sm font-bold">Navegação</p>
          <ul className="mt-3 space-y-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex min-h-10 items-center text-sm text-cream-dim transition-colors hover:text-neon"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-sm font-bold">Contato</p>
          <address className="mt-3 text-sm not-italic leading-relaxed text-cream-dim">
            {FULL_ADDRESS}
          </address>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={WHATSAPP_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost !min-h-11 !px-4 !text-sm"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {BUSINESS.whatsappDisplay}
            </a>
            <a
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost !min-h-11 !px-4 !text-sm"
            >
              <InstagramIcon className="h-4 w-4" aria-hidden="true" />
              Instagram
            </a>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-4 text-xs text-white/45 sm:px-6">
        © {new Date().getFullYear()} {BUSINESS.name}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
