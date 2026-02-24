import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, AlertTriangle, Pencil, Check } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Progress } from "../components/ui/Progress";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useApp } from "../context/AppContext";

export function Budget() {
    const { expenses, departments, deptBudgets, totalBudget, setTotalBudget, updateDeptBudget, showToast } = useApp();
    const [editTotal, setEditTotal] = useState(false);
    const [newTotal, setNewTotal] = useState(String(totalBudget));
    const [editingDept, setEditingDept] = useState(null);
    const [deptInput, setDeptInput] = useState({});

    const totalSpent = expenses.reduce((s, e) => s + Number(e.amount), 0);
    const totalPct = Math.min((totalSpent / totalBudget) * 100, 100);
    const isWarning = (totalSpent / totalBudget) * 100 > 80;

    const handleSaveTotal = () => {
        if (!isNaN(Number(newTotal)) && Number(newTotal) > 0) {
            setTotalBudget(Number(newTotal));
            showToast("Total budget updated!", "success");
        }
        setEditTotal(false);
    };

    const handleSaveDept = (deptLabel) => {
        const val = deptInput[deptLabel];
        if (!isNaN(Number(val)) && Number(val) >= 0) {
            updateDeptBudget(deptLabel, Number(val));
            showToast(`"${deptLabel}" budget updated.`, "success");
        }
        setEditingDept(null);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8 max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Budget vs Expense</h1>
                    <p className="text-neutral-500 text-sm mt-1">Monitor monthly targets and split budgets per department.</p>
                </div>
            </div>

            {/* Total Budget Card */}
            <Card className="p-8">
                <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600">
                            <Wallet size={24} />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-neutral-500 tracking-wide uppercase">Total Monthly Budget</h2>
                            {editTotal ? (
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-2xl font-bold text-neutral-600">₹</span>
                                    <Input
                                        type="number"
                                        className="w-40 h-10 text-2xl font-bold text-neutral-900 border-primary-300"
                                        value={newTotal}
                                        onChange={e => setNewTotal(e.target.value)}
                                        autoFocus
                                    />
                                    <Button className="h-9 px-4 gap-1.5" onClick={handleSaveTotal}><Check size={16} /> Save</Button>
                                </div>
                            ) : (
                                <div className="text-4xl font-bold tracking-tight text-neutral-900 mt-1">₹{Number(totalBudget).toLocaleString()}</div>
                            )}
                        </div>
                    </div>
                    {!editTotal && (
                        <Button variant="outline" className="gap-2 shadow-none border-neutral-200" onClick={() => { setEditTotal(true); setNewTotal(String(totalBudget)); }}>
                            <Pencil size={15} /> Edit
                        </Button>
                    )}
                </div>

                <div className="space-y-3 mb-8">
                    <div className="flex justify-between items-end">
                        <div className="text-sm text-neutral-500 font-medium">
                            Spent <span className="text-neutral-900 font-semibold text-base ml-1">₹{totalSpent.toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold tracking-tight text-neutral-600">{totalPct.toFixed(1)}%</div>
                    </div>
                    <Progress value={totalPct} className="h-4" />
                    <div className="flex justify-between text-xs text-neutral-400 font-medium">
                        <span>₹0</span>
                        <span>₹{Number(totalBudget).toLocaleString()}</span>
                    </div>
                </div>

                {isWarning && (
                    <div className="bg-red-50 text-red-800 rounded-2xl p-4 flex items-start gap-3 border border-red-100">
                        <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                            <h4 className="font-semibold text-sm">Budget Limit Warning</h4>
                            <p className="text-sm text-red-700/80 mt-1">You've utilized {((totalSpent / totalBudget) * 100).toFixed(1)}% of your monthly budget.</p>
                        </div>
                    </div>
                )}
            </Card>

            {/* Per-Department Budget Split */}
            <div>
                <h3 className="text-lg font-bold tracking-tight text-neutral-900 mb-4">Department Budget Split</h3>
                <div className="flex flex-col gap-4">
                    {departments.map((dept, i) => {
                        const spent = expenses.filter(e => e.department === dept.label).reduce((s, e) => s + Number(e.amount), 0);
                        const budget = deptBudgets[dept.label] || 0;
                        const pct = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
                        const isEditing = editingDept === dept.label;

                        return (
                            <motion.div key={dept.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                                <Card className="p-5">
                                    <div className="flex items-center justify-between gap-4 mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: dept.color }} />
                                            <span className="font-semibold text-neutral-800 text-sm">{dept.label}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {isEditing ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-neutral-500">₹</span>
                                                    <Input
                                                        type="number"
                                                        className="w-32 h-9 text-sm"
                                                        defaultValue={budget}
                                                        onChange={e => setDeptInput(p => ({ ...p, [dept.label]: e.target.value }))}
                                                        autoFocus
                                                    />
                                                    <Button className="h-9 px-3 gap-1 text-xs" onClick={() => handleSaveDept(dept.label)}><Check size={14} /> Save</Button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="text-right">
                                                        <div className="text-xs text-neutral-400">Spent / Budget</div>
                                                        <div className="text-sm font-semibold text-neutral-700 tracking-tight">
                                                            ₹{spent.toLocaleString()} <span className="text-neutral-400 font-normal">/  {budget > 0 ? `₹${budget.toLocaleString()}` : "Not Set"}</span>
                                                        </div>
                                                    </div>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg" onClick={() => { setEditingDept(dept.label); setDeptInput(p => ({ ...p, [dept.label]: String(budget) })); }}>
                                                        <Pencil size={14} className="text-neutral-400" />
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <Progress value={pct} className="h-2" />
                                    <div className="flex justify-between text-xs text-neutral-400 mt-1.5">
                                        <span>{pct.toFixed(0)}% used</span>
                                        <span>Remaining: ₹{Math.max(budget - spent, 0).toLocaleString()}</span>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}
