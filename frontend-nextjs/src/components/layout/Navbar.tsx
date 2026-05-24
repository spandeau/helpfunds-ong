"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Heart, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={scrolled ? "fixed left-0 right-0 z-50 top-0 bg-white shadow-lg py-3 transition-all duration-500" : "fixed left-0 right-0 z-50 top-0 bg-gradient-to-r from-primary-950/95 via-primary-900/95 to-primary-800/95 backdrop-blur-md py-5 transition-all duration-500"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">

          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Help Funds Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className={scrolled ? "text-xl font-heading font-bold leading-none text-neutral-900" : "text-xl font-heading font-bold leading-none text-white"}>
                Help<span className={scrolled ? "text-primary-600" : "text-secondary-400"}>Funds</span>
              </span>
              <span className={scrolled ? "text-xs font-medium leading-tight mt-0.5 text-neutral-400" : "text-xs font-medium leading-tight mt-0.5 text-white/50"}>
                ONG Internationale
              </span>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="relative">
                {link.children ? (
                  <div onMouseEnter={() => setActiveDropdown(link.label)} onMouseLeave={() => setActiveDropdown(null)}>
                    <button className={scrolled ? "flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm text-neutral-700 hover:text-primary-600 hover:bg-primary-50" : "flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm text-white/90 hover:text-white hover:bg-white/10"}>
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    {activeDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-neutral-100 py-2 z-50">
                        {link.children.map((child) => (
                          <Link key={child.href} href={child.href} className="flex items-center gap-2 px-4 py-3 text-sm text-neutral-700 hover:text-primary-600 hover:bg-primary-50 font-medium">
                            <span className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={link.href} className={scrolled ? "block px-4 py-2 rounded-lg font-medium text-sm text-neutral-700 hover:text-primary-600 hover:bg-primary-50" : "block px-4 py-2 rounded-lg font-medium text-sm text-white/90 hover:text-white hover:bg-white/10"}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact" className={scrolled ? "text-sm font-semibold px-5 py-2.5 rounded-xl border-2 border-primary-600 text-primary-600 hover:bg-primary-50 transition-all" : "text-sm font-semibold px-5 py-2.5 rounded-xl border-2 border-white/40 text-white hover:bg-white/10 transition-all"}>
              Contact
            </Link>
            <Link href="/don" className="flex items-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
              <Heart className="w-4 h-4 fill-white" />
              Faire un don
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className={scrolled ? "lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100" : "lg:hidden p-2 rounded-lg text-white hover:bg-white/10"}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {isOpen && (
          <div className="lg:hidden mt-3 bg-white rounded-2xl shadow-2xl border border-neutral-100 p-4">
            <ul className="flex flex-col gap-1 mb-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-neutral-700 hover:text-primary-600 hover:bg-primary-50 font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 pt-4 border-t border-neutral-100">
              <Link href="/contact" onClick={() => setIsOpen(false)} className="flex items-center justify-center border-2 border-primary-600 text-primary-600 font-semibold px-6 py-3 rounded-xl hover:bg-primary-50">
                Nous contacter
              </Link>
              <Link href="/don" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 bg-secondary-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg">
                <Heart className="w-4 h-4 fill-white" />
                Faire un don
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
