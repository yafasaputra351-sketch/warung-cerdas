"use client";
import { useState } from "react";
import {
  Monitor,
  Package,
  Wallet,
  BarChart3,
  Store,
  Users,
  Bell,
  Cloud,
  Smartphone,
  CreditCard,
  MessageCircle,
  Truck,
  Satellite,
  Rocket,


} from "lucide-react";

import { WandSparkles } from "lucide-react";
const features = [
  { icon: <Monitor />, title: "Smart POS System", desc: "Kasir digital cepat dengan barcode scanner, receipt otomatis, dan multi-payment.", color: "#1a6bff" },
  { icon: <Package />, title: "Inventory Management", desc: "Kelola stok secara real-time dengan alert otomatis saat stok mendekati minimum.", color: "#00d4ff" },
  { icon: <Wallet />, title: "Financial Automation", desc: "Laporan keuangan otomatis: laba rugi, neraca, dan arus kas harian.", color: "#00e5a0" },
  { icon: <BarChart3 />, title: "AI Sales Analytics", desc: "Analitik penjualan berbasis AI untuk memahami tren dan peluang pertumbuhan.", color: "#a78bfa" },
  { icon: <Store />, title: "Multi Store Management", desc: "Kelola beberapa cabang toko dari satu dashboard terpusat.", color: "#f59e0b" },
  { icon: <Users />, title: "Employee Management", desc: "Absensi, jadwal, komisi, dan performa karyawan dalam satu sistem.", color: "#ec4899" },
  { icon: <Users />, title: "Customer Database", desc: "CRM sederhana untuk mencatat data pelanggan dan riwayat pembelian.", color: "#3d85ff" },
  { icon: <BarChart3 />, title: "Profit & Loss Report", desc: "Laporan laba rugi otomatis dengan visualisasi grafik yang mudah dipahami.", color: "#00d4ff" },
  { icon: <Bell />, title: "Smart Notification", desc: "Notifikasi cerdas untuk stok kritis, pembayaran jatuh tempo, dan anomali penjualan.", color: "#00e5a0" },
  { icon: <Cloud />, title: "Cloud Sync", desc: "Sinkronisasi data real-time ke cloud, backup otomatis setiap hari.", color: "#1a6bff" },
  { icon: <Smartphone />, title: "Mobile App", desc: "Aplikasi mobile untuk iOS dan Android — monitor bisnis dari genggaman.", color: "#a78bfa" },
  { icon: <CreditCard />, title: "QR Payment", desc: "Terima pembayaran via QRIS, GoPay, OVO, Dana, dan semua e-wallet.", color: "#f59e0b" },
  { icon: <MessageCircle />, title: "WhatsApp Order", desc: "Terima pesanan via WhatsApp dan proses otomatis ke sistem POS.", color: "#25d366" },
  { icon: <Truck />, title: "Supplier Management", desc: "Kelola supplier, PO, dan jadwal pengiriman barang secara digital.", color: "#ec4899" },
  { icon: <WandSparkles />, title: "Restock Prediction", desc: "AI memprediksi kapan stok habis berdasarkan tren penjualan historis.", color: "#a78bfa" },
  { icon: <Satellite />, title: "Real-time Monitoring", desc: "Monitor seluruh aktivitas bisnis secara live dari mana saja.", color: "#00d4ff" },
];

export default function Features() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="features" className="section-pad" style={{ position: "relative", background: "linear-gradient(180deg, var(--navy) 0%, var(--navy-2) 100%)" }}>
      <div className="grid-lines" style={{ opacity: 0.5 }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="badge" style={{ marginBottom: 16 }}><Rocket /> Fitur Lengkap</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
            Semua yang Kamu Butuhkan{" "}
            <span className="gradient-text">Ada di Sini</span>
          </h2>
          <p style={{ color: "var(--white-dim)", fontSize: "1.05rem", maxWidth: 540, margin: "0 auto" }}>
            16 fitur powerful dirancang khusus untuk kebutuhan UMKM Indonesia modern.
          </p>
        </div>

        <div
          className="features-grid reveal"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 18 }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="glass-card feature-card"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: "22px",
                cursor: "default",
                borderColor: hovered === i ? `${f.color}40` : "var(--glass-border)",
                background: hovered === i ? `rgba(10,29,61,0.8)` : "var(--glass)",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${f.color}18`,
                  border: `1px solid ${f.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                  marginBottom: 14,
                  transition: "transform 0.3s",
                  transform: hovered === i ? "scale(1.1)" : "scale(1)",
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", marginBottom: 8, color: hovered === i ? f.color : "var(--white)" }}>
                {f.title}
              </h3>
              <p style={{ color: "var(--white-dim)", fontSize: "0.82rem", lineHeight: 1.6 }}>{f.desc}</p>
              {hovered === i && (
                <div style={{ marginTop: 12, fontSize: "0.78rem", color: f.color, fontWeight: 600 }}>Pelajari lebih →</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
