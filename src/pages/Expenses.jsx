import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Filter, Download, MoreHorizontal, Pencil, Trash2, FileText } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Badge } from "../components/ui/Badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/Table";
import { mockExpenses, mockDepartments } from "../utils/mockData";

export function Expenses() {
    const [departmentFilter, setDepartmentFilter] = useState("All");

    const filteredExpenses = departmentFilter === "All"
        ? mockExpenses
        : mockExpenses.filter(e => e.department.includes(departmentFilter) || e.department === departmentFilter);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Expenses</h1>
                    <p className="text-neutral-500 text-sm mt-1">Manage departmental bills and invoices.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 text-neutral-600 bg-white">
                        <Download size={16} /> Export
                    </Button>
                    <Button className="gap-2">
                        <Plus size={16} /> Add Bill
                    </Button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl luxury-shadow border border-primary-50 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Input placeholder="Search description, ID..." className="pl-10 max-w-md w-full" />
                    <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                </div>
                <div className="w-full sm:w-48">
                    <Select
                        value={departmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                    >
                        <option value="All">All Departments</option>
                        {mockDepartments.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </Select>
                </div>
                <div className="w-full sm:w-40">
                    <Select>
                        <option>All Status</option>
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
                        <TableHead className="w-[300px]">Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredExpenses.map((expense, i) => (
                        <motion.tr
                            key={expense.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="border-b border-primary-50 hover:bg-neutral-50/50 transition-colors"
                        >
                            <TableCell className="font-medium text-neutral-900">{expense.id}</TableCell>
                            <TableCell className="text-neutral-500">{expense.date}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-primary-400"></div>
                                    {expense.department}
                                </div>
                            </TableCell>
                            <TableCell className="truncate max-w-[200px]">{expense.description}</TableCell>
                            <TableCell className="font-semibold text-neutral-900">₹{expense.amount.toLocaleString()}</TableCell>
                            <TableCell>
                                <Badge variant={expense.status === "Paid" ? "success" : expense.status === "Pending" ? "warning" : "danger"}>
                                    {expense.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg">
                                        <FileText size={16} className="text-neutral-500" />
                                    </Button>
                                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg">
                                        <Pencil size={16} className="text-neutral-500" />
                                    </Button>
                                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50">
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </TableCell>
                        </motion.tr>
                    ))}
                    {filteredExpenses.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={7} className="h-32 text-center text-neutral-500">
                                No bills found for the selected filters.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </motion.div>
    );
}
