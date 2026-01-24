// app/signup/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!name.trim()) return setErr("Please enter your name.");
    if (!email.trim()) return setErr("Please enter your email.");
    if (password.length < 6)
      return setErr("Password must be at least 6 characters.");
    if (!agree) return setErr("Please agree to the Terms and Privacy Policy.");

    setLoading(true);
    try {
      // Fake sign up: persist user & starter store handle
      const normalizedHandle = handle
        ? handle.trim().startsWith("@")
          ? handle.trim()
          : `@${handle.trim()}`
        : "";

      localStorage.setItem(
        "rc_user",
        JSON.stringify({
          email,
          name: name.trim(),
          handle: normalizedHandle,
        })
      );

      // tiny delay for UX polish
      await new Promise((r) => setTimeout(r, 700));

      // If they provided a handle, nudge them to set up their store
      router.push(normalizedHandle ? "/closet" : "/community");
    } catch (e) {
      setErr("Unable to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <h1 className="text-3xl font-bold">Create your account</h1>
        <p className="text-zinc-400 mt-2">
          Join Retro Connect to buy, trade, and open your store.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          {err && (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {err}
            </div>
          )}

          <div>
            <label className="block text-sm text-zinc-300">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jordan Alvarez"
              className="mt-1 w-full px-3 py-2 rounded-xl bg-neutral-900 border border-white/15 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-300">
              Store Handle (optional)
            </label>
            <input
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="@your_store"
              className="mt-1 w-full px-3 py-2 rounded-xl bg-neutral-900 border border-white/15 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
            />
            <p className="text-xs text-zinc-500 mt-1">
              You can set this later in your Closet.
            </p>
          </div>

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
                placeholder="Create a password"
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

          <label className="mt-2 flex items-start gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-white"
            />
            <span>
              I agree to the{" "}
              <Link
                href="/legal/terms"
                className="underline underline-offset-4"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/legal/privacy"
                className="underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl px-4 py-2 text-sm transition ${
              loading
                ? "border border-white/10 text-zinc-400 cursor-not-allowed"
                : "border border-white/20 hover:bg-white hover:text-black"
            }`}
          >
            {loading ? "Creating account…" : "Create account"}
          </button>

          <div className="text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link href="/signin" className="underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </form>

        {/* Optional: OAuth placeholders */}
        <div className="mt-10">
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <div className="h-px flex-1 bg-white/10" />
            or
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:border-white/40 transition">
              Sign up with Google
            </button>
            <button className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:border-white/40 transition">
              Sign up with Apple
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
