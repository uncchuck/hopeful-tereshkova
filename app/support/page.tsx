// app/support/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

/* small helpers */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 px-2.5 py-1 text-xs text-zinc-300">
      {children}
    </span>
  );
}

function Card({
  title,
  subtitle,
  cta,
  href,
  emoji,
}: {
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  emoji: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-900 p-5">
      <div className="text-2xl mb-2">{emoji}</div>
      <div className="text-base font-semibold">{title}</div>
      <p className="text-sm text-zinc-300 mt-1">{subtitle}</p>
      <Link
        href={href}
        className="mt-4 inline-block rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white hover:text-black transition"
      >
        {cta}
      </Link>
    </div>
  );
}

export default function SupportPage() {
  const [q, setQ] = useState("");

  const faqsLeft = [
    {
      q: "How do I open a store and start listing items?",
      a: "Go to /closet, set your handle, then add a listing with title, price, image, and optional tags.",
    },
    {
      q: "Why does ‘Virtual Try-On’ say ‘Feature Not Available’?",
      a: "Try-On is in development. We show a temporary message until the feature ships.",
    },
    {
      q: "Can I edit or delete a listing?",
      a: "Yes. Open your Closet page and use the Delete action, or re-add an updated item.",
    },
    {
      q: "Payments & shipping?",
      a: "During beta, transactions are manual. Agree on payment & shipping terms with the buyer before purchase.",
    },
    {
      q: "Report an issue or a policy concern",
      a: "Email support@retroconnect.app or use the Contact Support card below.",
    },
  ];

  const faqsRight = [
    {
      q: "Trust & Safety",
      a: "Keep transactions on-platform when available, verify item photos, and communicate clearly.",
    },
    {
      q: "Shipping & Returns",
      a: "Agree on return terms before purchase. Document item condition with clear photos.",
    },
  ];

  const allFaqs = useMemo(() => [...faqsLeft, ...faqsRight], []);
  const filteredLeft = q
    ? faqsLeft.filter((f) =>
        (f.q + " " + f.a).toLowerCase().includes(q.toLowerCase())
      )
    : faqsLeft;
  const filteredRight = q
    ? faqsRight.filter((f) =>
        (f.q + " " + f.a).toLowerCase().includes(q.toLowerCase())
      )
    : faqsRight;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="border-b border-white/10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold">How can we help?</h1>
          <p className="text-zinc-300 mt-3">
            Answers for creators, buyers, and community members.
            <br />
            Search help topics, browse guides, or contact us.
          </p>

          {/* Search */}
          <div className="mt-6">
            <div className="relative mx-auto max-w-2xl">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">🔎</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search help (e.g. create store, delete listing, try-on)…"
                className="w-full pl-10 pr-3 py-2 rounded-xl bg-neutral-900 border border-white/15 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
              />
            </div>
          </div>

          {/* Status strip */}
          <div className="mx-auto max-w-2xl mt-6 rounded-2xl border border-white/10 bg-neutral-900 text-left p-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
              <span className="font-medium">All systems normal:</span>
              <span className="text-zinc-300">No known incidents.</span>
            </div>
            <div className="text-xs text-zinc-400 mt-2">
              Next update: Virtual Try-On (alpha)
            </div>
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card
            emoji="🛠️"
            title="Getting Started"
            subtitle="Open a store and list your first item."
            cta="Open Your Store"
            href="/closet"
          />
          <Card
            emoji="📦"
            title="Seller Handbook"
            subtitle="Best practices for titles, photos, and tags."
            cta="View Your Listings"
            href="/closet"
          />
          <Card
            emoji="👥"
            title="Community Guidelines"
            subtitle="Respectful, safe, style-first culture."
            cta="Explore Community"
            href="/community"
          />
          <Card
            emoji="🛡️"
            title="Trust & Safety"
            subtitle="Report issues and learn safety tips."
            cta="Learn More"
            href="/support/trust"
          />
          <Card
            emoji="🚚"
            title="Shipping & Returns"
            subtitle="What to expect while we build native flows."
            cta="Read Policy"
            href="/support/shipping"
          />
          <Card
            emoji="✉️"
            title="Contact Support"
            subtitle="Email us. We respond quickly."
            cta="Email Support"
            href="mailto:support@retroconnect.app"
          />
        </div>
      </section>

      {/* FAQS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>

        {/* If searching, show a single flat list of matches */}
        {q ? (
          <div className="space-y-3">
            {allFaqs
              .filter((f) =>
                (f.q + " " + f.a).toLowerCase().includes(q.toLowerCase())
              )
              .map((f, i) => (
                <details
                  key={i}
                  className="rounded-2xl border border-white/10 bg-neutral-900 p-4"
                >
                  <summary className="cursor-pointer list-none text-base font-medium">
                    {f.q}
                  </summary>
                  <p className="text-sm text-zinc-300 mt-2">{f.a}</p>
                </details>
              ))}
            {allFaqs.filter((f) =>
              (f.q + " " + f.a).toLowerCase().includes(q.toLowerCase())
            ).length === 0 && (
              <div className="text-sm text-zinc-400">
                No results. Try a different term.
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left list */}
            <div className="space-y-3">
              {filteredLeft.map((f, i) => (
                <details
                  key={i}
                  className="rounded-2xl border border-white/10 bg-neutral-900 p-4"
                >
                  <summary className="cursor-pointer list-none text-base font-medium">
                    {f.q}
                  </summary>
                  <p className="text-sm text-zinc-300 mt-2">{f.a}</p>
                </details>
              ))}
            </div>
            {/* Right list */}
            <div className="space-y-3">
              {filteredRight.map((f, i) => (
                <details
                  key={i}
                  className="rounded-2xl border border-white/10 bg-neutral-900 p-4"
                >
                  <summary className="cursor-pointer list-none text-base font-medium">
                    {f.q}
                  </summary>
                  <div className="text-sm text-zinc-300 mt-2">{f.a}</div>
                  {/* Optional bullets to match your mock */}
                  {f.q.includes("Shipping") && (
                    <ul className="list-disc pl-5 mt-2 text-zinc-300 text-sm space-y-1">
                      <li>Agree on return terms before purchase.</li>
                      <li>Document item condition with clear photos.</li>
                    </ul>
                  )}
                </details>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20 text-center">
        <h3 className="text-2xl font-semibold">Still need help?</h3>
        <p className="text-zinc-300 mt-2">
          We’re here for you. Most questions get answered in under a day.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="mailto:support@retroconnect.app"
            className="rounded-xl border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black transition"
          >
            Email Support
          </Link>
          <Link
            href="/support/contact"
            className="rounded-xl border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black transition"
          >
            Contact Form
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          <Chip>Account</Chip>
          <Chip>Selling</Chip>
          <Chip>Buying</Chip>
          <Chip>Try-On</Chip>
          <Chip>Safety</Chip>
        </div>
      </section>
    </main>
  );
}
