import { Client, Collection, REST, Routes } from 'discord.js';
import path from 'path';
import fs from 'fs';
import { SlashCommand } from '../types';
import { config } from '../config';
import { logger } from '../utils/logger';

export async function loadSlashCommands(client: Client): Promise<void> {
    client.slashCommands = new Collection();

    const commandsPath = path.resolve(__dirname, '../commands/slash');

    if (!fs.existsSync(commandsPath)) {
        logger.warn('No slash commands directory found');
        return;
    }

    const commandFiles = fs.readdirSync(commandsPath).filter(
        (file) => file.endsWith('.ts') || file.endsWith('.js')
    );

    const commandData: any[] = [];

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const commandModule = await import(filePath);
        const command: SlashCommand = commandModule.default || commandModule;

        if (!command.data || !command.execute) {
            logger.warn(`Skipping invalid slash command file: ${file}`);
            continue;
        }

        client.slashCommands.set(command.data.name, command);
        commandData.push(command.data.toJSON());
        logger.handler('Slash Command', command.data.name);
    }

    // Register commands with Discord API
    await registerCommands(commandData);
}

async function registerCommands(commands: any[]): Promise<void> {
    if (!config.token || !config.clientId) {
        logger.warn('Missing token or clientId — skipping command registration');
        return;
    }

    const rest = new REST({ version: '10' }).setToken(config.token);

    try {
        if (config.nodeEnv === 'development' && config.guildId) {
            // Guild commands (instant update, good for dev)
            await rest.put(
                Routes.applicationGuildCommands(config.clientId, config.guildId),
                { body: commands }
            );
            logger.success(`Registered ${commands.length} guild slash commands`);
        } else {
            // Global commands (takes up to 1 hour to propagate)
            await rest.put(
                Routes.applicationCommands(config.clientId),
                { body: commands }
            );
            logger.success(`Registered ${commands.length} global slash commands`);
        }
    } catch (error) {
        logger.error('Failed to register slash commands', error as Error);
    }
}
