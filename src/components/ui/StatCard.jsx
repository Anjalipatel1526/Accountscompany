import { Card } from "./Card";
import { cn } from "../../utils/cn";

export function StatCard({ title, value, icon: Icon, trendType, trendValue, className }) {
    return (
        <Card className={cn("flex flex-col gap-4", className)}>
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-neutral-500">{title}</h3>
                {Icon && (
                    <div className="p-2.5 bg-primary-50 rounded-xl text-primary-600">
                        <Icon size={20} strokeWidth={2.5} />
                    </div>
                )}
            </div>
            <div>
                <div className="text-3xl font-semibold text-neutral-900 tracking-tight">{value}</div>
                {trendValue && (
                    <div className="mt-2 text-sm flex items-center gap-1.5">
                        <span className={cn(
                            "font-medium tracking-tight",
                            trendType === "bad" ? "text-red-500" : trendType === "good" ? "text-emerald-500" : "text-neutral-500"
                        )}>
                            {trendValue}
                        </span>
                        <span className="text-neutral-400">vs last month</span>
                    </div>
                )}
            </div>
        </Card>
    );
}
