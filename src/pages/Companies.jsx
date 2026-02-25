import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2, Plus, Trash2, Pencil, Check, X, Key, Eye, EyeOff, CheckCircle2
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useApp } from "../context/AppContext";

// ── inline form for adding/editing a company ─────────────────────────────────
function CompanyForm({ initial, onSave, onCancel }) {
    const blank = { name: "", email: "", phone: "", address: "", industry: "", financialYear: "2025-2026" };
    const [form, setForm] = useState(initial || blank);
    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    return (
        <div className="border border-primary-100 rounded-2xl p-5 bg-primary-50/30 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                    ["name", "Company Name", "UNAI Technologies"],
                    ["email", "Email", "accounts@company.in"],
                    ["phone", "Phone", "+91 98765 43210"],
                    ["industry", "Industry", "Technology"],
                    ["financialYear", "Financial Year", "2025-2026"],
                    ["address", "Address", "City, State"],
                ].map(([key, label, ph]) => (
                    <div key={key} className={key === "address" || key === "name" ? "sm:col-span-2" : ""}>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">{label}</label>
                        <Input placeholder={ph} value={form[key] || ""} onChange={set(key)} />
                    </div>
                ))}
            </div>
            <div className="flex gap-2 mt-1">
                <Button className="gap-2 h-9 px-4 text-sm" onClick={() => onSave(form)} disabled={!form.name.trim()}>
                    <Check size={14} /> {initial ? "Save Changes" : "Add Company"}
                </Button>
                <Button variant="outline" className="h-9 px-4 text-sm gap-2 bg-white" onClick={onCancel}>
                    <X size={14} /> Cancel
                </Button>
            </div>
        </div>
    );
}

