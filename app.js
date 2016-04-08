var express = require('express');
var app = express();
var mongoose = require('mongoose');
// connect to database
var db = mongoose.connect('mongodb://localhost:27017/bookAPI');
var Book = require('./models/bookModel');
var port = process.env.PORT || 3000;
var adminRouter = require('./routes/adminRoutes')();
var bookRouter = express.Router();

bookRouter.route('/Books')
    .get(function(req, res) {
        Book.find(function(err, books) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        });
    });

app.use('/api', bookRouter);
app.use('/Admin', adminRouter);

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(port, function() {
    console.log('Running on Port: ' + port);
});