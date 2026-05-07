import Transaction from "../models/Transaction.js";

import {
  getTransaction,
  getTransactionReceipt,
} from "../services/blockchainService.js";

import { getIO } from "../config/socket.js";

export const verifyTransaction = async (req, res) => {
  try {
    const { txHash } = req.body;

    // validate
    if (!txHash) {
      return res.status(400).json({
        success: false,

        message: "Transaction hash required",
      });
    }

    console.log("Checking TX:", txHash);

    // existing transaction
    const existingTransaction = await Transaction.findOne({
      txHash,
    });

    if (existingTransaction) {
      return res.json({
        success: true,

        transaction: existingTransaction,
      });
    }

    // =========================
    // TRANSACTION RETRY
    // =========================

    let transaction = null;

    let retryTx = 0;

    while (!transaction && retryTx < 15) {
      try {
        console.log(`Checking Transaction ${retryTx + 1}`);

        transaction = await getTransaction(txHash);

        if (transaction) {
          console.log("Transaction Found");

          break;
        }
      } catch (error) {
        console.log("Transaction Pending...");
      }

      retryTx++;

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    // still missing
    if (!transaction) {
      return res.status(404).json({
        success: false,

        message: "Transaction still pending",
      });
    }

    // =========================
    // RECEIPT RETRY
    // =========================

    let receipt = null;

    let retryReceipt = 0;

    while (!receipt && retryReceipt < 15) {
      try {
        console.log(`Checking Receipt ${retryReceipt + 1}`);

        receipt = await getTransactionReceipt(txHash);

        if (receipt) {
          console.log("Receipt Found");

          break;
        }
      } catch (error) {
        console.log("Receipt Pending...");
      }

      retryReceipt++;

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    // still pending
    if (!receipt) {
      return res.status(404).json({
        success: false,

        message: "Transaction receipt pending",
      });
    }

    // =========================
    // GAS CALCULATIONS
    // =========================

    const gasUsed = receipt.gasUsed.toString();

    const gasPrice = transaction.gasPrice.toString();

    const gasFee = (BigInt(gasUsed) * BigInt(gasPrice)).toString();

    // =========================
    // SERIALIZE BIGINT
    // =========================

    const serializedReceipt = JSON.parse(
      JSON.stringify(receipt, (key, value) =>
        typeof value === "bigint" ? value.toString() : value,
      ),
    );

    // =========================
    // SAVE DATABASE
    // =========================

    const newTransaction = await Transaction.create({
      walletAddress: transaction.from,

      txHash,

      amount: transaction.value.toString(),

      gasUsed,

      gasPrice,

      gasFee,

      blockNumber: Number(receipt.blockNumber),

      status: receipt.status ? "success" : "failed",

      receipt: serializedReceipt,
    });

    console.log("Saved To MongoDB");

    // =========================
    // SOCKET EMIT
    // =========================

    const io = getIO();

    io.emit("payment-success", newTransaction);

    return res.status(201).json({
      success: true,

      transaction: newTransaction,
    });
  } catch (error) {
    console.log("VERIFY ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });

    return res.json({
      success: true,

      transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
