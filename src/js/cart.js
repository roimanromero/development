import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  // Obtener los artículos del carrito desde localStorage
  let cartItems = getLocalStorage("so-cart");

  // Inicializar un array vacío si no hay items
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  // Si el carrito está vacío, mostrar un mensaje
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>No items added yet.</p>";
    return;
  }

  // Renderizar los ítems del carrito
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

// Template para mostrar un producto en el carrito
function cartItemTemplate(item) {
  const color = item.Colors && item.Colors.length > 0 ? item.Colors[0].ColorName : "No color";
  return `<li class="cart-card divider">
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
}

// Llamar a la función para renderizar el carrito al cargar la página
renderCartContents();
