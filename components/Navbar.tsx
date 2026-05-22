"use client";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

const links = [
  { href: "#features", label: "Fitur" },
  { href: "#solutions", label: "Solusi" },
  { href: "#pricing", label: "Harga" },
  { href: "#testimonials", label: "Testimoni" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Kontak" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 24px",
        transition: "all 0.4s ease",
        background: scrolled
          ? "rgba(255,255,255,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(26,107,255,0.1)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(26,107,255,0.08)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "linear-gradient(135deg, #1a6bff, #00aadd)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(26,107,255,0.35)",
            }}
          >
            <Zap size={20} color="white" fill="white" />
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.2rem",
              background: "linear-gradient(135deg, #0d1f3c, #1a6bff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            WarungCerdas
          </span>
        </a>

        {/* Desktop Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="navbar-desktop hide-mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }} className="hide-mobile">
          <a href="#" className="btn-outline" style={{ padding: "10px 20px", fontSize: "0.875rem" }}>
            Login
          </a>
          <a href="#" className="btn-primary" style={{ padding: "10px 20px", fontSize: "0.875rem" }}>
            Coba Gratis
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            background: "transparent",
            border: "1px solid rgba(26,107,255,0.2)",
            borderRadius: 8,
            padding: "8px",
            color: "var(--white)",
            cursor: "pointer",
          }}
          className="hamburger-btn"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(26,107,255,0.1)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link"
              onClick={() => setMobileOpen(false)}
              style={{ fontSize: "1rem", padding: "8px 0" }}
            >
              {l.label}
            </a>
          ))}
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <a href="#" className="btn-outline" style={{ flex: 1, justifyContent: "center", padding: "12px" }}>
              Login
            </a>
            <a href="#" className="btn-primary" style={{ flex: 1, justifyContent: "center", padding: "12px" }}>
              Coba Gratis
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
