import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WarungCerdas – Platform SaaS UMKM Indonesia",
  description: "Platform SaaS berbasis cloud untuk digitalisasi UMKM Indonesia. Kelola transaksi, stok, laporan keuangan, dan analitik bisnis dalam satu platform terintegrasi.",
  keywords: "SaaS UMKM, platform kasir digital, manajemen toko, laporan keuangan, Indonesia",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
