export const cart = [
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    quantity: 2
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    quantity: 1
  }
];

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
}

export function updateCartQuantity() {
  let cartQuantity = 0;
    cart.forEach(item => {
      cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    
    console.log(cart);
    console.log(`Total items in cart: ${cartQuantity}`);
}

export function deleteFromCart(productId) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
  }
}