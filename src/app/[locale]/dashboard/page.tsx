"use client";

import {
  BookOpen,
  BarChart3,
  FileText,
  ShieldCheck,
  Share2,
  GitBranch,
  Award,
  TrendingUp,
  Clock,
  Star,
  Zap,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { userProfile as initialUserProfile } from "@/lib/mock-data";
import { ApiServices } from "@/lib/api-services";
import { useState } from "react";
import type { AcademicToken } from "@/lib/mock-data";
import { useTranslations } from "next-intl";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  BarChart3,
  FileText,
  ShieldCheck,
  Share2,
  GitBranch,
};

const activityIcons: Record<string, React.ElementType> = {
  article_review: BookOpen,
  data_share: Share2,
  citation_verify: GitBranch,
  peer_review: ShieldCheck,
  token_earned: Award,
};

function TokenCard({ token }: { token: AcademicToken }) {
  const IconComp = iconMap[token.icon] || Award;
  const t = useTranslations("Dashboard");
  
  const rarityColors: Record<string, { bg: string; border: string; borderHover: string; text: string; shadow: string }> = {
    legendary: { bg: "rgba(245, 158, 11, 0.05)", border: "rgba(245, 158, 11, 0.2)", borderHover: "rgba(245, 158, 11, 0.5)", text: "#fbbf24", shadow: "0 0 20px rgba(245, 158, 11, 0.1)" },
    epic: { bg: "rgba(139, 92, 246, 0.05)", border: "rgba(139, 92, 246, 0.2)", borderHover: "rgba(139, 92, 246, 0.5)", text: "#a78bfa", shadow: "0 0 20px rgba(139, 92, 246, 0.1)" },
    rare: { bg: "rgba(59, 130, 246, 0.05)", border: "rgba(59, 130, 246, 0.2)", borderHover: "rgba(59, 130, 246, 0.5)", text: "#60a5fa", shadow: "0 0 20px rgba(59, 130, 246, 0.1)" },
    common: { bg: "rgba(107, 114, 128, 0.05)", border: "rgba(107, 114, 128, 0.2)", borderHover: "rgba(107, 114, 128, 0.5)", text: "#9ca3af", shadow: "none" },
  };

  const rarity = rarityColors[token.rarity];

  return (
    <div
      className={`group relative glass-card p-5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden`}
      style={{ 
        borderColor: rarity.border,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner"
          style={{ background: rarity.bg, border: `1px solid ${rarity.border}` }}
        >
          <IconComp size={24} style={{ color: rarity.text }} />
        </div>
        <span
          className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md"
          style={{
            background: rarity.bg,
            color: rarity.text,
            border: `1px solid ${rarity.border}`,
          }}
        >
          {t(`rarity.${token.rarity}`)}
        </span>
      </div>
      <h3 className="text-[15px] font-bold text-foreground mb-1 group-hover:text-(--accent-blue) transition-colors relative z-10">
        {token.title}
      </h3>
      <p className="text-xs text-(--text-muted) mb-4 leading-relaxed line-clamp-2 relative z-10">
        {token.description}
      </p>
      <div className="flex items-center justify-between pt-3 border-t border-(--border-color) relative z-10">
        <span className="hash-display text-[9px] opacity-40 group-hover:opacity-100 transition-opacity">{token.txHash}</span>
        <ArrowUpRight size={14} className="text-(--text-muted) group-hover:text-(--accent-blue) transform translate-x-1 group-hover:translate-x-0 transition-all opacity-0 group-hover:opacity-100" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const t = useTranslations("Dashboard");
  const commonT = useTranslations("Common");
  const [userProfile] = useState(initialUserProfile);
  const [isSyncing, setIsSyncing] = useState(false);
  const [orcidId, setOrcidId] = useState("");
  const [isOrcidLinked, setIsOrcidLinked] = useState(false);

  const handleOrcidLink = async () => {
    const id = prompt("Enter your ORCID iD (e.g., 0000-0002-1825-0097):");
    if (!id) return;

    setIsSyncing(true);
    setOrcidId(id);
    
    // Simulate API delay and initial fetch
    const works = await ApiServices.fetchORCIDWorks(id);
    
    if (works.length > 0) {
      setIsOrcidLinked(true);
      // In a real app, we would update the user record in the DB here
    }
    setIsSyncing(false);
  };

  const chartData = userProfile.reputation.map(m => {
    const labelKey = m.label.toLowerCase().replace(/\s+/g, '_');
    return {
      subject: t(`metrics.${labelKey}`),
      A: m.value,
      fullMark: 100,
    };
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {t("title")}
          </h1>
          <p className="text-sm text-(--text-muted) mt-1">
            {t("subtitle")}
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleOrcidLink}
            disabled={isSyncing}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all active:scale-95 text-sm font-bold ${
              isOrcidLinked 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" 
                : "bg-white/5 border-white/10 text-white hover:bg-white/10"
            }`}
          >
            <Zap size={18} className={isSyncing ? "animate-pulse" : ""} />
            {isSyncing ? commonT("syncing") : isOrcidLinked ? commonT("orcid_synced") : commonT("orcid_link")}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-(--accent-blue) text-white text-sm font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all active:scale-95">
            <Plus size={18} />
            Submit New Article
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: t("stats.publications"), value: userProfile.totalPublications, icon: BookOpen, color: "#3b82f6" },
          { label: t("stats.citations"), value: userProfile.totalCitations, icon: GitBranch, color: "#10b981" },
          { label: t("stats.h_index"), value: userProfile.hIndex, icon: TrendingUp, color: "#8b5cf6" },
        ].map((stat, idx) => (
          <div key={idx} className="glass-premium p-6 rounded-3xl flex items-center gap-5 group hover:border-(--accent-blue)/30 transition-all shadow-2xl">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-2xl" 
                 style={{ background: `${stat.color}20`, color: stat.color, border: `1px solid ${stat.color}40` }}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-foreground tracking-tight">{stat.value}</p>
              <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-widest mt-0.5">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Reputation Radar - RECHARTS */}
        <div className="lg:col-span-2 glass-card p-6 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-(--accent-blue)" />
              <h3 className="text-[15px] font-bold text-foreground">
                {t("reputation_graph")}
              </h3>
            </div>
            <span className="text-[10px] font-bold text-(--accent-blue) bg-(--accent-blue)/10 px-2 py-1 rounded-lg">
              REAL-TIME SYNC
            </span>
          </div>
          
          <div className="flex-1 min-h-[280px] relative">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-full blur-3xl" />
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" gridType="circle" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontWeight: 600, letterSpacing: '0.5px' }}
                />
                <Radar
                  name={t("reputation_graph")}
                  dataKey="A"
                  stroke="var(--accent-blue)"
                  strokeWidth={3}
                  fill="url(#radarGradient)"
                  fillOpacity={0.6}
                  animationBegin={200}
                  animationDuration={1500}
                />
                <defs>
                  <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="var(--accent-emerald)" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 17, 40, 0.9)', 
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    fontSize: '11px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                  }} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {userProfile.reputation.map((m) => {
              const labelKey = m.label.toLowerCase().replace(/\s+/g, '_');
              return (
                <div key={m.label} className="flex flex-col gap-1 px-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-(--text-muted)">{t(`metrics.${labelKey}`)}</span>
                    <span className="font-bold text-foreground">{m.value}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${m.value}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="lg:col-span-3 glass-card p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-(--accent-purple)" />
              <h3 className="text-[15px] font-bold text-foreground">
                {t("recent_activity")}
              </h3>
            </div>
            <button className="text-[11px] font-semibold text-(--accent-blue) hover:underline">
              View All History
            </button>
          </div>

          <div className="relative pl-3 space-y-6">
            <div className="absolute left-[31px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent" />
            
            {userProfile.recentActivities.map((activity, idx) => {
              const ActIcon = activityIcons[activity.type] || Zap;
              return (
                <div
                  key={activity.id}
                  className="relative pl-12 group transition-all"
                >
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-(--bg-card) border border-(--border-color) group-hover:border-(--accent-blue) flex items-center justify-center z-10 transition-colors shadow-sm">
                    <ActIcon size={16} className="text-(--text-muted) group-hover:text-(--accent-blue) transition-colors" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-transparent group-hover:border-white/10 group-hover:bg-white/10 transition-all">
                    <p className="text-sm font-medium text-foreground leading-snug">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5">
                        <Star size={10} className="text-amber-500" />
                        <span className="text-[10px] text-(--text-muted) font-medium">{activity.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck size={10} className="text-emerald-500" />
                        <span className="hash-display text-[10px] tracking-tight">{activity.txHash}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Academic NFT Gallery - GRID UPGRADED */}
      <div>
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-2">
            <Award size={20} className="text-(--accent-amber)" />
            <h3 className="text-xl font-bold text-foreground">
              {t("nft_gallery")}
            </h3>
          </div>
          <p className="text-xs text-(--text-muted) font-medium">
            Total Assets: <span className="text-foreground">{userProfile.tokens.length}</span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProfile.tokens.map((token) => (
            <TokenCard key={token.id} token={token} />
          ))}
        </div>
      </div>
    </div>
  );
}
