const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use('/static', express.static('public'))

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
