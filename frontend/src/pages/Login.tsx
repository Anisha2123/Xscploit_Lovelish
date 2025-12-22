import React, { useState } from "react";
import AuthInput from "../components/AuthInput";
import { API } from "../utils/api";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
const location = useLocation();

const from = location.state?.from || "/Xsploit";
 console.log("API BASE URL:", import.meta.env.VITE_API_BASE_URL);


  const handleLogin = async () => {
  // --- FRONTEND VALIDATION ---
  if (!email || !password) {
    return setMsg("Please fill in all fields.");
  }

  // email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return setMsg("Please enter a valid email address.");
  }

  try {
    const res = await API.post("/auth/login", { email, password });

    const { token, userId, message } = res.data;

    // Save session
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    console.log(`userd is ${userId}`);

    setMsg(message || "Login successful.");
    // after successful login
    

    setTimeout(() => {
      navigate(from, { replace: true });
    }, 1000);

  } catch (e: any) {
    const error = e.response?.data?.error || "Something went wrong.";

    switch (error) {
      case "USER_NOT_FOUND":
        setMsg("Email not registered. Please sign up first.");
        break;

      case "INVALID_EMAIL_FORMAT":
        setMsg("Email format is invalid.");
        break;

      case "WRONG_PASSWORD":
        setMsg("Incorrect password. Try again.");
        break;

      case "ACCOUNT_LOCKED":
        setMsg("Your account has been locked due to multiple failed attempts.");
        break;

      case "SERVER_ERROR":
        setMsg("Internal error. Please try again later.");
        break;

      default:
        setMsg(error);
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
          LOGIN
        </h2>

        <AuthInput label="Email" value={email} setValue={setEmail} />
        <AuthInput label="Password" type="password" value={password} setValue={setPassword} />
          <Link
    to="/forgot-password"
    className="text-sm text-gray-400 hover:text-[#00ff9d] transition"
  >
    Forgot password?
  </Link>
        {msg && <p className="text-center text-sm text-[#ff4f4f] font-mono mt-2">{msg}</p>}

        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-[#00ff9d] text-black font-bold py-2 rounded-md 
                     hover:bg-white transition-all font-mono"
        >
          Sign In
        </button>

        <p className="text-gray-400 font-mono text-sm text-center mt-4">
          New here?{" "}
          <Link to="/signup" className="text-[#00ff9d] hover:underline">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
