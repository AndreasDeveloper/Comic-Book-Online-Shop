// - Importing Mongoose - \\
const mongoose = require('mongoose');

// * ------------- * \\
// - MongoDB Schema - \\
// * ------------- * \\
// - Creating Schema for database - \\
const orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    cart: {type: Object, required: true},
    address: {type: String, required: true},
    name: {type: String, required: true},
    paymentId: {type: String, required: true}
});
// - Compiling mongoose Schema to a model - \\
const Order = mongoose.model('Order', orderSchema);

// Exporting Comicbooks Model
module.exports = Order;