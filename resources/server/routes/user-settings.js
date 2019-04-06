// - Setting Up Dependencies - \\
const express = require('express'),
      router = express.Router(),
      path = require('path');
// - Importing Models - \\
const User = require('../models/User');
// - Importing Middlewares - \\
const authMiddleware = require('../middlewares/authMiddleware');

// GET - Settings Index Page | - Displaying index page for user profile settings - \\
router.get('/settings/:username', authMiddleware.isLoggedIn, (req, res) => {
    const userID = req.user._id;
    User.findById(userID, (err, user) => {
        if (!err) {
            res.render(`${__dirname}/../../../dist/html/user-profile/settings.ejs`, { user: user });
        } else {
            throw new Error(err);
        }
    });
});

// PUT - Updating User Data | - Updates user data - \\
router.put('/user-profile/:username', authMiddleware.isLoggedIn, (req, res) => {
    const userID = req.user._id;
    const userBody = req.user;
    // const userBody = {
    //     username: req.user.username,
    //     email: req.user.email,
    //     bioShort: req.user.user,
    //     password: req.user.password
    // };
    User.findByIdAndUpdate(userID, userBody, (err, updatedUser) => {
        console.log(updatedUser);
        if (!err) {
            console.log(req.body);
            res.redirect(`/user-profile/${req.user.username.toLowerCase()}`);
        } else {
            throw new Error(err);
        }
    });
});

// Exporting User Settings Router \\
module.exports = router;