import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  variant?: "light" | "dark";
}

const SIZES = {
  sm: { width: 100, height: 32 },
  md: { width: 140, height: 44 },
  lg: { width: 200, height: 64 },
};

export default function Logo({ size = "md", href = "/", variant = "dark" }: LogoProps) {
  const s = SIZES[size];

  const image = (
    <Image
      src="/logo.png"
      alt="Help Funds ONG Internationale"
      width={s.width}
      height={s.height}
      className={`object-contain transition-all ${variant === "light" ? "brightness-0 invert" : ""}`}
      priority
    />
  );

  if (!href) return image;

  return (
    <Link href={href} aria-label="Help Funds ONG Internationale">
      {image}
    </Link>
  );
}