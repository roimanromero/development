import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import { setLocalStorage, getParam } from './utils.mjs';
const dataSource = new ProductData('tents');
const productId = getParam('product');

const product = new ProductDetails(productId, dataSource);
product.init();

console.log(dataSource.findProductById(productId));

//i changed this function to instead append new item to cart rather than overwriting the items.
function addProductToCart(product) {
  //get current cart item from localStorage
  let cartItems = getLocalStorage("so-cart");

  //check if cartItem is an array
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  //add the new product to the cart array
  cartItems.push(product);

  //save the updated cart back to localStorage
  setLocalStorage("so-cart", cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);