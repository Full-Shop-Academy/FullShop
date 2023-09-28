// utils/localStorage.js

const LOCAL_STORAGE_KEY_CART = 'fullShopAcademyCart';
const LOCAL_STORAGE_KEY_USER = 'fullShopAcademyUser';

// Functions related to the cart:

export const loadCartFromLocalStorage = () => {
    try {
        const serializedCart = localStorage.getItem(LOCAL_STORAGE_KEY_CART);
        if (serializedCart === null) {
            return [];
        }
        return JSON.parse(serializedCart);
    } catch (err) {
        console.error("Error loading cart from local storage:", err);
        return [];
    }
};

export const saveCartToLocalStorage = (cart) => {
    try {
        const serializedCart = JSON.stringify(cart);
        localStorage.setItem(LOCAL_STORAGE_KEY_CART, serializedCart);
    } catch (err) {
        console.error("Error saving cart to local storage:", err);
    }
};

export const clearCartFromLocalStorage = () => {
    try {
        localStorage.removeItem(LOCAL_STORAGE_KEY_CART);
    } catch (err) {
        console.error("Error clearing cart from local storage:", err);
    }
};

// Functions related to user authentication:

export const saveUserToLocalStorage = (user) => {
    try {
        const serializedUser = JSON.stringify(user);
        localStorage.setItem(LOCAL_STORAGE_KEY_USER, serializedUser);
    } catch (err) {
        console.error("Error saving user to local storage:", err);
    }
};

export const loadUserFromLocalStorage = () => {
    try {
        const serializedUser = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
        if (serializedUser === null) {
            return null;
        }
        return JSON.parse(serializedUser);
    } catch (err) {
        console.error("Error loading user from local storage:", err);
        return null;
    }
};

export const clearUserFromLocalStorage = () => {
    try {
        localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
    } catch (err) {
        console.error("Error clearing user from local storage:", err);
    }
};

// Helper functions:

export const isUserLoggedIn = () => {
    const user = loadUserFromLocalStorage();
    return user ? true : false;
};

export const getLoggedInUserData = () => {
    return loadUserFromLocalStorage();
};
