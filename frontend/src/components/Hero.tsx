import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ----------------------- CyberGrid Background -----------------------
const CyberGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(#00ff9d 1px, transparent 1px), linear-gradient(90deg, #00ff9d 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg) translateY(-100px)',
          maskImage: 'linear-gradient(to bottom, transparent, black, transparent)'
        }}
      />
      <motion.div 
        animate={{ y: ['-100%', '200%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-[20vh] bg-gradient-to-b from-transparent via-[#00ff9d10] to-transparent z-10"
      />
    </div>
  );
};

// ----------------------- SystemVitals -----------------------
const SystemVitals: React.FC = () => {
  const [nodes, setNodes] = useState(124);
  useEffect(() => {
    const interval = setInterval(() => setNodes(n => n + (Math.random() > 0.5 ? 1 : -1)), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex flex-col gap-4 absolute left-8 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#00ff9d88]">
      <div className="space-y-1 border-l border-[#00ff9d33] pl-4">
        <p className="text-white/40">Network Status</p>
        <p className="text-[#00ff9d]">Encrypted / AES-256</p>
      </div>
      <div className="space-y-1 border-l border-[#00ff9d33] pl-4">
        <p className="text-white/40">Active Nodes</p>
        <p className="text-white">{nodes} <span className="animate-pulse">●</span></p>
      </div>
      <div className="space-y-1 border-l border-[#00ff9d33] pl-4">
        <p className="text-white/40">Latency</p>
        <p className="text-white">14ms</p>
      </div>
    </div>
  );
};

// ----------------------- Terminal -----------------------
const Terminal: React.FC = () => {
  const [text, setText] = useState("");
  const fullText = ">> system_init --v --target:cyber_labs --user:root";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-black/60 border border-[#00ff9d22] backdrop-blur-xl rounded-lg p-4 font-mono shadow-2xl text-left">
      <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#00ff9d20] border border-[#00ff9d50]" />
        </div>
        <span className="text-[10px] text-white/30 uppercase tracking-widest ml-2">Console v4.0.2</span>
      </div>
      <div className="text-xs sm:text-sm md:text-base">
        <span className="text-[#00ff9d] mr-2">➜</span>
        <span className="text-white/90">{text}</span>
        <span className="inline-block w-2 h-4 bg-[#00ff9d] ml-1 animate-pulse align-middle" />
      </div>
    </div>
  );
};

// ----------------------- Main Hero -----------------------
// ----------------------- Main Hero -----------------------
// ----------------------- Main Hero -----------------------
const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex max-sm:py-20 sm:py-25 lg:py-30 items-center justify-center bg-[#020617] text-white overflow-hidden selection:bg-[#00ff9d] selection:text-black">
      <CyberGrid />
      <SystemVitals />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,157,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        {/* Grid: Stacked on mobile, 12-col grid on Tablet (md) and up */}
        <div className="flex md:flex-row max-sm:flex-col md:grid md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Content */}
          {/* Mobile: items-center + text-center | Tablet/Laptop: items-start + text-left */}
          <div className="md:col-span-7 flex flex-col max-sm:items-center md:items-start max-sm:text-center md:text-left w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge: Centered on mobile (mx-auto), Left on Tablet+ (md:mx-0) */}
              <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full border border-[#00ff9d33] bg-[#00ff9d08] mb-6 mx-auto md:mx-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff9d] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff9d]"></span>
                </span>
                <span className ="text-[10px] font-bold tracking-[0.2em] uppercase text-[#00ff9d]">
                  Secure Connection Established
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Master the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#00f2ff] drop-shadow-[0_0_15px_rgba(0,255,157,0.3)]">
                  Digital Frontier
                </span>
              </h1>

              {/* Paragraph: Centered on mobile (mx-auto), Left on Tablet+ (md:mx-0) */}
              <p className="mt-8 text-base sm:text-lg text-slate-400 max-w-xl mx-auto md:mx-0 leading-relaxed">
                The most advanced cybersecurity playground for ethical hackers. 
                Deploy real exploits in controlled, high-fidelity sandboxes.
              </p>

              {/* Buttons: Centered on mobile (justify-center), Left on Tablet+ (md:justify-start) */}
              <div className="mt-10 flex flex-wrap max-sm:justify-center md:justify-start gap-4">
                <button 
                  onClick={() => {
                    const coursesSection = document.getElementById('courses');
                    coursesSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-[#00ff9d] text-black font-bold rounded-none skew-x-[-15deg] hover:bg-white transition-all group"
                >
                  <span className="inline-block skew-x-[15deg] group-hover:scale-110 transition-transform">
                    EXPLORE COURSES
                  </span>
                </button>
                <button 
                  onClick={() => {
                    window.location.href = '/contact';
                  }}
                  className="px-8 py-4 border border-white/10 hover:border-[#00ff9d] transition-colors rounded-none skew-x-[-15deg] group"
                >
                  <span className="inline-block skew-x-[15deg] text-white/70 group-hover:text-[#00ff9d]">
                    CONTACT US
                  </span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visuals */}
          <div className="w-full md:col-span-5 relative mt-8 md:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative max-w-md mx-auto md:max-w-none"
            >
              <div className="absolute -inset-10 bg-[#00ff9d10] blur-[100px] rounded-full animate-pulse" />
              <Terminal />
              
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-2 sm:-right-4 p-3 sm:p-4 bg-black/80 border border-white/10 backdrop-blur-md rounded-lg font-mono text-[9px] sm:text-[10px] text-left"
              >
                <div className="text-[#00ff9d] mb-1 tracking-tighter sm:tracking-normal">EXPLOIT_PAYLOAD</div>
                <div className="text-white/40">Status: <span className="text-white font-bold">READY</span></div>
              </motion.div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;