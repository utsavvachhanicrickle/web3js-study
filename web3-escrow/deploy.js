import { Web3 } from "web3";
import fs from "fs";

const web3 = new Web3("http://127.0.0.1:8545");

const abi = JSON.parse(fs.readFileSync("abi.json"));
const bytecode = fs.readFileSync("bytecode.bin", "utf8");

const contract = new web3.eth.Contract(abi);

async function deploy() {
  const accounts = await web3.eth.getAccounts();

  const instance = await contract
    .deploy({
      data: "0x" + bytecode,
    })
    .send({
      from: accounts[0],
      gas: Web3.utils.toWei("1", "ether"),
    });

  fs.writeFileSync("address.txt", instance.options.address);

  console.log("✅ Deployed:", instance.options.address);
}

deploy();
