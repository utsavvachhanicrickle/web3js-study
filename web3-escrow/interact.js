import { Web3 } from "web3";
import fs from "fs";

const web3 = new Web3("http://127.0.0.1:8545");

const abi = JSON.parse(fs.readFileSync("abi.json"));
const address = fs.readFileSync("address.txt", "utf8");

const contract = new web3.eth.Contract(abi, address);

async function main() {
  const accounts = await web3.eth.getAccounts();

  const client = accounts[0];
  const freelancer = accounts[1];

  const action = process.argv[2];

  if (action === "create") {
    await contract.methods.createJob().send({
      from: client,
      value: web3.utils.toWei("1", "ether"),
    });
    console.log("✅ Job created");
  }

  if (action === "accept") {
    await contract.methods.acceptJob(1).send({
      from: freelancer,
    });
    console.log("✅ Job accepted");
  }

  if (action === "submit") {
    await contract.methods.submitWork(1).send({
      from: freelancer,
    });
    console.log("✅ Work submitted");
  }

  if (action === "approve") {
    await contract.methods.approvePayment(1).send({
      from: client,
    });
    console.log("✅ Payment released");
  }
}

main();