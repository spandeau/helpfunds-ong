"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      <div className="max-w-7xl mx-auto px-6">

        <nav
          className="
          mt-6
          rounded-2xl
          bg-white/90
          backdrop-blur
          shadow-md
          px-8
          py-5
          flex
          items-center
          justify-between
          "
        >

          {/* Logo */}
          <Link
            href="/"
            className="
            text-2xl
            font-bold
            text-slate-900
            "
          >
            Help
            <span className="text-cyan-600">
              Funds
            </span>
          </Link>

          {/* Menu */}
          <div className="hidden md:flex gap-8 items-center">

            <Link
              href="/"
              className="text-slate-700 hover:text-cyan-600"
            >
              Accueil
            </Link>

            <Link
              href="/projets"
              className="text-slate-700 hover:text-cyan-600"
            >
              Projets
            </Link>

            <Link
              href="/contact"
              className="text-slate-700 hover:text-cyan-600"
            >
              Contact
            </Link>

            <Link
              href="/don"
              className="
              bg-cyan-600
              hover:bg-cyan-700
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              transition
              "
            >
              Faire un don
            </Link>

          </div>

        </nav>

      </div>

    </header>
  );
}