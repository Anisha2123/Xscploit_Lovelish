import React, { useEffect, useState } from "react";
import { FaUserCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import  API  from "../utils/api";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const location = useLocation();
type KpiItemProps = {
  label: string;
  value: number | string;
};
console.log(`userid is ${userId}`)
const KpiItem = ({ label, value }: KpiItemProps) => {
  return (
    <div className="flex flex-col gap-1 items-center">
      <p className="text-xs uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <p className="text-3xl font-semibold text-white">
        {value}
      </p>
    </div>
  );
};
const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
      ${
        status === "paid"
          ? "bg-emerald-500/10 text-emerald-400"
          : "bg-red-500/10 text-red-400"
      }`}
  >
    {status === "paid" ? <FaCheckCircle /> : <FaTimesCircle />}
    {status.toUpperCase()}
  </span>
);


if (!userId) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-black">
      <h2 className="text-2xl font-bold text-white mb-3">
        Login Required
      </h2>

      <p className="text-gray-400 mb-6 max-w-md">
        Please login to view course details and access premium content.
      </p>

      <button
        onClick={() =>
          navigate("/login", {
            state: { from: location.pathname }
          })
        }
        className="px-6 py-3 bg-[#00ff9d] text-black font-semibold rounded-lg hover:scale-105 transition"
      >
        Login to Continue
      </button>
    </div>
  );
}
  useEffect(() => {
  

  // Fetch user info
  API.get(`/users/${userId}`)
    .then(res => setUser(res.data))
    .catch(err => console.error(err));

  // Fetch purchases
  API.get(`/users/${userId}/purchases`)
    .then(res => setCourses(res.data))
    .catch(err => console.error(err));

  // Fetch payments
  API.get(`/users/${userId}/payments`)
    .then(res => setPayments(res.data))
    .catch(err => console.error(err));
}, [userId]);

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center text-[#00ff9d]">Loading...</div>
  );

  return (
    <div className="min-h-screen bg-[#0b0d10] text-white p-6 md:p-12">
      {/* Header */}
    
<div className="max-w-6xl mx-auto my-14">
  <div className="bg-[#0b0f14] border border-[#00ff9d15] rounded-2xl px-8 py-6 shadow-lg">

    <div className="flex flex-col gap-6">

  {/* TOP ROW — IDENTITY + ACTION */}
  <div className="flex max-sm:flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

    {/* Identity */}
    <div className="flex items-center gap-4">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-[#00ff9d]/15 
                      flex items-center justify-center 
                      text-[#00ff9d] font-semibold text-lg">
        {(user?.name || "U").charAt(0).toUpperCase()}
      </div>

      <div>
        <h1 className="text-xl font-semibold text-white leading-tight">
          {user?.name || "User"}
        </h1>
        <p className="text-sm text-gray-400">
          {user?.email}
        </p>
      </div>
    </div>

    {/* Action */}
    <button
      onClick={() => {
        localStorage.removeItem("userId");
        window.location.href = "/login";
      }}
      className="self-start sm:self-auto px-5 py-2 rounded-md
                 border border-white/10 text-sm text-gray-300
                 hover:bg-[#00ff9d] hover:text-black
                 transition"
    >
      Sign out
    </button>
  </div>

  {/* BOTTOM ROW — METADATA */}
  <div className="grid max-sm:grid-cols-2 sm:grid-cols-4 gap-6 text-xs md:justify-items-center">

    <div>
      <p className="uppercase tracking-wider text-[10px] text-gray-500">
        User ID
      </p>
      <p className="mt-1 text-gray-300 font-medium">
        {user?.userId || "—"}
      </p>
    </div>

    <div>
      <p className="uppercase tracking-wider text-[10px] text-gray-500">
        Created
      </p>
      <p className="mt-1 text-gray-300 font-medium">
        {user?.createdAt
          ? new Date(user.createdAt).toLocaleDateString()
          : "—"}
      </p>
    </div>

    <div>
      <p className="uppercase tracking-wider text-[10px] text-gray-500">
        Status
      </p>
      <div className="mt-1 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#00ff9d]" />
        <span className="text-[#00ff9d] font-medium">
          Active
        </span>
      </div>
    </div>

    <div>
      <p className="uppercase tracking-wider text-[10px] text-gray-500">
        Role
      </p>
      <p className="mt-1 text-gray-300 font-medium">
        Learner
      </p>
    </div>

  </div>

</div>


  </div>
</div>


<div className="max-w-6xl mx-auto mb-14">
  <div className="grid max-sm:grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-8 md:justify-items-center">

    <KpiItem
      label="Courses Purchased"
      value={courses.length}
    />

    <KpiItem
      label="Modules Unlocked"
      value={courses.reduce(
        (acc, c) => acc + c.modulesUnlocked.length,
        0
      )}
    />

    <KpiItem
      label="Payments Made"
      value={payments.length}
    />

    <KpiItem
      label="Full Courses"
      value={courses.filter(c => c.fullCoursePurchased).length}
    />

  </div>
</div>




      {/* Courses Purchased / Order History */}
      <SectionHeading title="Courses Purchased" />

<div className="max-w-6xl mx-auto mb-14">
  <div className="relative overflow-x-auto rounded-xl border border-white/10">
    <table className="w-full text-sm text-left text-gray-300">
     <thead className="sticky top-0 bg-[#0c1015] text-gray-400 uppercase text-xs tracking-wider">
  <tr>
    <th className="px-6 py-4 whitespace-nowrap">Course ID</th>
    <th className="px-6 py-4 text-center whitespace-nowrap">Modules</th>
    <th className="px-6 py-4 text-center whitespace-nowrap">Full Access</th>
    <th className="px-6 py-4 whitespace-nowrap">Status</th>
  </tr>
</thead>


      <tbody className="divide-y divide-white/5">
        {courses.map(c => (
          <tr
            key={c._id}
            className="hover:bg-white/5 transition-colors"
          >
    
            <td className="px-6 py-4 font-medium text-white">
  <span className="block whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-none">
     {c.courseId}
  </span>
</td>


            <td className="px-6 py-4 text-center">
              {c.modulesUnlocked.length}
            </td>

            <td className="px-6 py-4 text-center">
              {c.fullCoursePurchased ? "Yes" : "No"}
            </td>

            <td className="px-6 py-4">
              <StatusBadge status={c.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


      {/* Payment History */}
      <SectionHeading title="Payment History" />

<div className="max-w-6xl mx-auto mb-14">
  <div className="relative overflow-x-auto rounded-xl border border-white/10">
    <table className="w-full text-sm text-left text-gray-300">
      <thead className="sticky top-0 bg-[#0c1015] text-gray-400 uppercase text-xs tracking-wider">
        <tr>
          <th className="px-6 py-4">Payment ID</th>
          <th className="px-6 py-4">Course</th>
          <th className="px-6 py-4">Modules</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4">Date</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-white/5">
        {payments.map(p => (
          <tr
            key={p._id}
            className="hover:bg-white/5 transition-colors"
          >
            <td className="px-6 py-4 text-gray-400">
              {p.paymentId}
            </td>

            <td className="px-6 py-4 font-medium text-white">
  <span className="block whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-none">
    {p.courseSlug.toUpperCase()}
  </span>
</td>


            <td className="px-4 sm:px-6 py-4 max-w-[220px] sm:max-w-none">
  {Array.isArray(p.moduleIndex) && p.moduleIndex.length > 0 ? (
    <div
      className="
        flex gap-2
        overflow-x-auto sm:overflow-visible
        whitespace-nowrap
        scrollbar-thin scrollbar-thumb-white/10
      "
    >
      {p.moduleIndex.map((m: number) => (
        <span
          key={m}
          className="
            shrink-0
            px-2 py-1
            rounded-md
            bg-white/5
            text-[11px] sm:text-xs
            text-gray-300
          "
        >
          Module {m + 1}
        </span>
      ))}
    </div>
  ) : (
    <span className="px-2 py-1 rounded-md bg-white/5 text-[11px] sm:text-xs text-gray-300">
      Full Course
    </span>
  )}
</td>


            <td className="px-6 py-4">
              <StatusBadge status={p.status} />
            </td>

           <td className="px-6 py-4 text-gray-400">
  {p.timestamp ? (
    <div className="flex flex-col sm:block text-xs sm:text-sm">
      <span className="whitespace-nowrap">
        {new Date(p.timestamp).toLocaleDateString("en-IN", {
          dateStyle: "medium",
        })}
      </span>
      <span className="whitespace-nowrap text-gray-500 sm:ml-1 sm:inline">
        {new Date(p.timestamp).toLocaleTimeString("en-IN", {
          timeStyle: "short",
        })}
      </span>
    </div>
  ) : (
    "—"
  )}
</td>


          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
};

export default Profile;

/* Small Components */
const StatCard = ({ title, value }: any) => (
  <div className="bg-[#0f141a] border border-[#00ff9d20] p-6 rounded-xl text-center shadow hover:shadow-[0_0_12px_#00ff9d40] transition-all">
    <p className="text-gray-400 text-sm">{title}</p>
    <p className="text-2xl font-bold text-[#00ff9d] mt-2">{value}</p>
  </div>
);

const SectionHeading = ({ title }: { title: string }) => (
  <div className="mb-6 mt-12 flex items-center gap-3">
    <div className="h-4 w-1 rounded bg-emerald-400/80" />
    <h2 className="text-lg font-semibold text-white">
      {title}
    </h2>
  </div>
);


