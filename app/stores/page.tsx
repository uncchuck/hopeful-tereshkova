// /app/stores/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Product, StoreProfile } from "@/types";
import { getProducts, getStore } from "@/app/lib/localStore";

type Store = {
  id: number;
  avatar: string;
  username: string;
  followers: number;
  hasTryOn: boolean;
  coverImage: string;
};

const ALL_STORES: Store[] = [
  {
    id: 1,
    avatar: "/placeholder.png",
    username: "luxestreet",
    followers: 24500,
    hasTryOn: true,
    coverImage: "/placeholder.png",
  },
  {
    id: 2,
    avatar: "/placeholder.png",
    username: "vintagevault",
    followers: 18900,
    hasTryOn: true,
    coverImage: "/placeholder.png",
  },
  {
    id: 3,
    avatar: "/placeholder.png",
    username: "cyberpunk",
    followers: 31200,
    hasTryOn: true,
    coverImage: "/placeholder.png",
  },
  {
    id: 4,
    avatar: "/placeholder.png",
    username: "retrowave",
    followers: 12800,
    hasTryOn: false,
    coverImage: "/placeholder.png",
  },
  {
    id: 5,
    avatar: "/placeholder.png",
    username: "streetgoth",
    followers: 19600,
    hasTryOn: true,
    coverImage: "/placeholder.png",
  },
  {
    id: 6,
    avatar: "/placeholder.png",
    username: "minimalist",
    followers: 15400,
    hasTryOn: true,
    coverImage: "/placeholder.png",
  },
];

const CATEGORIES = [
  "All Stores",
  "Streetwear",
  "Vintage",
  "Y2K",
  "Designer",
  "Techcore",
  "Sustainable",
  "Limited Edition",
];

function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-3 py-1.5 rounded-full text-sm border transition",
        active
          ? "border-white text-black bg-white"
          : "border-white/15 text-zinc-300 hover:border-white/40 hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Icon({ name }: { name: "search" | "upload" | "star" | "trending" }) {
  const map = { search: "🔎", upload: "⬆️", star: "⭐", trending: "📈" };
  return <span className="mr-2">{map[name]}</span>;
}

function StoreCard({ s }: { s: Store }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
      <div
        className="w-full aspect-[4/3] bg-neutral-800"
        style={{
          backgroundImage: `url(${s.coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <img
            src={s.avatar}
            alt={s.username}
            className="h-9 w-9 rounded-full bg-neutral-800 object-cover"
          />
          <div className="text-sm">
            <div className="text-white font-medium">@{s.username}</div>
            <div className="text-zinc-400">
              {s.followers.toLocaleString()} followers
            </div>
          </div>
          {s.hasTryOn && (
            <span className="ml-auto text-[11px] rounded-full border border-white/20 px-2 py-0.5 text-zinc-200">
              Try-On
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <button className="px-3 py-1.5 rounded-lg border border-white/20 text-sm text-white hover:bg-white hover:text-black transition">
            View Store
          </button>
          {s.hasTryOn ? (
            <button className="px-3 py-1.5 rounded-lg border border-white/20 text-sm text-white hover:bg-white hover:text-black transition">
              Try On
            </button>
          ) : (
            <button
              disabled
              className="px-3 py-1.5 rounded-lg border border-white/10 text-sm text-zinc-400 cursor-not-allowed"
            >
              Not Available
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StoresPage() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All Stores");

  // NEW: pull the user’s store profile + listings
  const [profile, setProfile] = useState<StoreProfile | null>(null);
  const [myItems, setMyItems] = useState<Product[]>([]);
  useEffect(() => {
    setProfile(getStore());
    setMyItems(getProducts());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_STORES.filter((s) =>
      q ? s.username.toLowerCase().includes(q) : true
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="pt-24 pb-8 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Discover unique storefronts from fashion entrepreneurs around the
              world.
            </p>
          </div>

          {/* Upload CTA */}
          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-8 mb-8 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="text-3xl mb-2">Upload to Your Closet</div>
              <p className="text-zinc-400 mb-6">
                Turn your wardrobe into a business. Start selling and trading
                today.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/closet"
                  className="px-5 py-2 rounded-xl border border-white/20 hover:bg-white hover:text-black transition"
                >
                  <Icon name="upload" />
                  Create Store
                </Link>
                <Link
                  href="/stores"
                  className="px-5 py-2 rounded-xl border border-white/20 hover:bg-white hover:text-black transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Search + actions */}
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md w-full">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                    <Icon name="search" />
                  </span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search stores, sellers, styles..."
                    className="w-full pl-10 pr-3 py-2 rounded-xl bg-neutral-900 border border-white/15 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-3 py-2 rounded-xl border border-white/15 text-sm text-zinc-300 hover:border-white/40 hover:text-white transition">
                  <Icon name="star" />
                  Top Rated
                </button>
                <button className="px-3 py-2 rounded-xl border border-white/15 text-sm text-zinc-300 hover:border-white/40 hover:text-white transition">
                  <Icon name="trending" />
                  Trending
                </button>
              </div>
            </div>

            {/* Category chips */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Chip
                  key={c}
                  active={activeCat === c}
                  onClick={() => setActiveCat(c)}
                >
                  {c}
                </Chip>
              ))}

              {/* NEW: Jump link to “Your Listings” */}
              <a
                href="#my-listings"
                className="px-3 py-1.5 rounded-full text-sm border border-white/20 text-white hover:bg-white hover:text-black transition"
              >
                My Listings
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Stores Grid */}
      <div className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Featured Stores</h2>
            <span className="text-xs rounded-full border border-white/15 px-2 py-1 text-zinc-400">
              {filtered.length} stores
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filtered.map((s) => (
              <StoreCard key={s.id} s={s} />
            ))}
          </div>

          {/* ---------- Your Listings (from localStorage) ---------- */}
          <section id="my-listings" className="mt-16">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Your Listings
                </h2>
                {profile?.handle ? (
                  <p className="text-sm text-zinc-400 mt-1">
                    Viewing items from{" "}
                    <span className="text-white">{profile.handle}</span>
                  </p>
                ) : (
                  <p className="text-sm text-zinc-400 mt-1">
                    No store profile yet — create one to start selling.
                  </p>
                )}
              </div>

              <a
                href="/closet"
                className="px-4 py-2 rounded-xl border border-white/20 text-sm text-white hover:bg-white hover:text-black transition"
              >
                Manage Closet
              </a>
            </div>

            {myItems.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-neutral-900 p-8 text-center">
                <p className="text-zinc-300 mb-4">
                  You don’t have any listings yet.
                </p>
                <a
                  href="/closet"
                  className="inline-block px-4 py-2 rounded-xl border border-white/20 text-sm text-white hover:bg-white hover:text-black transition"
                >
                  Create Store & Add Listing
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {myItems.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-2xl overflow-hidden border border-white/10 bg-neutral-900"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.imageDataUrl}
                      alt={p.title}
                      className="w-full aspect-[4/3] object-cover bg-neutral-800"
                    />
                    <div className="p-4">
                      <div className="text-white font-medium">{p.title}</div>
                      <div className="text-zinc-400 text-sm">${p.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
