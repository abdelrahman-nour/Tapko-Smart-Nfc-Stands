# tapko — موقع تابكو

Next.js 16 (App Router) + Tailwind CSS 4 + Zustand — عربي RTL، دارك مود، جاهز للـ SEO.

## التشغيل

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## الرفع على Vercel
1. ارفع الفولدر على GitHub واعمل Import في Vercel.
2. في Environment Variables ضيف: `NEXT_PUBLIC_SITE_URL=https://tapko.link` (أو الدومين اللي هتستخدمه — مهم للـ sitemap والـ canonical).
3. بعد الرفع: ضيف الدومين في Google Search Console وابعت `/sitemap.xml`.

## الصفحات
| المسار | الوصف |
|---|---|
| `/` | الرئيسية: بانر عروض بيلف + شريط عروض متحرك + احنا مين + المميزات + الأنواع + الخطوات + بانر عرض في النص + QR ديناميك + الأسعار + FAQ |
| `/stand` | صفحة المنتج: كاروسيل + thumbnails، اختيار النوع، الكمية، السعر التلقائي، ملاحظات |
| `/cart` | السلة: تعديل/حذف، الشحن 80ج، بيانات العميل، استكمال الأوردر على واتساب |

روابط مباشرة: `/stand?qty=2` بيفتح على عرض الـ 2، و `/stand?type=vodafone` (google | vodafone | instapay | custom).

## عايز تعدّل؟
- **الأسعار** → `lib/pricing.js` (كل السايت بيتحدث تلقائي، والسعر بيتحسب على إجمالي الستاندات في السلة).
- **نصوص العروض والبانر** → `lib/offers.js`
- **رقم الواتساب / الشحن / الدومين** → `lib/site.js`
- **الأنواع والصور والمواصفات** → `lib/products.js` (الصور في `public/images`)
- **الأسئلة الشائعة** → `lib/faq.js`
- **الألوان** → `app/globals.css` (`--color-lime: #c4d836`)

## SEO
Metadata + Open Graph لكل صفحة، `sitemap.xml`، `robots.txt` (السلة noindex)، JSON-LD (Organization, Product/AggregateOffer, FAQPage)، صور مضغوطة بـ next/image، اللوجو SVG متجّه.
