// - Setting Up Dependencies - \\
const express = require('express'),
      router = express.Router();
// - Importing Models - \\
const User = require('../models/User');
// - Importing Middlewares - \\
const authMiddleware = require('../middlewares/authMiddleware');


// GET - Settings Index Page | - Displaying index page for user profile settings - \\
router.get('/settings/:username', authMiddleware.isLoggedIn, async (req, res) => {
    // Declaring variables
    const userID = req.user._id;
    try {
        const userData = await User.findById(userID);
        res.render(`${__dirname}/../../../dist/html/user-profile/settings.ejs`, { userData: userData });
    } catch (err) {
        throw new Error(err);
    }
});

// Exporting User Settings Router \\
module.exports = router;