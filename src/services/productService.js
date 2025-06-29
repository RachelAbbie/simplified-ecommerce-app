const API_URL = import.meta.env.VITE_API_URL || 'https://fakestoreapi.com/products';

/**
 * Fetch all products from the API
 * @returns {Promise<Array>} Array of products
 */
export async function fetchProducts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

/**
 * Fetch a single product by ID
 * @param {number} productId - ID of product to fetch
 * @returns {Promise<Object>} Product object
 */
export const fetchProductById = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/${productId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const product = await response.json();
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product. Please try again later.');
  }
};