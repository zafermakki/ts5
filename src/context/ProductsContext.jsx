import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { getCategories, getProducts } from '../services/productService.js';

export const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refreshProducts = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);

      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch {
        // Product browsing should still work if the categories endpoint is unavailable.
        const uniqueCategories = [...new Set(fetchedProducts.map((product) => product.category))];
        setCategories(uniqueCategories.map((slug) => ({ slug, name: slug })));
      }
    } catch (requestError) {
      setError(requestError.message || 'We could not load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const value = useMemo(() => ({
    products,
    categories,
    loading,
    error,
    refreshProducts,
  }), [products, categories, loading, error, refreshProducts]);

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}