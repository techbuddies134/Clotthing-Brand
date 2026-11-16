"use client";

import { ProductCard } from "@/components/product-card";
import type { ProductDTO } from "@/lib/types";

export function ProductGrid({
  products,
  tilt = true,
  className = "",
}: {
  products: ProductDTO[];
  tilt?: boolean;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 ${className}`}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} tilt={tilt} />
      ))}
    </div>
  );
}
