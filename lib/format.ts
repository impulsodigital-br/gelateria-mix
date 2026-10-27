const brlFormatter = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
/** Formata um valor em centavos como moeda brasileira. */
export function brl(cents: number): string {
  return brlFormatter.format(cents / 100);
}
/** Junta nomes em português: "A", "A e B", "A, B e C". */
export function joinNames(names: string[]): string {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} e ${names[names.length - 1]}`;
}
