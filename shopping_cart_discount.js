"use strict";
let discount = 0.1;
const cart = {
    items: [
      {name:"Computer", category:"tech", price: 13000},
      {name:"Bounty", category:"candy", price: 900},
      {name:"Mouse", category:"tech", price: 2550},
      {name:"shirt", category:"clothes", price: 1990},
    ],
    total: 0
}
function ShoppingCart(cart,discount_code)
{
    const return_cart = {items:undefined,total:0}
    if(discount_code != "tskoli"){return "this is not a valid discount code"}
    const discount_cart = cart.items.map(n => {if(n.category == "tech"){n.price *= 1-discount}return n});
    return_cart.items = discount_cart;
    discount_cart.forEach(item => return_cart.total += item.price);
    return return_cart;
}
console.log(ShoppingCart(cart,"tskoli"));