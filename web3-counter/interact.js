import { Web3 } from "web3";
import fs from "fs";

const web3 = new Web3("http://127.0.0.1:8545");

const abi = JSON.parse(fs.readFileSync("abi.json"));
const address = fs.readFileSync("address.txt", "utf8");

const contract = new web3.eth.Contract(abi, address);

async function main() {
  const accounts = await web3.eth.getAccounts();
  const user = accounts[0];

  const action = process.argv[2];

  if (action === "read") {
    const val = await contract.methods.myNumber().call();
    console.log("Value:", val);
  }

  if (action === "inc") {
    const tx = await contract.methods.increment().send({
      from: user,
      gas: 100000,
    });
    console.log("TX:", tx.transactionHash);
  }

  if (action === "set") {
    const num = process.argv[3];

    await contract.methods.setMyNumber(num).send({
      from: user,
      gas: 100000,
    });

    console.log("Updated:", num);
  }
}

main();