"use client";

import { type MessageData } from "./MessageBuilder";
import { type EmbedData } from "./EmbedEditor";
import { type ButtonData } from "./ButtonEditor";

interface DiscordPreviewProps {
    message: MessageData;
}

const BUTTON_STYLE_CLASSES: Record<string, string> = {
    Primary: "bg-[#5865F2] hover:bg-[#4752C4] text-white",
    Secondary: "bg-[#4f545c] hover:bg-[#686d73] text-white",
    Success: "bg-[#3ba55d] hover:bg-[#2d7d46] text-white",
    Danger: "bg-[#ed4245] hover:bg-[#c03537] text-white",
    Link: "bg-[#4f545c] hover:bg-[#686d73] text-white",
};

export function DiscordPreview({ message }: DiscordPreviewProps) {
    const hasContent = message.content || message.embeds.length > 0 || message.buttons.length > 0;

    if (!hasContent) {
        return (
            <div className="rounded-xl border border-white/10 bg-[#313338] p-8 text-center">
                <p className="text-gray-500 text-sm">
                    Start building your message to see a preview here
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-white/10 bg-[#313338] overflow-hidden">
            {/* Discord-style message */}
            <div className="p-4">
                <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        {message.avatarUrl ? (
                            <img
                                src={message.avatarUrl}
                                alt="avatar"
                                className="w-10 h-10 rounded-full"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' rx='20' fill='%235865F2'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.35em' fill='white' font-size='16' font-family='sans-serif'%3EW%3C/text%3E%3C/svg%3E";
                                }}
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold text-sm">
                                W
                            </div>
                        )}
                    </div>

                    {/* Message body */}
                    <div className="flex-1 min-w-0 space-y-1">
                        {/* Username and timestamp */}
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-white text-sm hover:underline cursor-pointer">
                                {message.username || "Webhook"}
                            </span>
                            <span className="text-[11px] text-gray-500">Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>

                        {/* Content */}
                        {message.content && (
                            <p className="text-[#dcddde] text-sm whitespace-pre-wrap break-words">
                                {message.content}
                            </p>
                        )}

                        {/* Embeds */}
                        {message.embeds.map((embed, i) => (
                            <EmbedPreview key={i} embed={embed} />
                        ))}

                        {/* Buttons */}
                        {message.buttons.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-1">
                                {message.buttons.map((btn, i) => (
                                    <ButtonPreview key={i} button={btn} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function EmbedPreview({ embed }: { embed: EmbedData }) {
    const hasContent = embed.title || embed.description || embed.fields.length > 0 || embed.footer || embed.thumbnail || embed.image;
    if (!hasContent) return null;

    return (
        <div
            className="rounded overflow-hidden max-w-[520px] mt-1"
            style={{ borderLeftWidth: 4, borderLeftColor: embed.color || "#5865F2" }}
        >
            <div className="bg-[#2f3136] p-3 flex gap-4">
                <div className="flex-1 min-w-0 space-y-2">
                    {embed.title && (
                        <p className="font-semibold text-white text-sm">{embed.title}</p>
                    )}
                    {embed.description && (
                        <p className="text-[#dcddde] text-sm whitespace-pre-wrap">{embed.description}</p>
                    )}
                    {embed.fields.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {embed.fields.map((field, i) => (
                                <div key={i} className={field.inline ? "col-span-1" : "col-span-3"}>
                                    <p className="text-xs font-semibold text-white">{field.name}</p>
                                    <p className="text-xs text-[#dcddde]">{field.value}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    {embed.image && (
                        <img
                            src={embed.image}
                            alt="embed image"
                            className="rounded mt-2 max-w-full"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                    )}
                    {embed.footer && (
                        <p className="text-[10px] text-gray-400 mt-2">{embed.footer}</p>
                    )}
                </div>
                {embed.thumbnail && (
                    <img
                        src={embed.thumbnail}
                        alt="thumbnail"
                        className="w-20 h-20 rounded object-cover flex-shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                )}
            </div>
        </div>
    );
}

function ButtonPreview({ button }: { button: ButtonData }) {
    return (
        <button
            className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${BUTTON_STYLE_CLASSES[button.style] || BUTTON_STYLE_CLASSES.Secondary
                }`}
        >
            {button.label || "Button"}
            {button.style === "Link" && (
                <svg className="inline-block w-3 h-3 ml-1 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            )}
        </button>
    );
}
