import React, { useEffect, useState } from "react";
import { FaUserCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
  if (!userId) return;

  // Fetch user info
  axios.get(`http://localhost:5000/api/users/${userId}`)
    .then(res => setUser(res.data))
    .catch(err => console.error(err));

  // Fetch purchases
  axios.get(`http://localhost:5000/api/users/${userId}/purchases`)
    .then(res => setCourses(res.data))
    .catch(err => console.error(err));

  // Fetch payments
  axios.get(`http://localhost:5000/api/users/${userId}/payments`)
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

    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

      {/* Left: User Info */}
      <div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          {user?.name || "User"}
        </h1>

        <p className="text-gray-400 text-sm mt-1">
          {user?.email}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-6 mt-4 text-xs text-gray-500">
          <div>
            <p className="uppercase tracking-wider text-[10px] text-gray-600">
              User ID
            </p>
            <p className="text-gray-300 font-medium">
              {user?.userId}
            </p>
          </div>

          <div>
            <p className="uppercase tracking-wider text-[10px] text-gray-600">
              Account Created
            </p>
            <p className="text-gray-300 font-medium">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "—"}
            </p>
          </div>

          <div>
            <p className="uppercase tracking-wider text-[10px] text-gray-600">
              Account Status
            </p>
            <p className="text-[#00ff9d] font-medium">
              Active
            </p>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            localStorage.removeItem("userId");
            window.location.href = "/login";
          }}
          className="px-6 py-2 rounded-lg bg-[#00ff9d] text-black text-sm font-semibold hover:opacity-90 transition"
        >
          Logout
        </button>
      </div>

    </div>
  </div>
</div>


{/* Stats Overview */}
<div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
  <StatCard title="Courses Purchased" value={courses.length} />
  <StatCard
    title="Modules Unlocked"
    value={courses.reduce((acc, c) => acc + c.modulesUnlocked.length, 0)}
  />
  <StatCard title="Payments Made" value={payments.length} />
  <StatCard
    title="Full Courses"
    value={courses.filter(c => c.fullCoursePurchased).length}
  />
</div>



      {/* Courses Purchased / Order History */}
      <SectionHeading title="Courses Purchased" />
      <div className="max-w-6xl mx-auto overflow-x-auto mb-12">
        <table className="w-full text-left text-gray-300 border border-[#00ff9d20] rounded-lg">
          <thead className="bg-[#0c1015] text-[#00ff9d]">
            <tr>
              <th className="px-4 py-2">Course ID</th>
              <th className="px-4 py-2">Modules Unlocked</th>
              <th className="px-4 py-2">Full Course</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(c => (
              <tr key={c._id} className="border-t border-[#00ff9d10]">
                <td className="px-4 py-2">{c.courseId}</td>
                <td className="px-4 py-2">{c.modulesUnlocked.length}</td>
                <td className="px-4 py-2">{c.fullCoursePurchased ? "✔" : "✖"}</td>
                <td className="px-4 py-2">
                  {c.status === "paid" ? <FaCheckCircle className="text-[#00ff9d]" /> : <FaTimesCircle className="text-red-500" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment History */}
      <SectionHeading title="Payment History" />
      <div className="max-w-6xl mx-auto overflow-x-auto mb-12">
        <table className="w-full text-left text-gray-300 border border-[#00ff9d20] rounded-lg">
          <thead className="bg-[#0c1015] text-[#00ff9d]">
            <tr>
              <th className="px-4 py-2">Payment ID</th>
              <th className="px-4 py-2">Course</th>
              <th className="px-4 py-2">Modules Paid</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
  <tr key={p._id} className="border-t border-[#00ff9d10] hover:bg-[#00ff9d05] transition">
    
    {/* Payment ID */}
    <td className="px-4 py-3 text-sm text-gray-300">
      {p.paymentId}
    </td>

    {/* Course */}
    <td className="px-4 py-3 text-sm text-gray-300">
      {p.courseSlug.toUpperCase()}
    </td>

    {/* Modules */}
    <td className="px-4 py-3 text-sm">
      {Array.isArray(p.moduleIndex) && p.moduleIndex.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {p.moduleIndex.map((m: number) => (
            <span
              key={m}
              className="px-2 py-0.5 rounded-md bg-[#00ff9d15] text-[#00ff9d] text-xs font-medium"
            >
              Module {m + 1}
            </span>
          ))}
        </div>
      ) : (
        <span className="px-2 py-0.5 rounded-md bg-[#00ff9d15] text-[#00ff9d] text-xs font-medium">
          Full Course
        </span>
      )}
    </td>

    {/* Status */}
    <td className="px-4 py-3">
      {p.status === "paid" ? (
        <FaCheckCircle className="text-[#00ff9d]" />
      ) : (
        <FaTimesCircle className="text-red-500" />
      )}
    </td>

    {/* Timestamp */}
    <td className="px-4 py-3 text-sm text-gray-400">
      {p.timestamp
        ? new Date(p.timestamp).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          })
        : "—"}
    </td>

  </tr>
))}

          </tbody>
        </table>
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

const SectionHeading = ({ title }: any) => (
  <h2 className="text-2xl font-bold text-[#00ff9d] mb-4 mt-12 drop-shadow-[0_0_10px_#00ff9d80]">{title}</h2>
);
