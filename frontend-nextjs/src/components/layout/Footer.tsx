import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "@/components/ui/Logo";

const SOCIAL = [
  { name: "Facebook", url: "https://www.facebook.com/share/1bjtHyaTpU/?mibextid=wwXIfr", bg: "#1877F2", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { name: "Instagram", url: "https://www.instagram.com/help_funds_officiel", bg: "#E1306C", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  { name: "X", url: "https://x.com/helpfunds_?s=21", bg: "#000000", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { name: "YouTube", url: "https://www.youtube.com/@help_funds", bg: "#FF0000", path: "M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" },
  { name: "TikTok", url: "https://www.tiktok.com/@helpfunds", bg: "#010101", path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
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
            <Link href="/don" className="inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white font-bold px-8 py-4 rounded-2xl transition-all whitespace-nowrap shadow-lg hover:-translate-y-0.5">
              Faire un don maintenant
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-5">
            <Logo size="md" variant="light" href="/" />
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
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30"
                    style={{ backgroundColor: s.bg }}>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                      <path d={s.path} />
                    </svg>
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
                    <span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-primary-400 transition-colors" />{item.name}
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
                    <span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-primary-400 transition-colors" />{item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">S impliquer</h4>
            <ul className="space-y-2.5 mb-6">
              {COL3.map((item) => (
                <li key={item.name}>
                  <Link href={item.url} className="flex items-center gap-2 text-sm text-neutral-400 hover:text-primary-400 transition-colors group">
                    <span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-primary-400 transition-colors" />{item.name}
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