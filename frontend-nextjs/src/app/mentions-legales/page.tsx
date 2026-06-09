import Link from "next/link";
import { FileText, ArrowLeft, Shield, Building, Mail, Globe } from "lucide-react";

export const metadata = {
  title: "Mentions legales — Help Funds",
  description: "Mentions legales du site Help Funds ONG Internationale.",
};

const SECTIONS = [
  {
    id: "editeur",
    icon: Building,
    title: "Editeur du site",
    content: [
      { label: "Denomination", value: "Help Funds" },
      { label: "Forme juridique", value: "Organisation Non Gouvernementale (ONG)" },
      { label: "Siege social", value: "Georgia, United States" },
      { label: "Email", value: "helpfunds17@gmail.com" },
      { label: "Telephone", value: "+1 (470) 661-6320" },
      { label: "Directeur de la publication", value: "Direction Help Funds" },
    ],
  },
  {
    id: "hebergement",
    icon: Globe,
    title: "Hebergement",
    content: [
      { label: "Hebergeur frontend", value: "Vercel Inc." },
      { label: "Adresse", value: "340 Pine Street, Suite 701, San Francisco, CA 94104, USA" },
      { label: "Site web", value: "https://vercel.com" },
      { label: "Hebergeur CMS", value: "Railway Corp." },
      { label: "Site web", value: "https://railway.app" },
    ],
  },
  {
    id: "propriete",
    icon: Shield,
    title: "Propriete intellectuelle",
    text: "L ensemble du contenu de ce site (textes, images, videos, logos, icones) est la propriete exclusive de Help Funds ou de ses partenaires. Toute reproduction, distribution, modification ou utilisation de ce contenu sans autorisation ecrite prealable est strictement interdite et constitue une contrefacon sanctionnee par les lois en vigueur.",
  },
  {
    id: "responsabilite",
    icon: FileText,
    title: "Limitation de responsabilite",
    text: "Help Funds s efforce de fournir des informations exactes et a jour sur ce site. Toutefois, l ONG ne peut garantir l exactitude, la completude ou l actualite des informations diffusees. Help Funds se reserve le droit de modifier le contenu du site a tout moment et sans preavis.",
  },
  {
    id: "liens",
    icon: Globe,
    title: "Liens hypertextes",
    text: "Le site peut contenir des liens vers des sites externes. Help Funds n exerce aucun controle sur ces sites et decline toute responsabilite quant a leur contenu. La presence de ces liens ne constitue pas une approbation de ces sites par Help Funds.",
  },
  {
    id: "droit",
    icon: Shield,
    title: "Droit applicable",
    text: "Les presentes mentions legales sont soumises au droit americain. Tout litige relatif a l utilisation du site sera soumis a la juridiction competente des tribunaux de l Etat de Georgie, Etats-Unis.",
  },
];

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />Retour au site
          </Link>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium mb-6">
            <FileText className="w-4 h-4" />Document legal
          </div>
          <h1 className="font-heading font-bold text-white text-4xl mb-4">
            Mentions <span className="text-secondary-400">legales</span>
          </h1>
          <p className="text-white/60 text-sm">
            Derniere mise a jour : Janvier 2025
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {SECTIONS.map((section) => (
              <div key={section.id} className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="font-heading font-bold text-neutral-900 text-xl">{section.title}</h2>
                </div>
                {section.content ? (
                  <div className="space-y-3">
                    {section.content.map((item, i) => (
                      <div key={i} className="flex flex-col sm:flex-row gap-1 sm:gap-4 py-2 border-b border-neutral-50 last:border-0">
                        <span className="text-neutral-400 text-sm font-medium min-w-[160px]">{item.label}</span>
                        <span className="text-neutral-900 text-sm font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-600 leading-relaxed">{section.text}</p>
                )}
              </div>
            ))}

            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-primary-900 mb-1">Une question juridique ?</h3>
                  <p className="text-primary-700 text-sm mb-3">
                    Pour toute question relative aux mentions legales ou a l utilisation du site, contactez-nous.
                  </p>
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all">
                    Nous contacter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}