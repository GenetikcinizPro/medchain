"use client";

import { Link, usePathname, useRouter } from "@/i18n/routing";
import {
  LayoutDashboard,
  BookOpen,
  GitBranch,
  FileText,
  Users,
  Shield,
  Home,
  Link as LinkIcon,
  Languages,
  Share2,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

const navItems = [
  { href: "/", labelKey: "home", icon: Home },
  { href: "/dashboard", labelKey: "dashboard", icon: LayoutDashboard },
  { href: "/bibliography", labelKey: "bibliography", icon: BookOpen },
  { href: "/citations", labelKey: "citations", icon: GitBranch },
  { href: "/guidelines", labelKey: "guidelines", icon: FileText },
  { href: "/peer-review", labelKey: "peer-review", icon: Users },
] as const;

function LanguageSwitcher() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentLocale = useLocale();

  const toggleLocale = () => {
    const nextLocale = currentLocale === "tr" ? "en" : "tr";
    replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-(--border-color) bg-[rgba(59,130,246,0.05)] hover:bg-[rgba(59,130,246,0.1)] transition-all text-xs font-semibold text-foreground"
    >
      <Languages size={16} className="text-(--accent-blue)" />
      <div className="flex-1 text-left">
        <span>{currentLocale === "tr" ? "English" : "Türkçe"}</span>
      </div>
      <span className="text-[9px] bg-(--accent-blue) text-white px-1.5 py-0.5 rounded uppercase">
        {currentLocale === "tr" ? "EN" : "TR"}
      </span>
    </button>
  );
}

export default function Sidebar() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-(--border-color) bg-(--bg-secondary) flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-(--border-color) flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
             style={{ background: "var(--gradient-blue)" }}>
          <LinkIcon size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-[15px] font-bold tracking-tight text-foreground">
            MedChain
          </h1>
          <p className="text-[10px] font-medium text-(--text-muted) uppercase tracking-widest">
            Library
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <p className="text-[10px] font-semibold text-(--text-muted) uppercase tracking-widest px-3 mb-2 mt-2">
          {t("platform")}
        </p>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href as any}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-(--bg-card-hover) ${isActive ? "bg-(--bg-card-hover) text-foreground" : "text-(--text-muted) hover:text-foreground"}`}
            >
              <item.icon size={18} />
              <span>{t(item.labelKey)}</span>
            </Link>
          );
        })}
      </nav>

      {/* Language Switcher */}
      <div className="px-4 py-2">
        <LanguageSwitcher />
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-(--border-color)">
        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Shield size={16} className="text-(--accent-emerald)" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">
                {t("blockchain_active")}
              </p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[10px] text-(--text-muted)">
                  {t("connection_secure")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-(--accent-blue) text-white text-[10px] font-bold cursor-pointer hover:opacity-90 transition">
            <Share2 size={12} />
            {t("platform")} ID: 0x82...91ab
          </div>
        </div>
      </div>
    </aside>
  );
}
