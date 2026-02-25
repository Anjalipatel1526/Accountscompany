import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Building2,
    Layers,
    Settings,
    Menu,
    LogOut,
} from "lucide-react";
import { cn } from "../../utils/cn";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Building2, label: "Companies", path: "/companies" },
    { icon: Layers, label: "Categories", path: "/departments" },
    { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar({ className }) {
    const [collapsed, setCollapsed] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => { logout(); navigate("/login"); };

    return (
        <aside
            className={cn(
                "flex flex-col border-r border-primary-50 bg-white luxury-shadow transition-all duration-300 relative rounded-r-3xl",
                collapsed ? "w-20" : "w-64",
                className
            )}
        >
            <div className="flex h-20 items-center justify-between px-6 py-6 font-semibold border-b border-primary-50/50">
                {!collapsed && <span className="text-xl tracking-tight text-neutral-900 truncate">FinAd <span className="text-xs font-normal text-neutral-400 ml-1">Admin</span></span>}
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
                        end={item.path === "/"}
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
            <div className="px-3 pb-6">
                <button
                    onClick={handleLogout}
                    className={cn(
                        "flex items-center gap-3 w-full rounded-2xl px-3 py-3 text-sm font-medium text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-all",
                        collapsed && "justify-center"
                    )}
                >
                    <LogOut size={20} />
                    {!collapsed && <span>Sign Out</span>}
                </button>
            </div>
        </aside>
    );
}

