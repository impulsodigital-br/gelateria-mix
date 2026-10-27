import { BUSINESS, WHATSAPP_BASE_URL } from "./config";
import { brl, joinNames } from "./format";
import type { PricedLine } from "./pricing";
export type OrderMode = "retirada" | "entrega";
export interface CustomerData {
  name: string;
  mode: OrderMode;
  address: string;
  payment: string;
  notes: string;
}
export interface CustomerErrors {
  name?: string;
  address?: string;
}
export function validateCustomer(data: CustomerData): CustomerErrors {
  const errors: CustomerErrors = {};
  if (data.name.trim().length < 2) errors.name = "Informe seu nome.";
  if (data.mode === "entrega" && data.address.trim().length < 8) {
    errors.address = "Informe o endereço completo para entrega.";
  }
  return errors;
}
export function buildOrderMessage(
  lines: PricedLine[],
  total: number,
  customer: CustomerData,
): string {
  const out: string[] = [];
  out.push(`Olá! Gostaria de fazer um pedido na ${BUSINESS.name}.`);
  out.push("");
  out.push("*MEU PEDIDO*");
  out.push("");
  lines.forEach((line, i) => {
    out.push(`${i + 1}. ${line.product.name}`);
    if (line.size) out.push(`   - Tamanho: ${line.size.label}`);
    const label = line.flavors.length > 1 ? "Sabores" : "Sabor";
    out.push(`   - ${label}: ${joinNames(line.flavors.map((f) => f.name))}`);
    if (line.surcharge > 0) out.push(`   - Adicional de sabor especial: ${brl(line.surcharge)}`);
    out.push(`   - Quantidade: ${line.item.quantity}`);
    out.push(`   - Valor unitário: ${brl(line.unit)}`);
    out.push(`   - Subtotal: ${brl(line.subtotal)}`);
    out.push("");
  });
  out.push(`*Total dos produtos: ${brl(total)}*`);
  out.push("");
  out.push("*DADOS DO CLIENTE*");
  out.push("");
  out.push(`Nome: ${customer.name.trim()}`);
  out.push(
    `Modalidade: ${customer.mode === "entrega" ? "Entrega" : "Retirada no estabelecimento"}`,
  );
  if (customer.mode === "entrega" && customer.address.trim()) {
    out.push(`Endereço: ${customer.address.trim()}`);
  }
  if (customer.payment.trim()) out.push(`Pagamento: ${customer.payment.trim()}`);
  if (customer.notes.trim()) out.push(`Observações: ${customer.notes.trim()}`);
  out.push("");
  out.push("Olá, aguardo a confirmação do pedido e das condições de atendimento. Obrigado!");
  return out.join("\n");
}
export function buildWhatsAppUrl(message: string): string {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}
/** Link simples para abrir conversa sem mensagem de pedido. */
export function buildContactUrl(text?: string): string {
  return text ? buildWhatsAppUrl(text) : WHATSAPP_BASE_URL;
}
