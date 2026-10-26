
function normalizeProduct(product) {
  return {
    id: product.id,
    title: product.title ?? 'Untitled product',
    price: Number(product.price) || 0,
    thumbnail: product.thumbnail ?? product.images?.[0] ?? '',
    images: product.images ?? [],
    category: product.category ?? 'general',
    rating: Number(product.rating) || 0,
    stock: Number(product.stock) || 0,
    quantity: Math.max(1, Number(product.quantity) || 1),
  };
}

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const product = normalizeProduct(action.payload);

      if (product.stock <= 0) return state;

      const existing = state.find(
        (item) => item.id === product.id
      );

      if (existing) {
        if (
          existing.stock > 0 &&
          existing.quantity >= existing.stock
        ) {
          return state;
        }

        return state.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...state, { ...product, quantity: 1 }];
    }

    case 'INCREASE_QUANTITY':
      return state.map((item) => {
        if (item.id !== action.payload) {
          return item;
        }

        if (
          item.stock > 0 &&
          item.quantity >= item.stock
        ) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      });

    case 'DECREASE_QUANTITY':
      return state.map((item) =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

    case 'REMOVE_FROM_CART':
      return state.filter(
        (item) => item.id !== action.payload
      );

    case 'SET_CART':
      return Array.isArray(action.payload)
        ? action.payload.map(normalizeProduct)
        : state;

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
}
