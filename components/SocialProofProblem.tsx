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

export default function SocialProofAndProblem() {
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
          {[...brands, ...brands].map((b, i) => (
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
            {problems.map((p, i) => (
              <div
                key={i}
                className="glass-card feature-card"
                style={{ padding: "24px", cursor: "default" }}
              >
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>{p.icon}</div>
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
              <div className="badge" style={{ marginBottom: 16 }}>✦ Solusi Lengkap</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: 20 }}>
                Satu Platform untuk{" "}
                <span className="gradient-text">Seluruh Operasional</span>{" "}
                Bisnis Anda
              </h2>
              <p style={{ color: "var(--white-dim)", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: 28 }}>
                WarungCerdas hadir sebagai platform SaaS berbasis cloud yang mengintegrasikan seluruh kebutuhan operasional UMKM — dari kasir, stok, laporan keuangan, hingga analitik bisnis berbasis AI.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                {[
                  { icon: <Cloud />, text: "SaaS berbasis cloud, akses dari mana saja" },
                  { icon: <Link />, text: "Sistem terintegrasi satu dashboard" },
                  { icon: <Zap />, text: "Data real-time tanpa delay" },
                  { icon: <Bot />, text: "Otomatisasi operasional dengan AI" },
                  { icon: <BarChart2 />, text: "Business intelligence untuk UMKM" },
                ].map((item) => (
                  <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                    <span style={{ color: "var(--white-dim)", fontSize: "0.95rem" }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <a href="#" className="btn-primary">Pelajari Lebih Lanjut →</a>
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
