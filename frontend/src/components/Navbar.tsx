import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Cpu, ShieldCheck } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("userId");

  // Track scroll for background transition
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/", icon: <Terminal size={14} /> },
    { label: "Courses", path: "/courses", icon: <Cpu size={14} /> },
    { label: "Blogs", path: "/blogs", icon: <Cpu size={14} /> },
    { label: "Contact", path: "/contact", icon: <ShieldCheck size={14} /> },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] px-4 py-4 sm:px-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`
          mx-auto max-w-7xl h-14 flex items-center justify-between px-6 
          rounded-2xl transition-all duration-300 border
          ${scrolled 
            ? "bg-black/60 backdrop-blur-xl border-[#00ff9d22] shadow-[0_0_30px_rgba(0,0,0,0.5)]" 
            : "bg-transparent border-transparent"}
        `}
      >
        {/* Logo Section */}
        <div 
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 cursor-pointer"
        >
          <div className="relative">
            <div className="w-8 h-8 border border-[#00ff9d] rotate-45 flex items-center justify-center group-hover:bg-[#00ff9d] transition-all duration-300">
              <span className="-rotate-45 font-black text-[#00ff9d] group-hover:text-black transition-colors">X</span>
            </div>
            <div className="absolute -inset-1 border border-[#00ff9d44] rotate-45 animate-pulse" />
          </div>
          <span className="max-sm:hidden mx-2 font-mono font-bold text-white tracking-tighter text-lg">
            <span className="text-white">SPLOIT</span>
            <span className="text-[10px] opacity-40 ml-1">v4.0</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="max-sm:hidden sm:hidden md:flex items-center gap-1 font-mono bg-black">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                className={`
                  relative px-4 py-1.5 rounded-lg flex items-center gap-2 text-xs uppercase tracking-widest transition-all
                  ${isActive ? "text-[#00ff9d]" : "text-white/60 hover:text-white hover:bg-white/5"}
                `}
              >
                {link.icon}
                {link.label}
                {isActive && (
                  <motion.div 
                    layoutId="nav-active"
                    className="absolute inset-0 border border-[#00ff9d33] bg-[#00ff9d08] rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/profile/${userId}`)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-white/50 hover:text-[#00ff9d] hover:border-[#00ff9d33] transition-all font-mono"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
            0x{userId?.substring(0, 4) || "GUEST"}
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 bg-[#00ff9d] text-black text-[11px] font-bold uppercase tracking-widest rounded-lg hover:shadow-[0_0_20px_rgba(0,255,157,0.4)] transition-all active:scale-95"
          >
            Login
          </button>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-white hover:text-[#00ff9d]"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu (Fullscreen Overlay) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-4 right-4 md:hidden bg-black/95 backdrop-blur-2xl border border-[#00ff9d22] rounded-2xl overflow-hidden z-50 shadow-2xl"
          >
            <div className="p-6 flex flex-col gap-4">
              <p className="text-[10px] font-mono text-[#00ff9d]/50 uppercase tracking-[0.3em] mb-2 px-2">Main Navigation</p>
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => { navigate(link.path); setOpen(false); }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#00ff9d08] group transition-all"
                >
                  <span className="text-lg font-mono text-white/80 group-hover:text-[#00ff9d] group-hover:translate-x-2 transition-all">
                    {link.label}
                  </span>
                  <span className="text-[#00ff9d]/20 group-hover:text-[#00ff9d] transition-colors font-mono">/0{navLinks.indexOf(link) + 1}</span>
                </button>
              ))}
              <div className="h-px bg-white/5 my-2" />
              <button
                onClick={() => { navigate("/signup"); setOpen(false); }}
                className="w-full py-4 bg-[#00ff9d08] border border-[#00ff9d33] text-[#00ff9d] rounded-xl font-mono text-sm uppercase tracking-[0.2em]"
              >
                Access System
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;