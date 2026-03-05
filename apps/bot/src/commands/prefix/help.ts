import { Message } from 'discord.js';
import { PrefixCommand } from '../../types';
import { createEmbed } from '../../utils/embed';
import { config } from '../../config';

const command: PrefixCommand = {
    name: 'help',
    aliases: ['h', 'commands'],
    description: 'Show all available commands',
    usage: '!help',
    execute: async (message: Message) => {
        const client = message.client;

        const slashCmds = client.slashCommands
            .map((cmd) => `\`/${cmd.data.name}\` — ${cmd.data.description}`)
            .join('\n');

        const prefixCmds = client.prefixCommands
            .filter((cmd, key) => cmd.name === key)
            .map((cmd) => `\`${config.prefix}${cmd.name}\` — ${cmd.description}`)
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

        await message.reply({ embeds: [embed] });
    },
};

export default command;
