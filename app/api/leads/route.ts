import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const slug = typeof body.slug === "string" ? body.slug : "";
    if (!body.consent || !/^\+?[0-9().\-\s]{7,30}$/.test(phone) || !/^[a-z0-9-]{1,80}$/.test(slug)) return NextResponse.json({ error: "Enter a valid phone number and agree to the data-use notice." }, { status: 400 });
    if (!process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ error: "Phone capture is not set up yet. Please check back soon." }, { status: 503 });
    const record = { phone, guide: slug, consentedAt: new Date().toISOString(), source: "guide-unlock" };
    await put(`leads/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.json`, JSON.stringify(record), { access: "private", contentType: "application/json" });
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ error: "We couldn't save your number. Please try again." }, { status: 500 }); }
}
