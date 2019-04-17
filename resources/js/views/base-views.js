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
    wishlistItemBtnWrap: document.querySelectorAll('.wishlistBtn'),
    heartIcon: document.querySelectorAll('.heartIcon'),
    // User Settings DOM Elements
    settingsForm: document.querySelector('.edit-form'),
    usernameInputSett: document.querySelector('.edit-form__username'),
    emailInputSett: document.querySelector('.edit-form__email'),
    bioShortInputSett: document.querySelector('.edit-form__bioShort'),
    passwordInputWrap: document.querySelector('.edit-form__password'),
    iconEye: document.querySelector('#icon-eye-on'),
    usernameInput: document.querySelector('.edit-form__usernameInp'),
    emailInput: document.querySelector('.edit-form__emailInp'),
    bioShortInput: document.querySelector('.edit-form__bioShortInp'),
    passwordInputSett: document.querySelector('#settings-pw'),
    // User Profile DOM Elements
    userImage: document.querySelector('.user-image__image'),
    userImageIcon: document.querySelector('.user-image-icon'),
    profileFormImg: document.querySelector('#profileFormImg'),
    profileFormBkImage: document.querySelector('#profileFormBkImage'),
    inputImage: document.querySelector('#profileImg'),
    inputBkImage: document.querySelector('#profileBkImage')
};

// --- Private Classes --- \\
export const elementStrings = {
    loader: 'loader'
};

// --- Render Pre-Loader - Function --- \\
export const renderLoader = parentEl => {
    const loader = `
    <div class="spinner-block">
        <div class="spinner spinner-1"></div>
    </div>
    `;
    parentEl.insertAdjacentHTML('afterbegin', loader);
};

// --- Clear Pre-Loader - Function --- \\
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) { // If loader exists
        loader.parentElement.removeChild(loader); // Remove it
    }
};