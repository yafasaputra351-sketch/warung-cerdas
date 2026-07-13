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

import * as LucideIcons from "lucide-react";

interface FeaturesProps {
  data?: Array<{ id: number; icon: string; title: string; desc: string; color: string }>;
}

function renderDynamicIcon(iconName: string, size: number = 22) {
  const IconComponent = (LucideIcons as any)[iconName];
  if (!IconComponent) return <LucideIcons.HelpCircle size={size} />;
  return <IconComponent size={size} />;
}

export default function Features({ data }: FeaturesProps) {

  const displayFeatures = data && data.length > 0
    ? data.map((f) => ({
        icon: renderDynamicIcon(f.icon, 22),
        title: f.title,
        desc: f.desc,
        color: f.color
      }))
    : features;

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
            {displayFeatures.length} fitur powerful dirancang khusus untuk kebutuhan UMKM Indonesia modern.
          </p>
        </div>

        <div
          className="features-grid reveal"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 18 }}
        >
          {displayFeatures.map((f, i) => (
            <div
              key={i}
              className="glass-card feature-card"
              style={{
                padding: "22px",
                cursor: "default",
                boxShadow: "none"
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "rgba(26, 107, 255, 0.15)",
                  border: "1px solid rgba(26, 107, 255, 0.35)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1a6bff",
                  marginBottom: 14
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", marginBottom: 8, color: "var(--white)" }}>
                {f.title}
              </h3>
              <p style={{ color: "var(--white-dim)", fontSize: "0.82rem", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
