import ProjectsPage from "@/components/sections/ProjectsPage";

export const metadata = {
  title: "Nos Projets — Help Funds",
  description: "Decouvrez tous les projets humanitaires soutenus par Help Funds.",
};

export default function Page() {
  return (
    <main>
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" />
            120+ projets realises dans 35 pays
          </div>
          <h1 className="font-heading font-bold text-white mb-4">
            Nos <span className="text-secondary-400">projets</span> sur le terrain
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Chaque projet est mene en partenariat avec des acteurs locaux pour garantir un impact durable.
          </p>
        </div>
      </section>
      <ProjectsPage />
    </main>
  );
}