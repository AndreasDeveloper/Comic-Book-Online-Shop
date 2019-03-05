// * ------------------------- * \\
//        - CART MODEL - 
// * ------------------------- * \\

// Exporting Class | Whole Cart system
export default class Cart {
    constructor() {
        this.cartItems = [];
    }

    // Add to the Cart Method
    addToCart(_id, title, price, img) {
        // Destructuring
        const item = { _id, title, price, img };
        // Pushing item to the cartItems array
        this.cartItems.push(item);

        return item;
    }
    // Delete Item from the Cart
    deleteFromCart(_id) {
        // Finding the item id
        const index = this.cartItems.findIndex(el => el._id === _id);
        // Deleting it from cartItems array
        this.cartItems.splice(index, 1);
    }
    // Check if there is item in cart
    isInCart(_id) {
        return this.cartItems.findIndex(el => el._id === _id) !== -1; 
    }
    // Show numbers of items in cart
    getItemsNum() {
        return this.cartItems.length;
    }
}