"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Link as LinkIcon,
  Globe,
  GitBranch,
  Network,
  ArrowRight,
  Database,
  Lock,
  Cpu,
} from "lucide-react";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-x-hidden relative z-50">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[40%] bg-emerald-600/20 blur-[120px] rounded-full mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[rgba(5,10,24,0.8)] backdrop-blur-md border-b border-[var(--border-color)] py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-400 shadow-lg shadow-blue-500/20">
              <LinkIcon size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              MedChain<span className="text-blue-400 font-normal">.io</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#vision" className="hover:text-white transition">Hakkımızda</a>
            <a href="#features" className="hover:text-white transition">Özellikler</a>
            <a href="#network" className="hover:text-white transition">Ağımız</a>
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all backdrop-blur-sm"
            >
              Uygulamaya Git
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center pt-20 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-8 animate-fade-in-up">
            <ShieldCheck size={14} />
            Yenilmez Literatür Kaydı
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 tracking-tight leading-tight mb-8 drop-shadow-lg opacity-0 animate-fade-in-up animation-delay-headline">
            Tıbbi Bilginin
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
              Değiştirilemez Geleceği
            </span>
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-12 font-light leading-relaxed opacity-0 animate-fade-in-up animation-delay-subtitle">
            Dünyanın ilk blockchain tabanlı sağlık literatürü konsensüs ağı. 
            PubMed, ResearchGate ve Zotero'nun manipüle edilemez Web3 evrimi. 
            Bilimsel doğruları şifreleyerek geleceğe aktarıyoruz.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up animation-delay-buttons">
            <Link
              href="/dashboard"
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold flex items-center gap-2 overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_rgba(16,185,129,0.6)] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 rounded-full" />
              <span className="relative z-10 flex items-center gap-2">
                Ağa Katıl
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <a
              href="#protocol"
              className="px-8 py-4 rounded-full border border-gray-700 bg-gray-900/50 hover:bg-gray-800 text-white font-semibold backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
            >
              <Cpu size={18} className="text-gray-400" />
              Protokolü İncele
            </a>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24 opacity-0 animate-fade-in-up animation-delay-stats">
            {[
              { label: "Doğrulanmış Kayıt", value: "2.4M+" },
              { label: "Şeffaf Hakem", value: "185K" },
              { label: "Nodes", value: "1,240" },
              { label: "Kurumsal Partner", value: "85" }
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition">
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-500">{stat.value}</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision / About Section */}
      <section id="vision" className="relative z-10 py-32 px-6 overflow-hidden bg-[var(--bg-secondary)] border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full" />
            <div className="relative glass-card p-10 backdrop-blur-xl border border-blue-500/20 rounded-3xl overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Manifesto</h3>
              <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-6 font-light">
                Tıbbi araştırma dünyası, şeffaf olmayan hakem süreçleri ve güvenilirliği kanıtlanamayan atıf zincirleri yüzünden her yıl milyarlarca dolar israf ediyor.
              </p>
              <p className="text-base md:text-lg text-[var(--text-primary)] leading-relaxed font-medium">
                MedChain, <span className="text-blue-400">güvenin kodlanmış halidir.</span> Bilimsel verinin doğuşundan itibaren değiştirilemez bir kaderi olmasını savunuyoruz.
              </p>
              
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-blue-500/30 flex items-center justify-center bg-blue-500/10">
                  <ShieldCheck size={20} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-bold">Açık. Doğrulanabilir. Ölümsüz.</p>
                  <p className="text-xs text-gray-500 mt-1">MedChain Foundation Core Beliefs</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 space-y-8 mt-12 md:mt-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 tracking-tight leading-tight">
              Geleceğin Bilimsel <br className="hidden md:block" /> Konsensüs Ağı
            </h2>
            <div className="space-y-6">
              {[
                { title: "Sıfır Manipülasyon", desc: "Veriler bir kez zincire yazıldığında dünyadaki hiçbir güç tarafından değiştirilemez veya silinemez." },
                { title: "Gerçek İtibar Ekonomisi", desc: "Sadece yayın sayısı değil; doğrulanmış hakemlikler ve açık veri paylaşımları Academic Wallet'ınızda değere dönüşür." },
                { title: "Kolektif Zeka", desc: "Sınır tanımayan, sansürlenemeyen küresel bir hakem ve araştırmacı ağı." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-1.5 h-auto bg-gradient-to-b from-blue-500 to-emerald-400 rounded-full flex-shrink-0" />
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-[var(--text-primary)]">{item.title}</h4>
                    <p className="text-[var(--text-secondary)] mt-2 text-sm md:text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 px-6 bg-[#030610] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6">Milyar Dolarlık Güven Altyapısı</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-base md:text-lg transition">
              Akreditasyonu kırılmış geleneksel yayın sistemlerinin aksine, MedChain bilimin güvenliğinde devrim yaratıyor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: "Değiştirilemez Literatür",
                desc: "Her makale, veri seti ve hakem yorumu blockchain ağına şifrelenir. Geri çekilmiş çalışmalar (retraction) silinmek yerine sonsuza dek şeffafça etiketlenir.",
                color: "from-blue-500 to-indigo-600"
              },
              {
                icon: GitBranch,
                title: "Atıf Zinciri Doğrulaması",
                desc: "Bilimsel soy ağaçları (Citation Chains) smart contract'lar ile güvence altına alınır. Citation farming ve sahte atıf kartellerine son.",
                color: "from-emerald-400 to-teal-600"
              },
              {
                icon: Lock,
                title: "Kriptografik Proof-of-Review",
                desc: "Anonim ama doğrulanmış uzmanlar tarafından yapılan hakemlik süreçleri. %100 şeffaf, ödüllendirilebilir ve itibar ekonomisine dayalı.",
                color: "from-purple-500 to-pink-600"
              }
            ].map((feat, i) => (
              <div key={i} className="group relative p-8 rounded-3xl bg-[#0a0f1e] border border-blue-900/30 hover:border-blue-500/50 transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feat.color} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity duration-500`} />
                <div className="w-14 h-14 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <feat.icon size={24} className="text-gray-300 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-4">{feat.title}</h3>
                <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Global Network Map (Visual Mock) */}
      <section id="network" className="relative z-10 py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
              <Globe size={16} /> Global Veri Ağı
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Tüm Dünya Hastaneleri Tek Bir Ağa Bağlı
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              MedChain düğümleri (nodes) saniyeler içinde yeni yayınları doğrular. 
              WHO, CDC, Harvard Tıp ve Mayo Clinic gibi önde gelen kurumların 
              bir araya gelerek oluşturduğu değiştirilemez bilimsel konsensüs.
            </p>
            <ul className="space-y-4">
              {[
                "Dağıtık Ledger Teknolojisi (DLT)",
                "Sıfır Bilgi İspatı (ZKP) ile Hasta Gizliliği",
                "Gerçek Zamanlı Protokol Güncellemeleri"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-emerald-500" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 relative w-full aspect-square max-w-[600px]">
            {/* Visual representation of a glowing global network */}
            <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-dashed border-cyan-500/30 animate-[spin_40s_linear_infinite_reverse]" />
            <div className="absolute inset-12 rounded-full border border-purple-500/20 animate-[spin_30s_linear_infinite]" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-blue-900 to-black border mx-auto mt-24 border-blue-500/50 shadow-[0_0_100px_rgba(59,130,246,0.3)] flex items-center justify-center float-animation">
                <Network size={64} className="text-blue-400 opacity-80" />
              </div>
              
              {/* Connecting Nodes */}
              <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_20px_#34d399] animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee] animate-pulse animation-delay-1000" />
              <div className="absolute top-1/3 right-1/3 w-5 h-5 rounded-full bg-purple-400 shadow-[0_0_20px_#c084fc] animate-pulse animation-delay-2000" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="relative z-10 py-20 px-6 border-t border-white/10 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Akademik Kariyerinizin Yönetimini Geri Alın
          </h2>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors shadow-xl"
          >
            Academic Wallet Oluştur
            <ArrowRight size={18} />
          </Link>
          <p className="mt-8 text-gray-500 text-sm">
            © 2026 MedChain Foundation. Açık kaynak kodlu ve merkeziyetsiz.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Needed Lucide import missing above
function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
