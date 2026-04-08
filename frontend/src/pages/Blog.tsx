"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Types ─── */
interface StatItem {
  num: string;
  label: string;
}

interface SkillTag {
  label: string;
}

/* ─── Data ─── */
const STATS: StatItem[] = [
  { num: "5+", label: "COURSE MODULES" },
  { num: "₹12L+", label: "AVG SALARY POTENTIAL" },
  { num: "100%", label: "HANDS-ON LABS" },
];

const SKILLS: SkillTag[] = [
  { label: "NETWORK PENTESTING" },
  { label: "WEB APP SECURITY" },
  { label: "OSINT" },
  { label: "EXPLOIT DEVELOPMENT" },
  { label: "KALI LINUX" },
  { label: "BURP SUITE" },
  { label: "METASPLOIT" },
  { label: "BUG BOUNTY" },
  { label: "CLOUD SECURITY" },
  { label: "REPORT WRITING" },
];

/* ─── Styles (injected once) ─── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Syne:wght@400;600;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #060810;
  --surface: #0d1117;
  --card: #111827;
  --border: #1f2937;
  --accent: #00ff88;
  --accent2: #0ff;
  --accent3: #ff3e6c;
  --text: #e2e8f0;
  --muted: #64748b;
  --font-mono: 'Share Tech Mono', monospace;
  --font-display: 'Syne', sans-serif;
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-display);
  overflow-x: hidden;
}

/* Scanlines */
.xh-root::before {
  content: '';
  position: fixed; inset: 0;
  background: repeating-linear-gradient(
    0deg, transparent, transparent 2px,
    rgba(0,255,136,0.012) 2px, rgba(0,255,136,0.012) 4px
  );
  pointer-events: none;
  z-index: 9999;
}

/* ── Nav ── */
.xh-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.2rem 2.5rem;
  background: rgba(6,8,16,0.75);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
}
.xh-nav-logo {
  font-family: var(--font-mono); font-size: 1.1rem;
  color: var(--accent); letter-spacing: 0.08em;
  display: flex; align-items: center; gap: 0.5rem;
}
.xh-nav-logo span { color: var(--text); }
.xh-badge {
  font-family: var(--font-mono); font-size: 0.65rem;
  color: var(--muted); border: 1px solid var(--border);
  padding: 0.25rem 0.75rem; letter-spacing: 0.15em;
}
.xh-badge--accent {
  color: var(--accent);
  border-color: rgba(0,255,136,0.3);
}

