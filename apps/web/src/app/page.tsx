"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Bot,
  Webhook,
  MessageSquarePlus,
  Zap,
  ArrowRight,
  Shield,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="gradient-bg min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#0a0a12]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 shrink-0">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent truncate">
              Discord Manager
            </span>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <Link href="/dashboard">
                <Button size="sm" className="sm:size-default">
                  Dashboard <ArrowRight className="hidden sm:inline w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Link href="/auth/signin">
                <Button size="sm" className="sm:size-default">
                  Sign In <span className="hidden sm:inline">with Discord</span> <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium"
          >
            <Zap className="w-4 h-4" /> v1.0.0 — Now Available
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-7xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent">
              Discord Bot &{" "}
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Webhook Manager
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4"
          >
            The complete ecosystem for managing Discord webhooks, building rich embed messages,
            and controlling your bot — all from a beautiful modern dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link href={session ? "/dashboard" : "/auth/signin"} className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto px-8 shadow-xl shadow-indigo-500/20">
                Get Started <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="#features" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            Everything You Need
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Webhook,
                title: "Webhook Management",
                description:
                  "Create, edit, and delete webhooks across your servers. Full CRUD with an intuitive UI.",
                gradient: "from-indigo-500 to-blue-600",
              },
              {
                icon: MessageSquarePlus,
                title: "Message Builder",
                description:
                  "Build rich messages with embeds, buttons, and live preview. Pixel-perfect Discord rendering.",
                gradient: "from-purple-500 to-pink-600",
              },
              {
                icon: Shield,
                title: "External API",
                description:
                  "Send messages programmatically via API keys. Perfect for monitoring systems and automation.",
                gradient: "from-emerald-500 to-teal-600",
              },
              {
                icon: Bot,
                title: "Smart Bot",
                description:
                  "High-performance bot with slash commands, prefix commands, auto-moderation, and version tracking.",
                gradient: "from-amber-500 to-orange-600",
              },
              {
                icon: BarChart3,
                title: "Real-time Stats",
                description:
                  "Monitor your bot's performance with server count, user count, uptime, and resource usage.",
                gradient: "from-cyan-500 to-blue-600",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description:
                  "Built on Next.js and Discord.js v14 for maximum performance and developer experience.",
                gradient: "from-rose-500 to-red-600",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur p-6 hover:border-white/10 transition-colors duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 text-center sm:text-left">
          <p>&copy; 2026 Discord Bot & Webhook Manager</p>
          <div className="flex items-center gap-1">
            Built with
            <span className="text-red-400">♥</span>
            using Next.js & Discord.js
          </div>
        </div>
      </footer>
    </div>
  );
}
