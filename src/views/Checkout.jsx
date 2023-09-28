import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart/Cart';
import { loadCartFromLocalStorage } from '../utils/localStorage';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);

    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        city: '',
        country: '',
        postalCode: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        const savedCartItems = loadCartFromLocalStorage('cartItems');
        if (savedCartItems) {
            setCartItems(savedCartItems);
        }
    }, []);

    const getTotalPrice = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        ).toFixed(2);
    };

    const handleCompleteCheckout = () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        if (!shippingInfo.name || !shippingInfo.address || !paymentMethod) {
            alert('Please fill out all required fields.');
            return;
        }

        alert('Thank you for your purchase! Your order has been placed.');
        // You can also navigate the user to a different page or clear the cart here.
    };

    return (
        <div className="checkout">
            <h2>Checkout</h2>
            <div className="checkout-content">
                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.id}>
                                    <img src={item.image} alt={item.title} width="50" />
                                    <h3>{item.title}</h3>
                                    <p>Price: ${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                    <p>Total: ${getTotalPrice()}</p>
                </div>

                <div className="checkout-forms">
                    <div className="shipping-info">
                        <h3>Shipping Information</h3>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={shippingInfo.name}
                            onChange={e => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            value={shippingInfo.address}
                            onChange={e => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="City"
                            value={shippingInfo.city}
                            onChange={e => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Country"
                            value={shippingInfo.country}
                            onChange={e => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Postal Code"
                            value={shippingInfo.postalCode}
                            onChange={e => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                        />
                    </div>
                    <div className="payment-method">
                        <h3>Payment Method</h3>
                        <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                            <option value="">Select Payment Method</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="PayPal">PayPal</option>
                        </select>
                    </div>
                    <button onClick={handleCompleteCheckout}>Complete Checkout</button>
                </div>
            </div>

            <Link to="/cart">Back to Cart</Link>
            <Cart cartItems={cartItems} />
        </div>
    );
};

export default Checkout;
