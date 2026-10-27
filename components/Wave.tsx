/** Ondas de sorvete: faixa decorativa com movimento lento (desligado com prefers-reduced-motion). */
export function Wave({
  fill = "#130c10",
  flip = false,
  className = "",
}: {
  fill?: string;
  flip?: boolean;
  className?: string;
}) {
  const path =
    "M0 60 C 120 20 240 20 360 60 S 600 100 720 60 S 960 20 1080 60 S 1320 100 1440 60 V120 H0 Z";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`}
    >
      <div className="wave-track">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-16 w-1/2 sm:h-24">
          <path d={path} fill={fill} />
        </svg>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-16 w-1/2 sm:h-24">
          <path d={path} fill={fill} />
        </svg>
      </div>
    </div>
  );
}
