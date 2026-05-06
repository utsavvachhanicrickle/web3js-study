import solc from "solc";
import fs from "fs";

const source = fs.readFileSync("contracts/Counter.sol", "utf8");

const input = {
  language: "Solidity",
  sources: {
    "Counter.sol": { content: source },
  },
  settings: {
    outputSelection: {
      "*": { "*": ["*"] },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const contract = output.contracts["Counter.sol"]["Counter"];

fs.writeFileSync("abi.json", JSON.stringify(contract.abi, null, 2));
fs.writeFileSync("bytecode.bin", contract.evm.bytecode.object);

console.log("✅ Compiled");