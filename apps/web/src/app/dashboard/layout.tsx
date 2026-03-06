"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
            return;
        }

        if (status === "authenticated") {
            const guild = localStorage.getItem("selected_guild");
            if (!guild) {
                router.push("/servers");
            } else {
                setIsChecking(false);
            }
        }
    }, [status, router]);

    if (status === "loading" || isChecking) {
        return (
            <div className="gradient-bg min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin" />
                    <p className="text-gray-400 text-sm">Loading...</p>
                </div>
            </div>
        );
    }



    return (
        <div className="gradient-bg min-h-screen">
            {/* Desktop Layout Grid */}
            <div className="flex min-h-screen w-full overflow-x-hidden">
                {/* Sidebar - Desktop Only */}
                <aside className="hidden md:flex w-[260px] shrink-0 border-r border-white/5 bg-[#0c0c14]/80 backdrop-blur-2xl sticky top-0 h-screen">
                    <Sidebar className="flex-1" />
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0 w-full">
                    <Header />
                    <main className="flex-1 p-4 sm:p-6 w-full">
                        <div className="max-w-7xl mx-auto w-full">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
