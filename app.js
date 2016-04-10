var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var db;
// we have a separate DB for Tests
if (process.env.ENV === 'Test') {
    db = mongoose.connect('mongodb://localhost:27017/bookAPI_test');
} else {
    db = mongoose.connect('mongodb://localhost:27017/bookAPI');
}
var port = process.env.PORT || 3000;
var adminRouter = require('./routes/adminRoutes')();
var bookRouter = require('./routes/bookRoutes')();

// configure bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/books', bookRouter);
//app.use('/api/authors', authorRouter);
app.use('/Admin', adminRouter);

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(port, function() {
    console.log('Running on Port: ' + port);
});

// this allows supertest to execute on the app
module.exports = app;
