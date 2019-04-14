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
        // Declaring variable
        const userBody = req.user;
        res.render((`${__dirname}/../../../dist/html/shop/index.ejs`), {currentUser: userBody, noMatch: noMatch });
    } catch (err) {
        throw new Error(err);
    }
});

// GET - Shop Product Page | - Displaying demanded product page with page numbers
router.get('/shop/:page', async (req, res, next) => {
// Declaring variable
const resPerPage = 9;
const page = req.params.page || 1;
let noMatch = null;
    try {
        if (req.query.search) {
            // Declaring query based/search variables
            const searchQuery = req.query.search,
                                regex = new RegExp(escapeRegex(req.query.search), 'gi');
            // Find Demanded Comicbooks | Skipping page values, limit results per page
            const foundComicbook = await Comicbook.find({name: regex}).skip((resPerPage * page) - resPerPage).limit(resPerPage);
            // Count how many comicbooks were found
            const numOfComicbooks = await Comicbook.count({name: regex});
            if (foundComicbook.length < 1) { // If demanded comicbooks were not found
                noMatch = 'No results found.';
            }
            // Renders The Page
            res.render((`${__dirname}/../../../dist/html/shop/shop-item.ejs`), {comicbooks: foundComicbook, currentPage: page, pages: Math.ceil(numOfComicbooks / resPerPage), searchVal: searchQuery, numOfResults: numOfComicbooks, noMatch: noMatch});
        }
    } catch (err) {
        throw new Error(err);
    }
});

// Exporting Shop Router
module.exports = router;