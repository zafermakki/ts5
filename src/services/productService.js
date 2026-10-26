const API_ROOT = 'https://dummyjson.com';
const PRODUCTS_URL = `${API_ROOT}/products`;

async function requestJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}). Please try again.`);
  }

  return response.json();
}

/** Fetch the complete product catalogue from DummyJSON. */
export async function getProducts() {
  const params = new URLSearchParams({ limit: '0' });
  const data = await requestJson(`${PRODUCTS_URL}?${params.toString()}`);
  return Array.isArray(data.products) ? data.products : [];
}

/** Fetch category metadata. DummyJSON currently returns objects with slug/name. */
export async function getCategories() {
  const data = await requestJson(`${PRODUCTS_URL}/categories`);
  if (!Array.isArray(data)) return [];

  return data
    .map((item) => {
      if (typeof item === 'string') return { slug: item, name: item };
      return { slug: item.slug ?? item.name, name: item.name ?? item.slug };
    })
    .filter((item) => item.slug && item.name);
}

/** Fetch one product by its numeric ID. */
export async function getProductById(id) {
  return requestJson(`${PRODUCTS_URL}/${encodeURIComponent(id)}`);
}