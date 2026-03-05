import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { SlashCommand } from '../../types';
import { createEmbed } from '../../utils/embed';

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show all available commands'),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const client = interaction.client;

        const slashCmds = client.slashCommands
            .map((cmd) => `\`/${cmd.data.name}\` — ${cmd.data.description}`)
            .join('\n');

        const prefixCmds = client.prefixCommands
            .filter((cmd, key) => cmd.name === key) // filter out aliases
            .map((cmd) => `\`!${cmd.name}\` — ${cmd.description}`)
            .join('\n');

        const embed = createEmbed({
            title: '📖 Command List',
            description: 'Here are all the commands you can use:',
            color: '#5865F2',
            fields: [
                { name: '⚡ Slash Commands', value: slashCmds || 'None' },
                { name: '📝 Prefix Commands', value: prefixCmds || 'None' },
            ],
            timestamp: true,
        });

        await interaction.reply({ embeds: [embed] });
    },
};

export default command;
