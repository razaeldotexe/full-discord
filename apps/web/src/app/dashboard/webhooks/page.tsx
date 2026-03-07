"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Webhook, MoreVertical, ExternalLink, Trash2, Pencil } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function WebhooksPage() {
    const [webhooks, setWebhooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWebhooks = async () => {
            try {
                const res = await fetch("/api/v1/webhooks");
                const data = await res.json();
                if (data.webhooks) setWebhooks(data.webhooks);
            } catch (error) {
                console.error("Failed to load webhooks", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWebhooks();
    }, []);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
        >
            <motion.div variants={itemVariants} className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Webhooks</h1>
                    <p className="text-gray-400 mt-1">Manage your Discord webhooks</p>
                </div>
                <Link href="/dashboard/webhooks/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" /> Create Webhook
                    </Button>
                </Link>
            </motion.div>

            {webhooks.length === 0 ? (
                <motion.div variants={itemVariants}>
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-4">
                                <Webhook className="w-8 h-8 text-orange-500" />
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
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {webhooks.map((webhook) => (
                        <motion.div variants={itemVariants} key={webhook.id}>
                            <Card className="group hover:border-white/20 transition-all duration-200">
                                <CardContent className="p-5">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                                                <Webhook className="w-5 h-5 text-zinc-950" />
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
                                            <span className="text-gray-300">{new Date(webhook.createdAt).toLocaleDateString()}</span>
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
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
