"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, Bell, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "../ui/sheet";
import { Sidebar } from "./Sidebar";

export function Header() {
    const { data: session } = useSession();
    const [selectedGuild, setSelectedGuild] = useState<any>(null);

    useEffect(() => {
        const guild = localStorage.getItem("selected_guild");
        if (guild) {
            setSelectedGuild(JSON.parse(guild));
        }
    }, []);

    return (
        <header className="h-16 border-b border-white/5 bg-[#0c0c14]/60 backdrop-blur-xl flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-4">
                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-gray-400">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-[260px] bg-[#0c0c14] border-r-white/5">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <Sidebar className="h-full border-none" />
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="flex items-center gap-3">
                    {selectedGuild && (
                        <div className="flex items-center gap-3 pr-4 border-r border-white/10">
                            <div className="w-8 h-8 rounded-lg bg-slate-800 shrink-0 overflow-hidden flex items-center justify-center text-xs font-bold">
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
                            <span className="text-sm font-semibold text-white hidden sm:block truncate max-w-[120px]">
                                {selectedGuild.name}
                            </span>
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
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
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
