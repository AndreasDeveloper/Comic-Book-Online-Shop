// Wishlist Class
class Wishlist {
    constructor(oldWishlist) {
        this.items = oldWishlist.items || {};
        this.totalQnty = oldWishlist.totalQnty || 0;
    };

    // Add to wishlist
    add (item, id) {
        let storedItem = this.items[id];
        if (!storedItem) { // If there are no previous items
            storedItem = this.items[id] = {item: item};
        }
        if (storedItem.item.hasOwnProperty('name') && storedItem.item['name'] === storedItem.item.name) { // if item already exists in shopping cart
            return null;
        } else {
            storedItem.qnty++;
            this.totalQnty++;
        }
    };

    // Remove item from cart
    removeItem (id) {
        this.totalQnty -= 1;
        delete this.items[id];
    };

    // Outputting the list of products in cart
    generateArray () {
        let arr = [];
        for (const id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};

// Exporting Wishlist Class
module.exports = Wishlist;