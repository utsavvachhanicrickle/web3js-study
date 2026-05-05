
import solc from "solc";
import fs from "fs";

const source = fs.readFileSync("contracts/Voting.sol", "utf8");

const input = {
  language: "Solidity",
  sources: {
    "Voting.sol": { content: source },
  },
  settings: {
    outputSelection: {
      "*": { "*": ["*"] },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output.contracts["Voting.sol"]["Voting"]);

const contract = output.contracts["Voting.sol"]["Voting"];

fs.writeFileSync("abi.json", JSON.stringify(contract.abi, null, 2));
fs.writeFileSync("bytecode.bin", contract.evm.bytecode.object);

console.log("✅ Compiled");