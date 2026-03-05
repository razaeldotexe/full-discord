"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Webhook, MoreVertical, ExternalLink, Trash2, Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Demo data — in production this would be fetched from the API
const DEMO_WEBHOOKS = [
    { id: "1", name: "Announcements Bot", channelId: "general", guildId: "My Server", createdAt: "2026-03-01" },
    { id: "2", name: "Alerts Webhook", channelId: "alerts", guildId: "My Server", createdAt: "2026-03-03" },
    { id: "3", name: "Log Bot", channelId: "server-logs", guildId: "Dev Server", createdAt: "2026-03-05" },
];

export default function WebhooksPage() {
    const [webhooks] = useState(DEMO_WEBHOOKS);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Webhooks</h1>
                    <p className="text-gray-400 mt-1">Manage your Discord webhooks</p>
                </div>
                <Link href="/dashboard/webhooks/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" /> Create Webhook
                    </Button>
                </Link>
            </div>

            {webhooks.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4">
                            <Webhook className="w-8 h-8 text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-1">No webhooks yet</h3>
                        <p className="text-sm text-gray-400 mb-4">Create your first webhook to get started</p>
                        <Link href="/dashboard/webhooks/new">
                            <Button size="sm">
                                <Plus className="w-4 h-4 mr-1" /> Create Webhook
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {webhooks.map((webhook) => (
                        <Card key={webhook.id} className="group hover:border-white/20 transition-all duration-200">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                            <Webhook className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white text-sm">{webhook.name}</h3>
                                            <p className="text-xs text-gray-500">{webhook.guildId}</p>
                                        </div>
                                    </div>
                                    <Badge variant="success">Active</Badge>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-gray-500">Channel</span>
                                        <span className="text-gray-300">#{webhook.channelId}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-gray-500">Created</span>
                                        <span className="text-gray-300">{webhook.createdAt}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-3 border-t border-white/5">
                                    <Link href={`/dashboard/messages/new?webhookId=${webhook.id}`} className="flex-1">
                                        <Button variant="outline" size="sm" className="w-full text-xs">
                                            <ExternalLink className="w-3 h-3 mr-1" /> Send Message
                                        </Button>
                                    </Link>
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white h-8 w-8">
                                        <Pencil className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400 h-8 w-8">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
