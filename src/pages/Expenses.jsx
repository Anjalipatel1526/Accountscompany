import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Download, Filter, Pencil, Trash2, FileText, X, Search } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Badge } from "../components/ui/Badge";
import { AddBillModal } from "../components/ui/AddBillModal";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../components/ui/Table";
import { useApp } from "../context/AppContext";
import { exportToCSV } from "../utils/sheets";

export function Expenses() {
    const { expenses, deleteExpense, departments, canDelete, canAdd } = useApp();
    const [addOpen, setAddOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [deptFilter, setDeptFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    const filtered = expenses.filter(e => {
        const matchSearch = !search || e.description.toLowerCase().includes(search.toLowerCase()) || e.id.toLowerCase().includes(search.toLowerCase());
        const matchDept = deptFilter === "All" || e.department === deptFilter;
        const matchStatus = statusFilter === "All" || e.status === statusFilter;
        return matchSearch && matchDept && matchStatus;
    });

    const handleExportCSV = () => {
        exportToCSV(filtered.map(e => ({
            "Bill ID": e.id, Date: e.date, Department: e.department, Description: e.description, "Amount (₹)": e.amount, Status: e.status, "Uploaded By": e.uploader
        })), "expenses.csv");
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
            <AddBillModal open={addOpen} onClose={() => setAddOpen(false)} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Expenses</h1>
                    <p className="text-neutral-500 text-sm mt-1">Manage departmental bills and invoices.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 text-neutral-600 bg-white shadow-none border-neutral-200" onClick={handleExportCSV}>
                        <Download size={16} /> Export CSV
                    </Button>
                    {canAdd && (
                        <Button className="gap-2" onClick={() => setAddOpen(true)}>
                            <Plus size={16} /> Add Bill
                        </Button>
                    )}
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl luxury-shadow border border-primary-50 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Input
                        placeholder="Search description, ID..."
                        className="pl-10 max-w-md w-full"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                </div>
                <div className="w-full sm:w-48">
                    <Select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
                        <option value="All">All Departments</option>
                        {departments.map(d => <option key={d.id} value={d.label}>{d.label}</option>)}
                    </Select>
                </div>
                <div className="w-full sm:w-40">
                    <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                        <option value="All">All Status</option>
                        <option>Paid</option>
                        <option>Pending</option>
                        <option>Rejected</option>
                    </Select>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Bill ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead className="w-[280px]">Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <AnimatePresence>
                        {filtered.map((expense, i) => (
                            <motion.tr
                                key={expense.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ delay: i * 0.04 }}
                                className="border-b border-primary-50 hover:bg-neutral-50/50 transition-colors"
                            >
                                <TableCell className="font-medium text-neutral-900">{expense.id}</TableCell>
                                <TableCell className="text-neutral-500">{expense.date}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="h-2 w-2 rounded-full bg-primary-400 flex-shrink-0"></div>
                                        {expense.department}
                                    </div>
                                </TableCell>
                                <TableCell className="text-neutral-600">{expense.description}</TableCell>
                                <TableCell className="font-semibold text-neutral-900">₹{Number(expense.amount).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Badge variant={expense.status === "Paid" ? "success" : expense.status === "Pending" ? "warning" : "danger"}>
                                        {expense.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg"><FileText size={15} className="text-neutral-400" /></Button>
                                        <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg"><Pencil size={15} className="text-neutral-400" /></Button>
                                        {canDelete && (
                                            <Button
                                                variant="ghost"
                                                className="h-8 w-8 p-0 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => deleteExpense(expense.id)}
                                            >
                                                <Trash2 size={15} />
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                    {filtered.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={7} className="h-32 text-center text-neutral-400 text-sm">
                                No bills found. Try adjusting your filters.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </motion.div>
    );
}
