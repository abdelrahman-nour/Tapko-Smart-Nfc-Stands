import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import OfferBanner from "@/components/OfferBanner";
import Reveal from "@/components/Reveal";
import Logo from "@/components/Logo";
import {
  NfcIcon,
  QrIcon,
  BrushIcon,
  RefreshIcon,
  TruckIcon,
  ArrowIcon,
  StarIcon,
  WalletIcon,
  SparkIcon,
  WhatsappIcon,
  ChevronIcon,
} from "@/components/Icons";
import {
  TIERS,
  priceFor,
  unitPrice,
  savingFor,
  BASE_PRICE,
  fmt,
} from "@/lib/pricing";
import { VARIANTS, PRODUCT } from "@/lib/products";
import { FAQ } from "@/lib/faq";
import { waLink, SITE } from "@/lib/site";

export const metadata = { alternates: { canonical: "/" } };

function SectionHead({ eyebrow, title, text, center = false, id }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="text-sm font-semibold tracking-wide text-lime">
        {eyebrow}
      </span>
      <h2
        id={id}
        className="mt-3 text-3xl leading-tight font-bold sm:text-[2.6rem]"
      >
        {title}
      </h2>
      {text && (
        <p className="mt-4 text-base leading-8 text-muted sm:text-lg">{text}</p>
      )}
    </Reveal>
  );
}

