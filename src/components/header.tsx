"use client";

import { useTranslations, useLocale } from "next-intl";
import { Bell, Search, Wallet, UserCircle, Settings } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const t = useTranslations("Navigation");
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-16 border-b border-(--border-color) bg-(--bg-secondary)/80 backdrop-blur-md z-30 px-4 md:px-8">
      <div className="h-full flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)" />
          <input
            type="text"
            placeholder="Search academic records, hashes, authors..."
            className="w-full bg-(--bg-card) border border-(--border-color) rounded-xl pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-(--text-muted) focus:outline-none focus:border-(--accent-blue) focus:ring-1 focus:ring-(--accent-blue) transition-all"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Wallet Connect */}
          <button
            onClick={() => setIsWalletConnected(!isWalletConnected)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isWalletConnected
                ? "bg-(--accent-emerald)/10 text-(--accent-emerald) border border-(--accent-emerald)/20"
                : "bg-(--accent-blue) text-white hover:bg-(--accent-blue)/90 shadow-lg shadow-blue-500/20"
            }`}
          >
            <Wallet size={14} />
            {isWalletConnected ? "0x82...91ab" : "Connect Wallet"}
          </button>

          {/* Notifications */}
          <button className="p-2.5 rounded-xl bg-(--bg-card) border border-(--border-color) text-(--text-muted) hover:text-foreground transition-all relative">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-(--accent-red) rounded-full border-2 border-(--bg-card)" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-(--border-color)">
            <div className="hidden lg:block text-right">
              <p className="text-xs font-bold text-foreground">Dr. Canberk Yılmaz</p>
              <p className="text-[10px] text-(--text-muted)">Academic Rank: Senior Researcher</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-(--bg-card) border border-(--border-color) flex items-center justify-center text-(--accent-blue) overflow-hidden group cursor-pointer hover:border-(--accent-blue) transition-all">
              <UserCircle size={24} className="group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
