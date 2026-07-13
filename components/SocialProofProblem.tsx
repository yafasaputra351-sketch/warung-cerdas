"use client";
import { BarChart2, CreditCard, FileText, Users, Zap, Package, Satellite, FileWarning, Cloud, Link, Bot } from "lucide-react";
const brands = [
  "Warung Nusantara", "Toko Maju Jaya", "Kopi Lokal", "Sembako Kita", "UMKM Mart",
  "Dapur Bunda", "Toko Berkah", "Warung Pak Budi",
];



const problems = [
  { icon: <FileText />, title: "Pencatatan Manual", desc: "Transaksi dicatat di buku, rawan salah hitung dan sulit dilacak." },
  { icon: <Package />, title: "Kesalahan Stok", desc: "Stok sering tidak cocok antara fisik dan catatan, menyebabkan kerugian." },
  { icon: <CreditCard />, title: "Arus Kas Tak Terpantau", desc: "Sulit memantau pemasukan dan pengeluaran secara real-time." },
  { icon: <BarChart2 />, title: "Laporan Keuangan Berantakan", desc: "Tidak ada laporan laba rugi yang rapi untuk evaluasi bisnis." },
  { icon: <Users />, title: "Data Bisnis Tersebar", desc: "Data penjualan, stok, dan pelanggan tersebar di berbagai tempat." },
  { icon: <Zap />, title: "Keputusan Berdasarkan Intuisi", desc: "Tanpa data akurat, keputusan bisnis sering kurang tepat." },
  { icon: <FileWarning />, title: "Human Error Tinggi", desc: "Kesalahan manusia dalam pencatatan manual merugikan bisnis." },
  { icon: <Satellite />, title: "Tidak Bisa Monitor Jarak Jauh", desc: "Pemilik tidak bisa memantau toko saat sedang tidak di tempat." },
];

import * as LucideIcons from "lucide-react";

interface SocialProofAndProblemProps {
  partners?: Array<{ id: number; name: string }>;
  problems?: Array<{ id: number; icon: string; title: string; desc: string }>;
  solutionSection?: {
    badge: string;
    title: string;
    description: string;
    btnText: string;
    btnLink: string;
  };
  solutionPoints?: Array<{ id: number; icon: string; text: string }>;
}

function renderDynamicIcon(iconName: string, size: number = 24) {
  const IconComponent = (LucideIcons as any)[iconName];
  if (!IconComponent) return <LucideIcons.HelpCircle size={size} />;
  return <IconComponent size={size} />;
}

