export function getCartCount(cartItems) {
  return cartItems.reduce((count, item) => count + item.quantity, 0);
}

export function getCartTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
}

export function formatCategory(value = '') {
  return String(value)
    .replaceAll('-', ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}