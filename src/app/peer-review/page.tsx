"use client";

import { useState } from "react";
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Clock,
  Hash,
  Building2,
  ChevronDown,
  ChevronUp,
  FileText,
  Star,
  Timer,
} from "lucide-react";
import { articles } from "@/lib/mock-data";
import type { Article, PeerReview } from "@/lib/mock-data";

const verdictConfig: Record<
  string,
  { icon: React.ElementType; color: string; bg: string; label: string }
> = {
  Accept: {
    icon: CheckCircle2,
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.12)",
    label: "Kabul",
  },
  "Minor Revision": {
    icon: RefreshCw,
    color: "#3b82f6",
    bg: "rgba(59, 130, 246, 0.12)",
    label: "Küçük Revizyon",
  },
  "Major Revision": {
    icon: AlertTriangle,
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.12)",
    label: "Büyük Revizyon",
  },
  Reject: {
    icon: XCircle,
    color: "#ef4444",
    bg: "rgba(239, 68, 68, 0.12)",
    label: "Ret",
  },
};

function ReviewCard({ review }: { review: PeerReview }) {
  const verdict = verdictConfig[review.verdict];
  const VerdictIcon = verdict.icon;

  return (
    <div className="glass-card p-4">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        {/* Reviewer Info */}
        <div className="flex items-start gap-3 flex-1">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
            style={{ background: verdict.bg, color: verdict.color }}
          >
            {review.reviewer
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">
              {review.reviewer}
            </h4>
            <div className="flex items-center gap-1 mt-0.5">
              <Building2 size={11} className="text-[var(--text-muted)]" />
              <span className="text-xs text-[var(--text-secondary)]">
                {review.institution}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
              {review.summary}
            </p>
          </div>
        </div>

        {/* Verdict & Meta */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: verdict.bg, color: verdict.color }}
          >
            <VerdictIcon size={13} />
            {verdict.label}
          </span>
          <div className="flex items-center gap-1">
            <Clock size={11} className="text-[var(--text-muted)]" />
            <span className="text-[10px] text-[var(--text-muted)]">
              {new Date(review.timestamp).toLocaleString("tr-TR", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>
          <span className="hash-display text-[9px]">{review.txHash}</span>
          <div className="flex items-center gap-1 verified-pulse px-2 py-0.5 rounded-full">
            <ShieldCheck size={11} className="text-[var(--accent-emerald)]" />
            <span className="text-[9px] text-[var(--accent-emerald)] font-medium">
              Doğrulanmış
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArticleReviewPanel({ article }: { article: Article }) {
  const [expanded, setExpanded] = useState(false);
  const reviewCount = article.peerReviews.length;

  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 hover:bg-[rgba(59,130,246,0.02)] transition"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1 min-w-0">
            <h3
              className={`text-[14px] font-semibold ${
                article.status === "retracted"
                  ? "text-[var(--accent-red)] line-through decoration-1"
                  : "text-[var(--text-primary)]"
              }`}
            >
              {article.title}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              {article.authors.join(", ")} • {article.year} • {article.journal}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.15)]">
              <Users size={13} className="text-[var(--accent-purple)]" />
              <span className="text-xs font-semibold text-[var(--accent-purple)]">
                {reviewCount} Hakem
              </span>
            </div>
            {expanded ? (
              <ChevronUp size={16} className="text-[var(--text-muted)]" />
            ) : (
              <ChevronDown size={16} className="text-[var(--text-muted)]" />
            )}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-[var(--border-color)] p-5 space-y-3 bg-[rgba(139,92,246,0.02)]">
          {/* Transparency Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center">
              <p className="text-lg font-bold text-[var(--accent-purple)]">
                {reviewCount}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                Toplam Hakem
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center">
              <p className="text-lg font-bold text-[var(--accent-blue)]">
                {article.peerReviews.filter((r) => r.verdict === "Accept").length}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                Kabul
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center">
              <p className="text-lg font-bold text-[var(--accent-emerald)]">
                {article.peerReviews.length > 0 ? "Şeffaf" : "—"}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                Süreç
              </p>
            </div>
          </div>

          {/* Review Cards */}
          {article.peerReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}

          {/* Blockchain footer */}
          <div className="p-3 rounded-lg bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.15)] flex items-center gap-2">
            <ShieldCheck size={14} className="text-[var(--accent-emerald)]" />
            <p className="text-[11px] text-[var(--accent-emerald)]">
              Tüm hakem değerlendirmeleri blockchain üzerinde şeffaf ve değiştirilemez şekilde kayıtlıdır
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PeerReviewPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Şeffaf Hakemlik Paneli
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Transparent Peer Review — Doğrulanabilir ve manipülasyona kapalı hakem süreçleri
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Toplam Makale",
            value: articles.length,
            icon: FileText,
            color: "#3b82f6",
          },
          {
            label: "Toplam Hakem",
            value: articles.reduce((sum, a) => sum + a.peerReviews.length, 0),
            icon: Users,
            color: "#8b5cf6",
          },
          {
            label: "Kabul Oranı",
            value: `${Math.round(
              (articles
                .flatMap((a) => a.peerReviews)
                .filter((r) => r.verdict === "Accept").length /
                articles.flatMap((a) => a.peerReviews).length) *
                100
            )}%`,
            icon: Star,
            color: "#10b981",
          },
          {
            label: "Şeffaf Süreç",
            value: "100%",
            icon: ShieldCheck,
            color: "#06b6d4",
          },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${stat.color}15` }}
            >
              <stat.icon size={18} style={{ color: stat.color }} />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--text-primary)]">
                {stat.value}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="glass-card p-4 border-[rgba(139,92,246,0.2)]">
        <div className="flex items-start gap-3">
          <ShieldCheck size={16} className="text-[var(--accent-purple)] mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
              Şeffaf Hakemlik Nasıl Çalışır?
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Her hakem değerlendirmesi blockchain üzerinde kaydedilir. Hakemlerin kimlikleri,
              kurumları ve inceleme zaman damgaları şeffafça görülebilir. Bu sayede sahte peer review
              ve citation farming gibi manipülasyonlar engellenmiş olur.
            </p>
          </div>
        </div>
      </div>

      {/* Article Review Panels */}
      <div className="space-y-3">
        {articles.map((article) => (
          <ArticleReviewPanel key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
