const CARTS_URL = 'https://dummyjson.com/carts';

/**
 * Loads a sample cart from DummyJSON for the optional Cart Sync challenge.
 * DummyJSON is a demo API: treat this data as sample data, not a real account cart.
 */
export async function getSampleCart(cartId = 1) {
  const response = await fetch(`${CARTS_URL}/${encodeURIComponent(cartId)}`);

  if (!response.ok) {
    throw new Error(`Could not load the sample cart (${response.status}).`);
  }

  const data = await response.json();
  return Array.isArray(data.products) ? data.products : [];
}

/** Convert DummyJSON cart products to the shape expected by our reducer. */
export function normalizeRemoteCart(remoteProducts) {
  return remoteProducts.map((product) => ({
    id: product.id,
    title: product.title ?? 'Untitled product',
    price: Number(product.price) || 0,
    thumbnail: product.thumbnail ?? product.images?.[0] ?? '',
    images: product.images ?? [],
    category: product.category ?? 'sample',
    rating: product.rating ?? 0,
    stock: Math.max(Number(product.stock) || 0, Number(product.quantity) || 1, 99),
    quantity: Math.max(1, Number(product.quantity) || 1),
  }));
}