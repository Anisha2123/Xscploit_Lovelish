import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Terminal,
  Shield,
  Globe,
  Flag,
  Server,
  ArrowUpRight,
  Sparkles,
  Zap
} from "lucide-react";

const labs = [
  {
    title: "Offensive Security",
    subtitle: "Red Team",
    icon: Terminal,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    gradient: "from-red-500/20 to-orange-500/20",
    accentColor: "#ef4444",
    badge: "Attack"
  },
  {
    title: "Defense & SOC",
    subtitle: "Blue Team",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1200",
    gradient: "from-blue-500/20 to-cyan-500/20",
    accentColor: "#3b82f6",
    badge: "Defend"
  },
  {
    title: "Web Security",
    subtitle: "OWASP",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
    gradient: "from-purple-500/20 to-pink-500/20",
    accentColor: "#a855f7",
    badge: "Exploit"
  },
  {
    title: "CTF Challenges",
    subtitle: "Problem Solving",
    icon: Flag,
    image: "https://images.unsplash.com/photo-1510511459019-5dee99c4859d?auto=format&fit=crop&q=80&w=1200",
    gradient: "from-yellow-500/20 to-amber-500/20",
    accentColor: "#f59e0b",
    badge: "Compete"
  },
  {
    title: "Infrastructure",
    subtitle: "Network & Cloud",
    icon: Server,
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=1200",
    gradient: "from-emerald-500/20 to-teal-500/20",
    accentColor: "#10b981",
    badge: "Scale"
  },
];

