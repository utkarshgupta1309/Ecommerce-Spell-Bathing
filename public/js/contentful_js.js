// main.js

var client = contentful.createClient({
    space: 'jz5riq66hd21',
    accessToken: '3vIQ9gL78pRB4u9UAsoMMGonAwT63TS5j5kp6oOWVd0'
  })

class Products{
    async getProducts(){
      try {
   
   
            let contentful = await client.getEntries({
              content_type: "soaps"
            });
            //local data
            // let result = await fetch('products.json');
            // let data = await result.json()
            //---end of local dATA-----
   
            let products = contentful.items;
   
            products = products.map(item =>{
              const {title,price} = item.fields;
              const {id} = item.sys;
              const image = item.fields.image.fields.file.url;
              return { title, price, id, image};
            });
            return products
      } catch (error) {
        console.log(error)
      }
   
   }
   }
const products = new Products();   
function displayProducts(products){
    console.log(products);
    let result = "";
    products.forEach(product => {
      result += `
      <article class="product">
        <div class="img-container">
          <img src=${product.image}  alt="" class="product-img">
          <button class="bag-btn" data-id = ${product.id}>Add to Cart</button>
        </div>
        <h3>${product.title}</h3>
        <h4>$${product.price}</h4>
      </article>
      `;
    });
    productsDOM.innerHTML = result;
  }
products.getProducts().then(displayProducts(products));
// let products = contentful_products.items;
// products = products.map(item =>{
//     const {title,price} = item.fields;
//     const {id} = item.sys;
//     const image = item.fields.image.fields.file.url;
//     return { title, price, id, image};
//   });

// function displayProducts(products){
//     console.log(products);
//     let result = "";
//     products.forEach(product => {
//       result += `
//       <article class="product">
//         <div class="img-container">
//           <img src=${product.image}  alt="" class="product-img">
//           <button class="bag-btn" data-id = ${product.id}>Add to Cart</button>
//         </div>
//         <h3>${product.title}</h3>
//         <h4>$${product.price}</h4>
//       </article>
//       `;
//     });
//     productsDOM.innerHTML = result;
//   }

// displayProducts(products)  
