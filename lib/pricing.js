// التسعير بيتحسب على إجمالي عدد الستاندات في الأوردر (حتى لو أنواع مختلفة)
// عشان تغيّر الأسعار: عدّل الأرقام هنا بس وكل السايت هيتحدث تلقائي.

export const BASE_PRICE = 400;

// أسعار ثابتة للكميات الصغيرة (الإجمالي)
const FIXED_TOTALS = { 1: 400, 2: 700, 3: 950, 4: 1220, 5: 1475 };

// سعر القطعة للكميات الأكبر
const BULK_TIERS = [
  { min: 20, unit: 255 },
  { min: 10, unit: 270 },
  { min: 6, unit: 285 },
];

export function priceFor(qty) {
  const q = Math.max(0, Math.floor(qty || 0));
  if (q === 0) return 0;
  if (FIXED_TOTALS[q]) return FIXED_TOTALS[q];
  const tier = BULK_TIERS.find((t) => q >= t.min);
  return q * tier.unit;
}

export const unitPrice = (qty) => (qty ? Math.round(priceFor(qty) / qty) : 0);
export const savingFor = (qty) => qty * BASE_PRICE - priceFor(qty);

// الجدول اللي بيظهر للعميل
export const TIERS = [
  { label: "ستاند واحد", qty: 1, range: "1" },
  { label: "2 ستاند", qty: 2, range: "2", hot: true },
  { label: "3 ستاند", qty: 3, range: "3" },
  { label: "5 ستاند", qty: 5, range: "4 - 5" },
  { label: "6 - 9 ستاند", qty: 6, range: "6 - 9", perUnit: true },
  { label: "10 - 19 ستاند", qty: 10, range: "10 - 19", perUnit: true },
  { label: "20+ ستاند", qty: 20, range: "20+", perUnit: true },
];

// اقتراح للعميل: لو زوّد قطعة، هيوفر قد ايه في سعر القطعة
export function nextDeal(qty) {
  const next = qty + 1;
  const extra = priceFor(next) - priceFor(qty);
  const save = savingFor(next);
  return { next, extra, save };
}

export const fmt = (n) => new Intl.NumberFormat("en-US").format(n);
