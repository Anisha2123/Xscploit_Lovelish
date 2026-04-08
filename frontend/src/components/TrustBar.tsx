import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Calendar, Users, Sparkles, Clock, Tag, TrendingUp, Zap, Star, Bell, Lock, ArrowRight, CheckCircle2, Gift } from "lucide-react";
import JanuaryOfferPromo from "./Promos/JanuaryOfferPromo";
import NewYearStickyBar from "./Promos/NewYearStickyBar";
import "../App.css";

const TrustShowcase = () => {
  const [loaded, setLoaded] = useState<{ [key: string]: boolean }>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [notifyEmail, setNotifyEmail] = useState("");
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const particles = useRef(
    [...Array(20)].map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 3,
    }))
  );

  const targetTime = useRef(
    new Date(Date.now() + 12 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 32 * 60 * 1000)
  );

  const formatTime = (ms: number) => {
    const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      days: String(days).padStart(2, "0"),
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0")
    };
  };

  const [timeLeft, setTimeLeft] = useState(
    formatTime(targetTime.current.getTime() - Date.now())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(formatTime(targetTime.current.getTime() - Date.now()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleImageLoad = (key: string) => {
    setLoaded(prev => ({ ...prev, [key]: true }));
  };

  const handleNotify = (course: string) => {
    // Handle notification signup
    console.log(`Notify for ${course}: ${notifyEmail}`);
    setNotifyEmail("");
  };

  return (
    <section ref={sectionRef} className="relative py-14 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Ultra-Modern Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div 
          style={{ y }}
          className="absolute top-20 -left-40 w-[500px] h-[500px] bg-[#00ff9d] opacity-15 rounded-full blur-[120px]"
        />
        <motion.div 
          style={{ y: useTransform(y, v => -v) }}
          className="absolute bottom-20 -right-40 w-[500px] h-[500px] bg-purple-500 opacity-15 rounded-full blur-[120px]"
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

        {/* Floating Particles */}
        {particles.current.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00ff9d] rounded-full"
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-6">
        <JanuaryOfferPromo />


        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* ================= WEBINAR CARD ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, scale: 1.02 }}
            onHoverStart={() => setHoveredCard("webinar")}
            onHoverEnd={() => setHoveredCard(null)}
            className="relative group"
          >
            <div className="relative bg-gradient-to-b from-red-950/20 via-gray-900/60 to-black/80 border border-red-500/20 rounded-3xl overflow-hidden backdrop-blur-sm h-[480px] flex flex-col shadow-xl">
              
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #ef4444 100%)",
                  padding: "1px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude"
                }}
              />

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/10 group-hover:via-transparent group-hover:to-pink-500/10 transition-all duration-500 pointer-events-none rounded-3xl"
              />

              {/* Top Badges */}
              <div className="relative z-10 flex items-center justify-between p-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-500/50"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🔴
                  </motion.div>
                  Live Webinar
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-red-500/30 text-xs"
                >
                  <Users size={14} className="text-red-400" />
                  <span className="text-gray-300">
                    Only <span className="text-red-400 font-bold">100 seats</span>
                  </span>
                </motion.div>
              </div>

              {/* Image Container */}
              <div className="relative h-52 bg-black/80 overflow-hidden">
                {!loaded.webinar && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
                )}
                
                <motion.img
                  src="/images/webinar.webp"
                  alt="webinar"
                  loading="eager"
                  onLoad={() => handleImageLoad("webinar")}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700
                    ${loaded.webinar ? "opacity-100" : "opacity-0"}
                  `}
                  animate={hoveredCard === "webinar" ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Live Pulse */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <motion.div
                    className="w-3 h-3 bg-red-500 rounded-full"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                    Live Soon
                  </span>
                </div>

                {/* Countdown Timer */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)]">
                  <div className="bg-black/80 backdrop-blur-xl border border-red-500/30 rounded-2xl p-4 shadow-2xl">
                    <div className="text-center mb-2">
                      <span className="text-xs text-gray-400 uppercase tracking-wider">Starts In</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: "Days", value: timeLeft.days },
                        { label: "Hours", value: timeLeft.hours },
                        { label: "Mins", value: timeLeft.minutes },
                        { label: "Secs", value: timeLeft.seconds }
                      ].map((unit, i) => (
                        <div key={i} className="text-center">
                          <motion.div
                            key={unit.value}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-2xl font-black font-mono text-red-400 mb-1"
                          >
                            {unit.value}
                          </motion.div>
                          <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                            {unit.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-black text-white mb-3 group-hover:text-red-400 transition-colors">
                  Getting Started with Ethical Hacking
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs font-semibold text-red-400">
                    Free Entry
                  </span>
                  <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs font-semibold text-red-400">
                    Certificate
                  </span>
                  <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs font-semibold text-red-400">
                    Q&A Session
                  </span>
                </div>

                <motion.button
                  disabled
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-auto w-full py-4 rounded-xl border border-red-500/30 text-sm font-bold text-gray-400 bg-black/40 backdrop-blur-sm cursor-not-allowed relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Lock size={16} />
                    Registration Opens Soon
                  </span>
                </motion.button>
              </div>

              {/* Corner Accents */}
              <motion.div
                className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-red-500/0 group-hover:border-red-500/40 transition-all duration-500 rounded-tr-3xl"
              />
            </div>
          </motion.div>

          {/* ================= ANDROID HACKING CARD ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, scale: 1.02 }}
            onHoverStart={() => setHoveredCard("android")}
            onHoverEnd={() => setHoveredCard(null)}
            className="relative group"
          >
            <div className="relative bg-gradient-to-b from-emerald-950/20 via-gray-900/60 to-black/80 border border-emerald-500/20 rounded-3xl overflow-hidden backdrop-blur-sm h-[480px] flex flex-col shadow-xl">
              
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, #10b981 0%, #059669 50%, #10b981 100%)",
                  padding: "1px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude"
                }}
              />

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:via-transparent group-hover:to-cyan-500/10 transition-all duration-500 pointer-events-none rounded-3xl"
              />

              {/* Top Badges */}
              <div className="relative z-10 flex items-center justify-between p-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-emerald-400"
                >
                  <Zap size={14} />
                  Launching Soon
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-emerald-500/30"
                >
                  <Tag size={14} className="text-emerald-400" />
                  <span className="text-sm font-bold text-white">₹2,999</span>
                </motion.div>
              </div>

              {/* Image Container */}
              <div className="relative h-52 bg-black/80 overflow-hidden">
                {!loaded.android && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
                )}
                
                <motion.img
                  src="/images/android-hacking.webp"
                  alt="Android Hacking"
                  loading="eager"
                  onLoad={() => handleImageLoad("android")}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700
                    ${loaded.android ? "opacity-100" : "opacity-0"}
                  `}
                  animate={hoveredCard === "android" ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.6 }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Early Bird Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -12 }}
                  whileInView={{ scale: 1, rotate: -12 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl text-xs font-black text-white shadow-lg shadow-yellow-500/50"
                >
                  🎁 50% OFF
                </motion.div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-black text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  Android Hacking
                </h3>

                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                  Master mobile penetration testing and app security analysis
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {["APK Analysis", "Reverse Engineering", "Real Exploits"].map((feature, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-400"
                    >
                      <CheckCircle2 size={12} className="inline mr-1" />
                      {feature}
                    </motion.span>
                  ))}
                </div>

                {/* Notify Me Form */}
                <div className="mt-auto space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-emerald-500/20 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                    <Bell size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />
                  </div>

                  <motion.button
                    onClick={() => handleNotify("android")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-xl cursor-not-allowed bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-shadow relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-200%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Notify Me
                      <ArrowRight size={16} />
                    </span>
                  </motion.button>
                </div>
              </div>

              {/* Corner Accents */}
              <motion.div
                className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-emerald-500/0 group-hover:border-emerald-500/40 transition-all duration-500 rounded-bl-3xl"
              />
            </div>
          </motion.div>

          {/* ================= KALI LINUX CARD ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, scale: 1.02 }}
            onHoverStart={() => setHoveredCard("kali")}
            onHoverEnd={() => setHoveredCard(null)}
            className="relative group"
          >
            <div className="relative bg-gradient-to-b from-blue-950/20 via-gray-900/60 to-black/80 border border-blue-500/20 rounded-3xl overflow-hidden backdrop-blur-sm h-[480px] flex flex-col shadow-xl">
              
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #3b82f6 100%)",
                  padding: "1px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude"
                }}
              />

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-transparent group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none rounded-3xl"
              />

              {/* Top Badges */}
              <div className="relative z-10 flex items-center justify-between p-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-blue-400"
                >
                  <TrendingUp size={14} />
                  Launching Soon
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-blue-500/30"
                >
                  <Tag size={14} className="text-blue-400" />
                  <span className="text-sm font-bold text-white">₹3,999</span>
                </motion.div>
              </div>

              {/* Image Container */}
              <div className="relative h-52 bg-black/80 overflow-hidden">
                {!loaded.kali && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
                )}
                
                <motion.img
                  src="/images/kali-linux.webp"
                  alt="Kali Linux"
                  loading="eager"
                  onLoad={() => handleImageLoad("kali")}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700
                    ${loaded.kali ? "opacity-100" : "opacity-0"}
                  `}
                  animate={hoveredCard === "kali" ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.6 }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Popular Badge */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-xs font-black text-white shadow-lg shadow-purple-500/50"
                >
                  <Star size={14} className="fill-white" />
                  Most Wanted
                </motion.div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors">
                  Kali Linux Mastery
                </h3>

                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                  Complete penetration testing toolkit and command-line mastery
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {["Tool Arsenal", "Red Team", "Expert Level"].map((feature, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-semibold text-blue-400"
                    >
                      <CheckCircle2 size={12} className="inline mr-1" />
                      {feature}
                    </motion.span>
                  ))}
                </div>

                {/* Notify Me Form */}
                <div className="mt-auto space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      className="w-full  px-4 py-3 rounded-xl bg-black/40 border border-blue-500/20 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                    <Bell size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />
                  </div>

                  <motion.button
                    onClick={() => handleNotify("kali")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 cursor-not-allowed rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0  bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-200%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get Early Access
                      <Gift size={16} />
                    </span>
                  </motion.button>
                </div>
              </div>

              {/* Corner Accents */}
              <motion.div
                className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-blue-500/0 group-hover:border-blue-500/40 transition-all duration-500 rounded-tr-3xl"
              />
            </div>
          </motion.div>

        </div>

        <NewYearStickyBar />
      </motion.div>
    </section>
  );
};

export default TrustShowcase;