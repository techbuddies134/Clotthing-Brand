import { NextResponse } from "next/server";
import { inArray } from "drizzle-orm";
import { db } from "@/db";
import { orderItems, orders, products } from "@/db/schema";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT } from "@/lib/types";

type IncomingItem = { slug?: string; size?: string; color?: string; quantity?: number };

function orderNumber() {
  const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `VS-${stamp}-${random}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      customer?: {
        name?: string;
        email?: string;
        phone?: string;
        address?: string;
        city?: string;
        postalCode?: string;
        country?: string;
        notes?: string;
      };
      items?: IncomingItem[];
    };

    const customer = body.customer ?? {};
    const items = body.items ?? [];

    const required = ["name", "email", "address", "city"] as const;
    for (const field of required) {
      if (!customer[field]?.trim()) {
        return NextResponse.json({ ok: false, error: `Missing ${field}.` }, { status: 400 });
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(customer.email!.trim())) {
      return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
    }
    if (items.length === 0) {
      return NextResponse.json({ ok: false, error: "Your bag is empty." }, { status: 400 });
    }

    const slugs = items.map((item) => item.slug).filter((slug): slug is string => Boolean(slug));
    if (slugs.length === 0) {
      return NextResponse.json({ ok: false, error: "No valid products in bag." }, { status: 400 });
    }
    const rows = await db.select().from(products).where(inArray(products.slug, slugs));

    if (rows.length === 0) {
      return NextResponse.json({ ok: false, error: "No valid products in bag." }, { status: 400 });
    }

    const resolved = items
      .map((item) => {
        const product = rows.find((row) => row.slug === item.slug);
        if (!product) return null;
        const quantity = Math.min(10, Math.max(1, Math.round(Number(item.quantity) || 1)));
        return {
          product,
          quantity,
          size: (item.size ?? product.sizes[0] ?? "M").slice(0, 12),
          color: (item.color ?? product.colors[0]?.name ?? "Natural").slice(0, 40),
        };
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

    if (resolved.length === 0) {
      return NextResponse.json({ ok: false, error: "No valid products in bag." }, { status: 400 });
    }

    const subtotal = resolved.reduce((total, entry) => total + entry.product.price * entry.quantity, 0);
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
    const total = subtotal + shipping;
    const number = orderNumber();

    const [order] = await db
      .insert(orders)
      .values({
        orderNumber: number,
        customerName: customer.name!.trim(),
        email: customer.email!.trim().toLowerCase(),
        phone: (customer.phone ?? "").trim(),
        address: customer.address!.trim(),
        city: customer.city!.trim(),
        postalCode: (customer.postalCode ?? "").trim(),
        country: (customer.country ?? "Pakistan").trim(),
        notes: (customer.notes ?? "").trim().slice(0, 600),
        subtotal,
        shipping,
        total,
        status: "confirmed",
      })
      .returning({ id: orders.id, orderNumber: orders.orderNumber });

    await db.insert(orderItems).values(
      resolved.map((entry) => ({
        orderId: order.id,
        productId: entry.product.id,
        name: entry.product.name,
        slug: entry.product.slug,
        image: entry.product.images[0] ?? "",
        size: entry.size,
        color: entry.color,
        price: entry.product.price,
        quantity: entry.quantity,
      })),
    );

    return NextResponse.json({ ok: true, orderNumber: order.orderNumber });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not place order." }, { status: 500 });
  }
}
