import "dotenv/config";
import { eq, sql } from "drizzle-orm";
import { db, pool } from "./index";
import { products, reviews } from "./schema";
import { seedProducts, seedReviews } from "./seed-data";

async function main() {
  console.log("Seeding VESTRA catalogue…");

  for (const product of seedProducts) {
    await db
      .insert(products)
      .values(product)
      .onConflictDoUpdate({
        target: products.slug,
        set: {
          name: product.name,
          category: product.category,
          collection: product.collection,
          price: product.price,
          compareAtPrice: product.compareAtPrice ?? null,
          shortDescription: product.shortDescription,
          description: product.description,
          details: product.details,
          materials: product.materials,
          care: product.care,
          images: product.images,
          sizes: product.sizes,
          colors: product.colors,
          badge: product.badge ?? null,
          featured: product.featured,
          stock: product.stock,
          rating: product.rating,
          reviewCount: product.reviewCount,
        },
      });
  }

  const existingReviews = await db.select({ count: sql<number>`count(*)::int` }).from(reviews);
  if (!existingReviews[0] || existingReviews[0].count === 0) {
    for (const review of seedReviews) {
      const [product] = await db
        .select({ id: products.id })
        .from(products)
        .where(eq(products.slug, review.slug))
        .limit(1);
      if (!product) continue;
      await db.insert(reviews).values({
        productId: product.id,
        author: review.author,
        rating: review.rating,
        title: review.title,
        body: review.body,
      });
    }
  }

  const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(products);
  console.log(`Seed complete — ${count} products in catalogue.`);
  await pool.end();
}

main().catch(async (error) => {
  console.error("Seed failed", error);
  await pool.end();
  process.exit(1);
});
