import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

const NAV = [
    { to: "/company", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/company/settings", icon: Settings, label: "Settings" },
];

export function CompanyLayout() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => { logout(); navigate("/login"); };

    return (
        <div className="flex h-screen w-full bg-neutral-50 overflow-hidden text-neutral-900 font-sans antialiased">
            {/* Sidebar */}
            <div className="w-56 flex-shrink-0 flex flex-col bg-white border-r border-neutral-100 luxury-shadow py-6 px-4">
                {/* Brand */}
                <div className="flex items-center gap-3 px-2 mb-8">
                    <div className="h-8 w-8 rounded-xl bg-primary-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-black text-sm">Fi</span>
                    </div>
                    <div className="min-w-0">
                        <div className="font-black text-sm tracking-tight text-neutral-900 truncate">FinAd</div>
                        <div className="text-xs text-neutral-400 truncate">{currentUser?.name}</div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex flex-col gap-1 flex-1">
                    {NAV.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/company"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${isActive
                                    ? "bg-primary-50 text-primary-700 font-semibold"
                                    : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800"
                                }`
                            }
                        >
                            <Icon size={17} strokeWidth={2} />
                            {label}
                        </NavLink>
                    ))}
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-all mt-4"
                >
                    <LogOut size={17} /> Sign Out
                </button>
            </div>

            {/* Main */}
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                {/* Topbar */}
                <div className="flex items-center justify-between h-16 px-8 bg-white border-b border-neutral-100">
                    <div className="text-sm text-neutral-500">
                        Welcome back, <span className="font-semibold text-neutral-900">{currentUser?.name}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-xs text-neutral-400 hover:text-red-500 transition-colors font-medium px-3 py-1.5 rounded-lg hover:bg-red-50"
                    >
                        <LogOut size={14} /> Sign Out
                    </button>
                </div>

                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="mx-auto max-w-5xl pb-10">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
