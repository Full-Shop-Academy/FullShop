import React from 'react';
import Cart from '../Cart/Cart.jsx';
import './Sidebar.css';

const Sidebar = ({ 
    isSidebarOpen, 
    toggleSidebar, 
    cartItems, 
    increaseQuantity, 
    decreaseQuantity, 
    handleRemove,
    clearCart  // <-- Add this prop here
}) => {
    return (
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <Cart 
                cartItems={cartItems} 
                toggleSidebar={toggleSidebar}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                handleRemove={handleRemove}
                clearCart={clearCart}  // <-- Pass the prop to the Cart component
            />
        </div>
    );
};

export default Sidebar;
