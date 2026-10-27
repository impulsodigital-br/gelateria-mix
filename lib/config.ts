// Dados oficiais da empresa. Altere aqui — o site inteiro usa estas constantes.
export const BUSINESS = {
  name: "Gelateria Mix",
  tagline: "Gelateria, sorvetes, milk-shakes, sundae e sobremesas geladas",
  city: "Arcos",
  state: "MG",
  openingDate: "13 de junho de 2026",
  address: {
    street: "Praça Floriano Peixoto, 177",
    neighborhood: "Centro",
    city: "Arcos",
    state: "MG",
    postalCode: "35588-000",
    reference: "Praça da Matriz",
  },
  whatsappDisplay: "(37) 99834-1183",
  whatsappNumber: "5537998341183",
  instagramUrl: "https://www.instagram.com/mix.gelateria/",
  instagramHandle: "@mix.gelateria",
  // Se tiver o arquivo do logotipo original, coloque em /public/logo.png
  // e informe aqui: logoSrc: "/logo.png". Enquanto for null, usa o texto da marca.
  logoSrc: null as string | null,
} as const;
export const FULL_ADDRESS = `${BUSINESS.address.street}, ${BUSINESS.address.neighborhood}, ${BUSINESS.address.city}, ${BUSINESS.address.state}, CEP ${BUSINESS.address.postalCode}`;
export const MAPS_QUERY = "Praça Floriano Peixoto, 177, Centro, Arcos, MG, 35588-000";
export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_QUERY)}`;
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`;
export const WHATSAPP_BASE_URL = `https://wa.me/${BUSINESS.whatsappNumber}`;
export interface DayHours {
  /** 0 = domingo ... 6 = sábado (igual a Date.getDay) */
  day: number;
  label: string;
  /** Texto exibido */
  text: string;
  /** Formato HH:MM para dados estruturados */
  opens: string;
  closes: string;
  schemaDay: string;
}
export const BUSINESS_HOURS: DayHours[] = [
  {
    day: 1,
    label: "Segunda-feira",
    text: "13h às 19h30",
    opens: "13:00",
    closes: "19:30",
    schemaDay: "Monday",
  },
  {
    day: 2,
    label: "Terça-feira",
    text: "13h às 20h",
    opens: "13:00",
    closes: "20:00",
    schemaDay: "Tuesday",
  },
  {
    day: 3,
    label: "Quarta-feira",
    text: "13h às 20h",
    opens: "13:00",
    closes: "20:00",
    schemaDay: "Wednesday",
  },
  {
    day: 4,
    label: "Quinta-feira",
    text: "13h às 20h",
    opens: "13:00",
    closes: "20:00",
    schemaDay: "Thursday",
  },
  {
    day: 5,
    label: "Sexta-feira",
    text: "13h às 20h",
    opens: "13:00",
    closes: "20:00",
    schemaDay: "Friday",
  },
  {
    day: 6,
    label: "Sábado",
    text: "13h às 21h",
    opens: "13:00",
    closes: "21:00",
    schemaDay: "Saturday",
  },
  {
    day: 0,
    label: "Domingo",
    text: "13h às 22h",
    opens: "13:00",
    closes: "22:00",
    schemaDay: "Sunday",
  },
];
export const NAV_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#sobre", label: "Sobre" },
  { href: "#galeria", label: "Galeria" },
  { href: "#localizacao", label: "Localização" },
] as const;
