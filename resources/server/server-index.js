// * --------------------------- * \\
//   - BACK-END SETUP | NODEJS -
// * --------------------------- * \\

// - Setting up Dependencies - \\
const path = require('path'),
      express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser');
// - Importing Models | MVC - \\
const Comicbook = require('./models/Comicbooks');
// - Importing Routes Files - \\
const shopRoutes = require('./routes/shop');
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

// ============== \\
// Express Router 
// ============== \\

// - Using Routes Files - \\
app.use(shopRoutes);
app.use(comicbooksShopData);

// * ------------- * \\
// - Routes | Pages - \\
// * ------------- * \\

// - Landing Page - \\
app.get('/', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../../dist/html/landing/landing.html`));
});

// - User Profile - \\
app.get('/user-profile', (req, res) => {
    res.status(200).send('User Profile Page - Ok');
});

// - 404 - Page not Found Page - \\
app.get('*', (req, res) => {
    res.status(404).send('404 - Page Not Found'); 
});

// - localHost / Route setup - \\
const port = 3000;
app.listen(port, () => console.log(`App Running on port - ${port}`));