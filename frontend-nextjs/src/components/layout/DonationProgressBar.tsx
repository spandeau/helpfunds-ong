"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, TrendingUp, X } from "lucide-react";

const GOAL = 50000;
const INITIAL = 41500;

export default function DonationProgressBar() {
  const [raised, setRaised] = useState(INITIAL);
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    const interval = setInterval(() => {
      setRaised((prev) => {
        const next = prev + Math.floor(Math.random() * 50 + 10);
        return next >= GOAL ? GOAL : next;
      });
    }, 8000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!visible || closed) return null;

  const percent = Math.min(Math.round((raised / GOAL) * 100), 100);
  const remaining = GOAL - raised;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-neutral-100 p-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-secondary-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                Campagne en cours
              </p>
              <p className="text-sm font-bold text-neutral-900">
                Eau potable — Sahel
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-neutral-400">Objectif</p>
              <p className="text-sm font-bold text-neutral-900">
                {GOAL.toLocaleString("fr-FR")}€
              </p>
            </div>
            <button
              onClick={() => setClosed(true)}
              className="p-1.5 hover:bg-neutral-100 rounded-lg transition-colors text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="mb-3">
          <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-secondary-500 to-secondary-400 rounded-full transition-all duration-1000 relative"
              style={{ width: `${percent}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow border-2 border-secondary-500" />
            </div>
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs font-bold text-secondary-600">
              {raised.toLocaleString("fr-FR")}€ collectés
            </span>
            <span className="text-xs text-neutral-400">
              {percent}% — encore {remaining.toLocaleString("fr-FR")}€
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["MD", "JO", "SM", "PL", "AB"].map((avatar, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white flex items-center justify-center text-white text-[8px] font-bold"
                >
                  {avatar}
                </div>
              ))}
            </div>
            <span className="text-xs text-neutral-500">
              <span className="font-semibold text-neutral-700">247</span> donateurs
            </span>
            <span className="flex items-center gap-1 text-xs text-secondary-600 font-medium">
              <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full animate-pulse" />
              En direct
            </span>
          </div>
          <Link
            href="/don"
            className="inline-flex items-center gap-1.5 bg-secondary-600 hover:bg-secondary-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all hover:shadow-md"
          >
            <Heart className="w-3 h-3 fill-white" />
            Contribuer
          </Link>
        </div>
      </div>
    </div>
  );
}