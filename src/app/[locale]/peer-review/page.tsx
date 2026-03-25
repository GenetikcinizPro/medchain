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
  Plus,
  ArrowRight,
  GraduationCap,
  Scale,
  X,
  Loader2,
  Zap,
} from "lucide-react";
import { articles } from "@/lib/mock-data";
import type { Article, PeerReview } from "@/lib/mock-data";
import { useTranslations } from "next-intl";

function ReviewCard({ review }: { review: PeerReview }) {
  const t = useTranslations("PeerReview");
  
  const verdictConfig: Record<
    string,
    { icon: React.ElementType; color: string; bg: string; label: string }
  > = {
    Accept: {
      icon: CheckCircle2,
      color: "#10b981",
      bg: "rgba(16, 185, 129, 0.12)",
      label: t("verdicts.Accept"),
    },
    "Minor Revision": {
      icon: RefreshCw,
      color: "#3b82f6",
      bg: "rgba(59, 130, 246, 0.12)",
      label: t("verdicts.Minor Revision"),
    },
    "Major Revision": {
      icon: AlertTriangle,
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.12)",
      label: t("verdicts.Major Revision"),
    },
    Reject: {
      icon: XCircle,
      color: "#ef4444",
      bg: "rgba(239, 68, 68, 0.12)",
      label: t("verdicts.Reject"),
    },
  };

  const verdict = verdictConfig[review.verdict];
  const VerdictIcon = verdict.icon;

  return (
    <div className="glass-card p-5 group hover:border-(--accent-blue) transition-all">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        {/* Reviewer Info */}
        <div className="flex items-start gap-4 flex-1">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-sm font-extrabold shadow-sm transition-transform group-hover:scale-110"
            style={{ background: verdict.bg, color: verdict.color, border: `1px solid ${verdict.color}33` }}
          >
            {review.reviewer
              .split(" ")
              .filter(w => !w.includes("."))
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-[15px] font-bold text-foreground">
                {review.reviewer}
              </h4>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500">VERIFIED EXPERT</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Building2 size={12} className="text-(--text-muted)" />
              <span className="text-xs font-medium text-(--text-secondary)">
                {review.institution}
              </span>
            </div>
            <p className="text-sm text-(--text-primary) mt-3 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5 italic">
              &quot;{review.summary}&quot;
            </p>
          </div>
        </div>

        {/* Verdict & Meta */}
        <div className="flex flex-col md:items-end gap-2.5 shrink-0 pt-2 md:pt-0">
          <span
            className="flex items-center gap-1.5 text-xs font-extrabold px-4 py-1.5 rounded-xl uppercase tracking-wider"
            style={{ background: verdict.bg, color: verdict.color, border: `1px solid ${verdict.color}44` }}
          >
            <VerdictIcon size={14} />
            {verdict.label}
          </span>
          <div className="flex items-center gap-1.5 text-(--text-muted)">
            <Clock size={12} />
            <span className="text-[11px] font-medium">
              {new Date(review.timestamp).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-500/5 border border-emerald-500/10 group-hover:bg-emerald-500/10 transition-colors">
            <ShieldCheck size={12} className="text-(--accent-emerald)" />
            <span className="text-[10px] text-(--accent-emerald) font-bold uppercase tracking-tight">On-Chain Proof</span>
          </div>
          <span className="hash-display text-[9px] opacity-40 group-hover:opacity-80 transition-opacity mt-1">{review.txHash}</span>
        </div>
      </div>
    </div>
  );
}

function JoinReviewerModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setStep(3);
      setSubmitting(false);
    }, 2000);
  };

  return (
    <div className="modal-overlay z-[100]" onClick={onClose}>
      <div className="modal-content max-w-lg p-0 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-(--border-color) flex items-center justify-between bg-blue-500/5">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-(--accent-blue)">
                 <GraduationCap size={20} />
              </div>
              <div>
                 <h3 className="text-lg font-bold text-foreground">Join as Expert Reviewer</h3>
                 <p className="text-[10px] text-(--text-muted) font-bold uppercase tracking-widest">Step {step} of 2</p>
              </div>
           </div>
           <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 transition-colors">
              <X size={20} className="text-(--text-muted)" />
           </button>
        </div>

        <div className="p-8">
           {step === 1 && (
             <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-(--text-muted) uppercase">ORCID iD / Academic Profile</label>
                   <input type="text" placeholder="https://orcid.org/0000-0002-..." className="w-full bg-(--bg-secondary) border border-(--border-color) rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-(--accent-blue) transition-all" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-(--text-muted) uppercase">Field of Expertise</label>
                   <select className="w-full bg-(--bg-secondary) border border-(--border-color) rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-(--accent-blue) transition-all">
                      <option>Cardiology & Vascular Medicine</option>
                      <option>Genetics & Molecular Biology</option>
                      <option>Endocrinology</option>
                      <option>Oncology</option>
                   </select>
                </div>
                <button onClick={() => setStep(2)} className="w-full py-4 rounded-xl bg-(--accent-blue) text-white font-bold text-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                   Continue Application
                </button>
             </div>
           )}

           {step === 2 && (
             <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="p-4 rounded-xl bg-(--bg-secondary) border border-(--border-color) space-y-3">
                   <p className="text-xs text-foreground font-medium leading-relaxed">
                     By joining, you agree to provide <span className="text-(--accent-blue)">Transparent Peer Reviews</span> which will be permanently hashed on the MedChain ledger.
                   </p>
                   <div className="flex items-center gap-2 py-2 border-t border-white/5 mt-2">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      <span className="text-[11px] font-bold text-emerald-500">STAKING REQUIRED: 50 MED</span>
                   </div>
                </div>
                <button 
                  disabled={submitting}
                  onClick={handleSubmit} 
                  className="w-full py-4 rounded-xl bg-(--accent-blue) text-white font-bold text-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-3"
                >
                   {submitting ? <Loader2 size={20} className="animate-spin" /> : "Verify Identity & Stake"}
                </button>
             </div>
           )}

           {step === 3 && (
             <div className="text-center py-6 animate-in zoom-in-95 duration-300">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto mb-6">
                   <CheckCircle2 size={48} />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">Application Submitted</h4>
                <p className="text-sm text-(--text-muted) mb-8">
                  Your credentials are being verified by the Consensus Node. You will receive a notification within 24 hours.
                </p>
                <button onClick={onClose} className="w-full py-3 rounded-xl bg-(--bg-secondary) border border-(--border-color) text-sm font-bold">
                   Return to Dashboard
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}

function ScoreModal({ article, onClose }: { article: Article; onClose: () => void }) {
  const [score, setScore] = useState(8);
  const [verdict, setVerdict] = useState<string>("Accept");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setDone(true);
      setSubmitting(false);
    }, 2000);
  };

  return (
    <div className="modal-overlay z-[100]" onClick={onClose}>
      <div className="modal-content max-w-xl p-0 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-(--border-color) flex items-center justify-between bg-purple-500/5">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-(--accent-purple)">
                 <Scale size={20} />
              </div>
              <div className="min-w-0 pr-4">
                 <h3 className="text-lg font-bold text-foreground truncate">{article.title}</h3>
                 <p className="text-[10px] text-(--text-muted) font-bold uppercase tracking-widest">Official Peer Review Panel</p>
              </div>
           </div>
           <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 transition-colors shrink-0">
              <X size={20} className="text-(--text-muted)" />
           </button>
        </div>

        <div className="p-8">
           {!done ? (
             <div className="space-y-8">
                <div>
                   <label className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-(--text-muted) uppercase">Scientific Rigor Score</span>
                      <span className="text-2xl font-black text-(--accent-blue)">{score}/10</span>
                   </label>
                   <input 
                      type="range" min="1" max="10" step="1" 
                      value={score} onChange={(e) => setScore(parseInt(e.target.value))}
                      className="w-full h-2 bg-(--bg-secondary) rounded-lg appearance-none cursor-pointer accent-(--accent-blue)" 
                   />
                   <div className="flex justify-between mt-2 text-[10px] font-bold text-(--text-muted)">
                      <span>POOR</span>
                      <span>EXCEPTIONAL</span>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                   {["Accept", "Minor Revision", "Major Revision", "Reject"].map((v) => (
                      <button 
                        key={v}
                        onClick={() => setVerdict(v)}
                        className={`py-3 rounded-xl border-2 text-xs font-bold transition-all ${
                           verdict === v ? "border-(--accent-blue) bg-(--accent-blue)/5 text-(--accent-blue)" : "border-(--border-color) text-(--text-muted) hover:border-white/20"
                        }`}
                      >
                         {v}
                      </button>
                   ))}
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold text-(--text-muted) uppercase">Critical Assessment</label>
                   <textarea 
                      placeholder="Discuss methodology, data integrity, and clinical relevance..." 
                      className="w-full bg-(--bg-secondary) border border-(--border-color) rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-(--accent-blue) transition-all min-h-[120px]" 
                   ></textarea>
                </div>

                <button 
                   disabled={submitting}
                   onClick={handleSubmit}
                   className="w-full py-4 rounded-xl bg-(--accent-blue) text-white font-bold text-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-3"
                >
                   {submitting ? <Loader2 size={20} className="animate-spin" /> : "Submit Signed Review"}
                </button>
             </div>
           ) : (
              <div className="text-center py-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto mb-6">
                   <ShieldCheck size={48} />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">Review Recorded on Ledger</h4>
                <p className="text-sm text-(--text-muted) mb-8">
                  Your assessment has been hashed and added to the consensus proof. 
                  <br /><span className="text-[10px] opacity-60 font-mono mt-2 block">HASH: 0x93j2...82ksl</span>
                </p>
                <button onClick={onClose} className="w-full py-3 rounded-xl bg-(--bg-secondary) border border-(--border-color) text-sm font-bold">
                   Return to Panels
                </button>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}

function ArticleReviewPanel({ article }: { article: Article }) {
  const [expanded, setExpanded] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const reviewCount = article.peerReviews.length;
  const t = useTranslations("PeerReview");

  return (
    <div className="glass-card overflow-hidden group hover:border-(--accent-purple)/30 transition-all">
      <div className="flex bg-white/2 transition-colors">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-1 text-left p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                 <span className="text-[10px] font-extrabold uppercase tracking-widest text-(--accent-purple) bg-(--accent-purple)/10 px-2 py-0.5 rounded-lg">Panel ID: {article.id.split("-")[1]}</span>
                 <span className="text-[10px] text-(--text-muted) font-medium italic border-l border-white/10 pl-2">{article.journal}</span>
              </div>
              <h3
                className={`text-lg font-bold leading-tight ${
                  article.status === "retracted"
                    ? "text-red-400 line-through decoration-2"
                    : "text-foreground group-hover:text-(--accent-purple)"
                }`}
              >
                {article.title}
              </h3>
              <p className="text-xs text-(--text-muted) mt-2 font-medium">
                {article.authors.join(", ")} • {article.year}
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex flex-col items-center justify-center px-4 py-2 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-(--accent-purple)/5 transition-colors">
                <span className="text-xl font-black text-(--accent-purple)">{reviewCount}</span>
                <span className="text-[9px] font-black uppercase text-(--text-muted)">Reviewers</span>
              </div>
              {expanded ? (
                <ChevronUp size={20} className="text-(--text-muted)" />
              ) : (
                <ChevronDown size={20} className="text-(--text-muted)" />
              )}
            </div>
          </div>
        </button>
      </div>

      {expanded && (
        <div className="border-t border-(--border-color) p-6 space-y-6 bg-gradient-to-b from-white/2 to-transparent animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between">
             <h4 className="text-xs font-black uppercase tracking-widest text-(--text-muted)">Official Assessments</h4>
             <button 
                onClick={() => setShowScoreModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-(--accent-blue) text-white text-[10px] font-black hover:shadow-lg hover:shadow-blue-500/20 transition-all uppercase tracking-wider"
             >
                <Plus size={14} />
                Submit Your Score
             </button>
          </div>
          
          <div className="space-y-4">
            {article.peerReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-(--accent-emerald)/5 border border-(--accent-emerald)/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
               <ShieldCheck size={20} className="text-(--accent-emerald)" />
               <div>
                  <p className="text-xs font-bold text-foreground">Consensus Proof Active</p>
                  <p className="text-[10px] text-(--text-muted) font-medium">This article has reached the minimum criteria for peer-review finality.</p>
               </div>
            </div>
            <button className="text-[10px] font-bold text-(--accent-emerald) hover:underline uppercase tracking-tighter">View Merkle Tree</button>
          </div>
        </div>
      )}
      
      {showScoreModal && (
        <ScoreModal 
           article={article} 
           onClose={() => setShowScoreModal(false)} 
        />
      )}
    </div>
  );
}

export default function PeerReviewPage() {
  const t = useTranslations("PeerReview");
  const [showJoinModal, setShowJoinModal] = useState(false);

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
        <button 
          onClick={() => setShowJoinModal(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-(--accent-purple) text-white text-sm font-extrabold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all active:scale-95"
        >
          <GraduationCap size={20} />
          {t("join_as_reviewer")}
        </button>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: t("stats.total_articles"),
            value: articles.length,
            icon: FileText,
            color: "#3b82f6",
          },
          {
            label: t("stats.total_reviewers"),
            value: articles.reduce((sum, a) => sum + a.peerReviews.length, 0),
            icon: Users,
            color: "#a78bfa",
          },
          {
            label: t("stats.acceptance_rate"),
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
            label: t("stats.transparent_process"),
            value: "100%",
            icon: ShieldCheck,
            color: "#06b6d4",
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

      {/* How it works Banner */}
      <div className="relative glass-card p-6 border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-transparent overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
           <ShieldCheck size={120} />
        </div>
        <div className="flex items-start gap-5 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-(--accent-purple) shrink-0 shadow-inner">
             <ShieldCheck size={24} />
          </div>
          <div className="max-w-3xl">
            <h3 className="text-lg font-bold text-foreground mb-1.5">
              {t("how_it_works.title")}
            </h3>
            <p className="text-sm text-(--text-muted) leading-relaxed">
              {t("how_it_works.description")}
            </p>
            <div className="flex gap-6 mt-4">
               <div className="flex items-center gap-2">
                  <Timer size={14} className="text-(--accent-purple)" />
                  <span className="text-[11px] font-bold text-foreground/80 lowercase tracking-tight">Real-time Attribution</span>
               </div>
               <div className="flex items-center gap-2">
                  <Zap size={14} className="text-(--accent-purple)" />
                  <span className="text-[11px] font-bold text-foreground/80 lowercase tracking-tight">Incentivized Accuracy</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Panels */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
           <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Users size={20} className="text-(--accent-blue)" />
              Active Review Panels
           </h2>
           <span className="text-xs font-bold text-(--text-muted)">Showing all {articles.length} panels</span>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {articles.map((article) => (
            <ArticleReviewPanel key={article.id} article={article} />
          ))}
        </div>
      </div>

      {/* Join Modal */}
      {showJoinModal && (
        <JoinReviewerModal onClose={() => setShowJoinModal(false)} />
      )}
    </div>
  );
}
