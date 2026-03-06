"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, ArrowRight, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function ServersPage() {
    const [guilds, setGuilds] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchGuilds = async () => {
            try {
                const res = await fetch("/api/v1/user/guilds");
                const data = await res.json();
                if (data.guilds) {
                    setGuilds(data.guilds);
                }
            } catch (error) {
                console.error("Failed to fetch guilds", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGuilds();
    }, []);

    const handleSelectServer = (guild: any) => {
        if (!guild.botInGuild) {
            // Redirect to Discord OAuth invite in new tab
            const clientId = "1474595771344097280"; // Need to pass this or hardcode for now
            const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot%20applications.commands&guild_id=${guild.id}`;
            window.open(inviteUrl, "_blank");
            return;
        }

        // Save selection and redirect to dashboard
        document.cookie = `selected_guild_id=${guild.id}; path=/; max-age=31536000`;
        localStorage.setItem("selected_guild", JSON.stringify(guild));
        router.push("/dashboard");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#09090b]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#09090b] to-[#09090b]">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="w-full max-w-4xl space-y-8"
            >
                <div className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6">
                        <Server className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Select a Server</h1>
                    <p className="text-gray-400 max-w-lg mx-auto">
                        Choose a server to manage its webhooks and settings. You can only see servers where you have manage permission.
                    </p>
                </div>

                {guilds.length === 0 ? (
                    <motion.div variants={itemVariants}>
                        <Card className="border-dashed bg-white/5 border-white/10">
                            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                                <p className="text-gray-400 mb-2">No eligible servers found.</p>
                                <p className="text-sm text-gray-500">You need Manage Server or Administrator permissions.</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {guilds.map((guild) => (
                            <motion.button
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                key={guild.id}
                                onClick={() => handleSelectServer(guild)}
                                className="group text-left"
                            >
                                <Card className={`h-full transition-all duration-300 border-white/5 bg-white/[0.02] hover:bg-white/[0.04] ${!guild.botInGuild ? 'opacity-60 hover:opacity-100 grayscale hover:grayscale-0' : 'hover:border-indigo-500/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)]'}`}>
                                    <CardContent className="p-5 flex items-center justify-between">
                                        <div className="flex items-center gap-4 truncate">
                                            <div className="shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center text-lg font-bold">
                                                {guild.icon ? (
                                                    <img
                                                        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                                                        alt={guild.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    guild.name.charAt(0)
                                                )}
                                            </div>
                                            <div className="truncate">
                                                <h3 className="font-semibold text-white truncate">{guild.name}</h3>
                                                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                                    {guild.botInGuild ? (
                                                        <span className="text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Bot Active</span>
                                                    ) : (
                                                        <span className="text-gray-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Not in server</span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="shrink-0 ml-2">
                                            {guild.botInGuild ? (
                                                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white text-indigo-400 transition-colors">
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 text-gray-400 transition-colors">
                                                    <ExternalLink className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.button>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
