"use client";

import { useState } from "react";
import Link from "next/link";
import FeatureModal from "./FeatureModal";
import { items as demoItems, withFallbackImg, Item } from "../lib/demoData";

const OOTD_ID = 9999;

export default function FeedSection({ items }: { items?: Item[] }) {
  const [modalOpen, setModalOpen] = useState(false);

  const base = items && items.length ? items : demoItems;

  const outfitOfTheDay: Item = {
    id: OOTD_ID,
    title: "Outfit of the Day",
    price: 0,
    seller: "Public Archive",
    era: "Today",
    image: "/Outfits/Group1.JPG",
  };

  const source: Item[] = [
    outfitOfTheDay,
    ...base.map((it, idx) => ({
      ...it,
      image: withFallbackImg(it.image, idx),
    })),
  ];

  return (
    <>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {source.map((it) => (
          <article
            key={it.id}
            className="overflow-hidden rounded-xl bg-zinc-900 shadow-lg transition-all hover:shadow-xl"
          >
            <img
              src={it.image!}
              alt={it.title}
              className="h-60 w-full object-cover"
            />

            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-white">{it.title}</h3>

                {it.id === OOTD_ID ? (
                  <span className="text-xs text-zinc-400">Featured</span>
                ) : (
                  <span className="text-xs text-zinc-300">${it.price}</span>
                )}
              </div>

              <div className="mt-1 flex items-center justify-between text-xs text-zinc-400">
                <span>{it.seller}</span>
                <span className="rounded-full border border-zinc-700 px-2 py-[2px]">
                  {it.era}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <button
                  onClick={() => setModalOpen(true)}
                  className="rounded-full bg-white px-3 py-1 text-xs font-medium text-black hover:bg-zinc-100"
                >
                  Try On
                </button>

                <Link
                  href={it.id === OOTD_ID ? "/community" : `/item/${it.id}`}
                  className="text-xs text-cyan-400 hover:underline"
                >
                  View
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <FeatureModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
