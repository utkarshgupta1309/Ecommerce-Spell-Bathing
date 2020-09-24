const cartString = localStorage.getItem("cart");
console.log('This is cartString', cartString);
const cart = JSON.parse(cartString);
console.log('This is cart', cart);
console.log(typeof cart);
let cartContent = document.getElementById('order-summary')
cart.forEach( (item) => {
    const div = document.createElement('div');
div.classList.add('cart-item');
    div.innerHTML = `
<img class = "cart-image" src=${item.image} style = "width:100px;" alt="">
<div>
    <h4>${item.title}</h4>
    <h5>$${item.price}</h5>
`;
cartContent.appendChild(div);
})