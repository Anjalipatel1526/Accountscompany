import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Receipt, TrendingUp, Plus, Lock } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { AddBillModal } from "../components/ui/AddBillModal";

const ROLE_CONFIG = {
    "Company Owner": {
        badge: "bg-primary-100 text-primary-700",
        label: "Company Owner",
        canAdd: true,
        canViewBudget: true,
        canViewReports: true,
    },
    Accountant: {
        badge: "bg-blue-100 text-blue-700",
        label: "Accountant",
        canAdd: true,
        canViewBudget: false,
        canViewReports: false,
    },
};

export function CompanyDashboard() {
    const { currentUser } = useAuth();
    const { expenses, deptBudgets, totalBudget, departments } = useApp();
    const [addOpen, setAddOpen] = useState(false);

    const role = currentUser?.companyRole || "Company Owner";
    const perms = ROLE_CONFIG[role] || ROLE_CONFIG["Company Owner"];

    const companyExpenses = expenses;
    const totalSpent = companyExpenses.reduce((s, e) => s + Number(e.amount), 0);
    const remaining = totalBudget - totalSpent;
    const pct = Math.min((totalSpent / totalBudget) * 100, 100).toFixed(1);

    const deptPieData = departments.map((d, i) => ({
        name: d.label,
        value: companyExpenses.filter(e => e.department === d.label).reduce((s, e) => s + Number(e.amount), 0),
        fill: ["#ff8c38", "#f26f16", "#ffc291", "#10b981", "#8b5cf6"][i % 5],
    })).filter(d => d.value > 0);

    const stats = [
        { label: "Total Bills", value: companyExpenses.length, icon: Receipt, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Total Spent", value: `₹${(totalSpent / 1000).toFixed(0)}k`, icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
        ...(perms.canViewBudget ? [
            { label: "Total Budget", value: `₹${(totalBudget / 100000).toFixed(1)}L`, icon: Wallet, color: "text-primary-600", bg: "bg-primary-50" },
            { label: "Remaining", value: `₹${(remaining / 1000).toFixed(0)}k`, icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50" },
        ] : []),
    ];

    const cv = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
    const iv = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

    return (
        <motion.div initial="hidden" animate="visible" variants={cv} className="flex flex-col gap-8">
            {/* Greeting + role */}
            <motion.div variants={iv} className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                        Welcome, <span className="text-primary-600">{currentUser?.name}</span> 👋
                    </h1>
                    <p className="text-neutral-500 text-sm mt-1">Here's your company's expense overview.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${perms.badge}`}>{perms.label}</span>
                    {perms.canAdd && (
                        <Button className="gap-2 text-sm" onClick={() => setAddOpen(true)}>
                            <Plus size={15} /> Add Bill
                        </Button>
                    )}
                </div>
            </motion.div>

            {/* Access indicator for Accountant */}
            {role === "Accountant" && (
                <motion.div variants={iv} className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 text-sm text-blue-700">
                    <Lock size={15} className="flex-shrink-0" />
                    You have <strong className="mx-1">Accountant</strong> access — you can view bills and add new bills. Budget and report details are managed by the Company Owner.
                </motion.div>
            )}

            {/* Stat Cards */}
            <motion.div variants={iv} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map(({ label, value, icon: Icon, color, bg }) => (
                    <Card key={label} className="flex flex-col gap-3 p-5">
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${bg}`}>
                            <Icon size={20} className={color} strokeWidth={2} />
                        </div>
                        <div>
                            <div className="text-xs text-neutral-500 font-medium">{label}</div>
                            <div className="text-2xl font-bold tracking-tight text-neutral-900 mt-0.5">{value}</div>
                        </div>
                    </Card>
                ))}
            </motion.div>

            {/* Budget + Pie — Company Owner only */}
            {perms.canViewBudget && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div variants={iv}>
                        <Card className="p-6 flex flex-col gap-4">
                            <div>
                                <h3 className="font-bold text-neutral-900">Budget Used</h3>
                                <p className="text-xs text-neutral-500 mt-0.5">{pct}% of total budget spent</p>
                            </div>
                            <div className="h-4 rounded-full bg-neutral-100 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                    className={`h-full rounded-full ${Number(pct) > 80 ? "bg-red-400" : "bg-primary-400"}`}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-neutral-400 font-medium">
                                <span>₹0</span>
                                <span>₹{totalBudget.toLocaleString()}</span>
                            </div>
                            <div className="mt-2 flex flex-col gap-2">
                                {departments.map((d) => {
                                    const spent = companyExpenses.filter(e => e.department === d.label).reduce((s, e) => s + Number(e.amount), 0);
                                    const budget = deptBudgets[d.label] || 0;
                                    if (!spent && !budget) return null;
                                    return (
                                        <div key={d.id} className="flex items-center justify-between text-sm">
                                            <span className="text-neutral-600">{d.label}</span>
                                            <span className="font-semibold text-neutral-900">₹{spent.toLocaleString()}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div variants={iv}>
                        <Card className="p-6 flex flex-col gap-4">
                            <div>
                                <h3 className="font-bold text-neutral-900">Category Share</h3>
                                <p className="text-xs text-neutral-500 mt-0.5">Expense breakdown by department</p>
                            </div>
                            {deptPieData.length > 0 ? (
                                <>
                                    <div className="h-48">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={deptPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                                                    {deptPieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                                                </Pie>
                                                <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, ""]} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {deptPieData.map((d) => (
                                            <div key={d.name} className="flex items-center gap-1.5 text-xs text-neutral-600">
                                                <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.fill }} />
                                                {d.name}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="h-48 flex items-center justify-center text-neutral-400 text-sm">No expense data yet</div>
                            )}
                        </Card>
                    </motion.div>
                </div>
            )}

            {/* Recent Bills — visible to all */}
            <motion.div variants={iv}>
                <Card className="p-6">
                    <h3 className="font-bold text-neutral-900 mb-4">Recent Bills</h3>
                    <div className="flex flex-col gap-2">
                        {companyExpenses.slice(0, 8).map((e) => (
                            <div key={e.id} className="flex items-center justify-between py-2.5 border-b border-neutral-50 last:border-0">
                                <div>
                                    <div className="text-sm font-medium text-neutral-800">{e.description}</div>
                                    <div className="text-xs text-neutral-400 mt-0.5">{e.date} · {e.department}</div>
                                </div>
                                <div className="text-sm font-bold text-neutral-900">₹{Number(e.amount).toLocaleString()}</div>
                            </div>
                        ))}
                        {companyExpenses.length === 0 && (
                            <div className="text-center py-6 text-neutral-400 text-sm">No bills yet.</div>
                        )}
                    </div>
                </Card>
            </motion.div>

            <AddBillModal open={addOpen} onClose={() => setAddOpen(false)} />
        </motion.div>
    );
}
