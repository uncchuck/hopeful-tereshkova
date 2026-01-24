"use client";

import Link from "next/link";

type Look = { id: string; title: string; coverImage?: string };
type Piece = { id: string; title: string; image?: string; price?: number };
type Drop = { id: string; title: string; date: string; note?: string };

function Pill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-white/15 bg-zinc-900 px-4 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800"
    >
      {children}
    </Link>
  );
}

function SectionHeader({
  id,
  title,
  subtitle,
  cta,
}: {
  id: string;
  title: string;
  subtitle?: string;
  cta?: React.ReactNode;
}) {
  return (
    <div id={id} className="mb-6 flex items-end justify-between scroll-mt-24">
      <div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {subtitle && <p className="text-sm text-zinc-400 mt-1">{subtitle}</p>}
      </div>
      {cta ? <div className="text-sm">{cta}</div> : null}
    </div>
  );
}

export default function CollectionsPage() {
  // ---- Mock data (swap for real data later)
  const looks: Look[] = [
    { id: "l1", title: "Fall Essentials", coverImage: "/denim.jpg" },
    { id: "l2", title: "Game Night Fit", coverImage: "/styze.jpg" },
    { id: "l3", title: "Editor’s Pick", coverImage: "/eybl.jpg" },
  ];

  const pieces: Piece[] = [
    { id: "p1", title: "Y2K Denim Jacket", image: "/denim.jpg", price: 120 },
    { id: "p2", title: "Retro Tee", image: "/eybl.jpg", price: 45 },
    { id: "p3", title: "Practical Cargo", image: "/styze.jpg", price: 80 },
    { id: "p4", title: "Statement Belt", image: "/accessories.jpg", price: 60 },
  ];

  const drops: Drop[] = [
    {
      id: "d1",
      title: "Retro Drop F/W ‘25",
      date: "Sept 20, 2025",
      note: "Platform-wide",
    },
    {
      id: "d2",
      title: "Streetwear Capsule",
      date: "Oct 5, 2025",
      note: "Limited run",
    },
    {
      id: "d3",
      title: "Archive Week",
      date: "Oct 22, 2025",
      note: "Vintage only",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Collections</h1>
          <p className="mt-1 text-zinc-400">
            Your saved looks, wishlist pieces, and upcoming drops.
          </p>
        </div>

        {/* Pills (anchor jump) */}
        <div className="mb-10 flex flex-wrap gap-2">
          <Pill href="#looks">Complete Looks</Pill>
          <Pill href="#pieces">Saved</Pill>
          <Pill href="#drops">Upcoming</Pill>
        </div>

        {/* FEED STYLE — EVERYTHING ON ONE PAGE */}

        {/* Looks Section */}
        <SectionHeader
          id="looks"
          title="Complete Looks"
          subtitle="Saved outfits & complete fits."
          cta={
            <Link
              href="/closet"
              className="underline underline-offset-4 text-zinc-300 hover:text-white"
            >
              Create a Look
            </Link>
          }
        />
        {looks.length === 0 ? (
          <div className="mb-12 rounded-2xl border border-white/10 bg-zinc-900 p-8 text-center text-zinc-300">
            No looks yet. Build your first fit from your saved pieces.
          </div>
        ) : (
          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {looks.map((l) => (
              <div
                key={l.id}
                className="rounded-2xl border border-white/10 bg-zinc-900 overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={l.coverImage}
                  alt={l.title}
                  className="h-44 w-full object-cover bg-neutral-800"
                />
                <div className="p-4">
                  <div className="font-medium">{l.title}</div>
                  <div className="mt-3 flex gap-2">
                    <button className="rounded-lg border border-white/20 px-3 py-1.5 text-sm hover:bg-white hover:text-black transition">
                      View Look
                    </button>
                    <button className="rounded-lg border border-white/20 px-3 py-1.5 text-sm hover:bg-white hover:text-black transition">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pieces Section */}
        <SectionHeader
          id="pieces"
          title="Saved Items"
          subtitle="Your wishlist & saved items."
          cta={
            <Link
              href="/stores"
              className="underline underline-offset-4 text-zinc-300 hover:text-white"
            >
              Browse Stores
            </Link>
          }
        />
        {pieces.length === 0 ? (
          <div className="mb-12 rounded-2xl border border-white/10 bg-zinc-900 p-8 text-center text-zinc-300">
            Your wishlist is empty. Save items from Stores or Community.
          </div>
        ) : (
          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pieces.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-white/10 bg-zinc-900 overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-40 w-full object-cover bg-neutral-800"
                />
                <div className="p-4">
                  <div className="font-medium">{p.title}</div>
                  {typeof p.price === "number" && (
                    <div className="text-sm text-zinc-300 mt-1">${p.price}</div>
                  )}
                  <div className="mt-3 flex gap-2">
                    <button className="rounded-lg border border-white/20 px-3 py-1.5 text-sm hover:bg-white hover:text-black transition">
                      View
                    </button>
                    <button className="rounded-lg border border-white/20 px-3 py-1.5 text-sm hover:bg-white hover:text-black transition">
                      Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Drops Section */}
        <SectionHeader
          id="drops"
          title="Upcoming Drops"
          subtitle="What’s launching next on the platform."
          cta={
            <Link
              href="/community"
              className="underline underline-offset-4 text-zinc-300 hover:text-white"
            >
              See All Events
            </Link>
          }
        />
        {drops.length === 0 ? (
          <div className="mb-16 rounded-2xl border border-white/10 bg-zinc-900 p-8 text-center text-zinc-300">
            No scheduled drops yet. Follow sellers to get notified.
          </div>
        ) : (
          <div className="mb-16 space-y-3">
            {drops.map((d) => (
              <div
                key={d.id}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-900 p-4"
              >
                <div>
                  <div className="font-medium">{d.title}</div>
                  <div className="text-sm text-zinc-400">
                    {d.date}
                    {d.note ? ` • ${d.note}` : ""}
                  </div>
                </div>
                <button className="rounded-lg border border-white/20 px-3 py-1.5 text-sm hover:bg-white hover:text-black transition">
                  Notify Me
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer helper strip */}
        <div className="mt-6 text-center text-sm text-zinc-400">
          Tip: Use the pills above to jump between sections.
        </div>
      </div>
    </main>
  );
}
