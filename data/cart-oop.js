function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadCart: function() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    },

    saveToLocalStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

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
      this.saveToLocalStorage();
    },


    cartItemCount() {
      let cartQuantity = 0;
      this.cartItems.forEach(item => {
        cartQuantity += item.quantity;
      });
      this.saveToLocalStorage();
      return cartQuantity;
    },

    getCartQuantity() {
      return this.cartItemCount();
    },

    updateCartQuantity() {
      const cartQuantity = this.cartItemCount();
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

      console.log(this.cartItems);
      console.log(`Total items in cart: ${cartQuantity}`);
    },

    displayCheckoutItemCount() {
      const cartQuantity = this.cartItemCount();
      document.querySelector('.js-item-count').innerHTML = `${cartQuantity} item${cartQuantity !== 1 ? 's' : ''}`;
    },

    deleteFromCart(productId) {
      const itemIndex = this.cartItems.findIndex(item => item.id === productId);
      if (itemIndex !== -1) {
        this.cartItems.splice(itemIndex, 1);
      }
      this.displayCheckoutItemCount();
    },

    updateQuantityInCart(productId, newQuantity) {
      const cartItem = this.cartItems.find(item => item.id === productId);
      if (cartItem) {
        cartItem.quantity = parseInt(newQuantity, 10);
      }
      this.displayCheckoutItemCount();
    },

    updateDeliveryOption(productId, newDeliveryOptionId) {
      const cartItem = this.cartItems.find(item => item.id === productId);
      if (cartItem) {
        cartItem.deliveryOptionId = newDeliveryOptionId;
      }
      this.saveToLocalStorage();
    }

  };

  return cart;

}

const cart = Cart('cart-oop');
const businessCart = Cart('business-cart');
cart.loadCart();
businessCart.loadCart();

console.log(cart);
console.log(businessCart);