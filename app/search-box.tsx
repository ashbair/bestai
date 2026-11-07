"use client";
import { useState } from "react";
import { guides } from "./data";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const matches = query.trim() ? guides.filter((g) => `${g.title} ${g.description} ${g.tools.map((x) => x.name).join(" ")}`.toLowerCase().includes(query.toLowerCase().trim())) : [];

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    setMessage("Searching the guides…");
    try {
      const response = await fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "search", query: value, page: "/" }) });
      setMessage(response.ok ? "Showing matching guides" : "Search is available; interest tracking is temporarily unavailable.");
    } catch { setMessage("Showing matching guides"); }
  }

  return <div className="searchbox-wrap"><form className="searchbox" onSubmit={submit}><span aria-hidden="true">⌕</span><input aria-label="Search AI tool guides" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try ‘free image generator’"/><button aria-label="Search" type="submit">→</button></form><p className="search-message" aria-live="polite">{message || "Searches on this site help us decide which guides to improve."}</p>{matches.length > 0 && <ul className="search-results">{matches.map((g) => <li key={g.slug}><a href={`/articles/${g.slug}`}>{g.title}<span>→</span></a></li>)}</ul>}</div>;
}
