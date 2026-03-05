"use client";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Trash2, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export interface EmbedField {
    name: string;
    value: string;
    inline?: boolean;
}

export interface EmbedData {
    title: string;
    description: string;
    color: string;
    fields: EmbedField[];
    footer: string;
    thumbnail: string;
    image: string;
}

interface EmbedEditorProps {
    embed: EmbedData;
    index: number;
    onChange: (embed: EmbedData) => void;
    onRemove: () => void;
}

export function EmbedEditor({ embed, index, onChange, onRemove }: EmbedEditorProps) {
    const [expanded, setExpanded] = useState(true);

    const update = (field: Partial<EmbedData>) => {
        onChange({ ...embed, ...field });
    };

    const addField = () => {
        update({ fields: [...embed.fields, { name: "", value: "", inline: false }] });
    };

    const updateField = (i: number, field: Partial<EmbedField>) => {
        const newFields = embed.fields.map((f, idx) => (idx === i ? { ...f, ...field } : f));
        update({ fields: newFields });
    };

    const removeField = (i: number) => {
        update({ fields: embed.fields.filter((_, idx) => idx !== i) });
    };

    return (
        <div
            className="rounded-xl border border-white/10 overflow-hidden"
            style={{ borderLeftColor: embed.color || "#5865F2", borderLeftWidth: 4 }}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/5">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center gap-2 text-sm font-medium text-white hover:text-indigo-400 transition-colors"
                >
                    {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    Embed {index + 1}{embed.title ? ` — ${embed.title}` : ""}
                </button>
                <Button size="sm" variant="ghost" onClick={onRemove} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>

            {/* Content */}
            {expanded && (
                <div className="p-4 space-y-4">
                    <div className="grid grid-cols-[1fr_80px] gap-4">
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                                placeholder="Embed Title"
                                value={embed.title}
                                onChange={(e) => update({ title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Color</Label>
                            <div className="relative">
                                <input
                                    type="color"
                                    value={embed.color || "#5865F2"}
                                    onChange={(e) => update({ color: e.target.value })}
                                    className="w-full h-10 rounded-lg cursor-pointer border border-white/10 bg-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            placeholder="Embed description (supports markdown)"
                            rows={3}
                            value={embed.description}
                            onChange={(e) => update({ description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Thumbnail URL</Label>
                            <Input
                                placeholder="https://..."
                                value={embed.thumbnail}
                                onChange={(e) => update({ thumbnail: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Image URL</Label>
                            <Input
                                placeholder="https://..."
                                value={embed.image}
                                onChange={(e) => update({ image: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Footer</Label>
                        <Input
                            placeholder="Footer text"
                            value={embed.footer}
                            onChange={(e) => update({ footer: e.target.value })}
                        />
                    </div>

                    {/* Fields */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Fields</Label>
                            <Button size="sm" variant="ghost" onClick={addField} disabled={embed.fields.length >= 25}>
                                <Plus className="w-3 h-3 mr-1" /> Add Field
                            </Button>
                        </div>
                        {embed.fields.map((field, i) => (
                            <div key={i} className="grid grid-cols-[1fr_1fr_auto_auto] gap-2 items-end">
                                <div className="space-y-1">
                                    <Label className="text-xs">Name</Label>
                                    <Input
                                        placeholder="Field name"
                                        value={field.name}
                                        onChange={(e) => updateField(i, { name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs">Value</Label>
                                    <Input
                                        placeholder="Field value"
                                        value={field.value}
                                        onChange={(e) => updateField(i, { value: e.target.value })}
                                    />
                                </div>
                                <label className="flex items-center gap-1 text-xs text-gray-400 pb-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={field.inline || false}
                                        onChange={(e) => updateField(i, { inline: e.target.checked })}
                                        className="rounded"
                                    />
                                    Inline
                                </label>
                                <Button size="icon" variant="ghost" className="text-red-400 h-10 w-10" onClick={() => removeField(i)}>
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
