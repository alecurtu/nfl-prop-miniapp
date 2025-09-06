import { ethers } from "hardhat";

async function main() {
  const USDC = process.env.NEXT_PUBLIC_USDC_ADDRESS as string;
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Pot = await ethers.getContractFactory("SweepstakesPot");
  const pot = await Pot.deploy(USDC, deployer.address);
  await pot.waitForDeployment();
  console.log("SweepstakesPot deployed to:", await pot.getAddress());
}

main().catch((e)=> { console.error(e); process.exit(1); });
