import { motion } from "framer-motion";
import { Wallet, AlertTriangle } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Progress } from "../components/ui/Progress";
import { Button } from "../components/ui/Button";
import { mockBudget, departmentPieData } from "../utils/mockData";

export function Budget() {
    const percentage = (mockBudget.spent / mockBudget.total) * 100;
    const isWarning = percentage > 80;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8 max-w-4xl mx-auto py-4"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Budget vs Expense</h1>
                    <p className="text-neutral-500 text-sm mt-1">Monitor monthly targets and departmental spend.</p>
                </div>
                <Button className="gap-2 bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50 shadow-none">
                    Edit Budget
                </Button>
            </div>

            <Card className="p-8">
                <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600">
                            <Wallet size={24} />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-neutral-500 tracking-wide uppercase">February 2026 Budget</h2>
                            <div className="text-4xl font-bold tracking-tight text-neutral-900 mt-1">₹{(mockBudget.total).toLocaleString()}</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 mb-8">
                    <div className="flex justify-between items-end">
                        <div className="text-sm text-neutral-500 font-medium">
                            Spent <span className="text-neutral-900 font-semibold tracking-tight text-base ml-1">₹{(mockBudget.spent).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold tracking-tight text-neutral-600">
                            {percentage.toFixed(1)}%
                        </div>
                    </div>
                    <Progress value={percentage} className="h-4" />
                    <div className="flex justify-between text-xs text-neutral-400 font-medium">
                        <span>₹0</span>
                        <span>₹{(mockBudget.total).toLocaleString()}</span>
                    </div>
                </div>

                {isWarning && (
                    <div className="bg-red-50 text-red-800 rounded-2xl p-4 flex items-start gap-3 border border-red-100">
                        <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                            <h4 className="font-semibold text-sm">Budget Limit Warning</h4>
                            <p className="text-sm text-red-700/80 mt-1">You have utilized {percentage.toFixed(1)}% of your monthly budget. Consider reviewing upcoming departmental expenses.</p>
                        </div>
                    </div>
                )}
            </Card>

            <h3 className="text-lg font-bold tracking-tight text-neutral-900 mt-4 mb-2">Department Allocations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {departmentPieData.map((dept, i) => (
                    <motion.div
                        key={dept.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="p-5 flex items-center justify-between group hover:border-primary-200 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: dept.fill }}></div>
                                <div className="font-medium text-neutral-700">{dept.name}</div>
                            </div>
                            <div className="font-semibold tracking-tight text-neutral-900">₹{(dept.value).toLocaleString()}</div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
