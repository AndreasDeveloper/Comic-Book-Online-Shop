// * --------------------------- * \\
//   - BACK-END SETUP | NODEJS -
// * --------------------------- * \\

// - Setting up Dependencies - \\
const path = require('path'),
      express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      multer = require('multer'),
      cloudinary = require('cloudinary'),
      flash = require('connect-flash');
// - Importing Models | MVC - \\
const Comicbook = require('./models/Comicbooks'),
      User = require('./models/User');
// - Importing Routes Files - \\
const shopRoutes = require('./routes/shop'),
      authenticationRoutes = require('./routes/authentication'),
      userProfileRoutes = require('./routes/user-profile'),
      userProfileSettingsRoutes = require('./routes/user-settings');
// - Importing Middlewares - \\
const authMiddleware = require('./middlewares/authMiddleware');
// - API JSON ROUTE - \\
const comicbooksShopData = require('./jsonData/comicbooks_json');

// - All static files (CSS,JS..) - \\
app.use(express.static(`${__dirname}/../../dist`));
// - Body Parser - \\
app.use(bodyParser.urlencoded({extended: true }));
// - JSON Data Display - \\
app.use(bodyParser.json()); // JSON
app.set('json spaces', 40); // Pretifier
// - MongoDB Database - \\
mongoose.connect('mongodb://localhost/comic_book');
mongoose.set('useNewUrlParser', true);
// - View Engine - \\
app.set('view engine', 'ejs');
// - Method Override - \\
app.use(methodOverride('_method'));
// - Connect Flash - \\
app.use(flash());

/*
Comicbook.create({
    name: 'The Amazing Spider-Man #141',
    descriptionShort: 'Mysterio is back and he is not alone.',
    rating: 4.9,
    ratings: 50,
    price: 50,
    image: 'https://drive.google.com/uc?export=view&id=1hS9cF-jWTJJIKzGfW4G4hdCaBXCOOfYN'
}, (err, comicbook) => {
    if (!err) {
        console.log('Created new comic book');
        console.log(comicbook);
    } else {
        throw new Error(err);
    }
});*/

// ==================== \\
//  - CLOUDINARY SETUP - 
// ==================== \\
cloudinary.config({
    cloud_name: 'andreasdev',
    api_key: '767997464242296',
    api_secret: '1By79O46lDIRJL4VJMqf9Tmcvt8',
}); 

// ==================== \\
//  - PASSPORT SETUP - 
// ==================== \\
// - Express Session - \\
app.use(require('express-session')({
    secret: 'Accessing secret data',
    resave: false,
    saveUninitialized: false
}));
// - Passport Methods - \\
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Displays user on every single page (if logged in)
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    // Flash Messages Setup | Error & Success Global
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});
// ============== \\
// Express Router 
// ============== \\
// - Using Routes Files - \\
app.use(shopRoutes);
app.use(authenticationRoutes);
app.use(userProfileRoutes);
app.use(userProfileSettingsRoutes);
app.use(comicbooksShopData);

// * ------------- * \\
// - Routes | Pages - \\
// * ------------- * \\

// - Landing Page - \\
app.get('/', async (req, res) => {
    try {
        res.render(`${__dirname}/../../dist/html/landing/landing.ejs`);
    } catch (err) {
        throw new Error(err);
    }
});

// - 404 - Page not Found Page - \\
app.get('*', (req, res) => {
    res.status(404).send('404 - Page Not Found'); 
});

// - localHost / Route setup - \\
const port = 3000;
app.listen(port, () => console.log(`App Running on port - ${port}`));