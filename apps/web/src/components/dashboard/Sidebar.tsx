"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Webhook,
    MessageSquarePlus,
    Key,
    Settings,
    Bot,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/webhooks", label: "Webhooks", icon: Webhook },
    { href: "/dashboard/messages/new", label: "Message Builder", icon: MessageSquarePlus },
    { href: "/dashboard/api-keys", label: "API Keys", icon: Key },
];

export function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-[#0c0c14]/80 backdrop-blur-2xl border-r border-white/5 flex flex-col transition-all duration-300 z-50 ${collapsed ? "w-[72px]" : "w-[260px]"
                }`}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 h-16 border-b border-white/5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                    <Bot className="w-5 h-5 text-white" />
                </div>
                {!collapsed && (
                    <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Discord Manager
                    </span>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href !== "/dashboard" && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${isActive
                                    ? "bg-indigo-500/15 text-indigo-400 shadow-sm"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <item.icon
                                className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive
                                        ? "text-indigo-400"
                                        : "text-gray-500 group-hover:text-gray-300"
                                    }`}
                            />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
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
        </aside>
    );
}
