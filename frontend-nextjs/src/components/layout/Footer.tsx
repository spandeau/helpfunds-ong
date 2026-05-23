"use client";

import Link from "next/link";
import {
  FOOTER_LINKS,
  SOCIAL_LINKS,
  CONTACT_INFO,
  SITE_NAME,
} from "@/constants";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Bloc marque */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              {SITE_NAME}
            </h3>

            <p className="text-neutral-400 text-sm leading-7">
              Construire un impact humain, durable et international.
            </p>
          </div>

          {/* Liens */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">
                {section.title}
              </h4>

              <ul className="space-y-3">
                {section.links.map(
                  (
                    link: {
                      label: string;
                      href: string;
                    }
                  ) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-neutral-400 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">
              Contact
            </h4>

            <div className="space-y-3 text-neutral-400 text-sm">
              <p>{CONTACT_INFO.email}</p>
              <p>{CONTACT_INFO.phone}</p>
              <p>{CONTACT_INFO.address}</p>
            </div>

            <div className="flex gap-4 mt-6">
              {SOCIAL_LINKS.map(
                (
                  social: {
                    label: string;
                    href: string;
                  }
                ) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="hover:text-primary-400"
                  >
                    {social.label}
                  </Link>
                )
              )}
            </div>
          </div>

        </div>

        <div className="border-t border-neutral-800 mt-12 pt-6 text-center text-sm text-neutral-500">
          © 2026 {SITE_NAME}. Tous droits réservés.
        </div>

      </div>
    </footer>
  );
}