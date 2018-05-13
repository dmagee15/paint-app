// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var mysql      = require('mysql');
require('dotenv').load();

// Get our API routes
//const api = require('./server/routes/api');

const app = express();

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

// var connection = mysql.createConnection({
//   host     : process.env.DBURL,
//   user     : process.env.DBUSER,
//   password : process.env.DBPASS,
//   database : process.env.DBNAME,
//   port: 52077
// });
// connection.connect(function(err){
//   if(!err) {
//       console.log("Database is connected ... nn");    
//   } else {
//       console.log("Error connecting database ... nn");    
//   }
//   });

var Image = require('./models/image.js');
// Image.find({}).remove().exec();

// Parsers for POST data
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// app.post('/submit', (req, res)=>{
//   var urlid = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toLowerCase();
//   connection.query("INSERT INTO images (url, image) VALUES ('"+urlid+"', '"+req.body.content.toString()+"')", function(err, rows) {
//     var sendData = process.env.APP_URL+"/"+urlid;
//       if (!err){
//         res.send(sendData);
//       }
//       else
//         res.send("not successful");
//       });
// });

// app.post('/image', (req, res) => {
//   connection.query("SELECT image FROM images WHERE url='"+req.body.id+"'", function(err, result) {
//     var sendData = {
//       data: result[0].image
//     }
//       if (!err){
//         res.send(sendData);
//       }
//       else
//         res.send("not successful");
//       });
// });

app.post('/submit', (req, res) => {
  var newImage = new Image({
    id: (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toLowerCase(),
    data: req.body.content.toString()
  });
  newImage.save();
  sendData = {
    id: newImage.id,
    url: process.env.APP_URL
  }
  //heroku requires removal of APP_URL variable
  res.send(sendData);
});

app.post('/image', (req, res) => {
  Image.findOne({id: req.body.id}, function(err, image){
    if(err) throw err;
    if(image){
      res.send(image);
    }
    else{
      res.send("fail");
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
server.listen(port);