import Link from "next/link";
import { Shield, ArrowLeft, Lock, Eye, Database, UserCheck, Mail, Trash2, Bell } from "lucide-react";

export const metadata = {
  title: "Politique de confidentialite — Help Funds",
  description: "Politique de confidentialite et protection des donnees personnelles de Help Funds.",
};

const SECTIONS = [
  {
    icon: Database,
    title: "Donnees collectees",
    color: "bg-blue-50 border-blue-100",
    iconColor: "bg-blue-100 text-blue-600",
    items: [
      { subtitle: "Donnees de don", text: "Lors d un don : nom, prenom, email, adresse, montant du don, moyen de paiement. Ces donnees sont necessaires pour emettre votre recu fiscal." },
      { subtitle: "Donnees de contact", text: "Via le formulaire de contact : nom, prenom, email, telephone (optionnel), et contenu de votre message." },
      { subtitle: "Donnees newsletter", text: "Lors de l inscription a notre newsletter : adresse email uniquement." },
      { subtitle: "Donnees de navigation", text: "Donnees techniques anonymisees : adresse IP, navigateur, pages visitees, duree de visite. Utilises uniquement pour ameliorer le site." },
    ],
  },
  {
    icon: Eye,
    title: "Utilisation des donnees",
    color: "bg-emerald-50 border-emerald-100",
    iconColor: "bg-emerald-100 text-emerald-600",
    items: [
      { subtitle: "Traitement des dons", text: "Vos donnees permettent de traiter votre don, d emettre un recu fiscal et de vous informer de l impact de votre contribution." },
      { subtitle: "Communication", text: "Avec votre accord, nous vous envoyons notre newsletter et nos rapports d activite. Vous pouvez vous desabonner a tout moment." },
      { subtitle: "Amelioration du service", text: "Les donnees de navigation anonymisees nous permettent d ameliorer l experience utilisateur de notre site." },
      { subtitle: "Obligations legales", text: "Certaines donnees sont conservees pour respecter nos obligations comptables et fiscales (7 ans pour les donnees financieres)." },
    ],
  },
  {
    icon: Lock,
    title: "Protection des donnees",
    color: "bg-purple-50 border-purple-100",
    iconColor: "bg-purple-100 text-purple-600",
    items: [
      { subtitle: "Chiffrement SSL", text: "Toutes les communications entre votre navigateur et nos serveurs sont chiffrees via le protocole SSL/TLS 256 bits." },
      { subtitle: "Paiements securises", text: "Les donnees de carte bancaire ne transitent pas par nos serveurs. Elles sont traitees directement par nos prestataires de paiement certifies PCI-DSS." },
      { subtitle: "Acces limite", text: "Seuls les membres autorises de notre equipe ont acces aux donnees personnelles, dans le strict cadre de leurs fonctions." },
      { subtitle: "Hebergement securise", text: "Vos donnees sont hebergees sur des serveurs securises en Amerique du Nord, conformement aux standards internationaux." },
    ],
  },
  {
    icon: UserCheck,
    title: "Vos droits",
    color: "bg-amber-50 border-amber-100",
    iconColor: "bg-amber-100 text-amber-600",
    items: [
      { subtitle: "Droit d acces", text: "Vous pouvez demander a tout moment l acces aux donnees personnelles que nous detenons vous concernant." },
      { subtitle: "Droit de rectification", text: "Vous pouvez demander la correction de donnees inexactes ou incompletes vous concernant." },
      { subtitle: "Droit a l effacement", text: "Vous pouvez demander la suppression de vos donnees personnelles, sous reserve de nos obligations legales de conservation." },
      { subtitle: "Droit d opposition", text: "Vous pouvez vous opposer au traitement de vos donnees, notamment pour la prospection commerciale et la newsletter." },
    ],
  },
  {
    icon: Bell,
    title: "Cookies",
    color: "bg-orange-50 border-orange-100",
    iconColor: "bg-orange-100 text-orange-600",
    items: [
      { subtitle: "Cookies essentiels", text: "Necessaires au fonctionnement du site (session, securite). Ne peuvent pas etre desactives." },
      { subtitle: "Cookies analytiques", text: "Nous utilisons des outils d analyse anonymises pour comprendre comment les visiteurs utilisent notre site." },
      { subtitle: "Pas de cookies publicitaires", text: "Nous n utilisons aucun cookie publicitaire ou de suivi commercial. Votre navigation reste privee." },
    ],
  },
  {
    icon: Trash2,
    title: "Conservation des donnees",
    color: "bg-red-50 border-red-100",
    iconColor: "bg-red-100 text-red-600",
    items: [
      { subtitle: "Donnees de don", text: "10 ans conformement aux obligations comptables et fiscales applicables aux associations et ONG." },
      { subtitle: "Donnees de contact", text: "3 ans a compter du dernier contact, sauf exercice de votre droit a l effacement." },
      { subtitle: "Donnees newsletter", text: "Jusqu a votre desabonnement ou apres 3 ans d inactivite." },
      { subtitle: "Donnees de navigation", text: "13 mois maximum sous forme anonymisee." },
    ],
  },
];

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />Retour au site
          </Link>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />Protection des donnees
          </div>
          <h1 className="font-heading font-bold text-white text-4xl mb-4">
            Politique de <span className="text-secondary-400">confidentialite</span>
          </h1>
          <p className="text-white/60 text-sm">
            Derniere mise a jour : Janvier 2025
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-secondary-600" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-neutral-900 text-lg mb-2">Notre engagement</h2>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Help Funds s engage a proteger votre vie privee. Nous collectons uniquement les donnees strictement necessaires a nos activites et ne les vendons jamais a des tiers. Cette politique explique comment nous utilisons vos informations personnelles.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {SECTIONS.map((section) => (
              <div key={section.title} className={`bg-white rounded-2xl p-8 border-2 ${section.color} shadow-sm`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 ${section.iconColor} rounded-xl flex items-center justify-center`}>
                    <section.icon className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading font-bold text-neutral-900 text-xl">{section.title}</h2>
                </div>
                <div className="space-y-4">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 flex-shrink-0 mt-2" />
                      <div>
                        <span className="font-semibold text-neutral-900 text-sm">{item.subtitle} : </span>
                        <span className="text-neutral-600 text-sm leading-relaxed">{item.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-primary-900 mb-1">Exercer vos droits</h3>
                  <p className="text-primary-700 text-sm mb-3">
                    Pour exercer vos droits ou pour toute question sur notre politique de confidentialite, contactez notre responsable des donnees :
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="mailto:helpfunds17@gmail.com" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all">
                      <Mail className="w-4 h-4" />helpfunds17@gmail.com
                    </a>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-white border border-primary-200 hover:bg-primary-50 text-primary-700 font-semibold px-4 py-2 rounded-xl text-sm transition-all">
                      Formulaire de contact
                    </Link>
                  </div>
                  <p className="text-primary-600 text-xs mt-3">
                    Nous nous engageons a repondre a toute demande dans un delai maximum de 30 jours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}