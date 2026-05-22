"use client";
import { useState, useEffect, useRef } from "react";
import { Star, Check, Zap, MapPin, Rocket, Store,Cloud  } from "lucide-react";

const testimonials = [
  { name: "Budi Santoso", role: "Pemilik Warung Nusantara", city: "Yogyakarta", avatar: "BS", color: "#1a6bff", text: "Sejak pakai WarungCerdas, laporan keuangan saya beres otomatis. Dulu butuh 2 jam ngehitung manual, sekarang tinggal buka dashboard langsung keliatan semua.", rating: 5 },
  { name: "Siti Rahayu", role: "Owner Kopi Lokal", city: "Bandung", avatar: "SR", color: "#00d4ff", text: "Fitur analitik AI-nya keren banget! Saya jadi tahu produk mana yang paling laku dan kapan harus restock. Omzet naik 40% dalam 3 bulan.", rating: 5 },
  { name: "Ahmad Fauzi", role: "Pemilik Sembako Kita", city: "Surabaya", avatar: "AF", color: "#00e5a0", text: "Multi-store management-nya mantap. Saya punya 3 cabang, semua bisa dipantau dari HP. Nggak perlu bolak-balik ke toko lagi.", rating: 5 },
  { name: "Dewi Kartika", role: "Owner Dapur Bunda", city: "Jakarta", avatar: "DK", color: "#a78bfa", text: "Interface-nya clean dan mudah dipahami. Karyawan saya yang nggak melek teknologi pun bisa langsung pakai. Support tim-nya juga responsif banget.", rating: 5 },
  { name: "Rudi Hermawan", role: "Pemilik Toko Berkah", city: "Semarang", avatar: "RH", color: "#f59e0b", text: "WhatsApp order integration-nya game changer! Pesanan masuk otomatis ke sistem, nggak ada lagi yang kelewat atau salah catat. Recommended!", rating: 5 },
];

const pricingData = {
  monthly: [
    { name: "Starter", price: 99, desc: "Untuk usaha kecil yang baru mulai digital", color: "#1a6bff", features: ["1 Toko", "POS System", "Inventory Basic", "Laporan Harian", "Support Email", "500 Transaksi/bulan", "Cloud Backup"], popular: false },
    { name: "Business", price: 249, desc: "Solusi terbaik untuk UMKM berkembang", color: "#00d4ff", features: ["3 Toko", "Semua Fitur Starter", "AI Analytics", "Employee Mgmt", "WhatsApp Order", "QR Payment", "Support 24/7", "Unlimited Transaksi", "Custom Report"], popular: true },
    { name: "Enterprise", price: 599, desc: "Untuk bisnis multi-cabang dan skala besar", color: "#00e5a0", features: ["Unlimited Toko", "Semua Fitur Business", "Dedicated Support", "Custom Integration", "API Access", "SLA 99.9%", "On-site Training", "White Label Option"], popular: false },
  ],
  annual: [
    { name: "Starter", price: 79, desc: "Untuk usaha kecil yang baru mulai digital", color: "#1a6bff", features: ["1 Toko", "POS System", "Inventory Basic", "Laporan Harian", "Support Email", "500 Transaksi/bulan", "Cloud Backup"], popular: false },
    { name: "Business", price: 199, desc: "Solusi terbaik untuk UMKM berkembang", color: "#00d4ff", features: ["3 Toko", "Semua Fitur Starter", "AI Analytics", "Employee Mgmt", "WhatsApp Order", "QR Payment", "Support 24/7", "Unlimited Transaksi", "Custom Report"], popular: true },
    { name: "Enterprise", price: 479, desc: "Untuk bisnis multi-cabang dan skala besar", color: "#00e5a0", features: ["Unlimited Toko", "Semua Fitur Business", "Dedicated Support", "Custom Integration", "API Access", "SLA 99.9%", "On-site Training", "White Label Option"], popular: false },
  ],
};

const stats = [
  { value: 10000, suffix: "+", label: "UMKM Aktif", icon: <Store/> },
  { value: 1, suffix: "Jt+", label: "Transaksi Diproses", icon: <Zap /> },
  { value: 99.9, suffix: "%", label: "Uptime", icon: <Rocket />, decimal: true },
  { value: 50, suffix: "+", label: "Kota di Indonesia", icon: <MapPin /> },
  { value: 4.9, suffix: "/5", label: "Rating Pengguna", icon: <Star />  , decimal: true },
];

function useCountUp(target: number, duration = 2000, decimal = false) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(parseFloat((ease * target).toFixed(decimal ? 1 : 0)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration, decimal]);
  return { count, ref };
}

function StatCard({ stat }: { stat: typeof stats[0] }) {
  const { count, ref } = useCountUp(stat.value, 2000, stat.decimal);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{
        width: 54,
        height: 54,
        margin: "0 auto 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 14,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}>
        {stat.icon}
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", background: "linear-gradient(135deg, var(--white), var(--cyan))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>
        {count}{stat.suffix}
      </div>
      <p style={{ color: "var(--white-dim)", fontSize: "0.9rem", marginTop: 8 }}>{stat.label}</p>
    </div>
  );
}

