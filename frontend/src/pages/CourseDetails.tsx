import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import {
  Lock,
  Unlock,
  FileText,
  ArrowRight,
  Award,
  Clock,
  CheckCircle,
  Boxes,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";


const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [unlocked, setUnlocked] = useState([]);
  const [fullCoursePurchased, setFullCoursePurchased] = useState(false);


  
  useEffect(() => {
    API.get(`/courses/${courseId}`).then((res) => setCourse(res.data.course));
  }, [courseId]);

  const userId = localStorage.getItem("userId");

  // Load User's Unlocked Modules from Backend
useEffect(() => {
  console.log("🔍 useEffect fired for unlock check");
  console.log("➡ userId in localStorage:", userId);
  console.log("➡ course object:", course);
  console.log("➡ course.slug:", course?.slug);

  if (!userId) {
    console.log("⛔ Stopping: No userId found in localStorage");
    return;
  }

  if (!course?.slug) {
    console.log("⛔ Stopping: course or course.slug not ready yet");
    return;
  }

  async function loadUnlocks() {
    console.log("🚀 Calling backend for unlocked modules...");
    console.log("📡 Request params →", {
      userId,
      courseSlug: course.slug,
    });

    try {
      const res = await API.get(`/pay/payments/user`, {
        params: { userId, courseSlug: course.slug },
      });

      console.log("📥 Backend Response →", res.data);

      const backendUnlocked = res.data.unlockedModules || [];
      setFullCoursePurchased(res.data.fullCoursePurchased || false);
      console.log("📌 Unlocked from backend (raw):", backendUnlocked);

      // Log unlock status for each module
      if (course.modules) {
        console.log("🔎 Checking lock status for each module:");
        course.modules.forEach((mod, idx) => {
          console.log(
            `   • Module ${idx} - ${mod.title}:`,
            backendUnlocked.includes(idx) ? "✅ UNLOCKED" : "🔒 LOCKED"
          );
        });
      } else {
        console.log("⚠ No course.modules found to print lock status");
      }

      setUnlocked(backendUnlocked);
      
    } catch (err) {
      console.log("❌ Error loading unlocked modules:", err);
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

  const handleModulePayment = async (module:any, index:number) => {
  const userId = localStorage.getItem("userId");

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
  const userId = localStorage.getItem("userId");

  const res = await API.post("/pay/course/create", {
    userId,
    courseId: course.slug,
    price: course.fullCoursePrice,
    slug: course.slug,
  });

  window.open(res.data.paymentLink, "_blank");

  alert("Complete the payment. All modules will unlock automatically.");
};



  return (
   
    <div className="min-h-screen w-full bg-[#0a0d10] bg-grid-pattern bg-fixed bg-cover bg-center text-white pt-25 p-6 md:p-25">
        {/* <Navbar /> */}
      {/* Overlay Glow */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#00ff9d05] to-[#00ff9d10] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-12 text-center">
  {/* Title */}
  <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
    <span className="text-[#00ff9d]">{course.name}</span>
  </h1>

  {/* Description */}
  <p className="mt-4 text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
    {course.shortDescription}
  </p>

  {/* Meta Info */}
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

  {/* Subtle Neon Divider */}
  <div className="mt-10 h-px w-40 mx-auto bg-gradient-to-r from-transparent via-[#00ff9d80] to-transparent" />
</div>

<div className="mt-10 h-px w-full max-w-xl mx-auto bg-white/5" />



        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <InfoCard title="Modules" value={course.modules.length} icon={<Boxes />} />
          <InfoCard title="Duration" value={course.duration} icon={<Clock />} />
          <InfoCard title="Level" value={course.level} icon={<CheckCircle />} />
          <InfoCard title="Price" value={`₹${course.fullCoursePrice}`} icon={<Award />} />
        </div>

        {/* Extra Section — What You'll Learn */}
        <SectionHeading title="What You Will Learn" />
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10 text-gray-300 text-md">
          <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-[#00ff9d]" /> Hands-on cybersecurity skills</li>
          <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-[#00ff9d]" /> Real-world attack simulations</li>
          <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-[#00ff9d]" /> Vulnerability & penetration testing</li>
          <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-[#00ff9d]" /> Secure coding & threat analysis</li>
        </ul>

        <div className="mb-6">
  <p className="text-sm text-gray-400 mb-2">Course Progress</p>
  <div className="w-full bg-[#11161d] rounded-full h-2">
    <div
      className="bg-[#00ff9d] h-2 rounded-full"
      style={{
        width: `${(unlocked.length / course.modules.length) * 100}%`
      }}
    />
  </div>
</div>


        {/* Modules */}
        <SectionHeading title="Modules Included" />

        <div className="space-y-6 mb-14">
  {course.modules.map((m: any, i: number) => {

    // ❗ FIX: use backend unlock array, not pdfUrl
    const isUnlocked = unlocked.includes(i);

    console.log(`UI CHECK → Module ${i} (${m.title})`, {
      unlockedArray: unlocked,
      isUnlocked,
      pdfUrl: m.pdfUrl
    });

    return (
      <div
        key={i}
        className="bg-[#0c1015] border border-[#00ff9d40] p-5 rounded-xl shadow-lg hover:shadow-[0_0_18px_#00ff9d60] transition-all group"
      >
        <div className="flex items-center justify-between">

          {/* ICON + TITLE */}
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

          {/* UNLOCK BUTTON */}
          {!isUnlocked && (
            <button
              onClick={() => handleModulePayment(course.modules[i], i)}
              className="px-4 py-2 bg-[#00ff9d] text-black rounded-md font-semibold flex items-center gap-2 hover:scale-[1.05] transition-all"
            >
              Unlock ₹{m.price}
              <ArrowRight size={16} />
            </button>
          )}
        </div>

        {/* PDF (ONLY IF UNLOCKED) */}
        {isUnlocked && (
          <div className="mt-4 bg-[#11161d] p-4 rounded-lg border border-[#00ff9d30]">
            <p className="text-[#00ff9d] flex items-center gap-2">
              <FileText size={18} /> Material Unlocked
            </p>

            <a
              href={m.pdfUrl}
              download
              className="text-blue-400 underline mt-2 inline-block"
            >
              Download PDF
            </a>
          </div>
        )}
      </div>
    );
  })}
</div>


        {/* Certificate Section */}
        <SectionHeading title="Certificate Included" />
        <div className="bg-[#0c1015] p-6 rounded-xl border border-[#00ff9d20] text-gray-300 mb-10">
          <p className="flex items-center gap-3 text-lg">
            <Award size={28} className="text-[#00ff9d]" />
            A digital certificate will be unlocked after completing the course.
          </p>
        </div>

        

        {/* Full Course / Explore Button */}
{!fullCoursePurchased ? (
  <button
    onClick={handleFullPayment}
    className="w-full py-4 text-xl bg-[#00ff9d] text-black rounded-xl font-bold shadow-lg hover:scale-[1.04] transition-all"
  >
    Buy Full Course – ₹{course.fullCoursePrice}
  </button>
) : (
  <a
    href="http://localhost:5173/courses"
    className="block text-center w-full py-4 text-xl bg-[#0c0f13] text-[#00ff9d] rounded-xl font-bold border border-[#00ff9d] hover:bg-[#00ff9d] hover:text-black transition-all"
  >
    Explore Other Courses
  </a>
)}


        <div className="h-20"></div>
      </div>
    
    </div>
    
  );
};

export default CourseDetails;

/* Small Components */
const InfoCard = ({ title, value, icon }: any) => (
  <div className="bg-[#0f141a] border border-[#00ff9d20] p-4 rounded-xl text-center shadow hover:shadow-[0_0_12px_#00ff9d40] transition-all">
    <div className="flex justify-center mb-2 text-[#00ff9d]">{icon}</div>
    <p className="text-xl font-bold text-[#00ff9d]">{value}</p>
    <p className="text-gray-400 text-sm">{title}</p>
  </div>
);

const SectionHeading = ({ title }: any) => (
  <h2 className="text-2xl font-bold text-[#00ff9d] mb-4 mt-12 drop-shadow-[0_0_10px_#00ff9d80]">
    {title}
  </h2>
 
);
