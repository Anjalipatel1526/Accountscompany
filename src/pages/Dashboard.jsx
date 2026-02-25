import { motion } from "framer-motion";
import { Building2, Users, CheckCircle2, XCircle, Key } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui/Card";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
    const { companies, departments } = useApp();
    const navigate = useNavigate();

    const companiesWithLogin = companies.filter(c => c.loginId && c.password);
    const companiesWithout = companies.filter(c => !c.loginId || !c.password);

    const cv = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
    const iv = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

    const stats = [
        { label: "Total Companies", value: companies.length, icon: Building2, color: "text-primary-600", bg: "bg-primary-50" },
        { label: "Active Logins", value: companiesWithLogin.length, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "No Login Set", value: companiesWithout.length, icon: XCircle, color: "text-amber-500", bg: "bg-amber-50" },
        { label: "Categories", value: departments.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    ];

    return (
        <motion.div initial="hidden" animate="visible" variants={cv} className="flex flex-col gap-8">
            {/* Header */}
            <motion.div variants={iv}>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Admin Overview</h1>
                <p className="text-neutral-500 text-sm mt-1">Manage companies and their access from here.</p>
            </motion.div>

            {/* Summary Stats */}
            <motion.div variants={iv} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map(({ label, value, icon: Icon, color, bg }) => (
                    <Card key={label} className="flex flex-col gap-3 p-5">
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${bg}`}>
                            <Icon size={20} className={color} strokeWidth={2} />
                        </div>
                        <div>
                            <div className="text-xs text-neutral-500 font-medium">{label}</div>
                            <div className="text-3xl font-black tracking-tight text-neutral-900 mt-0.5">{value}</div>
                        </div>
                    </Card>
                ))}
            </motion.div>

            {/* Companies list */}
            <motion.div variants={iv}>
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="font-bold text-neutral-900">Companies</h3>
                            <p className="text-xs text-neutral-500 mt-0.5">All registered company accounts</p>
                        </div>
                        <button
                            onClick={() => navigate("/companies")}
                            className="text-xs text-primary-600 hover:text-primary-700 font-semibold px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors"
                        >
                            Manage →
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        {companies.length === 0 && (
                            <div className="text-center py-8 text-neutral-400 text-sm">
                                No companies yet. <button onClick={() => navigate("/companies")} className="text-primary-600 underline">Add one</button>
                            </div>
                        )}
                        {companies.map((c, i) => {
                            const hasLogin = c.loginId && c.password;
                            return (
                                <motion.div
                                    key={c.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center justify-between p-4 rounded-2xl border border-neutral-100 bg-neutral-50/40 hover:border-neutral-200 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                                            <Building2 size={16} className="text-primary-600" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm text-neutral-900">{c.name}</div>
                                            <div className="text-xs text-neutral-400 mt-0.5">{c.industry || "—"} · {c.email || "No email"}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {hasLogin ? (
                                            <>
                                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.companyRole === "Accountant" ? "bg-blue-100 text-blue-700" : "bg-primary-100 text-primary-700"
                                                    }`}>{c.companyRole || "Company Owner"}</span>
                                                <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                                                    <Key size={11} /> Active Login
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full">No Login Set</span>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </Card>
            </motion.div>

            {/* Departments quick view */}
            <motion.div variants={iv}>
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="font-bold text-neutral-900">Categories</h3>
                            <p className="text-xs text-neutral-500 mt-0.5">Available across all company dashboards</p>
                        </div>
                        <button
                            onClick={() => navigate("/departments")}
                            className="text-xs text-primary-600 hover:text-primary-700 font-semibold px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors"
                        >
                            Manage →
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {departments.map((d) => (
                            <span key={d.id} className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-xl border border-neutral-100 bg-neutral-50 text-neutral-700">
                                <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color || "#ff8c38" }} />
                                {d.label}
                            </span>
                        ))}
                        {departments.length === 0 && (
                            <span className="text-sm text-neutral-400">No categories yet. Add them in Categories.</span>
                        )}
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    );
}
