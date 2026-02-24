import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function Layout() {
    return (
        <div className="flex h-screen w-full bg-neutral-50 overflow-hidden text-neutral-900 font-sans antialiased">
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <Topbar />

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto w-full p-4 md:p-8">
                    <div className="mx-auto max-w-7xl h-full pb-10">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
