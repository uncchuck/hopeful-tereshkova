"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ===== Modal ===== */
function NotifyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-white/10 rounded-2xl shadow-xl p-6 max-w-sm w-full text-white">
        <h2 className="text-xl font-semibold mb-2">Feature Not Available</h2>
        <p className="text-zinc-400 text-sm mb-4">
          Virtual Try-On isn’t live yet — leave your email and we’ll notify you.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-white/15 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40 mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-white/20 text-sm hover:bg-white hover:text-black transition"
          >
            Close
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white text-black text-sm hover:bg-zinc-200 transition"
          >
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== Small helpers ===== */
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

function Reactions() {
  const [likes, setLikes] = useState<number | null>(null);
  const [comments, setComments] = useState<number | null>(null);
  useEffect(() => {
    setLikes(Math.floor(Math.random() * 500));
    setComments(Math.floor(Math.random() * 100));
  }, []);
  return <div className="flex gap-4 text-zinc-400 text-sm"></div>;
}

/* ===== Types ===== */
type Seller = {
  id: number;
  avatar: string;
  username: string;
  followers: number;
  hasTryOn: boolean;
  coverImage: string;
};

type Product = {
  id: number;
  image: string;
  title: string;
  seller: string;
  price: number;
  tags: string[];
  hasTryOn: boolean;
};

