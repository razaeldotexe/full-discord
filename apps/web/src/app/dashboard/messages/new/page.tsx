"use client";

import { MessageBuilder, type MessageData } from "@/components/message-builder/MessageBuilder";

export default function NewMessagePage() {
    const handleSend = async (data: MessageData) => {
        if (!data.webhookUrl) {
            alert("Please provide a Webhook URL.");
            return;
        }

        try {
            const payload: any = {
                webhookUrl: data.webhookUrl,
            };
            if (data.content) payload.content = data.content;
            if (data.username) payload.username = data.username;
            if (data.avatarUrl) payload.avatar_url = data.avatarUrl;

            if (data.embeds.length > 0) {
                payload.embeds = data.embeds.map((e) => ({
                    ...(e.title && { title: e.title }),
                    ...(e.description && { description: e.description }),
                    ...(e.color && { color: parseInt(e.color.replace("#", ""), 16) }),
                    ...(e.fields.length > 0 && { fields: e.fields }),
                    ...(e.footer && { footer: { text: e.footer } }),
                    ...(e.thumbnail && { thumbnail: { url: e.thumbnail } }),
                    ...(e.image && { image: { url: e.image } }),
                }));
            }
            if (data.buttons.length > 0) {
                payload.components = [
                    {
                        type: 1,
                        components: data.buttons.map((b) => ({
                            type: 2,
                            label: b.label,
                            style: { Primary: 1, Secondary: 2, Success: 3, Danger: 4, Link: 5 }[b.style],
                            ...(b.style === "Link" ? { url: b.url } : { custom_id: b.customId || `btn_${Date.now()}` }),
                        })),
                    },
                ];
            }

            const res = await fetch("/api/v1/webhook/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Failed to send message");

            alert("Message sent successfully!");
        } catch (error: any) {
            alert("Failed to send message: " + error.message);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-white">Message Builder</h1>
                <p className="text-gray-400 mt-1">
                    Compose rich messages with embeds and buttons, preview them live, and send.
                </p>
            </div>

            <MessageBuilder onSend={handleSend} />
        </div>
    );
}
