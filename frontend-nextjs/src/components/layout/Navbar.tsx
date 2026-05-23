"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white shadow-lg py-3"
          : "bg-gradient-to-r from-primary-950 via-primary-900 to-primary-800 py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
              scrolled
                ? "bg-primary-600 group-hover:bg-primary-700"
                : "bg-white/20 group-hover:bg-white/30"
            )}>
              <Heart className={cn(
                "w-5 h-5 fill-current transition-colors",
                scrolled ? "text-white" : "text-white"
              )} />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "text-xl font-heading font-bold leading-tight transition-colors",
                scrolled ? "text-neutral-900" : "text-white"
              )}>
                Help<span className={scrolled ? "text-primary-600" : "text-secondary-400"}>Funds</span>
              </span>
              <span className={cn(
                "text-xs font-medium leading-tight transition-colors",
                scrolled ? "text-neutral-400" : "text-white/60"
              )}>
                ONG Internationale
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="relative">
                {link.children ? (
                  <div
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all text-sm",
                      scrolled
                        ? "text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    )}>
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    {activeDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-neutral-100 py-2 z-50">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-colors font-medium"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={link.href} className={cn(
                    "block px-4 py-2 rounded-lg font-medium transition-all text-sm",
                    scrolled
                      ? "text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  )}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* CTA Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className={cn(
                "text-sm font-semibold px-5 py-2.5 rounded-xl border-2 transition-all",
                scrolled
                  ? "border-primary-600 text-primary-600 hover:bg-primary-50"
                  : "border-white/50 text-white hover:bg-white/10"
              )}
            >
              Nous contacter
            </Link>
            <Link
              href="/don"
              className="flex items-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              <Heart className="w-4 h-4 fill-white" />
              Faire un don
            </Link>
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled
                ? "text-neutral-700 hover:bg-neutral-100"
                : "text-white hover:bg-white/10"
            )}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden mt-3 bg-white rounded-2xl shadow-xl border border-neutral-100 p-4">
            <ul className="flex flex-col gap-1 mb-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-xl text-neutral-700 hover:text-primary-600 hover:bg-primary-50 font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <ul className="ml-4 mt-1 flex flex-col gap-1">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2 rounded-xl text-sm text-neutral-500 hover:text-primary-600 hover:bg-primary-50 font-medium transition-colors"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 pt-4 border-t border-neutral-100">
              <Link
                href="/contact"
                className="flex items-center justify-center border-2 border-primary-600 text-primary-600 font-semibold px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors"
              >
                Nous contacter
              </Link>
              <Link
                href="/don"
                className="flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
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