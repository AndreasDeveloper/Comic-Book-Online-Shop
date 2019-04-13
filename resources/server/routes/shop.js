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
router.get('/shop', async (req, res) => {
    // Declaring variable
    let noMatch = null;
    try {
        if (req.query.search) {
            // Declaring query based/search variables
            const searchQuery = req.query.search,
                                userBody = req.user,
                                regex = new RegExp(escapeRegex(req.query.search), 'gi');
            // Finds demanded item
            const foundComicbook = await Comicbook.find({name: regex});
            // Counts how many items were found in given query
            const numOfComicbooks = await Comicbook.count({name: regex});
            // If comicbook was not found
            if (foundComicbook.length < 1) {
                noMatch = 'No results found.';
            }
            res.render((`${__dirname}/../../../dist/html/shop/shop-item.ejs`), {comicbooks: foundComicbook, currentUser: userBody, noMatch: noMatch, searchVal: searchQuery, numOfResults: numOfComicbooks });
        } else {
            // Declaring variable
            const userBody = req.user;
            // Get data from DB
            const allComicbooks = await Comicbook.find({});
            res.render((`${__dirname}/../../../dist/html/shop/index.ejs`), {comicbooks: allComicbooks, currentUser: userBody, noMatch: noMatch });
        }
    } catch (err) {
        throw new Error(err);
    }
});

// Exporting Shop Router
module.exports = router;