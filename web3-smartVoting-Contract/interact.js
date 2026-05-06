import { Web3 } from "web3";
import fs from "fs";

const web3 = new Web3("http://127.0.0.1:8545");

const abi = JSON.parse(fs.readFileSync("abi.json"));
const address = fs.readFileSync("address.txt", "utf8");

const contract = new web3.eth.Contract(abi, address);
// console.log(contract.methods);

async function main() {
  const accounts = await web3.eth.getAccounts();
  const user = accounts[5];

  const action = process.argv[2];

  try {
    if (action === "yes") {
      await contract.methods.voteYes().send({ from: user });
      console.log("Voted YES");
    }

    if (action === "no") {
      await contract.methods.voteNo().send({ from: user });
      console.log("Voted NO");
    }

    if (action === "result") {
      const yes = await contract.methods.yesVotes().call();
      const no = await contract.methods.noVotes().call();

      console.log("Yes:", yes, "No:", no);
    }
  } catch (error) {
    // 👇 Clean error handling
    if (error?.cause?.errorArgs?.message) {
      console.log("❌", error.cause.errorArgs.message);
    } else {
      console.log("❌ Transaction failed", error);
    }
  }
}

main();
