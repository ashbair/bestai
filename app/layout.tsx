import type { Metadata } from "next";
import Link from "next/link";
import "./styles.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bestai.website"),
  title: { default: "BestAI — Find the best free AI tools", template: "%s | BestAI" },
  description: "Straightforward, regularly reviewed guides to the best free AI image, video, and image-expander tools.",
  openGraph: { siteName: "BestAI", type: "website", locale: "en_US" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><header className="site-header"><Link href="/" className="brand"><span className="brand-mark">b.</span> bestai<span className="brand-dot">.</span>website</Link><nav aria-label="Main navigation"><Link href="/#guides">Guides</Link><Link href="/privacy">Privacy</Link></nav></header>{children}<footer className="site-footer"><Link href="/" className="brand"><span className="brand-mark">b.</span> bestai<span className="brand-dot">.</span>website</Link><p>Find the right AI tool without the guesswork.</p><div><Link href="/#guides">All guides</Link><Link href="/privacy">Privacy</Link><a href="mailto:asherb@lurid.dev">Contact</a></div><small>© 2026 BestAI. Free limits and features can change; check each provider before relying on a quota.</small></footer></body></html>;
}
