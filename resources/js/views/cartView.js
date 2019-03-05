// * ------------------------- * \\
//        - CART VIEW - 
// * ------------------------- * \\

// Importing items
import { elements } from './base-views';

// Export Function | Rendering Cart List
export const renderCart = () => {
    const markup = `
    <li>
        <a href="#" class="user-list__link">
            <figure class="user-list__fig">
                <img data-lazy="<%= comicbooks.image %>">
            </figure>
            <div class="user-list__data">
                <h3 class="user-list__name"><%= comicbooks.name %></h3>
                <h4 class="user-list__price">&dollar; <%= comicbooks.price %></h4>
            </div>
            <div class="user-list__remove"><i class="icon ion-ios-close"></i></div>
        </a>
    </li>
    `;
    elements.shoppingCartUl.insertAdjacentHTML('beforeend', markup);
};

// Export Function | Deleting item from Cart list
export const deleteItemFromCart = id => {
    
};