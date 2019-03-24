// - Setting Up Dependencies - \\
const express = require('express'),
      router = express.Router(),
      path = require('path'),
      passport = require('passport');
// - Importing Models - \\
const User = require('../models/User');

// - GET - Sign Up Page | - Displays page to sign up - \\
router.get('/signup', (req, res) => {
    res.render(path.resolve(`${__dirname}/../../../dist/html/authentication/signup.ejs`));
});

// - POST - Creates new User | - Create New User - \\
router.post('/signup', (req, res) => {
    // User Data
    const username = req.body.username,
          email = req.body.email,
          password = req.body.password;
    User.register(new User({ username: username, email: email }), password, (err, user) => {
        if (!err) {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/user-profile');
            });
        } else {
            throw new Error(err);
        }
    });
});

// - GET - Log In Page | - Displays page to log in - \\
router.get('/login', (req, res) => {
    res.render(path.resolve(`${__dirname}/../../../dist/html/authentication/login.ejs`));
});

// - POST - Log In User | - Login's user - \\
router.post('/login', passport.authenticate('local', { 
    successRedirect: '/user-profile', 
    failureRedirect: '/login' }), 
    (req, res) => {
});

// --- LOGOUT SETUP --- \\
// GET - LOGOUT | - Logout Get Request
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Exporting Authentication Router
module.exports = router;