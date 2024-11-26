import { products } from "../Data/Products.js";
import { cartProducts } from "../Data/cartProducts.js";
let displayProducts = "";
let cartSection = document.querySelector(".cart");
let productListGrid = document.querySelector(".js-gridProductList");
let cartProductsContainer = document.querySelector(".flexNewProducts");
let totalCartQuantity = document.querySelector(".cartInfo");
let totalCartPrice = document.querySelector(".totalPrice");
let existingCart = document.querySelector(".cartItems");
let emptyCart = document.querySelector(".emptyCart");
let containerEmptyImage = document.querySelector(".containerForEmptyImage");
let emptyCartText = document.querySelector(".emptyCartText");

for (let product of products) {
  let generateHtml = `<div class="productItem">
            <div class="productImageContainer">
              <img
                src="${product.image}"
                alt="Waffle with berries image"
                class="productImage"
              />
              <button class="addToCartBtn" data-product-id =${product.id} >
                <img
                  src="Product-images/carbon_shopping-cart-plus.png"
                  alt=""
                  class="cartImage"
                />
                Add to Cart
              </button>
            </div>
            <div class="productInfo">
              <p class="productName">${product.name}</p>
              <p class="nameDescription">${product.nameDescription}</p>
              <p class="productPrice">$${(product.price / 100).toFixed(2)}</p>
            </div>
          </div>`;
  displayProducts += generateHtml;
}

productListGrid.innerHTML = displayProducts;

function addToCart(productId) {
  let matchingItem;
  for (let cartProduct of cartProducts) {
    if (cartProduct.id === productId) {
      matchingItem = cartProduct;
    }
  }
  if (!matchingItem) {
    cartProducts.push({
      id: productId,
      quantity: 1,
    });
  } else {
    matchingItem.quantity++;
  }
}

let addToCartButtons = document.querySelectorAll(".addToCartBtn");

function displayCart() {
  let displayC = "";
  let matchingItem;
  for (let cartProduct of cartProducts) {
    for (let product of products) {
      if (cartProduct.id === product.id) {
        matchingItem = product;
      }
    }

    let generateHtmlCart = `<div class="cartItemContainer">
      <div class="cartItem">
        <p class="cartProductName">${matchingItem.name}</p>
        <p class="cartProductSummary">
          <span class="cartProductQuantity">${cartProduct.quantity}</span>
          <span class="cartUnitPrice">&commat; &#36; ${(
            matchingItem.price / 100
          ).toFixed(2)}</span>
          <span class="cartProductTotalPrice">&#36; ${(
            (matchingItem.price / 100) *
            cartProduct.quantity
          ).toFixed(2)}</span>
        </p>
      </div>
      <div class="closeBtnContainer">
        <span class="closeBtn" data-product-id = ${
          matchingItem.id
        }> &times;</span>
      </div>
    </div>`;

    displayC += generateHtmlCart;
  }
  if (matchingItem) {
    cartProductsContainer.innerHTML = displayC;
    emptyCart.remove();
    existingCart.classList.add("cartItemsExists");
  }

  totalCartQuantity.innerHTML = `Your Cart (${calculateQuantity()})`;
  totalCartPrice.innerHTML = `&#36; ${calculateTotal().toFixed(2)}`;
  let closeButton = document.querySelectorAll(".closeBtn");
  for (let btn of closeButton) {
    btn.addEventListener("click", () => {
      removeFromCart(btn.dataset.productId);
      displayCart();
    });
  }
}

function calculateQuantity() {
  let cartQuantity = 0;
  for (let item of cartProducts) {
    cartQuantity += item.quantity;
  }

  return cartQuantity;
}

function calculateTotal() {
  let total = 0;
  let matchingItem;
  for (let cartProduct of cartProducts) {
    for (let product of products) {
      if (cartProduct.id === product.id) {
        matchingItem = product;
      }
    }
    total += (matchingItem.price / 100) * cartProduct.quantity;
  }
  return total;
}

for (let button of addToCartButtons) {
  button.addEventListener("click", () => {
    let productId = button.dataset.productId;
    addToCart(productId);
    displayCart();
  });
}

function removeFromCart(productId) {
  let index = cartProducts.findIndex((item) => item.id === productId);
  if (index != -1) {
    cartProducts.splice(index, 1);
  }
  if (cartProducts.length === 0) {
    existingCart.classList.remove("cartItemsExists");
    /*existingCart.classList.add("cartItems");*/
    emptyCart.append(containerEmptyImage, emptyCartText);
    cartSection.append(emptyCart);
    emptyCart.classList.add("emptyCart");
  }
}
