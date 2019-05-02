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
        if (storedItem.item.hasOwnProperty('name') && storedItem.item['name']===storedItem.item.name) { // if item already exists in shopping cart
            storedItem.qnty++;
            storedItem.price = storedItem.item.price * storedItem.qnty;
            this.totalPrice += storedItem.item.price;
        } else {
            storedItem.qnty++;
            storedItem.price = storedItem.item.price * storedItem.qnty;
            this.totalQnty++;
            this.totalPrice += storedItem.item.price;
        }
    };

    // Remove one item quantity from cart
    reduceByOne (id) {
        this.items[id].qnty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQnty--;
        this.totalPrice -= this.items[id].item.price;

        if (this.items[id].qnty <= 0) {
            delete this.items[id];
        }
        if (this.items < 1) {
            this.items = {};
        }
    };

    // Remove item from cart
    removeItem (id) {
        this.totalQnty -= 1;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };

    // Clear Cart Totally
    clearCart () {
        this.items = {};
        this.totalQnty = 0;
        this.totalPrice = 0;
    }

    // Outputting the list of products in cart
    generateArray () {
        let arr = [];
        for (const id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};

// Exporting Cart Class
module.exports = Cart;