"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Zap } from "lucide-react";

export default function TopBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-r from-secondary-600 via-secondary-500 to-secondary-600 text-white py-2.5 px-4 z-[60]">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm font-medium">
        <Zap className="w-4 h-4 fill-white flex-shrink-0 animate-pulse" />
        <span>
          🚨 Campagne urgente en cours —{" "}
          <span className="font-bold">École de Kano</span> à 70% de son objectif.
        </span>
        <Link
          href="/don"
          className="hidden sm:inline-flex items-center gap-1 bg-white text-secondary-700 font-bold px-3 py-1 rounded-full text-xs hover:bg-secondary-50 transition-colors ml-1"
        >
          Contribuer maintenant →
        </Link>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}