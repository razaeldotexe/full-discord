import { Interaction, Client } from 'discord.js';
import { BotEvent } from '../types';
import { logger } from '../utils/logger';
import { errorEmbed } from '../utils/embed';

const event: BotEvent = {
    name: 'interactionCreate',
    once: false,
    execute: async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const client = interaction.client as Client;
        const command = client.slashCommands?.get(interaction.commandName);

        if (!command) {
            logger.warn(`Unknown slash command: ${interaction.commandName}`);
            return;
        }

        try {
            await command.execute(interaction);
            logger.debug(`Slash command executed: /${interaction.commandName} by ${interaction.user.tag}`);
        } catch (error) {
            logger.error(`Error executing /${interaction.commandName}`, error as Error);

            const reply = { embeds: [errorEmbed('An error occurred while executing this command.')], ephemeral: true };

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(reply);
            } else {
                await interaction.reply(reply);
            }
        }
    },
};

export default event;
