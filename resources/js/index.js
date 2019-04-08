// * --- WEBPACK IMPORT FILES --- * \\
import '../sass/main.scss';
// * --- Importing JS Files --- * \\
import { elements } from './views/base-views';
import * as baseModels from './models/base-models';
import Cart from './models/Cart';
import Comicbooks from './models/Comicbooks';
import * as comicbooksView from './views/comicbooksView'; 
import * as cartView from './views/cartView';

// Global State Object
const state = {};

// --------------------------------------------
//  COMICBOOKS FUNCTION | CONTROLLER
// --------------------------------------------
// ASYNC FUNCTION | - Consuming and manipulating comicbook data
const controlComicbooks = async () => {
    state.comicbooks = new Comicbooks();
    console.log(state.comicbooks);
    try {
        await state.comicbooks.getComicbooks();
        // Renders comicbooks
        state.comicbooks.data.forEach((el, i) => {
            comicbooksView.renderComics(state.comicbooks.data[i]);
        });
    } catch (err) {
        throw new Error(err);
    }
};
// EVENT LISTENER | - Consumes comicbook data from async function on load
window.addEventListener('load', () => controlComicbooks());

// --------------------------------------------
//  CART FUNCTION | CONTROLLER
// --------------------------------------------
// elements.buyItemBtn.addEventListener('click', () => {
//     if (!state.cart) state.cart = new Cart();

//     cartView.renderCart();
// });