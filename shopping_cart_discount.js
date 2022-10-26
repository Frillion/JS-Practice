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
const discount_cart = cart.items.map(n => {if(n.category == "tech"){n.price *= 1-discount}return n});
console.log(discount_cart);