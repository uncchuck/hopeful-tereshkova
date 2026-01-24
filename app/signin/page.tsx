// app/signin/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!email.trim()) return setErr("Please enter your email.");
    if (!password) return setErr("Please enter your password.");
    if (password.length < 6)
      return setErr("Password must be at least 6 characters.");

    // Fake auth: store user in localStorage
    setLoading(true);
    try {
      localStorage.setItem(
        "rc_user",
        JSON.stringify({ email, name: email.split("@")[0] })
      );
      // small delay for UX
      await new Promise((r) => setTimeout(r, 600));
      router.push("/community"); // go somewhere meaningful after sign-in
    } catch (e) {
      setErr("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <h1 className="text-3xl font-bold">Sign in</h1>
        <p className="text-zinc-400 mt-2">
          Welcome back. Continue to your stores and community.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          {err && (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {err}
            </div>
          )}

          <div>
            <label className="block text-sm text-zinc-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full px-3 py-2 rounded-xl bg-neutral-900 border border-white/15 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-300">Password</label>
            <div className="mt-1 flex items-stretch gap-2">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-white/15 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="px-3 py-2 rounded-xl border border-white/15 text-sm text-zinc-300 hover:border-white/40 hover:text-white transition"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl px-4 py-2 text-sm transition ${
              loading
                ? "border border-white/10 text-zinc-400 cursor-not-allowed"
                : "border border-white/20 hover:bg-white hover:text-black"
            }`}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <div className="text-center text-sm text-zinc-400">
            Don’t have an account?{" "}
            <Link href="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </form>

        {/* Optional: magic link / OAuth placeholders */}
        <div className="mt-10">
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <div className="h-px flex-1 bg-white/10" />
            or
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:border-white/40 transition">
              Continue with Google
            </button>
            <button className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:border-white/40 transition">
              Continue with Apple
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
