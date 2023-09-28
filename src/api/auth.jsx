import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

const handleRequest = async (method, endpoint, data = null) => {
    try {
        const response = await axios[method](`${API_URL}${endpoint}`, data);
        if (response.data && response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = (credentials) => handleRequest('post', '/login', credentials);

export const register = (userData) => handleRequest('post', '/users', userData);

export const getUserDetails = (userId) => handleRequest('get', `/users/${userId}`);

export const updateUser = (userId, userData) => handleRequest('put', `/users/${userId}`, userData);

export const patchUser = (userId, userData) => handleRequest('patch', `/users/${userId}`, userData);

export const logout = () => {
    localStorage.removeItem('user');
};

export const isUserLoggedIn = () => {
    return Boolean(localStorage.getItem('user'));
};

export const getLoggedInUserData = () => {
    return JSON.parse(localStorage.getItem('user'));
};
