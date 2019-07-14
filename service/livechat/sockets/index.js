const redis = require("socket.io-redis");
const io = require("socket.io");

const livechat = {
  listen(server, sessionMiddleware) {
    // Attach websockets to server instance.
    livechatService = io(server);
    // Setup adapter using redis.
    livechatService.adapter(redis({ host: "localhost", port: 6379 }));
    livechatService.use((socket, next) => {
      sessionMiddleware(socket.request, socket.request.res, next);
    });
    livechatService.on("connection", socket => {
      console.log("user connected");
    });
  }
};

module.exports = livechat;
