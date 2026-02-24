import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export const Select = forwardRef(({ className, children, ...props }, ref) => {
    return (
        <select
            className={cn(
                "flex h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm",
                "ring-offset-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all appearance-none",
                className
            )}
            ref={ref}
            {...props}
        >
            {children}
        </select>
    );
});

Select.displayName = "Select";
