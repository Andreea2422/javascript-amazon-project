class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.cartItems = [];
    this.#loadCart();
  }

  #loadCart() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  #saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let itemFound = false;
    this.cartItems.forEach(item => {
      if (item.id === productId) {
        item.quantity += 1;
        itemFound = true;
      }
    });

    if (!itemFound) {
      this.cartItems.push({
        id: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
    this.#saveToLocalStorage();
  }

  cartItemCount() {
    let cartQuantity = 0;
    this.cartItems.forEach(item => {
      cartQuantity += item.quantity;
    });
    this.#saveToLocalStorage();
    return cartQuantity;
  }

  getCartQuantity() {
    return this.cartItemCount();
  }

  updateCartQuantity() {
    const cartQuantity = this.cartItemCount();
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

    console.log(this.cartItems);
    console.log(`Total items in cart: ${cartQuantity}`);
  }

  displayCheckoutItemCount() {
    const cartQuantity = this.cartItemCount();
    document.querySelector('.js-item-count').innerHTML = `${cartQuantity} item${cartQuantity !== 1 ? 's' : ''}`;
  }

  deleteFromCart(productId) {
    const itemIndex = this.cartItems.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
      this.cartItems.splice(itemIndex, 1);
    }
    this.displayCheckoutItemCount();
  }

  updateQuantityInCart(productId, newQuantity) {
    const cartItem = this.cartItems.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity = parseInt(newQuantity, 10);
    }
    this.displayCheckoutItemCount();
  }

  updateDeliveryOption(productId, newDeliveryOptionId) {
    const cartItem = this.cartItems.find(item => item.id === productId);
    if (cartItem) {
      cartItem.deliveryOptionId = newDeliveryOptionId;
    }
    this.#saveToLocalStorage();
  }


}

const cart = new Cart('cart-oop');
const businessCart = new Cart('business-cart');

console.log(cart);
console.log(businessCart);