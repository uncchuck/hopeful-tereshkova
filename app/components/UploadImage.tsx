// /app/components/UploadImage.tsx
"use client";

import { useRef } from "react";

type Props = {
  value?: string;
  onChange: (dataUrl: string) => void;
  // optional: control target size/quality
  maxSizePx?: number; // longest edge in px
  quality?: number; // 0..1 for JPEG
};

export default function UploadImage({
  value,
  onChange,
  maxSizePx = 1200,
  quality = 0.7,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function handleFile(file: File) {
    // Read the file into an HTMLImageElement
    const dataUrl = await readFileAsDataURL(file);
    const compressed = await resizeAndCompress(dataUrl, maxSizePx, quality);
    onChange(compressed);
  }

  return (
    <div className="flex items-start gap-3">
      <div className="h-28 w-36 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center overflow-hidden">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt="preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-xs text-zinc-400">No image</span>
        )}
      </div>

      <div className="space-y-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        <button
          type="button"
          className="px-3 py-2 rounded-xl border border-white/20 text-sm hover:bg-white hover:text-black transition"
          onClick={() => inputRef.current?.click()}
        >
          Upload Image
        </button>
        <p className="text-xs text-zinc-400">
          Images are auto-compressed to keep storage small.
        </p>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function resizeAndCompress(
  srcDataUrl: string,
  maxSizePx: number,
  quality: number
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const { width, height } = fitWithin(img.width, img.height, maxSizePx);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);

      // Prefer JPEG to dramatically shrink size; fallback to PNG if alpha needed
      const hasAlpha = looksLikePngWithAlpha(srcDataUrl);
      const mime = hasAlpha ? "image/png" : "image/jpeg";
      const out =
        mime === "image/jpeg"
          ? canvas.toDataURL(mime, quality)
          : canvas.toDataURL(mime);

      resolve(out);
    };
    // Avoid taint errors by setting crossOrigin; safe for local uploads
    img.crossOrigin = "anonymous";
    img.src = srcDataUrl;
  });
}

function fitWithin(w: number, h: number, max: number) {
  const scale = Math.min(1, max / Math.max(w, h));
  return { width: Math.round(w * scale), height: Math.round(h * scale) };
}

function looksLikePngWithAlpha(dataUrl: string) {
  // very lightweight check; if it’s PNG, we assume possible alpha
  return dataUrl.startsWith("data:image/png");
}
