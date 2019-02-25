// * ------------------------- * \\
//    - MODEL BASE VIEWS - \\
// * ------------------------- * \\


// ** --- SIDE NAVIGATION | - Logic --- ** \\
export const sideNavigation = (() => {
    // DOM Elements
    const navigation = document.querySelector('.nav-toggle');
    const html = document.querySelector('html');

    // - Event Listener - | Navigation on click
    navigation.addEventListener('click', e => {
        e.preventDefault();
        
        html.classList.toggle('openNav');
        navigation.classList.toggle('active');
    });
})();

// ** --- IMAGE OBSERVING | OPTIMIZATION | LAZY LOAD --- ** \\
export const lazyImageLoad = (() => {
    // DOM Element
    const images = document.querySelectorAll('img');
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
                    img.classList.add('fade');
                    // After everything is done, observer will disconnect
                    observer.disconnect();
                }
            });
        });
        io.observe(target); // Calling observer on targets
    };
images.forEach(lazyLoad); // Lazy load every single img in HTML
})();