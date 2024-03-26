import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GameModule = buildModule("GameModule", (m) => {
  const Game = m.contract("Game");

  return { Game };
});

export default GameModule;
