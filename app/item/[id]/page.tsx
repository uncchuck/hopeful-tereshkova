"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getItemById,
  getOtherFromSeller,
  withFallbackImg,
} from "@/app/lib/demoData";

type Props = { params: Promise<{ id: string }> };

export default function ItemPage({ params }: Props) {
  // ✅ unwrap the params Promise using React.use()
  const { id: rawId } = use(params);
  const asNumber = Number(rawId);
  const isNumeric = Number.isFinite(asNumber) && !Number.isNaN(asNumber);
  if (!isNumeric) return notFound();

  const item = getItemById(asNumber);
  if (!item) return notFound();

  const others = getOtherFromSeller(item.seller, item.id);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-800">
          <img
            src={withFallbackImg(item.image, item.id - 1)}
            alt={item.title}
            className="object-cover w-full h-full"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold">{item.title}</h1>
          <p className="text-zinc-400 mt-1">
            {item.seller} • {item.era}
          </p>
          <p className="text-xl mt-3">${item.price}</p>

          <div className="flex gap-3 mt-6">
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm hover:bg-zinc-200">
              Buy / Offer
            </button>
            <button className="border border-zinc-700 px-4 py-2 rounded-full text-sm hover:bg-zinc-800">
              Try On
            </button>
          </div>

          <div className="mt-8">
            <Link
              href={`/closet/${encodeURIComponent(
                item.seller.replace("@", "")
              )}`}
              className="text-cyan-400"
            >
              View seller’s closet →
            </Link>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-4">More from {item.seller}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {others.slice(0, 4).map((it, i) => (
            <Link key={it.id} href={`/item/${it.id}`} className="block">
              <div className="rounded-xl overflow-hidden border border-zinc-800">
                <img
                  src={withFallbackImg(it.image, i)}
                  alt={it.title}
                  className="object-cover w-full h-full aspect-square"
                />
              </div>
              <p className="mt-2 text-sm">{it.title}</p>
              <p className="text-zinc-400 text-sm">${it.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
