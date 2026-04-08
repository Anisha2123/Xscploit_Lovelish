import React, { useState, useRef, useEffect } from "react";
import { Cpu, Network, Globe, Brain, Bug, Clock, TrendingUp, Sparkles, ArrowRight, Star, Zap, Shield, Loader2 } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import "../App.css";
import OfflineTrainingSection from "./OfflineTraining";

// Icon map based on slug
const iconMap: Record<string, React.ReactNode> = {
  "ceh-002": <Cpu size={42} />,
  "network-pentest-003": <Network size={42} />,
  "web-pentest-004": <Globe size={42} />,
  "ai-hacking-006": <Brain size={42} />,
  "bug-bounty-007": <Bug size={42} />,
};

const imageMap: Record<string, string> = {
  "ceh-002": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
  "network-pentest-003": "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800",
  "web-pentest-004": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
  "ai-hacking-006": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  "bug-bounty-007": "https://images.unsplash.com/photo-1510511459019-5dee99c4859d?auto=format&fit=crop&q=80&w=800",
};

const trendingSlugs = ["ceh-002", "web-pentest-004", "ai-hacking-006"];

const featuresMap: Record<string, string[]> = {
  "ceh-002": ["Live Labs", "Certification", "Job Ready"],
  "network-pentest-003": ["Hands-On", "Real Tools", "24/7 Support"],
  "web-pentest-004": ["OWASP Top 10", "Bug Bounty", "Real Sites"],
  "ai-hacking-006": ["AI Tools", "Automation", "Future-Ready"],
  "bug-bounty-007": ["Earn Money", "Real Bugs", "Portfolio"],
};

// Format price from number → ₹XX,XXX
const formatPrice = (price: number) =>
  `₹${price.toLocaleString("en-IN")}`;

// Derive discount percentage
const getDiscount = (regular: number, launch: number) =>
  Math.round(((regular - launch) / regular) * 100);

