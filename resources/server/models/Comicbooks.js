// - Importing Mongoose - \\
const mongoose = require('mongoose');

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

// Exporting Comicbooks Model
module.exports = Comicbook;