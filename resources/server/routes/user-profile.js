// - Setting Up Dependencies - \\
const express = require('express'),
      router = express.Router();
const path = require('path');
// - Importing Models - \\
const User = require('../models/User');
// - Importing Middlewares - \\
const authMiddleware = require('../middlewares/authMiddleware');

// - User Profile - \\
router.get('/user-profile/:username', authMiddleware.isLoggedIn, (req, res) => {
    const userUrl = req.user._id;
    User.findById(userUrl, (err, user) => {
        if (!err) {
            res.render(`${__dirname}/../../../dist/html/user-profile/user-profile.ejs`, { user: user });
        } else {   
            throw new Error(err);
        }
    });
});

// Exporting User Profiles Router
module.exports = router;