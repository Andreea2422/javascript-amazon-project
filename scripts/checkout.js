import { cart, deleteFromCart, displayCheckoutItemCount, updateQuantityInCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

console.log('Cart:', cart);
displayCheckoutItemCount();
let cartSummaryHTML = '';
cart.forEach(item => {
  const productId = item.id;

  const product = products.find(p => p.id === productId);
  if (product) {
    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${product.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${product.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${item.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${product.id}">
              Update
            </span>
            <input id="update-quantity-input-${product.id}" class="update-quantity-input" value="${item.quantity}" min="1" max="10">
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${product.id}">
              Save
            </span>
            <span> | </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${product.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${product.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${product.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${product.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }
});


document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach(deleteLink => {
  deleteLink.addEventListener('click', () => {
    const productId = deleteLink.dataset.productId;
    console.log('Delete item with product id', productId);
    deleteFromCart(productId);
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    console.log('Cart after deletion:', cart);
  });
});

document.querySelectorAll('.js-update-link').forEach(updateLink => {  
  updateLink.addEventListener('click', () => {
    const productId = updateLink.dataset.productId;
    console.log('Update item with product id', productId);
    document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
  });
});

document.querySelectorAll('.js-save-link').forEach(saveLink => {
  const productId = saveLink.dataset.productId;
  const input = document.getElementById(`update-quantity-input-${productId}`);

  function saveQuantity() {
    document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
    const newQuantity = input.value;
    if (newQuantity < 1 || newQuantity > 10) {
      alert('Please enter a quantity between 1 and 10');
      return;
    }
    console.log('Save item with product id ', productId, 'with new quantity ', newQuantity);
    updateQuantityInCart(productId, newQuantity);
    document.querySelector(`.js-cart-item-container-${productId} .quantity-label`).innerHTML = newQuantity;
  }

  saveLink.addEventListener('click', saveQuantity);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      saveQuantity();
    }
  });
});