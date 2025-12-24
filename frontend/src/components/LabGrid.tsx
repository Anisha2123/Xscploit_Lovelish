
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Shield,
  Globe,
  Flag,
  Server
} from "lucide-react";

const labs = [
  {
    title: "Offensive Security Labs",
    icon: Terminal,
    meta: "Red Team / Exploitation",
    image: "/images/labs/redteam.png",
    desc:
      "Simulate real attack chains including privilege escalation, persistence, and lateral movement in controlled environments.",
  },
  {
    title: "Defensive & SOC Labs",
    icon: Shield,
    meta: "Blue Team / Detection",
    image: "/images/labs/blueteam.png",
    desc:
      "Detect, analyze, and respond to simulated intrusions using real-world incident response workflows.",
  },
  {
    title: "Web Security Labs",
    icon: Globe,
    meta: "OWASP / AppSec",
    image: "/images/labs/websecuritylab.png",
    desc:
      "Exploit and secure modern web applications based on real-world vulnerability patterns.",
  },
  {
    title: "CTF & Skill Validation",
    icon: Flag,
    meta: "Problem Solving",
    image: "images/labs/ps.png",
    desc:
      "Progressive challenges designed to validate real-world security thinking under pressure.",
  },
  {
    title: "Infrastructure & Network Labs",
    icon: Server,
    meta: "Network / Cloud",
    image: "/images/labs/net.png",
    desc:
      "Enterprise-grade infrastructure simulations covering misconfigurations, firewall bypasses, and cloud attack paths.",
  },
];

export default function LabsGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
      // Floating ASCII characters animation
      useEffect(() => {
        const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const resizeCanvas = () => {
      const section = canvas.parentElement;
      canvas.width = window.innerWidth;
      canvas.height = section ? section.offsetHeight : window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
        const particles = Array.from({ length: 150 }).map(() => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          char: chars[Math.floor(Math.random() * chars.length)],
          speed: 0.5 + Math.random() * 1.5,
          size: 12 + Math.random() * 8,
        }));
    
        let animationFrame: number;
    
        const draw = () => {
          ctx.fillStyle = "#080b0e"; // Dark background
          ctx.fillRect(0, 0, canvas.width, canvas.height);
    
          ctx.fillStyle = "#00ff9d"; // Neon green
          ctx.font = "bold 14px monospace";
    
          particles.forEach((p) => {
            ctx.fillText(p.char, p.x, p.y);
            p.y += p.speed;
            if (p.y > canvas.height) {
              p.y = -10;
              p.x = Math.random() * canvas.width;
              p.char = chars[Math.floor(Math.random() * chars.length)];
            }
          });
    
          animationFrame = requestAnimationFrame(draw);
        };
    
        draw();
    
        return () => {
          cancelAnimationFrame(animationFrame);
          window.removeEventListener("resize", resizeCanvas);
        };
      }, []);
  return (
    <section className="relative py-15 bg-[#080b0e] text-white overflow-hidden">
    {/* ASCII floating canvas */}
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-20 pointer-events-none"
    />
   
  {/* subtle background grid */}
  <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:60px_60px]" />
    
  <div className="relative z-10 max-w-7xl mx-auto px-6">
    
     {/* Header */}
    <div className="max-w-3xl mb-16 sm:mb-12">
      <span className="text-xs tracking-widest uppercase text-[#7ff7c9]">
        Lab Ecosystem
      </span>
      <h2 className="mt-4 text-4xl font-semibold leading-tight">
        Immersive Cyber
        <span className="block text-[#00ff9d]">
          Training Environments
        </span>
      </h2>
      <p className="mt-6 text-gray-400 leading-relaxed max-w-2xl">
        Carefully designed labs that feel less like exercises and more like
        real-world security operations.
      </p>
    </div>

    {/* Labs Grid */}
    <div className="flex flex-wrap justify-center gap-10">
  {labs.map((lab, i) => (
    <div key={i}>
      {/* YOUR CARD COMPONENT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.08 }}
        className="group relative sm:h-60 sm:w-90 max-sm:h-50 max-sm:w-75 rounded-3xl border border-white/5 
                   bg-gradient-to-br from-[#0b0f14] to-[#07090c]
                   p-8 hover:-translate-y-2 transition-all duration-300"
      >
        {/* Background Image */}
        <div
          className="absolute rounded-3xl inset-0 bg-cover bg-center scale-100
                     hover:scale-110 transition-transform duration-700"
          style={{ backgroundImage: `url(${lab.image})` }}
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-[#080b0e]/65" />

        {/* big index number */}
        <div className="absolute top-6 right-6 text-6xl font-bold 
                        text-white/10 select-none z-10">
          {String(i + 1).padStart(2, "0")}
        </div>

        {/* hover glow */}
        <div className="absolute inset-0 rounded-3xl opacity-0 
                        group-hover:opacity-100 transition 
                        shadow-[0_0_70px_-22px_#00ff9d]" />

        {/* CONTENT */}
        <div className="relative z-10">
          {/* icon */}
          <div className="w-14 h-14 rounded-2xl bg-[#00ff9d14] 
                          text-[#00ff9d] flex items-center justify-center mb-8">
            <lab.icon size={26} />
          </div>

          <p className="text-xs uppercase tracking-widest text-[#7ff7c9] mb-3">
            {lab.meta}
          </p>

          <h3 className="text-xl font-medium mb-4">
            {lab.title}
          </h3>

          <div className="mt-8 h-[1px] w-0 bg-[#00ff9d] 
                          group-hover:w-1/2 transition-all duration-500" />
        </div>
      </motion.div>
    </div>
  ))}
</div>

  </div>
</section>

  );
}
