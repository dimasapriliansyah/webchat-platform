const socket = io();

socket.on("test", message => {
  console.log(message);
});
