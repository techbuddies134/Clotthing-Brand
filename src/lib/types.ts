import type { ProductColor } from "@/db/schema";

export type ProductDTO = {
  id: number;
  slug: string;
  name: string;
  category: string;
  collection: string;
  price: number;
  compareAtPrice: number | null;
  shortDescription: string;
  description: string;
  details: string[];
  materials: string;
  care: string;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  badge: string | null;
  featured: boolean;
  stock: number;
  rating: number;
  reviewCount: number;
};

export type CartLine = {
  key: string;
  productId: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
};

export type ReviewDTO = {
  id: number;
  author: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
};

export const CATEGORIES = [
  "Outerwear",
  "Knitwear",
  "Shirts",
  "Tailoring",
  "Dresses",
  "Denim",
  "Essentials",
] as const;

export const SORT_OPTIONS = [
  { value: "new", label: "Newest" },
  { value: "price-asc", label: "Price ↑" },
  { value: "price-desc", label: "Price ↓" },
  { value: "rating", label: "Best rated" },
] as const;

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export const FREE_SHIPPING_THRESHOLD = 20000;
export const SHIPPING_FLAT = 1500;
