"use client";
import { Zap, Mail, Phone, MapPin, Globe, MessageCircle, Link, PlayCircle, Send } from "lucide-react";
import { useState } from "react";

const footerLinks = {
  Produk: ["POS System", "Inventory", "Laporan Keuangan", "AI Analytics", "Multi-Store", "Mobile App"],
  Solusi: ["Warung & Toko", "Kuliner & F&B", "Minimarket", "Toko Online", "Multi-Cabang"],
  Perusahaan: ["Tentang Kami", "Blog", "Karir", "Press Kit", "Partner Program"],
  Dukungan: ["Help Center", "Dokumentasi", "Status System", "Kebijakan Privasi", "Syarat & Ketentuan"],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  return (
    <footer id="contact" style={{ background: "var(--navy-2)", borderTop: "1px solid rgba(0,212,255,0.1)", position: "relative" }}>
      <div className="grid-lines" style={{ opacity: 0.3 }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "70px 24px 40px", position: "relative", zIndex: 1 }}>
        {/* Top section */}
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40, marginBottom: 56 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg, #1a6bff, #00d4ff)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 15px rgba(26,107,255,0.4)" }}>
                <Zap size={20} color="white" fill="white" />
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.15rem", background: "linear-gradient(135deg, #fff, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                WarungCerdas
              </span>
            </div>
            <p style={{ color: "var(--white-dim)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: 20, maxWidth: 280 }}>
              Platform SaaS terdepan untuk digitalisasi dan optimalisasi UMKM Indonesia. Dari warung kecil hingga toko multi-cabang.
            </p>

            {/* Contact */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {[
                { icon: <Mail size={14} />, text: "hello@warungcerdas.id" },
                { icon: <Phone size={14} />, text: "+62 812-3456-7890" },
                { icon: <MapPin size={14} />, text: "Yogyakarta, Indonesia" },
              ].map((c) => (
                <div key={c.text} style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--white-dim)", fontSize: "0.82rem" }}>
                  <span style={{ color: "var(--cyan)" }}>{c.icon}</span>
                  {c.text}
                </div>
              ))}
            </div>

            {/* Social */}
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { icon: <MessageCircle size={16} />, href: "#" },
                { icon: <Globe size={16} />, href: "#" },
                { icon: <Link size={16} />, href: "#" },
                { icon: <PlayCircle size={16} />, href: "#" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--white-dim)", textDecoration: "none", transition: "all 0.3s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.15)"; (e.currentTarget as HTMLElement).style.color = "var(--cyan)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.3)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.color = "var(--white-dim)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", marginBottom: 16, color: "var(--white)" }}>{title}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map((link) => (
                  <a key={link} href="#" style={{ color: "var(--white-dim)", fontSize: "0.83rem", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--white-dim)")}>
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="glass-card" style={{ padding: "28px 32px", marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", marginBottom: 6 }}>Newsletter WarungCerdas</h4>
            <p style={{ color: "var(--white-dim)", fontSize: "0.85rem" }}>Dapatkan tips bisnis UMKM, update fitur, dan promo eksklusif.</p>
          </div>
          {subscribed ? (
            <div style={{ color: "var(--emerald)", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.9rem" }}>
              ✓ Terima kasih! Kamu sudah terdaftar.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: 10 }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email kamu..."
                required
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "11px 16px", color: "var(--white)", fontSize: "0.875rem", outline: "none", minWidth: 220, fontFamily: "var(--font-body)" }}
              />
              <button type="submit" className="btn-primary" style={{ padding: "11px 20px", fontSize: "0.875rem" }}>
                <Send size={15} /> Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ color: "var(--white-dim)", fontSize: "0.82rem" }}>
            © {new Date().getFullYear()} WarungCerdas. All rights reserved. Made with ❤️ for UMKM Indonesia.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Kebijakan Privasi", "Syarat Layanan", "Cookies"].map((t) => (
              <a key={t} href="#" style={{ color: "var(--white-dim)", fontSize: "0.82rem", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--white-dim)")}>
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
