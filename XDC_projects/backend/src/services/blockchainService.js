import web3 from "../config/web3.js";

export const getTransactionReceipt = async (
  txHash
) => {

  const receipt =
    await web3.eth.getTransactionReceipt(
      txHash
    );

  return receipt;
};

export const getTransaction = async (
  txHash
) => {

  const transaction =
    await web3.eth.getTransaction(
      txHash
    );

  return transaction;
};