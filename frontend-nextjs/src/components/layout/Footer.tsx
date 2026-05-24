import Link from "next/link";
import Image from "next/image";
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaSnapchat } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FOOTER_LINKS, CONTACT_INFO } from "@/constants";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">

      <div className="bg-gradient-to-r from-primary-700 to-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-heading font-bold text-white mb-2">
                Ensemble, changeons des vies
              </h3>
              <p className="text-primary-200">
                Chaque don, aussi petit soit-il, fait une difference reelle.
              </p>
            </div>
            <Link href="/don" className="inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white font-bold px-8 py-4 rounded-2xl transition-all whitespace-nowrap shadow-lg hover:-translate-y-0.5">
              <Heart className="w-5 h-5 fill-white" />
              Faire un don maintenant
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image src="/logo.png" alt="Help Funds" fill className="object-contain" />
              </div>
              <div>
                <div className="text-lg font-heading font-bold">
                  Help<span className="text-primary-400">Funds</span>
                </div>
                <div className="text-xs text-neutral-500">ONG Internationale</div>
              </div>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-xs">
              Une ONG internationale engagee pour un monde plus juste et solidaire.
              Nous soutenons les communautes vulnerables a travers des projets durables.
            </p>
            <div className="flex flex-col gap-3 text-sm text-neutral-400 mb-6">
              <a href={"mailto:" + CONTACT_INFO.email} className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                {CONTACT_INFO.email}
              </a>
              <a href={"tel:" + CONTACT_INFO.phone} className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                {CONTACT_INFO.phone}
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                {CONTACT_INFO.address}
              </span>
            </div>

            <div className="mb-2 text-xs text-neutral-500 uppercase tracking-wider font-semibold">
              Suivez-nous
            </div>
            <div className="flex items-center gap-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-neutral-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all hover:-translate-y-0.5 text-neutral-300 hover:text-white" aria-label="Facebook">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-neutral-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all hover:-translate-y-0.5 text-neutral-300 hover:text-white" aria-label="Instagram">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-neutral-800 hover:bg-neutral-600 rounded-lg flex items-center justify-center transition-all hover:-translate-y-0.5 text-neutral-300 hover:text-white" aria-label="X Twitter">
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-neutral-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all hover:-translate-y-0.5 text-neutral-300 hover:text-white" aria-label="Youtube">
                <FaYoutube className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-neutral-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all hover:-translate-y-0.5 text-neutral-300 hover:text-white" aria-label="LinkedIn">
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-neutral-800 hover:bg-yellow-400 rounded-lg flex items-center justify-center transition-all hover:-translate-y-0.5 text-neutral-300 hover:text-white" aria-label="Snapchat">
                <FaSnapchat className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">Organisation</h4>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.organisation.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-neutral-600 rounded-full group-hover:bg-primary-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">Projets</h4>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.projets.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-neutral-600 rounded-full group-hover:bg-primary-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">Impliquer</h4>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.impliquer.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-neutral-600 rounded-full group-hover:bg-primary-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-neutral-800 rounded-xl border border-neutral-700">
              <p className="text-xs text-neutral-400 mb-1 font-semibold">Newsletter</p>
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
            <p className="text-sm text-neutral-500">
              2025 Help Funds. Tous droits reserves. ONG certifiee.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse" />
              <span className="text-xs text-neutral-500">Dons securises et tracables</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-neutral-500">
              <Link href="/confidentialite" className="hover:text-primary-400 transition-colors">Confidentialite</Link>
              <Link href="/mentions-legales" className="hover:text-primary-400 transition-colors">Mentions legales</Link>
              <Link href="/cookies" className="hover:text-primary-400 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
