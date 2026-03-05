import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { SlashCommand } from '../../types';
import { successEmbed } from '../../utils/embed';

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check bot latency'),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const sent = await interaction.reply({ content: '🏓 Pinging...', fetchReply: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        const wsLatency = interaction.client.ws.ping;

        await interaction.editReply({
            content: '',
            embeds: [
                successEmbed(
                    `**Pong!**\n⏱️ Roundtrip: \`${latency}ms\`\n💓 WebSocket: \`${wsLatency}ms\``
                ),
            ],
        });
    },
};

export default command;
