import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Calendar, Building2, DollarSign, FileText, Tag } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";
import { Select } from "./Select";
import { useApp } from "../../context/AppContext";

export function AddBillModal({ open, onClose }) {
    const { departments, addExpense } = useApp();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        date: new Date().toISOString().split("T")[0],
        department: departments[0]?.label || "",
        description: "",
        amount: "",
        status: "Paid",
        invoiceFile: null,
        invoiceName: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) setForm(f => ({ ...f, invoiceFile: file, invoiceName: file.name }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.department || !form.description || !form.amount || !form.date) return;
        setLoading(true);
        await addExpense({
            date: form.date,
            department: form.department,
            description: form.description,
            amount: Number(form.amount),
            status: form.status,
            invoice: form.invoiceName || null,
        });
        setLoading(false);
        setForm({ date: new Date().toISOString().split("T")[0], department: departments[0]?.label || "", description: "", amount: "", status: "Paid", invoiceFile: null, invoiceName: "" });
        onClose();
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl border border-primary-100 p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-xl font-bold text-neutral-900">Add New Bill</h2>
                                    <p className="text-sm text-neutral-500 mt-0.5">Saved to Google Sheets automatically</p>
                                </div>
                                <button onClick={onClose} className="p-2 rounded-xl hover:bg-neutral-100 text-neutral-400 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                            <Calendar size={13} className="inline mr-1.5 text-primary-500" />Date
                                        </label>
                                        <Input type="date" name="date" value={form.date} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                            <Tag size={13} className="inline mr-1.5 text-primary-500" />Status
                                        </label>
                                        <Select name="status" value={form.status} onChange={handleChange}>
                                            <option>Paid</option>
                                            <option>Pending</option>
                                            <option>Rejected</option>
                                        </Select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                        <Building2 size={13} className="inline mr-1.5 text-primary-500" />Department
                                    </label>
                                    <Select name="department" value={form.department} onChange={handleChange} required>
                                        {departments.map(d => (
                                            <option key={d.id} value={d.label}>{d.label}</option>
                                        ))}
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                        <FileText size={13} className="inline mr-1.5 text-primary-500" />Description
                                    </label>
                                    <Input name="description" placeholder="e.g. AWS Cloud Hosting - Jan" value={form.description} onChange={handleChange} required />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                        <DollarSign size={13} className="inline mr-1.5 text-primary-500" />Amount (₹)
                                    </label>
                                    <Input type="number" name="amount" placeholder="0" value={form.amount} onChange={handleChange} min="1" required />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                        <Upload size={13} className="inline mr-1.5 text-primary-500" />Invoice Upload <span className="text-neutral-400 text-xs">(PDF / Image)</span>
                                    </label>
                                    <label className="flex items-center gap-3 w-full h-11 rounded-2xl border border-dashed border-primary-200 bg-primary-50/50 px-4 cursor-pointer hover:bg-primary-50 transition-colors text-sm text-neutral-500">
                                        <Upload size={16} className="text-primary-500 flex-shrink-0" />
                                        <span className="truncate">{form.invoiceName || "Click to upload file..."}</span>
                                        <input type="file" className="hidden" accept=".pdf,image/*" onChange={handleFile} />
                                    </label>
                                </div>

                                <div className="flex gap-3 mt-2">
                                    <Button type="button" variant="outline" className="flex-1 shadow-none border-neutral-200" onClick={onClose}>Cancel</Button>
                                    <Button type="submit" className="flex-1" disabled={loading}>
                                        {loading ? "Saving..." : "Add Bill"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
