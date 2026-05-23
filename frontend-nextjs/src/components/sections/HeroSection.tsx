"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-slate-950">

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">

        <div className="text-center max-w-4xl mx-auto">

          <span className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 text-white text-sm">
            ONG internationale — Certifiée et transparente
          </span>

          <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight">
            Construisons un avenir

            <br />

            <span className="text-cyan-400">
              plus juste
            </span>

            ,

            <br />

            projet après projet.
          </h1>

          <p className="mt-8 text-slate-300 text-lg max-w-2xl mx-auto">
            Chaque contribution soutient des initiatives concrètes
            en éducation, santé et développement durable.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

            <Link
              href="/don"
              className="
                bg-cyan-600
                hover:bg-cyan-700
                text-white
                px-8
                py-4
                rounded-xl
                font-semibold
                transition
              "
            >
              Faire un don
            </Link>

            <Link
              href="/projets"
              className="
                border
                border-white
                text-white
                px-8
                py-4
                rounded-xl
                hover:bg-white
                hover:text-black
                transition
              "
            >
              Découvrir nos projets
            </Link>

          </div>

        </div>

        <div
          className="
          mt-24
          grid
          grid-cols-2
          md:grid-cols-4
          gap-6
          "
        >

          {[
            ["25+", "Pays touchés"],
            ["50K+", "Bénéficiaires"],
            ["120+", "Projets"],
            ["98%", "Impact direct"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="
                bg-white/5
                rounded-2xl
                p-8
                text-center
              "
            >
              <div className="text-4xl text-white font-bold">
                {value}
              </div>

              <div className="text-slate-400 mt-2">
                {label}
              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}