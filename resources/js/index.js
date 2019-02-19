// * --- WEBPACK IMPORT FILES --- * \\
import '../sass/main.scss';

// -- SIDE NAVIGATION | - Logic -- \\
(() => {
    // DOM Elements
    const navigation = document.querySelector('.nav-toggle');
    const html = document.querySelector('html');

    navigation.addEventListener('click', e => {
        e.preventDefault();
        
        html.classList.toggle('openNav');
        navigation.classList.toggle('active');
    });
})();