import { motion } from "framer-motion";

const items = [
  {
    title: "Live Exploit Labs",
    desc: "Execute real attacks inside isolated environments designed to mirror production systems.",
  },
  {
    title: "Real CVE-Based Attacks",
    desc: "Exploit vulnerabilities mapped to real CVEs used by attackers in the wild.",
  },
  {
    title: "Resume-Ready Projects",
    desc: "Hands-on reports, attack chains, and tooling you can confidently present in interviews.",
  },
  {
    title: "Certificate on Completion",
    desc: "Proof of applied security skills — not just video consumption.",
  },
];

const WhyXsploit = () => {
  return (
    <section className="relative bg-black py-28 overflow-hidden">
      {/* ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(0,255,157,0.08),transparent_55%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        
        {/* LEFT — authority block */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs tracking-widest uppercase text-[#7ff7c9] ">
            Why Xsploit
          </span>

          <h2 className="mt-6 text-4xl font-semibold text-white leading-tight">
            Built like a  
            <span className="block text-[#00ff9d]">real security lab</span>
          </h2>

          <p className="mt-6 text-gray-400 max-w-md leading-relaxed">
            Xsploit is designed to replicate how security professionals actually
            learn — through exploitation, analysis, failure, and iteration.
          </p>

          <p className="mt-4 text-gray-500 max-w-md text-sm">
            No shortcuts. No scripted wins. Every lab behaves like a real target.
          </p>
        </motion.div>

        {/* RIGHT — vertical signal rail */}
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-[#00ff9d33]" />

          <div className="space-y-14 pl-14">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative"
              >
                {/* node */}
                <span className="absolute -left-14 top-1.5 w-3 h-3 rounded-full bg-[#00ff9d] shadow-[0_0_12px_#00ff9d]" />

                <h3 className="text-lg font-medium text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-gray-400 max-w-md leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom trust line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-24 text-center text-xs tracking-widest uppercase text-[#7ff7c9] opacity-70"
      >
        Designed for real-world offensive security
      </motion.div>
    </section>
  );
};

export default WhyXsploit;
