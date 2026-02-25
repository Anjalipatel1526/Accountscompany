import { useState } from "react";
import { motion } from "framer-motion";
import { UserCircle2, Briefcase, Check } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";

export function CompanySettings() {
    const { currentUser } = useAuth();
    const { companies, updateCompany, showToast } = useApp();

    const company = companies.find((c) => c.id === currentUser?.companyId) || {};

    const [profile, setProfile] = useState({
        name: company.name || "",
        email: company.email || "",
        phone: company.phone || "",
        address: company.address || "",
        industry: company.industry || "",
        financialYear: company.financialYear || "2025-2026",
    });

    const [accountant, setAccountant] = useState({
        accountantName: company.accountantName || "",
        accountantEmail: company.accountantEmail || "",
        accountantPhone: company.accountantPhone || "",
        accountantRole: company.accountantRole || "Accountant",
    });

    const setP = (k) => (e) => setProfile((f) => ({ ...f, [k]: e.target.value }));
    const setA = (k) => (e) => setAccountant((f) => ({ ...f, [k]: e.target.value }));

    const saveProfile = () => {
        updateCompany(company.id, profile);
    };

    const saveAccountant = () => {
        updateCompany(company.id, accountant);
        showToast("Accountant details saved.", "success");
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8 max-w-2xl">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Settings</h1>
                <p className="text-neutral-500 text-sm mt-1">Manage your company profile and accountant details.</p>
            </div>

            {/* Company Profile */}
            <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 bg-amber-50 rounded-xl flex items-center justify-center">
                        <Briefcase size={20} className="text-amber-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-neutral-900">Company Profile</h3>
                        <p className="text-xs text-neutral-500">Your company's registered details</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">Company Name</label>
                        <Input value={profile.name} onChange={setP("name")} placeholder="Company Name" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">Email</label>
                        <Input type="email" value={profile.email} onChange={setP("email")} placeholder="accounts@company.in" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">Phone</label>
                        <Input value={profile.phone} onChange={setP("phone")} placeholder="+91 98765 43210" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">Industry</label>
                        <Input value={profile.industry} onChange={setP("industry")} placeholder="Technology, Retail…" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">Financial Year</label>
                        <Input value={profile.financialYear} onChange={setP("financialYear")} placeholder="2025-2026" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">Address</label>
                        <Input value={profile.address} onChange={setP("address")} placeholder="City, State, Country" />
                    </div>
                </div>

                <Button className="mt-5 gap-2" onClick={saveProfile}>
                    <Check size={15} /> Save Profile
                </Button>
            </Card>

            {/* Accountant Details */}
            <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center">
                        <UserCircle2 size={20} className="text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-neutral-900">Accountant Details</h3>
                        <p className="text-xs text-neutral-500">The finance professional handling your accounts</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">Full Name</label>
                        <Input value={accountant.accountantName} onChange={setA("accountantName")} placeholder="e.g. Anjali Patel" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">Email</label>
                        <Input type="email" value={accountant.accountantEmail} onChange={setA("accountantEmail")} placeholder="accountant@firm.com" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">Phone</label>
                        <Input value={accountant.accountantPhone} onChange={setA("accountantPhone")} placeholder="+91 98765 43210" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide">Role / Designation</label>
                        <Input value={accountant.accountantRole} onChange={setA("accountantRole")} placeholder="Accountant / Finance Manager" />
                    </div>
                </div>

                <Button className="mt-5 gap-2" onClick={saveAccountant}>
                    <Check size={15} /> Save Accountant Details
                </Button>
            </Card>
        </motion.div>
    );
}
