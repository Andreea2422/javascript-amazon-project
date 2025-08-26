import { Cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from ".././utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  const cart = new Cart('cart-oop');
  if (cart.cartItems.length === 0) {
    document.querySelector('.js-order-summary').innerHTML = '<p>Your cart is empty.</p>';
    return;
  }
  
  cart.displayCheckoutItemCount();

  let cartSummaryHTML = '';
  cart.cartItems.forEach(item => {
    const productId = item.id;
    const product = getProduct(productId);
    const deliveryOptionId = item.deliveryOptionId;
    let deliveryOption = getDeliveryOption(deliveryOptionId);
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const formattedDeliveryDate = deliveryDate.format('dddd, MMMM D');
    if (product) {
      cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${product.id}">
        <div class="delivery-date">
          Delivery date: ${formattedDeliveryDate}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${product.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${product.name}
            </div>
            <div class="product-price">
              ${product.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${product.id}">
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
              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${product.id}" data-product-id="${product.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(product, item)}
          </div>
        </div>
      </div>
      `;
    }
  });

  function deliveryOptionsHTML(product, item) {
    let html = '';

    deliveryOptions.forEach(option => {
      const today = dayjs();
      const deliveryDate = today.add(option.deliveryDays, 'days');
      const formattedDeliveryDate = deliveryDate.format('dddd, MMMM D');
      const priceString = option.price === 0 ? 'FREE Shipping' : `$${formatCurrency(option.price)}`;
      const isChecked = option.id === item.deliveryOptionId ? 'checked' : '';

      html += `
      <div class="delivery-option js-delivery-option" data-product-id="${product.id}" data-delivery-option-id="${option.id}">
        <input type="radio" ${isChecked}
          class="delivery-option-input"
          name="delivery-option-${product.id}">
        <div>
          <div class="delivery-option-date">
            ${formattedDeliveryDate}
          </div>
          <div class="delivery-option-price">
            ${priceString}
          </div>
        </div>
      </div>
      `
    });
    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach(deleteLink => {
    deleteLink.addEventListener('click', () => {
      const productId = deleteLink.dataset.productId;
      console.log('Delete item with product id', productId);
      cart.deleteFromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
      console.log('Cart after deletion:', cart);
      renderPaymentSummary();
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
      cart.updateQuantityInCart(productId, newQuantity);
      document.querySelector(`.js-cart-item-container-${productId} .quantity-label`).innerHTML = newQuantity;
      renderPaymentSummary();
  }

    saveLink.addEventListener('click', saveQuantity);
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        saveQuantity();
      }
    });

  });

  document.querySelectorAll('.js-delivery-option').forEach(option => {
    option.addEventListener('click', () => {
      const { productId, deliveryOptionId } = option.dataset;
      console.log('Update delivery option for product id ', productId, ' to delivery option id ', deliveryOptionId);
      cart.updateDeliveryOption(productId, deliveryOptionId);
      document.querySelectorAll(`.js-delivery-option[data-product-id="${productId}"]`).forEach(opt => {
        opt.querySelector('input').checked = false;
      });
      option.querySelector('input').checked = true;
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

