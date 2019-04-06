// - Setting Up Dependencies - \\
const express = require('express'),
      router = express.Router();
const path = require('path');
// - Importing Middlewares - \\
const authMiddleware = require('../middlewares/authMiddleware');

// - User Profile - \\
router.get('/user-profile/:username', authMiddleware.isLoggedIn, (req, res) => {
    res.render(`${__dirname}/../../../dist/html/user-profile/user-profile.ejs`);
});

// Exporting User Profiles Router
module.exports = router;