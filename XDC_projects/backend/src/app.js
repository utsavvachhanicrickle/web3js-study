import express from "express";
import cors from "cors";

import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

  res.json({
    message: "Web3 Payment Backend Running"
  });
});

app.use(
  "/api/payments",
  paymentRoutes
);

export default app;