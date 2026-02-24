import { cn } from "../../utils/cn";

export function Card({ className, children, ...props }) {
    return (
        <div
            className={cn(
                "bg-white luxury-shadow rounded-2xl border border-primary-100 p-6",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
