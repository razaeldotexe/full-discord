const DISCORD_API_BASE = 'https://discord.com/api/v10';

export async function fetchDiscordGuilds(accessToken: string) {
    const res = await fetch(`${DISCORD_API_BASE}/users/@me/guilds`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) throw new Error('Failed to fetch guilds');
    return res.json();
}

export async function fetchGuildChannels(guildId: string, botToken: string) {
    const res = await fetch(`${DISCORD_API_BASE}/guilds/${guildId}/channels`, {
        headers: { Authorization: `Bot ${botToken}` },
    });
    if (!res.ok) throw new Error('Failed to fetch channels');
    return res.json();
}

export async function sendWebhookMessage(
    webhookUrl: string,
    payload: {
        content?: string;
        embeds?: any[];
        components?: any[];
        username?: string;
        avatar_url?: string;
    }
) {
    const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(`Webhook send failed: ${JSON.stringify(error)}`);
    }

    return res.status === 204 ? null : res.json();
}

export async function createDiscordWebhook(
    channelId: string,
    botToken: string,
    name: string,
    avatar?: string
) {
    const body: any = { name };
    if (avatar) body.avatar = avatar;

    const res = await fetch(`${DISCORD_API_BASE}/channels/${channelId}/webhooks`, {
        method: 'POST',
        headers: {
            Authorization: `Bot ${botToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(`Failed to create webhook: ${JSON.stringify(error)}`);
    }

    return res.json();
}

export async function deleteDiscordWebhook(webhookUrl: string) {
    const res = await fetch(webhookUrl, { method: 'DELETE' });
    if (!res.ok && res.status !== 404) {
        throw new Error('Failed to delete webhook');
    }
}

// Button style mapping for Discord API
export const BUTTON_STYLES = {
    Primary: 1,
    Secondary: 2,
    Success: 3,
    Danger: 4,
    Link: 5,
} as const;

export type ButtonStyle = keyof typeof BUTTON_STYLES;

export interface DiscordButton {
    type: 2; // Button component type
    style: number;
    label: string;
    custom_id?: string;
    url?: string;
    emoji?: { name: string; id?: string };
    disabled?: boolean;
}

export interface DiscordEmbed {
    title?: string;
    description?: string;
    color?: number;
    fields?: { name: string; value: string; inline?: boolean }[];
    footer?: { text: string; icon_url?: string };
    thumbnail?: { url: string };
    image?: { url: string };
    author?: { name: string; url?: string; icon_url?: string };
    timestamp?: string;
}
