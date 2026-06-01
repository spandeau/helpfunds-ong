"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  alt?: string;
}

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext, alt }: LightboxProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Fermer */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Compteur */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-4 py-1.5 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Flèche gauche */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}

      {/* Image principale */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full mx-16 rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={alt || `Photo ${currentIndex + 1}`}
          width={1200}
          height={800}
          className="object-contain w-full h-full max-h-[85vh]"
          priority
        />
      </div>

      {/* Flèche droite */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}

      {/* Miniatures */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); if (i < currentIndex) { for(let j = 0; j < currentIndex - i; j++) onPrev(); } else { for(let j = 0; j < i - currentIndex; j++) onNext(); } }}
              className={`w-12 h-8 rounded-lg overflow-hidden border-2 transition-all ${i === currentIndex ? "border-white scale-110" : "border-white/30 hover:border-white/60"}`}
            >
              <Image src={img} alt={`Miniature ${i + 1}`} width={48} height={32} className="object-cover w-full h-full" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}