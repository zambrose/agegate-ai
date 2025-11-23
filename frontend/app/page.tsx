import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16 text-white">
          <h1 className="text-7xl font-bold mb-4">🛡️ AgeGate AI</h1>
          <p className="text-3xl mb-6">
            Universal Age Verification, Zero Data Storage
          </p>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Prove you're 18+ or 21+ using your passport's NFC chip. Verify once,
            access everywhere. No personal data stored, ever.
          </p>
        </header>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            emoji="🔒"
            title="Privacy First"
            description="Zero-knowledge proofs mean we never see your personal data"
          />
          <FeatureCard
            emoji="⚡"
            title="Verify Once"
            description="Use your verification across multiple age-gated sites instantly"
          />
          <FeatureCard
            emoji="🌍"
            title="Universal Widget"
            description="Any website can embed our widget in minutes"
          />
        </div>

        {/* Demo Sites */}
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl mb-2">Try Our Demo Sites</CardTitle>
            <CardDescription className="text-base">
              Experience universal age verification in action
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <DemoSiteCard
                href="/demo/vape"
                title="Vape Shop"
                requirement="21+"
                color="from-purple-500 to-pink-500"
                icon="vape"
              />
              <DemoSiteCard
                href="/demo/casino"
                title="Online Casino"
                requirement="18+"
                color="from-red-500 to-yellow-500"
                icon="casino"
              />
              <DemoSiteCard
                href="/demo/adult"
                title="Adult Content"
                requirement="18+"
                color="from-gray-700 to-gray-900"
                icon="adult"
              />
            </div>

            <Card className="bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg">🎯 Try the Full Experience:</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Visit any demo site above</li>
                  <li>Connect your wallet (MetaMask recommended)</li>
                  <li>Scan QR with Self mobile app</li>
                  <li>Complete verification once</li>
                  <li>
                    <strong>Visit another demo</strong> - see instant access!
                  </li>
                </ol>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-16 text-center text-white">
          <p className="text-xl mb-4">Built with Self Protocol on Celo</p>
          <p className="text-sm opacity-75 mb-4">
            ETHGlobal Buenos Aires 2025 Hackathon Project
          </p>
          <a
            href="https://celo-sepolia.blockscout.com/address/0x7c60a061df83efe534975f00d405ea4606a5cc30"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm underline opacity-75 hover:opacity-100 transition-opacity"
          >
            View Contract on Blockscout →
          </a>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
      <CardHeader className="text-center">
        <div className="text-6xl mb-4">{emoji}</div>
        <CardTitle className="text-2xl mb-2">{title}</CardTitle>
        <CardDescription className="text-white/90">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function DemoSiteCard({
  href,
  title,
  requirement,
  color,
  icon,
}: {
  href: string;
  title: string;
  requirement: string;
  color: string;
  icon: "vape" | "casino" | "adult";
}) {
  const icons = {
    vape: "💨",
    casino: "🎰",
    adult: "🔞"
  };

  return (
    <Link
      href={href}
      className={`block bg-gradient-to-br ${color} rounded-lg p-8 text-center text-white
                 hover:scale-105 transition-transform shadow-lg`}
    >
      <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-lg flex items-center justify-center">
        <div className="text-6xl">{icons[icon]}</div>
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <Badge variant="secondary" className="text-sm">
        {requirement} Required
      </Badge>
      <div className="mt-4 text-sm opacity-75">Click to try →</div>
    </Link>
  );
}
