import { Client } from 'discord.js';
import { BotEvent } from '../types';
import { logger } from '../utils/logger';
import { getVersion } from '../utils/version';

const event: BotEvent = {
    name: 'ready',
    once: true,
    execute: async (client: Client) => {
        logger.success(`Logged in as ${client.user?.tag}`);
        logger.info(`Serving ${client.guilds.cache.size} server(s) | ${client.users.cache.size} user(s)`);
        logger.info(`Bot version: v${getVersion()}`);

        // Set activity
        client.user?.setPresence({
            activities: [{ name: `v${getVersion()} | /help`, type: 3 }], // Watching
            status: 'online',
        });
    },
};

export default event;
