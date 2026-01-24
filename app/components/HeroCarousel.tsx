"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Slide = {
  eyebrow?: string;
  heading: string;
  sub?: string;
  cta: { label: string; href: string; variant?: "primary" | "ghost" };
};

const SLIDES: Slide[] = [
  {
    eyebrow: "EXHIBIT • NEW ENTRIES",
    heading: "Recently Archived — NYC",
    sub: "Fresh captures, cataloged daily. Study the look, then access pieces when available.",
    cta: { label: "Browse Archive", href: "/community", variant: "primary" },
  },
  {
    eyebrow: "FEATURE • TRY-ON LAYER",
    heading: "Try looks before you chase them.",
    sub: "Virtual try-on turns inspiration into access — without breaking the archive.",
    cta: { label: "Virtual Try-On", href: "/virtual-try-on", variant: "ghost" },
  },
  {
    eyebrow: "CONTRIBUTORS • STYLISTS",
    heading: "Archive looks. Make pieces accessible.",
    sub: "Create a storefront tied to entries — culture first, commerce second.",
    cta: { label: "Become a Stylist", href: "/stores", variant: "primary" },
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  // Auto-advance every 6s
  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function start() {
    stop();
    timerRef.current = window.setTimeout(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 6000);
  }

  function stop() {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }

  function prev() {
    stop();
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }

  function next() {
    stop();
    setIndex((i) => (i + 1) % SLIDES.length);
  }

  const s = SLIDES[index];

  return (
    <section
      className="w-full border-b border-white/10 bg-black"
      aria-label="Site highlights"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative h-[150px] sm:h-[170px] lg:h-[190px] flex items-center justify-center text-center">
          {/* Left/Right arrows */}
          <button
            aria-label="Previous highlight"
            onClick={prev}
            className="absolute left-2 sm:left-3 rounded-full border border-white/15 text-zinc-300 hover:text-white hover:border-white/40 px-2 py-1"
          >
            ‹
          </button>
          <button
            aria-label="Next highlight"
            onClick={next}
            className="absolute right-2 sm:right-3 rounded-full border border-white/15 text-zinc-300 hover:text-white hover:border-white/40 px-2 py-1"
          >
            ›
          </button>

          {/* Content */}
          <div className="space-y-2 max-w-2xl">
            {s.eyebrow && (
              <div className="text-[11px] tracking-widest text-zinc-400 uppercase">
                {s.eyebrow}
              </div>
            )}

            <h2 className="text-lg sm:text-xl font-semibold">{s.heading}</h2>

            {s.sub && (
              <p className="text-sm text-zinc-400 leading-snug px-2 sm:px-0">
                {s.sub}
              </p>
            )}

            <div className="flex items-center justify-center gap-2 pt-1">
              <Link
                href={s.cta.href}
                className={
                  s.cta.variant === "ghost"
                    ? "rounded-md border border-white/20 px-3 py-1.5 text-sm text-white hover:bg-white hover:text-black transition"
                    : "rounded-md border border-white/20 px-3 py-1.5 text-sm text-black bg-white hover:bg-white/90 transition"
                }
              >
                {s.cta.label}
              </Link>
            </div>
          </div>

          {/* Dots */}
          <div className="absolute -bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => {
                  stop();
                  setIndex(i);
                }}
                className={[
                  "h-1.5 w-1.5 rounded-full",
                  i === index ? "bg-white" : "bg-white/30",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
