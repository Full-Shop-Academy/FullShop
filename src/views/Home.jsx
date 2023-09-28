import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList/ProductList';
import Filters from '../components/Filters/Filters';
import Sidebar from '../components/Sidebar/Sidebar';
import { saveCartToLocalStorage, loadCartFromLocalStorage, getLoggedInUserData } from '../utils/localStorage';
import { logout } from '../api/auth';
import './Home.css';

const Home = ({ isSidebarOpen, toggleSidebar }) => {
    const [loading, setLoading] = useState(true);
    const userData = getLoggedInUserData();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [loggedIn, setLoggedIn] = useState(Boolean(userData));

    useEffect(() => {
        const savedCartItems = loadCartFromLocalStorage();
        if (savedCartItems && savedCartItems.length > 0) {
            setCartItems(savedCartItems);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        saveCartToLocalStorage(cartItems);
    }, [cartItems]);

    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isSidebarOpen]);

    const handleFilterChange = (filters) => {
        setSelectedCategory(filters.category);
        setMinPrice(filters.minPrice);
        setMaxPrice(filters.maxPrice);
        setSortOrder(filters.sort);
    };

    const addToCart = (product) => {
        setCartItems(prevCartItems => {
            const existingProduct = prevCartItems.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCartItems.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCartItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevCartItems => {
            const existingProduct = prevCartItems.find(item => item.id === productId);
            if (existingProduct && existingProduct.quantity > 1) {
                return prevCartItems.map(item =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                );
            } else {
                return prevCartItems.filter(item => item.id !== productId);
            }
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const handleIncreaseQuantity = (itemId) => {
        setCartItems(prevItems => 
            prevItems.map(item => 
                item.id === itemId ? {...item, quantity: item.quantity + 1} : item
            )
        );
    };

    const handleDecreaseQuantity = (itemId) => {
        setCartItems(prevItems => 
            prevItems.map(item => 
                item.id === itemId && item.quantity > 1 ? {...item, quantity: item.quantity - 1} : item
            )
        );
    };

    const handleRemoveFromCart = (itemId) => {
        setCartItems(prevItems => 
            prevItems.filter(item => item.id !== itemId)
        );
    };

    const handleLogout = () => {
        logout();
        setLoggedIn(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home">
            <button className="cart-btn" onClick={toggleSidebar}>
                Open Cart
            </button>
            {isSidebarOpen && (
                <div className="sidebar-overlay" onClick={toggleSidebar}></div>
            )}
            <Sidebar 
                cartItems={cartItems} 
                isSidebarOpen={isSidebarOpen} 
                toggleSidebar={toggleSidebar} 
                addToCart={addToCart} 
                removeFromCart={removeFromCart}
                increaseQuantity={handleIncreaseQuantity} 
                decreaseQuantity={handleDecreaseQuantity} 
                handleRemove={handleRemoveFromCart}
                clearCart={clearCart}
            />
            <div className="main-content">
                <Filters onFilterChange={handleFilterChange} />
                <ProductList 
                    selectedCategory={selectedCategory} 
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    sortOrder={sortOrder} 
                    addToCart={addToCart}
                />
            </div>
        </div>
    );
};

export default Home;
