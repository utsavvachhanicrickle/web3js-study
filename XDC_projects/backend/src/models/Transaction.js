import mongoose from "mongoose";

const transactionSchema =
  new mongoose.Schema(
    {
      walletAddress: {
        type: String,
        required: true
      },

      txHash: {
        type: String,
        required: true,
        unique: true
      },

      amount: {
        type: String,
        required: true
      },

      gasUsed: {
        type: String
      },

      gasPrice: {
        type: String
      },

      gasFee: {
        type: String
      },

      blockNumber: {
        type: Number
      },

      status: {
        type: String,
        default: "pending"
      },

      network: {
        type: String,
        default: "XDC Apothem"
      },

      chainId: {
        type: Number,
        default: 51
      },

      receipt: {
        type: Object
      }
    },
    {
      timestamps: true
    }
  );

const Transaction = mongoose.model(
  "Transaction",
  transactionSchema
);

export default Transaction;