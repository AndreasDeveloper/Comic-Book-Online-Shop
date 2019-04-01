// - Importing Mongoose - \\
const mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');

// -- User Schema -- \\
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    bioShort: String,
    image: String,
    bkImage: String,
    password: String
});
// Injects passport local mongoose methods to schema
UserSchema.plugin(passportLocalMongoose);
// Converting Schema to Model
const User = mongoose.model('User', UserSchema);

// Exporting User Model
module.exports = User;