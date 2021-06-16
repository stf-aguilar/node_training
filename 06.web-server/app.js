const express = require('express')
const hbs = require('hbs');

const app = express()
const port = 3003;

//Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

//Servir contenido estático
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('home');
})
 
app.get('/generic', (req, res) => {
    res.render('generic');
})

app.get('/elements', (req, res) => {
    res.render('elements');
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html');
})

app.listen(port)