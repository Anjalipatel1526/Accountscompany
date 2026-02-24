import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle, Info } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function Toast() {
    const { toast } = useApp();

    const icons = {
        success: <CheckCircle className="text-emerald-500 flex-shrink-0" size={20} />,
        danger: <XCircle className="text-red-500 flex-shrink-0" size={20} />,
        info: <Info className="text-primary-500 flex-shrink-0" size={20} />,
    };

    return (
        <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="flex items-center gap-3 bg-white luxury-shadow rounded-2xl border border-neutral-100 px-5 py-3.5 text-sm font-medium text-neutral-800 min-w-[250px] pointer-events-auto"
                    >
                        {icons[toast.type] || icons.success}
                        {toast.message}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
