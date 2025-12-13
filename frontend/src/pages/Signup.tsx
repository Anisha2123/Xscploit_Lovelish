import React, { useState } from "react";
import AuthInput from "../components/AuthInput";
import { API } from "../utils/api";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async () => {
  try {
    setMsg("");

    const res = await API.post("/auth/signup", { name, email, password });

    setMsg("Account created successfully. Redirecting to login...");
    setTimeout(() => (window.location.href = "/"), 800);

  } catch (e: any) {
    const err = e.response?.data?.error;

    switch (err) {
      case "MISSING_FIELDS":
        setMsg("All fields are required.");
        break;
      case "INVALID_EMAIL_FORMAT":
        setMsg("Enter a valid email address.");
        break;
      case "WEAK_PASSWORD":
        setMsg("Password must be at least 8 chars with letters & numbers.");
        break;
      case "USER_EXISTS":
        setMsg("Account already exists. Try logging in.");
        break;
      default:
        setMsg("Something went wrong. Try again.");
    }
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080b0e] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#0a0f14] border border-[#00ff9d44] 
                   rounded-xl p-8 shadow-[0_0_20px_#00ff9d22]"
      >
        <h2 className="text-3xl font-bold text-[#00ff9d] font-mono text-center mb-6">
          SIGN UP
        </h2>

        <AuthInput label="Full Name" value={name} setValue={setName} />
        <AuthInput label="Email" value={email} setValue={setEmail} />
        <AuthInput label="Password" type="password" value={password} setValue={setPassword} />

        {msg && (
          <p className="text-center text-sm text-[#ff4f4f] font-mono mt-2">{msg}</p>
        )}

        <button
          onClick={handleSignup}
          className="w-full mt-6 bg-[#00ff9d] text-black font-bold py-2 rounded-md 
                     hover:bg-white transition-all font-mono"
        >
          Create Account
        </button>

        <p className="text-gray-400 font-mono text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-[#00ff9d] hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
