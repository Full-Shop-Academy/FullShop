const BASE_URL = "https://fakestoreapi.com";

// Utility function to handle API requests
const fetchData = async (endpoint, method = 'GET', body = null) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from endpoint ${endpoint}:`, error);
    return null;
  }
};

// Fetch all products
export const fetchAllProducts = async () => {
  return fetchData("/products") || [];
};

// Fetch a single product by its ID
export const fetchProductById = async (productId) => {
  if (!productId) {
    console.error("Invalid product ID:", productId);
    return null;
  }
  return fetchData(`/products/${productId}`);
};

// Fetch products based on a specific category
export const fetchProductsByCategory = async (category) => {
  return fetchData(`/products/category/${category}`) || [];
};

// Fetch all product categories
export const fetchAllCategories = async () => {
  return fetchData("/products/categories") || [];
};

// Fake user registration
export const fakeUserRegistration = async (userData) => {
  if (!userData) {
    console.error("Invalid user data:", userData);
    return null;
  }
  // Note: This will not actually register a user in the fakeStoreApi database.
  // It's just for simulation purposes.
  return fetchData(`/users`, 'POST', userData);
};
