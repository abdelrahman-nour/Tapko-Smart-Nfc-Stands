import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { ArrowIcon, CheckIcon } from "./Icons";
import { priceFor, BASE_PRICE, fmt } from "@/lib/pricing";

export default function OfferBanner() {
  const offer = priceFor(2);
  const old = BASE_PRICE * 2;
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24" aria-labelledby="offer-title">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-lime text-ink">
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#231f20_1.2px,transparent_1.2px)] [background-size:18px_18px]" />
        <div className="relative grid items-center gap-8 p-7 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:p-16">
          <div>
            <span className="inline-flex rounded-full bg-ink px-4 py-1.5 text-sm font-semibold text-lime">عرض لفترة محدودة</span>
            <h2 id="offer-title" className="mt-5 text-4xl leading-tight font-bold sm:text-6xl">
              2 ستاند بـ {fmt(offer)} ج
            </h2>
            <p className="mt-3 text-lg font-medium">
              بدل <span className="line-through decoration-2">{fmt(old)} ج</span> — وفّر {fmt(old - offer)} جنيه
            </p>
            <ul className="mt-6 grid gap-2.5 text-[15px] font-medium sm:grid-cols-2">
              {["ممكن تختار نوعين مختلفين", "تصميم بهوية مكانك مجاناً", "NFC + QR ديناميك", "شحن لكل المحافظات"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-lime">
                    <CheckIcon width={13} height={13} strokeWidth={2.6} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <Link
              href="/stand?qty=2"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-base font-semibold text-white transition hover:bg-brand-dark"
            >
              خد العرض دلوقتي
              <ArrowIcon width={18} height={18} className="transition group-hover:-translate-x-1" />
            </Link>
          </div>

          <div className="relative mx-auto h-[300px] w-full max-w-[460px] sm:h-[380px]">
            <div className="absolute right-0 top-0 h-[78%] w-[62%] rotate-[4deg] overflow-hidden rounded-3xl shadow-2xl shadow-ink/40 ring-4 ring-ink">
              <Image src="/images/stand-google.webp" alt="ستاند تقييمات جوجل" fill sizes="300px" className="object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 h-[78%] w-[62%] -rotate-[5deg] overflow-hidden rounded-3xl shadow-2xl shadow-ink/40 ring-4 ring-ink">
              <Image src="/images/stand-vodafone.webp" alt="ستاند فودافون كاش" fill sizes="300px" className="object-cover" />
            </div>
            <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-center text-lime shadow-xl sm:h-28 sm:w-28">
              <div>
                <div className="text-2xl font-bold leading-none sm:text-3xl">{fmt(offer / 2)}</div>
                <div className="mt-1 text-[11px] text-white/80">ج للستاند</div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
