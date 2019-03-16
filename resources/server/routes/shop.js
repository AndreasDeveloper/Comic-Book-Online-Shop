// - Setting Up Dependencies - \\
const express = require('express'),
      router = express.Router();
// - Importing other files - \\
const Comicbook = require('../models/Comicbooks');

// - Shop Page - \\
router.get('/shop', (req, res) => {
    // Get data from DB
    Comicbook.find({}, (err, allComicbooks) => {
        if (!err) {
            // Render Data
            res.render((`${__dirname}/../../../dist/html/shop/index.ejs`), {comicbooks: allComicbooks});
        } else {
            throw new Error(err);
        }
    })
});

// Exporting Campgrounds Router
module.exports = router;