import { ChevronDown } from "lucide-react";

export type FaqItem = { q: string; a: string };

export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-[#E4DED0]">
      {items.map((item) => (
        <details key={item.q} className="faq-item group border-b border-[#E4DED0]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg text-[#17150F] marker:content-['']">
            <span className="font-medium">{item.q}</span>
            <ChevronDown
              size={20}
              className="faq-chevron flex-shrink-0 text-[#1A1AB5] transition-transform duration-300"
              aria-hidden="true"
            />
          </summary>
          <p className="measure pb-6 text-[15px] leading-relaxed text-[#4A463C]">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
