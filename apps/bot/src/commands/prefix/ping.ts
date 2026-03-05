import { Message } from 'discord.js';
import { PrefixCommand } from '../../types';
import { successEmbed } from '../../utils/embed';

const command: PrefixCommand = {
    name: 'ping',
    aliases: ['p', 'latency'],
    description: 'Check bot latency',
    usage: '!ping',
    execute: async (message: Message) => {
        const sent = await message.reply('🏓 Pinging...');
        const latency = sent.createdTimestamp - message.createdTimestamp;
        const wsLatency = message.client.ws.ping;

        await sent.edit({
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
