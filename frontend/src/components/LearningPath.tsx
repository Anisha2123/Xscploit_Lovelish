import { motion } from "framer-motion";

const steps = [
  {
    title: "Beginner",
    subtitle: "Foundations",
    desc: "Linux, networking, cybersecurity basics, command line mastery.",
  },
  {
    title: "Intermediate",
    subtitle: "Core Skills",
    desc: "Web hacking, networking attacks, OWASP Top 10, scripting.",
  },
  {
    title: "Advanced",
    subtitle: "Offensive Security",
    desc: "Exploitation, privilege escalation, malware basics, red teaming.",
  },
  {
    title: "Real-World Labs",
    subtitle: "Hands-On",
    desc: "Live attack & defense simulations on real environments.",
  },
  {
    title: "Certification",
    subtitle: "Career Ready",
    desc: "Industry-aligned preparation with resume & interview guidance.",
  },
];

const LearningPath = () => {
  return (
    <section className="relative bg-black py-24 overflow-hidden">
      {/* subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,157,0.08),transparent_45%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs tracking-widest uppercase text-[#7ff7c9]">
            Structured Learning
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-white">
            Your <span className="text-[#00ff9d]">Hacking Roadmap</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            A clear, step-by-step journey from zero knowledge to real-world
            cybersecurity expertise.
          </p>
        </motion.div>

        {/* roadmap */}
        <div className="mt-20 grid gap-10 md:grid-cols-5">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* connector line */}
              {i !== steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-[#00ff9d55] to-transparent" />
              )}

              {/* step circle */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-[#00ff9d55] bg-black text-[#00ff9d] font-mono text-sm shadow-[0_0_18px_rgba(0,255,157,0.25)]">
                {i + 1}
              </div>

              {/* content */}
              <h3 className="mt-6 text-lg font-medium text-white">
                {step.title}
              </h3>
              <span className="mt-1 text-xs uppercase tracking-wider text-[#7ff7c9]">
                {step.subtitle}
              </span>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPath;
