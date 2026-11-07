"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PhoneGate({ slug }: { slug: string }) {
  const [unlocked, setUnlocked] = useState(false);
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => { setUnlocked(window.localStorage.getItem("bestai:unlocked") === "yes"); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) { setStatus("Please agree to the data-use notice to continue."); return; }
    setBusy(true); setStatus("");
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone, slug, consent: true }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "We couldn't save your number. Please try again.");
      window.localStorage.setItem("bestai:unlocked", "yes");
      setUnlocked(true);
    } catch (error) { setStatus(error instanceof Error ? error.message : "Something went wrong. Please try again."); }
    finally { setBusy(false); }
  }

  return <div className={`phone-gate ${unlocked ? "is-unlocked" : ""}`} aria-hidden={unlocked}>
    {!unlocked && <div className="gate-card"><div className="gate-logo"><span className="brand-mark">b.</span></div><p className="eyebrow">YOUR SHORTLIST IS READY</p><h2>Unlock the full top 10</h2><p className="gate-description">Enter your phone number to see the complete guide, direct tool links, and free-plan notes.</p>
      <form onSubmit={submit} className="gate-form"><label htmlFor={`phone-${slug}`}>Phone number</label><input id={`phone-${slug}`} type="tel" autoComplete="tel" inputMode="tel" required minLength={7} maxLength={30} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555 000 0000"/><label className="consent-row"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required/><span>I agree that BestAI may use my number to unlock this guide and record searches I make on this site to improve recommendations. <strong>No marketing texts will be sent.</strong> See the <Link href="/privacy" target="_blank">privacy notice</Link>.</span></label><button className="primary-button" disabled={busy}>{busy ? "Unlocking…" : "Show me the top 10"}<span>→</span></button><p className="gate-status" aria-live="polite">{status}</p></form>
      <div className="gate-footnote">Your search activity is recorded separately from your phone number.</div></div>}
  </div>;
}