export default function TestimonialsPricingStats() {
  const [active, setActive] = useState(0);
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const plans = pricingData[billing];

  return (
    <>
      {/* STATS */}
      <section className="section-pad reveal" style={{ position: "relative", background: "linear-gradient(180deg, var(--navy-2) 0%, var(--navy-3) 50%, var(--navy-2) 100%)" }}>
        <div className="mesh-bg" />
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 32 }} className="stats-grid">
            {stats.map((s) => <StatCard key={s.label} stat={s} />)}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="section-pad reveal" style={{ position: "relative" }}>
        <div className="grid-lines" style={{ opacity: 0.4 }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 16 }}><Cloud /> Testimoni</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800 }}>
              Apa Kata{" "}
              <span className="gradient-text">Pengguna Kami?</span>
            </h2>
          </div>

          {/* Main card */}
          <div className="glass-card" style={{ padding: "40px 44px", maxWidth: 780, margin: "0 auto 32px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", position: "relative" }}>
            <div style={{ fontSize: "3rem", color: "var(--blue)", opacity: 0.3, position: "absolute", top: 20, left: 32, lineHeight: 1, fontFamily: "Georgia, serif" }}>"</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              {[...Array(testimonials[active].rating)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />)}
            </div>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.75, color: "var(--white)", marginBottom: 28, fontStyle: "italic" }}>{testimonials[active].text}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${testimonials[active].color}, ${testimonials[active].color}80)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, color: "white", fontSize: "0.95rem" }}>
                {testimonials[active].avatar}
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem" }}>{testimonials[active].name}</p>
                <p style={{ color: "var(--white-dim)", fontSize: "0.82rem" }}>{testimonials[active].role} • {testimonials[active].city}</p>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 24 : 8, height: 8, borderRadius: 4, border: "none", cursor: "pointer", background: i === active ? "var(--blue)" : "rgba(255,255,255,0.2)", transition: "all 0.3s" }} />
            ))}
          </div>

          {/* Thumbnail row */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            {testimonials.map((t, i) => (
              <button key={i} onClick={() => setActive(i)} style={{ display: "flex", alignItems: "center", gap: 8, background: i === active ? "rgba(26,107,255,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${i === active ? "rgba(26,107,255,0.4)" : "rgba(255,255,255,0.08)"}`, borderRadius: 12, padding: "8px 14px", cursor: "pointer", transition: "all 0.3s" }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg, ${t.color}, ${t.color}80)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 800, color: "white", fontFamily: "var(--font-display)" }}>{t.avatar}</div>
                <span style={{ color: "var(--white-dim)", fontSize: "0.78rem", fontWeight: 500 }}>{t.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="section-pad reveal" style={{ position: "relative", background: "linear-gradient(180deg, var(--navy) 0%, var(--navy-2) 100%)" }}>
        <div className="mesh-bg" />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 16 }}>💎 Harga</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, marginBottom: 16 }}>
              Harga Transparan,{" "}
              <span className="gradient-text">Nilai Maksimal</span>
            </h2>
            {/* Toggle */}
            <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", borderRadius: 12, padding: 4, gap: 4 }}>
              {(["monthly", "annual"] as const).map((b) => (
                <button key={b} onClick={() => setBilling(b)} className={`toggle-btn ${billing === b ? "active" : "inactive"}`}>
                  {b === "monthly" ? "Bulanan" : "Tahunan"}
                  {b === "annual" && <span style={{ marginLeft: 6, background: "rgba(0,229,160,0.2)", color: "var(--emerald)", padding: "2px 8px", borderRadius: 6, fontSize: "0.7rem", fontWeight: 700 }}>Hemat 20%</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "center" }}>
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className="glass-card"
                style={{
                  padding: plan.popular ? "36px 28px" : "28px",
                  position: "relative",
                  borderColor: plan.popular ? "rgba(0,212,255,0.4)" : "var(--glass-border)",
                  transform: plan.popular ? "scale(1.04)" : "scale(1)",
                  boxShadow: plan.popular ? "0 30px 70px rgba(0,212,255,0.12)" : "none",
                }}
              >
                {plan.popular && (
                  <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, var(--blue), var(--cyan))", padding: "5px 18px", borderRadius: 100, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.75rem", whiteSpace: "nowrap", boxShadow: "0 4px 15px rgba(0,212,255,0.4)" }}>
                    ✦ Paling Populer
                  </div>
                )}
                <div style={{ marginBottom: 4 }}>
                  <span style={{ color: plan.color, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem" }}>{plan.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", color: "var(--white-dim)" }}>Rp</span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.5rem" }}>{plan.price}k</span>
                  <span style={{ color: "var(--white-dim)", fontSize: "0.85rem" }}>/bulan</span>
                </div>
                <p style={{ color: "var(--white-dim)", fontSize: "0.82rem", marginBottom: 24, lineHeight: 1.5 }}>{plan.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {plan.features.map((f) => (
                    <div key={f} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: `${plan.color}20`, border: `1px solid ${plan.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check size={10} color={plan.color} strokeWidth={3} />
                      </div>
                      <span style={{ color: "var(--white-dim)", fontSize: "0.85rem" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="#"
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "13px",
                    borderRadius: 12,
                    textDecoration: "none",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    transition: "all 0.3s",
                    background: plan.popular ? `linear-gradient(135deg, var(--blue), var(--cyan))` : "rgba(255,255,255,0.06)",
                    color: "white",
                    border: plan.popular ? "none" : "1px solid rgba(255,255,255,0.12)",
                    boxShadow: plan.popular ? "0 8px 25px rgba(26,107,255,0.4)" : "none",
                  }}
                >
                  {plan.name === "Enterprise" ? "Hubungi Kami" : "Mulai Gratis 14 Hari"}
                </a>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", color: "var(--white-dim)", fontSize: "0.85rem", marginTop: 28 }}>
            ✓ Tidak perlu kartu kredit &nbsp;•&nbsp; ✓ Bisa cancel kapan saja &nbsp;•&nbsp; ✓ Support 24/7
          </p>
        </div>
      </section>
    </>
  );
}
