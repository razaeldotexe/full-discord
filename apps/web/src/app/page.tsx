"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Anchor, // Changed from Bot to Anchor
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
    <div className="bg-zinc-950 min-h-screen text-zinc-50">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-zinc-800 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-orange-500 flex items-center justify-center shrink-0">
              <Anchor className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-950" /> {/* Changed Bot to Anchor */}
            </div>
            <span className="text-base sm:text-lg font-bold text-zinc-100 truncate">
              Foho {/* Changed "Discord Manager" to "Foho" */}
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
                <svg className="w-4 h-4 mr-2 shrink-0" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" /></svg>
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500 text-sm font-bold tracking-wide uppercase"
          >
            <Zap className="w-4 h-4" /> v1.0.0 — Now Available
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-7xl font-extrabold tracking-tight"
          >
            <span className="text-zinc-100">
              Foho {/* Changed "Discord Bot & " to "Foho" */}
            </span>
            <br />
            <span className="text-orange-500">
              Webhook Manager
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto px-4"
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
              <Button size="lg" className="w-full sm:w-auto px-8 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-semibold border-0">
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
            className="text-3xl font-bold text-center mb-12 text-zinc-100"
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
              },
              {
                icon: MessageSquarePlus,
                title: "Message Builder",
                description:
                  "Build rich messages with embeds, buttons, and live preview. Pixel-perfect Discord rendering.",
              },
              {
                icon: Shield,
                title: "External API",
                description:
                  "Send messages programmatically via API keys. Perfect for monitoring systems and automation.",
              },
              {
                icon: Anchor, // Changed Bot to Anchor
                title: "Smart Bot",
                description:
                  "High-performance bot with slash commands, prefix commands, auto-moderation, and version tracking.",
              },
              {
                icon: BarChart3,
                title: "Real-time Stats",
                description:
                  "Monitor your bot's performance with server count, user count, uptime, and resource usage.",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description:
                  "Built on Next.js and Discord.js v14 for maximum performance and developer experience.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-xl border border-zinc-800 bg-zinc-900 p-6 hover:border-orange-500 transition-colors duration-300"
              >
                <div className="absolute inset-0 rounded-xl bg-orange-500/0 group-hover:bg-orange-500/5 transition-colors duration-300" />
                <div
                  className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors duration-300"
                >
                  <feature.icon className="w-6 h-6 text-zinc-300 group-hover:text-zinc-950 transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 text-center sm:text-left">
          <p>&copy; 2026 Foho</p> {/* Changed "Discord Bot & Webhook Manager" to "Foho" */}
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
