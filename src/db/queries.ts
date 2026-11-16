import { and, desc, eq, ne, sql } from "drizzle-orm";
import { db } from "@/db";
import { products, reviews } from "@/db/schema";
import type { Product, ProductColor } from "@/db/schema";
import type { ProductDTO, ReviewDTO } from "@/lib/types";

export function mapProduct(row: Product): ProductDTO {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    collection: row.collection,
    price: row.price,
    compareAtPrice: row.compareAtPrice ?? null,
    shortDescription: row.shortDescription,
    description: row.description,
    details: Array.isArray(row.details) ? row.details : [],
    materials: row.materials,
    care: row.care,
    images: Array.isArray(row.images) ? (row.images as string[]) : [],
    sizes: Array.isArray(row.sizes) ? (row.sizes as string[]) : [],
    colors: Array.isArray(row.colors) ? (row.colors as ProductColor[]) : [],
    badge: row.badge ?? null,
    featured: row.featured,
    stock: row.stock,
    rating: Number(row.rating),
    reviewCount: row.reviewCount,
  };
}

export type ShopQuery = {
  category?: string;
  sort?: string;
  q?: string;
};

export async function getProducts(query: ShopQuery = {}): Promise<ProductDTO[]> {
  const filters = [];
  if (query.category && query.category !== "All") {
    filters.push(eq(products.category, query.category));
  }
  if (query.q) {
    filters.push(sql`${products.name} ilike ${"%" + query.q + "%"}`);
  }

  const orderBy = (() => {
    switch (query.sort) {
      case "price-asc":
        return sql`${products.price} asc`;
      case "price-desc":
        return sql`${products.price} desc`;
      case "rating":
        return sql`${products.rating} desc`;
      default:
        return sql`${products.featured} desc, ${products.id} asc`;
    }
  })();

  const rows = filters.length
    ? await db
        .select()
        .from(products)
        .where(and(...filters))
        .orderBy(orderBy)
    : await db.select().from(products).orderBy(orderBy);

  return rows.map(mapProduct);
}

export async function getFeaturedProducts(limit = 4): Promise<ProductDTO[]> {
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.featured, true))
    .orderBy(sql`${products.id} asc`)
    .limit(limit);
  return rows.map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<ProductDTO | null> {
  const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return rows[0] ? mapProduct(rows[0]) : null;
}

export async function getRelatedProducts(product: ProductDTO, limit = 3): Promise<ProductDTO[]> {
  const rows = await db
    .select()
    .from(products)
    .where(and(ne(products.id, product.id), eq(products.category, product.category)))
    .limit(limit);
  if (rows.length >= limit) return rows.map(mapProduct);

  const fallback = await db
    .select()
    .from(products)
    .where(ne(products.id, product.id))
    .limit(limit);
  return fallback.map(mapProduct);
}

export async function getProductReviews(productId: number): Promise<ReviewDTO[]> {
  const rows = await db
    .select()
    .from(reviews)
    .where(eq(reviews.productId, productId))
    .orderBy(desc(reviews.createdAt))
    .limit(8);
  return rows.map((row) => ({
    id: row.id,
    author: row.author,
    rating: row.rating,
    title: row.title,
    body: row.body,
    createdAt: row.createdAt.toISOString(),
  }));
}

export async function getCategoryCounts(): Promise<Record<string, number>> {
  const rows = await db
    .select({ category: products.category, count: sql<number>`count(*)::int` })
    .from(products)
    .groupBy(products.category);
  return rows.reduce<Record<string, number>>((acc, row) => {
    acc[row.category] = row.count;
    return acc;
  }, {});
}
