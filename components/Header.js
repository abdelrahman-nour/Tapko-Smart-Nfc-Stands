"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { CartIcon, MenuIcon, CloseIcon } from "./Icons";
import { useCart, useHydrated } from "@/lib/store";

const NAV = [
  { href: "/#why", label: "ليه تابكو" },
  { href: "/#how", label: "بيشتغل ازاي" },
  { href: "/#pricing", label: "الأسعار" },
  { href: "/stand", label: "المنتج" },
  { href: "/#faq", label: "أسئلة شائعة" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const hydrated = useHydrated();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/85 backdrop-blur-xl border-b border-line" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="تابكو — الرئيسية" className="shrink-0">
          <Logo className="h-7 w-auto sm:h-8" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="القائمة الرئيسية">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-full px-4 py-2 text-sm text-white/75 transition hover:bg-white/5 hover:text-white">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-line text-white transition hover:border-lime/60 hover:text-lime"
            aria-label={`السلة${hydrated && count ? ` — ${count} منتج` : ""}`}
          >
            <CartIcon width={20} height={20} />
            {hydrated && count > 0 && (
              <span className="absolute -top-1 -left-1 grid h-5 min-w-5 place-items-center rounded-full bg-lime px-1 text-[11px] font-bold text-ink">
                {count}
              </span>
            )}
          </Link>
          <Link href="/stand" className="hidden rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-lime-soft sm:inline-flex">
            اطلب دلوقتي
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "اقفل القائمة" : "افتح القائمة"}
            aria-expanded={open}
          >
            {open ? <CloseIcon width={20} height={20} /> : <MenuIcon width={20} height={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-ink/95 backdrop-blur-xl lg:hidden" aria-label="قائمة الموبايل">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-white/85 hover:bg-white/5">
                {n.label}
              </Link>
            ))}
            <Link href="/stand" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-lime px-5 py-3 text-center font-semibold text-ink">
              اطلب دلوقتي
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
