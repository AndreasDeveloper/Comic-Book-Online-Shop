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

// ** --- HIDE/REVEAL PASSWORD | - Logic --- ** \\
export const hideRevealPassword = (() => {
    if (DOMElements.iconEye) { // If icon eye is present, run the listener
        DOMElements.iconEye.addEventListener('click', () => {
            if (DOMElements.iconEye.className === 'icon ion-ios-eye-off') {
                DOMElements.iconEye.classList.remove('icon', 'ion-ios-eye-off'); // Changing icons
                DOMElements.iconEye.classList.add('icon', 'ion-ios-eye');
                DOMElements.passwordInputSett.setAttribute('type', 'text'); // Changing attribute to text
            } else if (DOMElements.iconEye.className === 'icon ion-ios-eye') {
                DOMElements.iconEye.classList.remove('icon', 'ion-ios-eye'); // Changing icons
                DOMElements.iconEye.classList.add('icon', 'ion-ios-eye-off');
                DOMElements.passwordInputSett.setAttribute('type', 'password'); // Changing attribute back to password
            }
        });
    }
})();

// ** --- REVEAL IMAGE EDIT OPTIONS | - Logic --- ** \\
export const revealImgEdit = (() => {
    const DOMEls = [DOMElements.userImage, DOMElements.inputImage, DOMElements.userImageIcon]
    if (DOMEls[0]) {
        DOMEls.forEach(event => { // Mouse enter event listeners for both user image and camera icon
            event.addEventListener('mouseenter', () => {
                DOMElements.userImage.classList.add('edit-user-image');
                DOMElements.userImageIcon.classList.add('iconVisible');
                DOMElements.inputImage.style.visibility = 'visible';
            });
        });
        DOMEls.forEach(event => {
            event.addEventListener('mouseleave', () => { // Mouse leave event listener for user image
                DOMElements.userImage.classList.remove('edit-user-image');
                DOMElements.userImageIcon.classList.remove('iconVisible');
                DOMElements.inputImage.style.visibility = 'hidden';
            });
        });
    }
})();

// ** --- AUTO SUBMIT THE FORM WHEN CHANGING PROFILE IMAGE | - Logic --- ** \\
export const autoSubmitImage = (() => {
    if (DOMElements.inputImage) {
        DOMElements.inputImage.onchange = () => {
            DOMElements.profileFormImg.submit();
       };
    }
})();
export const autoSubmitBkImage = (() => {
    if (DOMElements.inputBkImage) {
        DOMElements.inputBkImage.onchange = () => {
            DOMElements.profileFormBkImage.submit();
        };
    }
})();