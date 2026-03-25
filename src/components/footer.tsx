"use client";

import { useTranslations } from "next-intl";
import { Share2, Users, Book, Shield, Link as LinkIcon, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function Footer() {
  const t = useTranslations("Landing");
  const n = useTranslations("Navigation");
  const f = useTranslations("Footer");

  return (
    <footer className="border-t border-(--border-color) bg-(--bg-secondary) py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield size={24} className="text-(--accent-blue)" />
              <span className="text-xl font-bold tracking-tight text-foreground">
                MedChain
              </span>
            </div>
            <p className="text-sm text-(--text-muted) leading-relaxed">
              {t("hero_subtitle")}
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-foreground">
              {n("platform")}
            </h4>
            <ul className="space-y-2">
              {["dashboard", "bibliography", "citations", "guidelines", "peer-review"].map((key) => (
                <li key={key}>
                  <Link
                    href={`/${key.replace("_", "-")}`}
                    className="text-sm text-(--text-muted) hover:text-(--accent-blue) transition-colors"
                  >
                    {n(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-foreground">
              {f("resources")}
            </h4>
            <ul className="space-y-2">
              {[
                { label: f("resource_items.whitepaper"), key: "whitepaper" },
                { label: f("resource_items.docs"), key: "docs" },
                { label: f("resource_items.api"), key: "api" },
                { label: f("resource_items.protocol"), key: "protocol" }
              ].map((item) => (
                <li key={item.key}>
                  <a
                    href="#"
                    className="text-sm text-(--text-muted) hover:text-(--accent-blue) transition-colors flex items-center gap-1"
                  >
                    {item.label} <ExternalLink size={12} className="opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-foreground">
              {f("connect")}
            </h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-(--bg-card) border border-(--border-color) text-(--text-muted) hover:text-(--accent-blue) hover:border-(--accent-blue) transition-all">
                <Share2 size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-(--bg-card) border border-(--border-color) text-(--text-muted) hover:text-(--accent-blue) hover:border-(--accent-blue) transition-all">
                <LinkIcon size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-(--bg-card) border border-(--border-color) text-(--text-muted) hover:text-(--accent-blue) hover:border-(--accent-blue) transition-all">
                <Users size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-(--bg-card) border border-(--border-color) text-(--text-muted) hover:text-(--accent-blue) hover:border-(--accent-blue) transition-all">
                <Book size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-(--border-color) flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-(--text-muted)">
            {f("copyright")}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-(--text-muted) hover:text-foreground">{f("legal.privacy")}</a>
            <a href="#" className="text-xs text-(--text-muted) hover:text-foreground">{f("legal.terms")}</a>
            <a href="#" className="text-xs text-(--text-muted) hover:text-foreground">{f("legal.cookie")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
