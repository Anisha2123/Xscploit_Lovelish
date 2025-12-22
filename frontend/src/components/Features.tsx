import { motion } from "framer-motion";
import { ShieldCheck, Award, Users } from "lucide-react";

const highlights = [
  {
    title: "Certifications",
    icon: ShieldCheck,
    items: ["CEH", "OSCP", "CPT"],
  },
  {
    title: "Key Achievements",
    icon: Award,
    items: [
      "International bug bounty contributor",
      "Speaker at security workshops & conferences",
      "Hands-on penetration testing projects",
    ],
  },
  {
    title: "Community & Mentorship",
    icon: Users,
    items: [
      "Mentorship for aspiring cybersecurity professionals",
      "Active learner community & forums",
      "Live Q&A and guided practice sessions",
    ],
  },
];

export default function ProfessionalHighlights() {
  return (
    <section className="max-w-7xl mx-auto mt-20 px-6">
      {/* Section Header */}
      <div className="mb-14 max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Professional Highlights
        </h2>
        <p className="mt-3 text-gray-400 text-sm leading-relaxed">
          Industry-recognized credentials, real-world experience, and a strong
          focus on community-driven learning.
        </p>
      </div>

      {/* Grid */}
      <div className="grid max-sm:grid-cols-1 md:grid-cols-3 gap-8">
        {highlights.map((item, idx) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-[#0b0f14] border border-white/5 rounded-xl p-6
                         hover:border-[#00ff9d]/30 transition-colors"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-[#00ff9d]/10 flex items-center justify-center">
                  <Icon size={18} className="text-[#00ff9d]" />
                </div>
                <h3 className="text-lg font-medium text-white">
                  {item.title}
                </h3>
              </div>

              {/* List */}
              <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
                {item.items.map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#00ff9d]" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