export default function SocialProofAndProblem({
  partners,
  problems: cmsProblems,
  solutionSection,
  solutionPoints
}: SocialProofAndProblemProps) {
  const displayBrands = partners && partners.length > 0
    ? partners.map((p) => p.name)
    : brands;

  const displayProblems = cmsProblems && cmsProblems.length > 0
    ? cmsProblems.map((p) => ({
        icon: renderDynamicIcon(p.icon, 24),
        title: p.title,
        desc: p.desc
      }))
    : problems;

  const solBadge = solutionSection?.badge || "✦ Solusi Lengkap";
  const solTitle = solutionSection?.title || "Satu Platform untuk Seluruh Operasional Bisnis Anda";
  const solDesc = solutionSection?.description || "WarungCerdas hadir sebagai platform SaaS berbasis cloud yang mengintegrasikan seluruh kebutuhan operasional UMKM — dari kasir, stok, laporan keuangan, hingga analitik bisnis berbasis AI.";
  const solBtnText = solutionSection?.btnText || "Pelajari Lebih Lanjut →";
  const solBtnLink = solutionSection?.btnLink || "#";

  const displayPoints = solutionPoints && solutionPoints.length > 0
    ? solutionPoints.map((pt) => ({
        icon: renderDynamicIcon(pt.icon, 18),
        text: pt.text
      }))
    : [
        { icon: <Cloud />, text: "SaaS berbasis cloud, akses dari mana saja" },
        { icon: <Link />, text: "Sistem terintegrasi satu dashboard" },
        { icon: <Zap />, text: "Data real-time tanpa delay" },
        { icon: <Bot />, text: "Otomatisasi operasional dengan AI" },
        { icon: <BarChart2 />, text: "Business intelligence untuk UMKM" },
      ];

  const renderSolTitle = (text: string) => {
    const highlight = "Seluruh Operasional";
    if (text.includes(highlight)) {
      const parts = text.split(highlight);
      return (
        <>
          {parts[0]}
          <span className="gradient-text">{highlight}</span>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <>
      {/* SOCIAL PROOF */}
      <section style={{ padding: "50px 0", borderTop: "1px solid rgba(0,212,255,0.08)", borderBottom: "1px solid rgba(0,212,255,0.08)", overflow: "hidden", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", textAlign: "center", marginBottom: 28 }}>
          <p style={{ color: "var(--white-dim)", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
            Dipercaya ribuan UMKM Indonesia
          </p>
        </div>
        <div style={{ display: "flex", gap: 40, animation: "marquee 20s linear infinite", width: "max-content" }}>
          {[...displayBrands, ...displayBrands].map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, whiteSpace: "nowrap", opacity: 0.6, transition: "opacity 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.6")}
            >
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `hsl(${i * 40}, 70%, 55%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 800, color: "white" }}>
                {b[0]}
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.95rem", color: "var(--white)" }}>{b}</span>
            </div>
          ))}
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </section>

      {/* PROBLEM SECTION */}
      <section id="solutions" className="section-pad reveal" style={{ position: "relative", background: "linear-gradient(180deg, var(--navy) 0%, var(--navy-2) 50%, var(--navy) 100%)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="badge" style={{ marginBottom: 16 }}><Zap /> Masalah Nyata UMKM</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
              Tantangan UMKM yang Masih{" "}
              <span className="gradient-text">Menghambat Pertumbuhan</span>
            </h2>
            <p style={{ color: "var(--white-dim)", fontSize: "1.05rem", maxWidth: 560, margin: "0 auto" }}>
              Ribuan UMKM Indonesia masih berjuang dengan masalah operasional klasik yang menghambat pertumbuhan bisnis mereka.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {displayProblems.map((p, i) => (
              <div
                key={i}
                className="glass-card feature-card"
                style={{ padding: "24px", cursor: "default", boxShadow: "none" }}
              >
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "rgba(26, 107, 255, 0.15)",
                  border: "1px solid rgba(26, 107, 255, 0.35)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1a6bff",
                  marginBottom: 16
                }}>
                  {p.icon}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", marginBottom: 8, color: "var(--white)" }}>{p.title}</h3>
                <p style={{ color: "var(--white-dim)", fontSize: "0.875rem", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="section-pad reveal" style={{ position: "relative", overflow: "hidden" }}>
        <div className="mesh-bg" />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="hero-grid">
            {/* Left */}
            <div>
              <div className="badge" style={{ marginBottom: 16 }}>{solBadge}</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: 20 }}>
                {renderSolTitle(solTitle)}
              </h2>
              <p style={{ color: "var(--white-dim)", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: 28 }}>
                {solDesc}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                {displayPoints.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: "1.1rem", display: "flex", color: "var(--cyan)" }}>{item.icon}</span>
                    <span style={{ color: "var(--white-dim)", fontSize: "0.95rem" }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <a href={solBtnLink} className="btn-primary">{solBtnText}</a>
            </div>

            {/* Right – Visual */}
            <div className="float-2" style={{ position: "relative" }}>
              <div className="glass-card" style={{ padding: 28, boxShadow: "0 30px 80px rgba(0,0,0,0.4), 0 0 40px rgba(0,212,255,0.07)" }}>
                <p style={{ color: "var(--white-dim)", fontSize: "0.78rem", marginBottom: 16, fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Ringkasan Operasional</p>
                {[
                  { label: "Transaksi Diproses", value: "1,248", bar: 88, color: "var(--blue)" },
                  { label: "Akurasi Stok", value: "99.7%", bar: 99, color: "var(--emerald)" },
                  { label: "Kepuasan Pelanggan", value: "4.9/5", bar: 95, color: "var(--cyan)" },
                  { label: "Efisiensi Operasional", value: "+67%", bar: 67, color: "#a78bfa" },
                ].map((m) => (
                  <div key={m.label} style={{ marginBottom: 18 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ color: "var(--white-dim)", fontSize: "0.85rem" }}>{m.label}</span>
                      <span style={{ color: "var(--white)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem" }}>{m.value}</span>
                    </div>
                    <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 6, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${m.bar}%`, background: `linear-gradient(90deg, ${m.color}, ${m.color}99)`, borderRadius: 6, transition: "width 1s ease" }} />
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 20, padding: "14px", background: "rgba(0,229,160,0.08)", borderRadius: 12, border: "1px solid rgba(0,229,160,0.2)" }}>
                  <p style={{ color: "var(--emerald)", fontSize: "0.78rem", fontWeight: 700, marginBottom: 4 }}>✦ AI Recommendation</p>
                  <p style={{ color: "var(--white)", fontSize: "0.82rem" }}>Lakukan restock Indomie Goreng — prediksi habis dalam 1.5 hari berdasarkan tren penjualan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
