import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { IndianRupee, PieChart as PieChartIcon, Target, FileText, ChevronDown } from "lucide-react";
import { StatCard } from "../components/ui/StatCard";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { mockBudget, expenseChartData, departmentPieData, mockExpenses } from "../utils/mockData";

export function Dashboard() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col gap-8"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Dashboard Overview</h1>
                    <p className="text-neutral-500 text-sm mt-1">Track company expenses and manage your department bills.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2">
                        February 2026 <ChevronDown size={16} />
                    </Button>
                    <Button className="gap-2">
                        <IndianRupee size={16} /> Add Expense
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div variants={itemVariants}>
                    <StatCard
                        title="Total Monthly Budget"
                        value={`₹${(mockBudget.total / 100000).toFixed(2)}L`}
                        icon={Target}
                    />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <StatCard
                        title="Total Expense"
                        value={`₹${(mockBudget.spent / 100000).toFixed(2)}L`}
                        icon={IndianRupee}
                        trendType="bad"
                        trendValue="+12.5%"
                    />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <StatCard
                        title="Remaining Budget"
                        value={`₹${((mockBudget.total - mockBudget.spent) / 100000).toFixed(2)}L`}
                        icon={PieChartIcon}
                    />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <StatCard
                        title="Bills Uploaded"
                        value={mockExpenses.length.toString()}
                        icon={FileText}
                        trendType="good"
                        trendValue="+2"
                    />
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <Card className="h-[400px] flex flex-col">
                        <div className="mb-6">
                            <h3 className="font-semibold text-lg text-neutral-900">Expense Trend</h3>
                            <p className="text-sm text-neutral-500">Daily breakdown of company expenses</p>
                        </div>
                        <div className="flex-1 w-full min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={expenseChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ff8c38" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#ff8c38" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#a3a3a3', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a3a3a3', fontSize: 12 }} dx={-10} tickFormatter={(val) => `₹${val / 1000}k`} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="expenses" stroke="#ff8c38" strokeWidth={3} fillOpacity={1} fill="url(#colorExp)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="h-[400px] flex flex-col">
                        <div className="mb-2">
                            <h3 className="font-semibold text-lg text-neutral-900">Department Share</h3>
                            <p className="text-sm text-neutral-500">Expense distribution</p>
                        </div>
                        <div className="flex-1 w-full flex items-center justify-center relative min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={departmentPieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={3}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {departmentPieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
                                        itemStyle={{ color: '#171717' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Inner Label */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-xs text-neutral-400 font-medium">Top Dept</span>
                                <span className="text-lg font-bold text-neutral-900">Technical</span>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}
