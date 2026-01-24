// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import FeedSection from "@/app/components/FeedSection";
import HeroCarousel from "@/app/components/HeroCarousel";
import { TOP_SELLERS } from "./Data/topSellers";

/* ---------- Reactions helper ---------- */
function Reactions() {
  const [likes, setLikes] = useState<number | null>(null);
  const [comments, setComments] = useState<number | null>(null);

  useEffect(() => {
    setLikes(Math.floor(Math.random() * 500));
    setComments(Math.floor(Math.random() * 100));
  }, []);

  return (
    <div className="flex gap-4 text-zinc-400 text-sm">
      <span>{likes ?? "—"} likes</span>
      <span>{comments ?? "—"} comments</span>
    </div>
  );
}

/* ---------- Local mapping so "View" always works ---------- */
// If you change your demo IDs, just update this map.
const SELLER_TO_ID: Record<string, number> = {
  "@EYBL Gear": 1,
  "@StyzeP": 2,
  "@byV-Malik": 3,
  "All Denim": 4,
};
const idForSeller = (displayName: string) => SELLER_TO_ID[displayName];

export default function HomePage() {
  return (
    <main className="bg-black text-white">
      {/* --- NEW top bar carousel --- */}
      <HeroCarousel />

      {/* --- HERO copy (keep CTAs) --- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -inset-20 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs tracking-widest text-zinc-400 uppercase mb-4">
                Style already exists
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                We are just <br className="hidden sm:block" />
                paying attention.
              </h1>

              <p className="mt-5 text-lg text-zinc-300 max-w-xl">
                A daily archive.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/community"
                  className="rounded-xl border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black transition"
                >
                  Explore Community
                </Link>
                <Link
                  href="/stores"
                  className="rounded-xl border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black transition"
                >
                  Open Your Store
                </Link>
                <button
                  onClick={() =>
                    alert("Feature Not Available — Virtual Try-On coming soon")
                  }
                  className="rounded-xl border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black transition"
                >
                  Virtual Try-On
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- TOP OUTFITS / ANIMATED MARQUEE ---------- */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold">Top Outfits This Week</h2>
          <Reactions />
        </div>

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {[...TOP_SELLERS, ...TOP_SELLERS].map((seller, i) => {
              const targetId = idForSeller(seller.name);

              return (
                <div
                  key={`${seller.id}-${i}`}
                  className="bg-zinc-900 rounded-xl p-3 w-[250px] flex-shrink-0 border border-white/10 shadow-lg hover:shadow-xl transition-all"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={seller.image}
                    alt={seller.name}
                    className="rounded-lg mb-2 w-full h-40 object-cover bg-neutral-800"
                  />

                  <div className="text-white text-sm font-semibold">
                    {seller.name}
                  </div>
                  <div className="text-zinc-400 text-xs">{seller.category}</div>
                  <div className="text-zinc-300 text-xs mb-2">
                    {seller.followers.toLocaleString()} followers
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={() =>
                        alert(
                          "Feature Not Available — Virtual Try-On coming soon"
                        )
                      }
                      className="bg-white text-black px-3 py-1 rounded-full text-sm hover:bg-zinc-200 transition"
                    >
                      Try On
                    </button>

                    {targetId ? (
                      <Link
                        href={`/item/${targetId}`}
                        className="text-cyan-400 text-sm hover:underline"
                      >
                        View
                      </Link>
                    ) : (
                      <span className="text-zinc-500 text-sm">View</span>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ---------- COMMUNITY PREVIEW ---------- */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Explore Community</h2>
        </div>
        <FeedSection />
      </section>

      {/* ---------- CTA STRIP ---------- */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-2xl border border-white/10 bg-neutral-900 p-8 text-center">
          <h3 className="text-2xl font-semibold">
            Launch Your Storefront Today
          </h3>
          <p className="mt-2 text-zinc-300">
            Turn your wardrobe into a business in minutes.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/stores"
              className="rounded-xl border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black transition"
            >
              Open Stores
            </Link>
            <Link
              href="/closet"
              className="rounded-xl border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black transition"
            >
              Create a Listing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
