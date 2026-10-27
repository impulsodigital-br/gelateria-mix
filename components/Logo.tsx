import Image from "next/image";
import { BUSINESS } from "@/lib/config";
/**
 * Logotipo. Se existir o arquivo original (BUSINESS.logoSrc em lib/config.ts), ele é usado.
 * Caso contrário, mostra o nome da marca em texto — sem redesenhar o logotipo oficial.
 */
export function Logo({ className = "" }: { className?: string }) {
  if (BUSINESS.logoSrc) {
    return (
      <Image
        src={BUSINESS.logoSrc}
        alt="Gelateria Mix"
        width={160}
        height={56}
        priority
        className={`h-10 w-auto ${className}`}
      />
    );
  }
  return (
    <span
      className={`inline-flex items-baseline gap-1.5 leading-none ${className}`}
      aria-label="Gelateria Mix"
    >
      <span className="font-display text-[1.55rem] font-semibold tracking-tight text-white">
        Gelateria
      </span>
      <span className="font-display text-lg font-medium italic text-neon">mix</span>
    </span>
  );
}
