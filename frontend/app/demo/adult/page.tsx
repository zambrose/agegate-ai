import { AgeGateWidget } from "@/components/AgeGateWidget";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function AdultContentDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-6 text-gray-400 hover:text-white underline"
        >
          ← Back to Home
        </Link>

        <header className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl p-4 shadow-xl">
            <div className="w-full h-full bg-white/10 rounded-lg flex items-center justify-center text-6xl">
              🔞
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2">
            Mature Content Hub
          </h1>
          <p className="text-gray-300 text-xl">Adults Only</p>
        </header>

        <AgeGateWidget minAge={18} siteName="Mature Content Hub" />

        <div className="mt-12 opacity-25 blur-lg pointer-events-none">
          <Card className="bg-gray-800 p-8 border-none">
            <p className="text-gray-400 text-center text-lg">
              [Adult content would appear here after verification]
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
