// - Setting Up Dependencies - \\
const express = require('express'),
      router = express.Router(),
      multer = require('multer');
// - Importing Models - \\
const User = require('../models/User');
// - Importing Middlewares - \\
const authMiddleware = require('../middlewares/authMiddleware');

// ==================== \\
//  - MULTER SETUP - 
// ==================== \\
const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname);
    }
});
// Allows image only base file upload
const imageFilter = (req, file, cb) => {
    // Accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
};
// All-In-One object
const upload = multer({ storage: storage, fileFilter: imageFilter, limits: { fileSize: 1000000 } });


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

// PUT - Updating User Data | - Updates user data - \\
router.put('/user-profile/:username', authMiddleware.isLoggedIn, upload.fields([{name: 'image', maxCount: 1}, {name: 'bkImage', maxCount: 1}]), async (req, res) => {
    // Declaring variables
    const userID = req.user._id,
          userBody = req.body.userData;
    try {
        const updatedUser = await User.findByIdAndUpdate(userID, userBody);
        res.redirect(`/user-profile/${req.user.username.toLowerCase()}`);
    } catch (err) {
        throw new Error(err);
    }
});

// Exporting User Settings Router \\
module.exports = router;