/* ===== Page ===== */
export default function CommunityPage() {
  // modal state (used by all “Try On” buttons)
  const [notifyOpen, setNotifyOpen] = useState(false);

  // Top Sellers (animated row)
  const topSellers = [
    {
      id: 1,
      name: "@EYBL Gear",
      followers: 1200,
      category: "Basketball Gear",
      image: "/eybl.jpg",
      hasTryOn: true,
    },
    {
      id: 2,
      name: "@StyzeP",
      followers: 856,
      category: "Early 2000s",
      image: "/styze.jpg",
      hasTryOn: true,
    },
    {
      id: 3,
      name: "@byV-Malik",
      followers: 2100,
      category: "Accessories",
      image: "/accessories.jpg",
      hasTryOn: true,
    },
    {
      id: 4,
      name: "All Denim",
      followers: 925,
      category: "70s & 80s",
      image: "/denim.jpg",
      hasTryOn: false,
    },
  ];

  const trendingTags = [
    "90s",
    "Y2K",
    "Techcore",
    "Vintage",
    "Streetwear",
    "Designer",
    "Sustainable",
  ];

  const sellers: Seller[] = [
    {
      id: 1,
      avatar: "/placeholder.png",
      username: "retromaster",
      followers: 8900,
      hasTryOn: true,
      coverImage: "/placeholder.png",
    },
    {
      id: 2,
      avatar: "/placeholder.png",
      username: "cyberstyle",
      followers: 12400,
      hasTryOn: true,
      coverImage: "/placeholder.png",
    },
    {
      id: 3,
      avatar: "/placeholder.png",
      username: "y2kqueen",
      followers: 15600,
      hasTryOn: false,
      coverImage: "/placeholder.png",
    },
  ];

  const products: Product[] = [
    {
      id: 1,
      image: "/placeholder.png",
      title: "Vintage Band Tee Collection",
      seller: "retromaster",
      price: 45,
      tags: ["vintage", "90s"],
      hasTryOn: true,
    },
    {
      id: 2,
      image: "/placeholder.png",
      title: "Cyber Tech Accessories",
      seller: "cyberstyle",
      price: 128,
      tags: ["techcore"],
      hasTryOn: true,
    },
    {
      id: 3,
      image: "/placeholder.png",
      title: "Y2K Platform Boots",
      seller: "y2kqueen",
      price: 89,
      tags: ["y2k", "boots"],
      hasTryOn: false,
    },
    {
      id: 4,
      image: "/placeholder.png",
      title: "Designer Oversized Hoodie",
      seller: "streetluxe",
      price: 234,
      tags: ["designer", "streetwear"],
      hasTryOn: true,
    },
    {
      id: 5,
      image: "/placeholder.png",
      title: "Grunge Flannel Set",
      seller: "grungestyle",
      price: 67,
      tags: ["grunge", "90s"],
      hasTryOn: false,
    },
    {
      id: 6,
      image: "/placeholder.png",
      title: "Neon Cyber Goggles",
      seller: "cyberpunk",
      price: 45,
      tags: ["techcore", "accessories"],
      hasTryOn: true,
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white">
      {/* ===== Top Sellers (animated) ===== */}
      <section className="mb-10 overflow-hidden">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-white text-xl font-bold">
            Find Top Sellers This Week
          </h2>
          <Reactions />
        </div>

        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {[...topSellers, ...topSellers].map((seller, index) => (
            <div
              key={`${seller.id}-${index}`}
              className="bg-zinc-900 rounded-xl p-3 w-[250px] flex-shrink-0 border border-white/10 shadow-lg hover:shadow-xl transition-all"
            >
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
                {seller.hasTryOn ? (
                  <button
                    onClick={() => setNotifyOpen(true)}
                    className="bg-white text-black px-3 py-1 rounded-full text-sm hover:bg-zinc-200 transition"
                  >
                    Try On
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-3 py-1 rounded-full text-sm border border-white/10 text-zinc-400 cursor-not-allowed"
                  >
                    Not Available
                  </button>
                )}
                <button className="text-sm underline underline-offset-4">
                  View
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ===== Search / view toggles (simple, no icons) ===== */}
      <section className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md w-full">
            <input
              placeholder="Search items, sellers, styles..."
              className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-white/15 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 rounded-xl border border-white/15 text-sm text-zinc-300 hover:border-white/40 hover:text-white transition">
              Filters
            </button>
            <div className="flex rounded-xl overflow-hidden border border-white/15">
              <button className="px-3 py-2 text-sm text-zinc-300 border-r border-white/15 hover:text-white">
                Grid
              </button>
              <button className="px-3 py-2 text-sm text-zinc-300 hover:text-white">
                List
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Trending Tags ===== */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold mb-4">Trending Tags</h3>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map((tag) => (
            <Chip key={tag}>#{tag}</Chip>
          ))}
        </div>
      </section>

      {/* ===== Featured Sellers ===== */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sellers.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl overflow-hidden border border-white/10 bg-neutral-900"
            >
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
                    <button
                      onClick={() => setNotifyOpen(true)}
                      className="px-3 py-1.5 rounded-lg border border-white/20 text-sm text-white hover:bg-white hover:text-black transition"
                    >
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
          ))}
        </div>
      </section>

      {/* ===== Latest Drops ===== */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Latest Drops</h2>
          <span className="text-xs rounded-full border border-white/15 px-2 py-1 text-zinc-400">
            {products.length} items
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl overflow-hidden border border-white/10 bg-neutral-900"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full aspect-[4/3] object-cover bg-neutral-800"
              />
              <div className="p-4">
                <div className="text-white font-medium">{p.title}</div>
                <div className="text-zinc-400 text-sm">@{p.seller}</div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm text-white">${p.price}</div>
                  <div className="flex gap-1">
                    {p.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] rounded-full border border-white/15 px-2 py-0.5 text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <button className="px-3 py-1.5 rounded-lg border border-white/20 text-sm text-white hover:bg-white hover:text-black transition">
                    View
                  </button>
                  {p.hasTryOn ? (
                    <button
                      onClick={() => setNotifyOpen(true)}
                      className="px-3 py-1.5 rounded-lg border border-white/20 text-sm text-white hover:bg-white hover:text-black transition"
                    >
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
          ))}
        </div>
      </section>

      {/* Load more */}
      <div className="text-center">
        <button className="px-6 py-2 rounded-xl border border-white/20 text-sm hover:bg-white hover:text-black transition">
          Load More Items
        </button>
      </div>

      {/* Modal */}
      <NotifyModal open={notifyOpen} onClose={() => setNotifyOpen(false)} />
    </main>
  );
}
