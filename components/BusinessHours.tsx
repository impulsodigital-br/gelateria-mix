"use client";
import { useEffect, useState } from "react";
import { BUSINESS_HOURS } from "@/lib/config";
/** Tabela semanal de horários. O dia de hoje é destacado após a hidratação (evita divergência servidor/cliente). */
export function BusinessHours() {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => {
    setToday(new Date().getDay());
  }, []);
  return (
    <table className="w-full text-left">
      <caption className="sr-only">Horários de funcionamento da Gelateria Mix</caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Dia</th>
          <th scope="col">Horário</th>
        </tr>
      </thead>
      <tbody>
        {BUSINESS_HOURS.map((h) => {
          const isToday = today === h.day;
          return (
            <tr
              key={h.day}
              className={`border-b border-line last:border-0 ${isToday ? "bg-magenta/15" : ""}`}
            >
              <th
                scope="row"
                className={`px-3 py-3 text-sm font-semibold ${isToday ? "text-white" : "text-white/80"}`}
              >
                {h.label}
                {isToday && (
                  <span className="ml-2 rounded-full bg-magenta px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider">
                    Hoje
                  </span>
                )}
              </th>
              <td
                className={`px-3 py-3 text-right text-sm tabular-nums ${isToday ? "font-bold text-white" : "text-cream-dim"}`}
              >
                {h.text}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
