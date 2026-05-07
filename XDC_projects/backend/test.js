import Web3 from "web3";

const web3 = new Web3(
  "https://erpc.apothem.network"
);

const txHash =
  "0xe17fc962b734c81c2e56c9d2cbe37d5277d0bdb849d60a0c616d79ab8057602d";

async function test() {

  try {

    const tx =
      await web3.eth.getTransaction(
        txHash
      );

    console.log(tx);

  } catch (error) {

    console.log(error);
  }
}

test();