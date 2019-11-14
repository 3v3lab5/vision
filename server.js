var express = require('express');
const compression = require('compression');
var app = express(); 
const path = require('path');
var rootPath = path.normalize(__dirname + '/dist/vision');
var port = process.env.PORT || 8080; 
app.use(express.static(rootPath)); 
app.use(compression());
app.get('*', (req, res) => {
  res.sendFile(rootPath + '/index.html');
});
app.listen(port);
console.log("App listening on port " + port);