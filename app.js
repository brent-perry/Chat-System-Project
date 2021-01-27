const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const {initServer} = require('./util/socketservermain');

initServer(server);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname + '/css')));
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res){
    res.render('home');
});

app.get('/welcome', function(req, res){
    res.render('welcome');
})
app.get('/register', function(req, res){
  res.render('register');
});

app.get('/Dashboard', function(req, res){
    res.render('Dashboard');
  });



server.listen(3000);
