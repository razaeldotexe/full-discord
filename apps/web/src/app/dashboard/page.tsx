"use client";

import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Server,
    Users,
    Clock,
    Webhook,
    MessageSquare,
    Key,
    Activity,
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
    const { data: session } = useSession();

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcome */}
            <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400 mt-1">
                    Welcome back, {session?.user?.name}. Here&apos;s your overview.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Servers"
                    value="—"
                    description="Connected guilds"
                    icon={Server}
                    gradient="from-indigo-500 to-blue-600"
                />
                <StatsCard
                    title="Users"
                    value="—"
                    description="Total members"
                    icon={Users}
                    gradient="from-purple-500 to-pink-600"
                />
                <StatsCard
                    title="Webhooks"
                    value="—"
                    description="Active webhooks"
                    icon={Webhook}
                    gradient="from-emerald-500 to-teal-600"
                />
                <StatsCard
                    title="Messages Sent"
                    value="—"
                    description="This month"
                    icon={MessageSquare}
                    gradient="from-amber-500 to-orange-600"
                />
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Activity className="w-5 h-5 text-indigo-400" />
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { action: "Bot started", time: "Just now", color: "bg-emerald-500" },
                                { action: "Dashboard connected", time: "1 min ago", color: "bg-indigo-500" },
                                { action: "System ready", time: "2 min ago", color: "bg-purple-500" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                                    <span className="text-sm text-gray-300 flex-1">{item.action}</span>
                                    <span className="text-xs text-gray-500">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Key className="w-5 h-5 text-amber-400" />
                            Quick Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: "New Webhook", href: "/dashboard/webhooks/new", icon: Webhook, color: "from-indigo-500 to-blue-600" },
                                { label: "Send Message", href: "/dashboard/messages/new", icon: MessageSquare, color: "from-purple-500 to-pink-600" },
                                { label: "Bot Stats", href: "#", icon: Activity, color: "from-emerald-500 to-teal-600" },
                                { label: "API Keys", href: "/dashboard/api-keys", icon: Key, color: "from-amber-500 to-orange-600" },
                            ].map((action, i) => (
                                <a
                                    key={i}
                                    href={action.href}
                                    className="group flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10 transition-all duration-200"
                                >
                                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                                        <action.icon className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                                        {action.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
