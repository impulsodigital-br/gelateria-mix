"use client";
import type { CustomerData, CustomerErrors, OrderMode } from "@/lib/whatsapp";
interface CheckoutFormProps {
  data: CustomerData;
  errors: CustomerErrors;
  onChange: (patch: Partial<CustomerData>) => void;
}
const MODES: { id: OrderMode; label: string }[] = [
  { id: "retirada", label: "Retirada no estabelecimento" },
  { id: "entrega", label: "Entrega" },
];
export function CheckoutForm({ data, errors, onChange }: CheckoutFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="cliente-nome" className="mb-1.5 block text-sm font-bold">
          Seu nome
        </label>
        <input
          id="cliente-nome"
          type="text"
          autoComplete="name"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "erro-nome" : undefined}
          className="field"
          placeholder="Como podemos te chamar?"
        />
        {errors.name && (
          <p id="erro-nome" role="alert" className="mt-1.5 text-sm font-semibold text-red-300">
            {errors.name}
          </p>
        )}
      </div>
      <fieldset>
        <legend className="mb-1.5 text-sm font-bold">Como prefere receber?</legend>
        <div className="grid grid-cols-2 gap-2">
          {MODES.map((m) => (
            <label
              key={m.id}
              className={`flex min-h-14 cursor-pointer items-center justify-center rounded-xl border px-3 py-2 text-center text-sm font-semibold leading-tight transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-neon ${
                data.mode === m.id
                  ? "border-neon bg-magenta/20"
                  : "border-line bg-ink hover:border-white/40"
              }`}
            >
              <input
                type="radio"
                name="modalidade"
                value={m.id}
                checked={data.mode === m.id}
                onChange={() => onChange({ mode: m.id })}
                className="sr-only"
              />
              {m.label}
            </label>
          ))}
        </div>
      </fieldset>
      {data.mode === "entrega" && (
        <div>
          <label htmlFor="cliente-endereco" className="mb-1.5 block text-sm font-bold">
            Endereço de entrega
          </label>
          <textarea
            id="cliente-endereco"
            rows={2}
            autoComplete="street-address"
            value={data.address}
            onChange={(e) => onChange({ address: e.target.value })}
            aria-invalid={Boolean(errors.address)}
            aria-describedby={errors.address ? "erro-endereco" : undefined}
            className="field resize-none"
            placeholder="Rua, número, bairro e ponto de referência"
          />
          {errors.address && (
            <p
              id="erro-endereco"
              role="alert"
              className="mt-1.5 text-sm font-semibold text-red-300"
            >
              {errors.address}
            </p>
          )}
        </div>
      )}
      <div>
        <label htmlFor="cliente-pagamento" className="mb-1.5 block text-sm font-bold">
          Forma de pagamento <span className="font-normal text-white/60">(opcional)</span>
        </label>
        <input
          id="cliente-pagamento"
          type="text"
          value={data.payment}
          onChange={(e) => onChange({ payment: e.target.value })}
          className="field"
          placeholder="Ex.: a combinar pelo WhatsApp"
        />
      </div>
      <div>
        <label htmlFor="cliente-obs" className="mb-1.5 block text-sm font-bold">
          Observações <span className="font-normal text-white/60">(opcional)</span>
        </label>
        <textarea
          id="cliente-obs"
          rows={2}
          value={data.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          className="field resize-none"
          placeholder="Alguma observação sobre o pedido?"
        />
      </div>
    </div>
  );
}
