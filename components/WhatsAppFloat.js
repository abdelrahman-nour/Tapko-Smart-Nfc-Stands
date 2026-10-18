import { waLink } from "@/lib/site";
import { WhatsappIcon } from "./Icons";

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink("أهلاً تابكو، عايز أستفسر عن الستاند")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="كلّمنا على واتساب"
      className="fixed bottom-5 left-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition hover:scale-105"
    >
      <WhatsappIcon width={28} height={28} />
    </a>
  );
}
