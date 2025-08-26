import { Cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from ".././utils/money.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";


export function renderPaymentSummary() {
  let productTotal = 0;
  let shippingTotal = 0;
  const cart = new Cart('cart-oop');

  cart.cartItems.forEach(item => {
    const product = getProduct(item.id);
    productTotal += product.priceCents * item.quantity;

    const deliveryOption = getDeliveryOption(item.deliveryOptionId);
    shippingTotal += deliveryOption.price;
  });

  console.log('Product Total:', productTotal);
  console.log('Shipping Total:', shippingTotal);
  const totalBeforeTax = productTotal + shippingTotal;
  console.log('Total Before Tax:', totalBeforeTax);

  const taxRate = 0.1; // 10% tax
  const taxAmount = Math.round(totalBeforeTax * taxRate);
  const finalTotal = totalBeforeTax + taxAmount;
  console.log('Final Total:', finalTotal);



  const paymentSummaryHTML = 
  `
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (${cart.getCartQuantity()}):</div>
    <div class="payment-summary-money">$${formatCurrency(productTotal)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatCurrency(shippingTotal)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCurrency(taxAmount)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatCurrency(finalTotal)}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>
  `; 

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}