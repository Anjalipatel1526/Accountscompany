import { cn } from "../../utils/cn";

export function Badge({ className, variant = "default", children, ...props }) {
    const variants = {
        default: "bg-primary-50 text-primary-700",
        success: "bg-emerald-50 text-emerald-700",
        warning: "bg-amber-50 text-amber-700",
        danger: "bg-red-50 text-red-700",
        neutral: "bg-neutral-100 text-neutral-700",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-tight transition-colors",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
