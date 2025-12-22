import React, { useState, useEffect } from "react";
import AuthInput from "../components/AuthInput";
import { API } from "../utils/api";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type Step = "FORM" | "OTP" | "SUCCESS";

const Signup = () => {
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [otp, setOtp] = useState("");
const [timer, setTimer] = useState(60); // seconds
const [msg, setMsg] = useState("");
const [step, setStep] = useState<Step>("FORM");
const [loading, setLoading] = useState(false);

/* OTP META */
const [resendTimer, setResendTimer] = useState(0);
const [canResend, setCanResend] = useState(false);
const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);

/* LOCK */
const [isLocked, setIsLocked] = useState(false);
const [lockTimer, setLockTimer] = useState(0);

/* PASSWORD */
const [passwordRules, setPasswordRules] = useState<any>(null);

useEffect(() => {
  if (step !== "OTP") return;

  setTimer(30);
  setCanResend(false);

  const interval = setInterval(() => {
    setTimer((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        setCanResend(true);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [step]);
useEffect(() => {
  if (password) {
    setPasswordRules(validatePassword(password));
  } else {
    setPasswordRules(null);
  }
}, [password]);

useEffect(() => {
  if (resendTimer <= 0) {
    setCanResend(true);
    return;
  }

  const interval = setInterval(() => {
    setResendTimer(prev => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [resendTimer]);

const validateName = (name: string) => {
  const trimmed = name.trim();

  if (trimmed.length < 2) {
    return "Name must be at least 2 characters long";
  }

  if (!/^[A-Za-z ]+$/.test(trimmed)) {
    return "Name should contain only letters";
  }

  return null;
};


  /* STEP 1: SEND OTP */
  const sendOtp = async () => {
    const { isValid } = validatePassword(password);

  if (!isValid) {
    setMsg("Password does not meet security requirements.");
    return;
  }
      if (!email) return setMsg("Email is required");
  if (!name) return setMsg("Name is required");


  const nameError = validateName(name);
  if (nameError) return setMsg(nameError);

    try {
      setLoading(true);
      setMsg("");

      await API.post("/auth/send-otp", { email });

      setStep("OTP");
      setResendTimer(60)
      setCanResend(false)
      setMsg("OTP sent to your email.");
    } catch (e: any) {
       const data = e.response?.data;
  const error = data?.error;

  switch (error) {
    case "EMAIL_REQUIRED":
      setMsg("Email is required.");
      break;

    case "OTP_LOCKED":
      setIsLocked(true);
      setLockTimer(data.retryAfter);
      setStep("OTP")
      // setMsg(
      //   `Too many attempts. Try again in ${data.retryAfter}s.`
      // );
      setMsg("");
      break;

    case "RESEND_TOO_SOON":
      setMsg(
        `Please wait ${data.retryAfter}s before requesting a new OTP.`
      );
      setCanResend(false);
      setTimer(data.retryAfter);
      break;

    case "OTP_FAILED":
      setMsg("Unable to send OTP at the moment. Please try later.");
      break;

    default:
      setMsg("Something went wrong. Please try again.");
    }
    } finally {
      setLoading(false);
    }
  };

  /* STEP 2: VERIFY OTP + SIGNUP */
  const verifyOtp = async () => {
    if (!otp) {
      setMsg("Enter the OTP");
      return;
    }
    try {
      setLoading(true);
      setMsg("");

      await API.post("/auth/verify-otp", { email, otp });
      await API.post("/auth/signup", { name, email, password });

      setStep("SUCCESS");

      // 4. Redirect after short delay
    setTimeout(() => {
      window.location.href = "/"; // login route
    }, 1000);
     
    } catch (e: any) {
      const data = e.response?.data;
  const err = data?.error;
  console.log(err)
      switch (err) {
        case "INVALID_OTP":
          setMsg("Invalid or expired OTP.");
          setAttemptsLeft(data?.attemptsLeft ?? null);
          break;
        case "USER_EXISTS":
          setMsg("Account already exists.");
          break;
          case "OTP_EXPIRED":
  setMsg("OTP expired. Please request a new one.");
  setAttemptsLeft(null);
  break;

case "OTP_LOCKED":
      setIsLocked(true);
      setLockTimer(data?.retryAfter);
      setAttemptsLeft(0);
      setStep("OTP");
      setMsg("");
      // setMsg("Too many attempts.");
      break;

case "OTP_NOT_FOUND":
  setMsg("Please request OTP first.");
  break;

        default:
          setMsg("Verification failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };
 useEffect(() => {
  if (!isLocked || lockTimer <= 0) return;

  const interval = setInterval(() => {
    setLockTimer(prev => {
      if (prev <= 1) {
        setIsLocked(false);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [isLocked, lockTimer]);


  const resendOtp = async () => {
  try {
    setMsg("");
    setLoading(true);

    await API.post("/auth/send-otp", { email });

    setResendTimer(60);
    setCanResend(false);
    setMsg("New OTP sent to your email.");

  } catch (err: any) {
    const data = err.response?.data?.error;

    if (err === "RESEND_TOO_SOON") {
      setTimer(err.response.data.retryAfter);
      setCanResend(false);
      setMsg("Please wait before resending OTP.");
    } else if (err === "OTP_LOCKED") {
      setIsLocked(true);
  setLockTimer(err.retryAfter); // seconds
      setMsg(`Locked for ${data.retryAfter}s.`);
    } else {
      setMsg("Failed to resend OTP.");
    }

  } finally {
    setLoading(false);
  }
};

const validatePassword = (password: string) => {
  const rules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const isValid = Object.values(rules).every(Boolean);

  return { isValid, rules };
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080b0e] px-4">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="
      w-full max-w-md
      bg-[#0a0f14]
      border border-[#00ff9d22]
      rounded-2xl
      p-8 sm:p-10
      space-y-6
      shadow-[0_0_30px_#00ff9d11]
    "
  >
    {/* HEADER */}
    <div className="text-center space-y-2">
      <h2 className="text-2xl sm:text-3xl font-semibold text-[#00ff9d] tracking-wide">
        Create Account
      </h2>
      <p className="text-sm text-gray-400">
        Secure signup with email verification
      </p>
    </div>

    {/* ================= FORM STEP ================= */}
    {step === "FORM" && (
      <div className="space-y-4">
        <AuthInput label="Full Name" value={name} setValue={setName} />
        <AuthInput label="Email Address" value={email} setValue={setEmail} />
        <AuthInput
          label="Password"
          type="password"
          value={password}
          setValue={setPassword}
        />
         
{/* PASSWORD RULES */}
{passwordRules && (
  <div className="mt-2 space-y-1 text-xs">
    {[
      { label: "At least 8 characters", ok: passwordRules.rules.length },
      { label: "One uppercase letter", ok: passwordRules.rules.upper },
      { label: "One lowercase letter", ok: passwordRules.rules.lower },
      { label: "One number", ok: passwordRules.rules.number },
      { label: "One special character", ok: passwordRules.rules.special },
    ].map((rule, i) => (
      <div
        key={i}
        className={`flex items-center gap-2 ${
          rule.ok ? "text-green-400" : "text-gray-400"
        }`}
      >
        <span className="text-lg leading-none">
          {rule.ok ? "✓" : "•"}
        </span>
        <span>{rule.label}</span>
      </div>
    ))}
  </div>
)}
        <button
          onClick={sendOtp}
          disabled={loading}
          className="
            w-full py-3 rounded-xl font-semibold
            bg-[#00ff9d] text-black
            hover:bg-[#7bffd3]
            transition
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {loading ? "Sending OTP…" : "Verify Email"}
        </button>
      </div>
    )}

    {/* ================= OTP STEP ================= */}
   {/* ================= OTP STEP ================= */}
{step === "OTP" && (
  <div className="space-y-4">
    <AuthInput
      label="One-Time Password"
      value={otp}
      setValue={setOtp}
    />

    <button
      onClick={verifyOtp}
      disabled={loading || isLocked}
      className="
        w-full py-3 rounded-xl font-semibold
        bg-[#00ff9d] text-black
        hover:bg-[#7bffd3]
        transition
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {loading ? "Verifying…" : "Create Account"}
    </button>

    {/* OTP META INFO */}
    <div className="flex flex-col items-center gap-1 text-sm text-gray-400">

      {/* ATTEMPTS LEFT */}
      {attemptsLeft !== null && !isLocked && (
        <span>
          Attempts left:
          <span className="text-[#00ff9d] font-medium ml-1">
            {attemptsLeft}
          </span>
        </span>
      )}

      {/* RESEND OTP */}
      {!isLocked && (
        canResend ? (
          <button
            onClick={resendOtp}
            className="text-[#00ff9d] hover:underline"
          >
            Resend OTP
          </button>
        ) : (
          <span>
            Resend available in{" "}
            <span className="text-[#00ff9d] font-medium">
              {resendTimer}s
            </span>
          </span>
        )
      )}

      {/* LOCK STATE */}
      {isLocked && (
        <span className="text-red-400 text-center">
          Too many attempts. Try again in{" "}
          <span className="font-semibold">{lockTimer}s</span>
        </span>
      )}
    </div>
  </div>
)}


    {/* ================= SUCCESS ================= */}
    {step === "SUCCESS" && (
      <div className="text-center space-y-2">
        <p className="text-green-400 font-medium text-lg">
          Account created successfully
        </p>
        <p className="text-sm text-gray-400">
          You can now log in securely
        </p>
      </div>
    )}

    {/* ================= ERROR MESSAGE ================= */}
    {msg && !isLocked && (
      <p className="text-center text-sm text-red-400">
        {msg}
      </p>
    )}

    {/* ================= FOOTER ================= */}
    {step !== "SUCCESS" && (
      <p className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          to="/"
          className="text-[#00ff9d] hover:underline font-medium"
        >
          Login
        </Link>
      </p>
    )}
  </motion.div>
</div>

  );
};

export default Signup;
