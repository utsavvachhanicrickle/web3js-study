let io;

export const initSocket = (serverIO) => {

  io = serverIO;

  return io;
};

export const getIO = () => {

  if (!io) {

    throw new Error(
      "Socket.IO not initialized"
    );
  }

  return io;
};