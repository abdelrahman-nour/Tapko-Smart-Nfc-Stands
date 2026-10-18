import Link from "next/link";
import Logo from "./Logo";
import { SITE, SOCIALS, waLink } from "@/lib/site";
import { WhatsappIcon } from "./Icons";

const SocialIcon = ({ name }) => {
  const p = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
  };
  if (name === "Facebook")
    return (
      <svg {...p}>
        <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21z" />
      </svg>
    );
  if (name === "Instagram")
    return (
      <svg {...p} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  if (name === "TikTok")
    return (
      <svg {...p}>
        <path d="M16.6 3c.4 2.2 1.8 3.6 4 3.8v3.1c-1.5 0-2.8-.4-4-1.2v6.1c0 3.4-2.6 5.7-5.7 5.7a5.6 5.6 0 0 1-5.6-5.6c0-3.4 2.9-6 6.4-5.5v3.2c-1.5-.4-3.2.6-3.2 2.3 0 1.4 1.1 2.4 2.4 2.4 1.5 0 2.5-1 2.5-2.8V3z" />
      </svg>
    );
  return null;
};

export default function Footer() {
  return (
    <footer className="border-t border-line bg-coal">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="h-9 w-auto" />
          <p
            className="mt-3 text-right text-sm text-white/60"
            dir="ltr"
            lang="en"
          >
            {SITE.tagline}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
            ستاندات NFC + QR بهوية مكانك — للمحلات والمطاعم والكافيهات والجيمات
            والسناتر وكل صاحب بيزنس.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">روابط</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>
              <Link href="/stand" className="hover:text-lime">
                الستاند الذكي
              </Link>
            </li>
            <li>
              <Link href="/#pricing" className="hover:text-lime">
                الأسعار والعروض
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-lime">
                أسئلة شائعة
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-lime">
                السلة
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">كلّمنا</h3>
          <a
            href={waLink("أهلاً تابكو، عايز أستفسر عن الستاند")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm transition hover:border-lime hover:text-lime"
          >
            <WhatsappIcon width={18} height={18} />
            <span dir="ltr">{SITE.phoneDisplay}</span>
          </a>
          <p className="mt-4 text-sm text-muted">شحن لكل محافظات مصر</p>

          <h3 className="mt-8 text-sm font-semibold text-white">تابعنا</h3>
          <div className="mt-4 flex gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`تابكو على ${s.name}`}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-white/80 transition hover:border-lime hover:bg-lime hover:text-ink"
              >
                <SocialIcon name={s.name} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
