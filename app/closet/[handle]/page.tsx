// app/closet/[handle]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function ClosetPage() {
  const { handle } = useParams();

  const demoCloset = [
    {
      id: 1,
      name: "Vintage Nike Hoodie",
      price: "$80",
      img: "/demo/hoodie1.jpg",
    },
    { id: 2, name: "Retro Jordan 4", price: "$220", img: "/demo/jordan4.jpg" },
    {
      id: 3,
      name: "Carhartt Jacket",
      price: "$150",
      img: "/demo/carhartt.jpg",
    },
  ];

  return (
    <main className="bg-black min-h-screen text-white px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">@{handle}’s Closet</h1>

        <p className="text-zinc-400 mb-8">
          This is {handle}'s curated collection. More features coming soon.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {demoCloset.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.img}
                alt={item.name}
                className="h-60 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-sm font-semibold">{item.name}</h3>
                <p className="text-zinc-400 text-xs mb-2">{item.price}</p>
                <button
                  onClick={() =>
                    alert("Feature not available — Virtual Try-On coming soon!")
                  }
                  className="text-xs bg-white text-black px-3 py-1 rounded-full hover:bg-zinc-200 transition"
                >
                  Try On
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-cyan-400 hover:underline underline-offset-4"
          >
            ← Back to Feed
          </Link>
        </div>
      </div>
    </main>
  );
}
