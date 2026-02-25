import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2, Plus, Trash2, Check, UserCog, Shield, Database,
    Pencil, X, ChevronDown, ChevronRight, Briefcase, CheckCircle2,
    Eye, EyeOff,
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { useApp } from "../context/AppContext";

const EMPTY_COMPANY = {
    name: "", address: "", phone: "", email: "", industry: "", financialYear: "2025-2026",
};

function CompanyForm({ initial = EMPTY_COMPANY, onSave, onCancel }) {
    const [form, setForm] = useState(initial);
    const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

    return (
        <div className="bg-primary-50/40 rounded-2xl p-5 border border-primary-100 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">Company Name *</label>
                    <Input placeholder="e.g. Acme Corp Pvt. Ltd." value={form.name} onChange={set("name")} />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">Email</label>
                    <Input type="email" placeholder="accounts@company.in" value={form.email} onChange={set("email")} />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">Phone</label>
                    <Input placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">Industry</label>
                    <Input placeholder="Technology, Retail, Education…" value={form.industry} onChange={set("industry")} />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">Financial Year</label>
                    <Input placeholder="2025-2026" value={form.financialYear} onChange={set("financialYear")} />
                </div>
                <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">Registered Address</label>
                    <Input placeholder="City, State, Country" value={form.address} onChange={set("address")} />
                </div>
            </div>
            <div className="flex gap-3 pt-2 border-t border-primary-100">
                <Button variant="outline" className="shadow-none border-neutral-200" onClick={onCancel}>Cancel</Button>
                <Button className="gap-2" onClick={() => { if (form.name.trim()) onSave(form); }}>
                    <Check size={15} /> Save Company
                </Button>
            </div>
        </div>
    );
}

