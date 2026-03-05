"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, Bell } from "lucide-react";
import { Button } from "../ui/button";

export function Header() {
    const { data: session } = useSession();

    return (
        <header className="h-16 border-b border-white/5 bg-[#0c0c14]/60 backdrop-blur-xl flex items-center justify-between px-6">
            <div>
                <h2 className="text-sm font-medium text-gray-400">Welcome back,</h2>
                <p className="text-white font-semibold">
                    {session?.user?.name || "User"}
                </p>
            </div>

            <div className="flex items-center gap-3">
                <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
                </button>

                <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                    {session?.user?.image && (
                        <img
                            src={session.user.image}
                            alt="avatar"
                            className="w-8 h-8 rounded-full ring-2 ring-white/10"
                        />
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="text-gray-400 hover:text-red-400"
                    >
                        <LogOut className="w-4 h-4 mr-1" />
                        Sign Out
                    </Button>
                </div>
            </div>
        </header>
    );
}
