
// Create an instance of the Stripe object with your publishable API key
var stripe = Stripe(stripePublicKey);
var checkoutButton = document.getElementById('checkout-button');

checkoutButton.addEventListener('click', function() {
    // Create a new Checkout Session using the server-side endpoint you
    // created in step 3.
  fetch('/payments/create-checkout-session', {
      method: 'POST',
      headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
      }
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(session) {
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(function(result) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, you should display the localized error message to your
      // customer using `error.message`.
      if (result.error) {
        alert(result.error.message);
      }
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
});