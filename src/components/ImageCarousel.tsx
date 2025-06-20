"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
};

export default function ImageCarousel({ images }: Props) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg shadow-lg">
      <div className="relative w-full h-full">
        <Image
          src={images[current]}
          alt={`Slide ${current + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      <button
        onClick={prev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-10"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={next}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-10"
      >
        <ChevronRight />
      </button>

      <div className="absolute bottom-3 w-full flex justify-center gap-2 z-10">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full transition-all ${
              current === idx ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
