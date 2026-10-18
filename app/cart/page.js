import CartView from "@/components/CartView";

export const metadata = {
  title: "السلة",
  robots: { index: false, follow: true },
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return <CartView />;
}
