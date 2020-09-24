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


const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "pvs0glpvlo4v",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "0_Z8Dnh-2i5Vs7LymEku--jFoA-sVfFuLZPejKFe4Wc"
  });

async function getProducts(){
    let item = await client.getEntry(itemId)
    console.log(item)
let title = item.fields.title
let price = item.fields.price
let id = item.sys.id
let imageArray = item.fields.images;
let images = [];
const rawRichTextField = item.fields.description;
var description = documentToHtmlString(rawRichTextField);

//Populate Image array
for(j=0; j<imageArray.length; j++){
  images[j] = imageArray[j].fields.file.url
};

singleProduct = document.querySelector(".product-details")
const div = document.createElement('div');
div.classList.add('product');
div.innerHTML = `
<h3 class="title">${title}</h3>
<h4 class = "price">Price: $${price}</h4>
<button class="bags-btn" id="bags-btn" data-id = ${id}>Add to Cart</button>
<h2>Product Description:</h2>
<div class = description>${description}</div>
`;
singleProduct.appendChild(div);

function setSmallImgs(){
  var smallImgContainer = document.getElementById('small-img-div');
  for (var i = 0; i < images.length; i++) {
  // create the image element
  var imageElement = document.createElement('img');
  imageElement.setAttribute('src', images[i]);
  imageElement.setAttribute('id','small-img');
  imageElement.setAttribute('onclick', "myFuntion(this)");
  imageElement.onclick = function() {myFuntion(this);};
  // append the element to the container
  smallImgContainer.appendChild(imageElement);
  }

  function myFuntion(smallImg){
    var bigImg = document.getElementById('big-img');
    smallSrc = smallImg.src
    bigImg.setAttribute('src',smallSrc)
};
};

function setBigImg(){
  var bigImgContainer = document.getElementById('big-img-div');
  var bigImageElement = document.createElement('img');
  bigImageElement.setAttribute('src', images[0]);
  console.log(images[0])
  bigImageElement.setAttribute('id', 'big-img');
  bigImgContainer.appendChild(bigImageElement);
};

setSmallImgs();
setBigImg();
};


function swapImages(){
  var imageElement = document.getElementById('small-img')  
  
};


function getScrips(){
    function load(script) {
      document.write('<'+'script src="/js/'+script+'" type="text/javascript"><' + '/script>');
    }
    load("classUi.js");
    load("classStorage.js");
  
  };

getScrips();  



    document.addEventListener('DOMContentLoaded',()=>{
    console.log('dom loaded');    
    const ui = new UI();
    const storage = new Storage();
    getProducts().then( (productslist) => {
        cart = storage.getCart();
        console.log(cart) 
        ui.getSingleBagButton(productslist);
        swapImages();
        ui.cartLogic();
        
    })

    })




     


