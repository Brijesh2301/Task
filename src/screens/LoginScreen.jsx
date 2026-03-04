import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { FaMeta } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { useNavigate } from "react-router-dom";


export default function LoginScreen({ onLogin }) {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", agreed: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [showPw, setShowPw]   = useState(false);

  const set = (k) => (e) =>
    setForm((p) => ({ ...p, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleSubmit = () => {
    if (!form.firstName || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!form.agreed) {
      setError("Please agree to the Terms & Conditions.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1200);
    
  };

  navigate("/dashboard");

  const features = [
    "Effortlessly spider and map targets to uncover hidden security flaws",
    "Deliver high-quality, validated findings in hours, not weeks.",
    "Generate professional, enterprise-grade security reports automatically.",
  ];

  const inputCls =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 bg-white outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition font-sans";

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gradient-to-br from-[#0a0f1a] via-[#0d1117] to-[#0f1520] relative overflow-hidden">
        
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="flex items-center p-4 gap-2.5 mb-12 lg:mb-16">
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white" />
            </div>
            <span className="font-semibold text-md text-white">aps</span>
          </div>

        <div className="absolute -bottom-24 -left-24 lg:flex-1 h-[480px] rounded-full bg-teal-500/[0.07] blur-3xl" />
        <div className="absolute top-1/3 -right-12 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -top-16 left-1/2 w-72 h-72 rounded-full bg-red-500/[0.06] blur-3xl" />
      </div>

      {/* ── Left Panel ── */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 lg:py-20 relative z-10 order-2 lg:order-1">
        <div className="max-w-md mx-auto lg:mx-0 w-full">
          {/* Logo */}
         
          <h1 className="text-2xl sm:text-3xl font-semibold text-white leading-tight mb-8">
            Expert level Cybersecurity
            <br />
            in{" "}
            <span className="text-teal-500">hours</span> not weeks.
          </h1>

          <p className="text-xs font-semibold text-white-500  tracking-widest mb-4">
            What's included
          </p>
          <ul className="flex flex-col gap-3">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                <span className="text-teal-500 mt-0.5 flex-shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-teal-400 text-sm">★</span>
              <span className="text-gray-300 text-sm font-semibold">Trustpilot</span>
            </div>
            <p className="text-sm text-white-100">
              Rated <span className="text-white font-bold">4.5/5.0</span>{" "}
              <span className="text-gray-400 text-xm">(100k+ reviews)</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Right Panel / Card ── */}
      <div className="flex items-center justify-center px-6 py-20 lg:w-[480px] relative z-10 order-1 lg:order-2">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8">
          {/* Header row */}
         <div className="relative flex items-center mb-1">
  <h2 className="text-2xl font-semibold text-center text-gray-700 w-full">
    Sign up
  </h2>

  <div className="absolute right-0">
    <ThemeToggle />
  </div>
</div>
         
           <p className="text-sm text-center  items-center font-semibold text-gray-600 mb-6">
            Already have an account?{" "}
              <button className="text-teal-500 font-semibold hover:underline">Log in</button>
           
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-500">
              {error}
            </div>
          )}

          {/* Fields */}
          <div className="flex flex-col gap-3">
            <input type="text"     placeholder="First name*"           value={form.firstName} onChange={set("firstName")} className={inputCls} />
            <input type="text"     placeholder="Last name*"            value={form.lastName}  onChange={set("lastName")}  className={inputCls} />
            <input type="email"    placeholder="Email address*"        value={form.email}     onChange={set("email")}     className={inputCls} />
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                placeholder="Password (8+ characters)*"
                value={form.password}
                onChange={set("password")}
                className={`${inputCls} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPw((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
              >
                {showPw ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2.5 mt-4 cursor-pointer">
            <input
              type="checkbox"
              checked={form.agreed}
              onChange={set("agreed")}
              className="mt-0.5 w-4 h-4 accent-teal-500 flex-shrink-0"
            />
            <span className="text-xs text-gray-600 font-semibold leading-relaxed">
              I agree to Aps's{" "}
              <button type="button" className="text-[#3D6DDF] hover:underline">Terms & Conditions</button>{" "}
              and acknowledge the{" "}
              <button type="button" className="text-[#3D6DDF] hover:underline">Privacy Policy</button>
            </span>
          </label>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-5 w-full py-3 bg-teal-500 hover:bg-teal-600 disabled:opacity-60 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </button>

          {/* Social */}
          <div className="flex gap-3 mt-3">
            <button className="flex-1 py-2.5 bg-black hover:bg-gray-900 text-white rounded-xl text-base transition flex items-center justify-center">
              <FaApple />

            </button>
            <button className="flex-1 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-blue-500 transition flex items-center justify-center">
              <FcGoogle />
            </button>
            <button className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center">
           <FaMeta />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}