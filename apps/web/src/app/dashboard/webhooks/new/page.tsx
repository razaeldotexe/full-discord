"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
        // TODO: Call API to create webhook
        await new Promise((r) => setTimeout(r, 1000));
        setSaving(false);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
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

                    <div className="grid grid-cols-2 gap-4">
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
        </div>
    );
}
