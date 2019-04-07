// - Setting Up Dependencies - \\
const express = require('express'),
      router = express.Router(),
      path = require('path'),
      passport = require('passport'),
      cloudinary = require('cloudinary'),
      multer = require('multer');
// - Importing Models - \\
const User = require('../models/User');

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
  

// - GET - Sign Up Page | - Displays page to sign up - \\
router.get('/signup', (req, res) => {
    res.render(`${__dirname}/../../../dist/html/authentication/signup.ejs`);
});

// - * Helper Functions For POST Req * - \\
const cloudinaryParallelFirst = (req) => { // Cloudinary parallel image upload #1
    return cloudinary.uploader.upload(req.files.image[0].path);
};
const cloudinaryParallelSecond = (req) => { // Cloudinary parallel image upload #2
    return cloudinary.uploader.upload(req.files.bkImage[0].path);
};
const userRegisterFun = (req, res, userBody) => { // Passport user register function with authentication
    return User.register(new User(userBody), userBody.password, async (err, user) => {
        passport.authenticate('local')(req, res, () => { // Local Authentication
            res.redirect(`/user-profile/${req.user.usernameUrl.toLowerCase()}`);
        });
    });
};

// - POST - Creates new User | - Create New User - \\
router.post('/signup', upload.fields([{name: 'image', maxCount: 1}, {name: 'bkImage', maxCount: 1}]), async (req, res) => {
    try {
        const cloudinaryRes1 = await cloudinaryParallelFirst(req);
        const cloudinaryRes2 = await cloudinaryParallelSecond(req);
        // Adding cloudinary url for the images to the user object under image & bkImage property
        req.body.image = cloudinaryRes1.secure_url;
        req.body.bkImage = cloudinaryRes2.secure_url;
        // User body as object
        const userBody = {
              username: req.body.username,
              usernameUrl: req.body.username,
              email: req.body.email,
              bioShort: req.body.bioShort,
              image: req.body.image,
              bkImage: req.body.bkImage,
              password: req.body.password
            };
        // Registering user
        const registeredUser = await userRegisterFun(req, res, userBody);
    } catch (error) {
        console.error(error);
    }
});

// - GET - Log In Page | - Displays page to log in - \\
router.get('/login', (req, res) => {
    res.render(`${__dirname}/../../../dist/html/authentication/login.ejs`);
});

// - POST - Log In User | - Login's user - \\
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect(`/user-profile/${req.user.username.toLowerCase()}`);
});

// --- LOGOUT SETUP --- \\
// GET - LOGOUT | - Logout Get Request
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Exporting Authentication Router
module.exports = router;