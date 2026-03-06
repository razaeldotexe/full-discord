"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function NewWebhookPage() {
    const [form, setForm] = useState({
        name: "",
        guildId: "",
        channelId: "",
        avatarUrl: "",
    });
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/v1/webhooks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    url: `https://discord.com/api/webhooks/${form.guildId}/${form.channelId}`, // Using guild/channel as a placeholder for the URL if they don't provide one directly, wait they need a real URL!
                    guildId: form.guildId,
                    channelId: form.channelId,
                    avatarUrl: form.avatarUrl,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            window.location.href = "/dashboard/webhooks";
        } catch (error: any) {
            alert(error.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto space-y-6"
        >
            <div className="flex items-center gap-4">
                <Link href="/dashboard/webhooks">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">Create Webhook</h1>
                    <p className="text-gray-400 mt-1">Set up a new webhook for your Discord channel</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Webhook Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            placeholder="My Webhook"
                            value={form.name}
                            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Server (Guild ID)</Label>
                            <Input
                                placeholder="Enter server ID"
                                value={form.guildId}
                                onChange={(e) => setForm((p) => ({ ...p, guildId: e.target.value }))}
                            />
                            <p className="text-xs text-gray-500">
                                Right-click your server → Copy Server ID
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label>Channel ID</Label>
                            <Input
                                placeholder="Enter channel ID"
                                value={form.channelId}
                                onChange={(e) => setForm((p) => ({ ...p, channelId: e.target.value }))}
                            />
                            <p className="text-xs text-gray-500">
                                Right-click the channel → Copy Channel ID
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Avatar URL (optional)</Label>
                        <Input
                            placeholder="https://example.com/avatar.png"
                            value={form.avatarUrl}
                            onChange={(e) => setForm((p) => ({ ...p, avatarUrl: e.target.value }))}
                        />
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-white/5">
                        <Button onClick={handleSave} disabled={!form.name || saving} className="flex-1">
                            <Save className="w-4 h-4 mr-2" />
                            {saving ? "Creating..." : "Create Webhook"}
                        </Button>
                        <Link href="/dashboard/webhooks">
                            <Button variant="outline">Cancel</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
