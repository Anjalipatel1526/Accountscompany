import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Layers } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useApp } from "../context/AppContext";

const DEPT_COLORS = ["#ff8c38", "#f26f16", "#10b981", "#8b5cf6", "#3b82f6", "#ec4899", "#f59e0b", "#06b6d4"];

export function AdminDepartments() {
    const { departments, addDepartment, deleteDepartment } = useApp();
    const [newLabel, setNewLabel] = useState("");
    const [selectedColor, setSelectedColor] = useState(DEPT_COLORS[0]);
    const [adding, setAdding] = useState(false);

    const handleAdd = () => {
        if (!newLabel.trim()) return;
        addDepartment({ label: newLabel.trim(), color: selectedColor });
        setNewLabel("");
        setAdding(false);
    };

    const cv = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
    const iv = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };

    return (
        <motion.div initial="hidden" animate="visible" variants={cv} className="flex flex-col gap-8 max-w-2xl">
            <motion.div variants={iv} className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Categories</h1>
                    <p className="text-neutral-500 text-sm mt-1">Categories are shared across all company dashboards.</p>
                </div>
                <Button className="gap-2" onClick={() => setAdding(v => !v)}>
                    <Plus size={16} /> Add Category
                </Button>
            </motion.div>

            {/* Add form */}
            <AnimatePresence>
                {adding && (
                    <motion.div
                        key="add"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <Card className="p-5 flex flex-col gap-4">
                            <h3 className="font-semibold text-neutral-900 text-sm">New Category</h3>
                            <div>
                                <label className="block text-xs font-semibold text-neutral-500 mb-1.5 uppercase tracking-wide">Name</label>
                                <Input
                                    placeholder="e.g. Marketing, Operations…"
                                    value={newLabel}
                                    onChange={e => setNewLabel(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && handleAdd()}
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-neutral-500 mb-2 uppercase tracking-wide">Color</label>
                                <div className="flex gap-2 flex-wrap">
                                    {DEPT_COLORS.map(c => (
                                        <button
                                            key={c}
                                            onClick={() => setSelectedColor(c)}
                                            className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${selectedColor === c ? "border-neutral-900 scale-110" : "border-transparent"}`}
                                            style={{ backgroundColor: c }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button className="gap-2 text-sm h-9" onClick={handleAdd} disabled={!newLabel.trim()}>
                                    <Plus size={14} /> Add
                                </Button>
                                <Button variant="outline" className="h-9 text-sm bg-white" onClick={() => { setAdding(false); setNewLabel(""); }}>
                                    Cancel
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Department list */}
            <motion.div variants={iv} className="flex flex-col gap-3">
                {departments.length === 0 && !adding && (
                    <Card className="p-12 text-center">
                        <Layers size={40} className="text-neutral-200 mx-auto mb-3" />
                        <div className="text-neutral-500 text-sm">No categories yet. Click <strong>Add Category</strong> to create one.</div>
                        <p className="text-xs text-neutral-400 mt-2">Categories you add here appear automatically in all company dashboards.</p>
                    </Card>
                )}
                {departments.map((d, i) => (
                    <motion.div
                        key={d.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-center justify-between p-4 rounded-2xl bg-white border border-neutral-100 shadow-sm group hover:border-neutral-200 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${d.color}22` }}>
                                <div className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: d.color || "#ff8c38" }} />
                            </div>
                            <div>
                                <div className="font-semibold text-neutral-900">{d.label}</div>
                                <div className="text-xs text-neutral-400 mt-0.5">Visible in all company dashboards</div>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 rounded-lg text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 hover:bg-red-50 transition-all"
                            onClick={() => deleteDepartment(d.id)}
                        >
                            <Trash2 size={15} />
                        </Button>
                    </motion.div>
                ))}
            </motion.div>

            {departments.length > 0 && (
                <motion.div variants={iv}>
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-sm text-blue-700">
                        <strong>ℹ️ Note:</strong> These {departments.length} categor{departments.length > 1 ? "ies" : "y"} are automatically available to all logged-in companies for expense categorisation.
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
