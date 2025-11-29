# 🛡️ AgeGate AI

**Prove you're 18+ using your passport. No personal data stored, ever.**

Built for ETHGlobal Buenos Aires 2025

---

## The Problem

Every age-restricted website asks you to upload your ID. That's dozens of sites storing your passport scan, driver's license photo, or selfie. It's privacy nightmare and nobody likes it.

## The Solution

**Verify once with your passport's NFC chip, access everywhere.**

1. Tap your phone to your passport (the chip inside)
2. Self Protocol creates a zero-knowledge proof you're 18+
3. That proof goes on-chain (Celo blockchain)
4. Every age-gated website can check it instantly

Your name, birth date, passport number? Never stored anywhere. Just a cryptographic proof that you meet the age requirement.

## Try It

**Live demo:** [agegate-ai.vercel.app](https://agegate-ai.vercel.app)

Three demo sites show how it works:

- 💨 Vape shop (21+ required)
- 🎰 Casino (18+ required)
- 🔞 Adult content (18+ required)

Verify once on any site, you're verified everywhere.

## How It Works

**Smart Contract** (Solidity on Celo Sepolia)

- Extends Self Protocol's verification system
- Stores only: wallet address → minimum age verified
- Zero personal info touches the blockchain

**Frontend** (Next.js + RainbowKit)

- Connect your wallet
- Get a QR code
- Scan with Self mobile app
- Done

**The Magic** (Self Protocol)

- Reads your passport's NFC chip
- Generates zero-knowledge proof of age
- Submits to blockchain
- You stay anonymous

## Running Locally

```bash
# Frontend
cd frontend
npm install
cp .env.example .env.local  # Add contract address
npm run dev

# Smart contract
cd contracts
npm install
npx hardhat compile
npx hardhat run scripts/deploy.ts --network celoSepolia
```

## Tech Stack

- **Blockchain:** Celo Sepolia testnet
- **Smart Contracts:** Solidity 0.8.28, Hardhat
- **Frontend:** Next.js 15, React 19, TypeScript
- **Wallet Integration:** RainbowKit, wagmi, viem
- **Zero-Knowledge Proofs:** Self Protocol
- **Styling:** Tailwind CSS, shadcn/ui

## Deployed Contract

**Address:** `0x689f87307d49f3f58dc44ab62285e931e3f8c6f2`
**Explorer:** [View on Blockscout](https://celo-sepolia.blockscout.com/address/0x689f87307d49f3f58dc44ab62285e931e3f8c6f2)

## Why This Matters

Current age verification is broken:

- Upload your ID to every site (privacy risk)
- Companies store your personal data (data breach risk)
- No interoperability (verify 20 times for 20 sites)

AgeGate AI fixes all three:

- ✅ Verify with cryptography, not uploaded documents
- ✅ Zero personal data stored anywhere
- ✅ One verification works everywhere

## Built With

- [Self Protocol](https://self.xyz) - Zero-knowledge passport verification
- [Celo](https://celo.org) - Carbon-negative blockchain
- [RainbowKit](https://rainbowkit.com) - Wallet connection UI
- ...and a little boost here & there from Claude Code / Sonnet 4.5 👽

## Links

- **Live demo:** https://agegate-ai.vercel.app
- **Contract:** https://celo-sepolia.blockscout.com/address/0x689f87307d49f3f58dc44ab62285e931e3f8c6f2

## Built At

ETHGlobal Buenos Aires 2025 🇦🇷

## Contributors

@zambrose 👾
