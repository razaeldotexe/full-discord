import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!(session?.user as any)?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const webhooks = await prisma.webhook.findMany({
            where: { userId: (session!.user as any).id },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ webhooks });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!(session?.user as any)?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, guildId, channelId, avatarUrl } = body;

        if (!name || !guildId || !channelId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        let avatarData = undefined;
        if (avatarUrl) {
            try {
                const imgRes = await fetch(avatarUrl);
                const arrayBuffer = await imgRes.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const contentType = imgRes.headers.get("content-type") || "image/png";
                avatarData = `data:${contentType};base64,${buffer.toString("base64")}`;
            } catch (e) {
                console.error("Failed to fetch avatar", e);
            }
        }

        const discordRes = await fetch(`https://discord.com/api/v10/channels/${channelId}/webhooks`, {
            method: "POST",
            headers: {
                "Authorization": `Bot ${process.env.DISCORD_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                avatar: avatarData,
            }),
        });

        const discordData = await discordRes.json();
        if (!discordRes.ok) {
            return NextResponse.json({ error: `Discord API Error: ${discordData.message || 'Failed to create webhook'}` }, { status: 400 });
        }

        const realUrl = `https://discord.com/api/webhooks/${discordData.id}/${discordData.token}`;

        const webhook = await prisma.webhook.create({
            data: {
                name,
                url: realUrl,
                guildId,
                channelId,
                avatarUrl: avatarUrl || null,
                userId: (session!.user as any).id,
            },
        });

        return NextResponse.json({ webhook });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
