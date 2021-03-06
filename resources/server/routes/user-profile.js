// - Setting Up Dependencies - \\
const express = require('express'),
      router = express.Router(),
      multer = require('multer'),
      cloudinary = require('cloudinary');
// - Importing Models - \\
const User = require('../models/User'),
      Cart = require('../models/Cart');
      Order = require('../models/Order');
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
const upload = multer({ storage: storage, fileFilter: imageFilter, limits: { fileSize: 1000000 }}).fields([{name: 'userImage', maxCount: 1}, {name: 'userBkImage', maxCount: 1}]);


// - GET - User Profile | - Displays user profile - \\
router.get('/user-profile/:username', authMiddleware.isLoggedIn, async (req, res) => {
    const userID = req.user._id;
    try {
        const userData = await User.findById(userID);
        const userOrders = await Order.find({user: req.user});
        userOrders.forEach(order => {
            const cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });

        res.render(`${__dirname}/../../../dist/html/user-profile/user-profile.ejs`, { userData: userData, orders: userOrders });
    } catch (err) {
        throw new Error(err);
    }
});

// - PUT - Update Images | - Updates profile and background image - \\
router.put('/user-profile/:username', authMiddleware.isLoggedIn, async (req, res) => {
    upload(req, res, async (err) => {
        // Declaring variables
        const userID = req.user._id,
            userBody = req.body.userData,
            userPw = req.body.userData.password;
        try {
            if (err === 'LIMIT_FILE_SIZE' || err) { // if limit file size error occurs
                req.flash('error', 'Files cannot be larger than 1MB!');
                res.redirect(`/user-profile/${req.user.username.toLowerCase()}`);
            } else {
                if (req.files.userImage !== undefined) { // If there is a profile image being uploaded
                    const cloudinaryRes1 = await cloudinary.uploader.upload(req.files.userImage[0].path);
                    // Adding cloudinary url for the images to the user object under image & bkImage property
                    req.body.image = cloudinaryRes1.secure_url;
                    const userBody = { image: req.body.image };
                    const updatedData = await User.findByIdAndUpdate(userID, userBody); // Updated images
                    res.redirect(`/user-profile/${req.user.usernameUrl.toLowerCase()}`);
                } else if (req.files.userBkImage !== undefined) { // If there is a profile background image being uploaded
                    const cloudinaryRes2 = await cloudinary.uploader.upload(req.files.userBkImage[0].path);
                    // Adding cloudinary url for the images to the user object under image & bkImage property
                    req.body.bkImage = cloudinaryRes2.secure_url;
                    const userBody = { bkImage: req.body.bkImage };
                    const updatedData = await User.findByIdAndUpdate(userID, userBody); // Updated images
                    res.redirect(`/user-profile/${req.user.usernameUrl.toLowerCase()}`);
                } else if (req.body.userData) { // If there is user data being updated
                    if (userPw !== userPw) { // If password is being changed
                        const foundUser = await User.findById(userID);
                        const updatedPassword = await foundUser.setPassword(userPw);
                        const updateUser = await User.findByIdAndUpdate(userID, updatedPassword);
                        res.redirect('/logout');
                    } 
                    const updatedUser = await User.findByIdAndUpdate(userID, userBody);
                    res.redirect(`/user-profile/${req.user.username.toLowerCase()}`);
                }
            }
        } catch (err) {
            throw new Error(err);
        }
    });
});

// Exporting User Profiles Router
module.exports = router;