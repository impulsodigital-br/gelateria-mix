import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/manrope";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { BUSINESS, BUSINESS_HOURS } from "@/lib/config";
const envUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);
const siteUrl = envUrl ?? "http://localhost:3000";
const title = "Gelateria Mix Arcos MG — Sorvetes, Milk-shakes e Sundaes no Centro";
const description =
  "Gelateria Mix na Praça da Matriz, centro de Arcos (MG): sundaes, milk-shakes, casquinhas e sobremesas geladas. Monte seu pedido e finalize pelo WhatsApp.";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Gelateria Mix Arcos MG",
    "sorveteria em Arcos MG",
    "milk-shake em Arcos",
    "sundae em Arcos",
    "sorvetes no centro de Arcos",
    "gelateria na Praça da Matriz",
  ],
  // URL canônica só é definida quando há domínio definitivo (NEXT_PUBLIC_SITE_URL ou domínio de produção da Vercel).
  alternates: envUrl ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: BUSINESS.name,
    title,
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title, description },
};
export const viewport: Viewport = {
  themeColor: "#0a0709",
  width: "device-width",
  initialScale: 1,
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "IceCreamShop",
  name: BUSINESS.name,
  description: BUSINESS.tagline,
  telephone: `+${BUSINESS.whatsappNumber}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.state,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: "BR",
  },
  sameAs: [BUSINESS.instagramUrl],
  openingHoursSpecification: BUSINESS_HOURS.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.schemaDay,
    opens: h.opens,
    closes: h.closes,
  })),
  ...(envUrl ? { url: envUrl } : {}),
  areaServed: `${BUSINESS.city}, ${BUSINESS.state}`,
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
