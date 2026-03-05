import { getVersionInfo, getVersion, getLatestChangelog } from '../utils/version';
import { createEmbed } from '../utils/embed';
import { EmbedBuilder } from 'discord.js';
import { logger } from '../utils/logger';

export function getVersionEmbed(): EmbedBuilder {
    const info = getVersionInfo();
    const latest = getLatestChangelog();

    const fields = [];

    if (latest) {
        fields.push({
            name: `📋 Changelog v${latest.version} (${latest.date})`,
            value: latest.changes.map((c) => `• ${c}`).join('\n'),
        });
    }

    return createEmbed({
        title: `🤖 Bot Version — v${info.version}`,
        description: 'Current bot version and recent changes.',
        color: '#5865F2',
        fields,
        timestamp: true,
        footer: `Version ${info.version}`,
    });
}

export function initVersionHandler(): void {
    const version = getVersion();
    logger.success(`Version Handler initialized — v${version}`);
}
