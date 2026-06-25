'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Send, Check, MessageSquare } from 'lucide-react';
import { sendContactMessage } from '@/lib/contact';

const REASONS = ['Faire un don', 'Devenir benevole', 'Proposer un partenariat', 'Demander des informations', 'Signaler un probleme', 'Autre'];

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
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await sendContactMessage(form);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError('Une erreur est survenue. Veuillez reessayer ou nous contacter directement par email.');
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-neutral-50 flex items-center justify-center pt-20">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-secondary-600" />
          </div>
          <h1 className="font-heading font-bold text-neutral-900 text-2xl mb-3">Message envoye !</h1>
          <p className="text-neutral-500 mb-8">Merci pour votre message. Notre equipe vous repondra dans les 24 heures.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-3 rounded-xl transition-all">
            Retour a l accueil
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            Nous sommes a votre ecoute
          </div>
          <h1 className="font-heading font-bold text-white text-4xl md:text-5xl mb-4">
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
                    <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl border border-neutral-100 hover:bg-neutral-50 transition-all group">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{ backgroundColor: s.bg }}>
                        {s.short}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">{s.name}</p>
                        <p className="text-xs text-neutral-400">{s.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm">
                <h2 className="font-heading font-bold text-neutral-900 text-xl mb-6">Envoyez-nous un message</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Prenom *</label>
                      <input
                        type="text"
                        required
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors text-sm"
                        placeholder="Jean"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Nom *</label>
                      <input
                        type="text"
                        required
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors text-sm"
                        placeholder="Dupont"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors text-sm"
                        placeholder="jean@exemple.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Telephone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors text-sm"
                        placeholder="+33 6 00 00 00 00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Objet de votre message *</label>
                    <select
                      required
                      value={form.reason}
                      onChange={(e) => setForm({ ...form, reason: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors text-sm bg-white"
                    >
                      <option value="">Selectionnez un motif</option>
                      {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors text-sm resize-none"
                      placeholder="Decrivez votre demande en detail..."
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}