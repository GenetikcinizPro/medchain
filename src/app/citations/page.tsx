"use client";

import { useState } from "react";
import {
  GitBranch,
  ShieldCheck,
  Beaker,
  BookOpen,
  Landmark,
  Microscope,
  ChevronRight,
  Hash,
  ExternalLink,
  Info,
} from "lucide-react";
import { citationNodes } from "@/lib/mock-data";
import type { CitationNode } from "@/lib/mock-data";

const typeConfig: Record<
  string,
  { icon: React.ElementType; color: string; bg: string; label: string }
> = {
  trial: {
    icon: Beaker,
    color: "#3b82f6",
    bg: "rgba(59, 130, 246, 0.12)",
    label: "Klinik Çalışma",
  },
  discovery: {
    icon: Microscope,
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.12)",
    label: "Keşif",
  },
  review: {
    icon: BookOpen,
    color: "#8b5cf6",
    bg: "rgba(139, 92, 246, 0.12)",
    label: "Derleme",
  },
  foundational: {
    icon: Landmark,
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.12)",
    label: "Temel Araştırma",
  },
};

function CitationNodeCard({
  node,
  isSelected,
  onClick,
}: {
  node: CitationNode;
  isSelected: boolean;
  onClick: () => void;
}) {
  const config = typeConfig[node.type];
  const IconComp = config.icon;

  return (
    <button
      onClick={onClick}
      className={`citation-node glass-card p-4 text-left w-full ${
        isSelected ? "border-[rgba(59,130,246,0.4)] bg-[rgba(59,130,246,0.05)]" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: config.bg }}
        >
          <IconComp size={18} style={{ color: config.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1 inline-block"
            style={{
              background: config.bg,
              color: config.color,
            }}
          >
            {config.label}
          </span>
          <h3 className="text-[13px] font-semibold text-[var(--text-primary)] mt-1 leading-snug">
            {node.title}
          </h3>
          <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
            {node.authors.join(", ")} • {node.year}
          </p>
          <div className="flex items-center gap-1 mt-1.5">
            <Hash size={10} className="text-[var(--accent-cyan)]" />
            <span className="hash-display text-[9px]">{node.hash}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function CitationsPage() {
  const [selectedNode, setSelectedNode] = useState<CitationNode>(citationNodes[0]);

  const getChildNodes = (nodeId: string) =>
    citationNodes.filter((n) =>
      citationNodes.find((parent) => parent.id === nodeId)?.children?.includes(n.id)
    );

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Atıf Zinciri Görselleştirme
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Citation Chain — Bilimsel soy ağacı ve bilginin evrimi
        </p>
      </div>

      {/* Info */}
      <div className="glass-card p-4 flex items-start gap-3 border-[rgba(59,130,246,0.2)]">
        <Info size={16} className="text-[var(--accent-blue)] mt-0.5 shrink-0" />
        <div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Bu görselleştirme, <strong className="text-[var(--text-primary)]">Semaglutide Cardiovascular Outcomes Trial (2021)</strong> makalesinden
            geriye giderek <strong className="text-[var(--text-primary)]">Incretin Hormone Research (1964)</strong> noktasına kadar bilginin
            evrimini adım adım göstermektedir. Her düğüm blockchain üzerinde doğrulanmış bir kaydı temsil eder.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Citation Tree - Visual */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <GitBranch size={16} className="text-[var(--accent-blue)]" />
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Bilimsel Soy Ağacı
              </h3>
            </div>

            {/* Tree visualization */}
            <div className="space-y-0">
              {citationNodes.map((node, idx) => {
                const config = typeConfig[node.type];
                const IconComp = config.icon;
                const isLast = idx === citationNodes.length - 1;
                const isSelected = selectedNode.id === node.id;

                return (
                  <div key={node.id}>
                    <button
                      onClick={() => setSelectedNode(node)}
                      className={`w-full text-left rounded-xl p-4 transition-all duration-300 ${
                        isSelected
                          ? "bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.25)]"
                          : "hover:bg-[rgba(59,130,246,0.04)] border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Visual connector circle */}
                        <div className="relative flex flex-col items-center shrink-0">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all"
                            style={{
                              borderColor: config.color,
                              background: isSelected ? config.bg : "var(--bg-card)",
                              boxShadow: isSelected
                                ? `0 0 20px ${config.color}33`
                                : "none",
                            }}
                          >
                            <IconComp
                              size={20}
                              style={{ color: config.color }}
                            />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                              style={{ background: config.bg, color: config.color }}
                            >
                              {config.label}
                            </span>
                            <span className="text-xs font-bold text-[var(--text-muted)]">
                              {node.year}
                            </span>
                          </div>
                          <h4 className="text-sm font-semibold text-[var(--text-primary)] mt-1">
                            {node.title}
                          </h4>
                          <p className="text-[11px] text-[var(--text-secondary)]">
                            {node.authors.join(", ")}
                          </p>
                        </div>

                        {/* Hash */}
                        <div className="shrink-0 hidden md:flex items-center gap-1">
                          <ShieldCheck size={12} className="text-[var(--accent-emerald)] verified-pulse" />
                          <span className="hash-display text-[9px]">{node.hash}</span>
                        </div>
                      </div>
                    </button>

                    {/* Connector arrow */}
                    {!isLast && (
                      <div className="flex justify-start pl-[30px] py-1">
                        <svg width="24" height="32" viewBox="0 0 24 32">
                          <line
                            x1="12"
                            y1="0"
                            x2="12"
                            y2="28"
                            className="connector-line"
                          />
                          <polygon
                            points="6,24 12,32 18,24"
                            fill="rgba(59, 130, 246, 0.4)"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
              Seçili Makale Detayı
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                  Başlık
                </p>
                <p className="text-sm font-medium text-[var(--text-primary)] mt-0.5">
                  {selectedNode.title}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                  Yazarlar
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                  {selectedNode.authors.join(", ")}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                  Yıl
                </p>
                <p className="text-sm font-mono text-[var(--accent-blue)] mt-0.5">
                  {selectedNode.year}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                  Tür
                </p>
                <span
                  className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mt-0.5 inline-block"
                  style={{
                    background: typeConfig[selectedNode.type].bg,
                    color: typeConfig[selectedNode.type].color,
                  }}
                >
                  {typeConfig[selectedNode.type].label}
                </span>
              </div>
              <div>
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                  Blockchain Hash
                </p>
                <span className="hash-display text-[10px] mt-1 inline-block">
                  {selectedNode.hash}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 verified-pulse px-2 py-1.5 rounded-lg">
                <ShieldCheck size={14} className="text-[var(--accent-emerald)]" />
                <span className="text-[11px] text-[var(--accent-emerald)] font-medium">
                  Doğrulanmış Kayıt
                </span>
              </div>
            </div>
          </div>

          {/* Child references */}
          {selectedNode.children && selectedNode.children.length > 0 && (
            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                Referans Verilen Çalışmalar
              </h3>
              <div className="space-y-2">
                {getChildNodes(selectedNode.id).map((child) => (
                  <button
                    key={child.id}
                    onClick={() => setSelectedNode(child)}
                    className="w-full text-left p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-blue)] transition flex items-center gap-2"
                  >
                    <ChevronRight size={14} className="text-[var(--accent-blue)]" />
                    <div>
                      <p className="text-xs font-medium text-[var(--text-primary)]">
                        {child.title}
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)]">
                        {child.year}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
              Gösterim
            </h3>
            <div className="space-y-2">
              {Object.entries(typeConfig).map(([key, val]) => (
                <div key={key} className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center"
                    style={{ background: val.bg }}
                  >
                    <val.icon size={12} style={{ color: val.color }} />
                  </div>
                  <span className="text-xs text-[var(--text-secondary)]">
                    {val.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
