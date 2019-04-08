// - Setting Up Dependencies - \\
const express = require('express'),
      router = express.Router(),
      multer = require('multer'),
      cloudinary = require('cloudinary');
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


// - User Profile - \\
router.get('/user-profile/:username', authMiddleware.isLoggedIn, async (req, res) => {
    const userID = req.user._id;
    try {
        const userData = await User.findById(userID);
        res.render(`${__dirname}/../../../dist/html/user-profile/user-profile.ejs`, { userData: userData });
    } catch (err) {
        throw new Error(err);
    }
});

router.put('/user-profile/:username', authMiddleware.isLoggedIn, upload.fields([{name: 'userImage', maxCount: 1}, {name: 'userBkImage', maxCount: 1}]), async (req, res) => {
    // Declaring variables
    const userID = req.user._id;
    try {
        const cloudinaryRes1 = await cloudinary.uploader.upload(req.files.userImage[0].path);
        //const cloudinaryRes2 = await cloudinary.uploader.upload(req.files.userBkImage[0].path);
        // Adding cloudinary url for the images to the user object under image & bkImage property
        req.body.image = cloudinaryRes1.secure_url;
        //req.body.bkImage = cloudinaryRes2.secure_url;
        const userBody = { image: req.body.image };
        const updatedData = await User.findByIdAndUpdate(userID, userBody); // Updated images
        console.log(updatedData);
        res.redirect(`/user-profile/${req.user.usernameUrl.toLowerCase()}`);
    } catch (err) {
        throw new Error(err);
    }
});

// Exporting User Profiles Router
module.exports = router;