const variantIcon = {
  google: StarIcon,
  vodafone: WalletIcon,
  instapay: WalletIcon,
  custom: SparkIcon,
};

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <HeroSlider />

      {/* trust strip */}
      <section
        className="border-y border-line bg-coal/60"
        aria-label="مميزات سريعة"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4">
          {[
            [BrushIcon, "بهوية مكانك", "لوجو وألوان البراند"],
            [NfcIcon, "NFC", "لمسة واحدة وخلاص"],
            [RefreshIcon, "QR ديناميك", "تغيّر اللينك في أي وقت"],
            [TruckIcon, "شحن لكل مصر", `${SITE.shipping} ج لكل المحافظات`],
          ].map(([Icon, t, s]) => (
            <div key={t} className="flex items-center gap-3 py-6 sm:gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-lime/10 text-lime">
                <Icon width={22} height={22} />
              </span>
              <div>
                <div className="font-semibold">{t}</div>
                <div className="text-xs text-muted sm:text-sm">{s}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* about */}
      <section
        id="about"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28"
        aria-labelledby="about-title"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHead
            id="about-title"
            eyebrow="احنا مين"
            title={
              <>
                تابكو بتوصّل عميلك بمكانك{" "}
                <span className="text-lime">في ثانية.</span>
              </>
            }
            text="احنا براند مصري بيصمم وينفّذ ستاندات ذكية للمحلات والبيزنس. بدل ما تملي رقم المحفظة لكل عميل، أو تطلب منه يدوّر عليك في جوجل عشان يقيّمك — بتحط ستاند شيك بهوية مكانك على الكاونتر، والعميل يقرّب موبايله أو يصوّر الكود ويوصل للي انت عايزه على طول."
          />
          <Reveal delay={120} className="relative">
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-brand-dark p-8 sm:p-12">
              <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-lime/20 blur-3xl" />
              <Logo className="relative h-16 w-auto sm:h-20" />
              <p
                className="relative mt-4 text-right text-lg text-white/80"
                dir="ltr"
                lang="en"
              >
                {SITE.tagline}
              </p>
              <dl className="relative mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8 text-center">
                {[
                  ["ثانية", "وقت الوصول"],
                  ["+4", "أنواع ستاندات"],
                  ["27", "محافظة نوصلها"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <dt className="sr-only">{l}</dt>
                    <dd className="text-2xl font-bold text-lime sm:text-3xl">
                      {n}
                    </dd>
                    <dd className="mt-1 text-xs text-muted sm:text-sm">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* why — differentiators */}
      <section
        id="why"
        className="relative scroll-mt-20 bg-coal py-20 sm:py-28"
        aria-labelledby="why-title"
      >
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead
            id="why-title"
            center
            eyebrow="اللي يميّزنا"
            title="ستاند بهويتك.. بتقنيتين في قطعة واحدة"
            text="مش مجرد كود مطبوع — ستاند متصمم مخصوص لمكانك، بيشتغل مع كل الموبايلات القديمة والحديثة."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              {
                Icon: BrushIcon,
                t: "بهوية مكانك ولوجو البراند",
                d: "بنصمم الستاند بألوانك واللوجو بتاعك عشان يبان جزء من ديكور المكان، مش إعلان غريب على الكاونتر. وبتراجع التصميم قبل الطباعة.",
              },
              {
                Icon: QrIcon,
                t: "QR لأي موبايل",
                d: "حتى لو موبايل العميل معندوش NFC، يصوّر الكود بالكاميرا ويوصل لنفس اللينك. محدش هيقف قدام الستاند مش عارف يعمل ايه.",
              },
              {
                Icon: NfcIcon,
                t: "NFC — لمسة واحدة",
                d: "للموبايلات الحديثة: العميل يقرّب موبايله من الستاند واللينك يفتح لوحده. تجربة سريعة وشكل متطور يدّي لمكانك برستيج.",
              },
            ].map(({ Icon, t, d }, idx) => (
              <Reveal
                key={t}
                delay={idx * 100}
                className="group rounded-3xl border border-line bg-ink p-7 transition hover:border-lime/40 sm:p-8"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-lime text-ink transition group-hover:rotate-[-6deg]">
                  <Icon width={26} height={26} />
                </span>
                <h3 className="mt-6 text-xl font-bold">{t}</h3>
                <p className="mt-3 leading-8 text-muted">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* variants / use cases */}
      <section
        id="types"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28"
        aria-labelledby="types-title"
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            id="types-title"
            eyebrow="اختار الستاند"
            title="ستاند لكل حاجة بتحتاجها"
          />
          <Reveal>
            <Link
              href="/stand"
              className="inline-flex items-center gap-2 text-lime hover:underline"
            >
              شوف كل التفاصيل <ArrowIcon width={18} height={18} />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VARIANTS.map((v, idx) => {
            const Icon = variantIcon[v.id];
            return (
              <Reveal key={v.id} delay={idx * 80}>
                <Link
                  href={`/stand?type=${v.id}`}
                  className="group block h-full overflow-hidden rounded-3xl border border-line bg-coal transition hover:-translate-y-1 hover:border-lime/40"
                >
                  <div className="relative aspect-[4/3.4] overflow-hidden">
                    <Image
                      src={PRODUCT.images[v.image].src}
                      alt={`ستاند ${v.name}`}
                      fill
                      sizes="(max-width:640px) 100vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2">
                      <Icon width={18} height={18} className="text-lime" />
                      <h3 className="text-lg font-bold">{v.name}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      {v.desc}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* how */}
      <section
        id="how"
        className="scroll-mt-20 border-y border-line bg-coal/60 py-20 sm:py-28"
        aria-labelledby="how-title"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead
            id="how-title"
            center
            eyebrow="بيشتغل ازاي"
            title="3 خطوات وستاندك يبقى على الكاونتر"
          />
          <ol className="relative mt-14 grid gap-5 md:grid-cols-3">
            {[
              [
                "اختار وابعت هويتك",
                "اختار نوع الستاند والكمية، وكمّل الأوردر على الواتساب وابعتلنا اللوجو واللينك أو الرقم.",
              ],
              [
                "نصمم ونبرمج",
                "نصمم الستاند بهوية مكانك، تراجعه وتوافق، ونبرمج الـ NFC والـ QR الديناميك على اللينك بتاعك.",
              ],
              [
                "يوصلك جاهز",
                "نطبع وننفّذ ونشحن لحد عندك في أي محافظة. حطه على الكاونتر وخلي عملاءك يبدأوا.",
              ],
            ].map(([t, d], idx) => (
              <Reveal
                as="li"
                key={t}
                delay={idx * 100}
                className="relative rounded-3xl border border-line bg-ink p-7 sm:p-8"
              >
                <span className="text-6xl font-bold text-lime/20">
                  0{idx + 1}
                </span>
                <h3 className="mt-2 text-xl font-bold">{t}</h3>
                <p className="mt-3 leading-8 text-muted">{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <OfferBanner />

      {/* dynamic QR */}
      <section
        id="dynamic"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-20 sm:px-6 sm:pb-28"
        aria-labelledby="dyn-title"
      >
        <div className="grid items-center gap-12 overflow-hidden rounded-[2rem] border border-line bg-coal p-7 sm:p-12 lg:grid-cols-2">
          <SectionHead
            id="dyn-title"
            eyebrow="QR ديناميك"
            title={
              <>
                غيّرت الرقم؟{" "}
                <span className="text-lime">مش محتاج ستاند جديد.</span>
              </>
            }
            text="الكود اللي على الستاند بنبرمجه على لينك ديناميك نقدر نغيّر وجهته بعدين. غيّرت رقم المحفظة، فتحت فرع جديد، أو عايز الستاند يودّي على المنيو بدل التقييمات؟ ابعتلنا ونحدّثه — من غير ما ترجّع المنتج ولا تطبع من جديد."
          />
          <Reveal delay={120}>
            <div className="relative mx-auto max-w-md">
              <div className="flex items-center gap-4 rounded-2xl border border-line bg-ink p-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-white text-ink">
                  <QrIcon width={30} height={30} />
                </span>
                <div>
                  <div className="text-sm text-muted">نفس الستاند</div>
                  <div className="font-semibold">نفس الكود المطبوع</div>
                </div>
              </div>
              <div className="mr-10 h-8 border-r-2 border-dashed border-lime/50" />
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-line bg-ink/60 p-4 text-white/40">
                  <span className="line-through">رقم المحفظة القديم</span>
                  <span className="text-xs">قبل</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-lime/50 bg-lime/10 p-4 glow-lime">
                  <span className="font-semibold text-lime">
                    الرقم / اللينك الجديد
                  </span>
                  <span className="flex items-center gap-1 text-xs text-lime">
                    <RefreshIcon width={14} height={14} /> اتحدّث
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* pricing */}
      <section
        id="pricing"
        className="scroll-mt-20 bg-coal py-20 sm:py-28"
        aria-labelledby="pricing-title"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead
            id="pricing-title"
            center
            eyebrow="الأسعار"
            title="كل ما تزوّد.. سعر الستاند يقل"
            text="السعر بيتحسب على إجمالي عدد الستاندات في الأوردر — حتى لو أنواع مختلفة. التصميم بهويتك مجاناً."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TIERS.slice(0, 3).map((t, idx) => (
              <Reveal key={t.qty} delay={idx * 80}>
                <div
                  className={`relative h-full rounded-3xl border p-7 sm:p-8 ${t.hot ? "border-lime bg-ink glow-lime" : "border-line bg-ink"}`}
                >
                  {t.hot && (
                    <span className="absolute -top-3 right-6 rounded-full bg-lime px-3 py-1 text-xs font-bold text-ink">
                      الأكثر طلباً
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-white/85">
                    {t.label}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-5xl font-bold">
                      {fmt(priceFor(t.qty))}
                    </span>
                    <span className="text-muted">ج</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    {fmt(unitPrice(t.qty))} ج للستاند
                    {savingFor(t.qty) > 0 && (
                      <span className="mr-2 font-semibold text-lime">
                        وفّر {fmt(savingFor(t.qty))} ج
                      </span>
                    )}
                  </p>
                  <Link
                    href={`/stand?qty=${t.qty}`}
                    className={`mt-7 flex items-center justify-center gap-2 rounded-full py-3.5 font-semibold transition ${t.hot ? "bg-lime text-ink hover:bg-lime-soft" : "border border-line hover:border-lime hover:text-lime"}`}
                  >
                    اطلب {t.label}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 overflow-hidden rounded-3xl border border-line bg-ink">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4">
              <h3 className="font-semibold">كميات أكبر للسلاسل والفروع</h3>
              <span className="text-sm text-muted">السعر للستاند الواحد</span>
            </div>
            <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
              {TIERS.slice(3).map((t) => (
                <div key={t.range} className="bg-ink p-5 text-center sm:p-6">
                  <div className="text-sm text-muted">{t.range} ستاند</div>
                  <div className="mt-2 text-2xl font-bold">
                    {fmt(unitPrice(t.qty))}{" "}
                    <span className="text-sm font-normal text-muted">ج</span>
                  </div>
                  <div className="mt-1 text-xs text-lime">
                    بدل {BASE_PRICE} (للإستاند الواحد)
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* who it's for + custom */}
      <section
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28"
        aria-labelledby="for-title"
      >
        <SectionHead
          id="for-title"
          center
          eyebrow="لمين؟"
          title="لأي مكان بيستقبل عملاء"
        />
        <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            "مطاعم",
            "كافيهات",
            "جيمات",
            "سناتر تعليمية",
            "صيدليات",
            "محلات موبايلات",
            "صالونات",
            "عيادات",
            "محلات ملابس",
            "سوبر ماركت",
          ].map((x) => (
            <span
              key={x}
              className="rounded-full border border-line bg-coal px-5 py-2.5 text-sm text-white/85"
            >
              {x}
            </span>
          ))}
        </Reveal>
        <Reveal className="mx-auto mt-14 flex max-w-4xl flex-col items-center gap-6 rounded-[2rem] border border-dashed border-lime/40 bg-lime/[0.04] p-8 text-center sm:p-12">
          <h3 className="text-2xl font-bold sm:text-3xl">عايز حاجة مختلفة؟</h3>
          <p className="max-w-2xl leading-8 text-muted">
            كروت NFC، ستاند بمقاس تاني، منيو ديجيتال، أو فكرة في دماغك — ابعتلنا
            على الواتساب ونعملك اللي انت عايزه بالظبط.
          </p>
          <a
            href={waLink("أهلاً تابكو، عندي طلب مخصوص:")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-semibold text-white transition hover:brightness-110"
          >
            <WhatsappIcon width={20} height={20} /> ابعتلنا طلبك
          </a>
        </Reveal>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="scroll-mt-20 border-t border-line bg-coal/60 py-20 sm:py-28"
        aria-labelledby="faq-title"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHead
            id="faq-title"
            center
            eyebrow="أسئلة شائعة"
            title="عندك سؤال؟"
          />
          <div className="mt-12 space-y-3">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-line bg-ink px-6 py-5 open:border-lime/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronIcon
                    width={20}
                    height={20}
                    className="shrink-0 text-lime transition group-open:rotate-180"
                  />
                </summary>
                <p className="mt-4 leading-8 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* final CTA */}
      <section className="relative overflow-hidden px-4 py-20 text-center sm:px-6 sm:py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/15 blur-[110px]" />
        <Reveal className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl leading-tight font-bold sm:text-5xl">
            خلّي عميلك يوصلك <span className="text-lime">بلمسة.</span>
          </h2>
          <p className="mt-4 text-muted">
            2 ستاند بـ {fmt(priceFor(2))} ج بدل {fmt(BASE_PRICE * 2)} — لفترة
            محدودة.
          </p>
          <Link
            href="/stand?qty=2"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-lime px-8 py-4 font-semibold text-ink transition hover:bg-lime-soft"
          >
            ابدأ أوردرك
            <ArrowIcon
              width={18}
              height={18}
              className="transition group-hover:-translate-x-1"
            />
          </Link>
        </Reveal>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
