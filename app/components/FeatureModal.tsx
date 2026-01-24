"use client";

import { useEffect, useState } from "react";

type FeatureModalProps = {
  open?: boolean;
  onClose?: () => void;
  /** optional: show automatically once per session */
  autoOnce?: boolean;
};

export default function FeatureModal({
  open,
  onClose,
  autoOnce = false,
}: FeatureModalProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(!!open);
  const isControlled = typeof open === "boolean";
  const visible = isControlled ? !!open : internalOpen;

  // Auto-open once per session (optional)
  useEffect(() => {
    if (!autoOnce) return;
    const key = "rc:feature-modal:shown";
    if (sessionStorage.getItem(key)) return;
    const t = setTimeout(() => {
      setInternalOpen(true);
      sessionStorage.setItem(key, "1");
    }, 1200);
    return () => clearTimeout(t);
  }, [autoOnce]);

  // keep in sync if controlled
  useEffect(() => {
    if (isControlled) setInternalOpen(!!open);
  }, [isControlled, open]);

  const close = () => {
    if (onClose) onClose();
    if (!isControlled) setInternalOpen(false);
  };

  // trap background scroll when open
  useEffect(() => {
    if (!visible) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/60" onClick={close} />
      <div className="relative mx-4 w-full max-w-md rounded-2xl bg-neutral-900 text-white shadow-2xl ring-1 ring-white/10">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-full p-1 hover:bg-white/10"
        >
          ✕
        </button>

        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Feature not available</h2>
          <p className="text-sm text-neutral-300">
            Virtual try-on is almost here. Drop your email and we’ll ping you
            the moment it goes live.
          </p>

          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const email = String(data.get("email") || "").trim();
              if (!email) return;
              // TODO: replace with your API call
              console.log("Notify signup:", email);
              close();
            }}
          >
            <input
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              className="w-full rounded-xl bg-neutral-800 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-white/20"
            />
            <button
              type="submit"
              className="rounded-xl px-4 py-2 text-sm font-medium bg-white text-black hover:bg-neutral-200"
            >
              Get notified
            </button>
          </form>

          <p className="text-xs text-neutral-400">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
