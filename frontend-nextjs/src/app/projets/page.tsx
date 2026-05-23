import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectsGrid from "@/components/projects/ProjectsGrid";

export default function Page() {
  return (
    <>
      <Navbar />

      <main className="pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold mb-6">
            Nos projets
          </h1>

          <p className="text-gray-600 mb-12">
            Découvrez les actions soutenues par Help Funds.
          </p>

          <ProjectsGrid />

        </div>
      </main>

      <Footer />
    </>
  );
}