function CompanyCard({ company, isActive, onSetActive, onEdit, onDelete }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div layout className="border border-neutral-100 rounded-2xl overflow-hidden bg-white hover:border-primary-200 transition-colors">
            <div className="flex items-center justify-between gap-3 p-4 cursor-pointer" onClick={() => setExpanded(v => !v)}>
                <div className="flex items-center gap-3 min-w-0">
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isActive ? "bg-primary-100 text-primary-700" : "bg-neutral-100 text-neutral-500"}`}>
                        <Briefcase size={17} strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                        <div className="font-semibold text-sm text-neutral-900 truncate">{company.name}</div>
                        <div className="text-xs text-neutral-400 truncate">{company.email || company.industry || "No details"}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    {isActive && <Badge variant="default">Active</Badge>}
                    {expanded ? <ChevronDown size={16} className="text-neutral-400" /> : <ChevronRight size={16} className="text-neutral-400" />}
                </div>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-neutral-100"
                    >
                        <div className="p-4 flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                {[
                                    ["Industry", company.industry],
                                    ["Phone", company.phone],
                                    ["Email", company.email],
                                    ["Financial Year", company.financialYear],
                                    ["Address", company.address],
                                ].map(([label, value]) => value ? (
                                    <div key={label} className="col-span-1">
                                        <div className="text-xs text-neutral-400 uppercase tracking-wide font-medium">{label}</div>
                                        <div className="text-neutral-700 font-medium mt-0.5 break-words">{value}</div>
                                    </div>
                                ) : null)}
                            </div>
                            <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
                                {!isActive && (
                                    <Button variant="secondary" className="gap-2 text-xs h-8" onClick={onSetActive}>
                                        <CheckCircle2 size={13} /> Set as Active
                                    </Button>
                                )}
                                <Button variant="ghost" className="gap-2 text-xs h-8 border border-neutral-200" onClick={onEdit}>
                                    <Pencil size={13} /> Edit
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="gap-2 text-xs h-8 text-red-400 hover:text-red-600 hover:bg-red-50 ml-auto"
                                    onClick={onDelete}
                                >
                                    <Trash2 size={13} /> Remove
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function CompanyCredentialRow({ company }) {
    const { updateCompany } = useApp();
    const [loginId, setLoginId] = useState(company.loginId || "");
    const [password, setPassword] = useState(company.password || "");
    const [companyRole, setCompanyRole] = useState(company.companyRole || "Company Owner");
    const [showPw, setShowPw] = useState(false);
    const [editing, setEditing] = useState(!company.loginId);
    const [saved, setSaved] = useState(false);
    const [copied, setCopied] = useState("");

    const hasCredentials = company.loginId && company.password;

    const handleSave = () => {
        if (!loginId.trim() || !password.trim()) return;
        updateCompany(company.id, { loginId: loginId.trim(), password: password.trim(), companyRole });
        setSaved(true);
        setEditing(false);
        setTimeout(() => setSaved(false), 2000);
    };

    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopied(field);
        setTimeout(() => setCopied(""), 1500);
    };

    return (
        <div className="border border-neutral-100 rounded-2xl overflow-hidden">
            {/* Company header */}
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-primary-100 flex items-center justify-center">
                        <Briefcase size={13} className="text-primary-600" />
                    </div>
                    <span className="font-semibold text-sm text-neutral-900">{company.name}</span>
                </div>
                <button
                    onClick={() => setEditing(v => !v)}
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                >
                    <Pencil size={12} /> {editing ? "Cancel" : "Edit"}
                </button>
            </div>

            <div className="p-4">
                {/* Saved credentials display */}
                {hasCredentials && !editing && (
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between bg-neutral-50 rounded-xl px-4 py-2.5 border border-neutral-100">
                            <div>
                                <div className="text-xs text-neutral-400 uppercase tracking-wide font-medium mb-0.5">Login ID</div>
                                <div className="text-sm font-mono font-semibold text-neutral-900">{company.loginId}</div>
                            </div>
                            <button
                                onClick={() => copyToClipboard(company.loginId, "id")}
                                className="text-xs text-primary-600 hover:text-primary-700 font-medium px-2 py-1 rounded-lg hover:bg-primary-50 transition-colors"
                            >
                                {copied === "id" ? "✓ Copied" : "Copy"}
                            </button>
                        </div>
                        <div className="flex items-center justify-between bg-neutral-50 rounded-xl px-4 py-2.5 border border-neutral-100">
                            <div>
                                <div className="text-xs text-neutral-400 uppercase tracking-wide font-medium mb-0.5">Password</div>
                                <div className="text-sm font-mono font-semibold text-neutral-900 tracking-widest">
                                    {showPw ? company.password : "•".repeat(Math.min(company.password.length, 10))}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowPw(v => !v)}
                                    className="text-neutral-400 hover:text-neutral-600 transition-colors"
                                >
                                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                                <button
                                    onClick={() => copyToClipboard(company.password, "pw")}
                                    className="text-xs text-primary-600 hover:text-primary-700 font-medium px-2 py-1 rounded-lg hover:bg-primary-50 transition-colors"
                                >
                                    {copied === "pw" ? "✓ Copied" : "Copy"}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between bg-neutral-50 rounded-xl px-4 py-2.5 border border-neutral-100">
                            <div>
                                <div className="text-xs text-neutral-400 uppercase tracking-wide font-medium mb-0.5">Role</div>
                                <div className="text-sm font-semibold text-neutral-900">{company.companyRole || "Company Owner"}</div>
                            </div>
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${(company.companyRole || "Company Owner") === "Company Owner"
                                ? "bg-primary-100 text-primary-700"
                                : "bg-blue-100 text-blue-700"
                                }`}>{company.companyRole || "Company Owner"}</span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-1">Share these credentials with the company admin to let them log in.</p>
                    </div>
                )}

                {/* Edit / Create form */}
                {(!hasCredentials || editing) && (
                    <div className="flex flex-col gap-3">
                        {!hasCredentials && (
                            <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">
                                No credentials set yet. Create a Login ID and Password for this company.
                            </p>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">Login ID</label>
                                <Input
                                    placeholder="e.g. company@login.com"
                                    value={loginId}
                                    onChange={e => setLoginId(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">Password</label>
                                <div className="relative">
                                    <Input
                                        type={showPw ? "text" : "password"}
                                        placeholder="Set password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPw(v => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                                    >
                                        {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">Role / Access Level</label>
                                <div className="flex gap-3">
                                    {["Company Owner", "Accountant"].map(r => (
                                        <button
                                            key={r}
                                            type="button"
                                            onClick={() => setCompanyRole(r)}
                                            className={`flex-1 py-2.5 px-3 rounded-xl border-2 text-sm font-medium transition-all ${companyRole === r
                                                ? r === "Company Owner"
                                                    ? "border-primary-400 bg-primary-50 text-primary-700"
                                                    : "border-blue-400 bg-blue-50 text-blue-700"
                                                : "border-neutral-200 text-neutral-500 hover:border-neutral-300"
                                                }`}
                                        >
                                            {r}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-neutral-400 mt-1.5">
                                    {companyRole === "Company Owner"
                                        ? "Can view reports, add bills, see budget breakdown."
                                        : "Can view and add bills only. No budget or delete access."}
                                </p>
                            </div>
                        </div>
                        <Button
                            className={`h-9 px-4 text-sm gap-2 self-start ${saved ? "bg-emerald-500" : ""}`}
                            onClick={handleSave}
                        >
                            {saved ? <><Check size={14} /> Saved!</> : <><Check size={14} /> Save Credentials</>}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}


export function Settings() {
    const {
        departments, addDepartment, deleteDepartment,
        companies, activeCompanyId, addCompany, updateCompany, deleteCompany, setActiveCompanyId,
        currentRole, setCurrentRole, canDelete, canAdd,
    } = useApp();

    const [newDept, setNewDept] = useState("");
    const [addingDept, setAddingDept] = useState(false);
    const [addingCompany, setAddingCompany] = useState(false);
    const [editingCompanyId, setEditingCompanyId] = useState(null);

    const handleAddDept = () => {
        if (newDept.trim()) { addDepartment(newDept.trim()); setNewDept(""); setAddingDept(false); }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8 max-w-3xl">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Settings</h1>
                <p className="text-neutral-500 text-sm mt-1">Manage companies, departments, admin profile, and integrations.</p>
            </div>

            {/* ── COMPANIES ─────────────────────────────────────────── */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-amber-50 rounded-xl flex items-center justify-center">
                            <Briefcase size={20} className="text-amber-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-neutral-900">Companies</h3>
                            <p className="text-xs text-neutral-500">Manage multiple company profiles</p>
                        </div>
                    </div>
                    {canAdd && (
                        <Button className="gap-2 text-sm" onClick={() => { setAddingCompany(true); setEditingCompanyId(null); }}>
                            <Plus size={15} /> Add Company
                        </Button>
                    )}
                </div>

                <AnimatePresence>
                    {addingCompany && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-5 overflow-hidden">
                            <CompanyForm
                                onSave={(data) => { addCompany(data); setAddingCompany(false); }}
                                onCancel={() => setAddingCompany(false)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex flex-col gap-3">
                    {companies.map(company => (
                        <div key={company.id}>
                            {editingCompanyId === company.id ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <CompanyForm
                                        initial={company}
                                        onSave={(data) => { updateCompany(company.id, data); setEditingCompanyId(null); }}
                                        onCancel={() => setEditingCompanyId(null)}
                                    />
                                </motion.div>
                            ) : (
                                <CompanyCard
                                    company={company}
                                    isActive={activeCompanyId === company.id}
                                    onSetActive={() => setActiveCompanyId(company.id)}
                                    onEdit={() => { setEditingCompanyId(company.id); setAddingCompany(false); }}
                                    onDelete={() => deleteCompany(company.id)}
                                />
                            )}
                        </div>
                    ))}
                    {companies.length === 0 && (
                        <div className="text-center py-8 text-neutral-400 text-sm">No companies added yet. Click "Add Company" to start.</div>
                    )}
                </div>
            </Card>

            {/* ── DEPARTMENTS ───────────────────────────────────────── */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-primary-50 rounded-xl flex items-center justify-center">
                            <Building2 size={20} className="text-primary-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-neutral-900">Categories</h3>
                            <p className="text-xs text-neutral-500">Add or remove expense departments</p>
                        </div>
                    </div>
                    {canAdd && (
                        <Button className="gap-2 text-sm" onClick={() => setAddingDept(true)}>
                            <Plus size={15} /> Add Department
                        </Button>
                    )}
                </div>

                <AnimatePresence>
                    {addingDept && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-5 overflow-hidden">
                            <div className="flex items-center gap-3 bg-primary-50/60 rounded-2xl p-4 border border-primary-100">
                                <Input
                                    placeholder='e.g. "Operations" (Bills suffix is auto-added)'
                                    value={newDept}
                                    onChange={e => setNewDept(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && handleAddDept()}
                                    autoFocus
                                />
                                <Button className="h-11 w-11 p-0 rounded-xl flex-shrink-0" onClick={handleAddDept}><Check size={16} /></Button>
                                <Button variant="outline" className="h-11 w-11 p-0 rounded-xl shadow-none border-neutral-200 flex-shrink-0" onClick={() => { setAddingDept(false); setNewDept(""); }}>✕</Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex flex-col gap-2">
                    {departments.map((dept, i) => (
                        <motion.div
                            key={dept.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center justify-between p-4 rounded-2xl border border-neutral-100 bg-neutral-50/30 hover:bg-neutral-50 transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: dept.color || "#ff8c38" }} />
                                <span className="font-medium text-neutral-800 text-sm">{dept.label}</span>
                            </div>
                            {canDelete && (
                                <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0 rounded-lg text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 hover:bg-red-50 transition-all"
                                    onClick={() => deleteDepartment(dept.id)}
                                >
                                    <Trash2 size={15} />
                                </Button>
                            )}
                        </motion.div>
                    ))}
                </div>
            </Card>

            {/* ── ADMIN PROFILE ─────────────────────────────────────── */}
            <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center">
                        <UserCog size={20} className="text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-neutral-900">Admin Profile</h3>
                        <p className="text-xs text-neutral-500">Your accountant identity</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">Full Name</label>
                        <Input defaultValue="Admin User" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">Role</label>
                        <Input defaultValue="Accountant" readOnly className="bg-neutral-50 text-neutral-500" />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">Email</label>
                        <Input defaultValue="admin@company.in" />
                    </div>
                </div>
                <Button className="mt-5">Save Profile</Button>
            </Card>

            {/* ── ACCESS CONTROL ────────────────────────────────────── */}
            <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                        <Shield size={20} className="text-emerald-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-neutral-900">Access Control</h3>
                        <p className="text-xs text-neutral-500">Switch role to control what actions are available across the app</p>
                    </div>
                </div>

                <div className="mb-4 mt-5 flex items-center gap-2 bg-neutral-50 rounded-2xl px-4 py-2.5 border border-neutral-100">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-neutral-500">Currently signed in as</span>
                    <span className="text-xs font-bold text-neutral-900 ml-1">{currentRole}</span>
                </div>

                <div className="flex flex-col gap-3">
                    {[
                        {
                            role: "Company",
                            subtitle: "Owner / Admin",
                            description: "Can view, add bills, edit budgets, and delete bills. Cannot delete departments or manage companies.",
                            perms: ["View Dashboard", "Add Bills", "Edit Budget", "Delete Bills", "Export Reports"],
                            denied: ["Delete Categories", "Manage Companies"],
                            color: "border-primary-300 bg-primary-50/60",
                            badge: "bg-primary-100 text-primary-700",
                        },
                        {
                            role: "Accountant",
                            subtitle: "Staff / Employee",
                            description: "Can view everything and add bills, but cannot delete any data or manage companies.",
                            perms: ["View Dashboard", "Add Bills", "Edit Budget", "Export Reports"],
                            denied: ["Delete Bills", "Delete Categories", "Manage Companies"],
                            color: "border-blue-200 bg-blue-50/40",
                            badge: "bg-blue-100 text-blue-700",
                        },
                        {
                            role: "Viewer",
                            subtitle: "Read-only",
                            description: "Can only view dashboards and reports. Cannot add, edit, or delete anything.",
                            perms: ["View Dashboard", "Export Reports"],
                            denied: ["Add Bills", "Edit Budget", "Delete Bills", "Delete Categories", "Manage Companies"],
                            color: "border-neutral-200 bg-neutral-50/40",
                            badge: "bg-neutral-100 text-neutral-600",
                        },
                    ].map(({ role, subtitle, description, perms, denied, color, badge }) => {
                        const isActive = currentRole === role;
                        return (
                            <motion.div
                                key={role}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => setCurrentRole(role)}
                                className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${isActive ? color : "border-neutral-100 bg-white hover:border-neutral-200"}`}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-sm text-neutral-900">{role}</span>
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badge}`}>{subtitle}</span>
                                            {isActive && (
                                                <span className="ml-auto text-xs font-semibold text-emerald-600 flex items-center gap-1">
                                                    <CheckCircle2 size={13} /> Active
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-neutral-500 leading-relaxed mb-3">{description}</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {perms.map(p => (
                                                <span key={p} className="text-xs bg-emerald-50 text-emerald-700 rounded-lg px-2 py-0.5 font-medium flex items-center gap-1">
                                                    <Check size={11} /> {p}
                                                </span>
                                            ))}
                                            {(denied || []).map(p => (
                                                <span key={p} className="text-xs bg-red-50 text-red-400 rounded-lg px-2 py-0.5 font-medium flex items-center gap-1 line-through opacity-70">
                                                    {p}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-700 leading-relaxed">
                    <strong>Note:</strong> Role changes take effect instantly across the entire app. In production, roles would be managed server-side per user account.
                </div>
            </Card>

            {/* ── USER ACCOUNTS ─────────────────────────────────────── */}
            <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 bg-violet-50 rounded-xl flex items-center justify-center">
                        <UserCog size={20} className="text-violet-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-neutral-900">Company Login Credentials</h3>
                        <p className="text-xs text-neutral-500">Create login ID &amp; password for each company's dashboard access</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {companies.map((company) => (
                        <CompanyCredentialRow key={company.id} company={company} />
                    ))}
                    {companies.length === 0 && (
                        <div className="text-center py-6 text-neutral-400 text-sm">No companies added yet. Add one in the Companies section above.</div>
                    )}
                </div>
            </Card>

            {/* ── GOOGLE SHEETS ─────────────────────────────────────── */}
            <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 bg-amber-50 rounded-xl flex items-center justify-center">
                        <Database size={20} className="text-amber-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-neutral-900">Google Sheets Integration</h3>
                        <p className="text-xs text-neutral-500">Connect to your Apps Script backend</p>
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">Apps Script Web App URL</label>
                    <Input placeholder="https://script.google.com/macros/s/YOUR_ID/exec" />
                    <p className="text-xs text-neutral-400 mt-2">Deploy your Google Apps Script as a Web App and paste the URL here. New bills will be automatically pushed to your Google Sheet.</p>
                    <Button className="mt-4">Save Connection</Button>
                </div>
            </Card>
        </motion.div>
    );
}
