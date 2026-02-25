import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Login({ onLogin }) {
    const { login, error } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 600)); // brief UX delay
        const result = login(email, password);
        setLoading(false);
        if (result.success) onLogin(result.role);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50 p-4">
            {/* Background blobs */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full bg-orange-100/40 blur-3xl -z-10" />
            <div className="fixed bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-100/30 blur-3xl -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary-500 shadow-lg shadow-primary-200 mb-4">
                        <span className="text-white font-black text-xl tracking-tight">Fi</span>
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-neutral-900">FinAd</h1>
                    <p className="text-neutral-500 text-sm mt-1">Expense Management Platform</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl border border-primary-100 p-8">
                    <h2 className="text-xl font-bold text-neutral-900 mb-1">Sign in</h2>
                    <p className="text-sm text-neutral-500 mb-7">Enter your credentials to access your dashboard</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">Email / Login ID</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                                <input
                                    type="text"
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-neutral-200 bg-neutral-50 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 focus:bg-white transition-all"
                                    placeholder="admin@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                                <input
                                    type={showPw ? "text" : "password"}
                                    className="w-full h-11 pl-10 pr-11 rounded-xl border border-neutral-200 bg-neutral-50 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 focus:bg-white transition-all"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw((v) => !v)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                                >
                                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2.5 bg-red-50 text-red-700 rounded-xl px-4 py-3 text-sm border border-red-100"
                            >
                                <AlertCircle size={16} className="flex-shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        {/* Submit */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            className="w-full h-11 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-primary-200 mt-1"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin inline-block"></span>
                                    Signing in…
                                </span>
                            ) : "Sign in"}
                        </motion.button>
                    </form>

                    <p className="text-xs text-neutral-400 text-center mt-6">
                        Contact your administrator if you don't have credentials.
                    </p>
                </div>

                <p className="text-center text-xs text-neutral-400 mt-6">
                    © 2026 FinAd · UNAI Technologies
                </p>
            </motion.div>
        </div>
    );
}
