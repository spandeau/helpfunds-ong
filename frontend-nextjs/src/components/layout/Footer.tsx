import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "@/components/ui/Logo";

const SOCIAL = [
  { name: "Facebook", short: "F", url: "https://www.facebook.com/share/1bjtHyaTpU/?mibextid=wwXIfr", color: "#1877F2" },
  { name: "Instagram", short: "IG", url: "https://www.instagram.com/help_funds_officiel", color: "#E1306C" },
  { name: "X", short: "X", url: "https://x.com/helpfunds_?s=21", color: "#000" },
  { name: "YouTube", short: "YT", url: "https://www.youtube.com/@help_funds", color: "#FF0000" },
  { name: "TikTok", short: "TK", url: "https://www.tiktok.com/@helpfunds", color: "#010101" },
];

const COL1 = [
  { name: "A propos", url: "/a-propos" },
  { name: "Notre equipe", url: "/equipe" },
  { name: "Nos valeurs", url: "/valeurs" },
  { name: "Rapports annuels", url: "/rapports" },
];

const COL2 = [
  { name: "Projets en cours", url: "/projets" },
  { name: "Projets termines", url: "/projets" },
  { name: "Impact", url: "/projets" },
  { name: "Partenaires", url: "/contact" },
];

const COL3 = [
  { name: "Faire un don", url: "/don" },
  { name: "Devenir benevole", url: "/contact" },
  { name: "Partenariat", url: "/contact" },
  { name: "Contact", url: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="bg-gradient-to-r from-primary-700 to-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-heading font-bold text-white mb-2">Ensemble, changeons des vies</h3>
              <p className="text-primary-200">Chaque don, aussi petit soit-il, fait une difference reelle.</p>
            </div>
            <Link href="/don" className="inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white font-bold px-8 py-4 rounded-2xl transition-all whitespace-nowrap shadow-lg">
              Faire un don maintenant
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-5">
            <Logo size="md" variant="light" />
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Une ONG internationale engagee pour un monde plus juste et solidaire. Nous soutenons les communautes vulnerables a travers des projets durables.
            </p>
            <div className="space-y-2">
              <a href="mailto:helpfunds17@gmail.com" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-primary-400 transition-colors">
                <Mail className="w-4 h-4" />helpfunds17@gmail.com
              </a>
              <a href="tel:+14706616320" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-primary-400 transition-colors">
                <Phone className="w-4 h-4" />+1 (470) 661-6320
              </a>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <MapPin className="w-4 h-4" />Georgia, United States
              </div>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-3">Suivez-nous</p>
              <div className="flex items-center gap-2">
                {SOCIAL.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                    className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-primary-600 hover:text-white flex items-center justify-center text-xs font-black text-neutral-300 transition-all">
                    {s.short}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Organisation</h4>
            <ul className="space-y-2.5">
              {COL1.map((item) => (
                <li key={item.name}>
                  <Link href={item.url} className="flex items-center gap-2 text-sm text-neutral-400 hover:text-primary-400 transition-colors group">
                    <span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-primary-400 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Projets</h4>
            <ul className="space-y-2.5">
              {COL2.map((item) => (
                <li key={item.name}>
                  <Link href={item.url} className="flex items-center gap-2 text-sm text-neutral-400 hover:text-primary-400 transition-colors group">
                    <span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-primary-400 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Impliquer</h4>
            <ul className="space-y-2.5 mb-6">
              {COL3.map((item) => (
                <li key={item.name}>
                  <Link href={item.url} className="flex items-center gap-2 text-sm text-neutral-400 hover:text-primary-400 transition-colors group">
                    <span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-primary-400 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="p-4 bg-neutral-800 rounded-xl border border-neutral-700">
              <p className="text-xs font-semibold text-neutral-300 mb-1">Newsletter</p>
              <p className="text-xs text-neutral-500 mb-3">Restez informe de nos actions</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Votre email" className="flex-1 bg-neutral-700 text-white text-xs px-3 py-2 rounded-lg border border-neutral-600 focus:outline-none focus:border-primary-500 placeholder-neutral-500" />
                <button className="bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors">OK</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">2025 Help Funds. Tous droits reserves. ONG certifiee.</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse" />
              <span className="text-xs text-neutral-500">Dons securises et tracables</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-neutral-500">
              <Link href="/confidentialite" className="hover:text-primary-400 transition-colors">Confidentialite</Link>
              <Link href="/mentions-legales" className="hover:text-primary-400 transition-colors">Mentions legales</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}