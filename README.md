# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

# LLM make new solidity file that satifies requirements

## before

`npm install`

create .env

PRIVATE_KEY =
SEPOLIA_RPC_URL =
OPENAI_API_KEY =

## to execute

```shell
cd server
node langchain.mjs
```

## After process Please delete new code in `contracts/Game.sol

        ```require(
            defender.characterType != DataBase.CharacterType.Elderly,
            "Cannot attack the Elderly!"
        );```
