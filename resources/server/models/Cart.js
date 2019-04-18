// Cart Class
class Cart {
    constructor(oldCart) { // oldCart = past items in the cart
        this.items = oldCart.items || {};
        this.totalQnty = oldCart.totalQnty || 0;
        this.totalPrice = oldCart.totalPrice || 0;
    };
    // Add to cart method
    add (item, id) {
        let storedItem = this.items[id];
        if (!storedItem) { // If there are no previous items
            storedItem = this.items[id] = {item: item, qnty: 0, price: 0};
        }
        storedItem.qnty++;
        storedItem.price = storedItem.item.price * storedItem.qnty;
        this.totalQnty++;
        this.totalPrice += storedItem.item.price;
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

// Exporting Cart Model
module.exports = Cart;