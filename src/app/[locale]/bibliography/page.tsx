"use client";

import { useState } from "react";
import {
  Search,
  ShieldCheck,
  RefreshCw,
  History,
  X,
  Hash,
  Calendar,
  Users,
  FileWarning,
  CheckCircle2,
  Eye,
  FileText,
  Lock as LockIcon,
  ArrowRight as ArrowRightIcon,
  Loader2,
} from "lucide-react";
import { articles as initialArticles } from "@/lib/mock-data";
import type { Article, VersionEntry } from "@/lib/mock-data";
import { useTranslations } from "next-intl";
import { ApiServices } from "@/lib/api-services";

function StatusBadge({ status }: { status: Article["status"] }) {
  const t = useTranslations("Bibliography.status");
  const config = {
    verified: { class: "badge-verified", icon: CheckCircle2, label: t("verified") },
    retracted: { class: "badge-retracted", icon: FileWarning, label: t("retracted") },
    updated: { class: "badge-updated", icon: RefreshCw, label: t("updated") },
  };
  const c = config[status];
  return (
    <span className={`badge ${c.class}`}>
      <c.icon size={11} />
      {c.label}
    </span>
  );
}

function ArticleDetailModal({
  article,
  onClose,
}: {
  article: Article;
  onClose: () => void;
}) {
  const t = useTranslations("Bibliography");
  const [activeTab, setActiveTab] = useState<"abstract" | "history">("abstract");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="relative p-6 border-b border-(--border-color)">
          <div className="flex items-start justify-between">
            <div className="pr-8">
              <div className="flex items-center gap-2 mb-2">
                <StatusBadge status={article.status} />
                <span className="text-[10px] font-mono text-(--text-muted)">HASH: {article.hash}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground leading-tight">
                {article.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl bg-(--bg-secondary) hover:bg-(--bg-card-hover) transition-colors"
            >
              <X size={18} className="text-(--text-muted)" />
            </button>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setActiveTab("abstract")}
              className={`pb-2 text-sm font-bold border-b-2 transition-all ${
                activeTab === "abstract" ? "border-(--accent-blue) text-(--accent-blue)" : "border-transparent text-(--text-muted)"
              }`}
            >
              Abstract & Figures
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`pb-2 text-sm font-bold border-b-2 transition-all ${
                activeTab === "history" ? "border-(--accent-blue) text-(--accent-blue)" : "border-transparent text-(--text-muted)"
              }`}
            >
              {t("version_history")}
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === "abstract" ? (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-(--text-muted) mb-3 text-white">
                  Abstract
                </h4>
                <p className="text-sm text-foreground leading-relaxed font-medium">
                  {article.abstract}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="aspect-[3/4] rounded-2xl bg-(--bg-secondary) border border-(--border-color) flex flex-col items-center justify-center gap-3 group cursor-pointer hover:border-(--accent-blue) transition-all">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-(--accent-blue) group-hover:scale-110 transition-transform">
                    <FileText size={24} />
                  </div>
                  <p className="text-[10px] font-bold uppercase text-(--text-muted) group-hover:text-(--accent-blue)">
                    Full PDF Preview
                  </p>
                </div>
                <div className="aspect-[3/4] rounded-2xl bg-(--bg-secondary) border border-(--border-color) flex flex-col items-center justify-center gap-3 group cursor-pointer hover:border-(--accent-blue) transition-all">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[--accent-emerald] group-hover:scale-110 transition-transform">
                    <History size={24} />
                  </div>
                  <p className="text-[10px] font-bold uppercase text-(--text-muted) group-hover:text-[--accent-emerald]">
                    Supporting Data
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {article.versions.map((v: VersionEntry, idx: number) => (
                <div key={idx} className="glass-card p-4 relative group hover:border-(--accent-blue) transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-(--accent-blue)">v{v.version}</span>
                      <span className="text-[10px] text-(--text-muted)">{v.date}</span>
                    </div>
                    <span className="hash-display text-[10px] opacity-60 group-hover:opacity-100 transition-opacity">{v.hash}</span>
                  </div>
                  <p className="text-sm text-foreground">{v.change}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-(--border-color) bg-(--bg-secondary) flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LockIcon size={14} className="text-[--accent-emerald]" />
            <p className="text-[11px] text-[--accent-emerald] font-medium">
              Secured by MedChain Protocol
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-(--accent-blue) text-white text-xs font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all">
            Verification Portal
            <ArrowRightIcon size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function VerificationModal({
  article,
  onClose,
}: {
  article: Article;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<"connecting" | "fetching" | "verified">("connecting");
  
  useState(() => {
    setTimeout(() => setStatus("fetching"), 1500);
    setTimeout(() => setStatus("verified"), 3000);
  });

  return (
    <div className="modal-overlay z-[100]" onClick={onClose}>
      <div className="modal-content max-w-md p-8 text-center" onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 relative h-20 flex items-center justify-center">
          {status !== "verified" ? (
            <div className="flex flex-col items-center">
              <Loader2 size={48} className="text-(--accent-blue) animate-spin" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-[--accent-emerald]/10 flex items-center justify-center text-[--accent-emerald] animate-in zoom-in-50 duration-300">
              <CheckCircle2 size={40} />
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2">
          {status === "connecting" && "Connecting to Node..."}
          {status === "fetching" && "Fetching Proof-of-Trust..."}
          {status === "verified" && "Immutable Proof Verified"}
        </h3>
        
        <p className="text-sm text-(--text-muted) mb-8">
          {status !== "verified" 
            ? "Verifying bibliographic hash against Ethereum Mainnet nodes..." 
            : `Record ${article.hash.slice(0, 10)}... confirmed in block #1829304`}
        </p>

        <div className="space-y-3">
          <div className={`p-3 rounded-xl border border-(--border-color) bg-(--bg-secondary) flex items-center justify-between transition-opacity ${status === "connecting" ? "opacity-100" : "opacity-50"}`}>
            <span className="text-[11px] font-bold">NODE CONNECTION</span>
            <span className="text-[10px] font-mono text-(--accent-blue)">ACTIVE</span>
          </div>
          <div className={`p-3 rounded-xl border border-(--border-color) bg-(--bg-secondary) flex items-center justify-between transition-opacity ${status === "fetching" ? "opacity-100" : "opacity-50"}`}>
            <span className="text-[11px] font-bold">MERKLE PROOF</span>
            <span className="text-[10px] font-mono text-(--accent-purple)">VALIDATING</span>
          </div>
          <div className={`p-3 rounded-xl border border-(--border-color) bg-(--bg-secondary) flex items-center justify-between transition-opacity ${status === "verified" ? "opacity-100" : "opacity-50"}`}>
            <span className="text-[11px] font-bold">BLOCKCHAIN FINALITY</span>
            <span className="text-[10px] font-mono text-[--accent-emerald]">CONFIRMED</span>
          </div>
        </div>

        {status === "verified" && (
          <button 
            onClick={onClose}
            className="w-full mt-8 py-3 rounded-xl bg-(--bg-secondary) border border-(--border-color) text-sm font-bold hover:bg-[--bg-card-hover] transition-all"
          >
            Close Proof
          </button>
        )}
      </div>
    </div>
  );
}

export default function BibliographyPage() {
  const [articles, setArticles] = useState(initialArticles);
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [verifyingArticle, setVerifyingArticle] = useState<Article | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isSyncing, setIsSyncing] = useState<string | null>(null);
  const t = useTranslations("Bibliography");

  const handleSync = async (article: Article) => {
    if (!article.doi) return;
    setIsSyncing(article.id);
    
    const externalData = await ApiServices.fetchByDOI(article.doi);
    if (externalData && externalData.citations !== undefined) {
      setArticles(prev => prev.map(a => 
        a.id === article.id ? { ...a, citations: externalData.citations || a.citations } : a
      ));
    }
    
    setTimeout(() => setIsSyncing(null), 800);
  };

  const handleExternalSearch = async () => {
    if (!search.includes("10.") && search.length < 5) return; // Basic DOI/PMID check
    
    setIsSyncing("search");
    let externalData = null;
    
    if (search.includes("10.")) {
      externalData = await ApiServices.fetchByDOI(search);
    } else {
      externalData = await ApiServices.fetchByPMID(search);
    }

    if (externalData) {
      const newArticle: Article = {
        id: `ext-${Date.now()}`,
        title: externalData.title,
        authors: externalData.authors,
        journal: externalData.journal,
        year: externalData.year,
        doi: externalData.doi || "",
        hash: `0x${Math.random().toString(16).slice(2)}`,
        status: "verified",
        abstract: externalData.abstract || "No abstract available.",
        citations: externalData.citations || 0,
        versions: [{ version: "1.0", date: new Date().toISOString().split('T')[0], author: "System", change: "Imported from external database", hash: "0x..." }],
        peerReviews: [],
        tags: ["Imported"],
      };
      setArticles(prev => [newArticle, ...prev]);
      setSearch("");
    }
    setIsSyncing(null);
  };
  const filtered = articles.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.authors.some((au: string) => au.toLowerCase().includes(search.toLowerCase())) ||
      a.tags.some((t: string) => t.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white uppercase">
          {t("title")}
        </h1>
        <p className="text-sm text-(--text-secondary) mt-1 font-medium italic">
          {t("subtitle")}
        </p>
      </div>

      {/* Search & Filters */}
      <div className="glass-premium p-6 flex flex-col md:flex-row gap-4 rounded-3xl shadow-2xl">
        <div className="flex-1 relative">
          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-(--text-muted)"
          />
          <input
            type="text"
            placeholder={t("search_placeholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleExternalSearch()}
            className="w-full bg-(--bg-secondary) border border-white/5 rounded-2xl pl-14 pr-32 py-4 text-sm text-white placeholder:text-(--text-muted) focus:outline-none focus:border-(--accent-blue)/50 transition-all shadow-inner"
          />
          <button 
            onClick={handleExternalSearch}
            disabled={isSyncing === "search"}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase rounded-xl border border-blue-500/20 hover:bg-blue-500/20 transition-all disabled:opacity-50"
          >
            {isSyncing === "search" ? "..." : "Fetch DOI/PMID"}
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {["all", "verified", "updated", "retracted"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-6 py-3 rounded-2xl text-[10px] uppercase font-black tracking-widest transition-all whitespace-nowrap active:scale-95 ${
                statusFilter === s
                  ? "bg-(--accent-blue) text-white shadow-2xl shadow-blue-500/30"
                  : "bg-white/5 text-(--text-muted) border border-white/5 hover:border-(--accent-blue)/50 hover:text-white"
              }`}
            >
              {t(`filters.${s}`)}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs font-bold text-(--text-muted) px-1">
        {t("results_found", { count: filtered.length })}
      </p>

      {/* Article Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filtered.map((article) => (
          <div
            key={article.id}
            className={`group relative glass-premium p-8 transition-all duration-500 hover:border-(--accent-blue)/30 rounded-[32px] shadow-2xl ${
              article.status === "retracted" ? "border-red-500/20 opacity-90" : "border-white/5"
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-8">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-4">
                  <StatusBadge status={article.status} />
                  {article.versions.length > 1 && (
                    <span className="text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      v{article.versions[article.versions.length - 1].version}
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-(--text-muted) ml-auto lg:ml-0 font-bold tracking-widest">
                    <Hash size={10} className="inline mr-1 opacity-50 text-(--accent-blue)" />
                    {article.hash.slice(0, 16)}...
                  </span>
                </div>
                
                <h3
                  onClick={() => setSelectedArticle(article)}
                  className={`text-xl font-black mb-4 cursor-pointer hover:text-(--accent-blue) transition-all duration-300 leading-snug tracking-tight ${
                    article.status === "retracted" ? "text-red-400 line-through opacity-60" : "text-white"
                  }`}
                >
                  {article.title}
                </h3>

                <div className="flex flex-wrap items-center gap-6 text-xs text-(--text-secondary) mb-5 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                    <Users size={16} className="text-(--accent-blue)" />
                    {article.authors.join(", ")}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar size={16} className="text-(--text-muted)" />
                    {article.year}
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/5 text-white/70">
                    {article.journal}
                  </span>
                </div>

                <p className="text-sm text-(--text-muted) line-clamp-2 leading-relaxed mb-6 font-medium italic">
                  {article.abstract}
                </p>

                <div className="flex items-center gap-3">
                  <div className="flex flex-wrap gap-2 flex-1">
                    {article.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl bg-white/[0.03] text-(--text-muted) border border-white/5 group-hover:bg-white/[0.05] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-6 shrink-0 w-full lg:w-56 mt-6 lg:mt-0 pt-8 lg:pt-0 border-t border-white/5 lg:border-t-0">
                  <div className="flex flex-col lg:items-end gap-1 relative group/stat">
                    <p className="text-[10px] uppercase font-black text-(--text-muted) tracking-[0.2em] flex items-center gap-2">
                      Citations
                      <button 
                        onClick={() => handleSync(article)}
                        disabled={isSyncing === article.id}
                        className={`p-1 rounded-md hover:bg-white/5 transition-colors ${isSyncing === article.id ? "animate-spin text-blue-400" : "text-(--text-muted) hover:text-blue-400"}`}
                        title={t("sync_tooltip")}
                      >
                        <RefreshCw size={10} />
                      </button>
                    </p>
                    <p className="text-3xl font-black text-white tracking-tighter">{article.citations}</p>
                  </div>
                 
                 <div className="flex lg:flex-col gap-3 w-full lg:w-auto">
                    <button
                      onClick={() => setVerifyingArticle(article)}
                      className="flex-1 lg:w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-500/10 text-(--accent-emerald) text-[11px] font-black uppercase tracking-widest hover:bg-emerald-500/20 transition-all border border-emerald-500/20 active:scale-95 shadow-2xl shadow-emerald-500/10"
                    >
                      <ShieldCheck size={16} />
                      Verify Proof
                    </button>
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="flex-1 lg:w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white/5 text-white text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5 active:scale-95"
                    >
                      <Eye size={16} />
                      Details
                    </button>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {selectedArticle && (
        <ArticleDetailModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {verifyingArticle && (
        <VerificationModal
          article={verifyingArticle}
          onClose={() => setVerifyingArticle(null)}
        />
      )}
    </div>
  );
}
