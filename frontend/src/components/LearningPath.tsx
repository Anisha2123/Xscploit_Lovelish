import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    title: "Beginner",
    subtitle: "Foundations",
    desc: "Linux, networking, cybersecurity basics, command line mastery.",
    icon: "🎯",
  },
  {
    title: "Intermediate",
    subtitle: "Core Skills",
    desc: "Web hacking, networking attacks, OWASP Top 10, scripting.",
    icon: "⚡",
  },
  {
    title: "Advanced",
    subtitle: "Offensive Security",
    desc: "Exploitation, privilege escalation, malware basics, red teaming.",
    icon: "🔥",
  },
  {
    title: "Real-World Labs",
    subtitle: "Hands-On",
    desc: "Live attack & defense simulations on real environments.",
    icon: "🛡️",
  },
  {
    title: "Certification",
    subtitle: "Career Ready",
    desc: "Industry-aligned preparation with resume & interview guidance.",
    icon: "🏆",
  },
];

const LearningPath = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-b from-black via-gray-950 to-black py-12 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ff9d] opacity-10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 opacity-10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMGZmOWQiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="relative max-w-7xl mx-auto px-6"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00ff9d]/20 bg-[#00ff9d]/5 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse" />
            <span className="text-xs font-medium tracking-widest uppercase text-[#00ff9d]">
              Structured Learning Path
            </span>
          </div>

          <h2 className="max-md:text-4xl md:text-6xl font-bold text-white mb-6">
            Your{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#00ff9d] via-cyan-400 to-[#00ff9d] bg-clip-text text-transparent">
                Hacking Roadmap
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#00ff9d]/20 via-cyan-400/20 to-[#00ff9d]/20 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </span>
          </h2>

         
        </motion.div>

        {/* Roadmap Grid */}
        <div className="relative">
          {/* Connecting line overlay */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-px">
            <div className="relative w-[calc(100%-8rem)] mx-auto h-full">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff9d] to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              />
            </div>
          </div>

          <div className="grid sm:gap-8 md:gap-6 sm:grid-cols-2 max-sm:grid-cols-1 lg:grid-cols-5">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative group"
              >
                <div className="relative flex flex-col items-center text-center">
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#00ff9d]/0 via-[#00ff9d]/5 to-[#00ff9d]/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                    whileHover={{ scale: 1.1 }}
                  />

                  {/* Card */}
                  <motion.div
                    className="relative w-full p-8 rounded-3xl border border-gray-800/50 bg-gradient-to-b from-gray-900/40 via-gray-900/20 to-black/40 backdrop-blur-sm overflow-hidden"
                    whileHover={{
                      borderColor: "rgba(0, 255, 157, 0.3)",
                      boxShadow: "0 0 40px rgba(0, 255, 157, 0.1)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8 }}
                    />

                    {/* Step number with icon */}
                    <div className="relative mb-6">
                      <motion.div
                        className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl border border-[#00ff9d]/30 bg-gradient-to-br from-[#00ff9d]/10 to-cyan-500/5 backdrop-blur-sm"
                        whileHover={{ rotate: 5, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Animated ring */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-[#00ff9d]/20"
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.5, 0.2, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />

                        <div className="relative text-3xl">{step.icon}</div>

                        {/* Step number badge */}
                        <div className="absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#00ff9d] to-cyan-500 text-black text-xs font-bold shadow-lg shadow-[#00ff9d]/50">
                          {i + 1}
                        </div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="relative space-y-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#00ff9d] transition-colors duration-300">
                        {step.title}
                      </h3>

                      <div className="inline-flex px-3 py-1 rounded-full bg-[#00ff9d]/10 border border-[#00ff9d]/20">
                        <span className="text-xs font-medium uppercase tracking-wider text-[#00ff9d]">
                          {step.subtitle}
                        </span>
                      </div>

                      <p className="text-sm text-gray-400 leading-relaxed min-h-[4rem]">
                        {step.desc}
                      </p>
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-6 flex items-center gap-1.5">
                      {[...Array(5)].map((_, idx) => (
                        <motion.div
                          key={idx}
                          className={`h-1 flex-1 rounded-full ${
                            idx <= i ? "bg-[#00ff9d]" : "bg-gray-800"
                          }`}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            delay: i * 0.12 + idx * 0.05,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* Connection arrow for mobile */}
                  {i !== steps.length - 1 && (
                    <motion.div
                      className="lg:hidden my-4 text-[#00ff9d]/30"
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 + 0.3 }}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <motion.button
            onClick={() => {
              const coursesSection = document.getElementById('courses');
              coursesSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#00ff9d] to-cyan-500 text-black font-semibold text-lg overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-[#00ff9d]"
              initial={{ x: "100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">Start Your Journey</span>
            <motion.svg
              className="relative z-10 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </motion.svg>
          </motion.button>

          <p className="mt-4 text-sm text-gray-500">
            Join 10,000+ aspiring hackers on their cybersecurity journey
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LearningPath;