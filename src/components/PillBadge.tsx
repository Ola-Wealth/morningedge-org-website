export default function PillBadge({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] ${
        dark
          ? "bg-white/10 text-[#22D3EE] border border-white/15"
          : "bg-white text-[#1A1AB5] border border-[#E5E7EB]"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dark ? "bg-[#22D3EE]" : "bg-[#1A1AB5]"}`} />
      {children}
    </span>
  );
}
