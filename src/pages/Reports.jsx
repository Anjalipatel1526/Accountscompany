import { useState } from "react";
import { motion } from "framer-motion";
import { FileBarChart, FileSpreadsheet, Download, Calendar } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useApp } from "../context/AppContext";
import { exportToCSV, exportToPDF } from "../utils/sheets";

const EXPENSE_COLUMNS = [
    { key: "id", label: "Bill ID" },
    { key: "date", label: "Date" },
    { key: "department", label: "Department" },
    { key: "description", label: "Description" },
    { key: "amount", label: "Amount (₹)", isAmount: true },
    { key: "status", label: "Status" },
];

export function Reports() {
    const { expenses, deptBudgets, departments, totalBudget } = useApp();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const filtered = expenses.filter(e => {
        if (startDate && e.date < startDate) return false;
        if (endDate && e.date > endDate) return false;
        return true;
    });

    const handleExpensePDF = () => exportToPDF("Monthly Expense Report", filtered, EXPENSE_COLUMNS);
    const handleExpenseCSV = () => exportToCSV(filtered.map(e => ({
        "Bill ID": e.id, Date: e.date, Department: e.department, Description: e.description, "Amount (₹)": e.amount, Status: e.status
    })), "expense_report.csv");

    const deptRows = departments.map(d => ({
        Department: d.label,
        "Budget (₹)": deptBudgets[d.label] || 0,
        "Spent (₹)": expenses.filter(e => e.department === d.label).reduce((s, e) => s + Number(e.amount), 0),
        "Remaining (₹)": (deptBudgets[d.label] || 0) - expenses.filter(e => e.department === d.label).reduce((s, e) => s + Number(e.amount), 0),
    }));

    const handleDeptPDF = () => exportToPDF("Department-wise Summary", deptRows, [
        { key: "Department", label: "Department" },
        { key: "Budget (₹)", label: "Budget (₹)", isAmount: true },
        { key: "Spent (₹)", label: "Spent (₹)" },
        { key: "Remaining (₹)", label: "Remaining (₹)" },
    ]);
    const handleDeptCSV = () => exportToCSV(deptRows, "department_report.csv");

    const budgetRows = departments.map(d => {
        const spent = expenses.filter(e => e.department === d.label).reduce((s, e) => s + Number(e.amount), 0);
        const budget = deptBudgets[d.label] || 0;
        return {
            Department: d.label,
            "Budget (₹)": budget,
            "Actual (₹)": spent,
            "Variance (₹)": budget - spent,
            "% Used": budget > 0 ? ((spent / budget) * 100).toFixed(1) + "%" : "N/A",
        };
    });

    const handleBudgetPDF = () => exportToPDF("Budget Variance Report", budgetRows, [
        { key: "Department", label: "Department" },
        { key: "Budget (₹)", label: "Budget (₹)", isAmount: true },
        { key: "Actual (₹)", label: "Actual (₹)" },
        { key: "Variance (₹)", label: "Variance (₹)" },
        { key: "% Used", label: "% Used" },
    ]);
    const handleBudgetCSV = () => exportToCSV(budgetRows, "budget_variance.csv");

    const reportCards = [
        { title: "Monthly Expense Report", description: "All approved expenses in the selected date range with grand total.", icon: FileBarChart, color: "text-blue-600", bg: "bg-blue-50", onPDF: handleExpensePDF, onCSV: handleExpenseCSV },
        { title: "Department-wise Summary", description: "Budget vs actual per department with remaining balance.", icon: FileBarChart, color: "text-primary-600", bg: "bg-primary-50", onPDF: handleDeptPDF, onCSV: handleDeptCSV },
        { title: "Budget Variance Report", description: "Compare allocated vs actual expenditure with variance analysis.", icon: FileBarChart, color: "text-emerald-600", bg: "bg-emerald-50", onPDF: handleBudgetPDF, onCSV: handleBudgetCSV },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8 max-w-5xl">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Generate Reports</h1>
                <p className="text-neutral-500 text-sm mt-1">Download as PDF (print-ready) or Excel-compatible CSV. Grand totals are auto-calculated.</p>
            </div>

            {/* Date Range Filter */}
            <Card className="p-5 flex flex-col sm:flex-row items-end gap-4">
                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5"><Calendar size={13} className="inline mr-1.5" />From Date</label>
                    <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5"><Calendar size={13} className="inline mr-1.5" />To Date</label>
                    <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
                <Button variant="outline" className="h-11 shadow-none border-neutral-200 px-6 whitespace-nowrap" onClick={() => { setStartDate(""); setEndDate(""); }}>
                    Clear Filter
                </Button>
                <div className="text-sm text-neutral-500 whitespace-nowrap pt-2 sm:pt-0">
                    <span className="font-semibold text-neutral-900">{filtered.length}</span> bills · ₹{filtered.reduce((s, e) => s + Number(e.amount), 0).toLocaleString()} total
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reportCards.map((report, i) => (
                    <motion.div key={report.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                        <Card className="flex flex-col h-full hover:border-primary-200 transition-colors p-6">
                            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-5 ${report.bg} ${report.color}`}>
                                <report.icon size={24} strokeWidth={2} />
                            </div>
                            <h3 className="font-bold text-neutral-900 mb-2">{report.title}</h3>
                            <p className="text-sm text-neutral-500 flex-1 leading-relaxed">{report.description}</p>
                            <div className="mt-6 flex items-center gap-3">
                                <Button variant="outline" className="flex-1 gap-2 border-neutral-200 shadow-none text-xs font-semibold px-2" onClick={report.onCSV}>
                                    <FileSpreadsheet size={14} /> Excel CSV
                                </Button>
                                <Button className="flex-1 gap-2 text-xs font-semibold px-2" onClick={report.onPDF}>
                                    <Download size={14} /> PDF
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
