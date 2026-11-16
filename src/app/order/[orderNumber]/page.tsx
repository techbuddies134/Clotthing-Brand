import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Mail, MapPin, Package } from "lucide-react";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { Reveal } from "@/components/reveal";
import { SuccessMark } from "@/components/success-mark";
import { formatPrice } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Your VESTRA order is confirmed.",
};

type Params = Promise<{ orderNumber: string }>;

export default async function OrderPage({ params }: { params: Params }) {
  const { orderNumber } = await params;
  const [order] = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);
  if (!order) notFound();

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
  const placed = order.createdAt.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const firstName = order.customerName.split(" ")[0];

  return (
    <div className="pb-24 pt-[132px] md:pt-[172px]">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <SuccessMark />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow mt-7 text-bronze">Order confirmed</p>
              <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.94]">
                Thank you,
                <br />
                <span className="italic">{firstName}.</span>
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/65">
                Your pieces are now with the atelier. We have emailed a confirmation to{" "}
                <span className="text-ink">{order.email}</span>. A client advisor will follow up
                with a secure payment link within one business hour.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-8 grid gap-4 border-y border-ink/10 py-5 sm:grid-cols-3">
                <div>
                  <dt className="text-[0.55rem] uppercase tracking-[0.2em] text-muted">Order</dt>
                  <dd className="mt-1 text-sm">{order.orderNumber}</dd>
                </div>
                <div>
                  <dt className="text-[0.55rem] uppercase tracking-[0.2em] text-muted">Placed</dt>
                  <dd className="mt-1 text-sm">{placed}</dd>
                </div>
                <div>
                  <dt className="text-[0.55rem] uppercase tracking-[0.2em] text-muted">Status</dt>
                  <dd className="mt-1 inline-flex items-center gap-1.5 text-sm capitalize">
                    <span className="size-1.5 rounded-full bg-olive" />
                    {order.status}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/shop" className="btn-lux btn-ink">
                  <span>
                    Continue shopping <ArrowRight className="size-3.5" />
                  </span>
                </Link>
                <Link href="/contact" className="btn-lux btn-outline">
                  <span>Contact the studio</span>
                </Link>
              </div>
            </Reveal>
          </div>

          <aside>
            <div className="border border-ink/10">
              <div className="border-b border-ink/10 bg-bone/50 px-5 py-4">
                <p className="eyebrow text-muted">Your selection</p>
              </div>
              <ul className="divide-y divide-ink/10 px-5">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3 py-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="h-24 w-20 object-cover" />
                    <div className="flex flex-1 flex-col">
                      <Link href={`/product/${item.slug}`} className="font-display text-lg leading-tight">
                        {item.name}
                      </Link>
                      <p className="mt-1 text-[0.56rem] uppercase tracking-[0.16em] text-muted">
                        {item.color} · Size {item.size} · Qty {item.quantity}
                      </p>
                      <p className="mt-auto text-xs">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="space-y-2 border-t border-ink/10 px-5 py-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Shipping</span>
                  <span>{order.shipping === 0 ? "Complimentary" : formatPrice(order.shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-ink/10 pt-3">
                  <span className="eyebrow">Total</span>
                  <span className="font-display text-2xl">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4 border border-ink/10 p-5 text-sm text-ink/65">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-bronze" />
                <p>
                  <span className="block text-[0.55rem] uppercase tracking-[0.2em] text-muted">
                    Delivering to
                  </span>
                  {order.customerName}
                  <br />
                  {order.address}, {order.city} {order.postalCode}
                  <br />
                  {order.country}
                </p>
              </div>
              <div className="flex gap-3">
                <Package className="mt-0.5 size-4 shrink-0 text-bronze" />
                <p>
                  <span className="block text-[0.55rem] uppercase tracking-[0.2em] text-muted">
                    Dispatch
                  </span>
                  Packed by hand within 1–2 business days, carbon-neutral delivery with tracking.
                </p>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-bronze" />
                <p>
                  <span className="block text-[0.55rem] uppercase tracking-[0.2em] text-muted">
                    Questions
                  </span>
                  studio@vestra.atelier · +92 21 3456 7890
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
