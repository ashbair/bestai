import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
const allowed = new Set(["/", "/articles/best-ai-image-generators", "/articles/best-free-ai-image-generators", "/articles/best-free-ai-video-generators", "/articles/best-ai-video-generators", "/articles/best-free-ai-image-expanders"]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = typeof body.query === "string" ? body.query.trim().slice(0, 160) : "";
    const page = typeof body.page === "string" && allowed.has(body.page) ? body.page : "/";
    if (body.type !== "search" || query.length < 2) return NextResponse.json({ error: "Search query is too short." }, { status: 400 });
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const event = { query, page, recordedAt: new Date().toISOString(), type: "site-search" };
      await put(`search-events/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.json`, JSON.stringify(event), { access: "private", contentType: "application/json" });
    }
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ error: "Search tracking is unavailable." }, { status: 503 }); }
}
