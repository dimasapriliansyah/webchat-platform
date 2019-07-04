const express = require("express");
const session = require("express-session");
const redis = require("redis");

// Import error libraries
// const { errorResponse } = require("./libs/error");

// Import db libraries
const knex = require("./libs/database/connection");

// Setup redis client.
const redisClient = redis.createClient();

redisClient.on("error", err => {
  console.log("Redis error ", err);
});

// Setup session-store to using redis.
const redisStore = require("connect-redis")(session);

// Setup express.
const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

// Configure session and register redisStore to session.
app.use(
  session({
    secret: "VC8g&at(1hc_9zx9U2a)192",
    name: "_8sasy0hdasd7",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    store: new redisStore({
      host: "localhost",
      port: 6379,
      client: redisClient,
      ttl: 60 // How many session expires in seconds.
    })
  })
);

// Configure static route to "/static/".
app.use("/static", express.static("dist"));

app.get("/", (req, res) => {
  res.render("index", { title: "Hey", message: "Hello there!" });
});

app.get("/myname", (req, res) => {
  const username = req.session.username || "Guest";
  res.send(username);
});

app.get("/:username", async (req, res) => {
  const username = req.params.username;
  req.session.username = username;
  knex("users")
    .insert({ username })
    .then(row => {
      console.log("row ", row);

      res.send(username);
    });
});

// HTTP
const http = require("http").createServer(app);

// // SETUP WEBSOCKET
const livechat = require("./service/livechat/sockets/index");
livechat.listen(http);

// SERVER LISTENING
http.listen(3000, () => console.log("Server Running at http://localhost:3000"));
