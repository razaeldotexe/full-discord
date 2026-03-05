"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export interface ButtonData {
    label: string;
    style: "Primary" | "Secondary" | "Success" | "Danger" | "Link";
    url: string;
    customId: string;
}

interface ButtonEditorProps {
    button: ButtonData;
    index: number;
    onChange: (button: ButtonData) => void;
    onRemove: () => void;
}

const STYLE_OPTIONS: { value: ButtonData["style"]; label: string; color: string }[] = [
    { value: "Primary", label: "Primary", color: "bg-indigo-600" },
    { value: "Secondary", label: "Secondary", color: "bg-gray-600" },
    { value: "Success", label: "Success", color: "bg-emerald-600" },
    { value: "Danger", label: "Danger", color: "bg-red-600" },
    { value: "Link", label: "Link", color: "bg-gray-600" },
];

export function ButtonEditor({ button, index, onChange, onRemove }: ButtonEditorProps) {
    const update = (field: Partial<ButtonData>) => {
        onChange({ ...button, ...field });
    };

    return (
        <div className="rounded-lg border border-white/10 p-4 space-y-3 bg-white/[0.02]">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">Button {index + 1}</span>
                <Button size="sm" variant="ghost" onClick={onRemove} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                    <Label className="text-xs">Label</Label>
                    <Input
                        placeholder="Button text"
                        value={button.label}
                        onChange={(e) => update({ label: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs">Style</Label>
                    <div className="flex gap-1">
                        {STYLE_OPTIONS.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => update({ style: option.value })}
                                className={`px-2 py-1.5 rounded text-xs font-medium transition-all ${button.style === option.value
                                        ? `${option.color} text-white ring-2 ring-white/20`
                                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {button.style === "Link" ? (
                <div className="space-y-2">
                    <Label className="text-xs">URL</Label>
                    <Input
                        placeholder="https://..."
                        value={button.url}
                        onChange={(e) => update({ url: e.target.value })}
                    />
                </div>
            ) : (
                <div className="space-y-2">
                    <Label className="text-xs">Custom ID</Label>
                    <Input
                        placeholder="my_button_id"
                        value={button.customId}
                        onChange={(e) => update({ customId: e.target.value })}
                    />
                </div>
            )}
        </div>
    );
}
