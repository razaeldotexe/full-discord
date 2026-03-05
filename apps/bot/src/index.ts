import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { config } from './config';
import { loadEvents } from './handlers/eventHandler';
import { loadSlashCommands } from './handlers/commandHandler';
import { loadPrefixCommands } from './handlers/prefixHandler';
import { initVersionHandler } from './handlers/versionHandler';
import { logger } from './utils/logger';

async function main(): Promise<void> {
    logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    logger.info(' Discord Bot — Starting up...');
    logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Create client
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
        ],
    });

    // Initialize collections
    client.slashCommands = new Collection();
    client.prefixCommands = new Collection();
    client.startTimestamp = Date.now();

    // Load handlers
    logger.info('Loading handlers...');
    initVersionHandler();
    await loadEvents(client);
    await loadSlashCommands(client);
    await loadPrefixCommands(client);

    // Login
    if (!config.token) {
        logger.error('No DISCORD_TOKEN found! Set it in your .env file.');
        logger.info('Copy .env.example to .env and fill in your credentials.');
        process.exit(1);
    }

    await client.login(config.token);
}

// Handle uncaught errors
process.on('unhandledRejection', (error: Error) => {
    logger.error('Unhandled promise rejection', error);
});

process.on('uncaughtException', (error: Error) => {
    logger.error('Uncaught exception', error);
    process.exit(1);
});

main().catch((err) => {
    logger.error('Fatal error during startup', err);
    process.exit(1);
});
