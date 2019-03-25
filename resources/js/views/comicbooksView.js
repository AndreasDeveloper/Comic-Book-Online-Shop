// -- Importing Files - \\
import { elements } from './base-views';

// Exporting Function | - Rendering Comicbooks in Shop page
export const renderComics = (comic) => {
    const markup = `
    <div class="item">
        <div class="shop-row shop-row--1"><img src="${comic.image}" alt="${comic.name} Cover" class="sp-cover-img" style="opacity: 1; transform: translateX(0%);"></div>
        <div class="item-desc">
            <h2 class="item-desc__name">${comic.name}</h2>
            <p class="item-desc__text">${comic.descriptionShort}</p>
            <h3 class="item-desc__rating"><i class="icon ion-ios-star"></i> ${comic.rating} &dash; <span>Based on ${comic.ratings} ratings</span></h3>
            <h3 class="item-desc__price">&dollar; ${comic.price} <a href="${comic._id}" class="item-desc__button btn-1">buy</a></h3>
        </div>
    </div>
    `;
    elements.shopContainer.insertAdjacentHTML('beforeend', markup);
};