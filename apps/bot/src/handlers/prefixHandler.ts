import { Client, Collection } from 'discord.js';
import path from 'path';
import fs from 'fs';
import { PrefixCommand } from '../types';
import { logger } from '../utils/logger';

export async function loadPrefixCommands(client: Client): Promise<void> {
    client.prefixCommands = new Collection();

    const commandsPath = path.resolve(__dirname, '../commands/prefix');

    if (!fs.existsSync(commandsPath)) {
        logger.warn('No prefix commands directory found');
        return;
    }

    const commandFiles = fs.readdirSync(commandsPath).filter(
        (file) => file.endsWith('.ts') || file.endsWith('.js')
    );

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const commandModule = await import(filePath);
        const command: PrefixCommand = commandModule.default || commandModule;

        if (!command.name || !command.execute) {
            logger.warn(`Skipping invalid prefix command file: ${file}`);
            continue;
        }

        client.prefixCommands.set(command.name, command);

        // Register aliases
        if (command.aliases) {
            for (const alias of command.aliases) {
                client.prefixCommands.set(alias, command);
            }
        }

        logger.handler('Prefix Command', command.name);
    }
}
