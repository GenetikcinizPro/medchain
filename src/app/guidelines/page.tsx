"use client";

import { useState } from "react";
import {
  FileText,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Clock,
  Hash,
  Building2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Layers,
  ArrowRight,
} from "lucide-react";
import { guidelines } from "@/lib/mock-data";
import type { Guideline, ChangeLogEntry } from "@/lib/mock-data";

const orgColors: Record<string, { bg: string; color: string }> = {
  WHO: { bg: "rgba(59, 130, 246, 0.12)", color: "#60a5fa" },
  ESC: { bg: "rgba(239, 68, 68, 0.12)", color: "#f87171" },
  CDC: { bg: "rgba(16, 185, 129, 0.12)", color: "#34d399" },
  NICE: { bg: "rgba(139, 92, 246, 0.12)", color: "#a78bfa" },
};

function GuidelineCard({ guideline }: { guideline: Guideline }) {
  const [expanded, setExpanded] = useState(false);
  const orgStyle = orgColors[guideline.organization] || orgColors.WHO;

  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div className="p-5">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: orgStyle.bg }}
          >
            <Building2 size={22} style={{ color: orgStyle.color }} />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{ background: orgStyle.bg, color: orgStyle.color }}
              >
                {guideline.organization}
              </span>
              <span className={`badge badge-${guideline.status === "under-review" ? "under-review" : "active"}`}>
                {guideline.status === "active" ? (
                  <>
                    <CheckCircle2 size={10} /> Aktif
                  </>
                ) : (
                  <>
                    <AlertCircle size={10} /> İncelemede
                  </>
                )}
              </span>
              <span className="badge badge-verified">
                <ShieldCheck size={10} /> Immutable Kayıt
              </span>
            </div>
            <h3 className="text-[15px] font-semibold text-[var(--text-primary)] mt-1">
              {guideline.name}
            </h3>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-[var(--text-secondary)]">
              <span className="flex items-center gap-1">
                <Layers size={12} />
                Versiyon: <strong className="text-[var(--text-primary)]">v{guideline.currentVersion}</strong>
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                Son Güncelleme: <strong className="text-[var(--text-primary)]">{guideline.lastUpdated}</strong>
              </span>
              <span className="flex items-center gap-1">
                <FileText size={12} />
                Kanıt Kaynağı: <strong className="text-[var(--text-primary)]">{guideline.evidenceSources}</strong>
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:items-end gap-2 shrink-0 w-full md:w-auto pt-4 md:pt-0 border-t border-[var(--border-color)] md:border-t-0 mt-3 md:mt-0">
            <div className="flex items-center gap-1">
              <Hash size={12} className="text-[var(--accent-cyan)]" />
              <span className="hash-display text-[10px]">{guideline.hash}</span>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(59,130,246,0.1)] text-[var(--accent-blue)] text-xs font-medium hover:bg-[rgba(59,130,246,0.2)] transition"
            >
              {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              Change Log
            </button>
          </div>
        </div>
      </div>

      {/* Change Log */}
      {expanded && (
        <div className="border-t border-[var(--border-color)] bg-[rgba(59,130,246,0.02)] p-5">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCw size={14} className="text-[var(--accent-blue)]" />
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">
              Değişiklik Günlüğü
            </h4>
          </div>
          <div className="space-y-4">
            {guideline.changeLogs.map((log: ChangeLogEntry, idx: number) => (
              <div key={idx} className="glass-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[var(--accent-blue)]">
                      v{log.version}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {log.date}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      — {log.author}
                    </span>
                  </div>
                  <span className="hash-display text-[9px]">{log.hash}</span>
                </div>
                <ul className="space-y-1.5">
                  {log.changes.map((change, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2">
                      <ArrowRight
                        size={12}
                        className="text-[var(--accent-emerald)] mt-0.5 shrink-0"
                      />
                      <span className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {change}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.15)] flex items-center gap-2">
            <ShieldCheck size={14} className="text-[var(--accent-emerald)]" />
            <p className="text-[11px] text-[var(--accent-emerald)]">
              Tüm güncelleme kayıtları değiştirilemez şekilde blockchain üzerinde korunmaktadır
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GuidelinesPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Yaşayan Rehberler
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Living Guidelines — Klinik kılavuzların değiştirilemez güncel versiyonları
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Toplam Kılavuz", value: guidelines.length, icon: FileText, color: "#3b82f6" },
          { label: "Aktif", value: guidelines.filter((g) => g.status === "active").length, icon: CheckCircle2, color: "#10b981" },
          { label: "İncelemede", value: guidelines.filter((g) => g.status === "under-review").length, icon: AlertCircle, color: "#f59e0b" },
          {
            label: "Toplam Kanıt",
            value: guidelines.reduce((sum, g) => sum + g.evidenceSources, 0),
            icon: Layers,
            color: "#8b5cf6",
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

      {/* Guidelines List */}
      <div className="space-y-4">
        {guidelines.map((guideline) => (
          <GuidelineCard key={guideline.id} guideline={guideline} />
        ))}
      </div>
    </div>
  );
}
