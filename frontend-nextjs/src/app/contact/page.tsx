'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Send, Check, MessageSquare, Heart } from 'lucide-react';

const REASONS = ['Faire un don','Devenir benevole','Proposer un partenariat','Demander des informations','Signaler un probleme','Autre'];

const SOCIALS = [
  { name: 'Facebook', handle: '@HelpFunds', href: 'https://www.facebook.com/share/1bjtHyaTpU/?mibextid=wwXIfr', bg: '#1877F2', short: 'F' },
  { name: 'Instagram', handle: '@help_funds_officiel', href: 'https://www.instagram.com/help_funds_officiel', bg: '#E1306C', short: 'IG' },
  { name: 'X Twitter', handle: '@helpfunds_', href: 'https://x.com/helpfunds_?s=21', bg: '#000000', short: 'X' },
  { name: 'YouTube', handle: '@help_funds', href: 'https://www.youtube.com/@help_funds', bg: '#FF0000', short: 'YT' },
  { name: 'TikTok', handle: '@helpfunds', href: 'https://www.tiktok.com/@helpfunds', bg: '#010101', short: 'TK' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', reason: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <main>
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            Nous sommes a votre ecoute
          </div>
          <h1 className="font-heading font-bold text-white mb-4">
            Contactez <span className="text-secondary-400">Help Funds</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Une question, un partenariat, une envie de nous rejoindre ? Notre equipe repond sous 24h.
          </p>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1 space-y-5">
              <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
                <h2 className="font-heading font-bold text-neutral-900 text-lg mb-5">Nos coordonnees</h2>
                <div className="space-y-4">
                  <a href="mailto:helpfunds17@gmail.com" className="flex items-start gap-3 group">
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 font-medium mb-0.5">Email</p>
                      <p className="text-sm font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">helpfunds17@gmail.com</p>
                    </div>
                  </a>
                  <a href="tel:+14706616320" className="flex items-start gap-3 group">
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 font-medium mb-0.5">Telephone</p>
                      <p className="text-sm font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">+1 (470) 661-6320</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 font-medium mb-0.5">Adresse</p>
                      <p className="text-sm font-semibold text-neutral-900">Georgia, United States</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 font-medium mb-0.5">Horaires</p>
                      <p className="text-sm font-semibold text-neutral-900">Lun - Ven : 9h - 18h (EST)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
                <h2 className="font-heading font-bold text-neutral-900 text-lg mb-4">Suivez-nous</h2>
                <div className="flex flex-col gap-3">
                  {SOCIALS.map((s) => (
                    <div key={s.name} className="flex items-center gap-3 p-3 rounded-xl border border-neutral-100 hover:bg-neutral-50 transition-all">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{ backgroundColor: s.bg }}>
                        {s.short}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-neutral-900">{s.name}</p>
                        <p className="text-xs text-neutral-400 truncate">{s.handle}</p>
                      </div>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-xs text-primary-600 hover:text-primary-700 font-semibold flex-shrink-0">
                        Voir
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary-900 to-primary-950 rounded-2xl p-6 text-white">
                <Heart className="w-8 h-8 text-secondary-400 fill-secondary-400 mb-3" />
                <h3 className="font-heading font-bold text-lg mb-2">Faire un don</h3>
                <p className="text-white/70 text-sm mb-4">Chaque contribution compte et change des vies.</p>
                <Link href="/don" className="flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-3 rounded-xl transition-all">
                  <Heart className="w-4 h-4 fill-white" />Faire un don maintenant
                </Link>
              </div>
            </div>

            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white rounded-2xl p-10 border border-neutral-100 shadow-sm text-center">
                  <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Check className="w-10 h-10 text-secondary-600" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-neutral-900 mb-3">Message envoye !</h3>
                  <p className="text-neutral-500 mb-6">Notre equipe vous repondra dans les 24 heures.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ firstName: '', lastName: '', email: '', phone: '', reason: '', message: '' }); }} className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-all">
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm">
                  <h2 className="font-heading font-bold text-neutral-900 text-xl mb-6">Envoyez-nous un message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Prenom</label>
                        <input type="text" required placeholder="Jean" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Nom</label>
                        <input type="text" required placeholder="Dupont" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Email</label>
                        <input type="email" required placeholder="jean@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Telephone</label>
                        <input type="tel" placeholder="+1 470 000 0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Sujet</label>
                      <select required value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm bg-white">
                        <option value="">Selectionnez un sujet</option>
                        {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Message</label>
                      <textarea required rows={5} placeholder="Ecrivez votre message ici..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm resize-none" />
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
                      <input type="checkbox" required id="privacy" className="mt-1 w-4 h-4 accent-primary-600" />
                      <label htmlFor="privacy" className="text-sm text-neutral-600">J accepte que mes donnees soient utilisees pour traiter ma demande.</label>
                    </div>
                    <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white font-bold py-4 rounded-2xl transition-all text-base">
                      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-5 h-5" />}
                      {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                    </button>
                  </form>
                </div>
              )}
              <div className="mt-6 bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
                <div className="h-56 bg-gradient-to-br from-primary-50 to-neutral-100 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                    <p className="font-semibold text-neutral-700">Help Funds</p>
                    <p className="text-neutral-500 text-sm mb-4">Georgia, United States</p>
                    <a href="https://maps.google.com/maps?q=Georgia,+United+States" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all">
                      <MapPin className="w-4 h-4" />Ouvrir dans Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-neutral-900 text-2xl text-center mb-8">Questions frequentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { q: 'Quel est le delai de reponse ?', r: 'Notre equipe repond sous 24 heures ouvrables.' },
              { q: 'Comment faire un don ?', r: 'Rendez-vous sur notre page Faire un don pour contribuer en ligne.' },
              { q: 'Comment devenir benevole ?', r: 'Contactez-nous en selectionnant Devenir benevole comme sujet.' },
              { q: 'Proposer un partenariat ?', r: 'Nous sommes ouverts a tous les partenariats. Contactez-nous.' },
            ].map((faq) => (
              <div key={faq.q} className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100">
                <h3 className="font-semibold text-neutral-900 text-sm mb-2">{faq.q}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{faq.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}