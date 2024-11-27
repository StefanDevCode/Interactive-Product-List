import { products } from "../Data/Products.js";
import { cartProducts } from "../Data/cartProducts.js";
import { addToCart, displayCart } from "./cart.js";
let displayProducts = "";
const productListGrid = document.querySelector(".js-gridProductList");

function displayProductsOnPage() {
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
  button.addEventListener("click", () => {
    let productId = button.dataset.productId;
    addToCart(productId);
    displayCart();
  });
}
