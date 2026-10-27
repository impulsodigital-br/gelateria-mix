"use client";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { brl } from "@/lib/format";
import { buildOrderMessage, buildWhatsAppUrl, validateCustomer } from "@/lib/whatsapp";
import type { CustomerData, CustomerErrors } from "@/lib/whatsapp";
import { CheckoutForm } from "./CheckoutForm";
/** Formulário + botão "Finalizar pelo WhatsApp". Só abre o WhatsApp com o pedido já preenchido. */
export function WhatsAppCheckout() {
  const { lines, total, customer: data, updateCustomer } = useCart();
  const [errors, setErrors] = useState<CustomerErrors>({});
  const [opened, setOpened] = useState(false);
  const [blocked, setBlocked] = useState<string | null>(null);
  function update(patch: Partial<CustomerData>) {
    updateCustomer(patch);
    setErrors((prev) => {
      const next = { ...prev };
      if ("name" in patch) delete next.name;
      if ("address" in patch || "mode" in patch) delete next.address;
      return next;
    });
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBlocked(null);
    if (lines.length === 0) {
      setBlocked("Adicione pelo menos um item ao pedido.");
      return;
    }
    const found = validateCustomer(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstId = found.name ? "cliente-nome" : "cliente-endereco";
      document.getElementById(firstId)?.focus();
      return;
    }
    // Os totais são recalculados a partir do catálogo a cada envio (priceCart via useCart).
    const message = buildOrderMessage(lines, total, data);
    const url = buildWhatsAppUrl(message);
    // O carrinho NÃO é limpo: o cliente pode voltar e ajustar o pedido se precisar.
    // Obs.: com "noopener" o window.open sempre devolve null, então o vínculo é removido manualmente.
    const win = window.open(url, "_blank");
    if (win) {
      win.opener = null;
    } else {
      // Pop-up bloqueado: abre na mesma aba (o pedido continua salvo no navegador).
      window.location.href = url;
    }
    setOpened(true);
  }
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <h3 className="font-display text-xl font-semibold">Seus dados</h3>
      <CheckoutForm data={data} errors={errors} onChange={update} />
      {blocked && (
        <p
          role="alert"
          className="rounded-xl border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-200"
        >
          {blocked}
        </p>
      )}
      <button type="submit" disabled={lines.length === 0} className="btn btn-primary w-full">
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        Finalizar pelo WhatsApp · {brl(total)}
      </button>
      <p className="text-xs leading-relaxed text-white/65">
        Ao tocar no botão, abriremos o WhatsApp da Gelateria Mix com o seu pedido pronto.{" "}
        <strong className="text-white/90">
          O pedido só é enviado quando você confirmar e enviar a mensagem no WhatsApp.
        </strong>{" "}
        Taxas, prazos e condições de atendimento são combinados por lá.
      </p>
      {opened && (
        <p
          role="status"
          className="rounded-xl border border-neon/40 bg-magenta/10 px-3 py-2 text-sm text-white/90"
        >
          Abrimos o WhatsApp com a mensagem pronta. Falta apenas você enviar para a loja. Seu pedido
          continua guardado aqui caso queira ajustar.
        </p>
      )}
    </form>
  );
}
