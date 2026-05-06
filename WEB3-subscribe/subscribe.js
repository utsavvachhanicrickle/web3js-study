import { Web3 } from "web3";
import fs from "fs";

// ⚠️ WebSocket REQUIRED
const web3 = new Web3("ws://127.0.0.1:8545");

const abi = JSON.parse(fs.readFileSync("abi.json"));
const address = fs.readFileSync("address.txt", "utf8");

const contract = new web3.eth.Contract(abi, address);

async function listen() {
  console.log("👂 Listening to counter updates...\n");

  const sub = contract.events.CountUpdated();

  sub.on("data", (event) => {
    console.log("🔥 Event Fired:");
    console.log("User:", event.returnValues.user);
    console.log("New Count:", event.returnValues.newCount);
    console.log("----------------------");
  });

  sub.on("error", console.error);
}

listen();