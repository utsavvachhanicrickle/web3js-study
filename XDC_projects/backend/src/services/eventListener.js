import web3 from "../config/web3.js";

import Transaction from "../models/Transaction.js";



const startBlockListener = async () => {

  console.log(
    "Blockchain Listener Started..."
  );

  let latestBlock =
    await web3.eth.getBlockNumber();

  setInterval(async () => {

    try {

      const currentBlock =
        await web3.eth.getBlockNumber();

      // new block found
      if (currentBlock > latestBlock) {

        console.log(
          `New Block: ${currentBlock}`
        );

        // get full block
        const block =
          await web3.eth.getBlock(
            currentBlock,
            true
          );

        // all transactions
        const transactions =
          block.transactions;

        for (const tx of transactions) {

          // skip empty tx
          if (!tx.to) continue;

          console.log(
            "Transaction:",
            tx.hash
          );

          // optional admin wallet filter
          // if (
          //   tx.to.toLowerCase() ===
          //   process.env.ADMIN_WALLET.toLowerCase()
          // )

          // check existing tx
          const exists =
            await Transaction.findOne({
              txHash: tx.hash
            });

          if (!exists) {

            await Transaction.create({

              walletAddress:
                tx.from,

              txHash:
                tx.hash,

              amount:
                tx.value.toString(),

              gasPrice:
                tx.gasPrice.toString(),

              status:
                "detected",

              blockNumber:
                Number(tx.blockNumber)
            });

            console.log(
              "Transaction Saved"
            );
          }
        }

        latestBlock = currentBlock;
      }

    } catch (error) {

      console.log(
        "Listener Error:",
        error.message
      );
    }

  }, 5000);
};

export default startBlockListener;

