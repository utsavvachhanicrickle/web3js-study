import express from "express";

import {
  verifyTransaction,
  getAllTransactions
} from "../controllers/paymentController.js";

const router = express.Router();

router.post(
  "/verify",
  verifyTransaction
);

router.get(
  "/",
  getAllTransactions
);

export default router;