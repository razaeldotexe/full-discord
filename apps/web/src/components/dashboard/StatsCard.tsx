import { Card, CardContent } from "../ui/card";
import { type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

const MotionCard = motion.create(Card);

interface StatsCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: LucideIcon;
    trend?: { value: number; positive: boolean };
    themeColor?: string;
}

export function StatsCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
    themeColor = "bg-orange-500",
}: StatsCardProps) {
    return (
        <MotionCard
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative overflow-hidden group hover:border-white/20 transition-all duration-300"
        >
            {/* Glow effect */}
            <div
                className={`absolute inset-0 ${themeColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
            />
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-400">{title}</p>
                        <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
                        {description && (
                            <p className="text-xs text-gray-500">{description}</p>
                        )}
                        {trend && (
                            <p
                                className={`text-xs font-medium ${trend.positive ? "text-emerald-400" : "text-red-400"
                                    }`}
                            >
                                {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
                            </p>
                        )}
                    </div>
                    <div
                        className={`p-3 rounded-xl ${themeColor} shadow-lg shadow-orange-500/20`}
                    >
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                </div>
            </CardContent>
        </MotionCard>
    );
}
