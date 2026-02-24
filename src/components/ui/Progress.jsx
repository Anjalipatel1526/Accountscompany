import { forwardRef } from "react"
import { cn } from "../../utils/cn"

const Progress = forwardRef(({ className, value, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "relative h-4 w-full overflow-hidden rounded-full bg-primary-100",
            className
        )}
        {...props}
    >
        <div
            className={cn(
                "h-full w-full flex-1 transition-all duration-500 ease-in-out",
                value > 100 ? "bg-red-500" : value > 80 ? "bg-warning-500" : "bg-primary-500"
            )}
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </div>
))
Progress.displayName = "Progress"

export { Progress }
