var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// connect to database
var db = mongoose.connect('mongodb://localhost:27017/bookAPI');
var Book = require('./models/bookModel');
var port = process.env.PORT || 3000;
var adminRouter = require('./routes/adminRoutes')();
var bookRouter = express.Router();

// configure bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

bookRouter.route('/Books')
    .post(function(req, res) {
        var book = new Book(req.body);
        // save to database
        book.save();
        res.status(201).send(book);
    })

    .get(function(req, res) {     
        // req.query returns a JSON object which contains the query parameters
        // for example with http://localhost:8000/api/Books?author=Victor Hugo
        // req.query will return this JSON object: { author: 'Victor Hugo' }
        // adding it as a parameter into Book.find will filter automatically
        var query = {};

        // aviod random user queries and allow only filtering by genre
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, function(err, books) {            
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        });
    });

bookRouter.route('/Books/:bookId')
    .get(function(req, res) {
        Book.findById(req.params.bookId, function(err, book) {            
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(book);
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
