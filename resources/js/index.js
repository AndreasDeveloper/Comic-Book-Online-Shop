// * --- WEBPACK IMPORT FILES --- * \\
import '../sass/main.scss';

// * --- Importing JS Files --- * \\
import { elements } from './views/base-views';
import { sideNavigation, lazyImageLoad } from './models/base-models';
import Cart from './models/Cart';
import * as cartView from './views/cartView';

const state = {};

// --------------------------------------------
//  CART FUNCTION | CONTROLLER
// --------------------------------------------
elements.buyItemBtn.addEventListener('click', () => {
    if (!state.cart) state.cart = new Cart();

    cartView.renderCart();
});