import { ChevronDown } from "lucide-react";

export type FaqItem = { q: string; a: string };

export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-(--line)">
      {items.map((item) => (
        <details key={item.q} className="faq-item group border-b border-(--line)">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg text-(--ink) marker:content-['']">
            <span className="font-medium">{item.q}</span>
            <ChevronDown
              size={20}
              className="faq-chevron flex-shrink-0 text-(--navy-text) transition-transform duration-300"
              aria-hidden="true"
            />
          </summary>
          <p className="measure pb-6 text-[15px] leading-relaxed text-(--ink-soft)">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
