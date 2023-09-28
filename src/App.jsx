import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importing views
import Login from './views/Login';
import Checkout from './views/Checkout';
import Home from './views/Home';

// Importing components
import ProductDetail from './components/ProductDetail/ProductDetail.jsx';
import Header from './components/Header/Header.jsx';
import Register from './components/Register/Register.jsx';
import Cart from './components/Cart/Cart.jsx';
import { getLoggedInUserData } from './utils/localStorage';
import { logout } from './api/auth';

// Importing global styles
import './App.css';
import './assets/styles/main.css';

const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const userData = getLoggedInUserData();
    const [loggedIn, setLoggedIn] = useState(Boolean(userData));

    const handleLogout = () => {
        logout();
        setLoggedIn(false);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Router>
            <Header 
                toggleSidebar={toggleSidebar} 
                loggedIn={loggedIn}
                onLogout={handleLogout}
                userData={userData}
            />

            <Routes>
                <Route path="/" element={<Home isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/cart" element={<Cart />} />
                {/* Add other routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;