interface Course {
  _id: string;
  name: string;
  shortDescription: string;
  duration: string;
  regularPrice: number;
  launchPrice: number;
  installment: string;
  slug: string;
  modules: any[];
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [filter, setFilter] = useState("All");
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({});
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/courses`);

        // Check if response is HTML (error page) instead of JSON
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.warn('Backend not available, using fallback data');
          // Use fallback static data if backend is not available
          setCourses(fallbackCourses);
          setError(null);
          setLoading(false);
          return;
        }

        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data: Course[] = await res.json();
        setCourses(data.length > 0 ? data : fallbackCourses);
      } catch (err: any) {
        console.warn('Failed to fetch courses from backend, using fallback:', err.message);
        // Use fallback data on error
        setCourses(fallbackCourses);
        setError(null); // Don't show error to user, just use fallback
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Fallback static course data
  const fallbackCourses: Course[] = [
  {
    _id: '69d3d6ea6976a7a47c4aa2cd',
    name: 'Ethical Hacking (Core)',
    shortDescription: 'Master ethical hacking with practical techniques, reconnaissance, exploitation, and defense.',
    duration: '2-3 Months',
    regularPrice: 24999,
    launchPrice: 17999,
    installment: '6000 x 3',
    slug: 'ceh-002',
    modules: new Array(20).fill({ title: "Module", pdfUrl: "" }), // mock 20 modules
  },
  {
    _id: '69d3d6ff6976a7a47c4aa2cf',
    name: 'Networking for Hackers',
    shortDescription: 'Learn networking, subnetting, scanning, and exploitation fundamentals.',
    duration: '1 Month',
    regularPrice: 7999,
    launchPrice: 4999,
    installment: '2500 x 2',
    slug: 'network-pentest-003',
    modules: new Array(6).fill({ title: "Module", pdfUrl: "" }), // mock 6 modules
  },
  {
    _id: '69d3d7136976a7a47c4aa2d1',
    name: 'Web Application Penetration Testing',
    shortDescription: 'Test, exploit & fix vulnerabilities like SQLi, XSS & Auth bypass.',
    duration: '2 Months',
    regularPrice: 19999,
    launchPrice: 14999,
    installment: '5000 x 3',
    slug: 'web-pentest-004',
    modules: new Array(13).fill({ title: "Module", pdfUrl: "" }), // mock 13 modules
  }
];

  // Level derived from duration heuristically
  const getLevel = (duration: string) => {
    if (duration.includes("1")) return "Beginner";
    if (duration.includes("5") || duration.includes("6")) return "Pro";
    return "Intermediate";
  };

  const visibleCourses = showMore ? courses : courses.slice(0, 3);

  const handleImageLoad = (slug: string) => {
    setImageLoaded((prev) => ({ ...prev, [slug]: true }));
  };

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="relative py-12 px-6 bg-gradient-to-b from-black via-gray-950 to-black text-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute top-20 -left-40 w-[600px] h-[600px] bg-[#00ff9d] opacity-20 rounded-full blur-[140px]"
        />
        <motion.div
          style={{ y: useTransform(y, (v) => -v) }}
          className="absolute bottom-20 -right-40 w-[600px] h-[600px] bg-cyan-500 opacity-20 rounded-full blur-[140px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#00ff9d] rounded-full"
              initial={{ x: Math.random() * 1400, y: Math.random() * 800, opacity: 0 }}
              animate={{ y: [null, -100], opacity: [0, 1, 0] }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
            />
          ))}
        </div>
      </div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-md:mb-10 md:mb-24"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#00ff9d]/30 bg-gradient-to-r from-[#00ff9d]/10 via-cyan-500/5 to-[#00ff9d]/10 backdrop-blur-xl mb-8 shadow-lg shadow-[#00ff9d]/10"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
              <Sparkles size={18} className="text-[#00ff9d]" />
            </motion.div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[#00ff9d] to-cyan-400 bg-clip-text text-transparent">
              Elite Training Programs
            </span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-[#00ff9d] text-[#00ff9d]" />
              ))}
            </div>
          </motion.div>

          <h2 className="max-sm:text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter md:mb-8 leading-none">
            <motion.span
              className="block sm:inline max-sm:mb-2 text-white/90"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              MASTER{" "}
            </motion.span>
            <motion.span
              className="block sm:inline relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span className="relative z-10 bg-gradient-to-r from-[#00ff9d] via-cyan-400 to-[#00ff9d] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                CYBERSECURITY
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#00ff9d]/20 to-cyan-400/20 blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.span>
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-3 max-md:mb-10 md:mb-20 flex-wrap"
        >
          {["All", "Beginner", "Intermediate", "Pro"].map((tab, i) => (
            <motion.button
              key={tab}
              onClick={() => setFilter(tab)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all overflow-hidden group
                ${filter === tab
                  ? "bg-gradient-to-r from-[#00ff9d] to-cyan-400 text-black shadow-lg shadow-[#00ff9d]/30"
                  : "bg-black/40 text-white/60 border border-white/10 backdrop-blur-sm hover:border-[#00ff9d]/50 hover:text-white"
                }`}
            >
              {filter === tab && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab}
                {filter === tab && <Zap size={14} />}
              </span>
              {filter !== tab && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#00ff9d]/10 to-cyan-400/10"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 size={48} className="text-[#00ff9d]" />
            </motion.div>
            <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">Loading Courses...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Shield size={48} className="text-red-400" />
            <p className="text-red-400 font-mono text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 border border-red-400/30 text-red-400 text-sm font-mono hover:bg-red-400/10 transition-colors rounded-lg"
            >
              RETRY
            </button>
          </div>
        )}

        {/* Courses Grid */}
        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {visibleCourses
                .filter((c) => filter === "All" || getLevel(c.duration) === filter)
                .map((course, index) => {
                  const level = getLevel(course.duration);
                  const icon = iconMap[course.slug] ?? <Cpu size={42} />;
                  const image = imageMap[course.slug] ?? "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800";
                  const features = featuresMap[course.slug] ?? ["Hands-On", "Certified", "Expert"];
                  const isTrending = trendingSlugs.includes(course.slug);
                  const discount = getDiscount(course.regularPrice, course.launchPrice);

                  return (
                    <motion.div
                      key={course._id}
                      initial={{ opacity: 0, y: 50, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -8 }}
                      onHoverStart={() => setHoveredCourse(course.slug)}
                      onHoverEnd={() => setHoveredCourse(null)}
                      className="group relative bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-black/60 rounded-3xl border border-white/5 
                                 hover:border-[#00ff9d]/50 transition-all duration-500 overflow-hidden backdrop-blur-sm"
                    >
                      {/* Animated Border */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: "linear-gradient(135deg, #00ff9d 0%, cyan 50%, #00ff9d 100%)",
                          padding: "1px",
                          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                          WebkitMaskComposite: "xor",
                          maskComposite: "exclude",
                        }}
                      />

                      {/* Glow */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-[#00ff9d]/0 via-[#00ff9d]/0 to-[#00ff9d]/0 
                                    group-hover:from-[#00ff9d]/10 group-hover:via-transparent group-hover:to-cyan-500/10 
                                    transition-all duration-500 pointer-events-none rounded-3xl"
                        animate={hoveredCourse === course.slug ? {
                          background: [
                            "radial-gradient(circle at 0% 0%, rgba(0,255,157,0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 100% 100%, rgba(0,255,157,0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 0% 0%, rgba(0,255,157,0.1) 0%, transparent 50%)",
                          ],
                        } : {}}
                        transition={{ duration: 3, repeat: Infinity }}
                      />

                      {/* Trending Badge */}
                      {isTrending && (
                        <motion.div
                          initial={{ x: -100, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                          className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-bold text-white shadow-lg shadow-orange-500/50"
                        >
                          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>🔥</motion.div>
                          TRENDING
                        </motion.div>
                      )}

                      {/* Image */}
                      <div className="relative w-full h-64 overflow-hidden rounded-t-3xl bg-black/80">
                        {!imageLoaded[course.slug] && (
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
                        )}
                        <motion.img
                          src={image}
                          alt={course.name}
                          loading="lazy"
                          onLoad={() => handleImageLoad(course.slug)}
                          className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded[course.slug] ? "opacity-100" : "opacity-0"}`}
                          animate={hoveredCourse === course.slug ? { scale: 1.15 } : { scale: 1 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />

                        {/* Level Badge */}
                        <motion.div
                          initial={{ x: 100, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                          className="absolute top-4 right-4 px-4 py-2 bg-black/80 backdrop-blur-md border border-[#00ff9d]/30 rounded-full font-mono text-xs tracking-wider text-[#00ff9d] shadow-lg"
                        >
                          {level.toUpperCase()}
                        </motion.div>

                        {/* Floating Icon */}
                        <motion.div
                          className="absolute bottom-4 left-4 text-[#00ff9d]"
                          animate={hoveredCourse === course.slug ? { y: [-5, 5, -5], rotate: [0, 5, -5, 0] } : {}}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <div className="w-16 h-16 opacity-30 group-hover:opacity-50 transition-opacity">{icon}</div>
                        </motion.div>

                        {/* Modules count */}
                        <div className="absolute bottom-4 right-4 flex items-center gap-3">
                          <div className="flex items-center gap-1 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-full">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-bold text-white">{course.modules?.length ?? 0} Modules</span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-7 relative">
                        <h3 className="text-xl font-black text-white mb-3 tracking-tight group-hover:text-[#00ff9d] transition-colors line-clamp-2">
                          {course.name.toUpperCase()}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed mb-5 line-clamp-2">
                          {course.shortDescription}
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {features.map((feature, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + i * 0.05 }}
                              className="px-3 py-1 bg-[#00ff9d]/10 border border-[#00ff9d]/20 rounded-full text-xs font-semibold text-[#00ff9d]"
                            >
                              {feature}
                            </motion.span>
                          ))}
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-5 mb-6 text-xs text-gray-500 font-mono">
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-[#00ff9d]" />
                            <span className="font-semibold">{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp size={16} className="text-cyan-400" />
                            <span className="font-semibold">{level}</span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-end justify-between mb-6">
                          <div className="flex flex-col gap-1">
                            <span className="text-gray-500 text-sm line-through font-mono">
                              {formatPrice(course.regularPrice)}
                            </span>
                            <div className="flex items-baseline gap-2">
                              <span className="text-white text-3xl font-black font-mono">
                                {formatPrice(course.launchPrice)}
                              </span>
                              <span className="text-xs text-[#00ff9d] font-bold bg-[#00ff9d]/10 px-2 py-0.5 rounded-full">
                                {discount}% OFF
                              </span>
                            </div>
                            {course.installment && (
                              <span className="text-xs text-gray-500 font-mono">
                                or ₹{course.installment} EMI
                              </span>
                            )}
                          </div>

                          {/* Launch Badge */}
                          <motion.div
                            className="relative"
                            animate={{ rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00ff9d] to-cyan-400 text-black text-xs font-black uppercase tracking-wider shadow-lg shadow-[#00ff9d]/30 relative overflow-hidden">
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{ x: ["-200%", "200%"] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <span className="relative z-10">🚀 LAUNCH</span>
                            </div>
                          </motion.div>
                        </div>

                        {/* CTA */}
                        <Link to={`/course/${course.slug}`}>
                          <motion.button
                            className="relative w-full py-4 bg-gradient-to-r from-[#00ff9d] to-cyan-400 text-black font-black text-sm tracking-wider uppercase overflow-hidden group/btn rounded-xl shadow-lg shadow-[#00ff9d]/30 hover:shadow-[#00ff9d]/50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              animate={{ x: ["-200%", "200%"] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="relative z-10 flex items-center justify-center gap-3">
                              <span>ENROLL NOW</span>
                              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                                <ArrowRight size={18} />
                              </motion.div>
                            </span>
                            <motion.div className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/20 transition-colors duration-300" />
                          </motion.button>
                        </Link>
                      </div>

                      {/* Corner Accents */}
                      <motion.div
                        className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-[#00ff9d]/0 group-hover:border-[#00ff9d]/40 transition-all duration-500 rounded-tr-3xl"
                        animate={hoveredCourse === course.slug ? { borderColor: ["rgba(0,255,157,0)", "rgba(0,255,157,0.4)", "rgba(0,255,157,0)"] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-[#00ff9d]/0 group-hover:border-[#00ff9d]/40 transition-all duration-500 rounded-bl-3xl"
                        animate={hoveredCourse === course.slug ? { borderColor: ["rgba(0,255,157,0)", "rgba(0,255,157,0.4)", "rgba(0,255,157,0)"] } : {}}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      />
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>
        )}

        {/* Load More */}
        {!loading && !error && !showMore && courses.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <motion.button
              onClick={() => setShowMore(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-12 py-5 bg-gradient-to-r from-gray-900 to-black border-2 border-[#00ff9d]/30 
                         hover:border-[#00ff9d] text-white font-bold text-sm tracking-wider uppercase 
                         rounded-full overflow-hidden group shadow-lg hover:shadow-[#00ff9d]/20 transition-all"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#00ff9d]/0 via-[#00ff9d]/20 to-[#00ff9d]/0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center gap-3">
                LOAD MORE COURSES
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                  <Sparkles size={16} />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>
        )}

        <OfflineTrainingSection />
      </motion.div>
    </section>
  );
};

export default Courses;