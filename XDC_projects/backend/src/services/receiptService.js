
export const serializeBigInt = (
  data
) => {

  return JSON.parse(
    JSON.stringify(
      data,
      (key, value) =>
        typeof value === "bigint"
          ? value.toString()
          : value
    )
  );
};



export const calculateGasFee = (
  gasUsed,
  gasPrice
) => {

  return (
    BigInt(gasUsed) *
    BigInt(gasPrice)
  ).toString();
};



export const formatReceipt = (
  transaction,
  receipt
) => {

  return {

    walletAddress:
      transaction.from,

    txHash:
      transaction.hash,

    amount:
      transaction.value.toString(),

    gasUsed:
      receipt.gasUsed.toString(),

    gasPrice:
      transaction.gasPrice.toString(),

    gasFee:
      calculateGasFee(
        receipt.gasUsed,
        transaction.gasPrice
      ),

    blockNumber:
      Number(receipt.blockNumber),

    status:
      receipt.status
        ? "success"
        : "failed",

    receipt:
      serializeBigInt(receipt)
  };
};