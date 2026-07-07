"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Zap, Save, Plus, Edit2, Trash2, ArrowLeft, RefreshCw, CheckCircle, AlertCircle,
  FileText, Package, CreditCard, BarChart2, Users, FileWarning, Satellite, Cloud,
  Link as LinkIcon, Bot, Monitor, Wallet, BarChart3, Store, Bell, Smartphone,
  MessageCircle, Truck, WandSparkles, ShieldCheck, Lock, TrendingUp, Rocket,
  Settings, PartyPopper, MapPin, Star, HelpCircle, Check, Play, Globe
} from "lucide-react";
import LandingPageApi, { LandingPageData } from "./api";

// Available Lucide Icons for selection in CMS
const ICON_OPTIONS = [
  { name: "FileText", icon: <FileText size={16} /> },
  { name: "Package", icon: <Package size={16} /> },
  { name: "CreditCard", icon: <CreditCard size={16} /> },
  { name: "BarChart2", icon: <BarChart2 size={16} /> },
  { name: "BarChart3", icon: <BarChart3 size={16} /> },
  { name: "Users", icon: <Users size={16} /> },
  { name: "Zap", icon: <Zap size={16} /> },
  { name: "FileWarning", icon: <FileWarning size={16} /> },
  { name: "Satellite", icon: <Satellite size={16} /> },
  { name: "Cloud", icon: <Cloud size={16} /> },
  { name: "Link", icon: <LinkIcon size={16} /> },
  { name: "Bot", icon: <Bot size={16} /> },
  { name: "Monitor", icon: <Monitor size={16} /> },
  { name: "Wallet", icon: <Wallet size={16} /> },
  { name: "Store", icon: <Store size={16} /> },
  { name: "Bell", icon: <Bell size={16} /> },
  { name: "Smartphone", icon: <Smartphone size={16} /> },
  { name: "MessageCircle", icon: <MessageCircle size={16} /> },
  { name: "Truck", icon: <Truck size={16} /> },
  { name: "WandSparkles", icon: <WandSparkles size={16} /> },
  { name: "ShieldCheck", icon: <ShieldCheck size={16} /> },
  { name: "Lock", icon: <Lock size={16} /> },
  { name: "TrendingUp", icon: <TrendingUp size={16} /> },
  { name: "Rocket", icon: <Rocket size={16} /> },
  { name: "Settings", icon: <Settings size={16} /> },
  { name: "PartyPopper", icon: <PartyPopper size={16} /> },
  { name: "MapPin", icon: <MapPin size={16} /> },
  { name: "Star", icon: <Star size={16} /> },
  { name: "HelpCircle", icon: <HelpCircle size={16} /> },
  { name: "Check", icon: <Check size={16} /> },
  { name: "Play", icon: <Play size={16} /> },
  { name: "Globe", icon: <Globe size={16} /> }
];



