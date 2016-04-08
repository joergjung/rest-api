var express = require('express');
var bookRouter = express.Router();
var Book = require('../models/bookModel');

var routes = function() {
    bookRouter.route('/')
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

    bookRouter.route('/:bookId')
        .get(function(req, res) {
            Book.findById(req.params.bookId, function(err, book) {            
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(book);
                }
            });
        });
    return bookRouter;
};

module.exports = routes;
