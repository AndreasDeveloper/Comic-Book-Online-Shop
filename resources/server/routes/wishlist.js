// - Setting Up Dependencies - \\
const express = require('express'),
      router = express.Router();
// - Importing MVC files - \\
const Comicbook = require('../models/Comicbooks'),
      Wishlist = require('../models/Wishlist');
// - Importing Middleware - \\
const authMiddleware = require('../middlewares/authMiddleware');


// GET - Add to Wishlist | - Add item to wishlist - route - \\
router.get('/add-to-wishlist/:id', async (req, res) => {
    const productID = req.params.id;
    const backUrl = req.header('Referer') || '/'; // Remembers the last url user was on
    try {
        const wishlist = new Wishlist(req.session.wishlist ? req.session.wishlist : {});
        const foundProduct = await Comicbook.findById(productID);
        wishlist.add(foundProduct, foundProduct._id);
        req.session.wishlist = wishlist;
        res.redirect(backUrl);
    } catch (err) {
        throw new Error(err);
    }
});

// GET - Remove Item from Wishlist | - Removes all of the items from wishlist - \\
router.get('/remove-wish/:id', (req, res) => {
    const productID = req.params.id;
    const backUrl = req.header('Referer') || '/'; // Remembers the last url user was on
    try {
        const wishlist = new Wishlist(req.session.wishlist ? req.session.wishlist : {}); // If wishlist exists, pass the old wishlist (obj with data), otherwise pass the empty wishlist (object)
        wishlist.removeItem(productID);
        req.session.wishlist = wishlist;
        if (req.session.wishlist.totalQnty === 0) { // If wishlist is empty, set wishlist value to null
            req.session.wishlist = null;
        }
        res.redirect(backUrl);
    } catch (err) {
        throw new Error(err);
    }
});

// Exporting Wishlist Router
module.exports = router;