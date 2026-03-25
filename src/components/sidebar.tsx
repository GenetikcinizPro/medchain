"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  GitBranch,
  FileText,
  Users,
  Shield,
  Home,
  Link as LinkIcon,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Academic Wallet", icon: LayoutDashboard },
  { href: "/bibliography", label: "Bibliyografi", icon: BookOpen },
  { href: "/citations", label: "Atıf Zinciri", icon: GitBranch },
  { href: "/guidelines", label: "Yaşayan Rehberler", icon: FileText },
  { href: "/peer-review", label: "Hakemlik Paneli", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] flex flex-col border-r border-[var(--border-color)] bg-[var(--bg-secondary)] z-40">
      {/* Logo */}
      <div className="p-5 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
               style={{ background: "var(--gradient-blue)" }}>
            <LinkIcon size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-[15px] font-bold tracking-tight text-[var(--text-primary)]">
              MedChain
            </h1>
            <p className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-widest">
              Library
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 flex flex-col gap-1">
        <p className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-widest px-3 mb-2 mt-2">
          Platform
        </p>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive ? "active" : ""}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--border-color)]">
        <div className="glass-card p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
               style={{ background: "var(--gradient-emerald)" }}>
            <Shield size={14} className="text-white" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[var(--text-primary)]">
              Blockchain Aktif
            </p>
            <p className="text-[10px] text-[var(--accent-emerald)]">
              ● Bağlantı güvenli
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
