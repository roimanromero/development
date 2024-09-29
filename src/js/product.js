// product.js

import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import { getParam } from './utils.mjs';

const productId = getParam('product');
const dataSource = new ProductData('tents');

const product = new ProductDetails(productId, dataSource);
product.init();

console.log(dataSource.findProductById(productId));

// Función para agregar producto al carrito
function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart");

  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

// Manejador de eventos para el botón "Add to Cart"
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Asegurarse de que el DOM esté cargado antes de agregar el listener
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
});
