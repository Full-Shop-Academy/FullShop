import React, { useState } from 'react';
import './Cart.css';

const Cart = ({ 
    cartItems = [], 
    toggleSidebar, 
    increaseQuantity, 
    decreaseQuantity, 
    handleRemove,
    clearCart
}) => {
    const [showModal, setShowModal] = useState(false);
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        city: '',
        country: '',
        postalCode: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('');
    const [creditCardInfo, setCreditCardInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [addingNewCard, setAddingNewCard] = useState(false);

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleCompleteCheckout = () => {
        if (!shippingInfo.name || !shippingInfo.address || !paymentMethod) {
            alert('Please fill out all required fields.');
            return;
        }

        if (addingNewCard && (!creditCardInfo.cardNumber || !creditCardInfo.expiryDate || !creditCardInfo.cvv)) {
            alert('Please provide all credit card details.');
            return;
        }

        alert('Thank you for your purchase! Your order has been placed.');
        clearCart();
        setShowModal(false);
    };

    return (
        <div className="cart-sidebar">
            <h2>Shopping Cart</h2>
            {!cartItems || cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            <img src={item.image} alt={item.title} width="50" />
                            <h3>{item.title}</h3>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <div className="button-group">
                                <button onClick={() => increaseQuantity(item.id)}>+</button>
                                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                                <button onClick={() => handleRemove(item.id)}>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <p>Total: ${getTotalPrice()}</p>
            <button className="checkout-btn" onClick={() => setShowModal(true)}>Proceed to Checkout</button>

            {showModal && (
                <div className="checkout-modal">
                    <div className="modal-content">
                        <h3>Checkout</h3>
                        <div className="shipping-info">
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
                            <select value={paymentMethod} onChange={e => {
                                setPaymentMethod(e.target.value);
                                if (e.target.value === "NewCard") {
                                    setAddingNewCard(true);
                                } else {
                                    setAddingNewCard(false);
                                }
                            }}>
                                <option value="">Select Payment Method</option>
                                <option value="CreditCard">Credit Card on File</option>
                                <option value="NewCard">Add a New Credit Card</option>
                            </select>
                        </div>
                        {addingNewCard && (
                            <div className="new-card-details">
                                <input
                                    type="text"
                                    placeholder="Card Number"
                                    value={creditCardInfo.cardNumber}
                                    onChange={e => setCreditCardInfo({ ...creditCardInfo, cardNumber: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Expiry MM/YY"
                                    value={creditCardInfo.expiryDate}
                                    onChange={e => setCreditCardInfo({ ...creditCardInfo, expiryDate: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="CVV"
                                    value={creditCardInfo.cvv}
                                    onChange={e => setCreditCardInfo({ ...creditCardInfo, cvv: e.target.value })}
                                />
                            </div>
                        )}
                        <button onClick={handleCompleteCheckout}>Complete Checkout</button>
                        <button onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