export default function LabsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState<{ [key: number]: boolean }>({});

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative py-10 card bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden"
    >
      {/* Ultra-Modern Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div 
          style={{ y }}
          className="absolute top-20 -left-40 w-[600px] h-[600px] bg-[#00ff9d] opacity-10 rounded-full blur-[140px]"
        />
        <motion.div 
          style={{ y: useTransform(y, v => -v) }}
          className="absolute bottom-20 -right-40 w-[600px] h-[600px] bg-purple-500 opacity-10 rounded-full blur-[140px]"
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00ff9d] rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * 800,
              opacity: 0 
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        {/* Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#00ff9d]/30 bg-gradient-to-r from-[#00ff9d]/10 via-transparent to-[#00ff9d]/10 backdrop-blur-xl mb-8 shadow-lg shadow-[#00ff9d]/10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={18} className="text-[#00ff9d]" />
            </motion.div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase bg-gradient-to-r from-[#00ff9d] to-cyan-400 bg-clip-text text-transparent">
              Lab Ecosystem
            </span>
          </motion.div>

          {/* Title */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-none">
            <motion.span 
              className="block relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="relative z-10 bg-gradient-to-r from-[#00ff9d] via-cyan-400 to-[#00ff9d] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                TRAIN LIKE PROS
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#00ff9d]/20 to-cyan-400/20 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.span>
          </h2>
        </motion.div>

        {/* Premium Cards Grid */}
        <div className="grid max-md:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8">
          {labs.map((lab, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.7, 
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ y: -12, scale: 1.02 }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-black">
                
                {/* Image with Parallax */}
                <div className="absolute inset-0">
                  {!imageLoaded[i] && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
                  )}
                  
                  <motion.img
                    src={lab.image}
                    alt={lab.title}
                    loading="lazy"
                    onLoad={() => setImageLoaded(prev => ({ ...prev, [i]: true }))}
                    className={`w-full h-full object-cover transition-all duration-700
                      ${imageLoaded[i] ? "opacity-100" : "opacity-0"}
                    `}
                    animate={hoveredIndex === i ? { scale: 1.15 } : { scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />

                  {/* Multi-layer Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${lab.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                </div>

                {/* Animated Border on Hover */}
                <motion.div
                  className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${lab.accentColor}60, transparent 50%, ${lab.accentColor}60)`,
                    padding: "2px",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude"
                  }}
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  
                  {/* Top Section */}
                  <div className="flex items-start justify-between">
                    {/* Badge */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-xs font-bold uppercase tracking-wider"
                      style={{ color: lab.accentColor }}
                    >
                      {lab.badge}
                    </motion.div>

                    {/* Number */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                      className="w-14 h-14 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center text-xl font-black text-white"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </motion.div>
                  </div>

                  {/* Bottom Section */}
                  <div>
                    {/* Icon with Glow */}
                    <motion.div 
                      className="mb-6 relative inline-flex"
                      animate={hoveredIndex === i ? {
                        rotate: [0, -5, 5, 0],
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      <div 
                        className="w-20 h-20 rounded-2xl bg-black/80 backdrop-blur-xl border-2 flex items-center justify-center relative z-10"
                        style={{ borderColor: `${lab.accentColor}40` }}
                      >
                        <lab.icon size={36} style={{ color: lab.accentColor }} />
                      </div>
                      
                      {/* Icon Glow */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl blur-xl"
                        style={{ backgroundColor: lab.accentColor }}
                        animate={hoveredIndex === i ? {
                          opacity: [0.2, 0.5, 0.2],
                          scale: [1, 1.2, 1]
                        } : { opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.4 }}
                    >
                      <h3 className="text-3xl font-black text-white mb-2 tracking-tight">
                        {lab.title}
                      </h3>
                      <p 
                        className="text-sm font-semibold uppercase tracking-wider"
                        style={{ color: lab.accentColor }}
                      >
                        {lab.subtitle}
                      </p>
                    </motion.div>

                    {/* Hover Arrow */}
                    <motion.div
                      className="mt-6 flex items-center gap-2"
                      animate={{
                        opacity: hoveredIndex === i ? 1 : 0,
                        x: hoveredIndex === i ? 0 : -10
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div 
                        className="w-12 h-12 rounded-full backdrop-blur-xl border-2 flex items-center justify-center"
                        style={{ 
                          borderColor: lab.accentColor,
                          backgroundColor: `${lab.accentColor}20`
                        }}
                      >
                        <ArrowUpRight size={24} style={{ color: lab.accentColor }} />
                      </div>
                      {/* <span className="text-white text-sm font-bold uppercase tracking-wider">
                        Explore
                      </span> */}
                    </motion.div>

                    {/* Progress Bar */}
                    <motion.div 
                      className="mt-6 h-1 bg-white/10 rounded-full overflow-hidden"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 + 0.5 }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: lab.accentColor }}
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: i * 0.1 + 0.6 }}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Scanning Line Effect */}
                <motion.div
                  animate={{
                    y: hoveredIndex === i ? ['-100%', '200%'] : '-100%',
                  }}
                  transition={{
                    duration: 2,
                    repeat: hoveredIndex === i ? Infinity : 0,
                    ease: "linear"
                  }}
                  className="absolute inset-0 w-full h-32"
                  style={{
                    background: `linear-gradient(to bottom, transparent, ${lab.accentColor}40, transparent)`
                  }}
                />

                {/* Corner Accents */}
                <motion.div
                  className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 rounded-tr-[2rem] transition-all duration-500"
                  style={{ 
                    borderColor: hoveredIndex === i ? `${lab.accentColor}60` : 'transparent'
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 rounded-bl-[2rem] transition-all duration-500"
                  style={{ 
                    borderColor: hoveredIndex === i ? `${lab.accentColor}60` : 'transparent'
                  }}
                />
              </div>

              {/* External Glow */}
              <motion.div
                className="absolute inset-0 -z-10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: `${lab.accentColor}30` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats - Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 flex flex-wrap items-center justify-center gap-12"
        >
          {[
            { value: "500+", label: "Labs" },
            { value: "2.8K+", label: "CVEs" },
            { value: "12K+", label: "Users" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl font-black bg-gradient-to-r from-[#00ff9d] to-cyan-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}