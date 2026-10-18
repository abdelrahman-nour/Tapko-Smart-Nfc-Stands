export const PRODUCT = {
  slug: "smart-stand",
  name: "ستاند تابكو الذكي — NFC + QR",
  shortName: "ستاند تابكو الذكي",
  description:
    "ستاند أكريليك شفاف مقاس A6 بتصميم كامل بهوية مكانك ولوجو البراند، فيه شريحة NFC للموبايلات الحديثة و QR Code ديناميك يشتغل مع أي موبايل. العميل يقرّب موبايله أو يصوّر الكود ويوصل للينك في ثانية.",
  images: [
    {
      src: "/images/stand-google.webp",
      alt: "ستاند تابكو لتقييمات جوجل على كاونتر",
    },
    {
      src: "/images/stand-vodafone.webp",
      alt: "ستاند تابكو لفودافون كاش بهوية المحل",
    },
    {
      src: "/images/stand-instapay.webp",
      alt: "ستاند تابكو لإنستاباي بتصميم بنفسجي",
    },
    { src: "/images/stand-custom.webp", alt: "ستاند تابكو بتصميم مخصوص" },
  ],
  specs: [
    ["الخامة", "أكريليك شفاف عالي الجودة"],
    ["المقاس", "A6 — ستاند L واقف على الكاونتر"],
    ["التقنية", "شريحة NFC + QR Code ديناميك"],
    ["التصميم", "بهوية مكانك ولوجو البراند"],
    ["التوافق", "QR مع كل الموبايلات — NFC مع الموبايلات الداعمة"],
    ["الشحن", "لكل محافظات مصر"],
  ],
};

export const VARIANTS = [
  {
    id: "google",
    name: "تقييمات جوجل",
    en: "Google Review",
    desc: "عملاءك يقيّموك 5 نجوم على جوجل ماب بلمسة.",
    image: 0,
    dot: "#4285F4",
  },
  {
    id: "vodafone",
    name: "فودافون كاش",
    en: "Vodafone Cash",
    desc: "الدفع بقى أسرع — من غير ما تملي رقمك لكل عميل.",
    image: 1,
    dot: "#E60000",
  },
  {
    id: "instapay",
    name: "إنستاباي",
    en: "InstaPay",
    desc: "لينك الدفع بتاعك جاهز قدام العميل على طول.",
    image: 2,
    dot: "#7B3FE4",
  },
  {
    id: "custom",
    name: "تصميم مخصوص",
    en: "Customize",
    desc: "منيو، إنستجرام، واي فاي، لينك بايو.. أي حاجة تحبها.",
    image: 3,
    dot: "#C4D836",
    custom: true,
  },
];

export const variantById = (id) =>
  VARIANTS.find((v) => v.id === id) || VARIANTS[0];
