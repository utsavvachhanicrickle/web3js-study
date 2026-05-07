import Web3 from "web3";

const web3 = new Web3(
  "https://erpc.apothem.network"
);

const txHash =
  "0xca3a5ca9614f1023e9b015dc28706724fcd2e76ecd06c0746c4a1693b480b5b5";

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