class Storage{
    static saveProducts(products){
      localStorage.setItem("products",JSON.stringify(products));
    }
    static getProducts(id){
      let products = JSON.parse(localStorage.getItem('products'));
      return products.find(product =>product.id === id);
    }
    static saveCart(){
      localStorage.setItem('cart',JSON.stringify(cart))
    }
    static getCart(){
      return localStorage.getItem('cart')? JSON.parse
      (localStorage.getItem('cart')) : [];
    }   
        getCart(){
        return localStorage.getItem('cart')? JSON.parse
        (localStorage.getItem('cart')) : [];
      }
  
    
  }