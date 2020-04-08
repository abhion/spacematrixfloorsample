var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'spacematrixdb'
  });

  connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected with mysql database...')
  })

var server = app.listen(3000, "127.0.0.1", function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("Example app listening at http://%s:%s", host, port)
 
})
app.post('/saveEnergyMeterValToDb', function (req, res) {
    var params  = req.body;
    console.log(params);
    connection.query(`INSERT INTO energymetertbl(type, value, insert_date) values ?`, params, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });