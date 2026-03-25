// ============================================================
// MedChain Library - Mock Data
// ============================================================

export interface Article {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi: string;
  hash: string;
  status: "verified" | "retracted" | "updated";
  abstract: string;
  citations: number;
  versions: VersionEntry[];
  peerReviews: PeerReview[];
  tags: string[];
}

export interface VersionEntry {
  version: string;
  date: string;
  author: string;
  change: string;
  hash: string;
}

export interface PeerReview {
  id: string;
  reviewer: string;
  institution: string;
  date: string;
  verdict: "Accept" | "Minor Revision" | "Major Revision" | "Reject";
  summary: string;
  timestamp: string;
  txHash: string;
}

export interface AcademicToken {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
  txHash: string;
  category: "research" | "review" | "education" | "collaboration";
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface Guideline {
  id: string;
  name: string;
  organization: string;
  currentVersion: string;
  lastUpdated: string;
  evidenceSources: number;
  status: "active" | "under-review" | "superseded";
  hash: string;
  changeLogs: ChangeLogEntry[];
}

export interface ChangeLogEntry {
  version: string;
  date: string;
  changes: string[];
  hash: string;
  author: string;
}

export interface CitationNode {
  id: string;
  title: string;
  authors: string[];
  year: number;
  hash: string;
  type: "trial" | "discovery" | "review" | "foundational";
  children?: string[];
}

export interface ReputationMetric {
  label: string;
  value: number;
  maxValue: number;
}

export interface UserProfile {
  name: string;
  title: string;
  institution: string;
  walletAddress: string;
  avatar: string;
  joinedDate: string;
  totalPublications: number;
  totalCitations: number;
  hIndex: number;
  reputation: ReputationMetric[];
  tokens: AcademicToken[];
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  date: string;
  txHash: string;
}

// ────────────────────────────────────────────────────────────
// User Profile
// ────────────────────────────────────────────────────────────
export const userProfile: UserProfile = {
  name: "Dr. Canberk Yılmaz",
  title: "Tıp Fakültesi Araştırmacı | Blockchain Medicine",
  institution: "İstanbul Tıp Fakültesi",
  walletAddress: "0x7a3B...9f2E",
  avatar: "/avatar.png",
  joinedDate: "2024-09-15",
  totalPublications: 12,
  totalCitations: 347,
  hIndex: 8,
  reputation: [
    { label: "Real Impact", value: 87, maxValue: 100 },
    { label: "Data Sharing", value: 92, maxValue: 100 },
    { label: "Open Science", value: 78, maxValue: 100 },
    { label: "Citation Quality", value: 85, maxValue: 100 },
    { label: "Peer Review", value: 90, maxValue: 100 },
    { label: "Reproducibility", value: 73, maxValue: 100 },
  ],
  tokens: [
    {
      id: "tkn-001",
      title: "50 Makale Analizi",
      description: "50 bilimsel makaleyi kritik analiz ile tamamladı",
      icon: "BookOpen",
      earnedDate: "2025-11-20",
      txHash: "0xabc123...def456",
      category: "education",
      rarity: "epic",
    },
    {
      id: "tkn-002",
      title: "Meta-analiz Katkısı",
      description: "Bir meta-analiz çalışmasına veri katkısı sağladı",
      icon: "BarChart3",
      earnedDate: "2025-12-05",
      txHash: "0x789abc...123def",
      category: "research",
      rarity: "legendary",
    },
    {
      id: "tkn-003",
      title: "Vaka Sunumu",
      description: "Orijinal bir vaka raporunu blockchain'e kaydetti",
      icon: "FileText",
      earnedDate: "2026-01-10",
      txHash: "0xdef789...abc123",
      category: "research",
      rarity: "rare",
    },
    {
      id: "tkn-004",
      title: "Peer Review Hakemi",
      description: "5 makale için şeffaf hakem değerlendirmesi yaptı",
      icon: "ShieldCheck",
      earnedDate: "2026-02-14",
      txHash: "0x456def...789abc",
      category: "review",
      rarity: "epic",
    },
    {
      id: "tkn-005",
      title: "Açık Veri Paylaşımcısı",
      description: "Araştırma verilerini açık erişimle paylaştı",
      icon: "Share2",
      earnedDate: "2026-01-28",
      txHash: "0xfed321...cba654",
      category: "collaboration",
      rarity: "rare",
    },
    {
      id: "tkn-006",
      title: "Atıf Zinciri Katkısı",
      description: "10 farklı atıf zincirinde referans doğrulaması yaptı",
      icon: "GitBranch",
      earnedDate: "2026-03-01",
      txHash: "0x111aaa...222bbb",
      category: "education",
      rarity: "common",
    },
  ],
  recentActivities: [
    {
      id: "act-1",
      type: "article_review",
      description: "GLP-1 Agonist Meta-analysis makalesini inceledi",
      date: "2026-03-24",
      txHash: "0xact1...hash",
    },
    {
      id: "act-2",
      type: "data_share",
      description: "Sepsis veri setini açık erişimle paylaştı",
      date: "2026-03-22",
      txHash: "0xact2...hash",
    },
    {
      id: "act-3",
      type: "citation_verify",
      description: "Semaglutide atıf zincirini doğruladı",
      date: "2026-03-20",
      txHash: "0xact3...hash",
    },
    {
      id: "act-4",
      type: "peer_review",
      description: "Kardiyoloji makalesini hakemlik yaptı",
      date: "2026-03-18",
      txHash: "0xact4...hash",
    },
    {
      id: "act-5",
      type: "token_earned",
      description: "Atıf Zinciri Katkısı NFT'si kazandı",
      date: "2026-03-01",
      txHash: "0xact5...hash",
    },
  ],
};

// ────────────────────────────────────────────────────────────
// Articles
// ────────────────────────────────────────────────────────────
export const articles: Article[] = [
  {
    id: "art-001",
    title: "Semaglutide and Cardiovascular Outcomes in Patients with Type 2 Diabetes",
    authors: ["Marso SP", "Daniels GH", "Nissen SE", "Bain SC"],
    journal: "New England Journal of Medicine",
    year: 2021,
    doi: "10.1056/NEJMoa2032183",
    hash: "0x8f3a7b2c1d4e5f6a7b8c9d0e1f2a3b4c",
    status: "verified",
    abstract:
      "Bu çalışma, tip 2 diyabet hastalarında semaglutide'in kardiyovasküler sonuçlara etkisini araştırmıştır...",
    citations: 1247,
    tags: ["Cardiology", "Diabetes", "GLP-1"],
    versions: [
      {
        version: "1.0",
        date: "2021-06-01",
        author: "Marso SP et al.",
        change: "İlk yayın",
        hash: "0x8f3a7b2c1d4e5f6a",
      },
      {
        version: "1.1",
        date: "2021-09-15",
        author: "Editör Kurulu",
        change: "Tablo 3 düzeltmesi - istatistiksel hata giderildi",
        hash: "0x9a4b8c3d2e5f7a1b",
      },
    ],
    peerReviews: [
      {
        id: "pr-001",
        reviewer: "Prof. Dr. Elena Martinez",
        institution: "Harvard Medical School",
        date: "2021-03-10",
        verdict: "Accept",
        summary: "Metodolojik olarak güçlü, sonuçlar klinik pratiğe katkı sağlayacak nitelikte.",
        timestamp: "2021-03-10T14:30:00Z",
        txHash: "0xpr001...hash",
      },
      {
        id: "pr-002",
        reviewer: "Dr. Kenji Tanaka",
        institution: "University of Tokyo",
        date: "2021-03-18",
        verdict: "Minor Revision",
        summary: "Alt grup analizlerinin detaylandırılması gerekli.",
        timestamp: "2021-03-18T09:15:00Z",
        txHash: "0xpr002...hash",
      },
    ],
  },
  {
    id: "art-002",
    title: "CRISPR-Cas9 Gene Editing in Human Embryos: Ethical and Clinical Perspectives",
    authors: ["Zhang H", "Liu Y", "Anderson W"],
    journal: "Nature Medicine",
    year: 2023,
    doi: "10.1038/s41591-023-02345",
    hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
    status: "updated",
    abstract:
      "İnsan embriyolarında CRISPR-Cas9 gen düzenleme teknolojisinin etik ve klinik yönlerini inceleyen kapsamlı bir derleme...",
    citations: 892,
    tags: ["Genetics", "Ethics", "CRISPR"],
    versions: [
      {
        version: "1.0",
        date: "2023-01-15",
        author: "Zhang H et al.",
        change: "İlk yayın",
        hash: "0x1a2b3c4d5e6f7a8b",
      },
      {
        version: "2.0",
        date: "2023-08-20",
        author: "Zhang H et al.",
        change: "Yeni klinik veriler eklendi, etik çerçeve güncellendi",
        hash: "0x2b3c4d5e6f7a8b9c",
      },
      {
        version: "2.1",
        date: "2024-02-10",
        author: "Zhang H et al.",
        change: "Off-target etkileri için güncel meta-analiz verileri eklendi",
        hash: "0x3c4d5e6f7a8b9c0d",
      },
    ],
    peerReviews: [
      {
        id: "pr-003",
        reviewer: "Prof. Sarah Chen",
        institution: "Stanford University",
        date: "2022-11-05",
        verdict: "Major Revision",
        summary: "Etik tartışma bölümü genişletilmeli, klinik veriler zayıf.",
        timestamp: "2022-11-05T16:00:00Z",
        txHash: "0xpr003...hash",
      },
      {
        id: "pr-004",
        reviewer: "Dr. Friedrich Weber",
        institution: "Max Planck Institute",
        date: "2022-12-01",
        verdict: "Minor Revision",
        summary: "Metodoloji sağlam, küçük düzeltmelerle kabul edilebilir.",
        timestamp: "2022-12-01T11:30:00Z",
        txHash: "0xpr004...hash",
      },
    ],
  },
  {
    id: "art-003",
    title: "Artificial Intelligence in Radiology: A Systematic Review and Meta-Analysis",
    authors: ["Kim JH", "Park S", "Lee DH"],
    journal: "The Lancet Digital Health",
    year: 2024,
    doi: "10.1016/S2589-7500(24)00123-4",
    hash: "0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a",
    status: "verified",
    abstract:
      "Radyolojide yapay zeka uygulamalarının tanısal doğruluğunu değerlendiren sistematik derleme ve meta-analiz...",
    citations: 456,
    tags: ["AI", "Radiology", "Meta-analysis"],
    versions: [
      {
        version: "1.0",
        date: "2024-03-01",
        author: "Kim JH et al.",
        change: "İlk yayın",
        hash: "0x4d5e6f7a8b9c0d1e",
      },
    ],
    peerReviews: [
      {
        id: "pr-005",
        reviewer: "Prof. Maria Gonzalez",
        institution: "Johns Hopkins University",
        date: "2023-12-15",
        verdict: "Accept",
        summary:
          "Kapsamlı ve metodolojik olarak güçlü bir sistematik derleme.",
        timestamp: "2023-12-15T10:00:00Z",
        txHash: "0xpr005...hash",
      },
    ],
  },
  {
    id: "art-004",
    title: "Retracted: Hydroxychloroquine for COVID-19 Treatment - A Multicenter Study",
    authors: ["Mehra MR", "Desai SS", "Ruschitzka F"],
    journal: "The Lancet",
    year: 2020,
    doi: "10.1016/S0140-6736(20)31180-6",
    hash: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    status: "retracted",
    abstract:
      "Bu çalışma, COVID-19 hastalarında hidroksiklorokinin etkisini değerlendirmek amacıyla yapılmıştır. Veri bütünlüğü sorunları nedeniyle geri çekilmiştir.",
    citations: 2340,
    tags: ["COVID-19", "Retracted", "Pharmacology"],
    versions: [
      {
        version: "1.0",
        date: "2020-05-22",
        author: "Mehra MR et al.",
        change: "İlk yayın",
        hash: "0x5e6f7a8b9c0d1e2f",
      },
      {
        version: "RETRACTED",
        date: "2020-06-04",
        author: "The Lancet Editör Kurulu",
        change: "Veri bütünlüğü doğrulanamadı - Surgisphere verileri güvenilir değil",
        hash: "0x6f7a8b9c0d1e2f3a",
      },
    ],
    peerReviews: [
      {
        id: "pr-006",
        reviewer: "Anonim Hakem #1",
        institution: "Bilinmiyor",
        date: "2020-05-15",
        verdict: "Accept",
        summary: "Hızlı kabul - pandemi koşulları gereği.",
        timestamp: "2020-05-15T08:00:00Z",
        txHash: "0xpr006...hash",
      },
    ],
  },
  {
    id: "art-005",
    title: "mRNA Vaccine Technology: From Concept to COVID-19 Protection",
    authors: ["Karikó K", "Weissman D", "Pardi N"],
    journal: "Nature Reviews Immunology",
    year: 2022,
    doi: "10.1038/s41577-022-00345-8",
    hash: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
    status: "verified",
    abstract:
      "mRNA aşı teknolojisinin konseptten COVID-19 korumasına kadar olan gelişim sürecini kapsayan bir derleme...",
    citations: 3120,
    tags: ["Immunology", "mRNA", "Vaccine"],
    versions: [
      {
        version: "1.0",
        date: "2022-01-10",
        author: "Karikó K et al.",
        change: "İlk yayın",
        hash: "0x7a8b9c0d1e2f3a4b",
      },
    ],
    peerReviews: [
      {
        id: "pr-007",
        reviewer: "Prof. Anthony Fauci",
        institution: "NIAID",
        date: "2021-11-20",
        verdict: "Accept",
        summary: "Olağanüstü derleme, alanın kapsamlı bir değerlendirmesi.",
        timestamp: "2021-11-20T14:00:00Z",
        txHash: "0xpr007...hash",
      },
      {
        id: "pr-008",
        reviewer: "Dr. Özlem Türeci",
        institution: "BioNTech",
        date: "2021-12-01",
        verdict: "Accept",
        summary: "Teknik detaylar doğru, tarihsel perspektif değerli.",
        timestamp: "2021-12-01T09:30:00Z",
        txHash: "0xpr008...hash",
      },
    ],
  },
  {
    id: "art-006",
    title: "Gut Microbiome and Mental Health: A Bidirectional Relationship",
    authors: ["Cryan JF", "O'Riordan KJ", "Dinan TG"],
    journal: "Nature Neuroscience",
    year: 2023,
    doi: "10.1038/s41593-023-01234-5",
    hash: "0x8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e",
    status: "verified",
    abstract:
      "Bağırsak mikrobiyomu ile ruh sağlığı arasındaki çift yönlü ilişkiyi inceleyen kapsamlı bir çalışma...",
    citations: 678,
    tags: ["Neuroscience", "Microbiome", "Mental Health"],
    versions: [
      {
        version: "1.0",
        date: "2023-04-15",
        author: "Cryan JF et al.",
        change: "İlk yayın",
        hash: "0x8b9c0d1e2f3a4b5c",
      },
    ],
    peerReviews: [
      {
        id: "pr-009",
        reviewer: "Prof. Emeran Mayer",
        institution: "UCLA",
        date: "2023-02-10",
        verdict: "Accept",
        summary: "Alanın en kapsamlı çalışmalarından biri.",
        timestamp: "2023-02-10T15:00:00Z",
        txHash: "0xpr009...hash",
      },
    ],
  },
  {
    id: "art-007",
    title: "CAR-T Cell Therapy in Solid Tumors: Challenges and Novel Approaches",
    authors: ["June CH", "Maus MV", "Plesa G"],
    journal: "Journal of Clinical Oncology",
    year: 2024,
    doi: "10.1200/JCO.2024.12345",
    hash: "0x9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f",
    status: "verified",
    abstract:
      "Solid tümörlerde CAR-T hücre tedavisinin karşılaştığı zorlukları ve yeni yaklaşımları değerlendiren bir klinik derleme...",
    citations: 234,
    tags: ["Oncology", "Immunotherapy", "CAR-T"],
    versions: [
      {
        version: "1.0",
        date: "2024-06-01",
        author: "June CH et al.",
        change: "İlk yayın",
        hash: "0x9c0d1e2f3a4b5c6d",
      },
    ],
    peerReviews: [
      {
        id: "pr-010",
        reviewer: "Dr. Crystal Mackall",
        institution: "Stanford Medicine",
        date: "2024-04-15",
        verdict: "Minor Revision",
        summary: "Solid tümör bölümü detaylandırılmalı.",
        timestamp: "2024-04-15T13:00:00Z",
        txHash: "0xpr010...hash",
      },
    ],
  },
  {
    id: "art-008",
    title: "Retracted: Stem Cell Therapy Reverses Aging in Mice - STAP Cell Controversy",
    authors: ["Obokata H", "Wakayama T", "Sasai Y"],
    journal: "Nature",
    year: 2014,
    doi: "10.1038/nature12968",
    hash: "0xa0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5",
    status: "retracted",
    abstract:
      "STAP hücreleri olarak bilinen bu çalışma, asitle uyarılmış kök hücre üretimini iddia etmiştir. Sonuçlar tekrarlanamadığı için geri çekilmiştir.",
    citations: 890,
    tags: ["Stem Cells", "Retracted", "Controversy"],
    versions: [
      {
        version: "1.0",
        date: "2014-01-30",
        author: "Obokata H et al.",
        change: "İlk yayın",
        hash: "0xa0b1c2d3e4f5a6b7",
      },
      {
        version: "RETRACTED",
        date: "2014-07-02",
        author: "Nature Editör Kurulu",
        change: "Sonuçlar bağımsız laboratuvarlarda tekrarlanamadı, görsel manipülasyon tespit edildi",
        hash: "0xb1c2d3e4f5a6b7c8",
      },
    ],
    peerReviews: [
      {
        id: "pr-011",
        reviewer: "Anonim Hakem #2",
        institution: "Bilinmiyor",
        date: "2013-12-10",
        verdict: "Accept",
        summary: "Çığır açıcı sonuçlar - kök hücre araştırmalarında yeni bir dönem.",
        timestamp: "2013-12-10T10:00:00Z",
        txHash: "0xpr011...hash",
      },
    ],
  },
];

// ────────────────────────────────────────────────────────────
// Citation Chain (Semaglutide pathway)
// ────────────────────────────────────────────────────────────
export const citationNodes: CitationNode[] = [
  {
    id: "cn-001",
    title: "Semaglutide Cardiovascular Outcomes Trial",
    authors: ["Marso SP", "Daniels GH"],
    year: 2021,
    hash: "0x8f3a7b...",
    type: "trial",
    children: ["cn-002", "cn-003"],
  },
  {
    id: "cn-002",
    title: "Once-Weekly Semaglutide in Adults with Overweight or Obesity",
    authors: ["Wilding JPH", "Batterham RL"],
    year: 2021,
    hash: "0xa1b2c3...",
    type: "trial",
    children: ["cn-004"],
  },
  {
    id: "cn-003",
    title: "Liraglutide and Cardiovascular Outcomes in Type 2 Diabetes",
    authors: ["Marso SP", "Bain SC"],
    year: 2016,
    hash: "0xd4e5f6...",
    type: "trial",
    children: ["cn-004", "cn-005"],
  },
  {
    id: "cn-004",
    title: "GLP-1 Receptor Agonists: Mechanisms and Clinical Effects",
    authors: ["Drucker DJ", "Nauck MA"],
    year: 2006,
    hash: "0xg7h8i9...",
    type: "review",
    children: ["cn-005", "cn-006"],
  },
  {
    id: "cn-005",
    title: "Discovery of GLP-1 Receptor and Its Signaling Pathway",
    authors: ["Thorens B"],
    year: 1992,
    hash: "0xj1k2l3...",
    type: "discovery",
    children: ["cn-006", "cn-007"],
  },
  {
    id: "cn-006",
    title: "Glucagon-like Peptide-1: Discovery and Characterization",
    authors: ["Mojsov S", "Heinrich G", "Habener JF"],
    year: 1987,
    hash: "0xm4n5o6...",
    type: "discovery",
    children: ["cn-007"],
  },
  {
    id: "cn-007",
    title: "Incretin Hormone Research: The Gut-Pancreas Axis",
    authors: ["McIntyre N", "Holdsworth CD", "Turner DS"],
    year: 1964,
    hash: "0xp7q8r9...",
    type: "foundational",
    children: [],
  },
];

// ────────────────────────────────────────────────────────────
// Guidelines
// ────────────────────────────────────────────────────────────
export const guidelines: Guideline[] = [
  {
    id: "gl-001",
    name: "Sepsis ve Septik Şok Yönetimi",
    organization: "WHO",
    currentVersion: "3.2",
    lastUpdated: "2026-01-15",
    evidenceSources: 148,
    status: "active",
    hash: "0xgl001...abc",
    changeLogs: [
      {
        version: "3.2",
        date: "2026-01-15",
        changes: [
          "Laktat eşiği güncellendi (>2 mmol/L → >1.5 mmol/L)",
          "Erken resüsitasyon protokolü revize edildi",
          "Yeni antibiyotik başlama zamanı önerisi: 1 saat içinde",
        ],
        hash: "0xgl001v32...hash",
        author: "WHO Sepsis Taskforce",
      },
      {
        version: "3.1",
        date: "2025-06-20",
        changes: [
          "qSOFA skor kriterleri güncellendi",
          "Noradrenalin dozaj önerisi revize edildi",
        ],
        hash: "0xgl001v31...hash",
        author: "WHO Sepsis Taskforce",
      },
      {
        version: "3.0",
        date: "2024-11-01",
        changes: [
          "Sepsis-3 tanım kriterleri yeniden değerlendirildi",
          "Kaynak kontrolü zamanlaması eklendi",
        ],
        hash: "0xgl001v30...hash",
        author: "WHO Sepsis Taskforce",
      },
    ],
  },
  {
    id: "gl-002",
    name: "Kronik Kalp Yetmezliği Yönetimi",
    organization: "ESC",
    currentVersion: "2.4",
    lastUpdated: "2025-12-01",
    evidenceSources: 234,
    status: "active",
    hash: "0xgl002...def",
    changeLogs: [
      {
        version: "2.4",
        date: "2025-12-01",
        changes: [
          "SGLT2 inhibitörleri birinci basamak tedaviye eklendi",
          "NT-proBNP takip aralıkları güncellendi",
          "Kardiyak rehabilitasyon protokolü genişletildi",
        ],
        hash: "0xgl002v24...hash",
        author: "ESC Heart Failure Committee",
      },
      {
        version: "2.3",
        date: "2025-03-15",
        changes: [
          "GLP-1 agonistlerin HF'deki rolü eklendi",
          "Telemonitörizasyon önerileri güncellendi",
        ],
        hash: "0xgl002v23...hash",
        author: "ESC Heart Failure Committee",
      },
    ],
  },
  {
    id: "gl-003",
    name: "Antimikrobiyal Direnç Kontrol Stratejileri",
    organization: "CDC",
    currentVersion: "4.1",
    lastUpdated: "2026-02-28",
    evidenceSources: 312,
    status: "active",
    hash: "0xgl003...ghi",
    changeLogs: [
      {
        version: "4.1",
        date: "2026-02-28",
        changes: [
          "Yeni karbapenem dirençli patojenlere karşı protokol eklendi",
          "Stewardship programı güncellendi",
          "Hızlı tanı testleri entegrasyon kılavuzları eklendi",
        ],
        hash: "0xgl003v41...hash",
        author: "CDC AMR Task Force",
      },
    ],
  },
  {
    id: "gl-004",
    name: "Hipertansiyon Yönetimi",
    organization: "ESC",
    currentVersion: "5.0",
    lastUpdated: "2025-08-10",
    evidenceSources: 189,
    status: "under-review",
    hash: "0xgl004...jkl",
    changeLogs: [
      {
        version: "5.0",
        date: "2025-08-10",
        changes: [
          "Hedef kan basıncı değerleri revize edildi (<130/80 mmHg)",
          "Renal denervasyon tedavisi önerisi güncellendi",
          "ABPM protokolü standardize edildi",
        ],
        hash: "0xgl004v50...hash",
        author: "ESC Hypertension Council",
      },
    ],
  },
  {
    id: "gl-005",
    name: "COVID-19 Tedavi Protokolü",
    organization: "WHO",
    currentVersion: "8.3",
    lastUpdated: "2026-03-10",
    evidenceSources: 567,
    status: "active",
    hash: "0xgl005...mno",
    changeLogs: [
      {
        version: "8.3",
        date: "2026-03-10",
        changes: [
          "Yeni varyant tedavi yaklaşımı güncellendi",
          "Antiviral tedavi algoritması revize edildi",
          "Long-COVID yönetimi bölümü eklendi",
        ],
        hash: "0xgl005v83...hash",
        author: "WHO COVID-19 Therapeutics",
      },
      {
        version: "8.2",
        date: "2025-10-05",
        changes: [
          "Monoklonal antikor tedavisi güncellemesi",
          "Aşılama ve tedavi etkileşim bilgisi eklendi",
        ],
        hash: "0xgl005v82...hash",
        author: "WHO COVID-19 Therapeutics",
      },
    ],
  },
  {
    id: "gl-006",
    name: "Tip 2 Diyabet Tedavi Kılavuzu",
    organization: "NICE",
    currentVersion: "6.1",
    lastUpdated: "2025-11-20",
    evidenceSources: 278,
    status: "active",
    hash: "0xgl006...pqr",
    changeLogs: [
      {
        version: "6.1",
        date: "2025-11-20",
        changes: [
          "GLP-1 agonist kullanım endikasyonları genişletildi",
          "HbA1c hedef değerleri kişiselleştirildi",
          "Diyabetik nefropati tarama sıklığı güncellendi",
        ],
        hash: "0xgl006v61...hash",
        author: "NICE Diabetes Committee",
      },
    ],
  },
];
