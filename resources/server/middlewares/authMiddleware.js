// - Importing Other Mandatory Files - \\
const Comicbook = require('../models/Comicbooks');

// isLoggedIn Middleware | - Checks if user is logged in \\
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect('/login');
};

// Exporting middleware
module.exports = {
    isLoggedIn
};