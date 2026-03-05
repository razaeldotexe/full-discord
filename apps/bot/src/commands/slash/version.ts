import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { SlashCommand } from '../../types';
import { getVersionEmbed } from '../../handlers/versionHandler';

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('version')
        .setDescription('Show bot version and changelog'),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const embed = getVersionEmbed();
        await interaction.reply({ embeds: [embed] });
    },
};

export default command;
