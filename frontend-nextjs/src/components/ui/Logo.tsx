import Link from "next/link";
import { Heart } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  variant?: "light" | "dark";
}

const SIZES = {
  sm: { icon: "w-7 h-7", iconInner: "w-3.5 h-3.5", text: "text-base", sub: "text-[10px]" },
  md: { icon: "w-10 h-10", iconInner: "w-5 h-5", text: "text-lg", sub: "text-xs" },
  lg: { icon: "w-14 h-14", iconInner: "w-7 h-7", text: "text-2xl", sub: "text-sm" },
};

export default function Logo({ size = "md", href = "/", variant = "dark" }: LogoProps) {
  const s = SIZES[size];
  const textColor = variant === "light" ? "text-white" : "text-neutral-900";
  const subColor = variant === "light" ? "text-white/60" : "text-neutral-500";

  const content = (
    <div className="flex items-center gap-2.5">
      <div className={`${s.icon} bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0`}>
        <Heart className={`${s.iconInner} text-white fill-white`} />
      </div>
      <div>
        <p className={`${s.text} font-heading font-bold leading-none ${textColor}`}>
          Help<span className="text-primary-400">Funds</span>
        </p>
        <p className={`${s.sub} ${subColor} mt-0.5`}>ONG Internationale</p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="HELPFUNDS ONG Internationale">
      {content}
    </Link>
  );
}