// /app/lib/localStore.ts
import { Product, StoreProfile } from "@/types";

const PKEY = "rc_products";
const SKEY = "rc_store_profile";
// safety limit so localStorage doesn't explode
const MAX_ITEMS = 60;

export function getProducts(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(PKEY) || "[]");
  } catch {
    return [];
  }
}

export function saveProducts(items: Product[]) {
  if (typeof window === "undefined") return;

  // 1) enforce a hard cap (oldest trimmed)
  let data = [...items].slice(0, MAX_ITEMS);

  // 2) try saving; if quota exceeded, progressively trim oldest
  //    (we keep removing one until it fits or none left)
  while (true) {
    try {
      localStorage.setItem(PKEY, JSON.stringify(data));
      return;
    } catch (e: any) {
      const isQuota =
        e?.name === "QuotaExceededError" ||
        e?.code === 22 ||
        String(e).includes("exceeded the quota");

      if (isQuota && data.length > 0) {
        data = data.slice(0, data.length - 1);
        continue; // retry with fewer items
      }
      // give up -> rethrow so UI can show a friendly message
      throw e;
    }
  }
}

export function addProduct(p: Product) {
  const items = getProducts();
  items.unshift(p);
  saveProducts(items);
}

export function deleteProduct(id: string) {
  saveProducts(getProducts().filter((p) => p.id !== id));
}

export function getStore(): StoreProfile | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(SKEY) || "null");
  } catch {
    return null;
  }
}

export function saveStore(s: StoreProfile) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SKEY, JSON.stringify(s));
  } catch (e) {
    // profile is tiny, but just in case
    console.warn("Failed to save store profile", e);
  }
}
