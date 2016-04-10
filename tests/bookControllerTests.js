var should = require('should');
var sinon = require('sinon');

describe('Book Controller Tests:', function() {
   describe('POST', function() {
       it('should not allow an empty title on POST', function() {
           var Book = function(book) {
               // for this test, 'save' doesn't have to work (empty function)
               this.save = function() {};
           };
           var req = {
               body: {
                   author: 'Tom Doe'
               }
           };
           var res = {
               // a sinon spy checks what has been called, what has it been called with,  how often etc.
               status: sinon.spy(),
               send: sinon.spy()
           };
           // pass the Mock Book from above into the bookController
           var bookController = require('../controllers/bookController')(Book);
           // execute a post on the bookController
           bookController.post(req, res);

           // args is an array, the first [0] represents the first time the function has been called, the second [0] is the corresponding first argument
           // if not true, 'Bad status' with Status Code will be shown
           res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0] [0]);

           res.send.calledWith('Title is required').should.equal(true);
       });
   });
});