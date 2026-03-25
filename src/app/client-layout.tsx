"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {!isLandingPage && (
        <>
          {/* Mobile Top Nav (visible only on md:hidden) */}
          <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex items-center px-4 justify-between z-50">
            <span className="font-bold tracking-tight text-[var(--text-primary)]">
              MedChain
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] rounded-lg"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Sidebar (visible on md:block) */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Mobile Sidebar Overlay */}
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-0 z-40 flex">
              <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
                onClick={() => setMobileMenuOpen(false)} 
                aria-hidden="true"
              />
              <div className="relative w-[260px] h-full bg-[var(--bg-secondary)] flex flex-col transform transition-transform shadow-2xl">
                <Sidebar />
              </div>
            </div>
          )}
        </>
      )}
      <main
        className={`flex-1 bg-grid min-h-screen relative transition-all duration-300 ${
          !isLandingPage ? "md:ml-[260px] p-4 pt-20 md:p-8 md:pt-8" : "w-full"
        }`}
      >
        {children}
      </main>
    </>
  );
}
