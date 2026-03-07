"use client";

import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { EmbedEditor, type EmbedData } from "./EmbedEditor";
import { ButtonEditor, type ButtonData } from "./ButtonEditor";
import { DiscordPreview } from "./DiscordPreview";
import { Send, Plus, Eye, Code } from "lucide-react";
import { useSearchParams } from "next/navigation";

export interface MessageData {
    webhookUrl?: string;
    content: string;
    username: string;
    avatarUrl: string;
    embeds: EmbedData[];
    buttons: ButtonData[];
}

interface MessageBuilderProps {
    webhookUrl?: string;
    onSend?: (data: MessageData) => Promise<void>;
}

export function MessageBuilder({ webhookUrl, onSend }: MessageBuilderProps) {
    const searchParams = useSearchParams();
    const defaultWebhookId = searchParams.get("webhookId");

    const [message, setMessage] = useState<MessageData>({
        webhookUrl: webhookUrl || "",
        content: "",
        username: "",
        avatarUrl: "",
        embeds: [],
        buttons: [],
    });
    const [sending, setSending] = useState(false);
    const [showPreview, setShowPreview] = useState(true);
    const [showJson, setShowJson] = useState(false);

    const [savedWebhooks, setSavedWebhooks] = useState<any[]>([]);
    const [selectedWebhookId, setSelectedWebhookId] = useState<string>(defaultWebhookId || "custom");

    useEffect(() => {
        const fetchWebhooks = async () => {
            try {
                const res = await fetch("/api/v1/webhooks");
                const data = await res.json();
                if (data.webhooks && data.webhooks.length > 0) {
                    setSavedWebhooks(data.webhooks);

                    if (defaultWebhookId) {
                        const target = data.webhooks.find((w: any) => w.id === defaultWebhookId);
                        if (target) {
                            setSelectedWebhookId(target.id);
                            setMessage((p) => ({ ...p, webhookUrl: target.url }));
                        }
                    } else if (!webhookUrl) {
                        setSelectedWebhookId(data.webhooks[0].id);
                        setMessage((p) => ({ ...p, webhookUrl: data.webhooks[0].url }));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch webhooks", error);
            }
        };
        fetchWebhooks();
    }, [webhookUrl, defaultWebhookId]);

    const addEmbed = () => {
        setMessage((prev) => ({
            ...prev,
            embeds: [
                ...prev.embeds,
                {
                    title: "",
                    description: "",
                    color: "#5865F2",
                    fields: [],
                    footer: "",
                    thumbnail: "",
                    image: "",
                },
            ],
        }));
    };

    const updateEmbed = (index: number, embed: EmbedData) => {
        setMessage((prev) => ({
            ...prev,
            embeds: prev.embeds.map((e, i) => (i === index ? embed : e)),
        }));
    };

    const removeEmbed = (index: number) => {
        setMessage((prev) => ({
            ...prev,
            embeds: prev.embeds.filter((_, i) => i !== index),
        }));
    };

    const addButton = () => {
        setMessage((prev) => ({
            ...prev,
            buttons: [
                ...prev.buttons,
                { label: "Button", style: "Primary", url: "", customId: "" },
            ],
        }));
    };

    const updateButton = (index: number, button: ButtonData) => {
        setMessage((prev) => ({
            ...prev,
            buttons: prev.buttons.map((b, i) => (i === index ? button : b)),
        }));
    };

    const removeButton = (index: number) => {
        setMessage((prev) => ({
            ...prev,
            buttons: prev.buttons.filter((_, i) => i !== index),
        }));
    };

    const handleSend = async () => {
        if (!onSend) return;
        setSending(true);
        try {
            await onSend(message);
        } finally {
            setSending(false);
        }
    };

    const buildPayload = () => {
        const payload: any = {};
        if (message.content) payload.content = message.content;
        if (message.username) payload.username = message.username;
        if (message.avatarUrl) payload.avatar_url = message.avatarUrl;
        if (message.embeds.length > 0) {
            payload.embeds = message.embeds.map((e) => ({
                ...(e.title && { title: e.title }),
                ...(e.description && { description: e.description }),
                ...(e.color && { color: parseInt(e.color.replace("#", ""), 16) }),
                ...(e.fields.length > 0 && { fields: e.fields }),
                ...(e.footer && { footer: { text: e.footer } }),
                ...(e.thumbnail && { thumbnail: { url: e.thumbnail } }),
                ...(e.image && { image: { url: e.image } }),
            }));
        }
        if (message.buttons.length > 0) {
            payload.components = [
                {
                    type: 1,
                    components: message.buttons.map((b) => ({
                        type: 2,
                        label: b.label,
                        style: { Primary: 1, Secondary: 2, Success: 3, Danger: 4, Link: 5 }[b.style],
                        ...(b.style === "Link" ? { url: b.url } : { custom_id: b.customId || `btn_${Date.now()}` }),
                    })),
                },
            ];
        }
        return payload;
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Editor Panel */}
            <div className="space-y-6">
                {/* Content */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">📝 Message Content</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-4 pb-2 mb-2 border-b border-white/10">
                            <div className="space-y-4 pt-4 border-t border-white/10">
                                <Label className="text-orange-500">Select Webhook</Label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                                    value={selectedWebhookId}
                                    onChange={(e) => {
                                        setSelectedWebhookId(e.target.value);
                                        if (e.target.value === "custom") {
                                            setMessage((p) => ({ ...p, webhookUrl: "" }));
                                        } else {
                                            const wh = savedWebhooks.find(w => w.id === e.target.value);
                                            if (wh) {
                                                setMessage((p) => ({ ...p, webhookUrl: wh.url }));
                                            }
                                        }
                                    }}
                                >
                                    <option value="custom" className="bg-slate-900">Custom URL...</option>
                                    {savedWebhooks.map(wh => (
                                        <option key={wh.id} value={wh.id} className="bg-slate-900">{wh.name}</option>
                                    ))}
                                </select>
                            </div>

                            {selectedWebhookId === "custom" && (
                                <div className="space-y-2 pb-2">
                                    <div className="space-y-4 pt-4 border-t border-white/10">
                                        <Label className="text-orange-500">Webhook URL (Required)</Label>
                                        <Input
                                            value={message.webhookUrl}
                                            onChange={(e) => setMessage((p) => ({ ...p, webhookUrl: e.target.value }))}
                                            placeholder="https://discord.com/api/webhooks/..."
                                            className="border-orange-500/30 focus-visible:ring-orange-500/50 bg-orange-500/5 text-xs font-mono"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Username Override</Label>
                                <Input
                                    placeholder="Bot Username"
                                    value={message.username}
                                    onChange={(e) =>
                                        setMessage((p) => ({ ...p, username: e.target.value }))
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Avatar URL</Label>
                                <Input
                                    placeholder="https://..."
                                    value={message.avatarUrl}
                                    onChange={(e) =>
                                        setMessage((p) => ({ ...p, avatarUrl: e.target.value }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Content</Label>
                            <Textarea
                                placeholder="Type your message here..."
                                rows={4}
                                value={message.content}
                                onChange={(e) =>
                                    setMessage((p) => ({ ...p, content: e.target.value }))
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Embeds */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base">🎨 Embeds</CardTitle>
                        <Button size="sm" variant="outline" onClick={addEmbed} disabled={message.embeds.length >= 10}>
                            <Plus className="w-4 h-4 mr-1" /> Add Embed
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {message.embeds.length === 0 && (
                            <p className="text-sm text-gray-500 text-center py-4">
                                No embeds added. Click &quot;Add Embed&quot; to create one.
                            </p>
                        )}
                        {message.embeds.map((embed, i) => (
                            <EmbedEditor
                                key={i}
                                embed={embed}
                                index={i}
                                onChange={(e) => updateEmbed(i, e)}
                                onRemove={() => removeEmbed(i)}
                            />
                        ))}
                    </CardContent>
                </Card>

                {/* Buttons */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base">🔘 Buttons</CardTitle>
                        <Button size="sm" variant="outline" onClick={addButton} disabled={message.buttons.length >= 5}>
                            <Plus className="w-4 h-4 mr-1" /> Add Button
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {message.buttons.length === 0 && (
                            <p className="text-sm text-gray-500 text-center py-4">
                                No buttons added. Click &quot;Add Button&quot; to create one.
                            </p>
                        )}
                        {message.buttons.map((btn, i) => (
                            <ButtonEditor
                                key={i}
                                button={btn}
                                index={i}
                                onChange={(b) => updateButton(i, b)}
                                onRemove={() => removeButton(i)}
                            />
                        ))}
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex gap-3">
                    <Button
                        onClick={handleSend}
                        disabled={sending || (!message.content && message.embeds.length === 0) || !message.webhookUrl}
                        className="flex-1"
                    >
                        <Send className="w-4 h-4 mr-2" />
                        {sending ? "Sending..." : "Send Message"}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setShowJson(!showJson)}
                    >
                        <Code className="w-4 h-4 mr-1" />
                        JSON
                    </Button>
                </div>

                {showJson && (
                    <Card>
                        <CardContent className="p-4">
                            <pre className="text-xs text-gray-300 overflow-auto max-h-64 font-mono">
                                {JSON.stringify(buildPayload(), null, 2)}
                            </pre>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Preview Panel */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2">
                        <Eye className="w-4 h-4" /> Live Preview
                    </h3>
                </div>
                <div className="sticky top-6">
                    <DiscordPreview message={message} />
                </div>
            </div>
        </div>
    );
}
