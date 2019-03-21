// - Setting Up Dependencies - \\
const express = require('express'),
      router = express.Router();
const path = require('path');


// - Log In Page - \\
router.get('/login', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../../../dist/html/authentication/login.html`));
});

// - Sign Up Page - \\
router.get('/signup', (req, res) => {
    res.send('Sign up Page');
});

// Exporting Authentication Router
module.exports = router;