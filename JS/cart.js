import { products } from "../Data/Products.js";
import { cartProducts } from "../Data/cartProducts.js";
import { addToCartBtnStyle, displayProductsOnPage } from "./Deserts.js";
const cartSection = document.querySelector(".cart");
const cartProductsContainer = document.querySelector(".flexNewProducts");
const totalCartQuantity = document.querySelector(".cartInfo");
const totalCartPrice = document.querySelector(".totalPrice");
const existingCart = document.querySelector(".cartItems");
const emptyCart = document.querySelector(".emptyCart");
const containerEmptyImage = document.querySelector(".containerForEmptyImage");
const emptyCartText = document.querySelector(".emptyCartText");
export function addToCart(productId) {
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

export function displayCart(addButton) {
  console.log(addButton);
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
      displayCart(addButton);
      let allAddToCartClickedBtns = document.querySelectorAll(
        ".addToCartBtnClicked"
      );
      console.dir(allAddToCartClickedBtns);
      for (let addButtonCliked of allAddToCartClickedBtns) {
        if (addButtonCliked.dataset.productId === btn.dataset.productId) {
          addButtonCliked.classList.remove("addToCartBtnClicked");
          addButtonCliked.classList.add("addToCartBtn");
          addButtonCliked.innerHTML = `<img
                        src="Product-images/carbon_shopping-cart-plus.png"
                        alt=""
                        class="cartImage"
                      />
                      Add to Cart`;
        }
      }
      displayCart();
    });
  }
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

export function removeFromCart(productId, button) {
  let index = cartProducts.findIndex((item) => item.id === productId);
  if (index != -1) {
    cartProducts.splice(index, 1);
  }
  if (cartProducts.length === 0) {
    existingCart.classList.remove("cartItemsExists");
    emptyCart.append(containerEmptyImage, emptyCartText);
    cartSection.append(emptyCart);
    emptyCart.classList.add("emptyCart");
  }
}

function calculateQuantity() {
  let cartQuantity = 0;
  for (let item of cartProducts) {
    cartQuantity += item.quantity;
  }

  return cartQuantity;
}
