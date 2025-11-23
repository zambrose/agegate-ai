"use client";

import { AgeGateWidget } from "@/components/AgeGateWidget";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function VapeShopDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button and wallet */}
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/"
            className="text-purple-700 hover:text-purple-900 underline"
          >
            ← Back to Home
          </Link>
          <ConnectButton />
        </div>

        <header className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-4 shadow-xl">
            <div className="w-full h-full bg-white/20 rounded-lg flex items-center justify-center text-6xl">
              💨
            </div>
          </div>
          <h1 className="text-5xl font-bold text-purple-900 mb-2">
            CloudNine Vapes
          </h1>
          <p className="text-purple-700 text-xl">Premium Vaping Products</p>
        </header>

        <AgeGateWidget minAge={21} siteName="CloudNine Vapes" />

        {/* Blurred product previews */}
        <div className="mt-12 grid grid-cols-3 gap-6 opacity-25 blur-sm pointer-events-none">
          {["Starter Kit", "Pod System", "Premium Juice"].map((product, i) => (
            <Card key={i} className="p-6">
              <div className="bg-purple-200 h-48 rounded mb-4"></div>
              <h3 className="font-bold text-lg">{product}</h3>
              <p className="text-gray-600">${49 + i * 30}.99</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
