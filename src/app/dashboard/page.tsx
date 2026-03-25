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
  Wallet,
  Star,
  Zap,
} from "lucide-react";
import { userProfile } from "@/lib/mock-data";
import type { AcademicToken } from "@/lib/mock-data";

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  BarChart3,
  FileText,
  ShieldCheck,
  Share2,
  GitBranch,
};

const rarityColors: Record<string, { bg: string; border: string; text: string; label: string }> = {
  legendary: {
    bg: "rgba(245, 158, 11, 0.08)",
    border: "rgba(245, 158, 11, 0.25)",
    text: "#fbbf24",
    label: "Efsanevi",
  },
  epic: {
    bg: "rgba(139, 92, 246, 0.08)",
    border: "rgba(139, 92, 246, 0.25)",
    text: "#a78bfa",
    label: "Destansı",
  },
  rare: {
    bg: "rgba(59, 130, 246, 0.08)",
    border: "rgba(59, 130, 246, 0.25)",
    text: "#60a5fa",
    label: "Nadir",
  },
  common: {
    bg: "rgba(107, 114, 128, 0.08)",
    border: "rgba(107, 114, 128, 0.25)",
    text: "#9ca3af",
    label: "Yaygın",
  },
};

const activityIcons: Record<string, React.ElementType> = {
  article_review: BookOpen,
  data_share: Share2,
  citation_verify: GitBranch,
  peer_review: ShieldCheck,
  token_earned: Award,
};

function ReputationRadar() {
  const metrics = userProfile.reputation;
  const cx = 140;
  const cy = 140;
  const maxR = 110;
  const levels = 5;
  const n = metrics.length;

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    const r = (value / 100) * maxR;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const polygonPoints = (radius: number) =>
    Array.from({ length: n }, (_, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      return `${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`;
    }).join(" ");

  const dataPoints = metrics.map((m, i) => getPoint(i, m.value));
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg viewBox="0 0 280 280" className="w-full max-w-[280px] mx-auto">
      {/* Grid */}
      {Array.from({ length: levels }, (_, i) => (
        <polygon
          key={i}
          points={polygonPoints(((i + 1) / levels) * maxR)}
          className="radar-bg"
          fill="none"
        />
      ))}
      {/* Axis lines */}
      {metrics.map((_, i) => {
        const p = getPoint(i, 100);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="rgba(59, 130, 246, 0.1)"
            strokeWidth="1"
          />
        );
      })}
      {/* Data shape */}
      <polygon points={dataPolygon} className="radar-shape" />
      {/* Data dots */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" className="radar-dot" />
      ))}
      {/* Labels */}
      {metrics.map((m, i) => {
        const lp = getPoint(i, 125);
        return (
          <text
            key={i}
            x={lp.x}
            y={lp.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--text-secondary)"
            fontSize="9"
            fontWeight="500"
          >
            {m.label}
          </text>
        );
      })}
    </svg>
  );
}

function TokenCard({ token }: { token: AcademicToken }) {
  const IconComp = iconMap[token.icon] || Award;
  const rarity = rarityColors[token.rarity];

  return (
    <div
      className={`nft-card glass-card p-5 rarity-${token.rarity}`}
      style={{ borderColor: rarity.border }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: rarity.bg, border: `1px solid ${rarity.border}` }}
        >
          <IconComp size={20} style={{ color: rarity.text }} />
        </div>
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
          style={{
            background: rarity.bg,
            color: rarity.text,
            border: `1px solid ${rarity.border}`,
          }}
        >
          {rarity.label}
        </span>
      </div>
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
        {token.title}
      </h3>
      <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed">
        {token.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="hash-display text-[10px]">{token.txHash}</span>
        <span className="text-[10px] text-[var(--text-muted)]">{token.earnedDate}</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Academic Wallet
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Akademik kimliğiniz ve blockchain tabanlı öğrenme kanıtlarınız
        </p>
      </div>

      {/* Profile Card */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold"
               style={{ background: "var(--gradient-blue)" }}>
            {userProfile.name.split(" ").slice(-1)[0][0]}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              {userProfile.name}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">
              {userProfile.title}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              {userProfile.institution}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Wallet size={13} className="text-[var(--accent-cyan)]" />
              <span className="hash-display">{userProfile.walletAddress}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-6 mt-4 md:mt-0 sm:justify-center md:justify-start">
            <div className="text-center">
              <p className="text-2xl font-bold gradient-text">{userProfile.totalPublications}</p>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">
                Yayın
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold gradient-text">{userProfile.totalCitations}</p>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">
                Atıf
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold gradient-text">{userProfile.hIndex}</p>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">
                h-index
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats + Reputation */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Reputation Graph */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-[var(--accent-blue)]" />
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Scientific Reputation Graph
            </h3>
          </div>
          <ReputationRadar />
          <div className="mt-4 grid grid-cols-2 gap-2">
            {userProfile.reputation.map((m) => (
              <div key={m.label} className="flex items-center justify-between text-xs px-2">
                <span className="text-[var(--text-secondary)]">{m.label}</span>
                <span className="font-mono font-semibold text-[var(--accent-blue)]">
                  {m.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-3 glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} className="text-[var(--accent-purple)]" />
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Son Aktiviteler
            </h3>
          </div>
          <div className="relative pl-8 space-y-4">
            <div className="timeline-line" />
            {userProfile.recentActivities.map((activity, idx) => {
              const ActIcon = activityIcons[activity.type] || Zap;
              return (
                <div
                  key={activity.id}
                  className="relative animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="absolute -left-8 top-1 w-[30px] h-[30px] rounded-full bg-[var(--bg-card)] border-2 border-[var(--accent-blue)] flex items-center justify-center z-10">
                    <ActIcon size={12} className="text-[var(--accent-blue)]" />
                  </div>
                  <div className="glass-card p-3 ml-2">
                    <p className="text-sm text-[var(--text-primary)]">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] text-[var(--text-muted)]">
                        {activity.date}
                      </span>
                      <span className="hash-display text-[10px]">
                        {activity.txHash}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Academic NFT Gallery */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Star size={16} className="text-[var(--accent-amber)]" />
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Akademik NFT / Token Galerisi
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userProfile.tokens.map((token) => (
            <TokenCard key={token.id} token={token} />
          ))}
        </div>
      </div>
    </div>
  );
}
