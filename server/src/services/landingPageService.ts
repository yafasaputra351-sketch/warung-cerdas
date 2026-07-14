import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class LandingPageService {
  // Aggregate all landing page data
  static async getLandingPageData() {
    const [
      heroOpt,
      partners,
      problems,
      solutionSectionOpt,
      solutionPoints,
      features,
      dashboardPreviewOpt,
      advantages,
      steps,
      stats,
      testimonials,
      pricingPlans,
      faqs,
      ctaSectionOpt,
      footerInfoOpt
    ] = await Promise.all([
      prisma.hero.findFirst(),
      prisma.partner.findMany(),
      prisma.problem.findMany(),
      prisma.solutionSection.findFirst(),
      prisma.solutionPoint.findMany(),
      prisma.feature.findMany(),
      prisma.dashboardPreview.findFirst(),
      prisma.advantage.findMany(),
      prisma.step.findMany(),
      prisma.stat.findMany(),
      prisma.testimonial.findMany(),
      prisma.pricingPlan.findMany(),
      prisma.faq.findMany(),
      prisma.ctaSection.findFirst(),
      prisma.footerInfo.findFirst()
    ]);

    const hero = heroOpt || await this.createDefaultHero();
    const solutionSection = solutionSectionOpt || await this.createDefaultSolutionSection();
    const dashboardPreview = dashboardPreviewOpt || await this.createDefaultDashboardPreview();
    const ctaSection = ctaSectionOpt || await this.createDefaultCtaSection();
    const footerInfo = footerInfoOpt || await this.createDefaultFooterInfo();

    return {
      hero,
      partners,
      problems,
      solutionSection,
      solutionPoints,
      features,
      dashboardPreview,
      advantages,
      steps,
      stats,
      testimonials,
      pricingPlans,
      faqs,
      ctaSection,
      footerInfo
    };
  }

  // Fallback creators if seed wasn't run
  private static async createDefaultHero() {
    return prisma.hero.create({
      data: {
        id: 1,
        badge: "Platform #1 UMKM Indonesia",
        title: "Transformasi Digital UMKM Indonesia Dimulai dari Sini",
        description: "Kelola transaksi, stok barang, laporan keuangan, analitik bisnis, dan operasional usaha dalam satu platform cloud terintegrasi yang cepat, modern, dan mudah digunakan.",
        btn1Text: "Coba Gratis 14 Hari",
        btn1Link: "#",
        btn2Text: "Lihat Demo",
        btn2Link: "#",
        rating: 4.9,
        umkmCountText: "Dipercaya 10.000+ UMKM Indonesia",
      }
    });
  }

  private static async createDefaultSolutionSection() {
    return prisma.solutionSection.create({
      data: {
        id: 1,
        badge: "✦ Solusi Lengkap",
        title: "Satu Platform untuk Seluruh Operasional Bisnis Anda",
        description: "WarungCerdas hadir sebagai platform SaaS berbasis cloud yang mengintegrasikan seluruh kebutuhan operasional UMKM — dari kasir, stok, laporan keuangan, hingga analitik bisnis berbasis AI.",
        btnText: "Pelajari Lebih Lanjut →",
        btnLink: "#",
      }
    });
  }

  private static async createDefaultDashboardPreview() {
    return prisma.dashboardPreview.create({
      data: {
        id: 1,
        badge: "TrendingUp",
        title: "Dashboard Modern yang Intuitif & Powerful",
        kpi1Label: "Total Revenue", kpi1Value: "Rp 12.4Jt", kpi1Change: "+18%",
        kpi2Label: "Total Pelanggan", kpi2Value: "1,847", kpi2Change: "+24%",
        kpi3Label: "Produk Terjual", kpi3Value: "3,291", kpi3Change: "+11%",
        kpi4Label: "Total Transaksi", kpi4Value: "892", kpi4Change: "+9%",
      }
    });
  }

  private static async createDefaultCtaSection() {
    return prisma.ctaSection.create({
      data: {
        id: 1,
        badge: "✦ Mulai Sekarang",
        title: "Siap Membawa UMKM Anda ke Level Berikutnya?",
        description: "Bergabunglah dengan 10.000+ UMKM Indonesia yang telah sukses mendigitalisasi operasional bisnis mereka dengan WarungCerdas. Coba gratis sekarang!",
        btnText: "Daftar Sekarang — Gratis 14 Hari",
        btnLink: "#",
      }
    });
  }

  private static async createDefaultFooterInfo() {
    return prisma.footerInfo.create({
      data: {
        id: 1,
        brandName: "WarungCerdas",
        description: "Platform SaaS terdepan untuk digitalisasi dan optimalisasi UMKM Indonesia. Dari warung kecil hingga toko multi-cabang.",
        email: "hello@warungcerdas.id",
        phone: "+62 812-3456-7890",
        address: "Yogyakarta, Indonesia",
        whatsappUrl: "#",
        websiteUrl: "#",
        facebookUrl: "#",
        youtubeUrl: "#",
      }
    });
  }

  // Update Singletons
  static async updateHero(data: any) {
    return prisma.hero.update({ where: { id: 1 }, data });
  }

  static async updateSolutionSection(data: any) {
    return prisma.solutionSection.update({ where: { id: 1 }, data });
  }

  static async updateDashboardPreview(data: any) {
    return prisma.dashboardPreview.update({ where: { id: 1 }, data });
  }

  static async updateCtaSection(data: any) {
    return prisma.ctaSection.update({ where: { id: 1 }, data });
  }

  static async updateFooterInfo(data: any) {
    return prisma.footerInfo.update({ where: { id: 1 }, data });
  }

  // Partner CRUD
  static async createPartner(data: any) { return prisma.partner.create({ data }); }
  static async updatePartner(id: number, data: any) { return prisma.partner.update({ where: { id }, data }); }
  static async deletePartner(id: number) { return prisma.partner.delete({ where: { id } }); }

  // Problem CRUD
  static async createProblem(data: any) { return prisma.problem.create({ data }); }
  static async updateProblem(id: number, data: any) { return prisma.problem.update({ where: { id }, data }); }
  static async deleteProblem(id: number) { return prisma.problem.delete({ where: { id } }); }

  // Solution Point CRUD
  static async createSolutionPoint(data: any) { return prisma.solutionPoint.create({ data }); }
  static async updateSolutionPoint(id: number, data: any) { return prisma.solutionPoint.update({ where: { id }, data }); }
  static async deleteSolutionPoint(id: number) { return prisma.solutionPoint.delete({ where: { id } }); }

  // Feature CRUD
  static async createFeature(data: any) { return prisma.feature.create({ data }); }
  static async updateFeature(id: number, data: any) { return prisma.feature.update({ where: { id }, data }); }
  static async deleteFeature(id: number) { return prisma.feature.delete({ where: { id } }); }

  // Advantage CRUD
  static async createAdvantage(data: any) { return prisma.advantage.create({ data }); }
  static async updateAdvantage(id: number, data: any) { return prisma.advantage.update({ where: { id }, data }); }
  static async deleteAdvantage(id: number) { return prisma.advantage.delete({ where: { id } }); }

  // Step CRUD
  static async createStep(data: any) { return prisma.step.create({ data }); }
  static async updateStep(id: number, data: any) { return prisma.step.update({ where: { id }, data }); }
  static async deleteStep(id: number) { return prisma.step.delete({ where: { id } }); }

  // Stat CRUD
  static async createStat(data: any) { return prisma.stat.create({ data }); }
  static async updateStat(id: number, data: any) { return prisma.stat.update({ where: { id }, data }); }
  static async deleteStat(id: number) { return prisma.stat.delete({ where: { id } }); }

  // Testimonial CRUD
  static async createTestimonial(data: any) { return prisma.testimonial.create({ data }); }
  static async updateTestimonial(id: number, data: any) { return prisma.testimonial.update({ where: { id }, data }); }
  static async deleteTestimonial(id: number) { return prisma.testimonial.delete({ where: { id } }); }

  // Pricing Plan CRUD
  static async createPricingPlan(data: any) { return prisma.pricingPlan.create({ data }); }
  static async updatePricingPlan(id: number, data: any) { return prisma.pricingPlan.update({ where: { id }, data }); }
  static async deletePricingPlan(id: number) { return prisma.pricingPlan.delete({ where: { id } }); }

  // FAQ CRUD
  static async createFaq(data: any) { return prisma.faq.create({ data }); }
  static async updateFaq(id: number, data: any) { return prisma.faq.update({ where: { id }, data }); }
  static async deleteFaq(id: number) { return prisma.faq.delete({ where: { id } }); }
}
