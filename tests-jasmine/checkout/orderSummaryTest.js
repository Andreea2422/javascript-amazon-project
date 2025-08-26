import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadCart, cart } from "../../data/cart.js";


describe('Test Suite: renderOrderSummary', () => {
  const productIdToRemove = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="checkout-header-middle-section">
        Checkout (<a class="return-to-home-link js-item-count"
          href="amazon.html"></a>)
      </div>
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => { return JSON.stringify([
      {
        id: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      },{
        id: productId2,
        quantity: 7,
        deliveryOptionId: '2'
      }
    ]); });
    loadCart();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('renders the order summary correctly', () => {
    renderOrderSummary();
    expect(document.querySelector('.js-item-count').innerHTML).toBe('8 items');
    expect(document.querySelector('.js-order-summary').innerHTML).toContain('Delivery date:');
    expect(document.querySelectorAll('.cart-item-container').length).toBe(2);
    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 1');
    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 7');
  });

  it('removes a product', () => {
    renderOrderSummary();
    expect(document.querySelector(`.js-delete-link-${productIdToRemove}`).click());
    expect(document.querySelectorAll('.cart-item-container').length).toBe(1);
    expect(document.querySelector('.js-item-count').innerHTML).toBe('1 item');
    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).toBeNull();
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe(productId1);
  });
  
});
