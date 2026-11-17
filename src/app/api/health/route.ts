
import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("DATABASE HEALTH CHECK ERROR:", error);

    return Response.json(
      { ok: false, error: "Database connection failed" },
      { status: 500 }
    );
  }
}
