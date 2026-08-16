import Link from "next/link";
import { FileText, ArrowLeft, Shield, CreditCard, Globe, AlertTriangle, RefreshCw, Mail } from "lucide-react";

export const metadata = {
  title: "Conditions d utilisation — Help Funds",
  description: "Conditions d utilisation du site Help Funds ONG Internationale.",
};

const SECTIONS = [
  {
    id: "acceptation",
    icon: FileText,
    title: "Acceptation des conditions",
    text: "En accedant et en utilisant ce site, vous acceptez sans reserve les presentes conditions d utilisation. Si vous n acceptez pas ces conditions, nous vous invitons a ne pas utiliser ce site.",
  },
  {
    id: "utilisation",
    icon: Globe,
    title: "Utilisation du site",
    text: "Ce site est destine a informer sur les actions de Help Funds et a permettre la realisation de dons en ligne. Vous vous engagez a utiliser ce site conformement a la loi et a ne pas porter atteinte a son bon fonctionnement, notamment par tout comportement frauduleux ou malveillant.",
  },
  {
    id: "dons",
    icon: CreditCard,
    title: "Dons et paiements",
    text: "Les paiements effectues sur ce site sont traites par des prestataires tiers securises (notamment Stripe). Help Funds ne stocke jamais vos donnees bancaires completes. Un recu peut etre transmis par email suite a votre don. Sauf erreur technique averee, les dons effectues ne sont pas remboursables.",
  },
  {
    id: "propriete",
    icon: Shield,
    title: "Propriete intellectuelle",
    text: "Le contenu de ce site (textes, images, logos, mise en page) est protege par le droit de la propriete intellectuelle. Toute reproduction ou utilisation sans autorisation prealable est interdite. Pour plus de details, consultez nos mentions legales.",
  },
  {
    id: "responsabilite",
    icon: AlertTriangle,
    title: "Limitation de responsabilite",
    text: "Help Funds met tout en oeuvre pour assurer la disponibilite et l exactitude des informations du site, sans garantie absolue de continuite de service ou d absence d erreur. L utilisation du site se fait sous votre propre responsabilite.",
  },
  {
    id: "modification",
    icon: RefreshCw,
    title: "Modification des conditions",
    text: "Help Funds se reserve le droit de modifier les presentes conditions d utilisation a tout moment. Les modifications prennent effet des leur publication sur cette page. Nous vous invitons a la consulter regulierement.",
  },
  {
    id: "droit",
    icon: Shield,
    title: "Droit applicable",
    text: "Les presentes conditions sont soumises au droit americain. Tout litige relatif a leur interpretation ou leur execution releve de la competence des tribunaux de l Etat de Georgie, Etats-Unis.",
  },
];

export default function ConditionsUtilisationPage() {
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
            Conditions <span className="text-secondary-400">d utilisation</span>
          </h1>
          <p className="text-white/60 text-sm">
            Derniere mise a jour : Juillet 2026
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
                <p className="text-neutral-600 leading-relaxed">{section.text}</p>
              </div>
            ))}

            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-primary-900 mb-1">Une question ?</h3>
                  <p className="text-primary-700 text-sm mb-3">
                    Pour toute question relative a ces conditions d utilisation, contactez-nous.
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