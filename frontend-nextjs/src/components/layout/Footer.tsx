import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              HelpFunds
            </h2>

            <p className="text-gray-400">
              Construisons un avenir meilleur grâce à
              des actions concrètes.
            </p>
          </div>

          {/* Liens */}
          <div>
            <h3 className="font-semibold mb-4">
              Navigation
            </h3>

            <div className="space-y-2">

              <Link href="/" className="block text-gray-400">
                Accueil
              </Link>

              <Link href="/projets" className="block text-gray-400">
                Projets
              </Link>

              <Link href="/contact" className="block text-gray-400">
                Contact
              </Link>

            </div>
          </div>

          {/* Contact */}
          <div>

            <h3 className="font-semibold mb-4">
              Contact
            </h3>

            <p className="text-gray-400">
              📍 Internationnal
            </p>

            <p className="text-gray-400">
              ✉ contact@helpfunds.org
            </p>

            <p className="text-gray-400">
              ☎ +228 90 00 00 00
            </p>

          </div>

        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">

          © 2026 HelpFunds

        </div>

      </div>

    </footer>
  );
}