
var express = require('express');
var bodyParser =require('body-parser');
var path = require('path');

var app = express();
app.use("/", express.static(__dirname + "/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res) {
       res.sendFile(__dirname+'/');      
});

var port =8001 ;
app.listen(port, function() {
    console.log('Server running on port: %d', port);
});