export default function AdminPage() {
  const [data, setData] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("hero");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Form states
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isAddMode, setIsAddMode] = useState<boolean>(false);

  // General field values for modal/form inputs
  const [formFields, setFormFields] = useState<any>({});

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const pageData = await LandingPageApi.getPageData();
      setData(pageData);
    } catch (err: any) {
      console.error(err);
      setError("Gagal memuat data dari server. Pastikan server Express berjalan di https://warung-cerdas-production.up.railway.app");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSingletonSave = async (section: string, apiMethod: Function, payload: any) => {
    try {
      setLoading(true);
      await apiMethod(payload);
      showToast(`Section ${section} berhasil diperbarui!`);
      await loadData();
    } catch (err: any) {
      showToast(err.message || "Gagal menyimpan perubahan", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCrudSave = async (
    entityName: string,
    createMethod: Function,
    updateMethod: Function,
    payload: any,
    id?: number
  ) => {
    try {
      setLoading(true);
      if (id) {
        await updateMethod(id, payload);
        showToast(`Item ${entityName} berhasil diperbarui!`);
      } else {
        await createMethod(payload);
        showToast(`Item ${entityName} berhasil ditambahkan!`);
      }
      setEditingItem(null);
      setIsAddMode(false);
      await loadData();
    } catch (err: any) {
      showToast(err.message || "Gagal menyimpan data", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCrudDelete = async (entityName: string, deleteMethod: Function, id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus item ini?")) return;
    try {
      setLoading(true);
      await deleteMethod(id);
      showToast(`Item ${entityName} berhasil dihapus!`);
      await loadData();
    } catch (err: any) {
      showToast(err.message || "Gagal menghapus data", "error");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (item: any) => {
    setEditingItem(item);
    setFormFields({ ...item });
    setIsAddMode(false);
  };

  const startAdd = () => {
    setEditingItem(null);
    setFormFields({});
    setIsAddMode(true);
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setIsAddMode(false);
    setFormFields({});
  };

  // Helper render for selected icon
  const renderIconSelector = (currentValue: string, onChange: (val: string) => void) => {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 8, maxHeight: 150, overflowY: "auto", padding: 8, background: "rgba(0,0,0,0.2)", borderRadius: 8, border: "1px solid var(--glass-border)" }}>
        {ICON_OPTIONS.map((opt) => (
          <button
            type="button"
            key={opt.name}
            onClick={() => onChange(opt.name)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 8px",
              borderRadius: 6,
              border: currentValue === opt.name ? "1px solid var(--cyan)" : "1px solid transparent",
              background: currentValue === opt.name ? "rgba(0,212,255,0.15)" : "transparent",
              color: currentValue === opt.name ? "var(--cyan)" : "var(--white-dim)",
              cursor: "pointer",
              fontSize: "0.75rem",
              textAlign: "left"
            }}
          >
            {opt.icon}
            <span>{opt.name}</span>
          </button>
        ))}
      </div>
    );
  };



  if (loading && !data) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexDirection: "column", gap: 16 }}>
        <RefreshCw className="animate-spin" size={48} color="var(--cyan)" />
        <p style={{ fontSize: "1.1rem", fontFamily: "var(--font-display)" }}>Memuat data CMS...</p>
      </div>
    );
  }

  return (
    <div className="admin-bg-override" style={{ minHeight: "100vh", background: "var(--navy)", color: "white", paddingBottom: 80, position: "relative" }}>
      <div className="mesh-bg" />
      <div className="grid-lines" />

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div style={{
          position: "fixed",
          top: 24,
          right: 24,
          zIndex: 9999,
          padding: "16px 24px",
          borderRadius: 12,
          background: toast.type === "success" ? "rgba(0,229,160,0.95)" : "rgba(239,68,68,0.95)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${toast.type === "success" ? "rgba(0,229,160,0.2)" : "rgba(239,68,68,0.2)"}`,
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "white",
          fontFamily: "var(--font-display)",
          fontWeight: 600
        }}>
          {toast.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <header style={{ borderBottom: "1px solid var(--glass-border)", backdropFilter: "blur(12px)", background: "rgba(5,13,26,0.8)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg, #1a6bff, #00d4ff)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={18} color="white" fill="white" />
            </div>
            <div>
              <h1 style={{ fontSize: "1.2rem", fontWeight: 800, fontFamily: "var(--font-display)", background: "linear-gradient(135deg, #fff, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                CMS Dashboard Admin
              </h1>
              <p style={{ fontSize: "0.75rem", color: "var(--white-dim)" }}>Kelola Konten Landing Page</p>
            </div>
          </div>
          <Link href="/" className="btn-outline" style={{ fontSize: "0.85rem", padding: "8px 16px", display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <ArrowLeft size={14} /> Lihat Landing Page
          </Link>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div style={{ maxWidth: 1200, margin: "32px auto 0", padding: "0 24px", display: "grid", gridTemplateColumns: "250px 1fr", gap: 32 }} className="admin-grid">
        {/* SIDEBAR TABS */}
        <aside>
          <div className="glass-card" style={{ padding: 12, display: "flex", flexDirection: "column", gap: 4 }}>
            <p style={{ fontSize: "0.75rem", color: "var(--white-dim)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700, padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 8 }}>Section Konten</p>
            {[
              { id: "hero", label: "Hero Banner" },
              { id: "partners", label: "Partner / Trusted By" },
              { id: "problems", label: "Masalah UMKM" },
              { id: "solutions", label: "Solusi Lengkap" },
              { id: "features", label: "Fitur Lengkap" },
              { id: "preview", label: "Preview Dashboard" },
              { id: "advantages", label: "Keuntungan Nyata" },
              { id: "steps", label: "Cara Kerja" },
              { id: "stats", label: "Statistik Bisnis" },
              { id: "testimonials", label: "Testimoni" },
              { id: "pricing", label: "Paket Harga" },
              { id: "faq", label: "FAQ / Pertanyaan" },
              { id: "cta", label: "CTA Banner" },
              { id: "footer", label: "Footer Info" }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => { setActiveTab(t.id); cancelEdit(); }}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  transition: "all 0.2s"
                }}
                className={activeTab === t.id ? "active-tab" : "tab-hover"}
              >
                {t.label}
              </button>
            ))}
          </div>
        </aside>

        {/* CONTENT FIELD */}
        <main>
          {error && (
            <div className="glass-card" style={{ padding: 24, border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)", marginBottom: 24, display: "flex", gap: 16, alignItems: "center" }}>
              <AlertCircle size={28} color="#ef4444" />
              <div>
                <h4 style={{ fontWeight: 700, color: "#ef4444", marginBottom: 4 }}>Error Memuat Data</h4>
                <p style={{ color: "var(--white-dim)", fontSize: "0.88rem" }}>{error}</p>
                <button onClick={loadData} className="btn-outline" style={{ marginTop: 12, padding: "6px 12px", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 6 }}>
                  <RefreshCw size={12} /> Coba Lagi
                </button>
              </div>
            </div>
          )}

          {!error && data && (
            <div className="glass-card" style={{ padding: 32 }}>
              {/* HERO SECTION */}
              {activeTab === "hero" && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as any;
                  handleSingletonSave("Hero", LandingPageApi.updateHero, {
                    badge: form.badge.value,
                    title: form.title.value,
                    description: form.description.value,
                    btn1Text: form.btn1Text.value,
                    btn1Link: form.btn1Link.value,
                    btn2Text: form.btn2Text.value,
                    btn2Link: form.btn2Link.value,
                    rating: parseFloat(form.rating.value),
                    umkmCountText: form.umkmCountText.value,
                  });
                }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 12 }}>Kelola Section Hero</h3>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Badge Atas</label>
                      <input type="text" name="badge" defaultValue={data.hero?.badge || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                    </div>
                    
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Judul Utama</label>
                      <input type="text" name="title" defaultValue={data.hero?.title || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Deskripsi</label>
                      <textarea name="description" defaultValue={data.hero?.description || ""} rows={3} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", resize: "vertical" }} required />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Teks Tombol Utama</label>
                        <input type="text" name="btn1Text" defaultValue={data.hero?.btn1Text || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Link Tombol Utama</label>
                        <input type="text" name="btn1Link" defaultValue={data.hero?.btn1Link || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Teks Tombol Kedua</label>
                        <input type="text" name="btn2Text" defaultValue={data.hero?.btn2Text || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Link Tombol Kedua</label>
                        <input type="text" name="btn2Link" defaultValue={data.hero?.btn2Link || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Rating</label>
                        <input type="number" step="0.1" max="5" name="rating" defaultValue={data.hero?.rating || 4.9} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Teks Sosial Proof (Jumlah UMKM)</label>
                        <input type="text" name="umkmCountText" defaultValue={data.hero?.umkmCountText || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                      </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 20px", marginTop: 12, border: "none", cursor: "pointer" }}>
                      <Save size={18} /> Simpan Perubahan Hero
                    </button>
                  </div>
                </form>
              )}

              {/* PARTNER / TRUSTED BY */}
              {activeTab === "partners" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 12 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800 }}>Daftar Partner / Brand</h3>
                    {!isAddMode && !editingItem && (
                      <button onClick={startAdd} className="btn-primary" style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", cursor: "pointer", border: "none" }}>
                        <Plus size={14} /> Tambah Partner
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Form */}
                  {(isAddMode || editingItem) && (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleCrudSave(
                        "Partner",
                        LandingPageApi.createPartner,
                        LandingPageApi.updatePartner,
                        { name: formFields.name },
                        editingItem?.id
                      );
                    }} style={{ background: "rgba(255,255,255,0.02)", padding: 20, borderRadius: 12, border: "1px solid var(--glass-border)", marginBottom: 24 }}>
                      <h4 style={{ marginBottom: 16, fontWeight: 700 }}>{isAddMode ? "Tambah Partner Baru" : "Edit Partner"}</h4>
                      <div style={{ display: "grid", gap: 16 }}>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Nama Partner</label>
                          <input
                            type="text"
                            value={formFields.name || ""}
                            onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                            className="cms-input"
                            style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }}
                            required
                          />
                        </div>
                        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                          <button type="submit" className="btn-primary" style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: 6, border: "none", cursor: "pointer" }}>
                            <Save size={16} /> Simpan
                          </button>
                          <button type="button" onClick={cancelEdit} className="btn-outline" style={{ padding: "10px 20px", cursor: "pointer" }}>
                            Batal
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* Partners List */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
                    {data.partners.map((p) => (
                      <div key={p.id} className="glass-card" style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 800, color: "var(--cyan)" }}>
                            {p.name[0]}
                          </div>
                          <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{p.name}</span>
                        </div>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => startEdit(p)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--white-dim)" }} onMouseEnter={e => e.currentTarget.style.color = "var(--cyan)"} onMouseLeave={e => e.currentTarget.style.color = "var(--white-dim)"}>
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => handleCrudDelete("Partner", LandingPageApi.deletePartner, p.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--white-dim)" }} onMouseEnter={e => e.currentTarget.style.color = "#ef4444"} onMouseLeave={e => e.currentTarget.style.color = "var(--white-dim)"}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {data.partners.length === 0 && (
                      <p style={{ color: "var(--white-dim)", fontSize: "0.9rem", gridColumn: "1/-1", textAlign: "center", padding: 24 }}>Belum ada data partner.</p>
                    )}
                  </div>
                </div>
              )}

              {/* MASALAH NYATA UMKM */}
              {activeTab === "problems" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 12 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800 }}>Daftar Masalah UMKM</h3>
                    {!isAddMode && !editingItem && (
                      <button onClick={startAdd} className="btn-primary" style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", cursor: "pointer", border: "none" }}>
                        <Plus size={14} /> Tambah Masalah
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Form */}
                  {(isAddMode || editingItem) && (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleCrudSave(
                        "Masalah",
                        LandingPageApi.createProblem,
                        LandingPageApi.updateProblem,
                        {
                          icon: formFields.icon || "FileText",
                          title: formFields.title,
                          desc: formFields.desc
                        },
                        editingItem?.id
                      );
                    }} style={{ background: "rgba(255,255,255,0.02)", padding: 20, borderRadius: 12, border: "1px solid var(--glass-border)", marginBottom: 24 }}>
                      <h4 style={{ marginBottom: 16, fontWeight: 700 }}>{isAddMode ? "Tambah Masalah Baru" : "Edit Masalah"}</h4>
                      <div style={{ display: "grid", gap: 16 }}>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Judul Masalah</label>
                          <input
                            type="text"
                            value={formFields.title || ""}
                            onChange={(e) => setFormFields({ ...formFields, title: e.target.value })}
                            className="cms-input"
                            style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }}
                            required
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Deskripsi</label>
                          <textarea
                            value={formFields.desc || ""}
                            onChange={(e) => setFormFields({ ...formFields, desc: e.target.value })}
                            className="cms-input"
                            rows={2}
                            style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", resize: "vertical" }}
                            required
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Pilih Icon Lucide ({formFields.icon || "Pilih satu"})</label>
                          {renderIconSelector(formFields.icon || "FileText", (val) => setFormFields({ ...formFields, icon: val }))}
                        </div>
                        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                          <button type="submit" className="btn-primary" style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: 6, border: "none", cursor: "pointer" }}>
                            <Save size={16} /> Simpan
                          </button>
                          <button type="button" onClick={cancelEdit} className="btn-outline" style={{ padding: "10px 20px", cursor: "pointer" }}>
                            Batal
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* List of Problems */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                    {data.problems.map((p) => {
                      const iconOpt = ICON_OPTIONS.find(o => o.name === p.icon);
                      return (
                        <div key={p.id} className="glass-card" style={{ padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                            <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(0,212,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", color: "var(--cyan)", flexShrink: 0 }}>
                              {iconOpt ? iconOpt.icon : <FileText size={18} />}
                            </div>
                            <div>
                              <h4 style={{ fontWeight: 700, fontSize: "0.95rem", color: "white", marginBottom: 4 }}>{p.title}</h4>
                              <p style={{ color: "var(--white-dim)", fontSize: "0.82rem", lineHeight: 1.5 }}>{p.desc}</p>
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                            <button onClick={() => startEdit(p)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--white-dim)" }} onMouseEnter={e => e.currentTarget.style.color = "var(--cyan)"} onMouseLeave={e => e.currentTarget.style.color = "var(--white-dim)"}>
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleCrudDelete("Masalah", LandingPageApi.deleteProblem, p.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--white-dim)" }} onMouseEnter={e => e.currentTarget.style.color = "#ef4444"} onMouseLeave={e => e.currentTarget.style.color = "var(--white-dim)"}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    {data.problems.length === 0 && (
                      <p style={{ color: "var(--white-dim)", fontSize: "0.9rem", textAlign: "center", padding: 24 }}>Belum ada data masalah.</p>
                    )}
                  </div>
                </div>
              )}

              {/* SOLUSI LENGKAP */}
              {activeTab === "solutions" && (
                <div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as any;
                    handleSingletonSave("Solusi Lengkap", LandingPageApi.updateSolutionSection, {
                      badge: form.badge.value,
                      title: form.title.value,
                      description: form.description.value,
                      btnText: form.btnText.value,
                      btnLink: form.btnLink.value,
                    });
                  }} style={{ marginBottom: 40 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 12 }}>Kelola Judul & Deskripsi Solusi</h3>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Badge</label>
                        <input type="text" name="badge" defaultValue={data.solutionSection?.badge || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                      </div>
                      
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Judul Section</label>
                        <input type="text" name="title" defaultValue={data.solutionSection?.title || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Deskripsi</label>
                        <textarea name="description" defaultValue={data.solutionSection?.description || ""} rows={3} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", resize: "vertical" }} required />
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Teks Tombol</label>
                          <input type="text" name="btnText" defaultValue={data.solutionSection?.btnText || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Link Tombol</label>
                          <input type="text" name="btnLink" defaultValue={data.solutionSection?.btnLink || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                        </div>
                      </div>

                      <button type="submit" className="btn-primary" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 20px", border: "none", cursor: "pointer" }}>
                        <Save size={18} /> Simpan Info Solusi
                      </button>
                    </div>
                  </form>

                  {/* Solution Points List CRUD */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24 }}>
                      <h4 style={{ fontWeight: 800, fontSize: "1.1rem" }}>Daftar Poin Solusi</h4>
                      {!isAddMode && !editingItem && (
                        <button onClick={startAdd} className="btn-primary" style={{ padding: "6px 12px", display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", cursor: "pointer", border: "none" }}>
                          <Plus size={12} /> Tambah Poin
                        </button>
                      )}
                    </div>

                    {(isAddMode || editingItem) && (
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        handleCrudSave(
                          "Poin Solusi",
                          LandingPageApi.createSolutionPoint,
                          LandingPageApi.updateSolutionPoint,
                          {
                            icon: formFields.icon || "Cloud",
                            text: formFields.text
                          },
                          editingItem?.id
                        );
                      }} style={{ background: "rgba(255,255,255,0.02)", padding: 20, borderRadius: 12, border: "1px solid var(--glass-border)", marginBottom: 24 }}>
                        <h5 style={{ marginBottom: 16, fontWeight: 700 }}>{isAddMode ? "Tambah Poin Baru" : "Edit Poin"}</h5>
                        <div style={{ display: "grid", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Teks Solusi</label>
                            <input
                              type="text"
                              value={formFields.text || ""}
                              onChange={(e) => setFormFields({ ...formFields, text: e.target.value })}
                              className="cms-input"
                              style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }}
                              required
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Pilih Icon Lucide</label>
                            {renderIconSelector(formFields.icon || "Cloud", (val) => setFormFields({ ...formFields, icon: val }))}
                          </div>
                          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                            <button type="submit" className="btn-primary" style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: 6, border: "none", cursor: "pointer" }}>
                              <Save size={16} /> Simpan
                            </button>
                            <button type="button" onClick={cancelEdit} className="btn-outline" style={{ padding: "10px 20px", cursor: "pointer" }}>
                              Batal
                            </button>
                          </div>
                        </div>
                      </form>
                    )}

                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {data.solutionPoints.map((pt) => {
                        const iconOpt = ICON_OPTIONS.find(o => o.name === pt.icon);
                        return (
                          <div key={pt.id} className="glass-card" style={{ padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <span style={{ color: "var(--cyan)" }}>{iconOpt ? iconOpt.icon : <Cloud size={16} />}</span>
                              <span style={{ fontSize: "0.9rem", color: "var(--white-dim)" }}>{pt.text}</span>
                            </div>
                            <div style={{ display: "flex", gap: 8 }}>
                              <button onClick={() => startEdit(pt)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--white-dim)" }} onMouseEnter={e => e.currentTarget.style.color = "var(--cyan)"} onMouseLeave={e => e.currentTarget.style.color = "var(--white-dim)"}>
                                <Edit2 size={14} />
                              </button>
                              <button onClick={() => handleCrudDelete("Poin Solusi", LandingPageApi.deleteSolutionPoint, pt.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--white-dim)" }} onMouseEnter={e => e.currentTarget.style.color = "#ef4444"} onMouseLeave={e => e.currentTarget.style.color = "var(--white-dim)"}>
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      {data.solutionPoints.length === 0 && (
                        <p style={{ color: "var(--white-dim)", fontSize: "0.85rem", textAlign: "center", padding: 16 }}>Belum ada poin solusi.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* FITUR LENGKAP */}
              {activeTab === "features" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 12 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800 }}>Daftar Fitur Lengkap</h3>
                    {!isAddMode && !editingItem && (
                      <button onClick={startAdd} className="btn-primary" style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", cursor: "pointer", border: "none" }}>
                        <Plus size={14} /> Tambah Fitur
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Form */}
                  {(isAddMode || editingItem) && (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleCrudSave(
                        "Fitur",
                        LandingPageApi.createFeature,
                        LandingPageApi.updateFeature,
                        {
                          icon: formFields.icon || "Monitor",
                          title: formFields.title,
                          desc: formFields.desc,
                          color: formFields.color || "#1a6bff"
                        },
                        editingItem?.id
                      );
                    }} style={{ background: "rgba(255,255,255,0.02)", padding: 20, borderRadius: 12, border: "1px solid var(--glass-border)", marginBottom: 24 }}>
                      <h4 style={{ marginBottom: 16, fontWeight: 700 }}>{isAddMode ? "Tambah Fitur Baru" : "Edit Fitur"}</h4>
                      <div style={{ display: "grid", gap: 16 }}>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Nama Fitur</label>
                          <input
                            type="text"
                            value={formFields.title || ""}
                            onChange={(e) => setFormFields({ ...formFields, title: e.target.value })}
                            className="cms-input"
                            style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }}
                            required
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Deskripsi Singkat</label>
                          <textarea
                            value={formFields.desc || ""}
                            onChange={(e) => setFormFields({ ...formFields, desc: e.target.value })}
                            className="cms-input"
                            rows={2}
                            style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", resize: "vertical" }}
                            required
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Pilih Icon Lucide</label>
                          {renderIconSelector(formFields.icon || "Monitor", (val) => setFormFields({ ...formFields, icon: val }))}
                        </div>
                        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                          <button type="submit" className="btn-primary" style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: 6, border: "none", cursor: "pointer" }}>
                            <Save size={16} /> Simpan
                          </button>
                          <button type="button" onClick={cancelEdit} className="btn-outline" style={{ padding: "10px 20px", cursor: "pointer" }}>
                            Batal
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* List of Features */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                    {data.features.map((f) => {
                      const iconOpt = ICON_OPTIONS.find(o => o.name === f.icon);
                      return (
                        <div key={f.id} className="glass-card" style={{ padding: 20, borderLeft: `4px solid ${f.color}` }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: `${f.color}15`, border: `1px solid ${f.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: f.color }}>
                              {iconOpt ? iconOpt.icon : <Monitor size={16} />}
                            </div>
                            <div style={{ display: "flex", gap: 6 }}>
                              <button onClick={() => startEdit(f)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--white-dim)" }} onMouseEnter={e => e.currentTarget.style.color = "var(--cyan)"} onMouseLeave={e => e.currentTarget.style.color = "var(--white-dim)"}>
                                <Edit2 size={12} />
                              </button>
                              <button onClick={() => handleCrudDelete("Fitur", LandingPageApi.deleteFeature, f.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--white-dim)" }} onMouseEnter={e => e.currentTarget.style.color = "#ef4444"} onMouseLeave={e => e.currentTarget.style.color = "var(--white-dim)"}>
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                          <h4 style={{ fontWeight: 700, fontSize: "0.95rem", color: "white", marginBottom: 6 }}>{f.title}</h4>
                          <p style={{ color: "var(--white-dim)", fontSize: "0.8rem", lineHeight: 1.5 }}>{f.desc}</p>
                        </div>
                      );
                    })}
                    {data.features.length === 0 && (
                      <p style={{ color: "var(--white-dim)", fontSize: "0.9rem", gridColumn: "1/-1", textAlign: "center", padding: 24 }}>Belum ada data fitur.</p>
                    )}
                  </div>
                </div>
              )}

              {/* PREVIEW DASHBOARD */}
              {activeTab === "preview" && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as any;
                  handleSingletonSave("Preview Dashboard", LandingPageApi.updateDashboardPreview, {
                    badge: form.badge.value,
                    title: form.title.value,
                    kpi1Label: form.kpi1Label.value, kpi1Value: form.kpi1Value.value, kpi1Change: form.kpi1Change.value,
                    kpi2Label: form.kpi2Label.value, kpi2Value: form.kpi2Value.value, kpi2Change: form.kpi2Change.value,
                    kpi3Label: form.kpi3Label.value, kpi3Value: form.kpi3Value.value, kpi3Change: form.kpi3Change.value,
                    kpi4Label: form.kpi4Label.value, kpi4Value: form.kpi4Value.value, kpi4Change: form.kpi4Change.value,
                  });
                }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 12 }}>Kelola Section Preview Dashboard</h3>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Icon Badge (e.g. TrendingUp)</label>
                        <input type="text" name="badge" defaultValue={data.dashboardPreview?.badge || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Judul Utama Preview</label>
                        <input type="text" name="title" defaultValue={data.dashboardPreview?.title || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                      </div>
                    </div>

                    <p style={{ fontSize: "0.85rem", color: "var(--cyan)", fontWeight: 700, marginTop: 12, marginBottom: 0 }}>Kelola Angka KPI di Dashboard Preview:</p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, background: "rgba(255,255,255,0.01)", padding: 16, borderRadius: 8, border: "1px solid var(--glass-border)" }}>
                      {/* KPI 1 */}
                      <div>
                        <label style={{ display: "block", fontSize: "0.8rem", color: "var(--white-dim)", marginBottom: 4 }}>KPI 1 Label</label>
                        <input type="text" name="kpi1Label" defaultValue={data.dashboardPreview?.kpi1Label || ""} className="cms-input" style={{ width: "100%", padding: 8, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", fontSize: "0.85rem" }} required />
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
                          <input type="text" name="kpi1Value" defaultValue={data.dashboardPreview?.kpi1Value || ""} placeholder="Nilai" className="cms-input" style={{ width: "100%", padding: 6, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", fontSize: "0.8rem" }} required />
                          <input type="text" name="kpi1Change" defaultValue={data.dashboardPreview?.kpi1Change || ""} placeholder="Kenaikan" className="cms-input" style={{ width: "100%", padding: 6, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", fontSize: "0.8rem" }} required />
                        </div>
                      </div>

                      {/* KPI 2 */}
                      <div>
                        <label style={{ display: "block", fontSize: "0.8rem", color: "var(--white-dim)", marginBottom: 4 }}>KPI 2 Label</label>
                        <input type="text" name="kpi2Label" defaultValue={data.dashboardPreview?.kpi2Label || ""} className="cms-input" style={{ width: "100%", padding: 8, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", fontSize: "0.85rem" }} required />
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
                          <input type="text" name="kpi2Value" defaultValue={data.dashboardPreview?.kpi2Value || ""} placeholder="Nilai" className="cms-input" style={{ width: "100%", padding: 6, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", fontSize: "0.8rem" }} required />
                          <input type="text" name="kpi2Change" defaultValue={data.dashboardPreview?.kpi2Change || ""} placeholder="Kenaikan" className="cms-input" style={{ width: "100%", padding: 6, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", fontSize: "0.8rem" }} required />
                        </div>
                      </div>

                      {/* KPI 3 */}
                      <div>
                        <label style={{ display: "block", fontSize: "0.8rem", color: "var(--white-dim)", marginBottom: 4 }}>KPI 3 Label</label>
                        <input type="text" name="kpi3Label" defaultValue={data.dashboardPreview?.kpi3Label || ""} className="cms-input" style={{ width: "100%", padding: 8, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", fontSize: "0.85rem" }} required />
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
                          <input type="text" name="kpi3Value" defaultValue={data.dashboardPreview?.kpi3Value || ""} placeholder="Nilai" className="cms-input" style={{ width: "100%", padding: 6, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", fontSize: "0.8rem" }} required />
                          <input type="text" name="kpi3Change" defaultValue={data.dashboardPreview?.kpi3Change || ""} placeholder="Kenaikan" className="cms-input" style={{ width: "100%", padding: 6, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", fontSize: "0.8rem" }} required />
                        </div>
                      </div>

                      {/* KPI 4 */}
                      <div>
                        <label style={{ display: "block", fontSize: "0.8rem", color: "var(--white-dim)", marginBottom: 4 }}>KPI 4 Label</label>
                        <input type="text" name="kpi4Label" defaultValue={data.dashboardPreview?.kpi4Label || ""} className="cms-input" style={{ width: "100%", padding: 8, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", fontSize: "0.85rem" }} required />
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
                          <input type="text" name="kpi4Value" defaultValue={data.dashboardPreview?.kpi4Value || ""} placeholder="Nilai" className="cms-input" style={{ width: "100%", padding: 6, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", fontSize: "0.8rem" }} required />
                          <input type="text" name="kpi4Change" defaultValue={data.dashboardPreview?.kpi4Change || ""} placeholder="Kenaikan" className="cms-input" style={{ width: "100%", padding: 6, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", fontSize: "0.8rem" }} required />
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 20px", marginTop: 12, border: "none", cursor: "pointer" }}>
                      <Save size={18} /> Simpan Perubahan Preview
                    </button>
                  </div>
                </form>
              )}

              {/* KEUNTUNGAN NYATA */}
              {activeTab === "advantages" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 12 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800 }}>Daftar Keuntungan Nyata</h3>
                    {!isAddMode && !editingItem && (
                      <button onClick={startAdd} className="btn-primary" style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", cursor: "pointer", border: "none" }}>
                        <Plus size={14} /> Tambah Keuntungan
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Form */}
                  {(isAddMode || editingItem) && (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleCrudSave(
                        "Keuntungan",
                        LandingPageApi.createAdvantage,
                        LandingPageApi.updateAdvantage,
                        {
                          icon: formFields.icon || "Zap",
                          title: formFields.title,
                          desc: formFields.desc,
                          color: formFields.color || "#1a6bff"
                        },
                        editingItem?.id
                      );
                    }} style={{ background: "rgba(255,255,255,0.02)", padding: 20, borderRadius: 12, border: "1px solid var(--glass-border)", marginBottom: 24 }}>
                      <h4 style={{ marginBottom: 16, fontWeight: 700 }}>{isAddMode ? "Tambah Keuntungan Baru" : "Edit Keuntungan"}</h4>
                      <div style={{ display: "grid", gap: 16 }}>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Judul Keuntungan</label>
                          <input
                            type="text"
                            value={formFields.title || ""}
                            onChange={(e) => setFormFields({ ...formFields, title: e.target.value })}
                            className="cms-input"
                            style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }}
                            required
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Deskripsi</label>
                          <textarea
                            value={formFields.desc || ""}
                            onChange={(e) => setFormFields({ ...formFields, desc: e.target.value })}
                            className="cms-input"
                            rows={3}
                            style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", resize: "vertical" }}
                            required
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Ikon</label>
                          {renderIconSelector(formFields.icon || "Zap", (val) => setFormFields({ ...formFields, icon: val }))}
                        </div>
                        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                          <button type="submit" className="btn-primary" style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: 6, border: "none", cursor: "pointer" }}>
                            <Save size={16} /> Simpan
                          </button>
                          <button type="button" onClick={cancelEdit} className="btn-outline" style={{ padding: "10px 20px", cursor: "pointer" }}>
                            Batal
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* Advantages List */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                    {data.advantages.map((adv) => {
                      const iconOpt = ICON_OPTIONS.find(o => o.name === adv.icon);
                      return (
                        <div key={adv.id} className="glass-card" style={{ padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", borderLeft: `4px solid ${adv.color}` }}>
                          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                            <div style={{ color: adv.color, fontSize: "1.5rem" }}>
                              {iconOpt ? iconOpt.icon : <Zap size={20} />}
                            </div>
                            <div>
                              <h4 style={{ fontWeight: 700, fontSize: "1rem", color: "white", marginBottom: 6 }}>{adv.title}</h4>
                              <p style={{ color: "var(--white-dim)", fontSize: "0.85rem", lineHeight: 1.6 }}>{adv.desc}</p>
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: 8, marginLeft: 16 }}>
                            <button onClick={() => startEdit(adv)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--white-dim)" }} onMouseEnter={e => e.currentTarget.style.color = "var(--cyan)"} onMouseLeave={e => e.currentTarget.style.color = "var(--white-dim)"}>
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleCrudDelete("Keuntungan", LandingPageApi.deleteAdvantage, adv.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--white-dim)" }} onMouseEnter={e => e.currentTarget.style.color = "#ef4444"} onMouseLeave={e => e.currentTarget.style.color = "var(--white-dim)"}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    {data.advantages.length === 0 && (
                      <p style={{ color: "var(--white-dim)", fontSize: "0.9rem", textAlign: "center", padding: 24 }}>Belum ada data keuntungan.</p>
                    )}
                  </div>
                </div>
              )}

              {/* CARA KERJA */}
              {activeTab === "steps" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 12 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800 }}>Langkah Cara Kerja</h3>
                    {!isAddMode && !editingItem && (
                      <button onClick={startAdd} className="btn-primary" style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", cursor: "pointer", border: "none" }}>
                        <Plus size={14} /> Tambah Langkah
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Form */}
                  {(isAddMode || editingItem) && (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleCrudSave(
                        "Langkah",
                        LandingPageApi.createStep,
                        LandingPageApi.updateStep,
                        {
                          num: formFields.num,
                          icon: formFields.icon || "Rocket",
                          title: formFields.title,
                          desc: formFields.desc,
                          time: formFields.time
                        },
                        editingItem?.id
                      );
                    }} style={{ background: "rgba(255,255,255,0.02)", padding: 20, borderRadius: 12, border: "1px solid var(--glass-border)", marginBottom: 24 }}>
                      <h4 style={{ marginBottom: 16, fontWeight: 700 }}>{isAddMode ? "Tambah Langkah Baru" : "Edit Langkah"}</h4>
                      <div style={{ display: "grid", gap: 16 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Nomor (e.g. 01)</label>
                            <input
                              type="text"
                              value={formFields.num || ""}
                              onChange={(e) => setFormFields({ ...formFields, num: e.target.value })}
                              className="cms-input"
                              style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }}
                              required
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Judul Langkah</label>
                            <input
                              type="text"
                              value={formFields.title || ""}
                              onChange={(e) => setFormFields({ ...formFields, title: e.target.value })}
                              className="cms-input"
                              style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }}
                              required
                            />
                          </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Durasi/Waktu (e.g. 2 menit)</label>
                            <input
                              type="text"
                              value={formFields.time || ""}
                              onChange={(e) => setFormFields({ ...formFields, time: e.target.value })}
                              className="cms-input"
                              style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }}
                              required
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Pilih Ikon</label>
                            {renderIconSelector(formFields.icon || "Rocket", (val) => setFormFields({ ...formFields, icon: val }))}
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Deskripsi Langkah</label>
                          <textarea
                            value={formFields.desc || ""}
                            onChange={(e) => setFormFields({ ...formFields, desc: e.target.value })}
                            className="cms-input"
                            rows={3}
                            style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", resize: "vertical" }}
                            required
                          />
                        </div>
                        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                          <button type="submit" className="btn-primary" style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: 6, border: "none", cursor: "pointer" }}>
                            <Save size={16} /> Simpan
                          </button>
                          <button type="button" onClick={cancelEdit} className="btn-outline" style={{ padding: "10px 20px", cursor: "pointer" }}>
                            Batal
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* Steps List */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                    {data.steps.map((s) => {
                      const iconOpt = ICON_OPTIONS.find(o => o.name === s.icon);
                      return (
                        <div key={s.id} className="glass-card" style={{ padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--cyan)", fontFamily: "var(--font-display)", width: 40 }}>
                              {s.num}
                            </div>
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--white-dim)" }}>
                              {iconOpt ? iconOpt.icon : <Rocket size={16} />}
                            </div>
                            <div>
                              <h4 style={{ fontWeight: 700, fontSize: "0.95rem" }}>{s.title} <span style={{ fontSize: "0.75rem", color: "var(--white-dim)", marginLeft: 6 }}>({s.time})</span></h4>
                              <p style={{ color: "var(--white-dim)", fontSize: "0.82rem", marginTop: 4 }}>{s.desc}</p>
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: 8, marginLeft: 16 }}>
                            <button onClick={() => startEdit(s)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--white-dim)" }} onMouseEnter={e => e.currentTarget.style.color = "var(--cyan)"} onMouseLeave={e => e.currentTarget.style.color = "var(--white-dim)"}>
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleCrudDelete("Langkah", LandingPageApi.deleteStep, s.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--white-dim)" }} onMouseEnter={e => e.currentTarget.style.color = "#ef4444"} onMouseLeave={e => e.currentTarget.style.color = "var(--white-dim)"}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    {data.steps.length === 0 && (
                      <p style={{ color: "var(--white-dim)", fontSize: "0.9rem", textAlign: "center", padding: 24 }}>Belum ada data cara kerja.</p>
                    )}
                  </div>
                </div>
              )}

              {/* STATISTIK */}
              {activeTab === "stats" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 12 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800 }}>Daftar Statistik Bisnis</h3>
                    {!isAddMode && !editingItem && (
                      <button onClick={startAdd} className="btn-primary" style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", cursor: "pointer", border: "none" }}>
                        <Plus size={14} /> Tambah Statistik
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Form */}
                  {(isAddMode || editingItem) && (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleCrudSave(
                        "Statistik",
                        LandingPageApi.createStat,
                        LandingPageApi.updateStat,
                        {
                          value: parseFloat(formFields.value),
                          suffix: formFields.suffix,
                          label: formFields.label,
                          icon: formFields.icon || "Store",
                          decimal: !!formFields.decimal
                        },
                        editingItem?.id
                      );
                    }} style={{ background: "rgba(255,255,255,0.02)", padding: 20, borderRadius: 12, border: "1px solid var(--glass-border)", marginBottom: 24 }}>
                      <h4 style={{ marginBottom: 16, fontWeight: 700 }}>{isAddMode ? "Tambah Statistik Baru" : "Edit Statistik"}</h4>
                      <div style={{ display: "grid", gap: 16 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 100px", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Angka Target (e.g. 10000 atau 99.9)</label>
                            <input
                              type="number"
                              step="any"
                              value={formFields.value !== undefined ? formFields.value : ""}
                              onChange={(e) => setFormFields({ ...formFields, value: e.target.value })}
                              className="cms-input"
                              style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }}
                              required
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Akhiran (e.g. +, %)</label>
                            <input
                              type="text"
                              value={formFields.suffix || ""}
                              onChange={(e) => setFormFields({ ...formFields, suffix: e.target.value })}
                              className="cms-input"
                              style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Label Deskripsi (e.g. UMKM Aktif)</label>
                          <input
                            type="text"
                            value={formFields.label || ""}
                            onChange={(e) => setFormFields({ ...formFields, label: e.target.value })}
                            className="cms-input"
                            style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }}
                            required
                          />
                        </div>
                        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--white-dim)", cursor: "pointer" }}>
                            <input
                              type="checkbox"
                              checked={!!formFields.decimal}
                              onChange={(e) => setFormFields({ ...formFields, decimal: e.target.checked })}
                            />
                            Tampilkan Desimal (1 angka dibelakang koma)
                          </label>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Pilih Ikon</label>
                          {renderIconSelector(formFields.icon || "Store", (val) => setFormFields({ ...formFields, icon: val }))}
                        </div>
                        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                          <button type="submit" className="btn-primary" style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: 6, border: "none", cursor: "pointer" }}>
                            <Save size={16} /> Simpan
                          </button>
                          <button type="button" onClick={cancelEdit} className="btn-outline" style={{ padding: "10px 20px", cursor: "pointer" }}>
                            Batal
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* Stats List */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
                    {data.stats.map((s) => {
                      const iconOpt = ICON_OPTIONS.find(o => o.name === s.icon);
                      return (
                        <div key={s.id} className="glass-card" style={{ padding: 20, textAlign: "center", position: "relative" }}>
                          <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 6 }}>
                            <button onClick={() => startEdit(s)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--white-dim)" }} onMouseEnter={e => e.currentTarget.style.color = "var(--cyan)"} onMouseLeave={e => e.currentTarget.style.color = "var(--white-dim)"}>
                              <Edit2 size={12} />
                            </button>
                            <button onClick={() => handleCrudDelete("Statistik", LandingPageApi.deleteStat, s.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--white-dim)" }} onMouseEnter={e => e.currentTarget.style.color = "#ef4444"} onMouseLeave={e => e.currentTarget.style.color = "var(--white-dim)"}>
                              <Trash2 size={12} />
                            </button>
                          </div>
                          <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", color: "var(--cyan)" }}>
                            {iconOpt ? iconOpt.icon : <Store size={16} />}
                          </div>
                          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.6rem", color: "white" }}>
                            {s.value}{s.suffix}
                          </div>
                          <p style={{ color: "var(--white-dim)", fontSize: "0.75rem", marginTop: 4 }}>{s.label}</p>
                        </div>
                      );
                    })}
                    {data.stats.length === 0 && (
                      <p style={{ color: "var(--white-dim)", fontSize: "0.9rem", gridColumn: "1/-1", textAlign: "center", padding: 24 }}>Belum ada data statistik.</p>
                    )}
                  </div>
                </div>
              )}

              {/* TESTIMONI */}
              {activeTab === "testimonials" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 12 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800 }}>Daftar Testimoni Pengguna</h3>
                    {!isAddMode && !editingItem && (
                      <button onClick={startAdd} className="btn-primary" style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", cursor: "pointer", border: "none" }}>
                        <Plus size={14} /> Tambah Testimoni
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Form */}
                  {(isAddMode || editingItem) && (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleCrudSave(
                        "Testimoni",
                        LandingPageApi.createTestimonial,
                        LandingPageApi.updateTestimonial,
                        {
                          name: formFields.name,
                          role: formFields.role,
                          city: formFields.city,
                          avatar: formFields.avatar || formFields.name?.slice(0, 2).toUpperCase() || "UN",
                          color: formFields.color || "#1a6bff",
                          text: formFields.text,
                          rating: parseInt(formFields.rating, 10) || 5
                        },
                        editingItem?.id
                      );
                    }} style={{ background: "rgba(255,255,255,0.02)", padding: 20, borderRadius: 12, border: "1px solid var(--glass-border)", marginBottom: 24 }}>
                      <h4 style={{ marginBottom: 16, fontWeight: 700 }}>{isAddMode ? "Tambah Testimoni Baru" : "Edit Testimoni"}</h4>
                      <div style={{ display: "grid", gap: 16 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Nama Pengguna</label>
                            <input
                              type="text"
                              value={formFields.name || ""}
                              onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                              className="cms-input"
                              style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }}
                              required
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Peran / Jabatan (e.g. Pemilik Toko)</label>
                            <input
                              type="text"
                              value={formFields.role || ""}
                              onChange={(e) => setFormFields({ ...formFields, role: e.target.value })}
                              className="cms-input"
                              style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }}
                              required
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Kota</label>
                            <input
                              type="text"
                              value={formFields.city || ""}
                              onChange={(e) => setFormFields({ ...formFields, city: e.target.value })}
                              className="cms-input"
                              style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }}
                              required
                            />
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "120px 100px 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Inisial Avatar</label>
                            <input
                              type="text"
                              maxLength={2}
                              value={formFields.avatar || ""}
                              onChange={(e) => setFormFields({ ...formFields, avatar: e.target.value.toUpperCase() })}
                              placeholder="e.g. BS"
                              className="cms-input"
                              style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }}
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Rating (1-5)</label>
                            <input
                              type="number"
                              min={1}
                              max={5}
                              value={formFields.rating !== undefined ? formFields.rating : 5}
                              onChange={(e) => setFormFields({ ...formFields, rating: e.target.value })}
                              className="cms-input"
                              style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }}
                              required
                            />
                          </div>

                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Isi Testimoni</label>
                          <textarea
                            value={formFields.text || ""}
                            onChange={(e) => setFormFields({ ...formFields, text: e.target.value })}
                            className="cms-input"
                            rows={3}
                            style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", resize: "vertical" }}
                            required
                          />
                        </div>

                        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                          <button type="submit" className="btn-primary" style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: 6, border: "none", cursor: "pointer" }}>
                            <Save size={16} /> Simpan
                          </button>
                          <button type="button" onClick={cancelEdit} className="btn-outline" style={{ padding: "10px 20px", cursor: "pointer" }}>
                            Batal
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* Testimonial List */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                    {data.testimonials.map((t) => (
                      <div key={t.id} className="glass-card" style={{ padding: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                          <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${t.color}, ${t.color}80)`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, flexShrink: 0 }}>
                            {t.avatar}
                          </div>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                              <h4 style={{ fontWeight: 700, fontSize: "0.95rem" }}>{t.name}</h4>
                              <span style={{ color: "var(--white-dim)", fontSize: "0.75rem" }}>({t.city})</span>
                            </div>
                            <p style={{ color: "var(--cyan)", fontSize: "0.75rem", fontWeight: 600, marginBottom: 8 }}>{t.role}</p>
                            <p style={{ color: "var(--white-dim)", fontSize: "0.85rem", lineHeight: 1.6, fontStyle: "italic" }}>"{t.text}"</p>
                            <div style={{ display: "flex", gap: 2, marginTop: 8 }}>
                              {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} fill="#fbbf24" color="#fbbf24" />)}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                          <button onClick={() => startEdit(t)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--white-dim)" }} onMouseEnter={e => e.currentTarget.style.color = "var(--cyan)"} onMouseLeave={e => e.currentTarget.style.color = "var(--white-dim)"}>
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleCrudDelete("Testimoni", LandingPageApi.deleteTestimonial, t.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--white-dim)" }} onMouseEnter={e => e.currentTarget.style.color = "#ef4444"} onMouseLeave={e => e.currentTarget.style.color = "var(--white-dim)"}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {data.testimonials.length === 0 && (
                      <p style={{ color: "var(--white-dim)", fontSize: "0.9rem", textAlign: "center", padding: 24 }}>Belum ada data testimoni.</p>
                    )}
                  </div>
                </div>
              )}

              {/* HARGA */}
              {activeTab === "pricing" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 12 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800 }}>Daftar Paket Harga</h3>
                    {!isAddMode && !editingItem && (
                      <button onClick={startAdd} className="btn-primary" style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", cursor: "pointer", border: "none" }}>
                        <Plus size={14} /> Tambah Paket
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Form */}
                  {(isAddMode || editingItem) && (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleCrudSave(
                        "Paket Harga",
                        LandingPageApi.createPricingPlan,
                        LandingPageApi.updatePricingPlan,
                        {
                          billing: formFields.billing || "monthly",
                          name: formFields.name,
                          price: parseInt(formFields.price, 10),
                          desc: formFields.desc,
                          color: formFields.color || "#1a6bff",
                          features: formFields.features,
                          popular: !!formFields.popular
                        },
                        editingItem?.id
                      );
                    }} style={{ background: "rgba(255,255,255,0.02)", padding: 20, borderRadius: 12, border: "1px solid var(--glass-border)", marginBottom: 24 }}>
                      <h4 style={{ marginBottom: 16, fontWeight: 700 }}>{isAddMode ? "Tambah Paket Baru" : "Edit Paket"}</h4>
                      <div style={{ display: "grid", gap: 16 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Tipe Penagihan</label>
                            <select
                              value={formFields.billing || "monthly"}
                              onChange={(e) => setFormFields({ ...formFields, billing: e.target.value })}
                              className="cms-input"
                              style={{ width: "100%", padding: 12, borderRadius: 8 }}
                            >
                              <option value="monthly" style={{ background: "#ffffff", color: "#050d1a" }}>Bulanan (Monthly)</option>
                              <option value="annual" style={{ background: "#ffffff", color: "#050d1a" }}>Tahunan (Annual)</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Nama Paket (e.g. Starter)</label>
                            <input
                              type="text"
                              value={formFields.name || ""}
                              onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                              className="cms-input"
                              style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }}
                              required
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Harga (Ribuan, e.g. 99)</label>
                            <input
                              type="number"
                              value={formFields.price !== undefined ? formFields.price : ""}
                              onChange={(e) => setFormFields({ ...formFields, price: e.target.value })}
                              className="cms-input"
                              style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Deskripsi Paket</label>
                          <input
                            type="text"
                            value={formFields.desc || ""}
                            onChange={(e) => setFormFields({ ...formFields, desc: e.target.value })}
                            className="cms-input"
                            style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }}
                            required
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Daftar Fitur (Pisahkan dengan koma `,`)</label>
                          <textarea
                            value={formFields.features || ""}
                            onChange={(e) => setFormFields({ ...formFields, features: e.target.value })}
                            className="cms-input"
                            rows={3}
                            placeholder="e.g. 1 Toko, POS System, Laporan Keuangan"
                            style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", resize: "vertical" }}
                            required
                          />
                        </div>

                        <div style={{ display: "flex", alignItems: "center", padding: "10px 0" }}>
                          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--white-dim)", cursor: "pointer" }}>
                            <input
                              type="checkbox"
                              checked={!!formFields.popular}
                              onChange={(e) => setFormFields({ ...formFields, popular: e.target.checked })}
                            />
                            Tandai sebagai Paket Populer (Terlaris)
                          </label>
                        </div>

                        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                          <button type="submit" className="btn-primary" style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: 6, border: "none", cursor: "pointer" }}>
                            <Save size={16} /> Simpan
                          </button>
                          <button type="button" onClick={cancelEdit} className="btn-outline" style={{ padding: "10px 20px", cursor: "pointer" }}>
                            Batal
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* Pricing List */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }} className="admin-pricing-grid">
                    {/* Monthly Group */}
                    <div>
                      <h4 style={{ fontWeight: 800, fontSize: "1rem", color: "#1a6bff", marginBottom: 12, borderBottom: "1px solid #e2e8f0", paddingBottom: 6 }}>Bulanan (Monthly Billing)</h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {data.pricingPlans.filter(p => p.billing === "monthly").map((p) => (
                          <div key={p.id} className="glass-card" style={{ padding: 16, borderLeft: `4px solid ${p.color || '#1a6bff'}`, position: "relative", background: "#ffffff" }}>
                            <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 6 }}>
                              <button onClick={() => startEdit(p)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }} onMouseEnter={e => e.currentTarget.style.color = "var(--cyan)"} onMouseLeave={e => e.currentTarget.style.color = "#64748b"}>
                                <Edit2 size={12} />
                              </button>
                              <button onClick={() => handleCrudDelete("Paket Harga", LandingPageApi.deletePricingPlan, p.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }} onMouseEnter={e => e.currentTarget.style.color = "#ef4444"} onMouseLeave={e => e.currentTarget.style.color = "#64748b"}>
                                <Trash2 size={12} />
                              </button>
                            </div>
                            <h5 style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0f172a" }}>{p.name} {p.popular && <span style={{ background: "rgba(26,107,255,0.1)", color: "#1a6bff", padding: "2px 6px", borderRadius: 4, fontSize: "0.65rem", marginLeft: 4 }}>POPULER</span>}</h5>
                            <p style={{ fontSize: "1.15rem", fontWeight: 700, margin: "6px 0", color: "#0f172a" }}>Rp {p.price}Rb <span style={{ fontSize: "0.72rem", color: "#475569", fontWeight: 400 }}>/ bulan</span></p>
                            <p style={{ color: "#475569", fontSize: "0.75rem", marginBottom: 6 }}>{p.desc}</p>
                            <p style={{ color: "#64748b", fontSize: "0.72rem", fontStyle: "italic", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.features}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Annual Group */}
                    <div>
                      <h4 style={{ fontWeight: 800, fontSize: "1rem", color: "#059669", marginBottom: 12, borderBottom: "1px solid #e2e8f0", paddingBottom: 6 }}>Tahunan (Annual Billing)</h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {data.pricingPlans.filter(p => p.billing === "annual").map((p) => (
                          <div key={p.id} className="glass-card" style={{ padding: 16, borderLeft: `4px solid ${p.color || '#1a6bff'}`, position: "relative", background: "#ffffff" }}>
                            <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 6 }}>
                              <button onClick={() => startEdit(p)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }} onMouseEnter={e => e.currentTarget.style.color = "var(--cyan)"} onMouseLeave={e => e.currentTarget.style.color = "#64748b"}>
                                <Edit2 size={12} />
                              </button>
                              <button onClick={() => handleCrudDelete("Paket Harga", LandingPageApi.deletePricingPlan, p.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }} onMouseEnter={e => e.currentTarget.style.color = "#ef4444"} onMouseLeave={e => e.currentTarget.style.color = "#64748b"}>
                                <Trash2 size={12} />
                              </button>
                            </div>
                            <h5 style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0f172a" }}>{p.name} {p.popular && <span style={{ background: "rgba(26,107,255,0.1)", color: "#1a6bff", padding: "2px 6px", borderRadius: 4, fontSize: "0.65rem", marginLeft: 4 }}>POPULER</span>}</h5>
                            <p style={{ fontSize: "1.15rem", fontWeight: 700, margin: "6px 0", color: "#0f172a" }}>Rp {p.price}Rb <span style={{ fontSize: "0.72rem", color: "#475569", fontWeight: 400 }}>/ bulan</span></p>
                            <p style={{ color: "#475569", fontSize: "0.75rem", marginBottom: 6 }}>{p.desc}</p>
                            <p style={{ color: "#64748b", fontSize: "0.72rem", fontStyle: "italic", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.features}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FAQ */}
              {activeTab === "faq" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 12 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800 }}>Daftar FAQ</h3>
                    {!isAddMode && !editingItem && (
                      <button onClick={startAdd} className="btn-primary" style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", cursor: "pointer", border: "none" }}>
                        <Plus size={14} /> Tambah FAQ
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Form */}
                  {(isAddMode || editingItem) && (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleCrudSave(
                        "FAQ",
                        LandingPageApi.createFaq,
                        LandingPageApi.updateFaq,
                        { q: formFields.q, a: formFields.a },
                        editingItem?.id
                      );
                    }} style={{ background: "rgba(255,255,255,0.02)", padding: 20, borderRadius: 12, border: "1px solid var(--glass-border)", marginBottom: 24 }}>
                      <h4 style={{ marginBottom: 16, fontWeight: 700 }}>{isAddMode ? "Tambah FAQ Baru" : "Edit FAQ"}</h4>
                      <div style={{ display: "grid", gap: 16 }}>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Pertanyaan</label>
                          <input
                            type="text"
                            value={formFields.q || ""}
                            onChange={(e) => setFormFields({ ...formFields, q: e.target.value })}
                            className="cms-input"
                            style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }}
                            required
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6 }}>Jawaban</label>
                          <textarea
                            value={formFields.a || ""}
                            onChange={(e) => setFormFields({ ...formFields, a: e.target.value })}
                            className="cms-input"
                            rows={3}
                            style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", resize: "vertical" }}
                            required
                          />
                        </div>
                        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                          <button type="submit" className="btn-primary" style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: 6, border: "none", cursor: "pointer" }}>
                            <Save size={16} /> Simpan
                          </button>
                          <button type="button" onClick={cancelEdit} className="btn-outline" style={{ padding: "10px 20px", cursor: "pointer" }}>
                            Batal
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* FAQ List */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {data.faqs.map((f) => (
                      <div key={f.id} className="glass-card" style={{ padding: "18px 24px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                          <div>
                            <h4 style={{ fontWeight: 700, fontSize: "0.95rem", color: "white", marginBottom: 6 }}>Q: {f.q}</h4>
                            <p style={{ color: "var(--white-dim)", fontSize: "0.85rem", lineHeight: 1.6 }}>A: {f.a}</p>
                          </div>
                          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                            <button onClick={() => startEdit(f)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--white-dim)" }} onMouseEnter={e => e.currentTarget.style.color = "var(--cyan)"} onMouseLeave={e => e.currentTarget.style.color = "var(--white-dim)"}>
                              <Edit2 size={14} />
                            </button>
                            <button onClick={() => handleCrudDelete("FAQ", LandingPageApi.deleteFaq, f.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--white-dim)" }} onMouseEnter={e => e.currentTarget.style.color = "#ef4444"} onMouseLeave={e => e.currentTarget.style.color = "var(--white-dim)"}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {data.faqs.length === 0 && (
                      <p style={{ color: "var(--white-dim)", fontSize: "0.9rem", textAlign: "center", padding: 24 }}>Belum ada data FAQ.</p>
                    )}
                  </div>
                </div>
              )}

              {/* CTA */}
              {activeTab === "cta" && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as any;
                  handleSingletonSave("CTA Banner", LandingPageApi.updateCta, {
                    badge: form.badge.value,
                    title: form.title.value,
                    description: form.description.value,
                    btnText: form.btnText.value,
                    btnLink: form.btnLink.value,
                  });
                }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 12 }}>Kelola Section Call To Action (CTA)</h3>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Badge</label>
                      <input type="text" name="badge" defaultValue={data.ctaSection?.badge || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                    </div>
                    
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Judul Ajakan</label>
                      <input type="text" name="title" defaultValue={data.ctaSection?.title || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Deskripsi</label>
                      <textarea name="description" defaultValue={data.ctaSection?.description || ""} rows={3} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", resize: "vertical" }} required />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Teks Tombol CTA</label>
                        <input type="text" name="btnText" defaultValue={data.ctaSection?.btnText || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Link Tombol CTA</label>
                        <input type="text" name="btnLink" defaultValue={data.ctaSection?.btnLink || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                      </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 20px", marginTop: 12, border: "none", cursor: "pointer" }}>
                      <Save size={18} /> Simpan Perubahan CTA
                    </button>
                  </div>
                </form>
              )}

              {/* FOOTER */}
              {activeTab === "footer" && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as any;
                  handleSingletonSave("Footer Info", LandingPageApi.updateFooter, {
                    brandName: form.brandName.value,
                    description: form.description.value,
                    email: form.email.value,
                    phone: form.phone.value,
                    address: form.address.value,
                    whatsappUrl: form.whatsappUrl.value,
                    websiteUrl: form.websiteUrl.value,
                    facebookUrl: form.facebookUrl.value,
                    youtubeUrl: form.youtubeUrl.value,
                  });
                }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 12 }}>Kelola Footer Info & Kontak</h3>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Nama Brand</label>
                        <input type="text" name="brandName" defaultValue={data.footerInfo?.brandName || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Email Kontak</label>
                        <input type="email" name="email" defaultValue={data.footerInfo?.email || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Deskripsi Singkat Brand</label>
                      <textarea name="description" defaultValue={data.footerInfo?.description || ""} rows={2} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", resize: "vertical" }} required />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Telepon / WhatsApp</label>
                        <input type="text" name="phone" defaultValue={data.footerInfo?.phone || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 6, fontWeight: 600 }}>Alamat</label>
                        <input type="text" name="address" defaultValue={data.footerInfo?.address || ""} className="cms-input" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white" }} required />
                      </div>
                    </div>

                    <p style={{ fontSize: "0.85rem", color: "var(--cyan)", fontWeight: 700, marginTop: 12, marginBottom: 0 }}>Link Sosial Media & URL Lainnya:</p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, background: "rgba(255,255,255,0.01)", padding: 16, borderRadius: 8, border: "1px solid var(--glass-border)" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.8rem", color: "var(--white-dim)", marginBottom: 4 }}>WhatsApp Order URL</label>
                        <input type="text" name="whatsappUrl" defaultValue={data.footerInfo?.whatsappUrl || ""} className="cms-input" style={{ width: "100%", padding: 8, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", fontSize: "0.85rem" }} required />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.8rem", color: "var(--white-dim)", marginBottom: 4 }}>Website URL</label>
                        <input type="text" name="websiteUrl" defaultValue={data.footerInfo?.websiteUrl || ""} className="cms-input" style={{ width: "100%", padding: 8, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", fontSize: "0.85rem" }} required />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.8rem", color: "var(--white-dim)", marginBottom: 4 }}>Facebook URL</label>
                        <input type="text" name="facebookUrl" defaultValue={data.footerInfo?.facebookUrl || ""} className="cms-input" style={{ width: "100%", padding: 8, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", fontSize: "0.85rem" }} required />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.8rem", color: "var(--white-dim)", marginBottom: 4 }}>YouTube URL</label>
                        <input type="text" name="youtubeUrl" defaultValue={data.footerInfo?.youtubeUrl || ""} className="cms-input" style={{ width: "100%", padding: 8, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "white", fontSize: "0.85rem" }} required />
                      </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 20px", marginTop: 12, border: "none", cursor: "pointer" }}>
                      <Save size={18} /> Simpan Perubahan Footer
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </main>
      </div>

      <style>{`
        * {
          box-shadow: none !important;
        }
        .admin-bg-override {
          background: #f1f5f9 !important;
          color: #0f172a !important;
        }
        .admin-bg-override .mesh-bg,
        .admin-bg-override .grid-lines {
          display: none !important;
        }
        header {
          background: #ffffff !important;
          border-bottom: 1px solid #e2e8f0 !important;
        }
        header h1 {
          background: linear-gradient(135deg, #0f172a, #1a6bff) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
        }
        header p {
          color: #64748b !important;
        }
        .glass-card {
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          color: #0f172a !important;
        }
        /* Make all text elements black/dark slate inside the main admin content */
        h1, h2, h3, h4, h5, h6, label, span, strong {
          color: #0f172a !important;
        }
        p, .glass-card p {
          color: #475569 !important;
        }
        .badge {
          background: rgba(26, 107, 255, 0.1) !important;
          color: #1a6bff !important;
          border-color: rgba(26, 107, 255, 0.2) !important;
        }
        .btn-outline {
          border-color: #cbd5e1 !important;
          color: #0f172a !important;
        }
        .btn-outline:hover {
          background: #f8fafc !important;
        }
        aside button {
          color: #ffffff !important; /* Active state is white */
          background-color: var(--blue);
        }
        aside button.tab-hover {
          color: #475569 !important; /* Inactive state is dark gray */
          background-color: transparent !important;
        }
        aside button.tab-hover:hover {
          background: #f8fafc !important;
          color: #0f172a !important;
        }
        .glass-card button {
          color: #64748b !important;
        }
        .glass-card button:hover {
          color: #0f172a !important;
        }
        .cms-input,
        input.cms-input,
        textarea.cms-input,
        select.cms-input {
          color: #050d1a !important;
          background-color: #ffffff !important;
          border: 1px solid #cbd5e1 !important;
          transition: all 0.2s ease;
        }
        .cms-input::placeholder,
        input.cms-input::placeholder,
        textarea.cms-input::placeholder {
          color: #94a3b8 !important;
          opacity: 1;
        }
        .cms-input option {
          background-color: #ffffff !important;
          color: #050d1a !important;
        }
        .cms-input:focus {
          outline: none;
          background-color: #ffffff !important;
          border-color: var(--blue) !important;
        }
        .tab-hover:hover {
          background: #f1f5f9 !important;
          color: #0f172a !important;
        }
        @media(max-width: 900px) {
          .admin-grid {
            grid-template-columns: 1fr !important;
          }
          .admin-pricing-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
