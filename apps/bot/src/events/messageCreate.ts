import { Message, Client } from 'discord.js';
import { BotEvent } from '../types';
import { config } from '../config';
import { logger } from '../utils/logger';
import { handleMessage } from '../handlers/messageHandler';
import { errorEmbed } from '../utils/embed';

const event: BotEvent = {
    name: 'messageCreate',
    once: false,
    execute: async (message: Message) => {
        // Ignore bots
        if (message.author.bot) return;

        // Run message handler (filter, auto-response)
        const handled = await handleMessage(message);
        if (handled) return;

        // Check for prefix commands
        const prefix = config.prefix;
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/\s+/);
        const commandName = args.shift()?.toLowerCase();
        if (!commandName) return;

        const client = message.client as Client;
        const command = client.prefixCommands?.get(commandName);

        if (!command) return;

        try {
            await command.execute(message, args);
            logger.debug(`Prefix command executed: ${prefix}${commandName} by ${message.author.tag}`);
        } catch (error) {
            logger.error(`Error executing ${prefix}${commandName}`, error as Error);
            await message.reply({ embeds: [errorEmbed('An error occurred while executing this command.')] });
        }
    },
};

export default event;
