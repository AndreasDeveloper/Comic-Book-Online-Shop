// - Setting Up Dependencies - \\
const express = require('express'),
      router = express.Router();
// - Importing MVC files - \\
const Comicbook = require('../models/Comicbooks');
// - Importing Middleware - \\
const authMiddleware = require('../middlewares/authMiddleware');
// - Importing Other JS Files - \\
const escapeRegex = require('../../js/utilities/regex-escape');


// GET - Shop Index Page | - Displaying shopping index page - \\
router.get('/shop', (req, res) => {
    // Declaring variable
    let noMatch = '';
    if (req.query.search) {
        // Declaring query based/search variables
        const searchQuery = req.query.search,
                            userBody = req.user,
                            regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Comicbook.find({name: regex}, (err, foundComicbook) => { // Finds demanded item
            Comicbook.count({name: regex}, (err, numOfComicbooks) => { // Counts how many items were found in given query
                if (!err) {
                    if (foundComicbook.length < 1) {
                        noMatch = 'No results found.';
                    }
                    res.render((`${__dirname}/../../../dist/html/shop/shop-item.ejs`), {comicbooks: foundComicbook, currentUser: userBody, noMatch: noMatch, searchVal: searchQuery, numOfResults: numOfComicbooks });
                } else {
                    throw new Error(err);
                }
            });
        });
    } else {
        // Declaring variable
        const userBody = req.user;
        // Get data from DB
        Comicbook.find({}, (err, allComicbooks) => {
            if (!err) {
                // Render Data
                res.render((`${__dirname}/../../../dist/html/shop/index.ejs`), {comicbooks: allComicbooks, currentUser: userBody, noMatch: noMatch});
            } else {
                throw new Error(err);
            }
        });
    }
});

// Exporting Shop Router
module.exports = router;