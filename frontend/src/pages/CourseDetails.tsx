import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Lock,
  Unlock,
  FileText,
  ArrowRight,
  Award,
  Clock,
  CheckCircle,
  Boxes,
  Tag,
  CreditCard,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const [fullCoursePurchased, setFullCoursePurchased] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const userId = localStorage.getItem("userId");

  if (!userId) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-black">
        <h2 className="text-2xl font-bold text-white mb-3">Login Required</h2>
        <p className="text-gray-400 mb-6 max-w-md">
          Please login to view course details and access premium content.
        </p>
        <button
          onClick={() => navigate("/login", { state: { from: location.pathname } })}
          className="px-6 py-3 bg-[#00ff9d] text-black font-semibold rounded-lg hover:scale-105 transition"
        >
          Login to Continue
        </button>
      </div>
    );
  }

  const fallbackCourses = [
    {
      _id: '1',
      name: 'CERTIFIED ETHICAL HACKING',
      shortDescription: 'Learn modern cyber attack techniques & defense strategies.',
      duration: '3 Months',
      regularPrice: 5000,
      launchPrice: 3499,
      slug: 'ceh-002',
      modules: [],
      installment: ''
    },
    {
      _id: '2',
      name: 'NETWORK PENETRATION TESTING',
      shortDescription: 'Attack and secure enterprise networks, routers & protocols.',
      duration: '2.5 Months',
      regularPrice: 5000,
      launchPrice: 2999,
      slug: 'network-pentest-003',
      modules: [],
      installment: ''
    },
    {
      _id: '3',
      name: 'WEB APP PENETRATION TESTING',
      shortDescription: 'Test, exploit & fix vulnerabilities like SQLi, XSS & Auth bypass.',
      duration: '2 Months',
      regularPrice: 7000,
      launchPrice: 4999,
      slug: 'web-pentest-004',
      modules: [],
      installment: ''
    },
    {
      _id: '4',
      name: 'HACKING WITH AI',
      shortDescription: 'Use AI tools for exploit automation, phishing & malware analysis.',
      duration: '1.5 Months',
      regularPrice: 5000,
      launchPrice: 3999,
      slug: 'ai-hacking-006',
      modules: [],
      installment: ''
    },
    {
      _id: '5',
      name: 'BUG BOUNTY HUNTING',
      shortDescription: 'Find real bugs on live platforms & earn rewards legally.',
      duration: '2 Months',
      regularPrice: 5000,
      launchPrice: 3999,
      slug: 'bug-bounty-007',
      modules: [],
      installment: ''
    }
  ];

  // Fetch course from courses1 collection
  useEffect(() => {
    fetch(`${API_BASE}/courses/${courseId}`)
      .then((res) => {
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Backend not available, response is not JSON');
        }
        return res.json();
      })
      .then((data) => {
        if (!data || Object.keys(data).length === 0) throw new Error('Empty course data');
        setCourse(data);
      })
      .catch((err) => {
        console.warn("Failed to fetch course, using fallback:", err);
        const fallback = fallbackCourses.find(c => c.slug === courseId);
        if (fallback) {
          setCourse(fallback);
        } else {
          setCourse({ slug: courseId, name: "Course Not Found", shortDescription: "", duration: "", modules: [] });
        }
      });
  }, [courseId]);

  // Load unlocked modules
  useEffect(() => {
    if (!course?.slug) return;

    async function loadUnlocks() {
      try {
        const res = await API.get(`/pay/payments/user`, {
          params: { userId, courseSlug: course.slug },
        });
        setUnlocked(res.data.unlockedModules || []);
        setFullCoursePurchased(res.data.fullCoursePurchased || false);
      } catch (err) {
        console.error("Error loading unlocked modules:", err);
      }
    }

    loadUnlocks();
  }, [course, userId]);

  if (!course) {
    return (
      <p className="text-white text-center mt-20 animate-pulse text-xl">
        Loading course...
      </p>
    );
  }

  // Parse installment string e.g. "6000 x 3"
  const installmentDisplay = course.installment
    ? `₹${course.installment.replace("x", "×")} EMI`
    : null;

  // Discount %
  const discount = course.regularPrice && course.launchPrice
    ? Math.round(((course.regularPrice - course.launchPrice) / course.regularPrice) * 100)
    : null;

  const handleModulePayment = async (module: any, index: number) => {
    const res = await API.post("/pay/module/create", {
      userId,
      courseId: course.slug,
      moduleIndex: index,
      price: module.price,
      slug: course.slug,
    });
    window.open(res.data.paymentLink, "_blank");
    alert("Complete the payment. The module will unlock automatically.");
  };

  const handleFullPayment = async () => {
    const res = await API.post("/pay/course/create", {
      userId,
      courseId: course.slug,
      price: course.launchPrice,
      slug: course.slug,
    });
    window.open(res.data.paymentLink, "_blank");
    alert("Complete the payment. All modules will unlock automatically.");
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0d10] bg-grid-pattern bg-fixed bg-cover bg-center text-white pt-25 p-6 md:p-25">
      {/* Overlay Glow */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#00ff9d05] to-[#00ff9d10] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── Header ── */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            <span className="text-[#00ff9d]">{course.name}</span>
          </h1>
          <p className="mt-4 text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {course.shortDescription}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00ff9d]" />
              <span className="text-[#00ff9d] font-medium">4.8</span> rating
            </span>
            <span className="h-3 w-px bg-[#00ff9d20]" />
            <span>1,240 learners</span>
            <span className="h-3 w-px bg-[#00ff9d20]" />
            <span>Updated Dec 2025</span>
            <span className="h-3 w-px bg-[#00ff9d20]" />
            <span>Lifetime access</span>
          </div>
          <div className="mt-10 h-px w-40 mx-auto bg-gradient-to-r from-transparent via-[#00ff9d80] to-transparent" />
        </div>

        <div className="mt-10 h-px w-full max-w-xl mx-auto bg-white/5" />

        {/* ── Info Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {/* <InfoCard title="Modules"  value={course.modules.length}  icon={<Boxes />} /> */}
          <InfoCard title="Duration" value={course.duration}         icon={<Clock />} />
          <InfoCard
            title="Launch Price"
            value={`₹${course.launchPrice?.toLocaleString("en-IN")}`}
            icon={<Tag />}
          />
          <InfoCard
            title="Regular Price"
            value={`₹${course.regularPrice?.toLocaleString("en-IN")}`}
            icon={<Award />}
            strikethrough
          />
        </div>

        {/* ── Pricing Banner ── */}
        <div className="bg-[#0c1015] border border-[#00ff9d30] rounded-xl p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left: price block */}
          <div>
            <p className="text-gray-500 text-sm mb-1">Course Price</p>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-[#00ff9d] font-mono">
                ₹{course.launchPrice?.toLocaleString("en-IN")}
              </span>
              {course.regularPrice && (
                <span className="text-gray-500 line-through text-lg font-mono">
                  ₹{course.regularPrice?.toLocaleString("en-IN")}
                </span>
              )}
              {discount && (
                <span className="text-xs font-bold bg-[#00ff9d]/15 text-[#00ff9d] px-2 py-1 rounded-full">
                  {discount}% OFF
                </span>
              )}
            </div>
            {installmentDisplay && (
              <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
                <CreditCard size={14} className="text-[#00ff9d]" />
                Pay in installments: {installmentDisplay}
              </p>
            )}
          </div>

          {/* Right: buy button (inline preview) */}
          {!fullCoursePurchased && (
            <button
              onClick={handleFullPayment}
              className="px-6 py-3 bg-[#00ff9d] text-black font-bold rounded-xl hover:scale-105 transition-all shadow-lg shadow-[#00ff9d]/30 whitespace-nowrap"
            >
              Buy Full Course
            </button>
          )}
        </div>

        {/* ── What You'll Learn ── */}
        <SectionHeading title="What You Will Learn" />
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10 text-gray-300 text-md">
          <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-[#00ff9d]" /> Hands-on cybersecurity skills</li>
          <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-[#00ff9d]" /> Real-world attack simulations</li>
          <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-[#00ff9d]" /> Vulnerability & penetration testing</li>
          <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-[#00ff9d]" /> Secure coding & threat analysis</li>
        </ul>

        {/* ── Progress Bar ── */}
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-2">
            Course Progress — {unlocked.length}/{course.modules.length} modules unlocked
          </p>
          <div className="w-full bg-[#11161d] rounded-full h-2">
            <div
              className="bg-[#00ff9d] h-2 rounded-full transition-all duration-500"
              style={{ width: `${(unlocked.length / course.modules.length) * 100}%` }}
            />
          </div>
        </div>

        {/* ── Modules ── */}
        <SectionHeading title="Modules Included" />

        <div className="space-y-6 mb-14">
          {course.modules.map((m: any, i: number) => {
            const isUnlocked = fullCoursePurchased || unlocked.includes(i);

            return (
              <div
                key={i}
                className="bg-[#0c1015] border border-[#00ff9d40] p-5 rounded-xl shadow-lg hover:shadow-[0_0_18px_#00ff9d60] transition-all group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    {!isUnlocked ? (
                      <Lock size={20} className="text-gray-400" />
                    ) : (
                      <Unlock size={20} className="text-[#00ff9d]" />
                    )}
                    <span className={isUnlocked ? "text-[#00ff9d]" : "text-gray-300"}>
                      {m.title}
                    </span>
                  </h3>
                </div>

                {/* PDF — only if unlocked */}
                {isUnlocked && m.pdfUrl && (
                  <div className="mt-4 bg-[#11161d] p-4 rounded-lg border border-[#00ff9d30]">
                    <p className="text-[#00ff9d] flex items-center gap-2">
                      <FileText size={18} /> Material Unlocked
                    </p>
                    
                      < a href={`${API_BASE}${m.pdfUrl}`}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline mt-2 inline-block text-sm"
                    >
                      Download PDF
                    </a>
                  </div>
                )}

                {isUnlocked && !m.pdfUrl && (
                  <div className="mt-4 bg-[#11161d] p-4 rounded-lg border border-[#00ff9d20]">
                    <p className="text-gray-500 text-sm flex items-center gap-2">
                      <FileText size={16} /> PDF coming soon for this module.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Certificate ── */}
        <SectionHeading title="Certificate Included" />
        <div className="bg-[#0c1015] p-6 rounded-xl border border-[#00ff9d20] text-gray-300 mb-10">
          <p className="flex items-center gap-3 text-lg">
            <Award size={28} className="text-[#00ff9d]" />
            A digital certificate will be unlocked after completing the course.
          </p>
        </div>

        {/* ── Full CTA ── */}
        {!fullCoursePurchased ? (
          <button
            onClick={handleFullPayment}
            className="w-full py-4 text-xl bg-[#00ff9d] text-black rounded-xl font-bold shadow-lg hover:scale-[1.04] transition-all"
          >
            Buy Full Course – ₹{course.launchPrice?.toLocaleString("en-IN")}
            {installmentDisplay && (
              <span className="ml-3 text-sm font-medium opacity-70">
                or {installmentDisplay}
              </span>
            )}
          </button>
        ) : (
          
            <a href={`${import.meta.env.VITE_FRONTEND_URL}/courses`}
            className="block text-center w-full py-4 text-xl bg-[#0c0f13] text-[#00ff9d] rounded-xl font-bold border border-[#00ff9d] hover:bg-[#00ff9d] hover:text-black transition-all"
          >
            Explore Other Courses
          </a>
        )}

        {/* ── Offline Note ── */}
        <div className="mt-22 text-center text-sm text-gray-400">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin size={14} className="text-[#00ff9d]" />
            <span>
              Offline classroom training is available in{" "}
              
               < a href="https://maps.app.goo.gl/QRfJaQ7qjNwWbqbP8"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#00ff9d] hover:text-white transition"
              >
                Mumbai
              </a>
            </span>
          </div>
          <p className="text-gray-500 max-w-xl mx-auto">
            Sessions are conducted in small batches with guided labs. For batch availability,{" "}
            <Link to="/contact" className="text-[#00ff9d] hover:underline">
              contact us
            </Link>.
          </p>
        </div>

      </div>
    </div>
  );
};

export default CourseDetails;

/* ── Sub-components ── */

const InfoCard = ({ title, value, icon, strikethrough = false }: any) => (
  <div className="bg-[#0f141a] border border-[#00ff9d20] p-4 rounded-xl text-center shadow hover:shadow-[0_0_12px_#00ff9d40] transition-all">
    <div className="flex justify-center mb-2 text-[#00ff9d]">{icon}</div>
    <p className={`text-xl font-bold ${strikethrough ? "line-through text-gray-500" : "text-[#00ff9d]"}`}>
      {value}
    </p>
    <p className="text-gray-400 text-sm">{title}</p>
  </div>
);

const SectionHeading = ({ title }: any) => (
  <h2 className="text-2xl font-bold text-[#00ff9d] mb-4 mt-12 drop-shadow-[0_0_10px_#00ff9d80]">
    {title}
  </h2>
);