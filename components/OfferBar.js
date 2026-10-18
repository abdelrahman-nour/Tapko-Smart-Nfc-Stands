import { TICKER } from "@/lib/offers";
import { BoltIcon } from "./Icons";

export default function OfferBar() {
  const row = [...TICKER, ...TICKER];
  return (
    <div className="relative overflow-hidden bg-lime text-ink" role="region" aria-label="العروض">
      <div className="flex w-max animate-marquee gap-10 py-2 text-[13px] font-semibold whitespace-nowrap">
        {[0, 1].map((k) => (
          <div key={k} className="flex gap-10" aria-hidden={k === 1}>
            {row.map((t, i) => (
              <span key={i} className="flex items-center gap-2">
                <BoltIcon width={14} height={14} />
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
