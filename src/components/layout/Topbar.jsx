import { Search, Bell, UserCircle2 } from "lucide-react";
import { Input } from "../ui/Input";

export function Topbar() {
    return (
        <header className="h-20 border-b border-primary-50 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10 w-full luxury-shadow">
            <div className="flex items-center w-full max-w-md relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                <Input
                    placeholder="Search expenses, departments, or ledger..."
                    className="pl-11 bg-neutral-50 border-transparent hover:border-primary-100 focus-visible:bg-white focus-visible:border-primary-400 w-full"
                />
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-colors">
                    <Bell size={22} />
                    <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
                </button>
                <div className="h-8 w-[1px] bg-neutral-200"></div>
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-semibold text-neutral-900">Admin User</div>
                        <div className="text-xs text-neutral-500">Accountant</div>
                    </div>
                    <UserCircle2 size={36} className="text-primary-600" strokeWidth={1.5} />
                </div>
            </div>
        </header>
    );
}
