class UI{

    //getSingleBagButton for the products.html page
    getSingleBagButton(){
        const button = document.getElementById("bags-btn");
        console.log(button);
        let id = button.dataset.id;
        button.addEventListener("click",(event) =>{
            // get product from products
            let cartItem = {...Storage.getProducts(id),
            amount :1};
            console.log(cartItem)
            //render another page
                
            // add product to the cart
            cart = [...cart,cartItem];
            //save cart in local storage
            Storage.saveCart(cart);
            //save cart values
            this.setCartValues(cart);
            //display cart items
            this.addCartItem(cartItem)
            // show the cart
            this.showCart();
      });
    }


    getBagButtons(){
      const buttons = [...document.querySelectorAll(".bag-btn")];
      buttonsDOM = buttons;
      buttons.forEach(button =>{
        let id = button.dataset.id;
        let inCart = cart.find(item => item.id === id);
          button.addEventListener("click",(event) =>{
            // get product from products
            let cartItem = {...Storage.getProducts(id),
            amount :1};
            console.log(cartItem)
            //render another page
  
            // add product to the cart
            cart = [...cart,cartItem];
            //save cart in local storage
            Storage.saveCart(cart);
            //save cart values
            this.setCartValues(cart);
            //display cart items
            this.addCartItem(cartItem)
            // show the cart
            this.showCart();
      });
    });
  }
      setCartValues(cart){
        let tempTotal = 0;//cart total
        let itemsTotal = 0;
        cart.map(item => {
          tempTotal += item.price * item.amount;
          itemsTotal += item.amount;
        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        // cartItems.innerText = itemsTotal;//Graphic representation of number of items
      }
      addCartItem(item){
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
        <img class = "cart-image" src=${item.image} alt="">
        <div>
          <h4>${item.title}</h4>
          <h5>$${item.price}</h5>
          <span class = "remove-item" data-id = ${item.id}>remove</span>
        </div
        <div class = cart-logic>
          <i class="fa fa-chevron-up" aria-hidden="true" data-id = ${item.id}></i>
          <p class="item-amount">${item.amount}</p>
          <i class="fa fa-chevron-down" aria-hidden="true" data-id = ${item.id}></i>
        </div>
        `;
        cartContent.appendChild(div);
      }
      showCart(){
        cartOverlay.classList.add('transparentBcg');
        cartDOM.classList.add('showCart');
      }
      setupAPP(){
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener('click',this.showCart);
        console.log("click cart");
        closeCartBtn.addEventListener("click",this.hideCart);
      }
      populateCart(cart){
        cart.forEach((item => this.addCartItem(item)));
      }
      hideCart(){
        cartOverlay.classList.remove("transparentBcg");
        cartDOM.classList.remove('showCart');
      }
      cartLogic(){
        //clear cart btn logic
        clearCartBtn.addEventListener('click',() =>{
          this.clearCart();
        });
        //cart funtionality
        cartContent.addEventListener('click',event => {
          if(event.target.classList.contains('remove-item'))
          {
            let removeItem = event.target;
            let id = removeItem.dataset.id;
            cartContent.removeChild(removeItem.parentElement.parentElement);
            this.removeItem(id);
          }
          else if (event.target.classList.contains('fa-chevron-up')) {
            let addAmount = event.target;
            let id = addAmount.dataset.id;
            let tempItem = cart.find(item => item.id === id);
            tempItem.amount = tempItem.amount + 1;
            Storage.saveCart(cart);
            this.setCartValues(cart);
            addAmount.nextElementSibling.innerText = tempItem.amount;
          }
          else if (event.target.classList.contains('fa-chevron-down'))
          {
            let lowerAmount = event.target;
            let id = lowerAmount.dataset.id;
            let tempItem = cart.find(item => item.id === id);
            tempItem.amount = tempItem.amount - 1;
            if(tempItem.amount > 0)
            {
              Storage.saveCart(cart);
              this.setCartValues(cart);
              lowerAmount.previousElementSibling.innerText = tempItem.amount;
            }
            else {
              cartContent.removeChild(lowerAmount.parentElement.parentElement);
              this.removeItem(id);
            }
  
          }
        });
      }
      clearCart(){
        let cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id));
        console.log(cartContent.children);
        while(cartContent.children.length>0){
          cartContent.removeChild(cartContent.children[0]);
        }
        this.hideCart();
      }
      removeItem(id){
        cart = cart.filter(item => item.id !== id);
        this.setCartValues(cart);
        Storage.saveCart(cart);
        // let button = this.getSingleButton(id);
        // button.disabled = false;
        // button.innerHTML = `<i class = "fas fa-shopping-cart"></i>add to cart`;
      }
      getSingleButton(id){
        return buttonsDOM.find(button => button.dataset.id === id);
      }
  }