const express = require("express");
const bare = createBareServer("/bare/");
const app = express();

app.listen(8080, () => {
  console.log("Application started and Listening on port 3000");
});

// serve your css as static
app.use(express.static(__dirname+"/public/"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/index.html", (req, res) => {
  res.redirect('/');
});
app.get("/games", (req, res) => {
  res.sendFile(__dirname + "/games.html");
});
app.get("/games.html", (req, res) => {
  res.redirect('/games');
});
app.get("/proxies", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
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

const server = createServer();

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