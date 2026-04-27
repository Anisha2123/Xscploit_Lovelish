import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import API from "../utils/api";
import {
  Lock,
  Unlock,
  FileText,
  Award,
  Clock,
  CheckCircle,
  Tag,
  CreditCard,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Zap,
  BookOpen,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

/* ─────────────────────────── types ─────────────────────────── */
interface Module {
  title: string;
  price?: number;
  pdfUrl?: string;
}

interface Course {
  _id?: string;
  name: string;
  shortDescription: string;
  duration: string;
  regularPrice?: number;
  launchPrice?: number;
  installment?: string;
  slug: string;
  modules: Module[];
}

/* ────────────────────────── fallbacks ───────────────────────── */
const fallbackCourses: Course[] = [
  {
    _id: "69d3d6ea6976a7a47c4aa2cd",
    name: "Ethical Hacking (Core)",
    shortDescription:
      "Master ethical hacking with practical techniques, reconnaissance, exploitation, and defense.",
    duration: "2-3 Months",
    regularPrice: 24999,
    launchPrice: 17999,
    installment: "6000 x 3",
    slug: "ceh-002",
    modules: Array.from({ length: 20 }, (_, i) => ({
      title: `Module ${i + 1}: ${["Recon & OSINT","Network Scanning","Enumeration","Exploitation Basics","Privilege Escalation","Post Exploitation","Web App Hacking","SQL Injection","XSS & CSRF","Burp Suite Mastery","Wireless Hacking","Social Engineering","Malware Analysis","Cryptography","Forensics","Evading Detection","Red Team Tactics","Reporting","Bug Bounty","CTF Lab"][i] ?? `Module ${i + 1}`}`,
      pdfUrl: "",
    })),
  },
  {
    _id: "69d3d6ff6976a7a47c4aa2cf",
    name: "Networking for Hackers",
    shortDescription:
      "Learn networking, subnetting, scanning, and exploitation fundamentals.",
    duration: "1 Month",
    regularPrice: 7999,
    launchPrice: 4999,
    installment: "2500 x 2",
    slug: "network-pentest-003",
    modules: Array.from({ length: 6 }, (_, i) => ({
      title: `Module ${i + 1}: ${["OSI & TCP/IP","Subnetting","Packet Analysis","Nmap Mastery","Routing & Switching","Network Exploitation"][i]}`,
      pdfUrl: "",
    })),
  },
  {
    _id: "69d3d7136976a7a47c4aa2d1",
    name: "Web Application Penetration Testing",
    shortDescription:
      "Test, exploit & fix vulnerabilities like SQLi, XSS & Auth bypass.",
    duration: "2 Months",
    regularPrice: 19999,
    launchPrice: 14999,
    installment: "5000 x 3",
    slug: "web-pentest-004",
    modules: Array.from({ length: 13 }, (_, i) => ({
      title: `Module ${i + 1}: ${["Web Fundamentals","HTTP Deep Dive","Recon for Web","SQL Injection","XSS Attacks","CSRF & SSRF","Auth Bypass","File Uploads","API Hacking","OWASP Top 10","Burp Suite Pro","Reporting","Bug Bounty"][i]}`,
      pdfUrl: "",
    })),
  },
];

/* ═══════════════════════ MAIN COMPONENT ════════════════════════ */
const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const [fullCoursePurchased, setFullCoursePurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const userId = localStorage.getItem("userId");

  /* fetch course */
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/courses/${courseId}`)
      .then((res) => {
        if (!res.headers.get("content-type")?.includes("application/json"))
          throw new Error("Not JSON");
        return res.json();
      })
      .then((data) => {
        if (!data || !Object.keys(data).length) throw new Error("Empty");
        setCourse(data);
      })
      .catch(() => {
        const fb = fallbackCourses.find((c) => c.slug === courseId);
        setCourse(
          fb ?? {
            slug: courseId ?? "",
            name: "Course Not Found",
            shortDescription: "",
            duration: "",
            modules: [],
          }
        );
      })
      .finally(() => setLoading(false));
  }, [courseId]);

  /* fetch unlocked modules — only when logged in */
  useEffect(() => {
    if (!course?.slug || !userId) return;
    API.get(`/pay/payments/user`, {
      params: { userId, courseSlug: course.slug },
    })
      .then((res) => {
        setUnlocked(res.data.unlockedModules ?? []);
        setFullCoursePurchased(res.data.fullCoursePurchased ?? false);
      })
      .catch(() => {});
  }, [course, userId]);

  /* payment handlers */
  const handleFullPayment = async () => {
    if (!userId) { navigate("/login", { state: { from: location.pathname } }); return; }
    const res = await API.post("/pay/course/create", {
      userId, courseId: course!.slug, price: course!.launchPrice, slug: course!.slug,
    });
    window.open(res.data.paymentLink, "_blank");
    alert("Complete the payment. All modules will unlock automatically.");
  };

  const handleModulePayment = async (mod: Module, index: number) => {
    if (!userId) { navigate("/login", { state: { from: location.pathname } }); return; }
    const res = await API.post("/pay/module/create", {
      userId, courseId: course!.slug, moduleIndex: index, price: mod.price, slug: course!.slug,
    });
    window.open(res.data.paymentLink, "_blank");
    alert("Complete the payment. The module will unlock automatically.");
  };

  /* ── loading skeleton ── */
  if (loading) return <PageLoader />;
  if (!course) return null;

  const installmentDisplay = course.installment
    ? `₹${course.installment.replace("x", "×")} EMI`
    : null;

  const discount =
    course.regularPrice && course.launchPrice
      ? Math.round(((course.regularPrice - course.launchPrice) / course.regularPrice) * 100)
      : null;

  const isLoggedIn = !!userId;
  const progressPct = course.modules.length
    ? Math.round((unlocked.length / course.modules.length) * 100)
    : 0;

  return (
    <div className="cd-root">
      <style>{STYLES}</style>

      {/* ambient glow */}
      <div className="cd-ambient" />

      <div className="cd-wrap">

        {/* ══════ HERO ══════ */}
        <header className="cd-hero">
          <div className="cd-hero-badge">
            <span className="cd-badge-dot" />
            LIVE COURSE
          </div>
          <h1 className="cd-title">
            {course.name.split(" ").map((word, i) =>
              i === 0
                ? <span key={i} className="cd-title-accent">{word} </span>
                : <span key={i}>{word} </span>
            )}
          </h1>
          <p className="cd-subtitle">{course.shortDescription}</p>

          <div className="cd-meta-row">
            {[
              { icon: "⭐", value: "4.8", label: "Rating" },
              { icon: "👥", value: "1,240", label: "Learners" },
              { icon: "🔄", value: "Dec 2025", label: "Updated" },
              { icon: "♾️", value: "Lifetime", label: "Access" },
            ].map((m) => (
              <div key={m.label} className="cd-meta-chip">
                <span className="cd-meta-icon">{m.icon}</span>
                <span className="cd-meta-value">{m.value}</span>
                <span className="cd-meta-label">{m.label}</span>
              </div>
            ))}
          </div>

          <div className="cd-hero-line" />
        </header>

        {/* ══════ INFO CARDS ══════ */}
        <section className="cd-info-grid">
          <InfoCard icon={<Clock size={20} />} label="Duration"     value={course.duration} />
          <InfoCard icon={<BookOpen size={20} />} label="Modules"   value={`${course.modules.length} modules`} />
          <InfoCard icon={<Tag size={20} />}    label="Launch Price" value={`₹${course.launchPrice?.toLocaleString("en-IN")}`} accent />
          <InfoCard icon={<Award size={20} />}  label="Regular"      value={`₹${course.regularPrice?.toLocaleString("en-IN")}`} strike />
        </section>

        {/* ══════ PRICING BANNER ══════ */}
        <div className="cd-pricing">
          <div className="cd-pricing-left">
            <p className="cd-pricing-eyebrow">Course Price</p>
            <div className="cd-pricing-row">
              <span className="cd-price-main">₹{course.launchPrice?.toLocaleString("en-IN")}</span>
              {course.regularPrice && (
                <span className="cd-price-old">₹{course.regularPrice?.toLocaleString("en-IN")}</span>
              )}
              {discount && <span className="cd-discount-pill">{discount}% OFF</span>}
            </div>
            {installmentDisplay && (
              <p className="cd-installment">
                <CreditCard size={13} /> {installmentDisplay}
              </p>
            )}
          </div>
          {!fullCoursePurchased && (
            <button onClick={handleFullPayment} className="cd-btn-primary">
              {isLoggedIn ? "Buy Full Course" : "Enrol Now"}
              <ChevronRight size={16} />
            </button>
          )}
        </div>

        {/* ══════ WHAT YOU'LL LEARN ══════ */}
        <Section label="What You'll Learn" icon={<Zap size={16} />}>
          <ul className="cd-learn-grid">
            {[
              "Hands-on cybersecurity skills",
              "Real-world attack simulations",
              "Vulnerability & penetration testing",
              "Secure coding & threat analysis",
              "Bug bounty hunting techniques",
              "Professional reporting skills",
            ].map((item) => (
              <li key={item} className="cd-learn-item">
                <CheckCircle size={15} className="cd-check" />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* ══════ PROGRESS (logged in only) ══════ */}
        {isLoggedIn && course.modules.length > 0 && (
          <div className="cd-progress-wrap">
            <div className="cd-progress-header">
              <span className="cd-progress-label">Your Progress</span>
              <span className="cd-progress-count">
                {unlocked.length} / {course.modules.length} unlocked
              </span>
            </div>
            <div className="cd-progress-track">
              <div className="cd-progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
            <span className="cd-progress-pct">{progressPct}%</span>
          </div>
        )}

        {/* ══════ MODULES ══════ */}
        <Section label="Course Curriculum" icon={<BookOpen size={16} />}>
          <div className="cd-modules">
            {course.modules.map((mod, i) => {
              const isUnlocked = fullCoursePurchased || unlocked.includes(i);
              return (
                <ModuleRow
                  key={i}
                  index={i}
                  mod={mod}
                  isUnlocked={isUnlocked}
                  isLoggedIn={isLoggedIn}
                  apiBase={API_BASE}
                  onPay={() => handleModulePayment(mod, i)}
                />
              );
            })}
          </div>
        </Section>

        {/* ══════ CERTIFICATE ══════ */}
        <Section label="Certificate" icon={<ShieldCheck size={16} />}>
          <div className="cd-cert">
            <Award size={32} className="cd-cert-icon" />
            <div>
              <p className="cd-cert-title">Certificate of Completion</p>
              <p className="cd-cert-sub">
                A verified digital certificate is issued upon completing all modules — shareable on LinkedIn and recognised by industry partners.
              </p>
            </div>
          </div>
        </Section>

        {/* ══════ BOTTOM CTA ══════ */}
        {!fullCoursePurchased ? (
          <button onClick={handleFullPayment} className="cd-btn-full">
            <span>
              {isLoggedIn
                ? `Buy Full Course — ₹${course.launchPrice?.toLocaleString("en-IN")}`
                : `Enrol Now — ₹${course.launchPrice?.toLocaleString("en-IN")}`}
              {installmentDisplay && (
                <span className="cd-btn-emi"> · {installmentDisplay}</span>
              )}
            </span>
            <ChevronRight size={20} />
          </button>
        ) : (
          <a href={`${import.meta.env.VITE_FRONTEND_URL}/courses`} className="cd-btn-outline">
            Explore Other Courses
          </a>
        )}

        {/* ══════ OFFLINE NOTE ══════ */}
        <div className="cd-offline">
          <MapPin size={13} className="cd-offline-pin" />
          <span>
            Offline classroom training available in{" "}
            <a
              href="https://maps.app.goo.gl/QRfJaQ7qjNwWbqbP8"
              target="_blank"
              rel="noopener noreferrer"
              className="cd-link"
            >
              Mumbai
            </a>
            . For batch availability,{" "}
            <Link to="/contact" className="cd-link">contact us</Link>.
          </span>
        </div>

      </div>
    </div>
  );
};

export default CourseDetails;

/* ═══════════════════════ SUB-COMPONENTS ════════════════════════ */

const PageLoader = () => (
  <div className="cd-loader">
    <style>{STYLES}</style>
    <div className="cd-loader-ring" />
    <p className="cd-loader-text">Loading course...</p>
  </div>
);

const InfoCard = ({
  icon, label, value, accent = false, strike = false,
}: {
  icon: React.ReactNode; label: string; value: string;
  accent?: boolean; strike?: boolean;
}) => (
  <div className="cd-info-card">
    <div className="cd-info-icon">{icon}</div>
    <p className={`cd-info-value ${accent ? "cd-info-accent" : ""} ${strike ? "cd-info-strike" : ""}`}>
      {value}
    </p>
    <p className="cd-info-label">{label}</p>
  </div>
);

const Section = ({
  label, icon, children,
}: {
  label: string; icon: React.ReactNode; children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`cd-section ${vis ? "cd-section--vis" : ""}`}>
      <div className="cd-section-head">
        <span className="cd-section-icon">{icon}</span>
        <h2 className="cd-section-title">{label}</h2>
      </div>
      {children}
    </div>
  );
};

const ModuleRow = ({
  index, mod, isUnlocked, isLoggedIn, apiBase, onPay,
}: {
  index: number; mod: Module; isUnlocked: boolean;
  isLoggedIn: boolean; apiBase: string; onPay: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`cd-module ${isUnlocked ? "cd-module--unlocked" : ""}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="cd-module-row" onClick={() => isUnlocked && setOpen((p) => !p)}>
        {/* index */}
        <span className="cd-module-num">{String(index + 1).padStart(2, "0")}</span>

        {/* lock icon */}
        <span className="cd-module-lock">
          {isUnlocked
            ? <Unlock size={15} className="cd-unlocked-icon" />
            : <Lock size={15} className="cd-locked-icon" />}
        </span>

        {/* title — ALWAYS VISIBLE */}
        <span className={`cd-module-title ${isUnlocked ? "cd-module-title--on" : ""}`}>
          {mod.title}
        </span>

        {/* right actions */}
        <div className="cd-module-actions">
          {isUnlocked ? (
            <span className="cd-pill cd-pill--green">Unlocked</span>
          ) : isLoggedIn ? (
            <button
              className="cd-pill cd-pill--buy"
              onClick={(e) => { e.stopPropagation(); onPay(); }}
            >
              Unlock
            </button>
          ) : (
            <span className="cd-pill cd-pill--lock">Login to unlock</span>
          )}
        </div>
      </div>

      {/* expandable PDF row */}
      {isUnlocked && open && (
        <div className="cd-module-body">
          {mod.pdfUrl ? (
            <a
              href={`${apiBase}${mod.pdfUrl}`}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="cd-pdf-link"
            >
              <FileText size={14} /> Download Module PDF
            </a>
          ) : (
            <p className="cd-pdf-soon">
              <FileText size={14} /> PDF coming soon for this module.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════ STYLES ════════════════════════════ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Syne:wght@400;600;700;800&display=swap');

.cd-root {
  min-height: 100vh;
  background: #080b10;
  color: #e2e8f0;
  font-family: 'Syne', sans-serif;
  position: relative;
  overflow-x: hidden;
  padding-top: 80px;
}

.cd-ambient {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background:
    radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,255,157,0.07) 0%, transparent 70%),
    radial-gradient(ellipse 40% 30% at 80% 80%, rgba(0,255,157,0.04) 0%, transparent 60%);
}

.cd-wrap {
  max-width: 860px;
  margin: 0 auto;
  padding: 2rem 1.25rem 5rem;
  position: relative; z-index: 1;
}

/* ── Hero ── */
.cd-hero { text-align: center; padding: 2rem 0 2.5rem; }

.cd-hero-badge {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.62rem; letter-spacing: 0.25em; color: #00ff9d;
  border: 1px solid rgba(0,255,157,0.3);
  padding: 0.3rem 0.9rem; margin-bottom: 1.5rem;
  animation: fadeUp 0.6s ease both;
}
.cd-badge-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #00ff9d;
  animation: blink 2s step-end infinite;
}
@keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }

.cd-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800; line-height: 1.1; letter-spacing: -0.02em;
  margin-bottom: 1rem;
  animation: fadeUp 0.6s 0.1s ease both;
}
.cd-title-accent { color: #00ff9d; }

.cd-subtitle {
  font-size: 1rem; color: #64748b; max-width: 560px;
  margin: 0 auto 1.75rem; line-height: 1.75;
  animation: fadeUp 0.6s 0.2s ease both;
}

.cd-meta-row {
  display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem;
  animation: fadeUp 0.6s 0.3s ease both;
}
.cd-meta-chip {
  display: flex; align-items: center; gap: 0.4rem;
  background: rgba(255,255,255,0.03); border: 1px solid #1a2030;
  padding: 0.4rem 0.9rem; font-size: 0.78rem; color: #94a3b8;
}
.cd-meta-icon { font-size: 0.85rem; }
.cd-meta-value { color: #e2e8f0; font-weight: 600; }
.cd-meta-label { color: #475569; }

.cd-hero-line {
  width: 120px; height: 1px; margin: 2rem auto 0;
  background: linear-gradient(90deg, transparent, rgba(0,255,157,0.6), transparent);
}

@keyframes fadeUp {
  from { opacity:0; transform:translateY(16px); }
  to   { opacity:1; transform:translateY(0); }
}

/* ── Info Cards ── */
.cd-info-grid {
  display: grid; grid-template-columns: repeat(4,1fr); gap: 1px;
  background: #1a2030; border: 1px solid #1a2030;
  margin-bottom: 1.5rem;
}
@media(max-width:600px){ .cd-info-grid { grid-template-columns: repeat(2,1fr); } }

.cd-info-card {
  background: #0c1118; padding: 1.25rem 1rem; text-align: center;
  transition: background 0.2s;
}
.cd-info-card:hover { background: #111720; }
.cd-info-icon { display:flex; justify-content:center; color:#00ff9d; margin-bottom:0.5rem; }
.cd-info-value { font-size: 1.1rem; font-weight: 700; color: #e2e8f0; font-family: 'Share Tech Mono', monospace; }
.cd-info-accent { color: #00ff9d; }
.cd-info-strike { color: #475569; text-decoration: line-through; }
.cd-info-label { font-size: 0.68rem; color: #475569; letter-spacing: 0.1em; margin-top: 0.25rem; text-transform: uppercase; }

/* ── Pricing Banner ── */
.cd-pricing {
  background: #0c1118; border: 1px solid rgba(0,255,157,0.2);
  padding: 1.5rem; margin-bottom: 2rem;
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 1rem;
}
.cd-pricing-eyebrow { font-family:'Share Tech Mono',monospace; font-size:0.65rem; color:#475569; letter-spacing:0.15em; margin-bottom:0.4rem; }
.cd-pricing-row { display:flex; align-items:baseline; gap:0.75rem; flex-wrap:wrap; }
.cd-price-main { font-size: 2rem; font-weight: 800; color: #00ff9d; font-family: 'Share Tech Mono', monospace; }
.cd-price-old  { font-size: 1rem; color: #475569; text-decoration: line-through; font-family: 'Share Tech Mono', monospace; }
.cd-discount-pill {
  font-size: 0.65rem; font-weight: 700;
  background: rgba(0,255,157,0.12); color: #00ff9d;
  padding: 0.2rem 0.6rem; border-radius: 999px; letter-spacing: 0.05em;
}
.cd-installment {
  display: flex; align-items: center; gap: 0.4rem;
  font-size: 0.78rem; color: #64748b; margin-top: 0.5rem;
}

/* ── Buttons ── */
.cd-btn-primary {
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.85rem 1.75rem;
  background: #00ff9d; color: #000;
  font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.9rem;
  border: none; cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  white-space: nowrap;
}
.cd-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0,255,157,0.35);
}

.cd-btn-full {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 1.1rem 1.5rem;
  background: #00ff9d; color: #000;
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.05rem;
  border: none; cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 1rem;
}
.cd-btn-full:hover { transform:translateY(-2px); box-shadow:0 10px 40px rgba(0,255,157,0.3); }
.cd-btn-emi { font-size:0.78rem; font-weight:500; opacity:0.7; }

.cd-btn-outline {
  display: block; text-align: center; width: 100%; padding: 1.1rem;
  background: transparent; color: #00ff9d;
  border: 1px solid rgba(0,255,157,0.4);
  font-family: 'Syne',sans-serif; font-weight: 700; font-size: 1rem;
  text-decoration: none; cursor: pointer; margin-top: 1rem;
  transition: background 0.2s, color 0.2s;
}
.cd-btn-outline:hover { background: #00ff9d; color: #000; }

/* ── Section ── */
.cd-section { margin-top: 2.5rem; opacity:0; transform:translateY(20px); transition:opacity 0.6s ease, transform 0.6s ease; }
.cd-section--vis { opacity:1; transform:translateY(0); }

.cd-section-head { display:flex; align-items:center; gap:0.6rem; margin-bottom:1.25rem; }
.cd-section-icon { color:#00ff9d; display:flex; }
.cd-section-title { font-size:1.15rem; font-weight:700; color:#e2e8f0; letter-spacing:-0.01em; }

/* ── Learn grid ── */
.cd-learn-grid {
  display: grid; grid-template-columns: repeat(2,1fr);
  gap: 0.75rem; list-style: none;
}
@media(max-width:480px){ .cd-learn-grid { grid-template-columns:1fr; } }
.cd-learn-item { display:flex; align-items:center; gap:0.6rem; font-size:0.9rem; color:#94a3b8; }
.cd-check { color:#00ff9d; flex-shrink:0; }

/* ── Progress ── */
.cd-progress-wrap {
  margin-top: 1.5rem; background: #0c1118; border: 1px solid #1a2030;
  padding: 1.25rem 1.5rem;
}
.cd-progress-header { display:flex; justify-content:space-between; margin-bottom:0.75rem; }
.cd-progress-label { font-family:'Share Tech Mono',monospace; font-size:0.7rem; color:#475569; letter-spacing:0.1em; }
.cd-progress-count { font-family:'Share Tech Mono',monospace; font-size:0.7rem; color:#00ff9d; }
.cd-progress-track { background:#1a2030; height:3px; width:100%; overflow:hidden; }
.cd-progress-fill { height:100%; background:#00ff9d; transition:width 0.8s cubic-bezier(.4,0,.2,1); }
.cd-progress-pct { font-family:'Share Tech Mono',monospace; font-size:0.65rem; color:#475569; margin-top:0.4rem; display:block; text-align:right; }

/* ── Modules ── */
.cd-modules { display:flex; flex-direction:column; gap:2px; }

.cd-module {
  background: #0c1118; border: 1px solid #1a2030;
  transition: border-color 0.2s, background 0.2s;
  animation: modFadeIn 0.4s ease both;
}
.cd-module--unlocked { border-color: rgba(0,255,157,0.2); }
.cd-module:hover { background: #111720; border-color: rgba(0,255,157,0.25); }
@keyframes modFadeIn { from{opacity:0;transform:translateX(-8px);} to{opacity:1;transform:translateX(0);} }

.cd-module-row {
  display: grid;
  grid-template-columns: 2.5rem 1.5rem 1fr auto;
  align-items: center; gap: 0.75rem;
  padding: 1rem 1.25rem; cursor: default;
}
.cd-module--unlocked .cd-module-row { cursor:pointer; }

.cd-module-num {
  font-family: 'Share Tech Mono', monospace; font-size: 0.7rem;
  color: #334155; letter-spacing: 0.05em;
}
.cd-module-lock { display:flex; align-items:center; }
.cd-locked-icon   { color: #334155; }
.cd-unlocked-icon { color: #00ff9d; }

.cd-module-title {
  font-size: 0.9rem; color: #94a3b8;
  font-weight: 500; letter-spacing: -0.005em;
}
.cd-module-title--on { color: #e2e8f0; font-weight: 600; }

.cd-module-actions { display:flex; justify-content:flex-end; }

/* Pills */
.cd-pill {
  font-family: 'Share Tech Mono', monospace; font-size: 0.6rem;
  letter-spacing: 0.12em; padding: 0.25rem 0.65rem; white-space: nowrap;
  border: 1px solid; cursor: default;
}
.cd-pill--green  { color:#00ff9d; border-color:rgba(0,255,157,0.3); background:rgba(0,255,157,0.06); }
.cd-pill--buy    { color:#000; background:#00ff9d; border-color:#00ff9d; cursor:pointer; transition:opacity 0.2s; }
.cd-pill--buy:hover { opacity:0.85; }
.cd-pill--lock   { color:#475569; border-color:#1a2030; }

/* Module expandable body */
.cd-module-body {
  padding: 0.75rem 1.25rem 1rem 4.75rem;
  border-top: 1px solid #1a2030;
  animation: fadeUp 0.25s ease both;
}
.cd-pdf-link {
  display:inline-flex; align-items:center; gap:0.4rem;
  font-family:'Share Tech Mono',monospace; font-size:0.72rem;
  color:#00ff9d; text-decoration:none; letter-spacing:0.05em;
  transition:opacity 0.2s;
}
.cd-pdf-link:hover { opacity:0.75; }
.cd-pdf-soon {
  display:flex; align-items:center; gap:0.4rem;
  font-family:'Share Tech Mono',monospace; font-size:0.72rem; color:#334155;
}

/* ── Certificate ── */
.cd-cert {
  display:flex; align-items:flex-start; gap:1.25rem;
  background:#0c1118; border:1px solid rgba(0,255,157,0.15); padding:1.5rem;
}
.cd-cert-icon { color:#00ff9d; flex-shrink:0; margin-top:0.1rem; }
.cd-cert-title { font-weight:700; color:#e2e8f0; margin-bottom:0.35rem; }
.cd-cert-sub { font-size:0.85rem; color:#64748b; line-height:1.6; }

/* ── Offline ── */
.cd-offline {
  display:flex; align-items:center; gap:0.5rem;
  font-family:'Share Tech Mono',monospace; font-size:0.7rem; color:#475569;
  text-align:center; justify-content:center; margin-top:2.5rem;
  letter-spacing:0.04em; flex-wrap:wrap;
}
.cd-offline-pin { color:#00ff9d; flex-shrink:0; }
.cd-link { color:#00ff9d; text-decoration:none; }
.cd-link:hover { text-decoration:underline; }

/* ── Loader ── */
.cd-loader {
  min-height:100vh; display:flex; flex-direction:column;
  align-items:center; justify-content:center;
  background:#080b10; gap:1.25rem;
}
.cd-loader-ring {
  width:40px; height:40px; border:2px solid #1a2030;
  border-top-color:#00ff9d; border-radius:50%;
  animation:spin 0.8s linear infinite;
}
@keyframes spin { to{transform:rotate(360deg);} }
.cd-loader-text { font-family:'Share Tech Mono',monospace; font-size:0.75rem; color:#475569; letter-spacing:0.2em; }
`;