"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart, useHydrated } from "@/lib/store";
import { PRODUCT, variantById } from "@/lib/products";
import { priceFor, unitPrice, savingFor, nextDeal, BASE_PRICE, fmt } from "@/lib/pricing";
import { SITE, GOVERNORATES, waLink } from "@/lib/site";
import { MinusIcon, PlusIcon, TrashIcon, WhatsappIcon, ArrowIcon, SparkIcon, CartIcon } from "./Icons";

const field = "w-full rounded-xl border border-line bg-ink px-4 py-3 outline-none transition placeholder:text-white/30 focus:border-lime";

export default function CartView() {
  const hydrated = useHydrated();
  const { items, setQty, setNote, remove, add } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", gov: "", address: "" });
  const [errors, setErrors] = useState({});

  if (!hydrated) return <div className="min-h-[70vh]" />;

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = priceFor(count);
  const save = savingFor(count);
  const total = count ? subtotal + SITE.shipping : 0;
  const deal = nextDeal(count);

  if (!count) {
    return (
      <section className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full border border-line bg-coal text-lime"><CartIcon width={34} height={34} /></span>
        <h1 className="mt-6 text-3xl font-bold">السلة فاضية</h1>
        <p className="mt-3 text-muted">اختار الستاند بتاعك — وخد عرض 2 بـ {fmt(priceFor(2))} ج لفترة محدودة.</p>
        <Link href="/stand?qty=2" className="mt-8 inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 font-semibold text-ink hover:bg-lime-soft">
          تسوّق دلوقتي <ArrowIcon width={18} height={18} />
        </Link>
      </section>
    );
  }

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: false }));
  };

  const checkout = () => {
    const phone = form.phone.replace(/\D/g, "");
    const err = {
      name: form.name.trim().length < 2,
      phone: !/^01[0125]\d{8}$/.test(phone),
      gov: !form.gov,
      address: form.address.trim().length < 5,
    };
    const customMissing = items.some((i) => variantById(i.variant).custom && i.note.trim().length < 3);
    if (customMissing) {
      alert("اكتب في ملاحظات الستاند المخصوص عايزه لإيه عشان نجهّزه صح.");
      return;
    }
    setErrors(err);
    if (Object.values(err).some(Boolean)) {
      document.getElementById(`f-${Object.keys(err).find((k) => err[k])}`)?.focus();
      return;
    }
    const lines = [
      "طلب جديد من موقع تابكو",
      "",
      ...items.flatMap((i) => {
        const v = variantById(i.variant);
        return [`• ستاند ${v.name} (${v.en}) × ${i.qty}`, ...(i.note ? [`  ملاحظات: ${i.note}`] : [])];
      }),
      "",
      `عدد الستاندات: ${count}`,
      `سعر المنتجات: ${fmt(subtotal)} ج${save > 0 ? ` (وفّرت ${fmt(save)} ج)` : ""}`,
      `الشحن: ${SITE.shipping} ج`,
      `الإجمالي: ${fmt(total)} ج`,
      "",
      `الاسم: ${form.name.trim()}`,
      `الموبايل: ${phone}`,
      `المحافظة: ${form.gov}`,
      `العنوان: ${form.address.trim()}`,
    ];
    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 pb-24 sm:px-6 sm:pt-12" aria-labelledby="cart-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 id="cart-title" className="text-3xl font-bold sm:text-4xl">السلة <span className="text-lg font-normal text-muted">({count} ستاند)</span></h1>
        <Link href="/stand" className="inline-flex items-center gap-1.5 text-sm text-lime hover:underline">
          <PlusIcon width={16} height={16} /> ضيف نوع تاني
        </Link>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* items */}
        <div className="space-y-4">
          {items.map((i) => {
            const v = variantById(i.variant);
            return (
              <article key={i.variant} className="rounded-3xl border border-line bg-coal p-4 sm:p-5">
                <div className="flex gap-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-ink sm:h-28 sm:w-28">
                    {v.custom ? (
                      <div className="grid h-full place-items-center text-lime"><SparkIcon width={30} height={30} /></div>
                    ) : (
                      <Image src={PRODUCT.images[v.image].src} alt={`ستاند ${v.name}`} fill sizes="112px" className="object-cover" />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-bold sm:text-lg">ستاند {v.name}</h2>
                        <p className="text-xs text-muted" dir="ltr" style={{ textAlign: "right" }}>{v.en} — NFC + QR</p>
                      </div>
                      <button onClick={() => remove(i.variant)} aria-label={`احذف ستاند ${v.name}`} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/50 transition hover:bg-red-500/10 hover:text-red-400">
                        <TrashIcon width={18} height={18} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                      <div className="flex items-center rounded-full border border-line">
                        <button onClick={() => setQty(i.variant, i.qty + 1)} aria-label="زوّد" className="grid h-9 w-9 place-items-center rounded-full hover:text-lime"><PlusIcon width={16} height={16} /></button>
                        <span className="w-8 text-center font-bold" aria-live="polite">{i.qty}</span>
                        <button onClick={() => (i.qty > 1 ? setQty(i.variant, i.qty - 1) : remove(i.variant))} aria-label="قلّل" className="grid h-9 w-9 place-items-center rounded-full hover:text-lime"><MinusIcon width={16} height={16} /></button>
                      </div>
                      <span className="text-sm text-muted">{fmt(unitPrice(count))} ج × {i.qty}</span>
                    </div>
                  </div>
                </div>
                <label className="mt-4 block">
                  <span className="mb-1.5 block text-xs text-muted">ملاحظات {v.custom && <span className="text-lime">(مطلوبة)</span>}</span>
                  <textarea
                    rows={2}
                    value={i.note}
                    onChange={(e) => setNote(i.variant, e.target.value)}
                    placeholder={v.custom ? "عايز الستاند لإيه؟ (منيو، إنستجرام، واي فاي..)" : "اسم المكان، ألوان، أي تفاصيل"}
                    className="w-full resize-none rounded-xl border border-line bg-ink p-3 text-sm leading-6 outline-none placeholder:text-white/30 focus:border-lime"
                  />
                </label>
              </article>
            );
          })}

          {deal.extra > 0 && count < 20 && (
            <button
              onClick={() => add(items[0].variant, 1)}
              className="flex w-full items-center justify-between gap-3 rounded-3xl border border-dashed border-lime/50 bg-lime/[0.05] p-5 text-right transition hover:bg-lime/10"
            >
              <span>
                {count === 1 ? (
                  <>ضيف ستاند تاني بـ <b className="text-lime">{fmt(deal.extra)} ج</b> بس — وخد عرض 2 بـ {fmt(priceFor(2))} ج</>
                ) : (
                  <>ضيف ستاند كمان بـ <b className="text-lime">{fmt(deal.extra)} ج</b> وتوفيرك يوصل {fmt(deal.save)} ج</>
                )}
                <span className="mt-1 block text-xs text-muted">ممكن تغيّر نوعه بعدين أو تضيف نوع تاني من صفحة المنتج</span>
              </span>
              <PlusIcon width={22} height={22} className="shrink-0 text-lime" />
            </button>
          )}
        </div>

        {/* summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="ملخص الطلب">
          <div className="rounded-3xl border border-line bg-coal p-6">
            <h2 className="text-xl font-bold">ملخص الطلب</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted">المنتجات ({count} ستاند)</dt><dd className="flex items-center gap-2">{save > 0 && <span className="text-white/40 line-through">{fmt(count * BASE_PRICE)}</span>}<span>{fmt(subtotal)} ج</span></dd></div>
              {save > 0 && <div className="flex justify-between text-lime"><dt>توفيرك</dt><dd>- {fmt(save)} ج</dd></div>}
              <div className="flex justify-between"><dt className="text-muted">الشحن (كل المحافظات)</dt><dd>{SITE.shipping} ج</dd></div>
              <div className="flex items-baseline justify-between border-t border-line pt-4">
                <dt className="font-semibold">الإجمالي</dt>
                <dd className="text-3xl font-bold">{fmt(total)} <span className="text-base font-normal text-muted">ج</span></dd>
              </div>
            </dl>

            <div className="mt-6 space-y-3 border-t border-line pt-6">
              <h3 className="font-semibold">بيانات الشحن</h3>
              <div>
                <input id="f-name" value={form.name} onChange={set("name")} placeholder="الاسم" autoComplete="name" className={`${field} ${errors.name ? "border-red-400" : ""}`} aria-label="الاسم" aria-invalid={!!errors.name} />
              </div>
              <div>
                <input id="f-phone" value={form.phone} onChange={set("phone")} placeholder="رقم الموبايل" inputMode="tel" autoComplete="tel" dir="ltr" className={`${field} text-right ${errors.phone ? "border-red-400" : ""}`} aria-label="رقم الموبايل" aria-invalid={!!errors.phone} />
                {errors.phone && <p className="mt-1 text-xs text-red-400">اكتب رقم موبايل مصري صحيح (11 رقم)</p>}
              </div>
              <select id="f-gov" value={form.gov} onChange={set("gov")} className={`${field} ${form.gov ? "" : "text-white/40"} ${errors.gov ? "border-red-400" : ""}`} aria-label="المحافظة" aria-invalid={!!errors.gov}>
                <option value="">المحافظة</option>
                {GOVERNORATES.map((g) => <option key={g} value={g} className="text-white">{g}</option>)}
              </select>
              <textarea id="f-address" rows={2} value={form.address} onChange={set("address")} placeholder="العنوان بالتفصيل" autoComplete="street-address" className={`${field} resize-none ${errors.address ? "border-red-400" : ""}`} aria-label="العنوان" aria-invalid={!!errors.address} />
            </div>

            <button onClick={checkout} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-4 font-semibold text-white transition hover:brightness-110">
              <WhatsappIcon width={22} height={22} /> كمّل الأوردر على واتساب
            </button>
            <p className="mt-3 text-center text-xs leading-6 text-muted">
              هيتفتح واتساب برسالة فيها تفاصيل طلبك على رقم <span dir="ltr">{SITE.phoneDisplay}</span> — ابعتها وهنأكد معاك التصميم وطريقة الدفع.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
