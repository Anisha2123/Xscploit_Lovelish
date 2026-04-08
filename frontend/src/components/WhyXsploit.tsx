import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Terminal, Lock, Zap, Code, Database, Network, Eye, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";

const items = [
  {
    id: "DATA_01",
    title: "Live Exploit Labs",
    desc: "Execute real attacks inside isolated environments designed to mirror production systems.",
    icon: <Terminal size={28} />,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=1200",
    color: "#00ff9d",
    gridClass: "md:col-span-2 col-span-1",
    features: ["Isolated Environment", "Production Mirror", "Safe Testing"]
  },
  {
    id: "DATA_02",
    title: "Real CVE Attacks",
    desc: "Exploit vulnerabilities mapped to real CVEs used by attackers in the wild.",
    icon: <Shield size={28} />,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
    color: "#00f2ff",
    gridClass: "md:col-span-1 col-span-1",
    features: ["Real CVE Database", "Wild Exploits", "Updated Daily"]
  },
  {
    id: "DATA_03",
    title: "Resume Projects",
    desc: "Hands-on reports and attack chains you can confidently present in interviews.",
    icon: <Code size={28} />,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
    color: "#a855f7",
    gridClass: "md:col-span-1 col-span-1",
    features: ["Professional Reports", "Attack Chains", "Interview Ready"]
  },
  {
    id: "DATA_04",
    title: "Applied Certification",
    desc: "Proof of applied security skills — verifiable proof of technical dominance.",
    icon: <Lock size={28} />,
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1200",
    color: "#f59e0b",
    gridClass: "md:col-span-2 col-span-1",
    features: ["Verified Skills", "Industry Recognized", "Portfolio Boost"]
  },
];

const features = [
  { icon: <Zap size={22} />, label: "Real-Time Labs", value: "500+", color: "from-[#00ff9d] to-cyan-400" },
  { icon: <Database size={22} />, label: "CVE Database", value: "2.8K+", color: "from-cyan-400 to-blue-400" },
  { icon: <Network size={22} />, label: "Attack Vectors", value: "150+", color: "from-blue-400 to-purple-400" },
  { icon: <Eye size={22} />, label: "Active Users", value: "12K+", color: "from-purple-400 to-pink-400" },
];

