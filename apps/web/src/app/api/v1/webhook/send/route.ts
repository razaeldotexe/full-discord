import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWebhookMessage } from "@/lib/discord";

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get("authorization");
        let keyRecord = null;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            const apiKey = authHeader.replace("Bearer ", "");
            try {
                keyRecord = await prisma.apiKey.findUnique({
                    where: { key: apiKey },
                    include: { user: true },
                });
            } catch {
                // If DB is not set up, allow demo mode
                keyRecord = null;
            }
        }

        // Parse body
        const body = await request.json();
        const { webhookUrl, webhookId, content, embeds, components, username, avatar_url } = body;

        if (!webhookUrl && !webhookId) {
            return NextResponse.json(
                { error: "Either webhookUrl or webhookId is required" },
                { status: 400 }
            );
        }

        if (!content && (!embeds || embeds.length === 0)) {
            return NextResponse.json(
                { error: "Either content or embeds is required" },
                { status: 400 }
            );
        }

        // Require API key if they are fetching from DB using webhookId
        if (webhookId && !webhookUrl && !keyRecord) {
            return NextResponse.json(
                { error: "Provide a direct webhookUrl, or use an API key to send via webhookId" },
                { status: 401 }
            );
        }

        // Resolve webhook URL
        let resolvedUrl = webhookUrl;
        if (webhookId && !webhookUrl) {
            try {
                const webhook = await prisma.webhook.findUnique({ where: { id: webhookId } });
                if (!webhook) {
                    return NextResponse.json({ error: "Webhook not found" }, { status: 404 });
                }
                resolvedUrl = webhook.url;
            } catch {
                return NextResponse.json({ error: "Database not configured. Provide webhookUrl directly." }, { status: 500 });
            }
        }

        // Build payload
        const payload: any = {};
        if (content) payload.content = content;
        if (embeds) payload.embeds = embeds;
        if (components) payload.components = components;
        if (username) payload.username = username;
        if (avatar_url) payload.avatar_url = avatar_url;

        // Send via webhook
        await sendWebhookMessage(resolvedUrl, payload);

        // Log message in DB (if available)
        try {
            if (keyRecord && webhookId) {
                await prisma.message.create({
                    data: {
                        content: content || null,
                        embeds: embeds ? JSON.stringify(embeds) : null,
                        buttons: components ? JSON.stringify(components) : null,
                        webhookId,
                        userId: keyRecord.userId,
                    },
                });
            }
        } catch {
            // Non-critical — don't fail the request
        }

        return NextResponse.json({ success: true, message: "Message sent successfully" });
    } catch (error: any) {
        console.error("Webhook send error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to send message" },
            { status: 500 }
        );
    }
}
