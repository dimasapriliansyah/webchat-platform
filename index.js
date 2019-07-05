const express = require("express");
const session = require("express-session");
const helmet = require("helmet");

// Route definitions.
const domainFilterRoute = require("./service/livechat/routes/domainFilter");

// Import redis connection.
const redisClient = require("./libs/redis/connection");

// Setup session-store to using redis.
const redisStore = require("connect-redis")(session);

// Setup express.
const app = express();

// Setup helmet to help secure the express app by setting various http header.
app.use(
    helmet({
        frameguard: false
    })
);

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

app.use(domainFilterRoute);

// HTTP
const http = require("http").createServer(app);

// // SETUP WEBSOCKET
const livechat = require("./service/livechat/sockets/index");
livechat.listen(http);

// SERVER LISTENING
http.listen(3000, () => console.log("Server Running at http://localhost:3000"));