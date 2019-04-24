// - Importing MVC files - \\
import { DOMElements } from '../views/base-views';

// Setting up Stripe with API key
const stripe = Stripe('pk_test_VbCp2xS6RBXUZOnyfBLP7hAo002IqpyMBN');
const elements = stripe.elements();
const card = elements.create('card');
card.mount(DOMElements.creditCardWrap);

// Stripe Token Handler | - Helper Function
const stripeTokenHandler = (token) => {
    // Insert the token ID into the form so it gets submitted to the server
    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token);
    DOMElements.checkoutForm.appendChild(hiddenInput);
  
    // Submit the form
    DOMElements.checkoutForm.submit();
  }

// Setting up Payment methods with Stripe
DOMElements.checkoutForm.addEventListener('submit', async event => {
    event.preventDefault();
    console.log('Submitted');
    DOMElements.checkoutFormBtn.setAttribute('disabled', true);
    try {
        const cardPayment = await stripe.createToken(card);
        console.log(cardPayment);
        const token = cardPayment.token.id;
        stripeTokenHandler(token);
        return false; // Stops execution
    } catch (err) {
        throw new Error(err);
    }
});