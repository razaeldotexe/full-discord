import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { SlashCommand } from '../../types';
import { createEmbed } from '../../utils/embed';

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Show bot statistics'),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const client = interaction.client;
        const uptime = client.uptime || 0;

        const days = Math.floor(uptime / 86400000);
        const hours = Math.floor((uptime % 86400000) / 3600000);
        const minutes = Math.floor((uptime % 3600000) / 60000);
        const seconds = Math.floor((uptime % 60000) / 1000);

        const uptimeStr = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        const embed = createEmbed({
            title: '📊 Bot Statistics',
            color: '#5865F2',
            fields: [
                { name: '🌐 Servers', value: `\`${client.guilds.cache.size}\``, inline: true },
                { name: '👥 Users', value: `\`${client.users.cache.size}\``, inline: true },
                { name: '📡 Channels', value: `\`${client.channels.cache.size}\``, inline: true },
                { name: '⏱️ Uptime', value: `\`${uptimeStr}\``, inline: true },
                { name: '🏓 Ping', value: `\`${client.ws.ping}ms\``, inline: true },
                { name: '💾 Memory', value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\``, inline: true },
            ],
            timestamp: true,
        });

        await interaction.reply({ embeds: [embed] });
    },
};

export default command;
