export const cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let itemFound = false;
    cart.forEach(item => {
      if (item.id === productId) {
        item.quantity += 1;
        itemFound = true;
      }
    });

    if (!itemFound) {
      cart.push({
        id: productId,
        quantity: 1
      });
    }
    saveToLocalStorage();
}

function cartItemCount() {
  let cartQuantity = 0;
  cart.forEach(item => {
    cartQuantity += item.quantity;
  });
  saveToLocalStorage();
  return cartQuantity;
}

export function updateCartQuantity() {
  const cartQuantity = cartItemCount();
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  
  console.log(cart);
  console.log(`Total items in cart: ${cartQuantity}`);
}

export function displayCheckoutItemCount() {
  const cartQuantity = cartItemCount();
  document.querySelector('.js-item-count').innerHTML = `${cartQuantity} item${cartQuantity !== 1 ? 's' : ''}`;
}

export function deleteFromCart(productId) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
  }
  displayCheckoutItemCount();
}

export function updateQuantityInCart(productId, newQuantity) {
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity = parseInt(newQuantity, 10);
  }
  displayCheckoutItemCount();
}