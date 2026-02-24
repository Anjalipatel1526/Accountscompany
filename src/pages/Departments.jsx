import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";
import { Card } from "../components/ui/Card";
import { useApp } from "../context/AppContext";

const DEPT_COLORS_SOFT = [
    { bg: "bg-orange-50", text: "text-orange-600" },
    { bg: "bg-amber-50", text: "text-amber-600" },
    { bg: "bg-blue-50", text: "text-blue-600" },
    { bg: "bg-emerald-50", text: "text-emerald-600" },
    { bg: "bg-purple-50", text: "text-purple-600" },
    { bg: "bg-pink-50", text: "text-pink-600" },
];

export function Departments() {
    const { departments, expenses, deptBudgets } = useApp();
    const navigate = useNavigate();

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Departments</h1>
                <p className="text-neutral-500 text-sm mt-1">Click a department to view its bills.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {departments.map((dept, i) => {
                    const colorSet = DEPT_COLORS_SOFT[i % DEPT_COLORS_SOFT.length];
                    const spent = expenses.filter(e => e.department === dept.label).reduce((s, e) => s + Number(e.amount), 0);
                    const budget = deptBudgets[dept.label] || 0;
                    const billCount = expenses.filter(e => e.department === dept.label).length;

                    return (
                        <motion.div
                            key={dept.id}
                            whileHover={{ scale: 1.03, y: -3 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate(`/departments/${encodeURIComponent(dept.label)}`)}
                            className="cursor-pointer"
                        >
                            <Card className="flex flex-col gap-3 hover:border-primary-300 hover:shadow-md transition-all duration-200">
                                <div className={`h-11 w-11 rounded-2xl flex items-center justify-center ${colorSet.bg}`}>
                                    <Building2 size={22} className={colorSet.text} strokeWidth={2} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-neutral-900 text-sm leading-tight">{dept.label}</h3>
                                    <div className="text-xs text-neutral-400 mt-0.5">{billCount} bill{billCount !== 1 ? "s" : ""}</div>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                                    <div className={`text-sm font-semibold tracking-tight ${colorSet.text}`}>
                                        ₹{spent.toLocaleString()}
                                    </div>
                                    {budget > 0 && (
                                        <div className="text-xs text-neutral-400">/ ₹{(budget / 1000).toFixed(0)}k</div>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
