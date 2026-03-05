import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    Message,
    Client,
    Collection,
} from 'discord.js';

// ── Slash Command ──
export interface SlashCommand {
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

// ── Prefix Command ──
export interface PrefixCommand {
    name: string;
    aliases?: string[];
    description: string;
    usage?: string;
    execute: (message: Message, args: string[]) => Promise<void>;
}

// ── Event ──
export interface BotEvent {
    name: string;
    once?: boolean;
    execute: (...args: any[]) => Promise<void> | void;
}

// ── Extend Client ──
declare module 'discord.js' {
    interface Client {
        slashCommands: Collection<string, SlashCommand>;
        prefixCommands: Collection<string, PrefixCommand>;
        startTimestamp: number;
    }
}
