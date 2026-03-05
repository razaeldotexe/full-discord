import { Message, TextChannel } from 'discord.js';
import { logger } from '../utils/logger';

// ── Word Filter ──
const BLOCKED_WORDS: string[] = [
    // Add blocked words here
];

// ── Auto Responses ──
const AUTO_RESPONSES: Map<string, string> = new Map([
    // ['trigger', 'response'],
]);

export interface MessageHandlerOptions {
    enableFilter?: boolean;
    enableAutoResponse?: boolean;
    enableLogging?: boolean;
}

const defaultOptions: MessageHandlerOptions = {
    enableFilter: true,
    enableAutoResponse: true,
    enableLogging: false,
};

export async function handleMessage(
    message: Message,
    options: MessageHandlerOptions = defaultOptions
): Promise<boolean> {
    // Ignore bots
    if (message.author.bot) return false;

    // ── Word Filter ──
    if (options.enableFilter && BLOCKED_WORDS.length > 0) {
        const content = message.content.toLowerCase();
        const blocked = BLOCKED_WORDS.find((word) => content.includes(word.toLowerCase()));

        if (blocked) {
            try {
                await message.delete();
                if (message.channel.isTextBased() && 'send' in message.channel) {
                    const reply = await (message.channel as TextChannel).send(
                        `⚠️ ${message.author}, your message was removed for containing inappropriate content.`
                    );
                    setTimeout(() => reply.delete().catch(() => { }), 5000);
                }
                logger.warn(`Filtered message from ${message.author.tag} in #${(message.channel as any).name}`);
                return true; // Message was filtered, stop further processing
            } catch (err) {
                logger.error('Failed to filter message', err as Error);
            }
        }
    }

    // ── Auto Response ──
    if (options.enableAutoResponse) {
        const content = message.content.toLowerCase();
        for (const [trigger, response] of AUTO_RESPONSES) {
            if (content.includes(trigger.toLowerCase())) {
                await message.reply(response);
                return true;
            }
        }
    }

    // ── Message Logging ──
    if (options.enableLogging) {
        logger.debug(
            `[${(message.guild?.name || 'DM')}] ${message.author.tag}: ${message.content.slice(0, 100)}`
        );
    }

    return false;
}
