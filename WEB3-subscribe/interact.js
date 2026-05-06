import { Web3 } from "web3";
import fs from "fs";

const web3 = new Web3("http://127.0.0.1:8545");

const abi = JSON.parse(fs.readFileSync("abi.json"));
const address = fs.readFileSync("address.txt", "utf8");

const contract = new web3.eth.Contract(abi, address);

async function main() {
  const accounts = await web3.eth.getAccounts();
  const user = accounts[1];

  const action = process.argv[2];

  if (action === "inc") {
    await contract.methods.increment().send({ from: user });
    console.log("➕ Incremented");
  }

  if (action === "dec") {
    await contract.methods.decrement().send({ from: user });
    console.log("➖ Decremented");
  }

  if (action === "get") {
    const count = await contract.methods.count().call();
    console.log("📊 Count:", count);
  }
}
    
main();