/* ── Hero ── */
.xh-hero {
  min-height: 100vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 8rem 2rem 4rem;
  position: relative; text-align: center; overflow: hidden;
}
.xh-hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: gridShift 20s linear infinite;
}
@keyframes gridShift {
  0%   { transform: translateY(0); }
  100% { transform: translateY(60px); }
}
.xh-hero-glow {
  position: absolute; width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 70%);
  top: 50%; left: 50%; transform: translate(-50%,-50%);
  animation: pulse 4s ease-in-out infinite;
}
@keyframes pulse {
  0%,100% { transform: translate(-50%,-50%) scale(1);   opacity: 0.6; }
  50%      { transform: translate(-50%,-50%) scale(1.15); opacity: 1; }
}
.xh-hero-tag {
  font-family: var(--font-mono); font-size: 0.7rem;
  color: var(--accent); letter-spacing: 0.25em;
  border: 1px solid rgba(0,255,136,0.3);
  padding: 0.4rem 1.2rem; margin-bottom: 2rem;
  position: relative; z-index: 1;
  animation: fadeUp 0.8s ease both;
}
.xh-hero-title {
  font-size: clamp(2.5rem,7vw,5.5rem);
  font-weight: 800; line-height: 1.05; letter-spacing: -0.02em;
  position: relative; z-index: 1;
  animation: fadeUp 0.8s 0.15s ease both;
}
.xh-accent  { color: var(--accent); }
.xh-dimmed  { color: var(--muted); }
.xh-hero-sub {
  margin-top: 1.5rem;
  font-family: var(--font-mono); font-size: 0.85rem;
  color: var(--muted); letter-spacing: 0.06em;
  max-width: 480px; line-height: 1.8;
  position: relative; z-index: 1;
  animation: fadeUp 0.8s 0.3s ease both;
}
.xh-scroll-hint {
  position: absolute; bottom: 2.5rem; left: 50%;
  transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
  font-family: var(--font-mono); font-size: 0.6rem;
  color: var(--muted); letter-spacing: 0.15em;
  animation: fadeUp 1s 0.8s ease both;
}
.xh-scroll-line {
  width: 1px; height: 40px;
  background: linear-gradient(to bottom, var(--accent), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}
@keyframes scrollPulse {
  0%,100% { opacity:0.4; transform:scaleY(1);   }
  50%      { opacity:1;   transform:scaleY(1.2); }
}
@keyframes fadeUp {
  from { opacity:0; transform:translateY(24px); }
  to   { opacity:1; transform:translateY(0);    }
}

/* ── Blog Section ── */
.xh-blog {
  max-width: 900px; margin: 0 auto; padding: 4rem 2rem 8rem;
}
.xh-section-label {
  font-family: var(--font-mono); font-size: 0.65rem;
  color: var(--accent); letter-spacing: 0.3em;
  margin-bottom: 4rem;
  display: flex; align-items: center; gap: 1rem;
}
.xh-section-label::after {
  content:''; flex:1; height:1px;
  background: linear-gradient(to right, var(--border), transparent);
}

/* ── Article ── */
.xh-article {
  background: var(--card);
  border: 1px solid var(--border);
  padding: 3.5rem;
  position: relative; overflow: hidden;
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.xh-article.visible { opacity:1; transform:translateY(0); }
.xh-article::before {
  content:''; position:absolute; top:0; left:0; right:0; height:2px;
  background: linear-gradient(90deg, var(--accent), var(--accent2), transparent);
}
.xh-article::after {
  content:''; position:absolute; top:-60px; right:-60px;
  width:200px; height:200px;
  background: radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%);
  transition: transform 0.6s ease;
}
.xh-article:hover::after { transform:scale(1.5); }

/* ── Meta ── */
.xh-meta {
  display:flex; align-items:center; gap:1.5rem;
  margin-bottom:2rem; flex-wrap:wrap;
}
.xh-tag {
  font-family:var(--font-mono); font-size:0.62rem;
  letter-spacing:0.2em; padding:0.3rem 0.8rem; border:1px solid;
}
.xh-tag--cyber   { border-color:rgba(0,255,136,0.4); color:var(--accent);  }
.xh-tag--career  { border-color:rgba(0,255,255,0.4); color:var(--accent2); }
.xh-tag--training{ border-color:rgba(255,62,108,0.4);color:var(--accent3); }
.xh-meta-date {
  font-family:var(--font-mono); font-size:0.62rem;
  color:var(--muted); letter-spacing:0.1em;
}

/* ── Title / Byline ── */
.xh-article-title {
  font-size:clamp(1.6rem,3vw,2.2rem);
  font-weight:800; line-height:1.2; letter-spacing:-0.01em; margin-bottom:1rem;
}
.xh-byline {
  font-family:var(--font-mono); font-size:0.7rem; color:var(--muted);
  margin-bottom:2.5rem; display:flex; align-items:center; gap:0.5rem;
}
.xh-dot {
  width:6px; height:6px; background:var(--accent); border-radius:50%;
  animation:blinkDot 2s ease-in-out infinite;
}
@keyframes blinkDot { 0%,100%{opacity:1;} 50%{opacity:0.2;} }
.xh-cursor {
  display:inline-block; width:8px; height:1em;
  background:var(--accent); margin-left:3px;
  vertical-align:middle; animation:blink 1s step-end infinite;
}
@keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }

/* ── Body ── */
.xh-body p {
  font-size:1rem; line-height:1.85; color:#94a3b8; margin-bottom:1.6rem;
}
.xh-body p:first-child { font-size:1.1rem; color:var(--text); font-weight:600; }
.xh-body strong { color:var(--text); }

/* ── Highlight Box ── */
.xh-highlight {
  border-left:2px solid var(--accent);
  padding:1.2rem 1.5rem;
  background:rgba(0,255,136,0.03);
  margin:2rem 0;
  font-family:var(--font-mono); font-size:0.8rem;
  color:var(--accent); letter-spacing:0.05em; line-height:1.7;
}

/* ── Stats ── */
.xh-stats {
  display:grid; grid-template-columns:repeat(3,1fr);
  gap:1px; background:var(--border);
  margin:2.5rem 0; border:1px solid var(--border);
}
.xh-stat {
  background:var(--card); padding:1.5rem;
  text-align:center; position:relative; overflow:hidden;
}
.xh-stat::after {
  content:''; position:absolute; bottom:0; left:50%;
  transform:translateX(-50%); width:0; height:1px;
  background:var(--accent); transition:width 0.5s ease;
}
.xh-stat:hover::after { width:80%; }
.xh-stat-num  { font-size:2rem; font-weight:800; color:var(--accent); display:block; letter-spacing:-0.02em; }
.xh-stat-label{ font-family:var(--font-mono); font-size:0.62rem; color:var(--muted); letter-spacing:0.15em; margin-top:0.3rem; }

