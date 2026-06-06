import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  variant?: "light" | "dark";
}

const SIZES = {
  sm: { text: "text-base", sub: "text-[10px]", gap: "gap-1.5" },
  md: { text: "text-xl", sub: "text-xs", gap: "gap-2" },
  lg: { text: "text-3xl", sub: "text-sm", gap: "gap-2.5" },
};

export default function Logo({ size = "md", href = "/", variant = "dark" }: LogoProps) {
  const s = SIZES[size];
  const mainColor = variant === "light" ? "text-white" : "text-primary-700";
  const accentColor = variant === "light" ? "text-secondary-400" : "text-secondary-600";
  const subColor = variant === "light" ? "text-white/60" : "text-neutral-400";

  const content = (
    <div className={`flex flex-col items-start ${s.gap}`}>
      <span className={`font-heading font-black leading-none tracking-tight ${s.text} ${mainColor}`}>
        HELP<span className={accentColor}>FUNDS</span>
      </span>
      <span className={`font-medium uppercase tracking-widest leading-none ${s.sub} ${subColor}`}>
        ONG Internationale
      </span>
    </div>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="Help Funds ONG Internationale">
      {content}
    </Link>
  );
}