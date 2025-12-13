import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Terminal, Flag } from "lucide-react";

const Labs: React.FC = () => {
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
  <section className="relative py-32 bg-[#080b0e] text-white overflow-hidden">
    {/* ASCII floating canvas */}
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-20 pointer-events-none"
    />

    <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-1 gap-20 items-start">
      
      {/* LEFT CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs tracking-widest uppercase text-[#7ff7c9]">
          Practical Training
        </span>

        <h2 className="mt-4 text-3xl sm:text-4xl font-semibold leading-tight">
          Learn in a
          <span className="block text-[#00ff9d]">
            Real Cyber Lab Environment
          </span>
        </h2>

        <p className="mt-6 text-gray-400 max-w-md leading-relaxed">
          Xsploit is built around hands-on execution. Every concept is practiced
          inside controlled environments that mirror real-world attack and
          defense scenarios.
        </p>

        {/* metrics */}
        <div className="mt-10 flex gap-10 text-sm text-gray-400">
          <div>
            <p className="text-white font-medium">50+</p>
            <p>Live Labs</p>
          </div>
          <div>
            <p className="text-white font-medium">Real CVEs</p>
            <p>Industry Attacks</p>
          </div>
          <div>
            <p className="text-white font-medium">Hands-on</p>
            <p>Skill First</p>
          </div>
        </div>
      </motion.div>

      {/* RIGHT STACKED LABS */}
      <div className="space-y-6">
        {[
          {
            icon: ShieldCheck,
            title: "Attack & Defense Labs",
            desc:
              "Simulate real attack paths and defensive countermeasures used by SOC and red teams.",
          },
          {
            icon: Terminal,
            title: "Virtual Machine Labs",
            desc:
              "Pre-configured vulnerable machines for safe exploit testing and payload execution.",
          },
          {
            icon: Flag,
            title: "CTF Challenges",
            desc:
              "Progressive capture-the-flag challenges to build analytical and offensive thinking.",
          },
        ].map((lab, i) => {
          const Icon = lab.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group flex gap-5 p-6 rounded-2xl bg-[#0b0f14] border border-white/5 hover:border-[#00ff9d40] transition"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#00ff9d14] text-[#00ff9d] flex items-center justify-center">
                <Icon size={20} />
              </div>

              <div>
                <h3 className="text-white font-medium">
                  {lab.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {lab.desc}
                </p>
              </div>

              {/* subtle hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-[0_0_40px_-18px_#00ff9d]" />
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

};

export default Labs;
