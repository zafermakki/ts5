import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
import { cartReducer } from '../reducers/cartReducer.js';
import { getCartCount, getCartTotal } from '../utils/cartUtils.js';

export const CartContext = createContext(null);
const STORAGE_KEY = 'teal-and-co-cart-v1';

function getInitialCart() {
  if (typeof window === 'undefined') return [];

  try {
    const savedCart = window.localStorage.getItem(STORAGE_KEY);
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];
    if (!Array.isArray(parsedCart)) return [];

    return parsedCart
      .filter((item) => item && item.id != null)
      .map((item) => ({
        ...item,
        price: Number(item.price) || 0,
        quantity: Math.max(1, Number(item.quantity) || 1),
        stock: Number(item.stock) || 0,
      }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, undefined, getInitialCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Could not save the cart to localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = useCallback((product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  }, []);

  const increaseQuantity = useCallback((productId) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: productId });
  }, []);

  const decreaseQuantity = useCallback((productId) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: productId });
  }, []);

  const removeFromCart = useCallback((productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  }, []);

  const importCart = useCallback((items) => {
    dispatch({ type: 'SET_CART', payload: items });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const cartCount = getCartCount(cartItems);
  const totalPrice = getCartTotal(cartItems);
  const cartProductsCount = cartItems.length;

  const value = useMemo(() => ({
    cartItems,
    cartCount,
    cartProductsCount,
    totalPrice,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    importCart,
    clearCart,
  }), [
    cartItems,
    cartCount,
    cartProductsCount,
    totalPrice,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    importCart,
    clearCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}