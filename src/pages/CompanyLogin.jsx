import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, ArrowLeft, Eye, EyeOff, LogIn, ChevronRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export function CompanyLogin() {
    const { login, error, setError } = useAuth();
    const { companies } = useApp();
    const navigate = useNavigate();

    // companies that have credentials set by admin
    const activeCompanies = companies.filter(c => c.loginId && c.password);

    const [selected, setSelected] = useState(null); // selected company object
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSelect = (c) => {
        setSelected(c);
        setLoginId("");
        setPassword("");
        setError("");
    };

    const handleBack = () => {
        setSelected(null);
        setLoginId("");
        setPassword("");
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            const result = login(loginId, password);
            setLoading(false);
            if (result?.success && result.role === "company") {
                navigate("/company");
            }
        }, 700);
    };

    const cv = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 flex flex-col items-center justify-center p-4">

            {/* Brand mark */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-xl bg-primary-500 flex items-center justify-center">
                        <Building2 size={16} className="text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-neutral-900">FinAd</span>
                    <span className="text-xs font-medium text-neutral-400 border border-neutral-200 rounded-full px-2 py-0.5">Company Portal</span>
                </div>
                <p className="text-sm text-neutral-500">Sign in to your company account</p>
            </motion.div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={cv}
                className="w-full max-w-md"
            >
                <AnimatePresence mode="wait">
                    {/* ── Step 1: Company selector ─────────────────── */}
                    {!selected && (
                        <motion.div
                            key="pick"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.25 }}
                            className="bg-white rounded-3xl border border-neutral-100 shadow-xl shadow-neutral-100/80 p-8"
                        >
                            <h2 className="text-xl font-bold text-neutral-900 mb-1">Select your company</h2>
                            <p className="text-sm text-neutral-500 mb-6">Choose the company you're logging in for.</p>

                            {activeCompanies.length === 0 ? (
                                <div className="text-center py-10">
                                    <Building2 size={36} className="text-neutral-200 mx-auto mb-3" />
                                    <p className="text-sm text-neutral-500 font-medium">No company accounts yet.</p>
                                    <p className="text-xs text-neutral-400 mt-1">Ask your admin to create login credentials for your company.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {activeCompanies.map((c, i) => (
                                        <motion.button
                                            key={c.id}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            onClick={() => handleSelect(c)}
                                            className="flex items-center gap-4 p-4 rounded-2xl border-2 border-neutral-100 hover:border-primary-300 hover:bg-primary-50/40 text-left transition-all group"
                                        >
                                            <div className="h-11 w-11 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                                                <Building2 size={20} className="text-primary-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-semibold text-neutral-900 truncate">{c.name}</div>
                                                <div className="text-xs text-neutral-400 mt-0.5 flex items-center gap-1.5">
                                                    <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${c.companyRole === "Accountant"
                                                            ? "bg-blue-100 text-blue-600"
                                                            : "bg-primary-100 text-primary-600"
                                                        }`}>{c.companyRole || "Company Owner"}</span>
                                                    {c.industry && <span>· {c.industry}</span>}
                                                </div>
                                            </div>
                                            <ChevronRight size={16} className="text-neutral-300 group-hover:text-primary-400 transition-colors flex-shrink-0" />
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            <div className="mt-6 pt-6 border-t border-neutral-100 text-center">
                                <button onClick={() => navigate("/login")} className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
                                    Admin? <span className="underline">Sign in here</span>
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* ── Step 2: Login form for selected company ──── */}
                    {selected && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.25 }}
                            className="bg-white rounded-3xl border border-neutral-100 shadow-xl shadow-neutral-100/80 p-8"
                        >
                            {/* Back + company header */}
                            <button onClick={handleBack} className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-600 mb-6 transition-colors">
                                <ArrowLeft size={13} /> Back to companies
                            </button>

                            <div className="flex items-center gap-3 mb-6 p-4 bg-primary-50 rounded-2xl border border-primary-100">
                                <div className="h-10 w-10 rounded-xl bg-primary-500 flex items-center justify-center flex-shrink-0">
                                    <Building2 size={18} className="text-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-neutral-900">{selected.name}</div>
                                    <div className="text-xs text-primary-600 font-medium mt-0.5">{selected.companyRole || "Company Owner"}</div>
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-neutral-900 mb-1">Welcome back</h2>
                            <p className="text-sm text-neutral-500 mb-6">Enter your login credentials to continue.</p>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                {/* Login ID */}
                                <div>
                                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">Login ID</label>
                                    <input
                                        type="text"
                                        value={loginId}
                                        onChange={e => { setLoginId(e.target.value); setError(""); }}
                                        placeholder="Enter your login ID"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPw ? "text" : "password"}
                                            value={password}
                                            onChange={e => { setPassword(e.target.value); setError(""); }}
                                            placeholder="Enter your password"
                                            required
                                            className="w-full px-4 py-3 pr-12 rounded-xl border border-neutral-200 bg-neutral-50 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPw(v => !v)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                                        >
                                            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Error */}
                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3"
                                        >
                                            {error}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Submit */}
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="mt-2 h-12 w-full rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Signing in…
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2"><LogIn size={16} /> Sign In to {selected.name}</span>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
