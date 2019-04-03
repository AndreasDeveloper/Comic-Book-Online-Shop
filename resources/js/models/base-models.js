// * ------------------------- * \\
//    - MODEL BASE VIEWS - \\
// * ------------------------- * \\

// -- Importing JS Files -- \\
import { DOMElements } from '../views/base-views';

// ** --- SIDE NAVIGATION | - Logic --- ** \\
export const sideNavigation = (() => {
    if (DOMElements.navigationMain) {
        // - Event Listener - | Navigation on click
        DOMElements.navigationMain.addEventListener('click', e => {
            e.preventDefault();
            
            DOMElements.html.classList.toggle('openNav');
            //DOMElements.navigation.classList.toggle('active');
        });
    }
})();

// ** --- IMAGE OBSERVING | OPTIMIZATION | LAZY LOAD --- ** \\
export const lazyImageLoad = (() => {
    // - Function | - For lazy loading images
    const lazyLoad = target => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                console.log('Intersecting');
                // If image is intersecting, run the code and load the image
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-lazy');
                    // Setting attribute to src and adding fade class (effect/transition)
                    img.setAttribute('src', src);
                    img.removeAttribute('data-lazy', src);
                    img.classList.add('fade');
                    // After everything is done, observer will disconnect
                    observer.disconnect();
                }
            });
        });
        io.observe(target); // Calling observer on targets
    };
    DOMElements.images.forEach(lazyLoad); // Lazy load every single img in HTML
})();