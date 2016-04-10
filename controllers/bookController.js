var bookController = function(Book) {

    var post = function(req, res) {
        var book = new Book(req.body);

        if (!req.body.title) {
            // send 'Bad Request' Status Code
            res.status(400);
            res.send('Title is required');
        } else {
            // save to database
            book.save();
            // send 'Created' Status code (a new resource has been created)
            res.status(201);
            res.send(book);
        }
    };

    var get = function(req, res) {     
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
    };

    return {
        post: post,
        get: get
    };
};

module.exports = bookController;