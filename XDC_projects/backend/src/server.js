import dotenv from "dotenv";

dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";

import connectDB from "./config/db.js";

import {
  initSocket
} from "./config/socket.js";

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

initSocket(io);

io.on("connection", (socket) => {

  console.log(
    `Socket Connected: ${socket.id}`
  );

  socket.on("disconnect", () => {

    console.log(
      `Socket Disconnected: ${socket.id}`
    );
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(
    `Server Running On Port ${PORT}`
  );
});