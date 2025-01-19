import { products } from "../Data/Products.js";
import { cartProducts } from "../Data/cartProducts.js";
import { addToCart, displayCart, removeFromCart } from "./cart.js";
let displayProducts = "";
const productListGrid = document.querySelector(".js-gridProductList");

export function displayProductsOnPage() {
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
}

displayProductsOnPage();

const addToCartButtons = document.querySelectorAll(".addToCartBtn");

for (let button of addToCartButtons) {
  button.addEventListener("click", function () {
    let productId = this.dataset.productId;
    addToCart(productId);
    displayCart(this);
    addToCartBtnStyle(this, productId);
  });
}

export function addToCartBtnStyle(button, productId) {
  let matchingItem = cartProducts.find(
    (cartProduct) => cartProduct.id === productId
  );
  button.innerHTML = "";
  button.classList.add("addToCartBtnClicked");
  let subtractBtn = document.createElement("div");
  subtractBtn.innerHTML = "-";
  subtractBtn.classList.add("appendSubtractBtn");
  let additionBtn = document.createElement("div");
  additionBtn.innerHTML = "+";
  additionBtn.classList.add("appendAdditionBtn");
  let appendQuantity = document.createElement("p");
  appendQuantity.innerHTML = matchingItem.quantity;
  appendQuantity.classList.add("appendQuantity");
  button.append(subtractBtn, appendQuantity, additionBtn);
  subtractBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    console.log(productId);
    console.log(matchingItem);
    if (matchingItem) {
      if (matchingItem.quantity > 1) {
        matchingItem.quantity--;
        appendQuantity.innerHTML = matchingItem.quantity;
        displayCart(button);
      } else if (matchingItem.quantity === 1) {
        removeFromCart(productId, button);
        displayCart(button);
        button.classList.remove("addToCartBtnClicked");
        button.classList.add("addToCartBtn");
        button.innerHTML = `<img
                    src="Product-images/carbon_shopping-cart-plus.png"
                    alt=""
                    class="cartImage"
                  />
                  Add to Cart`;
      }
    }
  });
  additionBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    console.log(productId);
    console.log(matchingItem);
    if (matchingItem) {
      matchingItem.quantity++;
      appendQuantity.innerHTML = matchingItem.quantity;
      displayCart(button);
    }
  });
}
