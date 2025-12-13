/* Enhanced Hacking Minimalist Hero

File: src/components/Hero.tsx
Type: React + TypeScript + TailwindCSS

This single file exports a default <Hero /> component and includes three internal subcomponents:
 - MatrixRain: canvas-based matrix code rain background
 - Terminal: fake terminal command line typing bar
 - HeroContent: decoding text + CTA buttons + animated scanner border

Install (if not already):
  npm install framer-motion

Tailwind: make sure tailwind is configured. Add "neon" color in tailwind.config.js if desired.

Usage:
 import Hero from "./components/Hero";
 // in App.tsx
 <Hero />

*/

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// ----------------------- MatrixRain -----------------------
const MatrixRain: React.FC<{ opacity?: number }> = ({ opacity = 0.18 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = innerWidth);
    let h = (canvas.height = innerHeight);

    const columns = Math.floor(w / 14);
    const drops: number[] = Array(columns).fill(0);

    const characters = "01ﾑﾘｻﾎﾇｺﾊｲｴｱｳｵｶｷｸｹｺｻﾁﾂﾃ" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let raf = 0;
    const draw = () => {
      if (!ctx) return;
      ctx.fillStyle = `rgba(0, 0, 0, ${0.08})`;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = `rgba(0, 255, 150, ${opacity})`;
      ctx.font = "12px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * 14;
        const y = drops[i] * 14;
        ctx.fillText(text, x, y);

        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      w = canvas.width = innerWidth;
      h = canvas.height = innerHeight;
      const newCols = Math.floor(w / 14);
      drops.length = newCols;
      for (let i = 0; i < newCols; i++) drops[i] = drops[i] || 0;
    };

    window.addEventListener("resize", onResize);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

// ----------------------- Terminal -----------------------
const Terminal: React.FC<{ lines?: string[] }> = ({
  lines = [
    "Initializing training modules...",
    "Loading labs: [█□□□□□□□□□] 10%",
    "Fetching lab images...",
    "Ready. Type 'start' to begin simulation.",
  ],
}) => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % lines.length);
    }, 2600);
    return () => clearInterval(t);
  }, [lines.length]);

  useEffect(() => {
    let p = 0;
    setProgress(0);
    const id = setInterval(() => {
      p += Math.floor(Math.random() * 8);
      setProgress((prev) => Math.min(100, prev + Math.floor(Math.random() * 12)));
      if (p > 100) {
        clearInterval(id);
      }
    }, 200);
    return () => clearInterval(id);
  }, [index]);

  return (
    <div className="mt-6 w-full bg-black/40 border border-[#00ff9d33] rounded-md p-3 text-left text-sm text-[#a9f7d1] font-mono">
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[#00ff9d] shadow-[0_0_8px_#00ff9d]" />
        <span className="text-[#9ef0c7]">training@xsploit:~$</span>
        <span className="ml-2 text-[#dfffe8]">{lines[index]}</span>
      </div>
      <div className="mt-2 w-full bg-[#052016] rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#00ff9d] to-[#00ffb0]"
          style={{ width: `${progress}%`, transition: "width 300ms linear" }}
        />
      </div>
    </div>
  );
};

// ----------------------- HeroContent -----------------------
const HeroContent: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-20 w-full"
    >
      <div className="mx-auto max-w-4xl text-center px-6">

        {/* status pill */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase text-[#8ef5c9] border border-[#00ff9d33]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
          Live Cyber Labs
        </span>

        {/* main headline */}
        <h1 className="mt-8 text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white">
          Learn <span className="text-[#00ff9d]">Ethical Hacking</span>
        </h1>

        {/* subtle divider */}
        <div className="mx-auto mt-6 h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-[#00ff9d] to-transparent opacity-70" />

        {/* professional sub-headline */}
        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-gray-400 leading-relaxed">
          Industry-designed cybersecurity training with real-world attack & defense
          simulations, SOC-level labs, and expert mentorship.
        </p>

        {/* info row */}
        <div className="mt-10 flex flex-wrap justify-center gap-10 text-sm text-gray-400">
          <div className="flex flex-col items-center">
            <span className="text-white font-medium">50+</span>
            <span>Hands-on Labs</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white font-medium">Beginner → Advanced</span>
            <span>Skill Levels</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white font-medium">Career Focused</span>
            <span>Job-Ready Training</span>
          </div>
        </div>

        {/* scroll hint */}
        <div className="mt-16 flex flex-col items-center text-xs tracking-widest uppercase text-[#7ff7c9] opacity-70">
          <span>Explore Labs</span>
          <span className="mt-2 animate-bounce">↓</span>
        </div>
      </div>

      {/* Terminal */}
      <div className="mt-0">
        <Terminal />
      </div>
    </motion.div>
  );
};


// ----------------------- Hero (Main Export) -----------------------
const Hero: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[680px] flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain opacity={0.14} />

      {/* soft vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black opacity-40 pointer-events-none" />

      {/* Scanner border (animated) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-30 w-[92%] max-w-5xl mx-auto"
      >
        <div className="relative">
          <motion.div
            className="absolute -inset-1 rounded-2xl pointer-events-none"
            animate={{ boxShadow: [
              "0 0 24px 2px rgba(0,255,157,0.12)",
              "0 0 44px 6px rgba(0,255,157,0.18)",
              "0 0 18px 2px rgba(0,255,157,0.10)",
            ] }}
            transition={{ repeat: Infinity, repeatType: "loop", duration: 3.4 }}
          />

          <div className="relative bg-black/50 backdrop-blur-md border border-[#0aff9d22] rounded-2xl p-8 md:p-12">
            <HeroContent />
          </div>
        </div>
      </motion.div>

      {/* subtle bottom code strip */}
      <div className="absolute bottom-6 left-6 right-6 z-10 opacity-60">
        <div className="font-mono text-xs text-[#7ff7c9] truncate">sudo launch --labs --mode=training --user=guest</div>
      </div>
    </section>
  );
};

export default Hero;

// Placeholder to prepare canvas.
