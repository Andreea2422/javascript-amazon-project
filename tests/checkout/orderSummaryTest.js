import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { Cart } from "../../data/cart-class.js";
import { loadProductsFetch } from "../../data/products.js";

describe('Test Suite: renderOrderSummary', () => {
  const productIdToRemove = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  let cart;
  let store;

  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });
  });

  beforeEach(() => {
    // Fake localStorage implementation
    store = {};
    spyOn(localStorage, 'getItem').and.callFake((key) => store[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key, value) => {
      store[key] = value.toString();
    });
    spyOn(localStorage, 'clear').and.callFake(() => {
      store = {};
    });

    // Reset container in DOM
    document.querySelector('.js-test-container').innerHTML = `
      <div class="checkout-header-middle-section">
        Checkout (<a class="return-to-home-link js-item-count"
          href="amazon.html"></a>)
      </div>
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    // Create a new cart and preload with items
    cart = new Cart('cart-oop-test');
    cart.cartItems = [
      { productId: productId1, quantity: 1, deliveryOptionId: '1' },
      { productId: productId2, quantity: 7, deliveryOptionId: '2' }
    ];
    // Force save so our mock store is initialized
    localStorage.setItem('cart-oop-test', JSON.stringify(cart.cartItems));
  });

  afterEach(() => {
    // Clear the cart and the DOM after each test
    cart = null;
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('renders the order summary correctly', () => {
    renderOrderSummary(cart);

    expect(document.querySelector('.js-item-count').innerHTML).toBe('8 items');
    expect(document.querySelector('.js-order-summary').innerHTML)
      .toContain('Delivery date:');
    expect(document.querySelectorAll('.cart-item-container').length).toBe(2);
    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText)
      .toContain('Quantity: 1');
    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText)
      .toContain('Quantity: 7');

    // Verify store content
    expect(JSON.parse(store['cart-oop-test']).length).toBe(2);
  });

  it('removes a product', () => {
    renderOrderSummary(cart);

    // Simulate clicking delete
    document.querySelector(`.js-delete-link-${productIdToRemove}`).click();

    // DOM should update
    expect(document.querySelectorAll('.cart-item-container').length).toBe(1);
    expect(document.querySelector('.js-item-count').innerHTML).toBe('1 item');
    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).toBeNull();

    // Cart object should update
    expect(cart.cartItems.length).toBe(1);
    expect(cart.cartItems[0].productId).toBe(productId1);

    // Store should update
    const savedCart = JSON.parse(store['cart-oop-test']);
    expect(savedCart.length).toBe(1);
    expect(savedCart[0].productId).toBe(productId1);
  });
});
