// - Setting Up Dependencies - \\
const express = require('express'),
      router = express.Router();
// - Importing other files - \\
const Comicbook = require('../models/Comicbooks');

router.get('/comicbooks_data_api', (req, res) => {
    Comicbook.find({}, (err, allComicbooks) => {
        if (!err) {
            res.json({data: allComicbooks});
        } else {
            throw new Error(err);
        }
    });
});

// Exporting Campgrounds Router
module.exports = router;