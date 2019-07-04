const redis = require("socket.io-redis");
const io = require("socket.io");

const livechat = {
  listen(server) {
    livechatService = io(server);
    livechatService.adapter(redis({ host: "localhost", port: 6379 }));
    livechatService.on("connection", socket => {
      console.log("user connected");
      // this.testHandler(socket);
    });
  }
};

module.exports = livechat;
