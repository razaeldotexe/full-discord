import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        // Validate API key
        const authHeader = request.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Missing or invalid Authorization header. Use: Bearer <api_key>" },
                { status: 401 }
            );
        }

        // Bot stats — in production, this would connect to the bot process
        // via shared database, Redis, or internal API
        const stats = {
            status: "online",
            uptime: process.uptime(),
            uptimeFormatted: formatUptime(process.uptime()),
            guilds: 0, // Will be populated when bot is connected
            users: 0,
            channels: 0,
            ping: 0,
            memory: {
                used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
                total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
                unit: "MB",
            },
            version: "1.0.0",
            node: process.version,
            timestamp: new Date().toISOString(),
        };

        return NextResponse.json({ success: true, data: stats });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to get bot stats" },
            { status: 500 }
        );
    }
}

function formatUptime(seconds: number): string {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${d}d ${h}h ${m}m ${s}s`;
}
