const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");
const { mongodbUrl } = require("./Config/db");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const listConnecteds = {};
io.on("connection", socket => {
  const { user } = socket.handshake.query;
  listConnecteds[user] = socket.id;
  console.log(user, socket.id);
});

mongoose.connect(mongodbUrl, { useNewUrlParser: true });

app.use((req, res, next) => {
  req.io = io;
  req.listConnecteds = listConnecteds;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
