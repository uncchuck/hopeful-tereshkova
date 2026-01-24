export type Item = {
  id: number;
  title: string;
  seller: string; // handle like @EYBL_Gear
  price: number;
  era: string;
  image?: string | null;
};

export const fallbackImages = [
  "https://images.unsplash.com/photo-1520962918287-7448c2878f65?q=80&w=800", // denim jacket
  "https://images.unsplash.com/photo-1531771686035-25f47595c87a?q=80&w=800", // hoodie
  "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=800", // leather jacket
  "https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=800", // vintage shirt
  "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=800", // varsity jacket
];

export const items: Item[] = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  title: [
    "Vintage Nike Windbreaker",
    "Levi’s 550",
    "Arc’teryx Shell",
    "Adidas Track Top",
  ][i % 4],
  seller: ["@EYBL_Gear", "@StyzeP", "@byV-Malik", "@AllDenim"][i % 4],
  price: [65, 120, 180, 95][i % 4],
  era: ["90s", "Y2K", "80s", "Modern"][i % 4],
  image: null, // force fallback to keep it on-brand
}));

export function withFallbackImg(src: string | null | undefined, i: number) {
  return src ?? fallbackImages[i % fallbackImages.length];
}

export function getItemById(id: number) {
  return items.find((it) => it.id === id);
}

export function getOtherFromSeller(seller: string, excludeId: number) {
  return items.filter((it) => it.seller === seller && it.id !== excludeId);
}
