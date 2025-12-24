import { motion } from "framer-motion";

export default function NewYearStickyBar() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="
        fixed bottom-0 inset-x-0 z-50
        md:hidden
        px-4 pb-4
      "
    >
      <div
        className="
          relative overflow-hidden rounded-2xl
          bg-gradient-to-r from-[#0b0f14] via-[#0a1411] to-[#08130f]
          border border-white/10
          px-4 py-3
          shadow-[0_-10px_40px_rgba(0,0,0,0.6)]
        "
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-r 
                        from-emerald-400/10 to-amber-400/10 blur-xl" />

        <div className="relative z-10 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-300">
              🎉 New Year Sale
            </p>
            <p className="text-sm text-white font-medium">
              Up to <span className="text-emerald-400">50% OFF</span> on All Courses
            </p>
          </div>

          <a href="/courses"
            className="
              px-4 py-2 rounded-lg
              text-xs font-semibold uppercase tracking-widest
              text-emerald-900
              bg-gradient-to-r from-emerald-300 to-amber-300
              shadow-md
            "
          >
            View
          </a>
        </div>
      </div>
    </motion.div>
  );
}
