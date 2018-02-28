var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

var todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(res, res){
    res.sendFile('index.html');
});

app.use('/api/todos', todoRoutes);

app.listen(port, function(){
    console.log('App is running on port 3000');
});