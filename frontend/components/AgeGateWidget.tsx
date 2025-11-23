"use client";

import { useState, useEffect } from "react";
import { useAccount, usePublicClient } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { SelfQRcodeWrapper, SelfAppBuilder } from "@selfxyz/qrcode";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AgeGateWidgetProps {
  minAge: 18 | 21;
  siteName: string;
}

const CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

// Minimal ABI for reading contract
const AGEGATE_ABI = [
  {
    inputs: [{ name: "user", type: "address" }],
    name: "getVerificationDetails",
    outputs: [
      { name: "minAge", type: "uint256" },
      { name: "timestamp", type: "uint256" },
      { name: "isVerified", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function AgeGateWidget({ minAge, siteName }: AgeGateWidgetProps) {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();

  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timestamp, setTimestamp] = useState<bigint | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check verification when wallet connects
  useEffect(() => {
    if (!isConnected || !address || !publicClient) {
      setIsLoading(false);
      return;
    }
    checkVerification();
  }, [isConnected, address, publicClient]);

  async function checkVerification() {
    if (!address || !publicClient) return;

    try {
      setIsLoading(true);
      setError(null);

      // Read from smart contract
      const result = (await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: AGEGATE_ABI,
        functionName: "getVerificationDetails",
        args: [address],
      })) as readonly [bigint, bigint, boolean];

      const [userMinAge, verificationTime, verified] = result;

      // User is verified if they have a record AND meet age requirement
      if (verified && userMinAge >= minAge) {
        setIsVerified(true);
        setTimestamp(verificationTime);
      } else {
        setIsVerified(false);
        setTimestamp(null);
      }
    } catch (err) {
      console.error("Error checking verification:", err);
      setError("Failed to check verification status");
      setIsVerified(false);
    } finally {
      setIsLoading(false);
    }
  }

  // Build Self Protocol QR code
  const selfApp = address
    ? new SelfAppBuilder({
        version: 2,
        appName: `${siteName} Age Verification`,
        scope: "agegate-ai-v1", // Must match contract scopeSeed
        endpoint: CONTRACT_ADDRESS.toLowerCase(), // MUST be lowercase per Self docs
        endpointType: "staging_celo", // Testnet mode (Celo Sepolia)
        userId: address,
        userIdType: "hex",
        userDefinedData: minAge.toString(), // Pass required age to contract
        disclosures: {
          minimumAge: minAge,
          excludedCountries: [],
          ofac: false,
        },
      }).build()
    : null;

  const handleVerificationSuccess = () => {
    // Give blockchain time to confirm
    setTimeout(() => {
      checkVerification();
    }, 3000);
  };

  const handleVerificationError = (data: { error_code?: string; reason?: string }) => {
    console.error("Verification error:", data);
    setError(data.reason || "Verification failed. Please try again.");
  };

  // Loading state
  if (isLoading) {
    return (
      <Card className="border-4 border-amber-500">
        <CardContent className="pt-6 text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-muted-foreground">Checking verification status...</p>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-lg font-semibold mb-2">{error}</p>
          <Button onClick={() => checkVerification()} variant="outline" className="mt-4">
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // Already verified - SUCCESS!
  if (isVerified) {
    return (
      <Card className="border-4 border-green-500 bg-green-50">
        <CardHeader className="text-center">
          <div className="text-6xl mb-2">✅</div>
          <CardTitle className="text-green-800">Age Verified!</CardTitle>
          <CardDescription className="text-green-700 text-lg">
            You are verified as {minAge}+ for {siteName}
          </CardDescription>
          {timestamp && (
            <p className="text-sm text-green-600 mt-2">
              Verified: {new Date(Number(timestamp) * 1000).toLocaleDateString()}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <Alert className="bg-green-100 border-green-200">
            <AlertDescription className="text-green-800 text-center">
              <p className="font-semibold text-sm">
                This verification works across all AgeGate sites!
              </p>
              <p className="text-xs mt-1">
                Navigate to another demo site to see instant access
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Not connected - show connect button
  if (!isConnected) {
    return (
      <Card className="border-4 border-amber-500">
        <CardHeader className="text-center">
          <div className="text-6xl mb-2">🔒</div>
          <CardTitle>Age Verification Required</CardTitle>
          <CardDescription className="text-base mt-4">
            {siteName} requires you to verify you are {minAge}+ years old using
            zero-knowledge proofs from your passport.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <ConnectButton />
          </div>
          <Alert>
            <AlertDescription className="text-center text-sm space-y-2">
              <p>Connect your wallet to begin</p>
              <Badge variant="outline" className="text-xs">
                Make sure you're on Celo Sepolia testnet
              </Badge>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Connected but not verified - show QR code
  return (
    <Card className="border-4 border-blue-500">
      <CardHeader className="text-center">
        <div className="text-6xl mb-2">📱</div>
        <CardTitle>Verify Your Age</CardTitle>
        <CardDescription className="text-base mt-4">
          Scan this QR code with the Self mobile app to prove you're {minAge}+
          using your passport's NFC chip. Your identity stays completely private!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {selfApp && (
          <div className="flex justify-center">
            <SelfQRcodeWrapper
              selfApp={selfApp}
              onSuccess={handleVerificationSuccess}
              onError={handleVerificationError}
            />
          </div>
        )}

        <Alert>
          <AlertDescription className="text-sm space-y-2">
            <p className="font-semibold">How to verify:</p>
            <ol className="list-decimal list-inside space-y-1 pl-2">
              <li>Download Self mobile app (iOS/Android)</li>
              <li className="font-bold text-amber-600">⚠️ Enable testnet mode in app settings</li>
              <li>Scan the QR code above</li>
              <li>Follow prompts to verify with passport</li>
              <li>Return here to see verification</li>
            </ol>
          </AlertDescription>
        </Alert>

        <div className="text-center text-xs text-muted-foreground space-y-1">
          <p>✨ Verify once, access everywhere</p>
          <p>🔒 Zero personal data stored on-chain</p>
          <p>🌍 Works across all AgeGate-enabled sites</p>
        </div>
      </CardContent>
    </Card>
  );
}
