"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, Bell, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "../ui/sheet";
import { Sidebar } from "./Sidebar";

export function Header() {
    const { data: session } = useSession();
    const [selectedGuild, setSelectedGuild] = useState<any>(null);
    const [open, setOpen] = useState(false);
    const [guilds, setGuilds] = useState<any[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const guild = localStorage.getItem("selected_guild");
        if (guild) {
            setSelectedGuild(JSON.parse(guild));
        }

        // Fetch all guilds for the dropdown
        const fetchGuilds = async () => {
            try {
                const res = await fetch("/api/v1/user/guilds");
                const data = await res.json();
                if (data.guilds) {
                    setGuilds(data.guilds.filter((g: any) => g.botInGuild));
                }
            } catch (error) {
                console.error("Failed to fetch guilds for dropdown", error);
            }
        };
        fetchGuilds();
    }, []);

    const handleSelectServer = (guild: any) => {
        document.cookie = `selected_guild_id=${guild.id}; path=/; max-age=31536000`;
        localStorage.setItem("selected_guild", JSON.stringify(guild));
        setSelectedGuild(guild);
        setDropdownOpen(false);
        router.refresh(); // Refresh the page to apply context everywhere
    };

    return (
        <header className="h-16 border-b border-white/5 bg-[#0c0c14]/60 backdrop-blur-xl flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-4">
                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-gray-400">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-[260px] bg-[#0c0c14] border-r-white/5">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <Sidebar className="h-full border-none" onItemClick={() => setOpen(false)} />
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="flex items-center gap-3">
                    {selectedGuild && (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-3 pr-4 border-r border-white/10 hover:bg-white/5 rounded-lg p-1.5 transition-colors cursor-pointer group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-slate-800 shrink-0 overflow-hidden flex items-center justify-center text-xs font-bold group-hover:ring-2 group-hover:ring-orange-500/50 transition-all">
                                    {selectedGuild.icon ? (
                                        <img
                                            src={`https://cdn.discordapp.com/icons/${selectedGuild.id}/${selectedGuild.icon}.png`}
                                            alt={selectedGuild.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        selectedGuild.name.charAt(0)
                                    )}
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-sm font-semibold text-white hidden sm:block truncate max-w-[120px]">
                                        {selectedGuild.name}
                                    </span>
                                    <span className="text-[10px] text-gray-500 hidden sm:block">Change Server ▼</span>
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            {dropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)}></div>
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-[#0c0c14] border border-white/10 rounded-xl shadow-xl shadow-black/50 z-50 overflow-hidden max-h-96 overflow-y-auto">
                                        <div className="p-2 border-b border-white/5 bg-white/[0.02]">
                                            <p className="text-xs font-medium text-gray-400 px-2 py-1">Select Server</p>
                                        </div>
                                        <div className="p-1.5 flex flex-col gap-1">
                                            {guilds.map(guild => (
                                                <button
                                                    key={guild.id}
                                                    onClick={() => handleSelectServer(guild)}
                                                    className={`flex items-center gap-3 w-full p-2 text-left rounded-lg transition-colors ${selectedGuild.id === guild.id ? 'bg-orange-500/10 text-orange-400' : 'hover:bg-white/5 text-gray-300 hover:text-white'}`}
                                                >
                                                    <div className="w-6 h-6 rounded-md bg-slate-800 shrink-0 overflow-hidden flex items-center justify-center text-[10px] font-bold">
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
                                                    <span className="text-sm truncate flex-1">{guild.name}</span>
                                                    {selectedGuild.id === guild.id && (
                                                        <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                                                    )}
                                                </button>
                                            ))}
                                            <a href="/servers" className="flex items-center gap-2 p-2 mt-1 text-xs text-orange-400 hover:bg-orange-500/10 rounded-lg transition-colors border-t border-white/5">
                                                <span className="flex-1 text-center">Manage all servers...</span>
                                            </a>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                    <div className="hidden sm:block">
                        <h2 className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">User</h2>
                        <p className="text-xs md:text-sm text-white font-semibold truncate max-w-[80px] md:max-w-none">
                            {session?.user?.name || "User"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500" />
                </button>

                <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-white/10">
                    {session?.user?.image && (
                        <img
                            src={session.user.image}
                            alt="avatar"
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full ring-2 ring-white/10"
                        />
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="text-gray-400 hover:text-red-400 px-2 sm:px-3"
                    >
                        <LogOut className="w-4 h-4 sm:mr-1" />
                        <span className="hidden xs:inline">Sign Out</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
