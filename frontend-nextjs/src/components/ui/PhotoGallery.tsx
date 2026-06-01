"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import Lightbox from "@/components/ui/Lightbox";

interface PhotoGalleryProps {
  images: string[];
  title?: string;
  type?: string;
}

export default function PhotoGallery({ images, title, type }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  return (
    <>
      <div className="bg-white rounded-2xl p-6 border border-neutral-100">
        <h2 className="font-heading font-bold text-neutral-900 text-xl mb-4 flex items-center gap-2">
          <Camera className="w-5 h-5 text-primary-600" />
          {type === "photo" ? "Galerie" : "Photos"} ({images.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className="relative h-40 rounded-xl overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <Image
                src={img}
                alt={`${title || "Photo"} ${i + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                    <Camera className="w-5 h-5 text-neutral-800" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                {i + 1}/{images.length}
              </div>
            </button>
          ))}
        </div>
        <p className="text-xs text-neutral-400 mt-3 text-center">
          Cliquez sur une image pour l ouvrir en grand
        </p>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          currentIndex={currentIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
          alt={title}
        />
      )}
    </>
  );
}