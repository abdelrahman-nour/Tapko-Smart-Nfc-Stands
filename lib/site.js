export const SITE = {
  name: "tapko",
  nameAr: "تابكو",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://tapko.link").replace(
    /\/$/,
    "",
  ),
  tagline: "One tap. Everything connected.",
  taglineAr: "لمسة واحدة.. وكل حاجة متوصلة",
  description:
    "تابكو بتعملك ستاند أكريليك ذكي بهوية مكانك ولوجو البراند، فيه NFC و QR Code ديناميك لتقييمات جوجل وفودافون كاش وإنستاباي وأي لينك تحبه. شحن لكل محافظات مصر.",
  whatsapp: "201055855469",
  phoneDisplay: "01055855469",
  shipping: 80,
  currency: "ج.م",
};

export const waLink = (text = "") =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const GOVERNORATES = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "الغربية",
  "الدقهلية",
  "الشرقية",
  "القليوبية",
  "المنوفية",
  "البحيرة",
  "كفر الشيخ",
  "دمياط",
  "بورسعيد",
  "الإسماعيلية",
  "السويس",
  "الفيوم",
  "بني سويف",
  "المنيا",
  "أسيوط",
  "سوهاج",
  "قنا",
  "الأقصر",
  "أسوان",
  "البحر الأحمر",
  "الوادي الجديد",
  "مطروح",
  "شمال سيناء",
  "جنوب سيناء",
];

// غيّر الـ # باللينكات الحقيقية لما تجهز
export const SOCIALS = [
  { name: "Facebook", href: "https://www.facebook.com/tapko.link/" },
  { name: "Instagram", href: "https://www.instagram.com/tapko.link/" },
  { name: "TikTok", href: "https://www.tiktok.com/@tapko.link" },
];
