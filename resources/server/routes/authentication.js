// - Setting Up Dependencies - \\
const express = require('express'),
      router = express.Router(),
      path = require('path'),
      passport = require('passport'),
      cloudinary = require('cloudinary'),
      multer = require('multer'),
      bcrypt = require('bcrypt');
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
// All-In-One object | Multer Upload
const upload = multer({ storage: storage, fileFilter: imageFilter, limits: { fileSize: 1000000 }}).fields([{name: 'image', maxCount: 1}, {name: 'bkImage', maxCount: 1}]);
  

// - GET - Sign Up Page | - Displays page to sign up - \\
router.get('/signup', async (req, res) => {
    try {
        res.render(`${__dirname}/../../../dist/html/authentication/signup.ejs`);
    } catch (err) {
        throw new Error(err);
    }
});

// - * Helper Function For POST Req * - \\
const userRegisterFun = (req, res, userBody, userBodyPw) => { // Passport user register function with authentication
    return User.register(new User(userBody), userBodyPw, async (err, user) => {
        console.log(userBody.password);
        passport.authenticate('local')(req, res, () => { // Local Authentication
            if (req.session.oldUrl) { // Redirect user back to previous page (if exists)
                const oldUrl = req.session.oldUrl; // Storing oldUrl in constant variable
                req.session.oldUrl = null; // Clearing the oldUrl after redirecting
                res.redirect(oldUrl);
            } else {
                res.redirect(`/user-profile/${req.user.username.toLowerCase()}`);
            }
        });
    });
};

// - POST - Creates new User | - Create New User - \\
router.post('/signup', async (req, res) => {
    upload(req, res, async (err) => {
        const existUserUsername = await User.findOne({username: req.body.username}).exec(),
              existUserEmail = await User.findOne({email: req.body.email}).exec();
        // If user with submitted username, email, password doesn't exist, run the code
        if (!existUserUsername && !existUserEmail) {
            try {
                if (err === 'LIMIT_FILE_SIZE' || err) { // if limit file size error occurs
                    req.flash('error', 'Files cannot be larger than 1MB!');
                    res.redirect('/signup');
                } else {
                    // Encrypting Password
                    const salt = await bcrypt.genSalt(5);
                    const hash = await bcrypt.hash(req.body.password, salt);
                    // Uploading Images to Cloudinary
                    const cloudinaryRes1 = await cloudinary.uploader.upload(req.files.image[0].path);
                    const cloudinaryRes2 = await cloudinary.uploader.upload(req.files.bkImage[0].path);
                    // Adding cloudinary url for the images to the user object under image & bkImage property
                    req.body.image = cloudinaryRes1.secure_url;
                    req.body.bkImage = cloudinaryRes2.secure_url;
                    // User Data Body
                    const userBodyPass = req.body.password;
                    const userBodyData = {
                        username: req.body.username,
                        email: req.body.email,
                        bioShort: req.body.bioShort,
                        password: hash,
                        image: req.body.image,
                        bkImage: req.body.bkImage
                    };
                    // Registering user
                    const registeredUser = await userRegisterFun(req, res, userBodyData, userBodyPass);
                    const result = await bcrypt.compare(req.body.password, hash);
                    if (result === false) {
                        console.log('Password No Match');
                    } else {
                        console.log('Password Match');
                    }
                    req.flash('success', `Successfully Signed In, Welcome ${req.body.username}!`);
                }
            } catch (error) {
                console.error(error);
            }
        } else { // If user already exists, display error
        req.flash('error', 'User already exists!');
        res.redirect('/signup'); 
        }
    });
});

// - GET - Log In Page | - Displays page to log in - \\
router.get('/login', async (req, res) => {
    try {
        res.render(`${__dirname}/../../../dist/html/authentication/login.ejs`);
    } catch (err) {
        throw new Error(err);
    }
});

// - POST - Log In User | - Login's user - \\
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    async (req, res) => {
        try {
            if (req.session.oldUrl) { // Redirect user back to previous page (if exists)
                const oldUrl = req.session.oldUrl; // Storing oldUrl in constant variable
                req.session.oldUrl = null; // Clearing the oldUrl after redirecting
                res.redirect(oldUrl);
            } else {
                res.redirect(`/user-profile/${req.user.username.toLowerCase()}`);
            }
        } catch (err) {
            throw new Error(err);
        }
});

// --- LOGOUT SETUP --- \\
// GET - LOGOUT | - Logout Get Request
router.get('/logout', async (req, res) => {
    try {
        req.logout();
        res.redirect('/');
    } catch (err) {
        throw new Error(err);
    }
});

// Exporting Authentication Router
module.exports = router;