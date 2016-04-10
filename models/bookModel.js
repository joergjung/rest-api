var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bookModel = new Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    genre: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    }
});

// 'Book' is the name of the model.
// Mongoose automatically looks for the plural version of the model name and connects it with the collection (with that name - in this case 'books') in the Database
module.exports = mongoose.model('Book', bookModel);
