"use client";

import { usePathname } from "@/i18n/routing";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Footer from "@/components/footer";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ClientLayout({ 
  children,
  locale 
}: { 
  children: React.ReactNode;
  locale: string;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/" || pathname === "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations("Navigation");

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {!isLandingPage ? (
        <div className="flex flex-1">
          {/* Mobile Top Nav Trigger (visible only on md:hidden) */}
          <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-(--border-color) bg-(--bg-secondary)/80 backdrop-blur-md flex items-center px-4 justify-between z-50">
            <span className="font-bold tracking-tight text-foreground">
              MedChain
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-(--accent-blue) rounded-lg"
              aria-label={t("platform")}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Sidebar (visible on md:block) */}
          <div className="hidden md:block fixed top-0 bottom-0 left-0 w-64 z-40">
            <Sidebar />
          </div>

          {/* Mobile Sidebar Overlay */}
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-0 z-[60] flex">
              <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
                onClick={() => setMobileMenuOpen(false)} 
                aria-hidden="true"
              />
              <div className="relative w-64 h-full transform transition-transform shadow-2xl">
                <Sidebar />
              </div>
            </div>
          )}

          {/* Main Content Area for App */}
          <div className="flex-1 flex flex-col md:pl-64 min-h-screen">
            <Header />
            <main className="flex-1 p-4 pt-20 md:p-8 md:pt-24 bg-grid relative overflow-x-hidden">
              <div className="max-w-7xl mx-auto w-full">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </div>
      ) : (
        /* Landing Page Layout */
        <div className="flex flex-col min-h-screen w-full">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}
