var express = require('express');
var bookRouter = express.Router();
var Book = require('../models/bookModel');
var bookController = require('../controllers/bookController')(Book);

var routes = function() {
    bookRouter.route('/')

        // use the Controller
        .post(bookController.post)
        .get(bookController.get);

    // define Middleware for findById 
    bookRouter.use('/:bookId', function(req, res, next) {
        Book.findById(req.params.bookId, function(err, book) {            
            if (err) {
                res.status(500).send(err);
            } else if (book) {
                // req.book will be available in the /:bookId routes below
                req.book = book;
                next();
            } else {
                res.status(404).send('no book found');
            }
        });
    });

    bookRouter.route('/:bookId')
        .get(function(req, res) {
            res.json(req.book);
        })

        .put(function(req, res) {
            req.book.title = req.body.title;
            req.book.genre = req.body.genre;
            req.book.author = req.body.author;
            req.book.read = req.body.read;
            req.book.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            });
        })

        .patch(function(req, res) {
            // don't update the id - if there is one in req.body, delete it before patch
            if (req.body._id) {
                delete req.body._id;
            }
            for (var p in req.body) {
                req.book[p] = req.body[p];
            }

            req.book.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            });
        })

        .delete(function(req, res) {
            req.book.remove(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    // 204 = No Content
                    res.status(204).send('Removed');
                }
            });
        });

    return bookRouter;
};
module.exports = routes;
