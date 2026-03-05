import { EmbedBuilder, ColorResolvable } from 'discord.js';

interface EmbedOptions {
    title?: string;
    description?: string;
    color?: ColorResolvable;
    fields?: { name: string; value: string; inline?: boolean }[];
    footer?: string;
    thumbnail?: string;
    timestamp?: boolean;
}

export function createEmbed(options: EmbedOptions): EmbedBuilder {
    const embed = new EmbedBuilder();

    if (options.title) embed.setTitle(options.title);
    if (options.description) embed.setDescription(options.description);
    embed.setColor(options.color || '#5865F2'); // Discord blurple
    if (options.fields) {
        for (const field of options.fields) {
            embed.addFields({ name: field.name, value: field.value, inline: field.inline });
        }
    }
    if (options.footer) embed.setFooter({ text: options.footer });
    if (options.thumbnail) embed.setThumbnail(options.thumbnail);
    if (options.timestamp) embed.setTimestamp();

    return embed;
}

export function successEmbed(description: string): EmbedBuilder {
    return createEmbed({ description: `✅ ${description}`, color: '#57F287' });
}

export function errorEmbed(description: string): EmbedBuilder {
    return createEmbed({ description: `❌ ${description}`, color: '#ED4245' });
}

export function infoEmbed(title: string, description: string): EmbedBuilder {
    return createEmbed({ title, description, color: '#5865F2', timestamp: true });
}
