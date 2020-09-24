if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripe = require('stripe')(stripeSecretKey)
const express = require('express')
const router = express.Router();

router.get('/',(req,res) => 
    res.render('checkout-form', {
      stripePublicKey: stripePublicKey,
    }));

router.post('/',(req,res) => {

})

router.post("/create-checkout-session", async (req, res) => {
  try{
     var customer_detail = req.body;
      console.log('This is a customer:', customer_detail);
      const customer = await stripe.customers.create({
      description: 'My First Test Customer',
      email: 'utkarshgupta1309@gmail.com' , 
      name: 'Utkarsh Gupta',
      phone: '8269555164',
      shipping: {
        address: {
          city: 'San Francisco',
          country: 'USA',
          line1: 'Street 1300, PO BOX 98',
          line2: 'Unit 28',
          postal_code: '545645',
          state: 'California'
        },
        name: 'U2',
        phone: '8602993518'
      }
    })
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 4000,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 4000,
          },
          quantity: 3,
        },
      ],
      customer: customer.id,
      mode: "payment",
      success_url: "https://google.com",
      cancel_url: "https://gmail.com",
  });

  res.json({ id: session.id });
}
  catch(error){
    console.log(error);
  }
});
module.exports = router;