import { motion } from "framer-motion";
import { FileBarChart, Download, FileSpreadsheet, Calendar } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

const reportsList = [
    {
        title: "Monthly Expense Report",
        description: "Comprehensive breakdown of all expenses incurred during the selected month.",
        icon: FileBarChart,
        color: "text-blue-500",
        bg: "bg-blue-50"
    },
    {
        title: "Department-wise Summary",
        description: "Aggregated expenditure analysis grouped by corporate departments.",
        icon: FileBarChart,
        color: "text-primary-600",
        bg: "bg-primary-50"
    },
    {
        title: "Budget Variance Report",
        description: "Comparison of actual expenses versus allocated budget limits.",
        icon: FileBarChart,
        color: "text-emerald-500",
        bg: "bg-emerald-50"
    }
];

export function Reports() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8 max-w-5xl"
        >
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Generate Reports</h1>
                <p className="text-neutral-500 text-sm mt-1">Download and analyze financial data with automated grand totals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reportsList.map((report, i) => (
                    <motion.div
                        key={report.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="flex flex-col h-full hover:border-primary-200 transition-colors p-6">
                            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-6 ${report.bg} ${report.color}`}>
                                <report.icon size={24} strokeWidth={2} />
                            </div>
                            <h3 className="font-bold text-neutral-900 mb-2">{report.title}</h3>
                            <p className="text-sm text-neutral-500 flex-1 leading-relaxed">{report.description}</p>

                            <div className="mt-8 flex items-center gap-3">
                                <Button variant="outline" className="flex-1 gap-2 border-neutral-200 font-semibold shadow-none text-xs px-2">
                                    <Download size={14} /> PDF
                                </Button>
                                <Button className="flex-1 gap-2 font-semibold text-xs px-2">
                                    <FileSpreadsheet size={14} /> Excel
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <h3 className="text-lg font-bold tracking-tight text-neutral-900 mt-6 mb-2">Custom Report Builder</h3>
            <Card className="p-6">
                <div className="flex flex-col sm:flex-row gap-6 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Select Date Range</label>
                        <div className="flex items-center gap-3 text-sm">
                            <Button variant="outline" className="flex-1 justify-start font-normal text-neutral-500 border-neutral-200 shadow-none">
                                <Calendar size={16} className="mr-2" /> Start Date
                            </Button>
                            <span className="text-neutral-400">to</span>
                            <Button variant="outline" className="flex-1 justify-start font-normal text-neutral-500 border-neutral-200 shadow-none">
                                <Calendar size={16} className="mr-2" /> End Date
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Report Type</label>
                        <select className="flex h-[42px] w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400">
                            <option>Complete General Ledger</option>
                            <option>Custom Budget Review</option>
                        </select>
                    </div>
                    <Button className="w-full sm:w-auto h-[42px] px-8 whitespace-nowrap">
                        Generate Now
                    </Button>
                </div>
            </Card>
        </motion.div>
    );
}
