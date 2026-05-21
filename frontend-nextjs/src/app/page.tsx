export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      <section className="flex min-h-screen flex-col items-center justify-center px-8">

        <h1 className="text-center text-6xl font-bold text-slate-900">
          HELP FUNDS
        </h1>

        <p className="mt-6 max-w-2xl text-center text-lg text-slate-600">
          Construisons un avenir plus juste grâce à des projets
          solidaires et transparents.
        </p>

        <button
          className="
          mt-8
          rounded-xl
          bg-slate-900
          px-8
          py-4
          text-white
          hover:opacity-90
          "
        >
          Faire un don
        </button>

      </section>

    </main>
  );
}