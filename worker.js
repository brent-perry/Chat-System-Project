const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const { initServer } = require('./util/socketservermain');

initServer(server);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname + '/css')));
app.use(express.static(path.join(__dirname + '/client')));

app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res){
  res.render('dashboard');
});

console.log('server listening on port 3000');
server.listen(3000);
