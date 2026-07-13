"use client";
import { TrendingUp, Users, ShoppingBag, CreditCard, BarChart2, Zap, Satellite, PartyPopper, Settings, Rocket, ShieldCheck, BookOpen, Lock } from "lucide-react";
import * as LucideIcons from "lucide-react";

const staticBenefits = [
  {
    icon: <Zap />,
    title: "Hemat Waktu Operasional",
    desc: "Otomatisasi proses manual seperti pencatatan transaksi, pembuatan laporan, dan restock reminder. Hemat hingga 5 jam kerja per hari.",
    color: "#1a6bff",
  },
  {
    icon:  <ShieldCheck />,
    title: "Kurangi Human Error",
    desc: "Sistem digital menggantikan pencatatan manual yang rawan salah. Akurasi data meningkat hingga 99.7%.",
    color: "#00d4ff",
  },
  {
    icon: <Satellite />,
    title: "Monitor Bisnis Real-time",
    desc: "Pantau penjualan, stok, dan keuangan kapanpun dan dimanapun dari smartphone atau laptop.",
    color: "#00e5a0",
  },
  {
    icon: <BarChart2 />,
    title: "Keputusan Berbasis Data",
    desc: "Laporan analitik dan insight AI membantu pemilik bisnis membuat keputusan yang lebih tepat dan menguntungkan.",
    color: "#a78bfa",
  },
  {
    icon: <Lock />,
    title: "Data Tersimpan Aman",
    desc: "Enkripsi end-to-end dan backup otomatis harian di cloud memastikan data bisnis kamu selalu aman.",
    color: "#f59e0b",
  },
  {
    icon: <TrendingUp />,
    title: "Dukung Pertumbuhan Bisnis",
    desc: "Skalakan bisnis dari 1 toko menjadi puluhan cabang tanpa kerumitan operasional tambahan.",
    color: "#ec4899",
  },
];

const staticSteps = [
  { num: "01", icon: <Rocket />, title: "Daftar Akun", desc: "Buat akun gratis dalam 2 menit. Tidak perlu kartu kredit atau instalasi software.", time: "2 menit" },
  { num: "02", icon: <Settings />, title: "Input Data Bisnis", desc: "Masukkan data produk, harga, dan informasi toko. Atau impor dari Excel/spreadsheet.", time: "15 menit" },
  { num: "03", icon: <PartyPopper />, title: "Mulai Kelola Bisnis", desc: "Langsung gunakan semua fitur — POS, inventory, laporan, dan analitik AI.", time: "Selamanya" },
];

interface DashboardBenefitsProps {
  preview?: {
    badge: string;
    title: string;
    kpi1Label: string; kpi1Value: string; kpi1Change: string;
    kpi2Label: string; kpi2Value: string; kpi2Change: string;
    kpi3Label: string; kpi3Value: string; kpi3Change: string;
    kpi4Label: string; kpi4Value: string; kpi4Change: string;
  };
  advantages?: Array<{ id: number; icon: string; title: string; desc: string; color: string }>;
  steps?: Array<{ id: number; num: string; icon: string; title: string; desc: string; time: string }>;
}

function renderDynamicIcon(iconName: string, size: number = 20) {
  const IconComponent = (LucideIcons as any)[iconName];
  if (!IconComponent) return <LucideIcons.HelpCircle size={size} />;
  return <IconComponent size={size} />;
}