/* ── Skills ── */
.xh-skills { display:flex; flex-wrap:wrap; gap:0.6rem; margin:2rem 0; }
.xh-skill {
  font-family:var(--font-mono); font-size:0.65rem;
  color:var(--muted); border:1px solid var(--border);
  padding:0.4rem 0.9rem; letter-spacing:0.1em;
  transition:all 0.25s ease; cursor:default;
}
.xh-skill:hover {
  color:var(--accent); border-color:rgba(0,255,136,0.4);
  background:rgba(0,255,136,0.04);
}

/* ── CTA ── */
.xh-cta {
  margin-top:3rem; padding:2rem;
  border:1px solid rgba(0,255,136,0.2);
  background:rgba(0,255,136,0.02);
  display:flex; align-items:center; justify-content:space-between;
  gap:1.5rem; flex-wrap:wrap;
}
.xh-cta-text { font-size:0.9rem; font-weight:600; color:var(--text); }
.xh-cta-text span {
  display:block; font-family:var(--font-mono); font-size:0.65rem;
  color:var(--muted); font-weight:400; margin-top:0.3rem; letter-spacing:0.08em;
}
.xh-btn {
  font-family:var(--font-mono); font-size:0.7rem;
  color:var(--bg); background:var(--accent); border:none;
  padding:0.8rem 1.8rem; letter-spacing:0.15em;
  cursor:pointer; transition:all 0.25s ease;
  position:relative; overflow:hidden; white-space:nowrap;
}
.xh-btn::before {
  content:''; position:absolute; inset:0;
  background:var(--accent2); transform:translateX(-100%);
  transition:transform 0.3s ease;
}
.xh-btn:hover::before { transform:translateX(0); }
.xh-btn span { position:relative; z-index:1; }

/* ── Footer ── */
.xh-footer {
  border-top:1px solid var(--border); padding:3rem 2.5rem;
  background:var(--surface);
  display:flex; align-items:center; justify-content:space-between;
  flex-wrap:wrap; gap:1rem;
}
.xh-footer-text { font-family:var(--font-mono); font-size:0.7rem; color:var(--muted); }
.xh-footer-text strong { color:var(--accent); }
.xh-footer-links { display:flex; gap:2rem; }
.xh-footer-links a {
  font-family:var(--font-mono); font-size:0.65rem;
  color:var(--muted); text-decoration:none; letter-spacing:0.1em;
  transition:color 0.2s;
}
.xh-footer-links a:hover { color:var(--accent); }

