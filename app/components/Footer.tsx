// app/components/Footer.tsx
// (server component — no "use client")
const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-800/60 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Top stats / CTA row? remove if you don’t want it */}
        {/* <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Stat label="Active Users" value="25K+" />
          <Stat label="Items Listed" value="120K+" />
          <Stat label="Successful Trades" value="15K+" />
        </div> */}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-white font-semibold">RetroConnect</h3>
            <p className="mt-2 text-sm text-zinc-400 max-w-xs">
              The future of vintage fashion: where closets become shops, and
              communities power discovery.
            </p>
            <div className="mt-4 flex items-center gap-3 text-zinc-400">
              <a href="#" aria-label="Twitter" className="hover:text-white">
                𝕏
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white">
                IG
              </a>
              <a href="#" aria-label="TikTok" className="hover:text-white">
                TT
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-white">
                YT
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>
                <a href="/about" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="/press" className="hover:text-white">
                  Press
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold">Features</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>
                <a href="/explore" className="hover:text-white">
                  Explore
                </a>
              </li>
              <li>
                <a href="/community" className="hover:text-white">
                  Community
                </a>
              </li>
              <li>
                <a href="/sell" className="hover:text-white">
                  Open a Store
                </a>
              </li>
              <li>
                <a href="/training" className="hover:text-white">
                  Seller Handbook
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold">Support</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>
                <a href="/support" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/policies" className="hover:text-white">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="/safety" className="hover:text-white">
                  Trust &amp; Safety
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:text-white">
                  Shipping &amp; Returns
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-800/60 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-500">
            © {year} RetroConnect. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
            <a href="/privacy" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white">
              Terms of Service
            </a>
            <a href="/cookies" className="hover:text-white">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Optional tiny stat card - delete if unused
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="text-sm text-zinc-400">{label}</div>
    </div>
  );
}
*/
