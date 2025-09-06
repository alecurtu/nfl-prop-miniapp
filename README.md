# NFL Prop Bets — Farcaster Mini App (Base USDC)

A social, sweepstakes-style NFL prop mini app built with **Next.js + OnchainKit (Base)**, **Neynar + Farcaster**, and optional **SpacetimeDB** for realtime multiplayer. Users answer 4–5 randomized prop questions, pay a **$1 USDC** entry fee on **Base**, and compete in a contest pot. Winners split the pot.

> Starter inspired by: MiniAppStarter, OnchainKit, and Neynar docs. Plug your keys in `.env` and go.

## Features
- Random prop questions (turnovers, sacks, rushing yards, passing yards) pulled from chosen NFL data API (ESPN/APIsports/etc).
- Smooth sliders + validation UI.
- $1 USDC entry via **OnchainKit** on Base.
- Farcaster social + virality helpers (Neynar):
  - One-tap re-cast, share, and "Challenge More Friends" flows.
  - Frame v2 entry point deep-linking to mini app.
- Optional **SpacetimeDB** room to sync lobby & real-time entries.
- Admin settlement flow + simple Solidity **SweepstakesPot** contract.

## Quickstart
1. `pnpm i` (or `npm i` / `yarn`)
2. Copy `.env.example` to `.env` and fill secrets (Neynar, API, RPC).
3. `pnpm dev`
4. Visit `http://localhost:3000`

## Deploying Contracts
- Review `contracts/SweepstakesPot.sol`
- Configure USDC address & deployer
- `pnpm hardhat compile`
- `pnpm run deploy:contract` (update network config first)

## Notes
- Package names for certain SDKs can evolve. Check the current docs (OnchainKit, Neynar). Replace versions if needed.
- SpacetimeDB is optional; a simple in-memory fallback is included.
- This app treats contests as sweepstakes-style; confirm legal compliance for your region and game rules.
