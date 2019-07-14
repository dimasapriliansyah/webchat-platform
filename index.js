// Dependencies.
require('dotenv').config();
const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const fs = require("fs");
const rfs = require('rotating-file-stream');
const path = require('path');
const https = require("https");
const morgan = require('morgan')

// Routes.
const refererFilterRoute = require("./service/livechat/routes/RefererFilter");
const customerRoute = require("./service/livechat/routes/Customer");

// Redis connection.
const redisClient = require("./connection/redis");

// Setup http logger
// create a rotating write stream
const accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'logs', 'http')
})

// Session store using redis.
const redisStore = require("connect-redis")(session);

// Setup express.
const app = express();

// Setup helmet to secure app.
app.use(
  helmet({
    frameguard: false
  })
);

// Body parser to read json format.
app.use(express.json());

// Setup session.
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  name: process.env.SESSION_NAME,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
  store: new redisStore({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    client: redisClient,
    ttl: 60 // How many session expires in seconds.
  })
})

// Register Logger
app.use(morgan('combined', { stream: accessLogStream }))

// Register Session
app.use(
  sessionMiddleware
);

// Register webchat plugin route.
app.use("/plugin/webchat", refererFilterRoute);

// Register static assets.
app.use("plugin/client/statics", express.static('client'));

// Register customer routes.
app.use("/customers", customerRoute)

// Register not found routes.
app.use((req, res, next) => {
  res.send("Not found")
})

// Setup https
const privateKey = fs.readFileSync(
  process.env.HTTPS_PRIVATE_KEY,
  "utf8"
);
const certificate = fs.readFileSync(
  process.env.HTTPS_CERT,
  "utf8"
);
const bundle = fs.readFileSync(
  process.env.HTTPS_BUNDLE,
  "utf8"
);

const credentials = { key: privateKey, cert: certificate, ca: bundle };
const httpsServer = https.createServer(credentials, app);

// Setup websocket.
const livechat = require("./service/livechat/sockets/index");
livechat.listen(httpsServer, sessionMiddleware);

// SERVER LISTENING
httpsServer.listen(parseInt(process.env.APP_PORT), "0.0.0.0", function () {
  console.log("listening https://lcomni4.infomedia.co.id");
});