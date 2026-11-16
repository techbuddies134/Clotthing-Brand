import { NextResponse } from "next/server";
import { db } from "@/db";
import { messages } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      body?: string;
    };

    const name = (payload.name ?? "").trim().slice(0, 90);
    const email = (payload.email ?? "").trim().toLowerCase();
    const subject = (payload.subject ?? "General").trim().slice(0, 90);
    const body = (payload.body ?? "").trim().slice(0, 2000);

    if (!name || !body) {
      return NextResponse.json({ ok: false, error: "Name and message are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
    }

    await db.insert(messages).values({ name, email, subject, body });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not send your message." }, { status: 500 });
  }
}
