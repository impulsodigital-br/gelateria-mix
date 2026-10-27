// Galeria com EXATAMENTE 6 espaÃ§os: 4 de produtos + 2 do estabelecimento.
// Para trocar uma foto, substitua o arquivo em /public/images (mesmo nome)
// ou altere o `src` abaixo. Use `src: null` para mostrar o espaÃ§o reservado.
export interface PhotoSlot {
  id: string;
  label: string;
  src: string | null;
  alt: string;
}
export const PRODUCT_PHOTOS: [PhotoSlot, PhotoSlot, PhotoSlot, PhotoSlot] = [
  {
    id: "produto-01",
    label: "Produto 01",
    src: "/images/produto-01.png",
    alt: "Copo da Gelateria Mix com sobremesa de chocolate, em frente ao letreiro neon da loja",
  },
  {
    id: "produto-02",
    label: "Produto 02",
    src: "/images/produto-02.png",
    alt: "Copo da Gelateria Mix com camadas roxas e cobertura de morangos frescos",
  },
  {
    id: "produto-03",
    label: "Produto 03",
    src: "/images/produto-03.png",
    alt: "Sorvete de massa misto servido em casquinha na mÃ¡quina da Gelateria Mix",
  },
  {
    id: "produto-04",
    label: "Produto 04",
    src: "/images/produto-04.png",
    alt: "Copo da Gelateria Mix com bebida gelada amarela e topo cremoso",
  },
];
export const STORE_PHOTOS: [PhotoSlot, PhotoSlot] = [
  {
    id: "estabelecimento-01",
    label: "Estabelecimento 01",
    src: null,
    alt: "Foto do estabelecimento da Gelateria Mix",
  },
  {
    id: "estabelecimento-02",
    label: "Estabelecimento 02",
    src: null,
    alt: "Foto do estabelecimento da Gelateria Mix",
  },
];
/** Foto usada no Hero (reaproveita uma das fotos reais de produto, sem ocupar slot extra). */
export const HERO_PHOTO = PRODUCT_PHOTOS[0];


