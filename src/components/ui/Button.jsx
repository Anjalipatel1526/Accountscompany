import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export function Button({ className, variant = "primary", children, ...props }) {
    const baseStyles = "inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-md shadow-primary-500/20",
        secondary: "bg-primary-50 text-primary-800 hover:bg-primary-100",
        outline: "border border-primary-200 text-neutral-700 hover:bg-primary-50",
        ghost: "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 border border-transparent",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </motion.button>
    );
}
