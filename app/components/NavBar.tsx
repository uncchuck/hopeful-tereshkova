"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const links = [
  { label: "Community", href: "/community" },
  { label: "Menswear", href: "/menswear" },
  { label: "Womenswear", href: "/womenswear" },
  { label: "Upcoming Drops", href: "/drops" },
  { label: "Virtual Try-On", href: "/virtual-try-on" },
  { label: "Collections", href: "/collections" },
  { label: "Closet", href: "/closet" },
];

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href
      ? "text-white font-semibold"
      : "text-zinc-300 hover:text-white";

  const runSearch = () => {
    const q = search.trim();
    if (!q) return;
    router.push(`/community?q=${encodeURIComponent(q)}`);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-white">
          Public Archive
        </Link>

        <div className="hidden md:flex items-center w-1/2 max-w-lg">
          <div className="flex w-full items-center rounded-md border border-zinc-700 bg-neutral-900 px-3 py-2">
            <FaSearch className="text-zinc-400 mr-2" />
            <input
              type="text"
              placeholder="Search for anything"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runSearch()}
              className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
            />
            <button
              onClick={runSearch}
              className="ml-2 rounded bg-white px-3 py-1 text-xs font-medium text-black hover:bg-zinc-200"
            >
              Search
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/sell"
            className="rounded border border-zinc-600 px-4 py-1.5 text-sm text-white hover:bg-white hover:text-black"
          >
            Sell
          </Link>
          <Link
            href="/signup"
            className="rounded border border-zinc-600 px-4 py-1.5 text-sm text-white hover:bg-white hover:text-black"
          >
            Sign Up
          </Link>
          <Link
            href="/signin"
            className="rounded bg-white px-4 py-1.5 text-sm font-medium text-black hover:bg-zinc-200"
          >
            Log In
          </Link>
        </div>

        <button
          className="md:hidden rounded-md border border-zinc-700 p-2 text-zinc-300"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      <div className="hidden md:flex justify-center gap-8 border-t border-zinc-800 bg-black px-6 py-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`text-sm ${isActive(l.href)}`}
          >
            {l.label}
          </Link>
        ))}
      </div>

      {open && (
        <div className="md:hidden border-t border-zinc-800 bg-black">
          <div className="flex flex-col gap-3 px-4 py-3">
            <div className="flex items-center rounded-md border border-zinc-700 bg-neutral-900 px-3 py-2">
              <FaSearch className="text-zinc-400 mr-2" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runSearch()}
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
              />
              <button
                onClick={runSearch}
                className="ml-2 rounded bg-white px-3 py-1 text-xs font-medium text-black hover:bg-zinc-200"
              >
                Go
              </button>
            </div>

            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm ${isActive(l.href)}`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
