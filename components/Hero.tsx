"use client";
import { ArrowRight, Play, Cloud, BarChart2, Shield, Smartphone, Star, TrendingUp, Package, Bell } from "lucide-react";

const miniBadges = [
  { icon: <Cloud size={13} />, text: "Cloud Based" },
  { icon: <BarChart2 size={13} />, text: "Real-time Analytics" },
  { icon: <Shield size={13} />, text: "Secure Data" },
  { icon: <Smartphone size={13} />, text: "Multi Device" },
];

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: 80,
        overflow: "hidden",
      }}
    >
      <div className="mesh-bg" />
      <div className="grid-lines" />

      {/* Floating orbs */}
      <div style={{ position: "absolute", top: "15%", right: "8%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.12), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", left: "5%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,160,0.1), transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, width: "100%" }}>
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* LEFT */}
          <div>
            <div className="badge" style={{ marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--emerald)", display: "inline-block" }} />
              Platform #1 UMKM Indonesia
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: 20,
              }}
            >
              Transformasi Digital{" "}
              <span className="gradient-text">UMKM Indonesia</span>{" "}
              Dimulai dari Sini
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--white-dim)",
                lineHeight: 1.75,
                marginBottom: 32,
                maxWidth: 520,
              }}
            >
              Kelola transaksi, stok barang, laporan keuangan, analitik bisnis, dan operasional usaha dalam satu platform cloud terintegrasi yang cepat, modern, dan mudah digunakan.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 36 }}>
              <a href="#" className="btn-primary" style={{ fontSize: "1rem", padding: "15px 28px" }}>
                Coba Gratis 14 Hari <ArrowRight size={18} />
              </a>
              <a href="#" className="btn-outline" style={{ fontSize: "1rem", padding: "15px 28px" }}>
                <Play size={16} fill="currentColor" /> Lihat Demo
              </a>
            </div>

            {/* Social proof */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
              <div style={{ display: "flex" }}>
                {["#3d85ff", "#00d4ff", "#00e5a0", "#3d85ff", "#1a6bff"].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${c}, #050d1a)`,
                      border: "2px solid #050d1a",
                      marginLeft: i === 0 ? 0 : -10,
                      fontSize: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: 700,
                    }}
                  >
                    {["W", "T", "K", "S", "U"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />
                  ))}
                  <span style={{ color: "var(--white)", fontWeight: 700, fontSize: "0.95rem", marginLeft: 4 }}>4.9/5</span>
                </div>
                <p style={{ color: "var(--white-dim)", fontSize: "0.82rem" }}>Dipercaya 10.000+ UMKM Indonesia</p>
              </div>
            </div>

            {/* Mini badges */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {miniBadges.map((b) => (
                <div
                  key={b.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "6px 12px",
                    borderRadius: 8,
                    fontSize: "0.78rem",
                    color: "var(--white-dim)",
                  }}
                >
                  <span style={{ color: "var(--cyan)" }}>{b.icon}</span>
                  {b.text}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT – Dashboard Mockup */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div className="float-2" style={{ position: "relative", width: "100%", maxWidth: 520 }}>
              {/* Main dashboard card */}
              <div
                className="glass-card"
                style={{
                  padding: 24,
                  boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(0,212,255,0.08)",
                }}
              >
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div>
                    <p style={{ color: "var(--white-dim)", fontSize: "0.78rem" }}>Dashboard Utama</p>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem" }}>Selamat Datang 👋</h3>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["#ff5f57", "#ffbd2e", "#28ca41"].map((c) => (
                      <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                    ))}
                  </div>
                </div>

                {/* Stats Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
                  {[
                    { label: "Revenue Hari Ini", value: "Rp 4.2Jt", change: "+12%", color: "var(--emerald)" },
                    { label: "Total Transaksi", value: "148", change: "+8%", color: "var(--cyan)" },
                    { label: "Produk Terjual", value: "312", change: "+5%", color: "var(--blue-light)" },
                  ].map((s) => (
                    <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 10px", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <p style={{ color: "var(--white-dim)", fontSize: "0.68rem", marginBottom: 4 }}>{s.label}</p>
                      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", marginBottom: 2 }}>{s.value}</p>
                      <span style={{ color: s.color, fontSize: "0.7rem", fontWeight: 600 }}>↑ {s.change}</span>
                    </div>
                  ))}
                </div>

                {/* Revenue Chart */}
                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "14px", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.85rem" }}>Revenue Mingguan</p>
                    <span style={{ color: "var(--emerald)", fontSize: "0.75rem", fontWeight: 600 }}>+18% vs minggu lalu</span>
                  </div>
                  {/* SVG Chart */}
                  <svg viewBox="0 0 400 80" style={{ width: "100%", height: 80 }}>
                    <defs>
                      <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1a6bff" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#1a6bff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,70 L55,55 L110,60 L165,35 L220,45 L275,20 L330,30 L385,10 L385,80 L0,80 Z" fill="url(#chartGrad)" />
                    <path d="M0,70 L55,55 L110,60 L165,35 L220,45 L275,20 L330,30 L385,10" fill="none" stroke="#1a6bff" strokeWidth="2.5" strokeLinecap="round" />
                    {[0,55,110,165,220,275,330,385].map((x, i) => {
                      const ys = [70,55,60,35,45,20,30,10];
                      return <circle key={i} cx={x} cy={ys[i]} r="3.5" fill="#00d4ff" />;
                    })}
                  </svg>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                    {["Sen","Sel","Rab","Kam","Jum","Sab","Min"].map((d) => (
                      <span key={d} style={{ color: "var(--white-dim)", fontSize: "0.65rem" }}>{d}</span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <Package size={14} color="var(--cyan)" />
                      <p style={{ fontSize: "0.75rem", fontWeight: 600 }}>Stok Kritis</p>
                    </div>
                    {["Mie Goreng", "Kopi Sachet", "Teh Botol"].map((p, i) => (
                      <div key={p} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ color: "var(--white-dim)", fontSize: "0.68rem" }}>{p}</span>
                        <span style={{ color: ["#ff5f57","#ffbd2e","#ff5f57"][i], fontSize: "0.68rem", fontWeight: 600 }}>{[3,7,2][i]} pcs</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <TrendingUp size={14} color="var(--emerald)" />
                      <p style={{ fontSize: "0.75rem", fontWeight: 600 }}>Top Produk</p>
                    </div>
                    {["Indomie Goreng", "Aqua 600ml", "Rokok Surya"].map((p, i) => (
                      <div key={p} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <span style={{ color: "var(--white-dim)", fontSize: "0.68rem" }}>{p}</span>
                        <div style={{ height: 4, width: [70,55,40][i], background: `linear-gradient(90deg, var(--blue), var(--cyan))`, borderRadius: 2 }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating notification card */}
              <div
                className="glass-card float-1"
                style={{
                  position: "absolute",
                  top: -24,
                  right: -28,
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  minWidth: 200,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(0,229,160,0.15)", border: "1px solid rgba(0,229,160,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Bell size={16} color="var(--emerald)" />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.8rem" }}>Pesanan Baru!</p>
                  <p style={{ color: "var(--white-dim)", fontSize: "0.7rem" }}>Rp 145.000 • 2 menit lalu</p>
                </div>
              </div>

              {/* Floating AI insight card */}
              <div
                className="glass-card float-3"
                style={{
                  position: "absolute",
                  bottom: -20,
                  left: -24,
                  padding: "12px 16px",
                  minWidth: 210,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                  borderColor: "rgba(26,107,255,0.3)",
                }}
              >
                <p style={{ color: "var(--cyan)", fontSize: "0.68rem", fontWeight: 700, marginBottom: 4, letterSpacing: "0.08em" }}>✦ AI INSIGHT</p>
                <p style={{ fontSize: "0.78rem", color: "var(--white)", fontWeight: 500 }}>Stok Indomie perlu diisi ulang dalam 2 hari</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
