"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/constants";
import Logo from "@/components/ui/Logo";

const DARK_HERO_PAGES = ["/"];
const DROPDOWN_TIMEOUT = 5000; // 5 secondes

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasDarkHero = DARK_HERO_PAGES.includes(pathname);
  const isTransparent = hasDarkHero && !scrolled;

  // Fermer dropdown apres 5s d inactivite
  const startCloseTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, DROPDOWN_TIMEOUT);
  }, []);

  const cancelCloseTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const openDropdown = useCallback((label: string) => {
    cancelCloseTimer();
    setActiveDropdown((prev) => {
      const next = prev === label ? null : label;
      if (next) startCloseTimer();
      return next;
    });
  }, [cancelCloseTimer, startCloseTimer]);

  // Nettoyer le timer au unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer dropdown au clic en dehors
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-dropdown]")) {
        setActiveDropdown(null);
        cancelCloseTimer();
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [cancelCloseTimer]);

  // Fermer dropdown au changement de page
  useEffect(() => {
    setActiveDropdown(null);
    cancelCloseTimer();
  }, [pathname, cancelCloseTimer]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <Logo size="md" variant={isTransparent ? "light" : "dark"} />

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                data-dropdown
                onMouseEnter={() => {
                  if (link.children) {
                    cancelCloseTimer();
                  }
                }}
                onMouseLeave={() => {
                  if (link.children && activeDropdown === link.label) {
                    startCloseTimer();
                  }
                }}
              >
                {link.children ? (
                  <>
                    <button
                      onClick={() => openDropdown(link.label)}
                      className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        isTransparent
                          ? "text-white/90 hover:bg-white/10 hover:text-white"
                          : "text-neutral-700 hover:bg-neutral-100 hover:text-primary-600"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`} />
                    </button>
                    {activeDropdown === link.label && (
                      <div
                        className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-neutral-100 py-2 z-50"
                        onMouseEnter={cancelCloseTimer}
                        onMouseLeave={startCloseTimer}
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => {
                              setActiveDropdown(null);
                              cancelCloseTimer();
                            }}
                            className="block px-4 py-2.5 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      isTransparent
                        ? "text-white/90 hover:bg-white/10 hover:text-white"
                        : "text-neutral-700 hover:bg-neutral-100 hover:text-primary-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                isTransparent
                  ? "border-white/30 text-white/90 hover:bg-white/10"
                  : "border-neutral-200 text-neutral-700 hover:border-primary-300 hover:text-primary-600"
              }`}
            >
              Contact
            </Link>
            <Link
              href="/don"
              className="inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg hover:-translate-y-0.5"
            >
              <Heart className="w-4 h-4 fill-white" />
              Faire un don
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              isTransparent ? "text-white hover:bg-white/10" : "text-neutral-700 hover:bg-neutral-100"
            }`}
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-100 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === link.label ? "rotate-180" : ""}`} />
                    </button>
                    {activeDropdown === link.label && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => { setIsOpen(false); setActiveDropdown(null); }}
                            className="block px-4 py-2.5 text-sm text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 pb-2 flex flex-col gap-3 border-t border-neutral-100 mt-4">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block text-center px-4 py-3 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-700 hover:border-primary-300 transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/don"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white font-bold px-4 py-3 rounded-xl text-sm transition-all"
              >
                <Heart className="w-4 h-4 fill-white" />
                Faire un don
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
