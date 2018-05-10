// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').load();

// Get our API routes
//const api = require('./server/routes/api');

const app = express();

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

var Image = require('./models/image.js');
Image.find({}).remove().exec();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


app.post('/submit', (req, res) => {
  var newImage = new Image({
    id: (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toLowerCase(),
    data: req.body.content.toString()
  });
  newImage.save();
  res.send(newImage.id);
});

app.post('/image', (req, res) => {
  Image.findOne({id: req.body.id}, function(err, image){
    if(err) throw err;
    if(image){
      res.send(image);
    }
    else{
      res.send({});
    }
  });
});

// Catch all other routes and return the index file

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));