// - Setting Up Dependencies - \\
const express = require('express'),
      router = express.Router(),
      stripe = require('stripe')("sk_test_2KdjuXajFeCLFo0NJT0Fg07L002vhxHoUr");
// - Importing MVC files - \\
const Comicbook = require('../models/Comicbooks'),
      Cart = require('../models/Cart'),
      Order = require('../models/Order');
// - Importing Middleware - \\
const authMiddleware = require('../middlewares/authMiddleware');
// - Importing Other JS Files - \\
const escapeRegex = require('../../js/utilities/regex-escape');


// GET - Shop Index Page | - Displaying shopping index page - \\
router.get('/shop', async (req, res) => {
    // Declaring variable
    let noMatch = null;
    try {
        // Declaring variable
        const userBody = req.user;
        res.render((`${__dirname}/../../../dist/html/shop/index.ejs`), {currentUser: userBody, noMatch: noMatch });
    } catch (err) {
        throw new Error(err);
    }
});

// GET - Shop Product Page | - Displaying demanded product page with page numbers - \\
router.get('/shop/:page', async (req, res, next) => {
// Declaring variable
const resPerPage = 9;
const page = req.params.page || 1;
let noMatch = null;
    try {
        if (req.query.search) {
            // Declaring query based/search variables
            const searchQuery = req.query.search,
                                regex = new RegExp(escapeRegex(req.query.search), 'gi');
            // Find Demanded Comicbooks | Skipping page values, limit results per page
            const foundComicbook = await Comicbook.find({name: regex}).skip((resPerPage * page) - resPerPage).limit(resPerPage);
            // Count how many comicbooks were found
            const numOfComicbooks = await Comicbook.count({name: regex});
            if (foundComicbook.length < 1) { // If demanded comicbooks were not found
                noMatch = 'No results found.';
            }
            // Renders The Page
            res.render((`${__dirname}/../../../dist/html/shop/shop-item.ejs`), {comicbooks: foundComicbook, currentPage: page, pages: Math.ceil(numOfComicbooks / resPerPage), searchVal: searchQuery, numOfResults: numOfComicbooks, noMatch: noMatch});
        }
    } catch (err) {
        throw new Error(err);
    }
});


// GET - Add To Cart | - Add item to cart - route - \\
router.get('/shop/add-to-cart/:id', async (req, res) => {
    const productID = req.params.id;
    const backUrl = req.header('Referer') || '/'; // Remembers the last url user was on
    try {
        const cart = new Cart(req.session.cart ? req.session.cart : {}); // If cart exists, pass the old cart (obj with data), otherwise pass the empty cart (object)
        const foundProduct = await Comicbook.findById(productID);
        cart.add(foundProduct, foundProduct._id);
        req.session.cart = cart; // Adding cart to session (locals)
        res.redirect(backUrl);
    } catch (err) {
        throw new Error(err);
    }
});

// GET - Remove Item Quantity by one from Cart | - Removes one item from the cart - \\
router.get('/reduce/:id', (req, res) => {
    const productID = req.params.id;
    const backUrl = req.header('Referer') || '/'; // Remembers the last url user was on
    try {
        const cart = new Cart(req.session.cart ? req.session.cart : {}); // If cart exists, pass the old cart (obj with data), otherwise pass the empty cart (object)
        cart.reduceByOne(productID);
        req.session.cart = cart;
        res.redirect(backUrl);
    } catch (err) {
        throw new Error(err);
    }
});

// GET - Remove Item from Cart | - Removes all of the items from cart - \\
router.get('/remove/:id', (req, res) => {
    const productID = req.params.id;
    const backUrl = req.header('Referer') || '/'; // Remembers the last url user was on
    try {
        const cart = new Cart(req.session.cart ? req.session.cart : {}); // If cart exists, pass the old cart (obj with data), otherwise pass the empty cart (object)
        cart.removeItem(productID);
        req.session.cart = cart;
        res.redirect(backUrl);
    } catch (err) {
        throw new Error(err);
    }
});

router.get('/clear-cart', async (req, res) => {
    try {
        req.session.cart = null;
        req.flash('success', 'Cart cleared');
        res.redirect('/shopping-cart');
    } catch (err) {
        throw new Error(err);
    }
});

// GET - Shopping Cart Page | - Displaying shopping cart with all / or none items added to cart - \\
router.get('/shopping-cart', async (req, res) => {
    try {
        if (!req.session.cart) {
            res.render((`${__dirname}/../../../dist/html/shop/shopping-cart.ejs`), {products: null});
        }
        const cart = await new Cart(req.session.cart);
        if (req.session.cart.totalQnty === 0) {
            req.session.cart = null;
            res.render((`${__dirname}/../../../dist/html/shop/shopping-cart.ejs`), {products: cart.generateArray(), totalPrice: cart.totalPrice});
        } else {
            res.render((`${__dirname}/../../../dist/html/shop/shopping-cart.ejs`), {products: cart.generateArray(), totalPrice: cart.totalPrice});
        }
    } catch (err) {
        throw new Error(err);
    }
});

// GET - Checkout Page | - Displaying shopping checkout page - \\
router.get('/checkout', authMiddleware.isLoggedIn, async (req, res) => {
    try {
        if (!req.session.cart) {
            res.redirect('/shopping-cart');
        } 
        const cart = await new Cart(req.session.cart);
        const errMsg = req.flash('error')[0];
        res.render((`${__dirname}/../../../dist/html/shop/checkout.ejs`));
    } catch (err) {
        throw new Error(err);
    }
});


// POST - Finishing Checkout | - Charging the user
router.post('/checkout', authMiddleware.isLoggedIn, async (req, res) => {
    if (!req.session.cart) {
        res.redirect('/shopping-cart');
    } 
    const cart = await new Cart(req.session.cart);

    try {
        // Creating charge object
        const charge = await stripe.charges.create({
            amount: cart.totalPrice * 100,
            currency: "usd",
            source: req.body.stripeToken, // obtained with Stripe.js
            description: "Charge made"
        });

        // Storing user oreder into databse
        const order = await new Order({
            user: req.user,
            cart: cart,
            address: req.body.chAddress,
            name: `${req.body.chFirstName} ${req.body.chLastName}`,
            paymentId: charge.id
        });
        const savedOrder = await order.save();

        req.session.cart = null;
        req.flash('success', 'Transaction passed');
        res.redirect('/shopping-cart');
        console.log('Passed');
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/checkout');
        console.log('Not passed');
        throw new Error(err);
    }
});

// Exporting Shop Router
module.exports = router;