var should = require('should');
var request = require('supertest');
var app = require('../app.js');
var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var agent = request.agent(app);

describe('Book CRUD Test', function() {
    it('Should allow a book to be posted and return a read and _id', function(done) {
        var bookPost = {title: 'new Book', author: 'Horace Peterson', genre: 'Fiction'};
        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end(function(err, results) {
                // in DB, default property for the key 'read' is false (see bookModel.js)
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                // tell supertest, we're done (move on to the next instructions)
                done();
            });
    });

    afterEach(function(done) {
        Book.remove().exec();
        done();
    });
});
