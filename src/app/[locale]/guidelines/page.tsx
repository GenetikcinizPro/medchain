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
  Search,
  BookOpen,
  Zap,
  GraduationCap,
} from "lucide-react";
import { guidelines } from "@/lib/mock-data";
import type { Guideline, ChangeLogEntry } from "@/lib/mock-data";
import { useTranslations } from "next-intl";

function GuidelineCard({ guideline }: { guideline: Guideline }) {
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations("Guidelines");
  
  const orgColors: Record<string, { bg: string; color: string; border: string }> = {
    WHO: { bg: "rgba(59, 130, 246, 0.08)", color: "#3b82f6", border: "rgba(59, 130, 246, 0.2)" },
    ESC: { bg: "rgba(239, 68, 68, 0.08)", color: "#ef4444", border: "rgba(239, 68, 68, 0.2)" },
    CDC: { bg: "rgba(16, 185, 129, 0.08)", color: "#10b981", border: "rgba(16, 185, 129, 0.2)" },
    NICE: { bg: "rgba(139, 92, 246, 0.08)", color: "#8b5cf6", border: "rgba(139, 92, 246, 0.2)" },
  };

  const orgStyle = orgColors[guideline.organization] || orgColors.WHO;

  return (
    <div className="glass-card overflow-hidden group hover:border-(--accent-blue) transition-all">
      {/* Header */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
            style={{ background: orgStyle.bg, border: `1px solid ${orgStyle.border}` }}
          >
            <Building2 size={28} style={{ color: orgStyle.color }} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg"
                style={{ background: orgStyle.bg, color: orgStyle.color, border: `1px solid ${orgStyle.border}` }}
              >
                {guideline.organization}
              </span>
              <span className={`badge ${guideline.status === "active" ? "badge-verified" : "badge-updated"}`}>
                {guideline.status === "active" ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
                {t(`status.${guideline.status === "under-review" ? "under_review" : "active"}`)}
              </span>
              <span className="badge border-(--accent-emerald)/20 bg-(--accent-emerald)/5 text-(--accent-emerald)">
                <ShieldCheck size={11} /> {t("labels.immutable_record")}
              </span>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-4">
              {guideline.name}
            </h3>

            <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-(--text-muted)">
              <div className="flex items-center gap-2">
                <Layers size={14} className="text-(--accent-blue)" />
                <span>v{guideline.currentVersion}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{guideline.lastUpdated}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={14} />
                <span>{guideline.evidenceSources} Evidence Sources</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-3 shrink-0 w-full lg:w-48 pt-6 lg:pt-0 border-t border-(--border-color) lg:border-t-0 mt-2 lg:mt-0">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/5">
              <Hash size={11} className="text-(--accent-cyan)" />
              <span className="hash-display text-[9px] opacity-70">{guideline.hash.slice(0, 24)}...</span>
            </div>
            
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-(--bg-secondary) border border-(--border-color) text-xs font-bold hover:bg-(--bg-card-hover) hover:border-(--accent-blue) transition-all"
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {t("change_log.title")}
            </button>
          </div>
        </div>
      </div>

      {/* Change Log Timeline */}
      {expanded && (
        <div className="border-t border-(--border-color) bg-white/2 p-6 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
               <RefreshCw size={18} className="text-(--accent-blue)" />
               <h4 className="text-sm font-black uppercase tracking-widest text-foreground">
                 Evolution History
               </h4>
            </div>
            <span className="text-[10px] font-bold text-(--text-muted)">{guideline.changeLogs.length} REVISIONS</span>
          </div>

          <div className="relative pl-6 space-y-8">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-transparent" />
            
            {guideline.changeLogs.map((log: ChangeLogEntry, idx: number) => (
              <div key={idx} className="relative group/log">
                <div className="absolute -left-[24px] top-1.5 w-3 h-3 rounded-full bg-(--bg-card) border-2 border-blue-500 z-10 transition-transform group-hover/log:scale-125 shadow-sm" />
                
                <div className="glass-card p-5 hover:bg-white/5 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-(--accent-blue)">v{log.version}</span>
                      <span className="text-[10px] font-bold text-(--text-muted) uppercase tracking-tighter">— {log.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] font-mono opacity-40 group-hover/log:opacity-100 transition-opacity">{log.hash}</span>
                       <ShieldCheck size={12} className="text-emerald-500 opacity-60" />
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {log.changes.map((change, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-3">
                        <ArrowRight size={14} className="text-(--accent-blue) mt-0.5 shrink-0 opacity-40" />
                        <span className="text-sm text-(--text-secondary) leading-relaxed">
                          {change}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] font-bold text-(--text-muted)">
                     <GraduationCap size={12} />
                     Verified by {log.author}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
               <ShieldCheck size={20} className="text-emerald-500" />
               <p className="text-xs font-bold text-foreground">
                 {t("change_log.footer")}
               </p>
            </div>
            <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline">Verify Integrity</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GuidelinesPage() {
  const t = useTranslations("Guidelines");
  
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {t("title")}
          </h1>
          <p className="text-sm text-(--text-muted) mt-1">
            {t("subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-3">
           <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)" />
              <input type="text" placeholder="Search guidelines..." className="bg-(--bg-secondary) border border-(--border-color) rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-(--accent-blue) w-64 shadow-sm" />
           </div>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: t("stats.total_guidelines"), value: guidelines.length, icon: FileText, color: "#3b82f6" },
          { label: t("stats.active"), value: guidelines.filter((g) => g.status === "active").length, icon: CheckCircle2, color: "#10b981" },
          { label: t("stats.under_review"), value: guidelines.filter((g) => g.status === "under-review").length, icon: AlertCircle, color: "#f59e0b" },
          {
            label: t("stats.total_evidence"),
            value: guidelines.reduce((sum, g) => sum + g.evidenceSources, 0),
            icon: Layers,
            color: "#8b5cf6",
          },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-6 flex flex-col gap-4 group hover:border-(--accent-blue)/30 transition-all">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
              style={{ background: `${stat.color}15`, color: stat.color, border: `1px solid ${stat.color}22` }}
            >
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-2xl font-black text-foreground tracking-tight">
                {stat.value}
              </p>
              <p className="text-[10px] text-(--text-muted) font-bold uppercase tracking-widest mt-1">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Warning/Info Box */}
      <div className="glass-card p-6 border-amber-500/20 bg-amber-500/5 flex items-start gap-4">
         <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
            <Zap size={20} />
         </div>
         <div>
            <h4 className="text-sm font-bold text-foreground mb-1">Live Consensus Protocol</h4>
            <p className="text-xs text-(--text-muted) leading-relaxed">
              Guidelines displayed here are synchronizing in real-time with the World Health Organization and European Society of Cardiology nodes. Retracted evidence sources trigger automatic versioning alerts for medical practitioners.
            </p>
         </div>
      </div>

      {/* Guidelines Grid */}
      <div className="grid grid-cols-1 gap-6">
        {guidelines.map((guideline) => (
          <GuidelineCard key={guideline.id} guideline={guideline} />
        ))}
      </div>
    </div>
  );
}
