const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "pvs0glpvlo4v",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "0_Z8Dnh-2i5Vs7LymEku--jFoA-sVfFuLZPejKFe4Wc"
});


//variables
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center-div");
const btns = document.querySelector(".bag-btn");
//Empty array rn, This is the cart tho
let cart = [];
//buttons
let buttonsDOM = [];


(function(){
  function load(script) {
    document.write('<'+'script src="/js/'+script+'" type="text/javascript"><' + '/script>');
  }

  load("classProducts.js");
  load("classUi.js");
  load("classStorage.js");

})();

document.addEventListener("DOMContentLoaded",()=>{
  const ui = new UI();
  const products = new Products();
  //setup application
  ui.setupAPP();
  //get all Products
  products.getProducts().then(productslist => {products.displayProducts(productslist)
  Storage.saveProducts(productslist);
}).then(() => {
  ui.getBagButtons();
  ui.cartLogic();
});

});
