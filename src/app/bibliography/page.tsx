"use client";

import { useState } from "react";
import {
  Search,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  History,
  X,
  Hash,
  Calendar,
  Users,
  FileWarning,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { articles } from "@/lib/mock-data";
import type { Article, VersionEntry } from "@/lib/mock-data";

function StatusBadge({ status }: { status: Article["status"] }) {
  const config = {
    verified: { class: "badge-verified", icon: CheckCircle2, label: "Doğrulanmış" },
    retracted: { class: "badge-retracted", icon: FileWarning, label: "Geri Çekilmiş" },
    updated: { class: "badge-updated", icon: RefreshCw, label: "Güncellendi" },
  };
  const c = config[status];
  return (
    <span className={`badge ${c.class}`}>
      <c.icon size={11} />
      {c.label}
    </span>
  );
}

function VersionHistoryModal({
  article,
  onClose,
}: {
  article: Article;
  onClose: () => void;
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
          <div>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">
              Değişiklik Günlüğü
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Eski versiyonlar silinmez — tüm geçmiş blockchain&apos;de korunur
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center hover:bg-[var(--bg-card-hover)] transition"
          >
            <X size={16} className="text-[var(--text-secondary)]" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          {article.versions.map((v: VersionEntry, idx: number) => (
            <div
              key={idx}
              className={`glass-card p-4 ${
                v.version === "RETRACTED"
                  ? "border-[rgba(239,68,68,0.3)]"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {v.version === "RETRACTED" ? (
                    <span className="badge badge-retracted">
                      <AlertTriangle size={10} /> RETRACTED
                    </span>
                  ) : (
                    <span className="text-xs font-mono font-semibold text-[var(--accent-blue)]">
                      v{v.version}
                    </span>
                  )}
                  <span className="text-[10px] text-[var(--text-muted)]">
                    {v.date}
                  </span>
                </div>
                <span className="hash-display text-[10px]">{v.hash}</span>
              </div>
              <p className="text-sm text-[var(--text-primary)]">{v.change}</p>
              <p className="text-[11px] text-[var(--text-muted)] mt-1">
                Yazar: {v.author}
              </p>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-[var(--border-color)] bg-[rgba(16,185,129,0.04)]">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-[var(--accent-emerald)]" />
            <p className="text-[11px] text-[var(--accent-emerald)]">
              Tüm versiyonlar değiştirilemez şekilde blockchain üzerinde saklanmaktadır
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BibliographyPage() {
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = articles.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.authors.some((au) => au.toLowerCase().includes(search.toLowerCase())) ||
      a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Bibliyografi & Arama
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Değiştirilemez Literatür Kaydı — Immutable Literature Record
        </p>
      </div>

      {/* Search & Filters */}
      <div className="glass-card p-4 flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type="text"
            placeholder="Makale, yazar veya konu ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] transition"
          />
        </div>
        <div className="flex gap-2">
          {["all", "verified", "updated", "retracted"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                statusFilter === s
                  ? "bg-[rgba(59,130,246,0.15)] text-[var(--accent-blue)] border border-[rgba(59,130,246,0.3)]"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-blue)]"
              }`}
            >
              {s === "all" ? "Tümü" : s === "verified" ? "Doğrulanmış" : s === "updated" ? "Güncellenen" : "Geri Çekilmiş"}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <p className="text-xs text-[var(--text-muted)]">
        {filtered.length} makale bulundu
      </p>

      {/* Article List */}
      <div className="space-y-3">
        {filtered.map((article) => (
          <div
            key={article.id}
            className={`glass-card p-5 ${
              article.status === "retracted"
                ? "border-[rgba(239,68,68,0.2)]"
                : ""
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-2 mb-2">
                  <StatusBadge status={article.status} />
                  {article.versions.length > 1 && (
                    <span className="badge badge-updated">
                      <RefreshCw size={10} />
                      v{article.versions[article.versions.length - 1].version}
                    </span>
                  )}
                </div>
                <h3
                  className={`text-[15px] font-semibold mb-1.5 ${
                    article.status === "retracted"
                      ? "text-[var(--accent-red)] line-through decoration-1"
                      : "text-[var(--text-primary)]"
                  }`}
                >
                  {article.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-secondary)] mb-2">
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {article.authors.join(", ")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {article.year}
                  </span>
                  <span className="text-[var(--text-muted)]">
                    {article.journal}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] line-clamp-2">
                  {article.abstract}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(59,130,246,0.08)] text-[var(--accent-blue)] border border-[rgba(59,130,246,0.15)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right side - Hash & Actions */}
              <div className="flex flex-col sm:items-end gap-2 shrink-0 w-full lg:w-auto mt-4 lg:mt-0 pt-4 lg:pt-0 border-t border-[var(--border-color)] lg:border-t-0">
                <div className="flex items-center gap-1.5">
                  <Hash size={12} className="text-[var(--accent-cyan)]" />
                  <span className="hash-display text-[10px]">{article.hash}</span>
                </div>
                <div className="text-xs text-[var(--text-muted)]">
                  Atıf: <span className="font-semibold text-[var(--text-secondary)]">{article.citations}</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(59,130,246,0.1)] text-[var(--accent-blue)] text-xs font-medium hover:bg-[rgba(59,130,246,0.2)] transition"
                >
                  <History size={13} />
                  Versiyon Geçmişi
                </button>
                <div className="flex items-center gap-1 mt-1 verified-pulse px-2 py-1 rounded-full">
                  <ShieldCheck size={12} className="text-[var(--accent-emerald)]" />
                  <span className="text-[10px] text-[var(--accent-emerald)] font-medium">
                    Blockchain Doğrulaması
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Version History Modal */}
      {selectedArticle && (
        <VersionHistoryModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}
