"use client";

import { AgeGateWidget } from "@/components/AgeGateWidget";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function CasinoDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-yellow-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/"
            className="text-yellow-200 hover:text-white underline"
          >
            ← Back to Home
          </Link>
          <ConnectButton />
        </div>

        <header className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-red-600 to-yellow-500 rounded-2xl p-4 shadow-xl">
            <div className="w-full h-full bg-white/20 rounded-lg flex items-center justify-center text-6xl">
              🎰
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2">
            Lucky Strike Casino
          </h1>
          <p className="text-yellow-200 text-xl">Win Big, Play Responsibly</p>
        </header>

        <AgeGateWidget minAge={18} siteName="Lucky Strike Casino" />

        <div className="mt-12 grid grid-cols-4 gap-4 opacity-25 blur-sm pointer-events-none">
          {["🎲", "🃏", "🎰", "🎯"].map((emoji, i) => (
            <Card key={i} className="bg-red-800 p-6 text-center border-none">
              <div className="text-6xl mb-2">{emoji}</div>
              <p className="text-white font-bold">Game {i + 1}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
