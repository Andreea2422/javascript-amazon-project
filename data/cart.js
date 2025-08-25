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

export function updateCartQuantity() {
  let cartQuantity = 0;
    cart.forEach(item => {
      cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    
    console.log(cart);
    console.log(`Total items in cart: ${cartQuantity}`);
    saveToLocalStorage();
}

export function deleteFromCart(productId) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
  }
  saveToLocalStorage();
}