// ── credential mini-row ───────────────────────────────────────────────────────
function CredentialSection({ company }) {
    const { updateCompany } = useApp();
    const [loginId, setLoginId] = useState(company.loginId || "");
    const [password, setPassword] = useState(company.password || "");
    const [role, setRole] = useState(company.companyRole || "Company Owner");
    const [showPw, setShowPw] = useState(false);
    const [editing, setEditing] = useState(false);
    const [saved, setSaved] = useState(false);
    const [copied, setCopied] = useState("");

    const has = company.loginId && company.password;

    const save = () => {
        if (!loginId.trim() || !password.trim()) return;
        updateCompany(company.id, { loginId: loginId.trim(), password: password.trim(), companyRole: role });
        setSaved(true); setEditing(false);
        setTimeout(() => setSaved(false), 2000);
    };

    const copy = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopied(key); setTimeout(() => setCopied(""), 1500);
    };

    if (!editing && has) return (
        <div className="mt-4 pt-4 border-t border-neutral-100">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide flex items-center gap-1"><Key size={11} /> Login Credentials</span>
                <button onClick={() => setEditing(true)} className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"><Pencil size={11} /> Edit</button>
            </div>
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between bg-neutral-50 rounded-xl px-3 py-2 border border-neutral-100">
                    <div>
                        <div className="text-xs text-neutral-400 leading-none mb-0.5">Login ID</div>
                        <div className="text-sm font-mono font-semibold text-neutral-900">{company.loginId}</div>
                    </div>
                    <button onClick={() => copy(company.loginId, "id")} className="text-xs text-primary-600 font-medium px-2 py-0.5 rounded-lg hover:bg-primary-50">{copied === "id" ? "✓" : "Copy"}</button>
                </div>
                <div className="flex items-center justify-between bg-neutral-50 rounded-xl px-3 py-2 border border-neutral-100">
                    <div>
                        <div className="text-xs text-neutral-400 leading-none mb-0.5">Password</div>
                        <div className="text-sm font-mono font-semibold text-neutral-900 tracking-widest">{showPw ? company.password : "•".repeat(Math.min(company.password?.length || 0, 10))}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <button onClick={() => setShowPw(v => !v)} className="text-neutral-400 hover:text-neutral-600">{showPw ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                        <button onClick={() => copy(company.password, "pw")} className="text-xs text-primary-600 font-medium px-2 py-0.5 rounded-lg hover:bg-primary-50">{copied === "pw" ? "✓" : "Copy"}</button>
                    </div>
                </div>
                <div className="flex items-center justify-between bg-neutral-50 rounded-xl px-3 py-2 border border-neutral-100">
                    <div>
                        <div className="text-xs text-neutral-400 leading-none mb-0.5">Role</div>
                        <div className="text-sm font-semibold text-neutral-900">{company.companyRole || "Company Owner"}</div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${(company.companyRole || "Company Owner") === "Company Owner" ? "bg-primary-100 text-primary-700" : "bg-blue-100 text-blue-700"}`}>{company.companyRole || "Company Owner"}</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="mt-4 pt-4 border-t border-neutral-100">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide flex items-center gap-1"><Key size={11} /> {has ? "Edit Login" : "Set Login Credentials"}</span>
                {has && <button onClick={() => setEditing(false)} className="text-xs text-neutral-400 hover:text-neutral-600">Cancel</button>}
            </div>
            {!has && <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100 mb-3">No login set yet. Create credentials for this company.</p>}
            <div className="flex flex-col gap-2">
                <Input placeholder="Login ID" value={loginId} onChange={e => setLoginId(e.target.value)} />
                <div className="relative">
                    <Input type={showPw ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="pr-10" />
                    <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">{showPw ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                </div>
                <div className="flex gap-2">
                    {["Company Owner", "Accountant"].map(r => (
                        <button key={r} onClick={() => setRole(r)} className={`flex-1 py-2 rounded-xl border-2 text-xs font-semibold transition-all ${role === r ? r === "Company Owner" ? "border-primary-400 bg-primary-50 text-primary-700" : "border-blue-400 bg-blue-50 text-blue-700" : "border-neutral-200 text-neutral-500"}`}>{r}</button>
                    ))}
                </div>
                <Button className={`h-9 text-sm gap-2 self-start ${saved ? "bg-emerald-500" : ""}`} onClick={save}>
                    {saved ? <><CheckCircle2 size={14} /> Saved!</> : <><Check size={14} /> Save</>}
                </Button>
            </div>
        </div>
    );
}

// ── main Companies page ───────────────────────────────────────────────────────
export function Companies() {
    const { companies, addCompany, updateCompany, deleteCompany, activeCompanyId, setActiveCompanyId } = useApp();
    const [adding, setAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [expandedId, setExpandedId] = useState(null);

    const cv = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
    const iv = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };

    return (
        <motion.div initial="hidden" animate="visible" variants={cv} className="flex flex-col gap-8 max-w-3xl">
            <motion.div variants={iv} className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Companies</h1>
                    <p className="text-neutral-500 text-sm mt-1">{companies.length} registered · {companies.filter(c => c.loginId).length} with login access</p>
                </div>
                <Button className="gap-2" onClick={() => { setAdding(true); setEditingId(null); }}>
                    <Plus size={16} /> Add Company
                </Button>
            </motion.div>

            <AnimatePresence>
                {adding && (
                    <motion.div key="add-form" variants={iv} initial="hidden" animate="visible" exit={{ opacity: 0, height: 0 }}>
                        <CompanyForm
                            onSave={(data) => { addCompany(data); setAdding(false); }}
                            onCancel={() => setAdding(false)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div variants={iv} className="flex flex-col gap-4">
                {companies.length === 0 && !adding && (
                    <Card className="p-12 text-center">
                        <Building2 size={40} className="text-neutral-200 mx-auto mb-3" />
                        <div className="text-neutral-500 text-sm">No companies yet. Click <strong>Add Company</strong> to get started.</div>
                    </Card>
                )}
                {companies.map((c) => {
                    const isActive = activeCompanyId === c.id;
                    const isEditing = editingId === c.id;
                    const isExpanded = expandedId === c.id;
                    const hasLogin = c.loginId && c.password;
                    return (
                        <Card key={c.id} className="p-6">
                            {isEditing ? (
                                <CompanyForm
                                    initial={c}
                                    onSave={(data) => { updateCompany(c.id, data); setEditingId(null); }}
                                    onCancel={() => setEditingId(null)}
                                />
                            ) : (
                                <>
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-3 min-w-0">
                                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isActive ? "bg-primary-500" : "bg-primary-100"}`}>
                                                <Building2 size={18} className={isActive ? "text-white" : "text-primary-600"} />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="font-bold text-neutral-900">{c.name}</span>
                                                    {isActive && <span className="text-xs bg-primary-100 text-primary-700 font-semibold px-2 py-0.5 rounded-full">Active</span>}
                                                    {hasLogin ? (
                                                        <span className="text-xs bg-emerald-50 text-emerald-700 font-medium px-2 py-0.5 rounded-full flex items-center gap-1"><Key size={10} /> Login Set</span>
                                                    ) : (
                                                        <span className="text-xs bg-amber-50 text-amber-600 font-medium px-2 py-0.5 rounded-full">No Login</span>
                                                    )}
                                                </div>
                                                <div className="text-xs text-neutral-400 mt-1 space-x-3">
                                                    {c.industry && <span>{c.industry}</span>}
                                                    {c.email && <span>{c.email}</span>}
                                                    {c.phone && <span>{c.phone}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 flex-shrink-0">
                                            {!isActive && (
                                                <Button variant="outline" className="h-8 px-3 text-xs bg-white" onClick={() => setActiveCompanyId(c.id)}>Set Active</Button>
                                            )}
                                            <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg" onClick={() => { setEditingId(c.id); setExpandedId(null); }}>
                                                <Pencil size={14} className="text-neutral-400" />
                                            </Button>
                                            <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => deleteCompany(c.id)}>
                                                <Trash2 size={14} />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Toggle credentials */}
                                    <button
                                        onClick={() => setExpandedId(isExpanded ? null : c.id)}
                                        className="mt-4 text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                                    >
                                        <Key size={12} /> {isExpanded ? "Hide" : (hasLogin ? "View / Edit Login" : "Set Login Credentials")}
                                    </button>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div key="cred" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                                                <CredentialSection company={c} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </>
                            )}
                        </Card>
                    );
                })}
            </motion.div>
        </motion.div>
    );
}
