import { cn } from "../../utils/cn";

export function Table({ className, children, ...props }) {
    return (
        <div className="w-full overflow-auto luxury-shadow rounded-2xl border border-primary-50">
            <table className={cn("w-full caption-bottom text-sm", className)} {...props}>
                {children}
            </table>
        </div>
    );
}

export function TableHeader({ className, ...props }) {
    return <thead className={cn("[&_tr]:border-b border-primary-100 bg-neutral-50/50", className)} {...props} />;
}

export function TableBody({ className, ...props }) {
    return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

export function TableRow({ className, ...props }) {
    return (
        <tr
            className={cn(
                "border-b border-primary-50 transition-colors hover:bg-neutral-50/50 data-[state=selected]:bg-neutral-50",
                className
            )}
            {...props}
        />
    );
}

export function TableHead({ className, ...props }) {
    return (
        <th
            className={cn(
                "h-12 px-6 text-left align-middle font-medium text-neutral-500 [&:has([role=checkbox])]:pr-0 tracking-wide uppercase text-xs",
                className
            )}
            {...props}
        />
    );
}

export function TableCell({ className, ...props }) {
    return (
        <td
            className={cn("p-6 align-middle [&:has([role=checkbox])]:pr-0 text-neutral-700", className)}
            {...props}
        />
    );
}
