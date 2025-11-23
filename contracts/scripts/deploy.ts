import hre from "hardhat";
import { formatEther } from "viem";

async function main() {
  console.log("🚀 Deploying AgeGateRegistry to Celo Sepolia...\n");

  // Self Protocol Hub V2 on Celo Sepolia
  // Source: https://docs.self.xyz/contract-integration/deployed-contracts
  const HUB_V2_ADDRESS = "0x16ECBA51e18a4a7e61fdC417f0d47AFEeDfbed74";
  const SCOPE_SEED = "agegate-ai-v1";

  // Connect to network and get viem instance
  const { viem } = await hre.network.connect();

  // Get wallet and public clients
  const [walletClient] = await viem.getWalletClients();
  const publicClient = await viem.getPublicClient();

  console.log("📝 Deploying from:", walletClient.account.address);

  // Get balance using public client
  const balance = await publicClient.getBalance({
    address: walletClient.account.address,
  });

  console.log("💰 Balance:", formatEther(balance), "CELO\n");

  if (balance === 0n) {
    throw new Error("❌ No CELO balance! Get testnet tokens from faucet.");
  }

  console.log("⏳ Deploying contract...");

  // Deploy contract
  const registry = await viem.deployContract("AgeGateRegistry", [
    HUB_V2_ADDRESS,
    SCOPE_SEED,
  ]);

  console.log("✅ Deployed to:", registry.address);

  // Read contract state
  const config18 = await registry.read.config18Plus();
  const config21 = await registry.read.config21Plus();
  const scope = await registry.read.scope();

  console.log("\n📋 Contract Details:");
  console.log("├─ Address:", registry.address);
  console.log("├─ Scope:", scope.toString());
  console.log("├─ Config 18+:", config18);
  console.log("└─ Config 21+:", config21);

  console.log("\n🔗 View on Blockscout:");
  console.log(
    `https://celo-sepolia.blockscout.com/address/${registry.address}`
  );

  console.log("\n⚠️  SAVE THIS ADDRESS - You need it for the frontend!\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
