import "@fontsource-variable/readex-pro";
import "./globals.css";
import OfferBar from "@/components/OfferBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { SITE } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:
      "تابكو | ستاند NFC و QR Code بهوية مكانك — تقييمات جوجل وفودافون كاش وإنستاباي",
    template: "%s | تابكو tapko",
  },
  description: SITE.description,
  keywords: [
    "ستاند NFC",
    "ستاند QR Code",
    "ستاند تقييمات جوجل",
    "ستاند فودافون كاش",
    "ستاند انستاباي",
    "QR ديناميك",
    "NFC مصر",
    "ستاند اكريليك",
    "Google review stand Egypt",
    "tapko",
    "تابكو",
  ],
  applicationName: "tapko",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "/",
    siteName: "tapko — تابكو",
    title: "تابكو | لمسة واحدة.. وكل حاجة متوصلة",
    description: SITE.description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "tapko — One tap. Everything connected.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "تابكو | ستاند NFC + QR بهوية مكانك",
    description: SITE.description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport = {
  themeColor: "#0f0e0e",
  colorScheme: "dark",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "tapko",
  alternateName: "تابكو",
  url: SITE.url,
  logo: `${SITE.url}/logo.svg`,
  slogan: SITE.tagline,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${SITE.whatsapp}`,
    contactType: "sales",
    areaServed: "EG",
    availableLanguage: ["ar", "en"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-sans">
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-[100] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-ink"
        >
          تخطّى للمحتوى
        </a>
        <OfferBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