const WhyXsploit = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState<{ [key: number]: boolean }>({});

  return (
    <section ref={containerRef} className="relative bg-gradient-to-b from-black via-gray-950 to-black py-32 overflow-hidden">
      {/* Ultra-Modern Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div 
          style={{ y }}
          className="absolute top-20 -left-40 w-[600px] h-[600px] bg-[#00ff9d] opacity-15 rounded-full blur-[140px]" 
        />
        <motion.div 
          style={{ y: useTransform(y, v => -v) }}
          className="absolute bottom-20 -right-40 w-[600px] h-[600px] bg-cyan-500 opacity-15 rounded-full blur-[140px]" 
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00ff9d] rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * 600,
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

      <motion.div style={{ opacity }} className="relative max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#00ff9d]/30 bg-gradient-to-r from-[#00ff9d]/10 via-cyan-500/5 to-[#00ff9d]/10 backdrop-blur-xl mb-8 shadow-lg shadow-[#00ff9d]/10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={18} className="text-[#00ff9d]" />
            </motion.div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[#00ff9d] to-cyan-400 bg-clip-text text-transparent">
              Why Choose Xsploit
            </span>
          </motion.div>

          {/* Title */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter mb-8 leading-none">
            <motion.span 
              className="block mb-3 text-white/90"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              BUILT LIKE A
            </motion.span>
            <motion.span 
              className="block relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span className="relative z-10 bg-gradient-to-r from-[#00ff9d] via-cyan-400 to-[#00ff9d] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                REAL SECURITY LAB
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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-400 max-w-3xl mx-auto mb-12"
          >
            Experience authentic penetration testing with real-world scenarios, CVE exploits, and industry-grade tools
          </motion.p>

          {/* Stats Bar - Premium Design */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative"
              >
                <div className="relative flex items-center gap-4 px-6 py-4 bg-gradient-to-br from-gray-900/60 to-black/60 border border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden">
                  {/* Glow on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#00ff9d]/0 to-cyan-500/0 group-hover:from-[#00ff9d]/10 group-hover:to-cyan-500/10 transition-all duration-500"
                  />

                  {/* Icon with gradient border */}
                  <div className={`relative p-3 rounded-xl bg-gradient-to-br ${feature.color} p-[2px]`}>
                    <div className="w-full h-full rounded-xl bg-black/90 flex items-center justify-center text-white">
                      {feature.icon}
                    </div>
                  </div>

                  <div className="relative text-left">
                    <div className={`text-2xl sm:text-3xl font-black font-mono bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                      {feature.value}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                      {feature.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid - Bento Box Layout */}
        <div className="grid max-md:grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.7, 
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={`${item.gridClass} group relative bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-black/60 rounded-3xl border border-white/5 hover:border-[#00ff9d]/50 transition-all duration-500 overflow-hidden backdrop-blur-sm`}
            >
              {/* Animated Border Gradient */}
              <motion.div 
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${item.color}40, transparent 50%, ${item.color}40)`,
                  padding: "1px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude"
                }}
              />

              {/* Glow Effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-[#00ff9d]/0 via-[#00ff9d]/0 to-[#00ff9d]/0 group-hover:from-[#00ff9d]/10 group-hover:via-transparent group-hover:to-cyan-500/10 transition-all duration-500 pointer-events-none rounded-3xl"
                animate={hoveredIndex === i ? {
                  background: [
                    "radial-gradient(circle at 0% 0%, rgba(0,255,157,0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 100%, rgba(0,255,157,0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 0% 0%, rgba(0,255,157,0.1) 0%, transparent 50%)"
                  ]
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Image Section */}
              <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-3xl bg-black/80">
                {/* Loading Skeleton */}
                {!imageLoaded[i] && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
                )}

                {/* Image with Parallax */}
                <motion.img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  onLoad={() => setImageLoaded(prev => ({ ...prev, [i]: true }))}
                  className={`w-full h-full object-cover transition-all duration-700
                    ${imageLoaded[i] ? "opacity-100" : "opacity-0"}
                  `}
                  animate={hoveredIndex === i ? { scale: 1.15 } : { scale: 1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />

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
                  className="absolute inset-0 w-full h-32 bg-gradient-to-b from-transparent via-[#00ff9d]/20 to-transparent"
                />

                {/* Icon Badge - Premium */}
                <motion.div 
                  animate={{
                    scale: hoveredIndex === i ? 1.1 : 1,
                    rotate: hoveredIndex === i ? 360 : 0,
                  }}
                  transition={{ duration: 0.6 }}
                  className="absolute top-6 left-6 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 shadow-lg"
                  style={{ 
                    color: item.color,
                    boxShadow: hoveredIndex === i ? `0 0 30px ${item.color}40` : 'none'
                  }}
                >
                  {item.icon}
                </motion.div>

                {/* Number Badge */}
                <div className="absolute top-6 right-6 w-14 h-14 flex items-center justify-center rounded-xl bg-black/80 backdrop-blur-md border border-white/20 font-mono text-white font-black text-lg shadow-lg">
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Feature Pills */}
                <div className="absolute bottom-4 left-6 right-6 flex flex-wrap gap-2">
                  {item.features.slice(0, 2).map((feat, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + idx * 0.05 }}
                      className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-white"
                    >
                      {feat}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Content Section */}
              <div className="relative p-6 sm:p-8">
                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight group-hover:text-[#00ff9d] transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* Feature Checklist */}
                <div className="space-y-2 mb-6">
                  {item.features.map((feat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + idx * 0.05 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CheckCircle2 size={16} className="text-[#00ff9d]" />
                      <span className="text-gray-500">{feat}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden mb-4">
                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ 
                      background: `linear-gradient(90deg, ${item.color}, ${item.color}80)` 
                    }}
                  />
                </div>

                {/* Hover Indicator */}
                {/* <motion.div
                  animate={{
                    opacity: hoveredIndex === i ? 1 : 0,
                    x: hoveredIndex === i ? 0 : -10,
                  }}
                  className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider"
                  style={{ color: item.color }}
                >
                  <span>Explore</span>
                  <ArrowRight size={18} />
                </motion.div> */}
              </div>

              {/* Corner Accents */}
              <motion.div 
                className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 rounded-tr-3xl transition-all duration-500"
                style={{ 
                  borderColor: hoveredIndex === i ? `${item.color}60` : 'transparent'
                }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 rounded-bl-3xl transition-all duration-500"
                style={{ 
                  borderColor: hoveredIndex === i ? `${item.color}60` : 'transparent'
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section - Ultra Modern */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 relative"
        >
          <div className="relative p-10 sm:p-12 lg:p-16 bg-gradient-to-br from-gray-900/60 via-black/40 to-gray-900/60 border border-[#00ff9d]/20 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl">
            
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#00ff9d]/5 via-transparent to-cyan-500/5"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00ff9d] to-cyan-400 p-[2px] mb-6"
              >
                <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center">
                  <Shield size={32} className="text-[#00ff9d]" />
                </div>
              </motion.div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                Designed for Real-World Offensive Security
              </h3>
              
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8">
                Every lab behaves like a real target. Experience the authentic challenge 
                of penetration testing without the legal risks.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                {["Authentic Scenarios", "Zero Legal Risk", "Industry Standard"].map((badge, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + i * 0.05 }}
                    className="px-5 py-2.5 bg-[#00ff9d]/10 border border-[#00ff9d]/30 rounded-full text-sm font-semibold text-[#00ff9d]"
                  >
                    <CheckCircle2 size={14} className="inline mr-2" />
                    {badge}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#00ff9d]/20 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#00ff9d]/20 rounded-br-3xl" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WhyXsploit;