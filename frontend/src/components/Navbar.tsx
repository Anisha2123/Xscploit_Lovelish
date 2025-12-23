import React, { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // or wherever you store it

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
    // { label: "Labs", path: "/labs" },
    // { label: "Pricing", path: "/pricing" },
    { label: "Contact", path: "/contact" },
    { label: "Profile", path: `/profile/${userId}` },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-black/70 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => navigate("/login")}
          className="text-xl font-semibold tracking-wide text-white cursor-pointer"
        >
          X<span className="text-[#00ff9d]">sploit</span>
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav items-center gap-8 text-sm text-gray-300">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => navigate(link.path)}
              className="relative hover:text-white transition"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#00ff9d] transition-all group-hover:w-full"></span>
            </button>
          ))}

          {/* CTA */}
          <button
            onClick={() => navigate("/signup")}
            className="ml-4 px-4 py-2 rounded-md bg-[#00ff9d] text-black font-medium hover:opacity-90 transition"
          >
            Get Started
          </button>

          {/* Profile */}
          <User
  className="ml-2 w-5 h-5 cursor-pointer text-gray-400 hover:text-white transition"
  onClick={() => navigate(`/profile/${userId}`)}
/>
        </nav>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-gray-200"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
<div
  className={`
    md:hidden overflow-hidden
    transition-all duration-600 ease-in-out
    ${open ? "max-h-[500px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}
    bg-black/95 border-t border-white/5
  `}
>
  <div className="px-6 py-6 flex flex-col gap-4 text-gray-300">
    {navLinks.map((link) => (
      <button
        key={link.label}
        onClick={() => {
          navigate(link.path);
          setOpen(false);
        }}
        className="text-left text-base hover:text-white transition"
      >
        {link.label}
      </button>
    ))}

    <button
      onClick={() => navigate("/signup")}
      className="mt-4 py-2 rounded-md bg-[#00ff9d] text-black font-medium hover:opacity-90 transition"
    >
      Get Started
    </button>
  </div>
</div>

    </header>
  );
};

export default Navbar;
