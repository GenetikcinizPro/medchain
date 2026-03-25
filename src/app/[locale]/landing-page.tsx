"use client";

import { useEffect, useRef, useState } from "react";
import { Link, useRouter, usePathname } from "@/i18n/routing";
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
  Languages,
  Award,
  ChevronRight,
  MousePointer2,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform, AnimatePresence, Variants } from "framer-motion";


export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Landing");
  const navT = useTranslations("Navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLocale = () => {
    const nextLocale = locale === "tr" ? "en" : "tr";
    router.replace(pathname, { locale: nextLocale });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };


  return (
    <div className="min-h-screen bg-(--bg-primary) overflow-x-hidden relative w-full flex flex-col font-sans selection:bg-blue-500/30">
      
      {/* Cinematic Background Architecture */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none w-full">
        {/* Primary Ambient Glows */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-blue-600/10 blur-[180px] rounded-full mix-blend-screen" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 25, repeat: Infinity, delay: 5 }}
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-emerald-500/10 blur-[180px] rounded-full mix-blend-screen" 
        />
        
        {/* Perspective Grid with Fade */}
        <div className="absolute inset-0 bg-grid opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        
        {/* Subtle Floating Prisms */}
        <AnimatePresence>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.05, scale: 1 }}
              className="absolute w-64 h-64 border border-white/5 bg-white/[0.01] rounded-full blur-2xl"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + (i * 20) % 80}%`,
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Glass Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 w-full px-6 pt-6`}
      >
        <div 
          className={`max-w-7xl mx-auto px-6 py-4 rounded-3xl transition-all duration-500 flex items-center justify-between border ${
            scrolled 
              ? "bg-(--bg-card)/80 backdrop-blur-2xl border-white/10 shadow-3xl" 
              : "bg-transparent border-transparent"
          }`}
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/40 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-11 h-11 rounded-xl flex items-center justify-center bg-linear-to-br from-blue-600 to-indigo-600 shadow-xl border border-white/10">
                <LinkIcon size={22} className="text-white" />
              </div>
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">
              MedChain<span className="text-blue-500">.io</span>
            </span>
          </motion.div>
          
          <div className="hidden lg:flex items-center gap-10">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-10 text-[11px] font-black text-(--text-muted) uppercase tracking-[0.2em]"
            >
              {["about", "features", "network"].map((key) => (
                <a 
                  key={key} 
                  href={`#${key}`} 
                  className="hover:text-white transition-all hover:tracking-[0.3em] duration-300"
                >
                  {t(key)}
                </a>
              ))}
            </motion.div>
            
            <div className="w-px h-6 bg-white/10" />

            <div className="flex items-center gap-4">
              <button
                onClick={toggleLocale}
                className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all active:scale-95"
              >
                <Languages size={15} className="text-blue-500" />
                <span className="text-[11px] font-black text-white">{locale === 'tr' ? 'EN' : 'TR'}</span>
              </button>

              <Link
                href="/dashboard"
                className="group px-8 py-3 rounded-2xl bg-white text-black text-xs font-black uppercase tracking-wider hover:bg-blue-500 hover:text-white transition-all duration-500 flex items-center gap-2 shadow-2xl"
              >
                {navT("go_to_app")}
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - High End Reveal */}
      <section ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center px-6 w-full pt-20">
        <motion.div 
          style={{ y, opacity, scale }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl w-full mx-auto text-center flex flex-col items-center"
        >
          {/* Status Badge */}
          <motion.div 
            variants={fadeInUp}
            className="group relative px-6 py-2.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-12 shadow-2xl backdrop-blur-md flex items-center gap-3 overflow-hidden cursor-default"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <ShieldCheck size={16} className="animate-pulse" />
            {t("hero_badge")}
          </motion.div>
          
          {/* Main Headline */}
          <motion.div variants={fadeInUp} className="relative mb-12">
            <h1 className="text-6xl md:text-8xl lg:text-[11rem] font-black text-white tracking-tighter leading-[0.85] drop-shadow-3xl">
              {t("hero_title_1")}
              <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-500 to-emerald-400">
                {t("hero_title_2")}
                <div className="absolute -bottom-4 left-0 right-0 h-1.5 bg-linear-to-r from-blue-500 via-emerald-400 to-transparent rounded-full opacity-30" />
              </span>
            </h1>
          </motion.div>
          
          {/* Subtitle */}
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-2xl text-(--text-secondary) max-w-3xl mx-auto mb-16 font-medium leading-relaxed tracking-tight italic opacity-80"
          >
            {t("hero_subtitle")}
          </motion.p>
          
          {/* CTAs */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full"
          >
            <Link
              href="/dashboard"
              className="group relative px-12 py-6 rounded-full bg-white text-black font-black flex items-center gap-4 overflow-hidden shadow-3xl hover:shadow-blue-500/40 transition-all duration-500 min-w-[280px] justify-center active:scale-95"
            >
              <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-4 text-sm uppercase tracking-widest font-black group-hover:text-white transition-colors">
                {t("cta_join")}
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-500" />
              </span>
            </Link>
            
            <a
              href="#protocol"
              className="group px-12 py-6 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-black backdrop-blur-2xl transition-all duration-500 flex items-center gap-4 min-w-[280px] justify-center uppercase tracking-[0.2em] text-sm active:scale-95"
            >
              <Cpu size={22} className="text-blue-500 group-hover:rotate-90 transition-transform duration-700" />
              {t("cta_protocol")}
            </a>
          </motion.div>

          {/* Luxury Stats Reveal */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-40 w-full max-w-5xl"
          >
            {[
              { label: t("stats.verified"), value: "2.4M+", icon: Database },
              { label: t("stats.reviewers"), value: "185K", icon: Globe },
              { label: t("stats.nodes"), value: "1,240", icon: Network },
              { label: t("stats.partners"), value: "85", icon: Award }
            ].map((stat, i) => (
              <div key={i} className="group relative p-8 rounded-[40px] glass-premium transition-all duration-700 hover:-translate-y-4 hover:bg-white/[0.08] overflow-hidden border-white/5">
                <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700">
                  <stat.icon size={80} className="text-white" />
                </div>
                <p className="text-[10px] text-(--text-muted) uppercase font-black tracking-[0.3em] mb-4 group-hover:text-blue-400 transition-colors">{stat.label}</p>
                <p className="text-5xl font-black text-white tracking-tighter group-hover:scale-110 origin-left transition-transform duration-500">{stat.value}</p>
                <div className="w-12 h-1 bg-blue-500/20 mt-6 rounded-full group-hover:w-full transition-all duration-700" />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Cinematic Content Sections */}
      <section id="about" className="relative z-20 pt-80 pb-60 px-6 w-full">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="flex-1 relative w-full"
          >
            <div className="absolute inset-[-50%] bg-blue-500/10 blur-[200px] rounded-full animate-pulse" />
            <div className="relative glass-premium p-16 rounded-[64px] border-white/10 shadow-3xl overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-linear-to-b from-blue-600 via-indigo-500 to-emerald-400" />
              <div className="flex items-center gap-4 mb-10">
                <div className="px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                  {t("vision.manifesto")}
                </div>
              </div>
              <h3 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tighter leading-tight">
                {t.rich("trust_is_coded", {
                  span: (chunks) => <span className="text-blue-500">{chunks}</span>
                })}
              </h3>
              <p className="text-xl text-(--text-secondary) leading-relaxed mb-12 font-medium opacity-90 italic">
                &ldquo;{t("vision.p1")}&rdquo;
              </p>
              
              <div className="flex items-center gap-8 pt-10 border-t border-white/5">
                <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-2xl ring-8 ring-white/[0.02]">
                  <ShieldCheck size={36} className="text-white" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white tracking-tight leading-none mb-2">{t("vision.motto")}</p>
                  <p className="text-xs text-blue-400 font-black uppercase tracking-[0.2em]">{t("vision.motto_sub")}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-20 drop-shadow-2xl">
              {t("vision.headline")}
            </h2>
            <div className="space-y-16">
              {[
                { title: t("vision.feat1_title"), desc: t("vision.feat1_desc"), icon: Lock },
                { title: t("vision.feat2_title"), desc: t("vision.feat2_desc"), icon: Award },
                { title: t("vision.feat3_title"), desc: t("vision.feat3_desc"), icon: Globe }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-10 group"
                >
                  <div className="w-16 h-16 rounded-[24px] bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all duration-500 shadow-3xl">
                    <item.icon size={28} className="text-(--text-muted) group-hover:text-blue-400 transition-colors group-hover:scale-110 duration-500" />
                  </div>
                  <div>
                    <h4 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight group-hover:text-blue-500 transition-colors uppercase">
                      {item.title}
                    </h4>
                    <p className="text-(--text-secondary) text-lg leading-relaxed font-medium opacity-80">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* High-End Tech Reveal Section */}
      <section id="features" className="relative z-10 py-60 px-6 bg-(--bg-card)/30 border-y border-white/5 w-full">
        <div className="max-w-7xl mx-auto text-center w-full">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="mb-24"
             >
               <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 uppercase">
                 {t.rich("features_title", {
                   br: () => <br />,
                   span: (chunks) => <span className="text-blue-500">{chunks}</span>
                 })}
               </h2>
               <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full" />
             </motion.div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  { title: t("feature1_title"), desc: t("feature1_desc"), icon: Database },
                  { title: t("feature2_title"), desc: t("feature2_desc"), icon: GitBranch },
                  { title: t("feature3_title"), desc: t("feature3_desc"), icon: Lock }
                ].map((f, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -15 }}
                    className="group relative glass-premium p-12 rounded-[48px] border-white/5 transition-all duration-700 overflow-hidden shadow-3xl"
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative w-20 h-20 rounded-[30px] bg-white/[0.03] border border-white/5 flex items-center justify-center text-(--text-muted) mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-700 shadow-2xl group-hover:shadow-blue-500/40">
                        <f.icon size={36} />
                    </div>
                    <h4 className="text-3xl font-black text-white mb-6 tracking-tighter uppercase group-hover:text-blue-400 transition-colors">{f.title}</h4>
                    <p className="text-lg text-(--text-secondary) leading-relaxed font-medium opacity-80">{f.desc}</p>
                    
                    <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500">
                      {t("explore_paper")} <ChevronRight size={14} />
                    </div>
                  </motion.div>
                ))}
             </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative z-10 py-60 px-6 w-full text-center overflow-hidden">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="max-w-4xl mx-auto"
        >
          <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-16 leading-none">
            {t.rich("footer_title", {
              br: () => <br />,
              span: (chunks) => <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-indigo-500 to-emerald-400">{chunks}</span>
            })}
          </h2>
          <Link
              href="/dashboard"
              className="px-16 py-8 rounded-full bg-white text-black font-black text-xl uppercase tracking-tighter hover:bg-blue-600 hover:text-white transition-all duration-700 shadow-3xl inline-flex items-center gap-6 active:scale-95"
            >
              {t("footer_cta")}
              <MousePointer2 size={32} />
          </Link>
          <p className="mt-12 text-(--text-muted) text-sm font-bold uppercase tracking-[0.4em] opacity-40">
            {t("footer_sub")}
          </p>
        </motion.div>
      </section>

    </div>
  );
}
