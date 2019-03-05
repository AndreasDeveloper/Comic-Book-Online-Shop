// * --------------------------- * \\
//   - BACK-END SETUP | NODEJS -
// * --------------------------- * \\

// - Setting up Express & Path - \\
const path = require('path'),
      express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser');

// - All static files (CSS,JS..) - \\
app.use(express.static(`${__dirname}/../../dist`));
// - Body Parser - \\
app.use(bodyParser.urlencoded({extended: true }));
// - MongoDB Database - \\
mongoose.connect('mongodb://localhost/comic_book');
mongoose.set('useNewUrlParser', true);
// - View Engine - \\
app.set('view engine', 'ejs');

// * ------------- * \\
// - MongoDB Schema - \\
// * ------------- * \\
// - Creating Schema for database - \\
const cbSchema = new mongoose.Schema({
    name: String,
    descriptionShort: String,
    rating: Number,
    ratings: Number,
    price: Number,
    image: String
});
// - Compiling mongoose Schema to a model - \\
const Comicbook = mongoose.model('Comicbook', cbSchema);

/*
Comicbook.create({
    name: 'The Amazing Spider-Man # 141',
    descriptionShort: 'Mysterio is back, and he is not alone.',
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

// * ------------- * \\
// - Routes | Pages - \\
// * ------------- * \\

// - Home Page - \\
app.get('/', (req, res) => {
    // Get data from DB
    Comicbook.find({}, (err, allComicbooks) => {
        if (!err) {
            // Render Data
            res.render((`${__dirname}/../../dist/html/shop/index.ejs`), {comicbooks: allComicbooks});
        } else {
            throw new Error(err);
        }
    })
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