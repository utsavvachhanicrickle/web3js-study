import Web3 from "web3";
import fs from "fs";

const web3 = new Web3(
  "https://ethereum-rpc.publicnode.com"
);

async function testRPC() {

  try {

    const chainId =
      await web3.eth.getChainId();

    const blockNumber =
      await web3.eth.getBlockNumber();

    const latestBlock =
      await web3.eth.getBlock("latest");

    const data = {
      time: new Date().toISOString(),
      chainId,
      blockNumber,
      latestBlock
    };

    // write json file
    fs.writeFileSync(
      "rpc-log.json",
      JSON.stringify(data, null, 2)
    );

    console.log("JSON file created");

  } catch (error) {

    console.error(error);
  }
}

testRPC();