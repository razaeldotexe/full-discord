"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Webhook,
    MessageSquarePlus,
    Key,
    Settings,
    Anchor,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const navItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/webhooks", label: "Webhooks", icon: Webhook },
    { href: "/dashboard/messages/new", label: "Message Builder", icon: MessageSquarePlus },
    { href: "/dashboard/api-keys", label: "API Keys", icon: Key },
];

export function Sidebar({ className, onItemClick }: { className?: string; onItemClick?: () => void }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [selectedGuild, setSelectedGuild] = useState<any>(null);

    useEffect(() => {
        const guild = localStorage.getItem("selected_guild");
        if (guild) {
            setSelectedGuild(JSON.parse(guild));
        }
    }, []);

    return (
        <motion.aside
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`bg-[#0c0c14]/80 backdrop-blur-2xl border-r border-white/5 flex flex-col transition-all duration-300 z-50 ${collapsed ? "w-[72px]" : "w-[260px]"} ${className || ""}`}
        >
            {/* Logo & Server Info */}
            <div className="flex flex-col border-b border-white/5">
                <div className="flex items-center gap-3 px-5 h-16">
                    <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
                        <Anchor className="w-5 h-5 text-zinc-950" />
                    </div>
                    {!collapsed && (
                        <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Foho
                        </span>
                    )}
                </div>

                {selectedGuild && !collapsed && (
                    <div className="px-5 py-3 bg-white/[0.02] border-t border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-800 shrink-0 overflow-hidden flex items-center justify-center text-xs font-bold ring-1 ring-white/10">
                                {selectedGuild.icon ? (
                                    <img
                                        src={`https://cdn.discordapp.com/icons/${selectedGuild.id}/${selectedGuild.icon}.png`}
                                        alt={selectedGuild.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    selectedGuild.name.charAt(0)
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-white truncate">{selectedGuild.name}</p>
                                <Link
                                    href="/servers"
                                    onClick={onItemClick}
                                    className="text-[10px] text-orange-400 hover:text-orange-300 flex items-center gap-1 mt-0.5"
                                >
                                    <RefreshCw className="w-2.5 h-2.5" />
                                    Change Server
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1 overflow-x-hidden">
                {navItems.map((item, index) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href !== "/dashboard" && pathname.startsWith(item.href));
                    return (
                        <MotionLink
                            key={item.href}
                            href={item.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                            whileHover={{ x: 4 }}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 group ${isActive
                                ? "bg-orange-500/15 text-orange-500 shadow-sm"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                            onClick={onItemClick}
                        >
                            <item.icon
                                className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive
                                    ? "text-orange-500"
                                    : "text-gray-500 group-hover:text-gray-300"
                                    }`}
                            />
                            {!collapsed && <span>{item.label}</span>}
                        </MotionLink>
                    );
                })}
            </nav>

            {/* Collapse Toggle */}
            <div className="px-3 py-4 border-t border-white/5">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-white hover:bg-white/5 transition-all w-full"
                >
                    {collapsed ? (
                        <ChevronRight className="w-5 h-5" />
                    ) : (
                        <>
                            <ChevronLeft className="w-5 h-5" />
                            <span>Collapse</span>
                        </>
                    )}
                </button>
            </div>
        </motion.aside >
    );
}
