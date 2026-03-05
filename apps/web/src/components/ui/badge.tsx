import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: any[]) {
    return twMerge(clsx(inputs));
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "success" | "warning" | "danger" | "info";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const variantClasses: Record<string, string> = {
        default: "bg-white/10 text-gray-300",
        success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
        warning: "bg-amber-500/15 text-amber-400 border-amber-500/20",
        danger: "bg-red-500/15 text-red-400 border-red-500/20",
        info: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-medium transition-colors",
                variantClasses[variant],
                className
            )}
            {...props}
        />
    );
}

export { Badge };
