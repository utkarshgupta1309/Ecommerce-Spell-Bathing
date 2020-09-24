if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const stripe = require('stripe')(stripeSecretKey)
const contentful = require('contentful')
const fs = require('fs');

const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "pvs0glpvlo4v",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "0_Z8Dnh-2i5Vs7LymEku--jFoA-sVfFuLZPejKFe4Wc"
  });

   async function getProducts(){
    try {
          
          //get product type from localstorage: as user clicks on the category, the product type saves in local storage
          let contentful = await client.getEntries({
          });
          //local data
          // let result = await fetch('products.json');
          // let data = await result.json()
          //---end of local dATA-----
          let products = contentful.items;          
          products = products.map(item =>{
            let num=0
            const {title,price} = item.fields;
            const {id} = item.sys;
            // var imageArray = item.fields.images;
            // var image = imageArray.fields.file.url;
            // let image = imageArray.forEach( (image) => {

            // })
            return { title, price, id};
          });
          let productsJson = JSON.stringify(products)
          fs.writeFile("output.json", productsJson, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
         
            console.log("JSON file has been saved.");
        });
        }
       catch (error) {
        console.log(error)
      }

  }  

const express = require('express')
const router = express.Router();

router.get('/',(req,res) => 
    res.render('payment'));

router.post('/',(req,res) => {
  console.log(req.body);
  res.end()
})   

router.post("/create-checkout-session", async (req, res) => {
  try{
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


router.get('/checkout',(req,res) => {
  // getProducts();
      fs.readFile('output.json', function (error,data) {
        if(error){
          console.log(error);
        }
        else{
          res.render('checkout-form',{
            stripePublicKey: stripePublicKey,
            cartItems: JSON.parse(data),
          });
        }
      }); 
});

module.exports = router;