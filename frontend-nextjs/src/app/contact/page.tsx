import {
  Mail,
  MapPin,
  Phone,
  Globe,
} from "lucide-react";

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://facebook.com",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#071c2f] text-white px-6 py-20">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold mb-6">
            Contactez-nous
          </h1>

          <p className="text-white/70 max-w-2xl mx-auto">
            Une question, un partenariat ou une proposition ?
            Notre équipe est disponible pour vous répondre.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Informations */}
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-8">
              Informations
            </h2>

            <div className="space-y-6">

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-emerald-400 mt-1" />

                <div>
                  <h3 className="font-semibold">
                    Adresse
                  </h3>

                  <p className="text-white/70">
                    Lomé, Togo
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-emerald-400 mt-1" />

                <div>
                  <h3 className="font-semibold">
                    Téléphone
                  </h3>

                  <p className="text-white/70">
                    +228 90 00 00 00
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-emerald-400 mt-1" />

                <div>
                  <h3 className="font-semibold">
                    Email
                  </h3>

                  <p className="text-white/70">
                    contact@helpfunds.org
                  </p>
                </div>
              </div>

            </div>

            <div className="flex items-center gap-4 mt-10">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-emerald-500 transition flex items-center justify-center"
                >
                  <Globe className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-white rounded-3xl p-8 text-black">
            <h2 className="text-2xl font-bold mb-8">
              Envoyer un message
            </h2>

            <form className="space-y-6">

              <div>
                <label className="block mb-2 font-medium">
                  Nom complet
                </label>

                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Votre message..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-semibold transition"
              >
                Envoyer
              </button>

            </form>
          </div>

        </div>
      </div>
    </main>
  );
}