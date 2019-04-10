// * ---------------- * \\
//    - BASE VIEWS - \\
// * ---------------- * \\

// --- Contains All DOM Needed Elements --- \\
export const DOMElements = {
    // Base DOM Elements
    html: document.querySelector('html'),
    images: document.querySelectorAll('img'),
    // Wrappers
    newWrapper: document.querySelector('.new-wrapper'),
    // Navigation DOM Elements
    navigationMain: document.querySelector('.nav-toggle'),
    // Shop DOM Elements
    shopContainer: document.querySelector('.shop-container'), // Shop Main Container
    shoppingCartUl: document.querySelector('.user-list-cart'),
    buyItemBtn: document.querySelector('.buyBtn'),
    // User Settings DOM Elements
    iconEye: document.querySelector('#icon-eye-on'),
    passwordInputSett: document.querySelector('#settings-pw'),
    // User Profile DOM Elements
    userImage: document.querySelector('.user-image__image'),
    userImageIcon: document.querySelector('.user-image-icon'),
    profileFormImg: document.querySelector('#profileFormImg'),
    profileFormBkImage: document.querySelector('#profileFormBkImage'),
    inputImage: document.querySelector('#profileImg'),
    inputBkImage: document.querySelector('#profileBkImage')
};