export default function DashboardBenefitsHowItWorks({ preview, advantages, steps: cmsSteps }: DashboardBenefitsProps) {
  const previewBadge = preview?.badge || "TrendingUp";
  const previewTitle = preview?.title || "Dashboard Modern yang Intuitif & Powerful";

  const displayKpis = [
    { label: preview?.kpi1Label || "Total Revenue", value: preview?.kpi1Value || "Rp 12.4Jt", change: preview?.kpi1Change || "+18%", icon: <TrendingUp size={16} />, color: "var(--emerald)" },
    { label: preview?.kpi2Label || "Total Pelanggan", value: preview?.kpi2Value || "1,847", change: preview?.kpi2Change || "+24%", icon: <Users size={16} />, color: "var(--cyan)" },
    { label: preview?.kpi3Label || "Produk Terjual", value: preview?.kpi3Value || "3,291", change: preview?.kpi3Change || "+11%", icon: <ShoppingBag size={16} />, color: "#a78bfa" },
    { label: preview?.kpi4Label || "Total Transaksi", value: preview?.kpi4Value || "892", change: preview?.kpi4Change || "+9%", icon: <CreditCard size={16} />, color: "var(--blue-light)" },
  ];

  const displayBenefits = advantages && advantages.length > 0
    ? advantages.map((adv) => ({
        icon: renderDynamicIcon(adv.icon, 20),
        title: adv.title,
        desc: adv.desc,
        color: adv.color
      }))
    : staticBenefits;

  const displaySteps = cmsSteps && cmsSteps.length > 0
    ? cmsSteps.map((s) => ({
        num: s.num,
        icon: renderDynamicIcon(s.icon, 24),
        title: s.title,
        desc: s.desc,
        time: s.time
      }))
    : staticSteps;

  const renderPreviewTitle = (text: string) => {
    const highlight = "Intuitif & Powerful";
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
      {/* DASHBOARD PREVIEW */}
      <section className="section-pad reveal" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, var(--navy-2) 0%, var(--navy) 100%)" }}>
        <div className="mesh-bg" />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
              {renderDynamicIcon(previewBadge, 14)}
              Preview Aplikasi
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
              {renderPreviewTitle(previewTitle)}
            </h2>
          </div>

          <div className="glass-card float-2" style={{ padding: 28, boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 60px rgba(0,212,255,0.06)", maxWidth: 960, margin: "0 auto" }}>
            {/* Top bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", gap: 8 }}>
                {["Ringkasan", "Penjualan", "Keuangan", "Inventori"].map((t, i) => (
                  <button key={t} style={{ padding: "6px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.8rem", background: i === 0 ? "var(--blue)" : "rgba(255,255,255,0.05)", color: i === 0 ? "white" : "var(--white-dim)", transition: "all 0.2s" }}>
                    {t}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ background: "rgba(0,229,160,0.15)", color: "var(--emerald)", padding: "4px 10px", borderRadius: 6, fontSize: "0.72rem", fontWeight: 700 }}>● LIVE</span>
                <span style={{ color: "var(--white-dim)", fontSize: "0.78rem" }}>Hari ini, 14:23</span>
              </div>
            </div>

            {/* KPI row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }} className="stats-grid">
              {displayKpis.map((k) => (
                <div key={k.label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "16px", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ color: "var(--white-dim)", fontSize: "0.75rem" }}>{k.label}</span>
                    <span style={{ color: k.color }}>{k.icon}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", marginBottom: 4 }}>{k.value}</p>
                  <span style={{ color: k.color, fontSize: "0.72rem", fontWeight: 700 }}>↑ {k.change} bulan ini</span>
                </div>
              ))}
            </div>

            {/* Charts row */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
              {/* Bar chart */}
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "18px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <div>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem" }}>Revenue vs Target</p>
                    <p style={{ color: "var(--white-dim)", fontSize: "0.72rem" }}>6 bulan terakhir</p>
                  </div>
                  <BarChart2 size={18} color="var(--blue-light)" />
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 90 }}>
                  {[
                    { rev: 60, target: 75 }, { rev: 72, target: 75 }, { rev: 68, target: 80 },
                    { rev: 85, target: 80 }, { rev: 78, target: 85 }, { rev: 95, target: 90 },
                  ].map((d, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", gap: 3, alignItems: "flex-end", height: "100%" }}>
                      <div style={{ flex: 1, background: "linear-gradient(180deg, var(--blue), rgba(26,107,255,0.3))", borderRadius: "4px 4px 0 0", height: `${d.rev}%`, transition: "height 0.5s" }} />
                      <div style={{ flex: 1, background: "rgba(0,212,255,0.2)", borderRadius: "4px 4px 0 0", height: `${d.target}%` }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--blue)" }} /><span style={{ fontSize: "0.7rem", color: "var(--white-dim)" }}>Revenue</span></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(0,212,255,0.3)" }} /><span style={{ fontSize: "0.7rem", color: "var(--white-dim)" }}>Target</span></div>
                </div>
              </div>

              {/* Donut + top products */}
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "18px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", marginBottom: 14 }}>Top Kategori</p>
                {[
                  { label: "Makanan", pct: 42, color: "var(--blue)" },
                  { label: "Minuman", pct: 28, color: "var(--cyan)" },
                  { label: "Snack", pct: 18, color: "var(--emerald)" },
                  { label: "Lainnya", pct: 12, color: "#a78bfa" },
                ].map((c) => (
                  <div key={c.label} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--white-dim)" }}>{c.label}</span>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: c.color }}>{c.pct}%</span>
                    </div>
                    <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
                      <div style={{ width: `${c.pct}%`, height: "100%", background: c.color, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section-pad reveal" style={{ position: "relative" }}>
        <div className="grid-lines" style={{ opacity: 0.4 }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="badge" style={{ marginBottom: 16 }}><PartyPopper /> Keuntungan Nyata</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, lineHeight: 1.2 }}>
              Mengapa UMKM Pilih{" "}
              <span className="gradient-text">WarungCerdas?</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {displayBenefits.map((b, i) => (
              <div
                key={i}
                className="glass-card feature-card"
                style={{ padding: "28px", display: "flex", gap: 18, boxShadow: "none" }}
              >
                <div style={{
                  width: 44,
                  height: 44,
                  flexShrink: 0,
                  borderRadius: 10,
                  background: "rgba(26, 107, 255, 0.15)",
                  border: "1px solid rgba(26, 107, 255, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1a6bff"
                }}>
                  {b.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", marginBottom: 8 }}>{b.title}</h3>
                  <p style={{ color: "var(--white-dim)", fontSize: "0.875rem", lineHeight: 1.65 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-pad reveal" style={{ position: "relative", background: "linear-gradient(180deg, var(--navy) 0%, var(--navy-2) 100%)" }}>
        <div className="mesh-bg" />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="badge" style={{ marginBottom: 16 }}><BookOpen /> Cara Kerja</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, lineHeight: 1.2 }}>
              Mulai dalam{" "}
              <span className="gradient-text">3 Langkah Mudah</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, position: "relative" }} className="features-grid">
            {/* Connector line */}
            <div style={{ position: "absolute", top: 60, left: "17%", right: "17%", height: 2, background: "linear-gradient(90deg, var(--blue), var(--cyan), var(--emerald))", opacity: 0.3, display: "none" }} className="hide-mobile" />
            {displaySteps.map((s, i) => (
              <div key={i} style={{ textAlign: "center", position: "relative" }}>
                <div style={{ position: "relative", display: "inline-block", marginBottom: 24 }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, var(--blue), var(--cyan))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto", boxShadow: "0 10px 30px rgba(26,107,255,0.35)" }}>
                    {s.icon}
                  </div>
                  <div style={{ position: "absolute", top: -4, right: -4, width: 26, height: 26, borderRadius: "50%", background: "var(--navy)", border: "2px solid var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.7rem", color: "var(--cyan)" }}>
                    {s.num}
                  </div>
                </div>
                <span style={{ display: "inline-block", background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.25)", color: "var(--emerald)", padding: "3px 10px", borderRadius: 6, fontSize: "0.72rem", fontWeight: 700, marginBottom: 12 }}>
                  {s.time}
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem", marginBottom: 12 }}>{s.title}</h3>
                <p style={{ color: "var(--white-dim)", fontSize: "0.9rem", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <a href="#" className="btn-primary" style={{ fontSize: "1rem", padding: "16px 36px" }}>
              <Zap size={18} /> Mulai Sekarang — Gratis!
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
