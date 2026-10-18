"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PRODUCT, VARIANTS, variantById } from "@/lib/products";
import { priceFor, unitPrice, savingFor, nextDeal, BASE_PRICE, fmt } from "@/lib/pricing";
import { useCart, useHydrated } from "@/lib/store";
import { SITE } from "@/lib/site";
import { ArrowIcon, CheckIcon, MinusIcon, PlusIcon, CartIcon, NfcIcon, QrIcon, TruckIcon, BoltIcon } from "./Icons";

const QUICK = [1, 2, 3, 5];

export default function ProductView() {
  const params = useSearchParams();
  const router = useRouter();
  const add = useCart((s) => s.add);
  const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const hydrated = useHydrated();

  const initialType = VARIANTS.some((v) => v.id === params.get("type")) ? params.get("type") : "google";
  const initialQty = Math.min(99, Math.max(1, parseInt(params.get("qty") || "2", 10) || 2));

  const [variant, setVariant] = useState(initialType);
  const [qty, setQty] = useState(initialQty);
  const [note, setNote] = useState("");
  const [img, setImg] = useState(variantById(initialType).image);
  const [toast, setToast] = useState(false);
  const [noteError, setNoteError] = useState(false);
  const touch = useRef(null);

  const v = variantById(variant);
  const total = priceFor(qty);
  const old = qty * BASE_PRICE;
  const save = savingFor(qty);
  const deal = nextDeal(qty);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const pickVariant = (id) => {
    setVariant(id);
    setImg(variantById(id).image);
    setNoteError(false);
  };

  const n = PRODUCT.images.length;
  const go = (d) => setImg((i) => (i + d + n) % n);

  const validate = () => {
    if (v.custom && note.trim().length < 3) {
      setNoteError(true);
      document.getElementById("note")?.focus();
      return false;
    }
    return true;
  };

  const onAdd = (checkout = false) => {
    if (!validate()) return;
    add(variant, qty, note.trim());
    setNote("");
    if (checkout) router.push("/cart");
    else setToast(true);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6 sm:pt-10" aria-labelledby="product-title">
      <nav className="mb-6 text-sm text-muted" aria-label="مسار التصفح">
        <Link href="/" className="hover:text-lime">الرئيسية</Link>
        <span className="mx-2">/</span>
        <span className="text-white/80">{PRODUCT.shortName}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div
            className="relative aspect-square overflow-hidden rounded-[2rem] border border-line bg-coal"
            onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touch.current == null) return;
              const dx = e.changedTouches[0].clientX - touch.current;
              if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1);
              touch.current = null;
            }}
          >
            {PRODUCT.images.map((im, i) => (
              <Image
                key={im.src}
                src={im.src}
                alt={im.alt}
                fill
                priority={i === img}
                sizes="(max-width:1024px) 100vw, 600px"
                className={`object-cover transition-all duration-500 ${i === img ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"}`}
              />
            ))}
            <span className="absolute right-4 top-4 rounded-full bg-lime px-3 py-1.5 text-xs font-bold text-ink">عرض: 2 بـ {fmt(priceFor(2))}</span>
            <button onClick={() => go(-1)} aria-label="الصورة اللي قبل" className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/70 backdrop-blur transition hover:border-lime hover:text-lime">
              <ArrowIcon width={18} height={18} className="rotate-180" />
            </button>
            <button onClick={() => go(1)} aria-label="الصورة اللي بعد" className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/70 backdrop-blur transition hover:border-lime hover:text-lime">
              <ArrowIcon width={18} height={18} />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3" role="tablist" aria-label="صور المنتج">
            {PRODUCT.images.map((im, i) => (
              <button
                key={im.src}
                role="tab"
                aria-selected={i === img}
                aria-label={im.alt}
                onClick={() => setImg(i)}
                className={`relative aspect-square overflow-hidden rounded-2xl border-2 transition ${i === img ? "border-lime" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <Image src={im.src} alt="" fill sizes="160px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-xs font-medium text-lime">
            <BoltIcon width={13} height={13} /> عرض لفترة محدودة
          </span>
          <h1 id="product-title" className="mt-4 text-3xl leading-tight font-bold sm:text-4xl">{PRODUCT.name}</h1>
          <p className="mt-3 leading-8 text-muted">
            ستاند أكريليك شيك بهوية مكانك ولوجو البراند — NFC للموبايلات الحديثة و QR لكل الموبايلات.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            {[[NfcIcon, "NFC"], [QrIcon, "QR ديناميك"], [TruckIcon, `شحن ${SITE.shipping} ج`]].map(([I, t]) => (
              <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-white/80">
                <I width={14} height={14} className="text-lime" /> {t}
              </span>
            ))}
          </div>

          {/* Variant */}
          <fieldset className="mt-8">
            <legend className="mb-3 font-semibold">اختار نوع الستاند</legend>
            <div className="grid grid-cols-2 gap-3">
              {VARIANTS.map((x) => {
                const active = x.id === variant;
                return (
                  <label
                    key={x.id}
                    className={`relative cursor-pointer rounded-2xl border p-4 transition ${active ? "border-lime bg-lime/[0.07]" : "border-line bg-coal hover:border-white/25"}`}
                  >
                    <input type="radio" name="variant" value={x.id} checked={active} onChange={() => pickVariant(x.id)} className="sr-only" />
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: x.dot }} />
                      <span className="font-semibold">{x.name}</span>
                    </span>
                    <span className="mt-1 block text-xs text-muted" dir="ltr" lang="en" style={{ textAlign: "right" }}>{x.en}</span>
                    {active && (
                      <span className="absolute left-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-lime text-ink">
                        <CheckIcon width={12} height={12} strokeWidth={3} />
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
            <p className="mt-3 text-sm text-muted">{v.desc}</p>
          </fieldset>

          {/* Quantity */}
          <fieldset className="mt-8">
            <legend className="mb-3 font-semibold">الكمية</legend>
            <div className="grid grid-cols-4 gap-2.5">
              {QUICK.map((q) => {
                const active = qty === q;
                return (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQty(q)}
                    aria-pressed={active}
                    className={`relative rounded-2xl border px-2 py-3 text-center transition ${active ? "border-lime bg-lime text-ink" : "border-line bg-coal hover:border-white/25"}`}
                  >
                    {q === 2 && (
                      <span className={`absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold ${active ? "bg-ink text-lime" : "bg-lime text-ink"}`}>
                        الأوفر
                      </span>
                    )}
                    <span className="block text-lg font-bold">{q}</span>
                    <span className={`block text-[11px] ${active ? "text-ink/70" : "text-muted"}`}>{fmt(priceFor(q))} ج</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-2xl border border-line bg-coal p-2">
              <button type="button" onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="زوّد" className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 hover:bg-white/10"><PlusIcon width={18} height={18} /></button>
              <label className="flex items-center gap-2 text-sm text-muted">
                كمية تانية:
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={99}
                  value={qty}
                  onChange={(e) => setQty(Math.min(99, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                  className="w-16 rounded-lg border border-line bg-ink py-1.5 text-center text-base font-bold text-white outline-none focus:border-lime"
                  aria-label="الكمية"
                />
              </label>
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="قلّل" className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 hover:bg-white/10"><MinusIcon width={18} height={18} /></button>
            </div>
          </fieldset>

          {/* Price */}
          <div className="mt-8 rounded-3xl border border-lime/40 bg-gradient-to-bl from-lime/[0.08] to-transparent p-6" aria-live="polite">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-sm text-muted">الإجمالي ({qty} ستاند)</div>
                <div className="mt-1 flex items-baseline gap-3">
                  <span className="text-5xl font-bold">{fmt(total)}</span>
                  <span className="text-lg text-muted">ج</span>
                  {save > 0 && <span className="text-lg text-white/40 line-through">{fmt(old)}</span>}
                </div>
              </div>
              <div className="text-left">
                <div className="text-sm text-muted">سعر الستاند</div>
                <div className="text-xl font-bold text-lime">{fmt(unitPrice(qty))} ج</div>
              </div>
            </div>
            {save > 0 && (
              <div className="mt-4 inline-flex rounded-full bg-lime px-3 py-1 text-sm font-bold text-ink">وفّرت {fmt(save)} ج</div>
            )}
            {deal.extra > 0 && qty < 20 && (
              <button
                type="button"
                onClick={() => setQty(deal.next)}
                className="mt-4 flex w-full items-center justify-between gap-3 rounded-2xl border border-dashed border-lime/50 px-4 py-3 text-right text-sm transition hover:bg-lime/10"
              >
                <span>
                  {qty === 1 ? (
                    <>زوّد ستاند تاني بـ <b className="text-lime">{fmt(deal.extra)} ج</b> بس وخد عرض 2 بـ {fmt(priceFor(2))}</>
                  ) : (
                    <>ستاند كمان بـ <b className="text-lime">{fmt(deal.extra)} ج</b> — وتوفيرك يبقى {fmt(deal.save)} ج</>
                  )}
                </span>
                <PlusIcon width={18} height={18} className="shrink-0 text-lime" />
              </button>
            )}
            <p className="mt-4 text-xs text-muted">+ شحن {SITE.shipping} ج لكل المحافظات. السعر بيتحسب على إجمالي الستاندات في السلة.</p>
          </div>

          {/* Note */}
          <div className="mt-6">
            <label htmlFor="note" className="mb-2 block font-semibold">
              ملاحظات {v.custom ? <span className="text-lime">(مطلوبة للتصميم المخصوص)</span> : <span className="text-sm font-normal text-muted">(اختياري)</span>}
            </label>
            <textarea
              id="note"
              rows={3}
              value={note}
              onChange={(e) => { setNote(e.target.value); if (noteError) setNoteError(false); }}
              placeholder={v.custom ? "مثلاً: عايز الستاند يفتح المنيو / صفحة الإنستجرام / الواي فاي.. واكتب اسم المكان" : "اسم المكان، ألوان معينة، أو أي تفاصيل تحب نعرفها"}
              aria-invalid={noteError}
              aria-describedby={noteError ? "note-err" : undefined}
              className={`w-full resize-none rounded-2xl border bg-coal p-4 leading-7 outline-none transition placeholder:text-white/30 focus:border-lime ${noteError ? "border-red-400" : "border-line"}`}
            />
            {noteError && <p id="note-err" className="mt-2 text-sm text-red-400">اكتبلنا عايز الستاند المخصوص لإيه عشان نجهّزه صح.</p>}
          </div>

          {/* Actions */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button onClick={() => onAdd(true)} className="group flex items-center justify-center gap-2 rounded-full bg-lime py-4 font-semibold text-ink transition hover:bg-lime-soft">
              اطلب دلوقتي
              <ArrowIcon width={18} height={18} className="transition group-hover:-translate-x-1" />
            </button>
            <button onClick={() => onAdd(false)} className="flex items-center justify-center gap-2 rounded-full border border-line py-4 font-semibold transition hover:border-lime hover:text-lime">
              <CartIcon width={19} height={19} /> أضف للسلة
            </button>
          </div>
          {hydrated && cartCount > 0 && (
            <p className="mt-4 text-center text-sm text-muted">
              عندك {cartCount} ستاند في السلة — <Link href="/cart" className="text-lime hover:underline">روح للسلة</Link>
            </p>
          )}
        </div>
      </div>

      {/* toast */}
      <div
        role="status"
        className={`fixed inset-x-4 bottom-24 z-50 mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl border border-lime/40 bg-ink/95 p-4 shadow-2xl backdrop-blur transition-all duration-300 sm:bottom-8 ${toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        <span className="flex items-center gap-2 text-sm">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-lime text-ink"><CheckIcon width={14} height={14} strokeWidth={3} /></span>
          اتضاف للسلة
        </span>
        <Link href="/cart" className="rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink">كمّل الأوردر</Link>
      </div>
    </section>
  );
}
