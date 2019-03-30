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
const upload = multer({ storage: storage, fileFilter: imageFilter });

// - GET - Sign Up Page | - Displays page to sign up - \\
router.get('/signup', (req, res) => {
    res.render(path.resolve(`${__dirname}/../../../dist/html/authentication/signup.ejs`));
});

// - POST - Creates new User | - Create New User - \\
router.post('/signup', upload.single('image'), (req, res) => {
    cloudinary.uploader.upload(req.file.path, (result) => {
        // Adding cloudinary url for the images to the user object under image property
        req.body.image = result.secure_url;
        // Add other user info
        const username = req.body.username,
              email = req.body.email,
              bioShort = req.body.bioShort,
              image = req.body.image,
              password = req.body.password;
        // Register new user with provided elements
        User.register(new User({ username: username, email: email, bioShort: bioShort, image: image }), password, (err, user) => {
            if (!err) {
                passport.authenticate('local')(req, res, () => { // Local Authentication
                    res.redirect('/user-profile');
                });
            } else {
                throw new Error(err);
            }
        });
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