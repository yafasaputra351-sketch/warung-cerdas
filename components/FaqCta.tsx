"use client";
import { useState } from "react";
import { Plus, Zap, CalendarDays,HelpCircle  } from "lucide-react";

const faqs = [
  { q: "Apakah data bisnis saya aman?", a: "Ya, sangat aman. Semua data dienkripsi dengan standar AES-256 dan disimpan di server cloud tier-1. Kami melakukan backup otomatis setiap hari dan memiliki sertifikasi keamanan ISO 27001." },
  { q: "Apakah bisa digunakan di banyak perangkat?", a: "Tentu! WarungCerdas bisa diakses dari browser (desktop/laptop), aplikasi Android, dan iOS secara bersamaan. Semua data tersinkronisasi real-time antar perangkat." },
  { q: "Apakah ada masa trial gratis?", a: "Ya! Kami memberikan trial gratis 14 hari untuk semua paket tanpa perlu kartu kredit. Kamu bisa menjelajahi semua fitur secara penuh selama masa trial." },
  { q: "Apakah cocok untuk usaha kecil sekalipun?", a: "Sangat cocok! WarungCerdas dirancang khusus untuk UMKM Indonesia, mulai dari warung kecil hingga toko multi-cabang. Paket Starter kami sangat terjangkau dan mudah digunakan." },
  { q: "Bagaimana layanan customer support?", a: "Kami menyediakan support via WhatsApp, email, dan live chat. Untuk paket Business ke atas, support tersedia 24/7. Tim kami siap membantu onboarding dan troubleshooting kapanpun." },
  { q: "Apakah perlu keahlian teknis untuk menggunakannya?", a: "Sama sekali tidak! Interface WarungCerdas dirancang sesederhana mungkin. Karyawan tanpa latar belakang IT pun bisa langsung menggunakannya dalam hitungan menit." },
  { q: "Apakah bisa digunakan di HP saja?", a: "Bisa! Aplikasi mobile kami tersedia di Google Play Store dan App Store. Semua fitur utama bisa diakses dari smartphone, termasuk POS, monitoring stok, dan laporan keuangan." },
];

export default function FaqCta() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {/* FAQ */}
      <section id="faq" className="section-pad reveal" style={{ position: "relative" }}>
        <div className="grid-lines" style={{ opacity: 0.3 }} />
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 16 }}><HelpCircle /> FAQ</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, lineHeight: 1.2 }}>
              Pertanyaan yang{" "}
              <span className="gradient-text">Sering Ditanyakan</span>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glass-card"
                style={{
                  borderColor: openIndex === i ? "rgba(0,212,255,0.3)" : "var(--glass-border)",
                  overflow: "hidden",
                  transition: "border-color 0.3s",
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 24px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: 16,
                  }}
                >
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.98rem", color: openIndex === i ? "var(--cyan)" : "var(--white)", flex: 1, lineHeight: 1.4 }}>
                    {faq.q}
                  </span>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: openIndex === i ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.06)",
                      border: `1px solid ${openIndex === i ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.1)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.3s",
                      transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    <Plus size={14} color={openIndex === i ? "var(--cyan)" : "var(--white-dim)"} />
                  </div>
                </button>

                <div
                  style={{
                    maxHeight: openIndex === i ? 200 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.4s ease",
                  }}
                >
                  <p style={{ padding: "0 24px 20px", color: "var(--white-dim)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <p style={{ color: "var(--white-dim)", fontSize: "0.9rem" }}>
              Masih ada pertanyaan?{" "}
              <a href="#contact" style={{ color: "var(--cyan)", textDecoration: "none", fontWeight: 600 }}>
                Hubungi tim kami →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-pad reveal" style={{ position: "relative", overflow: "hidden" }}>
        {/* Gradient background */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,107,255,0.2) 0%, rgba(0,212,255,0.1) 40%, rgba(0,229,160,0.12) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(26,107,255,0.15), transparent)" }} />
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(0,212,255,0.1)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 300, height: 300, borderRadius: "50%", border: "1px solid rgba(0,229,160,0.08)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, textAlign: "center" }}>
          <div className="badge" style={{ marginBottom: 24, background: "rgba(0,229,160,0.12)", borderColor: "rgba(0,229,160,0.3)", color: "var(--emerald)" }}>
            🚀 Mulai Sekarang
          </div>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: 20 }}>
            Mulai Digitalisasi Bisnis{" "}
            <span className="gradient-text">Anda Hari Ini</span>
          </h2>

          <p style={{ color: "var(--white-dim)", fontSize: "1.1rem", lineHeight: 1.75, marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>
            WarungCerdas membantu UMKM Indonesia tumbuh lebih modern, efisien, dan berbasis data. Bergabunglah dengan 10.000+ UMKM yang sudah bertransformasi.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
            <a href="#" className="btn-primary" style={{ fontSize: "1.05rem", padding: "16px 32px", boxShadow: "0 12px 40px rgba(26,107,255,0.5)" }}>
              <Zap size={18} /> Start Free Trial — 14 Hari
            </a>
            <a href="#" className="btn-outline" style={{ fontSize: "1.05rem", padding: "16px 32px", borderColor: "rgba(0,229,160,0.3)", color: "var(--emerald)" }}>
              <CalendarDays size={18} /> Schedule Demo
            </a>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap" }}>
            {["✓ Gratis 14 hari", "✓ Tanpa kartu kredit", "✓ Setup 5 menit", "✓ Cancel kapan saja"].map((t) => (
              <span key={t} style={{ color: "var(--white-dim)", fontSize: "0.875rem" }}>{t}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
