import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !(session as any).accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userToken = (session as any).accessToken;
        const botToken = process.env.DISCORD_TOKEN;

        // Fetch User Guilds
        const userGuildsRes = await fetch("https://discord.com/api/v10/users/@me/guilds", {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });

        if (!userGuildsRes.ok) {
            throw new Error("Failed to fetch user guilds");
        }

        const userGuilds = await userGuildsRes.json();

        // Fetch Bot Guilds
        const botGuildsRes = await fetch("https://discord.com/api/v10/users/@me/guilds", {
            headers: {
                Authorization: `Bot ${botToken}`,
            },
        });

        let botGuilds: any[] = [];
        if (botGuildsRes.ok) {
            botGuilds = await botGuildsRes.json();
        }

        const botGuildIds = new Set(botGuilds.map((g) => g.id));

        // Filter for MANAGE_GUILD (0x20) or ADMINISTRATOR (0x8)
        const manageableGuilds = userGuilds.filter((guild: any) => {
            const permissions = BigInt(guild.permissions);
            const isAdmin = (permissions & BigInt(0x8)) === BigInt(0x8);
            const isManager = (permissions & BigInt(0x20)) === BigInt(0x20);
            return isAdmin || isManager;
        });

        const enrichedGuilds = manageableGuilds.map((guild: any) => ({
            id: guild.id,
            name: guild.name,
            icon: guild.icon,
            botInGuild: botGuildIds.has(guild.id),
        }));

        return NextResponse.json({ guilds: enrichedGuilds });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
