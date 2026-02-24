import { motion } from "framer-motion";
import { Download, Filter, Search } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/Table";
import { mockLedger } from "../utils/mockData";

export function Ledger() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Ledger Records</h1>
                    <p className="text-neutral-500 text-sm mt-1">Date-wise transaction history with running balances.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 text-neutral-600 bg-white shadow-none">
                        <Download size={16} /> Export CSV
                    </Button>
                    <Button variant="outline" className="gap-2 text-neutral-600 bg-white shadow-none">
                        <Download size={16} /> Export PDF
                    </Button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl luxury-shadow border border-primary-50 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Input placeholder="Search remarks, transactions..." className="pl-10 max-w-md w-full" />
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                </div>
                <div className="w-full sm:w-48 relative">
                    <Select defaultValue="February]">
                        <option>All Dates</option>
                        <option>February 2026</option>
                        <option>January 2026</option>
                    </Select>
                </div>
                <div className="w-full sm:w-48 relative">
                    <Select defaultValue="All">
                        <option>All Transactions</option>
                        <option>Debit Only</option>
                        <option>Credit Only</option>
                    </Select>
                    <Filter className="absolute right-10 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={14} />
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Department / Ref</TableHead>
                        <TableHead className="w-[200px]">Remarks</TableHead>
                        <TableHead className="text-right">Debit (-)</TableHead>
                        <TableHead className="text-right">Credit (+)</TableHead>
                        <TableHead className="text-right border-l border-primary-50 pl-6 text-primary-900 font-bold">Balance</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockLedger.map((record, i) => (
                        <motion.tr
                            key={record.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="border-b border-primary-50"
                        >
                            <TableCell className="text-neutral-500">{record.date}</TableCell>
                            <TableCell>
                                <div className="font-medium text-neutral-700">{record.department}</div>
                                <div className="text-xs text-neutral-400">{record.id}</div>
                            </TableCell>
                            <TableCell className="text-neutral-600">{record.remarks}</TableCell>
                            <TableCell className="text-right text-red-600 font-medium">
                                {record.type === "Debit" ? `₹${record.amount.toLocaleString()}` : "-"}
                            </TableCell>
                            <TableCell className="text-right text-emerald-600 font-medium">
                                {record.type === "Credit" ? `₹${record.amount.toLocaleString()}` : "-"}
                            </TableCell>
                            <TableCell className="text-right border-l border-primary-50 pl-6 font-semibold tracking-tight text-neutral-900 bg-neutral-50/30">
                                ₹{record.balance.toLocaleString()}
                            </TableCell>
                        </motion.tr>
                    ))}
                </TableBody>
            </Table>
        </motion.div>
    );
}
