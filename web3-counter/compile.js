
import solc from "solc";
import fs from "fs";

const source = fs.readFileSync("contracts/MyContract.sol", "utf8");

const input = {
  language: "Solidity",
  sources: {
    "MyContract.sol": { content: source },
  },
  settings: {
    outputSelection: {
      "*": { "*": ["*"] },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output.contracts["MyContract.sol"]["MyContract"]);

const contract = output.contracts["MyContract.sol"]["MyContract"];

fs.writeFileSync("abi.json", JSON.stringify(contract.abi, null, 2));
fs.writeFileSync("bytecode.bin", contract.evm.bytecode.object);

console.log("✅ Compiled");