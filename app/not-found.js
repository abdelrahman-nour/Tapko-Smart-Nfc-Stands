import Link from "next/link";

export const metadata = { title: "الصفحة مش موجودة" };

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-bold text-lime">404</p>
      <h1 className="mt-4 text-2xl font-bold">الصفحة دي مش موجودة</h1>
      <Link href="/" className="mt-8 rounded-full bg-lime px-7 py-3 font-semibold text-ink">ارجع للرئيسية</Link>
    </section>
  );
}
