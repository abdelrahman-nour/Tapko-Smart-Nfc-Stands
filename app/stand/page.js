import { Suspense } from "react";
import ProductView from "@/components/ProductView";
import Reveal from "@/components/Reveal";
import { PRODUCT, VARIANTS } from "@/lib/products";
import { SITE } from "@/lib/site";
import { BASE_PRICE, priceFor } from "@/lib/pricing";

export const metadata = {
  title: "ستاند NFC + QR ذكي بهوية مكانك — تقييمات جوجل، فودافون كاش، إنستاباي",
  description:
    "اطلب ستاند تابكو الذكي: أكريليك A6 بهوية مكانك، NFC و QR ديناميك. ستاند واحد بـ 400 ج، و2 ستاند بـ 700 ج لفترة محدودة. شحن لكل المحافظات.",
  alternates: { canonical: "/stand" },
  openGraph: {
    url: "/stand",
    title: "ستاند تابكو الذكي — NFC + QR بهوية مكانك",
    images: [
      {
        url: "/images/stand-google.webp",
        width: 1254,
        height: 1254,
        alt: PRODUCT.name,
      },
    ],
  },
};

export default function StandPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: PRODUCT.name,
    description: PRODUCT.description,
    brand: { "@type": "Brand", name: "tapko" },
    image: PRODUCT.images.map((i) => `${SITE.url}${i.src}`),
    sku: "TAPKO-STAND-A6",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EGP",
      lowPrice: Math.round(priceFor(20) / 20),
      highPrice: BASE_PRICE,
      offerCount: VARIANTS.length,
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/stand`,
    },
  };

  return (
    <>
      <Suspense fallback={<div className="min-h-[80vh]" />}>
        <ProductView />
      </Suspense>

      <section
        className="mx-auto max-w-7xl px-4 pb-24 sm:px-6"
        aria-labelledby="specs-title"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-3xl border border-line bg-coal p-7 sm:p-9">
            <h2 id="specs-title" className="text-2xl font-bold">
              تفاصيل المنتج
            </h2>
            <p className="mt-4 leading-8 text-muted">{PRODUCT.description}</p>
            <dl className="mt-6 divide-y divide-line">
              {PRODUCT.specs.map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-6 py-3.5 text-sm"
                >
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-left font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal
            delay={100}
            className="rounded-3xl border border-line bg-coal p-7 sm:p-9"
          >
            <h2 className="text-2xl font-bold">ايه اللي بيوصلك؟</h2>
            <ul className="mt-6 space-y-4 text-[15px] leading-7">
              {[
                [
                  "تصميم بهوية مكانك",
                  "بنبعتلك التصميم على الواتساب تراجعه قبل الطباعة.",
                ],
                ["ستاند أكريليك شفاف", "شكل نضيف وشيك يليق على أي كاونتر."],
                ["NFC مبرمج", "العميل يقرّب موبايله واللينك يفتح لوحده."],
                [
                  "QR ديناميك",
                  "يشتغل مع أي موبايل، ونقدر نغيّر وجهته بعدين من غير ما تغيّر الستاند.",
                ],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lime text-sm font-bold text-ink">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-semibold">{t}</div>
                    <div className="text-sm text-muted">{d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