/* ── Responsive ── */
@media(max-width:600px){
  .xh-article{ padding:2rem 1.5rem; }
  .xh-stats  { grid-template-columns:repeat(2,1fr); }
  .xh-cta    { flex-direction:column; }
}
`;

/* ─── Component ─── */
export default function XsploitBlog() {
  const articleRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  /* Inject styles once */
  useEffect(() => {
    const id = "xh-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = CSS;
      document.head.appendChild(style);
    }
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  /* Scroll-reveal for article */
  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="xh-root">

      {/* ── HERO ── */}
      <section className="xh-hero">
        <div className="xh-hero-grid" />
        <div className="xh-hero-glow" />

        <div className="xh-hero-tag">KNOWLEDGE BASE / DISPATCH 001</div>

        <h1 className="xh-hero-title">
          <span className="xh-accent">Break In.</span>
          <br />
          <span>Build Up.</span>
          <br />
          <span className="xh-dimmed">Get Hired.</span>
        </h1>

        <p className="xh-hero-sub">
          The definitive blog for aspiring ethical hackers, penetration
          testers, and cybersecurity professionals in India.
        </p>

        <div className="xh-scroll-hint">
          <span>SCROLL</span>
          <div className="xh-scroll-line" />
        </div>
      </section>

      {/* ── BLOG ── */}
      <section className="xh-blog">
        <div className="xh-section-label">FEATURED ARTICLE</div>

        <article
          ref={articleRef}
          className={`xh-article${visible ? " visible" : ""}`}
        >
          {/* Meta */}
          <div className="xh-meta">
            <span className="xh-tag xh-tag--cyber">CYBERSECURITY</span>
            <span className="xh-tag xh-tag--career">CAREER</span>
            <span className="xh-tag xh-tag--training">TRAINING</span>
            <span className="xh-meta-date">2025 · INDIA EDITION</span>
          </div>

          {/* Title */}
          <h2 className="xh-article-title">
            Master{" "}
            <span className="xh-accent">Ethical Hacking</span> &amp; Launch
            a<br />High-Paying Cybersecurity Career in India
          </h2>

          {/* Byline */}
          <div className="xh-byline">
            <div className="xh-dot" />
            LOVELISH NIRMAL — CEO, XSPLOIT HACKADEMY
            <span className="xh-cursor" />
          </div>

          {/* Body */}
          <div className="xh-body">
            <p>
              Cybersecurity is no longer a niche — it is the backbone of every
              digital enterprise. At Xsploit Hackademy, we&apos;ve built
              India&apos;s most practice-first ethical hacking training program
              to turn motivated learners into battle-tested security
              professionals.
            </p>

            <div className="xh-highlight">
              &gt; &quot;You don&apos;t just learn to hack — you learn how
              organisations get breached, and how to stop it before it
              happens.&quot;
              <br />
              &gt; — Lovelish Nirmal, Founder &amp; CEO
            </div>

            <p>
              Our complete ethical hacking course is engineered for the real
              world. From day one, you&apos;ll work inside live lab
              environments that simulate genuine enterprise attack surfaces.
              Whether you&apos;re a complete beginner or an IT professional
              looking to specialise, the curriculum scales with your ability —
              progressing from foundational networking and Linux essentials all
              the way through advanced exploit development and red-team
              tactics.
            </p>

            {/* Stats */}
            <div className="xh-stats">
              {STATS.map((s) => (
                <div key={s.label} className="xh-stat">
                  <span className="xh-stat-num">{s.num}</span>
                  <div className="xh-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <p>
              The penetration testing course modules cover the complete attack
              lifecycle: reconnaissance, scanning, enumeration, exploitation,
              post-exploitation, and professional reporting. You will practice
              on deliberately vulnerable systems, internal CTF challenges, and
              curated bug-bounty targets — so that by graduation, your
              portfolio already speaks for itself.
            </p>

            <p>
              VAPT (Vulnerability Assessment &amp; Penetration Testing)
              training is a core pillar of our programme. Students learn both
              manual and automated techniques to identify, classify, and
              remediate vulnerabilities across web applications, networks, and
              cloud environments — mapping directly to the industry&apos;s
              highest-demand job roles.
            </p>

            {/* Skill Tags */}
            <div className="xh-skills">
              {SKILLS.map((sk, i) => (
                <span
                  key={sk.label}
                  className="xh-skill"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  {sk.label}
                </span>
              ))}
            </div>

            <p>
              What truly separates Xsploit Hackademy from generic online
              courses is{" "}
              <strong>industry-focused mentorship</strong>. Every student is
              guided by practitioners who actively work in penetration testing
              and red-team operations — live sessions, code reviews, and mock
              assessments with people who do this professionally every day.
            </p>

            <p>
              Our hacking course online is designed for maximum flexibility
              without compromising depth. Classes are live, interactive, and
              recorded for revision. The syllabus is continuously updated to
              reflect the latest CVEs, attack techniques, and defensive
              strategies — because the threat landscape never sleeps.
            </p>

            <p>
              Real-world bug bounty experience is baked into the curriculum.
              Students are guided through responsible disclosure processes, how
              to write impactful vulnerability reports, and how to build a
              reputation on platforms that leading companies actively monitor
              when hiring.
            </p>

            <p>
              Entry-level ethical hacker roles in India start between
              ₹4–7 LPA; mid-level consultants command ₹10–18 LPA; senior
              red-team operators regularly cross ₹25 LPA. The supply of
              qualified professionals is nowhere near meeting demand — making
              this the right time to start.
            </p>

            <div className="xh-highlight">
              &gt; CURRICULUM SNAPSHOT
              <br />
              &gt; 01 — Ethical Hacking Foundations &amp; Legal Framework
              <br />
              &gt; 02 — Network Security &amp; Penetration Testing
              <br />
              &gt; 03 — Web Application VAPT
              <br />
              &gt; 04 — Advanced Exploitation &amp; Post-Exploitation
              <br />
              &gt; 05 — Bug Bounty Hunting &amp; Professional Reporting
            </div>

            <p>
              Xsploit Hackademy accepts students at every stage. If
              you&apos;ve ever wanted to understand how attackers think,
              protect the systems that matter, and build a career that is
              genuinely future-proof — this is where you start.
            </p>
          </div>

          {/* CTA */}
          <div className="xh-cta">
            <div className="xh-cta-text">
              Ready to go from zero to security pro?
              <span>
                Enrol in India&apos;s most hands-on ethical hacking programme.
              </span>
            </div>
            <button className="xh-btn">
              <span>START YOUR JOURNEY →</span>
            </button>
          </div>
        </article>
      </section>

      {/* ── FOOTER ── */}
      <footer className="xh-footer">
        <div className="xh-footer-text">
          <strong>XSPLOIT HACKADEMY</strong> · Founded by{" "}
          <strong>Lovelish Nirmal</strong>
          <br />
          <span style={{ opacity: 0.5 }}>
            © 2025 · All rights reserved · Hack ethically.
          </span>
        </div>
        <nav className="xh-footer-links">
          {["COURSES", "BLOG", "CONTACT", "ENROL"].map((l) => (
            <a key={l} href="#">
              {l}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  );
}