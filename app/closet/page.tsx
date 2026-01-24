// /app/closet/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import UploadImage from "@/app/components/UploadImage";
import type { Product, StoreProfile } from "@/types";
import {
  addProduct,
  deleteProduct,
  getProducts,
  getStore,
  saveStore,
} from "@/app/lib/localStore";

export default function ClosetPage() {
  // store profile
  const [profile, setProfile] = useState<StoreProfile>(
    () => getStore() ?? { handle: "" }
  );

  // form state
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [tags, setTags] = useState("");
  const [hasTryOn, setHasTryOn] = useState(true);
  const [imageDataUrl, setImageDataUrl] = useState("");

  // listings
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => setItems(getProducts()), []);

  const canSave = useMemo(
    () =>
      !!title.trim() && !!price && !!imageDataUrl && !!profile.handle.trim(),
    [title, price, imageDataUrl, profile.handle]
  );

  function onSaveStore() {
    const fixed = {
      handle: profile.handle.trim().startsWith("@")
        ? profile.handle.trim()
        : `@${profile.handle.trim()}`,
      bio: profile.bio || "",
    };
    saveStore(fixed);
    setProfile(fixed);
  }

  function addListing() {
    if (!canSave) return;
    const product: Product = {
      id: crypto.randomUUID(),
      title: title.trim(),
      price: Number(price),
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      hasTryOn,
      imageDataUrl,
      createdAt: Date.now(),
    };
    addProduct(product);
    setItems((prev) => [product, ...prev]);

    // reset form
    setTitle("");
    setPrice("");
    setTags("");
    setHasTryOn(true);
    setImageDataUrl("");
  }

  function removeListing(id: string) {
    deleteProduct(id);
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold">Your Closet</h1>
          <a href="/community" className="text-sm underline underline-offset-4">
            View in Community
          </a>
        </div>
        <p className="text-zinc-400 mt-2">
          Create your storefront and start listing products.
        </p>
      </div>

      {/* Store profile */}
      <section className="rounded-2xl border border-white/10 bg-neutral-900 p-6 mb-10">
        <h2 className="text-lg font-medium mb-4">Store Profile</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="text-sm text-zinc-400">Handle</label>
            <input
              value={profile.handle}
              onChange={(e) =>
                setProfile((p) => ({ ...p, handle: e.target.value }))
              }
              placeholder="@your_handle"
              className="mt-1 w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/15 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-zinc-400">Bio (optional)</label>
            <input
              value={profile.bio || ""}
              onChange={(e) =>
                setProfile((p) => ({ ...p, bio: e.target.value }))
              }
              placeholder="Tell buyers what you sell"
              className="mt-1 w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/15 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onSaveStore}
            className="px-4 py-2 rounded-xl border border-white/20 text-sm hover:bg-white hover:text-black transition"
          >
            Save Profile
          </button>
        </div>
      </section>

      {/* Create listing */}
      <section className="rounded-2xl border border-white/10 bg-neutral-900 p-6 mb-10">
        <h2 className="text-lg font-medium mb-4">Create a Listing</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-zinc-400">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Vintage Nike Windbreaker"
              className="mt-1 w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/15 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
            />

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-zinc-400">Price (USD)</label>
                <input
                  type="number"
                  min={0}
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  placeholder="120"
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/15 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">
                  Tags (comma-separated)
                </label>
                <input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="y2k, vintage, denim"
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/15 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <input
                id="tryon"
                type="checkbox"
                checked={hasTryOn}
                onChange={(e) => setHasTryOn(e.target.checked)}
                className="h-4 w-4 accent-white"
              />
              <label htmlFor="tryon" className="text-sm text-zinc-300">
                Virtual Try-On available (shows “Feature Not Available” modal
                for now)
              </label>
            </div>

            <div className="mt-6">
              <button
                disabled={!canSave}
                onClick={addListing}
                className={`px-4 py-2 rounded-xl text-sm transition ${
                  canSave
                    ? "border border-white/20 hover:bg-white hover:text-black"
                    : "border border-white/10 text-zinc-400 cursor-not-allowed"
                }`}
              >
                Add Listing
              </button>
            </div>
          </div>

          <UploadImage value={imageDataUrl} onChange={setImageDataUrl} />
        </div>
      </section>

      {/* Listings */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Listings</h2>
          <span className="text-xs rounded-full border border-white/15 px-2 py-1 text-zinc-400">
            {items.length} items
          </span>
        </div>

        {items.length === 0 ? (
          <div className="text-zinc-400 border border-white/10 rounded-2xl p-8 text-center">
            No items yet. Add your first listing above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((p) => (
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
                  <div className="mt-2 flex flex-wrap gap-1">
                    {p.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] rounded-full border border-white/15 px-2 py-0.5 text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <button
                      onClick={() =>
                        alert(
                          "Feature Not Available — will open notify modal in Community"
                        )
                      }
                      className="px-3 py-1.5 rounded-lg border border-white/20 text-sm text-white hover:bg-white hover:text-black transition"
                    >
                      {p.hasTryOn ? "Try On" : "Not Available"}
                    </button>
                    <button
                      onClick={() => removeListing(p.id)}
                      className="px-3 py-1.5 rounded-lg border border-white/20 text-sm text-white hover:bg-white hover:text-black transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
