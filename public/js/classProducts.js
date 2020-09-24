class Products{
    async getProducts(){
      try {
            
            //get product type from localstorage: as user clicks on the category, the product type saves in local storage
            let contentful = await client.getEntries({
              content_type: type,
            });
            //local data
            // let result = await fetch('products.json');
            // let data = await result.json()
            //---end of local dATA-----
            console.log(type)
            let products = contentful.items;
            let productsJson = JSON.stringify(products)
            console.log(typeof productsJson);

            products = products.map(item =>{
              let num=0
              const {title,price} = item.fields;
              const {id} = item.sys;
              var imageArray = item.fields.images;
              let image = imageArray[0].fields.file.url
              return { title, price, id,image};
            });
   
   
            return products
      } catch (error) {
        console.log(error)
      }
   
   }

   displayProducts(products){
    let result = "";
    products.forEach(product => {
      result += `
      <a class="product" href= "soaps/${product.id}">
        <div class="img-container">
          <img src=${product.image}  alt="" class="product-img">
        </div>
        <h3>${product.title}</h3>
        <h4>Price: $${product.price}</h4>
        <div class = "btn-div">
      
        </div>
      </a>
      `;
    });
    productsDOM.innerHTML = result;
  }
   }


   