import { NextResponse } from "next/server";
import { db } from "@/db";
import { reviews } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      productId?: number;
      author?: string;
      rating?: number;
      title?: string;
      body?: string;
    };

    const productId = Number(body.productId);
    const author = (body.author ?? "").trim().slice(0, 80);
    const rating = Number(body.rating);
    const title = (body.title ?? "").trim().slice(0, 120);
    const text = (body.body ?? "").trim().slice(0, 1200);

    if (!Number.isInteger(productId) || productId <= 0) {
      return NextResponse.json({ ok: false, error: "Unknown product." }, { status: 400 });
    }
    if (!author || !text) {
      return NextResponse.json({ ok: false, error: "Name and review are required." }, { status: 400 });
    }
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ ok: false, error: "Rating must be between 1 and 5." }, { status: 400 });
    }

    await db.insert(reviews).values({
      productId,
      author,
      rating: Math.round(rating),
      title,
      body: text,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not publish review." }, { status: 500 });
  }
}
