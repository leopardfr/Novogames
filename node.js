const http = require('http');
const createBareServer = require("@tomphttp/bare-server-node");
const server = http.createServer();
const express = require("express");
const bare = createBareServer("/bare/");
const app = express();

// serve your css as static
app.use(express.static(__dirname+"/public/"));


server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.listen({
  port: 8080,
});


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/index.html", (req, res) => {
  res.redirect('/');
});
app.get("/games", (req, res) => {
  res.sendFile(__dirname + "/public/games.html");
});
app.get("/games.html", (req, res) => {
  res.redirect('/games');
});
app.get("/proxies", (req, res) => {
  res.sendFile(__dirname + "/public/proxy.html");
});
app.get("/proxies.html", (req, res) => {
  res.redirect('/proxies');
});
app.get("/bot", (req, res) => {
  res.sendFile(__dirname + "/bot.html");
});
app.get("/bot.html", (req, res) => {
  res.redirect('/bot');
});
app.get("/discord", (req, res) => {
  res.sendFile(__dirname + "/discord.html");
});
app.get("/discord.html", (req, res) => {
  res.redirect('/discord');
});