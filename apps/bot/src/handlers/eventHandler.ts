import { Client } from 'discord.js';
import path from 'path';
import fs from 'fs';
import { BotEvent } from '../types';
import { logger } from '../utils/logger';

export async function loadEvents(client: Client): Promise<void> {
    const eventsPath = path.resolve(__dirname, '../events');

    if (!fs.existsSync(eventsPath)) {
        logger.warn('No events directory found');
        return;
    }

    const eventFiles = fs.readdirSync(eventsPath).filter(
        (file) => file.endsWith('.ts') || file.endsWith('.js')
    );

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const eventModule = await import(filePath);
        const event: BotEvent = eventModule.default || eventModule;

        if (!event.name || !event.execute) {
            logger.warn(`Skipping invalid event file: ${file}`);
            continue;
        }

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }

        logger.handler('Event', event.name);
    }
}
