"use client";

import { useState } from "react";
import {
  GitBranch,
  ShieldCheck,
  Beaker,
  BookOpen,
  Landmark,
  Microscope,
  Info,
  ExternalLink,
  Plus,
  Zap,
  Users,
  Calendar,
} from "lucide-react";
import { citationNodes } from "@/lib/mock-data";
import type { CitationNode } from "@/lib/mock-data";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export default function CitationsPage() {
  const t = useTranslations("Citations");
  const [selectedNode, setSelectedNode] = useState<CitationNode>(citationNodes[0]);

  const typeConfig: Record<
    string,
    { icon: React.ElementType; color: string; bg: string; label: string }
  > = {
    trial: {
      icon: Beaker,
      color: "#3b82f6",
      bg: "rgba(59, 130, 246, 0.12)",
      label: t("types.trial"),
    },
    discovery: {
      icon: Microscope,
      color: "#10b981",
      bg: "rgba(16, 185, 129, 0.12)",
      label: t("types.discovery"),
    },
    review: {
      icon: BookOpen,
      color: "#8b5cf6",
      bg: "rgba(139, 92, 246, 0.12)",
      label: t("types.review"),
    },
    foundational: {
      icon: Landmark,
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.12)",
      label: t("types.foundational"),
    },
  };

  const getChildNodes = (nodeId: string) =>
    citationNodes.filter((n) =>
      citationNodes.find((parent) => parent.id === nodeId)?.children?.includes(n.id)
    );

  const renderNode = (node: CitationNode, level: number = 0) => {
    const config = typeConfig[node.type];
    const IconComp = config.icon;
    const isSelected = selectedNode.id === node.id;
    const children = getChildNodes(node.id);

    return (
      <div key={node.id} className="relative">
        <div 
          className="flex items-start gap-4 mb-8"
          style={{ marginLeft: `${level * 40}px` }}
        >
          {/* Connector Lines with Path Animation */}
          {level > 0 && (
            <>
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: 72 }}
                className="absolute -left-[24px] top-[-32px] w-[2px] bg-linear-to-b from-(--accent-blue)/40 to-(--border-color)" 
              />
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 24 }}
                className="absolute -left-[24px] top-[24px] h-[2px] bg-linear-to-b from-(--accent-blue)/40 to-(--accent-blue)/10" 
              />
            </>
          )}

          <motion.button
            layout
            onClick={() => setSelectedNode(node)}
            className={`group relative flex items-center gap-4 transition-all duration-500 ${
              isSelected ? "z-10" : "hover:scale-102"
            }`}
          >
            {isSelected && (
              <motion.div 
                layoutId="nodeGlow"
                className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-2xl relative z-10 ${isSelected ? 'scale-110 rotate-3' : ''}`}
              style={{
                borderColor: isSelected ? config.color : "rgba(255,255,255,0.05)",
                background: isSelected ? config.bg : "rgba(10, 17, 40, 0.6)",
                boxShadow: isSelected ? `0 0 30px ${config.color}44` : "none",
              }}
            >
              <IconComp size={24} style={{ color: config.color }} />
            </div>

            <div className={`glass-premium p-4 min-w-[260px] border-l-4 transition-all duration-500 relative z-10 shadow-2xl rounded-2xl ${isSelected ? 'scale-105 ml-2' : 'group-hover:border-(--accent-blue)/30'}`}
                 style={{ borderLeftColor: isSelected ? config.color : "transparent" }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-lg bg-white/5 text-(--text-muted)">
                   {node.year}
                </span>
                {isSelected && (
                  <motion.span 
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[9px] font-black text-(--accent-blue) tracking-tighter"
                  >
                    ACTIVE FOCUS
                  </motion.span>
                )}
              </div>
              <h4 className="text-sm font-bold text-white line-clamp-1 tracking-tight">
                {node.title}
              </h4>
              <p className="text-[10px] text-(--text-secondary) font-bold mt-0.5">
                {node.authors[0]} et al.
              </p>
            </div>
          </motion.button>
        </div>
        <AnimatePresence mode="wait">
          {children.map(child => renderNode(child, level + 1))}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter text-white">
            {t("title")}
          </h1>
          <p className="text-sm text-(--text-secondary) mt-1 font-medium italic">
            {t("subtitle")}
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-(--accent-blue) text-white text-sm font-black shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 hover:rotate-1 transition-all active:scale-95 uppercase tracking-widest">
          <Plus size={18} />
          Contribute to Chain
        </button>
      </div>

      {/* Info Banner */}
      <div className="glass-premium p-5 rounded-3xl flex items-start gap-4 border-blue-500/10 shadow-2xl">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-(--accent-blue) shrink-0 shadow-inner">
          <Info size={20} />
        </div>
        <div>
          <p className="text-sm text-white/90 leading-relaxed font-bold">
             Exploring the <span className="text-(--accent-blue)">{citationNodes[0].title}</span> lineage.
          </p>
          <p className="text-xs text-(--text-secondary) mt-1 font-medium">
            This trace highlights <span className="text-blue-400 font-black tracking-tighter uppercase">trials</span> leading to discovery and <span className="text-amber-400 font-black tracking-tighter uppercase">foundational</span> research.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Advanced Visualization Tree */}
        <div className="lg:col-span-8 glass-premium p-8 min-h-[600px] border-white/5 shadow-2xl flex flex-col rounded-[32px]">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shadow-inner">
                <GitBranch size={16} />
              </div>
              <h3 className="text-[15px] font-black text-white uppercase tracking-widest">
                Citation Pedigree
              </h3>
            </div>
            <div className="flex gap-4">
              {Object.entries(typeConfig).map(([key, config]) => (
                <div key={key} className="flex items-center gap-2 text-[9px] uppercase font-black tracking-widest text-(--text-secondary)">
                  <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: config.color, color: config.color }} /> 
                  {config.label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative pt-4 pb-12 overflow-x-auto scrollbar-hide flex-1">
             {/* Root Entry */}
             {renderNode(citationNodes[0])}
          </div>
        </div>

        {/* Dynamic Detail Panel */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          <div className="glass-premium overflow-hidden rounded-[32px] border-white/5 shadow-2xl">
            <div className="h-2 w-full transition-colors duration-500" style={{ backgroundColor: typeConfig[selectedNode.type].color }} />
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-(--accent-blue)">
                  FOCUS NODE DETAILS
                </span>
                <span className="hash-display text-[9px] opacity-40">{selectedNode.hash}</span>
              </div>

              <h3 className="text-2xl font-black text-white mb-6 leading-tight tracking-tight">
                {selectedNode.title}
              </h3>

              <div className="space-y-3">
                {[
                  { icon: Users, label: "AUTHORS", value: `${selectedNode.authors[0]} et al.` },
                  { icon: Calendar, label: "PUB YEAR", value: selectedNode.year },
                  { icon: Zap, label: "CLASS", value: typeConfig[selectedNode.type].label, color: typeConfig[selectedNode.type].color }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-colors group">
                    <div className="flex items-center gap-3">
                      <item.icon size={16} className="text-(--text-muted) group-hover:text-white transition-colors" style={item.color ? { color: item.color } : {}} />
                      <span className="text-xs font-bold text-white/90">{item.value}</span>
                    </div>
                    <span className="text-[9px] font-black text-(--text-muted) tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/5">
                <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                   <ShieldCheck size={20} className="text-(--accent-emerald) animate-pulse" />
                   <div>
                     <p className="text-[11px] font-black text-white uppercase tracking-tight">Verified Integrity</p>
                     <p className="text-[9px] text-emerald-400 font-bold opacity-80 uppercase tracking-widest">Block-19203 Verified</p>
                   </div>
                </div>
                <button className="w-full py-4 rounded-2xl bg-(--accent-blue) text-white text-xs font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-3 group active:scale-95">
                  <ExternalLink size={16} className="group-hover:rotate-12 transition-transform" />
                  Explore Source
                </button>
              </div>
            </div>
          </div>

          {/* Pedigree Context */}
          <div className="glass-premium p-8 border-purple-500/10 bg-purple-500/5 rounded-[32px] shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <GitBranch size={80} className="text-purple-400" />
             </div>
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 mb-4 relative z-10">
               Pedigree Impact
             </h4>
             <p className="text-sm text-white/80 leading-relaxed italic font-medium relative z-10">
               &quot;This node serves as a critical bridge between foundational metabolic research and modern GLP-1 clinic trials, cited by 12+ verified on-chain analyses.&quot;
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
