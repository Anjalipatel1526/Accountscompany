import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Building2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Table";
import { useApp } from "../context/AppContext";
import { exportToCSV } from "../utils/sheets";

const DEPT_COLORS_SOFT = [
    { bg: "bg-orange-50", text: "text-orange-600" },
    { bg: "bg-amber-50", text: "text-amber-600" },
    { bg: "bg-blue-50", text: "text-blue-600" },
    { bg: "bg-emerald-50", text: "text-emerald-600" },
    { bg: "bg-purple-50", text: "text-purple-600" },
    { bg: "bg-pink-50", text: "text-pink-600" },
];

export function DepartmentDetail() {
    const { label } = useParams();
    const navigate = useNavigate();
    const { expenses, departments, deptBudgets } = useApp();

    const deptLabel = decodeURIComponent(label);
    const deptIndex = departments.findIndex(d => d.label === deptLabel);
    const colorSet = DEPT_COLORS_SOFT[deptIndex >= 0 ? deptIndex % DEPT_COLORS_SOFT.length : 0];
    const budget = deptBudgets[deptLabel] || 0;

    const deptExpenses = expenses.filter(e => e.department === deptLabel);
    const total = deptExpenses.reduce((s, e) => s + Number(e.amount), 0);
    const paidTotal = deptExpenses.filter(e => e.status === "Paid").reduce((s, e) => s + Number(e.amount), 0);
    const pendingTotal = deptExpenses.filter(e => e.status === "Pending").reduce((s, e) => s + Number(e.amount), 0);

    const handleExport = () => {
        exportToCSV(
            deptExpenses.map(e => ({
                "Bill ID": e.id, Date: e.date, Description: e.description, "Amount (₹)": e.amount, Status: e.status,
            })),
            `${deptLabel.replace(/\s+/g, "_")}_expenses.csv`
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        className="h-10 w-10 p-0 rounded-xl border border-neutral-200 bg-white shadow-none"
                        onClick={() => navigate("/departments")}
                    >
                        <ArrowLeft size={18} className="text-neutral-600" />
                    </Button>
                    <div className={`h-11 w-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${colorSet.bg}`}>
                        <Building2 size={22} className={colorSet.text} strokeWidth={2} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">{deptLabel}</h1>
                        <p className="text-neutral-500 text-sm mt-0.5">
                            {deptExpenses.length} bill{deptExpenses.length !== 1 ? "s" : ""}
                            {budget > 0 && <span className="ml-2">· Budget: ₹{budget.toLocaleString()}</span>}
                        </p>
                    </div>
                </div>
                <Button variant="outline" onClick={handleExport} className="gap-2 shadow-none border-neutral-200 self-start sm:self-auto">
                    <Download size={15} /> Export CSV
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                    { label: "Total Spent", value: `₹${total.toLocaleString()}`, color: "text-neutral-900" },
                    { label: "Paid", value: `₹${paidTotal.toLocaleString()}`, color: "text-emerald-600" },
                    { label: "Pending", value: `₹${pendingTotal.toLocaleString()}`, color: "text-amber-600" },
                ].map(({ label, value, color }) => (
                    <div key={label} className="bg-white luxury-shadow rounded-2xl border border-primary-50 p-5">
                        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">{label}</div>
                        <div className={`text-2xl font-bold tracking-tight mt-2 ${color}`}>{value}</div>
                    </div>
                ))}
            </div>

            {/* Bills Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Bill ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {deptExpenses.map((e, i) => (
                        <motion.tr
                            key={e.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="border-b border-primary-50 hover:bg-neutral-50/40 transition-colors"
                        >
                            <TableCell className="font-medium text-neutral-900">{e.id}</TableCell>
                            <TableCell className="text-neutral-500">{e.date}</TableCell>
                            <TableCell className="text-neutral-700">{e.description}</TableCell>
                            <TableCell className="font-semibold text-neutral-900">₹{Number(e.amount).toLocaleString()}</TableCell>
                            <TableCell>
                                <Badge variant={e.status === "Paid" ? "success" : e.status === "Pending" ? "warning" : "danger"}>
                                    {e.status}
                                </Badge>
                            </TableCell>
                        </motion.tr>
                    ))}
                    {deptExpenses.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="h-32 text-center text-neutral-400 text-sm">
                                No bills found for <span className="font-medium">{deptLabel}</span>.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </motion.div>
    );
}
