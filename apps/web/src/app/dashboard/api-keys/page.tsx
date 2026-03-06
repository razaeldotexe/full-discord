"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Key, Plus, Copy, Trash2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

function generateApiKey(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "dm_";
    for (let i = 0; i < 40; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export default function ApiKeysPage() {
    const [keys, setKeys] = useState([
        { id: "1", name: "Production API", key: "dm_xxxxxxxxxxxxxxxxxxxxxxxxxxxx", createdAt: "2026-03-05" },
    ]);
    const [newKeyName, setNewKeyName] = useState("");
    const [showKey, setShowKey] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);

    const handleCreate = () => {
        if (!newKeyName) return;
        setCreating(true);
        const newKey = {
            id: Date.now().toString(),
            name: newKeyName,
            key: generateApiKey(),
            createdAt: new Date().toISOString().split("T")[0],
        };
        setKeys((prev) => [...prev, newKey]);
        setNewKeyName("");
        setCreating(false);
        setShowKey(newKey.id);
    };

    const handleCopy = (key: string) => {
        navigator.clipboard.writeText(key);
    };

    const handleDelete = (id: string) => {
        setKeys((prev) => prev.filter((k) => k.id !== id));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto space-y-6"
        >
            <div>
                <h1 className="text-2xl font-bold text-white">API Keys</h1>
                <p className="text-gray-400 mt-1">Manage API keys for external access to your webhooks</p>
            </div>

            {/* Create new key */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <Plus className="w-5 h-5 text-indigo-400" /> Create New Key
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-3">
                        <div className="flex-1 space-y-2">
                            <Label className="text-xs">Key Name</Label>
                            <Input
                                placeholder="e.g. Production API"
                                value={newKeyName}
                                onChange={(e) => setNewKeyName(e.target.value)}
                            />
                        </div>
                        <div className="flex items-end">
                            <Button onClick={handleCreate} disabled={!newKeyName || creating}>
                                <Key className="w-4 h-4 mr-2" /> Generate
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Key list */}
            <div className="space-y-3">
                {keys.map((apiKey) => (
                    <Card key={apiKey.id} className="hover:border-white/15 transition-all">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                        <Key className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white text-sm">{apiKey.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <code className="text-xs text-gray-500 font-mono">
                                                {showKey === apiKey.id ? apiKey.key : `${apiKey.key.slice(0, 10)}${"•".repeat(30)}`}
                                            </code>
                                            <button
                                                onClick={() => setShowKey(showKey === apiKey.id ? null : apiKey.id)}
                                                className="text-gray-500 hover:text-gray-300 transition-colors"
                                            >
                                                {showKey === apiKey.id ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="info">{apiKey.createdAt}</Badge>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" onClick={() => handleCopy(apiKey.key)}>
                                        <Copy className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-400" onClick={() => handleDelete(apiKey.id)}>
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Usage instructions */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Usage</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="text-xs text-gray-400 bg-black/30 rounded-lg p-4 overflow-auto font-mono">
                        {`# Send a message via API
curl -X POST https://your-domain.com/api/v1/webhook/send \\
  -H "Authorization: Bearer dm_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "webhookId": "your_webhook_id",
    "content": "Hello from API!",
    "embeds": [{
      "title": "API Message",
      "description": "Sent via external API",
      "color": 5793266
    }]
  }'`}
                    </pre>
                </CardContent>
            </Card>
        </motion.div>
    );
}
