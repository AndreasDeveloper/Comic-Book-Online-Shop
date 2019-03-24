// - Setting Up Dependencies - \\
const express = require('express'),
      router = express.Router();
const path = require('path');

// - User Profile - \\
router.get('/user-profile', (req, res) => {
    res.render(path.resolve(`${__dirname}/../../../dist/html/user-profile/user-profile.ejs`));
});

// Exporting User Profiles Router
module.exports = router;