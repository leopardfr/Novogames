import { createServer } from "node:http";
import createBareServer from "@tomphttp/bare-server-node";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";

const bare = createBareServer("/bare/");
const app = express();

app.use(express.static(publicPath));
app.use("/uv/", express.static(uvPath));
app.use("/static/", "public");

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

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/index.html', function(req, res) {
    res.redirect('/');
});
app.get('/bot', function(req, res) {
    res.sendFile(path.join(__dirname, '/bot.html'));
});
app.get('/bot.html', function(req, res) {
    res.redirect('/bot');
});
app.get('/discord', function(req, res) {
    res.sendFile(path.join(__dirname, '/discord.html'));
});
app.get('/discord.html', function(req, res) {
    res.redirect('/discord');
});
app.get('/games', function(req, res) {
    res.sendFile(path.join(__dirname, '/games.html'));
});
app.get('/games.html', function(req, res) {
    res.redirect('/games');
});
app.get('/proxies', function(req, res) {
    res.sendFile(path.join(__dirname, '/uv/index.html'));
});
app.get('/proxies.html', function(req, res) {
    res.redirect('/proxies');
});
app.get('/register-sw.js', function(req, res) {
    res.sendFile(path.join(__dirname, '/uv/register-sw.js'));
});



app.listen(port);
console.log('Server started at http://localhost:' + port);
