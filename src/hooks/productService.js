import { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext.jsx';

export default function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used inside a ProductsProvider.');
  }
  return context;
}