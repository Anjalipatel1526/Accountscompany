import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    ReceiptIndianRupee,
    Building2,
    Wallet,
    BookOpenText,
    FileBarChart,
    Settings,
    Menu
} from "lucide-react";
import { cn } from "../../utils/cn";
import { useState } from "react";

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: ReceiptIndianRupee, label: "Expenses", path: "/expenses" },
    { icon: Building2, label: "Departments", path: "/departments" },
    { icon: Wallet, label: "Budget", path: "/budget" },
    { icon: BookOpenText, label: "Ledger", path: "/ledger" },
    { icon: FileBarChart, label: "Reports", path: "/reports" },
    { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar({ className }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "flex flex-col border-r border-primary-50 bg-white luxury-shadow transition-all duration-300 relative rounded-r-3xl",
                collapsed ? "w-20" : "w-64",
                className
            )}
        >
            <div className="flex h-20 items-center justify-between px-6 py-6 font-semibold border-b border-primary-50/50">
                {!collapsed && <span className="text-xl tracking-tight text-neutral-900 truncate">FinAd</span>}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1 rounded-xl hover:bg-neutral-100 text-neutral-500 transition-colors mx-auto"
                >
                    <Menu size={20} />
                </button>
            </div>
            <nav className="flex flex-col gap-2 px-3 py-6 flex-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 rounded-2xl px-3 py-3 font-medium transition-all group relative",
                                isActive
                                    ? "bg-primary-50 text-primary-700"
                                    : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                            )
                        }
                        title={collapsed ? item.label : undefined}
                    >
                        {({ isActive }) => (
                            <>
                                <div className={cn(
                                    "flex items-center justify-center transition-transform",
                                    isActive ? "scale-110" : "group-hover:scale-110"
                                )}>
                                    <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                </div>
                                {!collapsed && <span className="truncate">{item.label}</span>}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>
            {!collapsed && (
                <div className="p-6">
                    <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-4 border border-primary-100/50 shadow-sm">
                        <h4 className="text-sm font-semibold text-primary-900 mb-1">Company Admins</h4>
                        <p className="text-xs text-primary-700 leading-relaxed text-balance">Track and manage every single expense effectively.</p>
                    </div>
                </div>
            )}
        </aside>
    );
}
