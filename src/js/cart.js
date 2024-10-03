import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  // Get cart items from localStorage
  let cartItems = getLocalStorage("so-cart");

  // If it's not an array, initialize an empty one
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  // Handle empty cart case
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  // Generate HTML for each cart item
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

// Template to display a cart item
function cartItemTemplate(item) {
  const color = item.Colors && item.Colors.length > 0 ? item.Colors[0].ColorName : "No color";
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image || "default-image.jpg"}"
        alt="${item.Name || "Unnamed Product"}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name || "Unnamed Product"}</h2>
    </a>
    <p class="cart-card__color">${color}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice || "0.00"}</p>
  </li>`;

  return newItem;
}

// Call the function to render the cart on page load
renderCartContents();
