"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { HERO_SLIDES } from "@/lib/offers";
import { ArrowIcon, NfcIcon, QrIcon, StarIcon } from "./Icons";

const DURATION = 6500;

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((n) => setI((n + HERO_SLIDES.length) % HERO_SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(i + 1), DURATION);
    return () => clearTimeout(t);
  }, [i, paused, go]);

  return (
    <section
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="عروض تابكو"
    >
      {/* background */}
      <div className="pointer-events-none absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-lime/15 blur-[120px] lg:left-[25%]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pt-8 pb-14 sm:px-6 lg:min-h-[640px] lg:grid-cols-2 lg:gap-6 lg:pt-6">
        {/* text */}
        <div className="relative order-2 min-h-[330px] lg:order-1 lg:min-h-[400px]">
          {HERO_SLIDES.map((s, idx) => (
            <div
              key={s.id}
              className={`transition-all duration-700 ${idx === i ? "relative opacity-100 translate-y-0" : "pointer-events-none absolute inset-0 opacity-0 translate-y-4"}`}
              aria-hidden={idx !== i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} من ${HERO_SLIDES.length}`}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-3.5 py-1.5 text-xs font-medium text-lime sm:text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                {s.eyebrow}
              </span>
              {idx === 0 ? (
                <h1 className="mt-5 text-[2.6rem] leading-[1.15] font-bold tracking-tight sm:text-6xl lg:text-[4.2rem]">
                  {s.title[0]} <br />
                  <span className="text-lime">{s.title[1]}</span>
                </h1>
              ) : (
                <p className="mt-5 text-[2.6rem] leading-[1.15] font-bold tracking-tight sm:text-6xl lg:text-[4.2rem]">
                  {s.title[0]} <br />
                  <span className="text-lime">{s.title[1]}</span>
                </p>
              )}
              <p className="mt-5 max-w-xl text-base leading-8 text-muted sm:text-lg">{s.text}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={s.cta.href}
                  tabIndex={idx === i ? 0 : -1}
                  className="group inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 font-semibold text-ink transition hover:bg-lime-soft"
                >
                  {s.cta.label}
                  <ArrowIcon width={18} height={18} className="transition group-hover:-translate-x-1" />
                </Link>
                {s.badge && (
                  <span className="rounded-full border border-white/15 px-4 py-3 text-sm font-semibold text-white">{s.badge}</span>
                )}
              </div>
            </div>
          ))}

          <div className="mt-10 flex items-center gap-2" role="tablist" aria-label="اختار السلايد">
            {HERO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={idx === i}
                aria-label={`سلايد ${idx + 1}`}
                onClick={() => go(idx)}
                className="relative h-1.5 overflow-hidden rounded-full bg-white/15 transition-all"
                style={{ width: idx === i ? 56 : 22 }}
              >
                {idx === i && (
                  <span
                    key={`${i}-${paused}`}
                    className="absolute inset-y-0 right-0 bg-lime"
                    style={{ animation: paused ? "none" : `heroProgress ${DURATION}ms linear forwards`, width: paused ? "100%" : undefined }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* visual */}
        <div className="relative order-1 mx-auto w-full max-w-[520px] lg:order-2">
          <div className="relative aspect-square">
            <div className="absolute inset-[8%] rounded-[2.5rem] border border-line bg-coal" />
            {HERO_SLIDES.map((s, idx) => (
              <Image
                key={s.id}
                src={s.image}
                alt={s.alt}
                fill
                priority={idx === 0}
                sizes="(max-width: 1024px) 90vw, 520px"
                className={`rounded-[2.5rem] object-cover transition-all duration-700 ${idx === i ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"}`}
              />
            ))}
            {/* floating chips */}
            <div className="absolute -right-2 top-[14%] flex items-center gap-2 rounded-2xl border border-line bg-ink/80 px-3.5 py-2.5 text-sm backdrop-blur-md sm:-right-6">
              <span className="relative grid h-8 w-8 place-items-center rounded-full bg-lime text-ink">
                <span className="absolute inset-0 rounded-full bg-lime animate-pulse-ring" />
                <NfcIcon width={18} height={18} className="relative" />
              </span>
              <span className="font-medium">NFC</span>
            </div>
            <div className="absolute -left-2 bottom-[18%] flex items-center gap-2 rounded-2xl border border-line bg-ink/80 px-3.5 py-2.5 text-sm backdrop-blur-md sm:-left-6">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-ink">
                <QrIcon width={18} height={18} />
              </span>
              <span className="font-medium">QR ديناميك</span>
            </div>
            <div className="absolute bottom-[3%] right-[10%] flex items-center gap-1 rounded-full border border-line bg-ink/80 px-3 py-1.5 text-lime backdrop-blur-md">
              {[...Array(5)].map((_, k) => (
                <StarIcon key={k} width={14} height={14} fill="currentColor" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes heroProgress{from{width:0}to{width:100%}}`}</style>
    </section>
  );
}
