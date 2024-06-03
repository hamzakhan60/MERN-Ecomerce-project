import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PendingOrdersContext } from './context/pendingOrdersContext'; // Context for pending orders
import { UserLoginContext } from './context/userLoginContext';
const PaymentMethod = () => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [email, setEmail] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [paypalEmail, setPaypalEmail] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const { userLoginCredential } = useContext(UserLoginContext);

    const { pendingOrders, setPendingOrders } = useContext(PendingOrdersContext);

    useEffect(() => {
        const validateFields = () => {
            if (paymentMethod === 'credit_card' && email && expiryDate && cvv && cardNumber) {
                setIsButtonDisabled(false);
            } else if (paymentMethod === 'paypal' && paypalEmail) {
                setIsButtonDisabled(false);
            } else if (paymentMethod === 'cash_on_delivery') {
                setIsButtonDisabled(false);
            } else {
                setIsButtonDisabled(true);
            }
        };
        validateFields();
    }, [paymentMethod, email, expiryDate, cvv, cardNumber, paypalEmail]);

    const handleConfirmPayment = async () => {
        const body={
            paymentMethod: paymentMethod,
            cardNumber:cardNumber,
            expirationDate:expiryDate,
            securityCode:cvv,

        }
        try {
            const response = await axios.post('http://localhost:8000/order', body,{
                params: userLoginCredential,
            });

            if (response.status === 200) {
                setPendingOrders([]); // Clear pending orders after successful payment
                alert('Payment confirmed and order placed successfully.');
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error confirming payment:', error);
            alert('Failed to confirm payment. Please try again.');
        }
    };

    return (
        <div className="p-6 border rounded-lg bg-white shadow mt-10">
            <h2 className="text-2xl font-semibold mb-4">Payment Method:</h2>
            <div className="flex flex-col space-y-4">
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="payment-method"
                        value="card"
                        className="mr-2"
                        checked={paymentMethod === 'credit_card'}
                        onChange={() => setPaymentMethod('credit_card')}
                    />
                    Credit or debit card
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="payment-method"
                        value="paypal"
                        className="mr-2"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => setPaymentMethod('paypal')}
                    />
                    PayPal
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="payment-method"
                        value="cash"
                        className="mr-2"
                        checked={paymentMethod === 'cash_on_delivery'}
                        onChange={() => setPaymentMethod('cash_on_delivery')}
                    />
                    Cash on Delivery
                </label>

                {paymentMethod === 'card' && (
                    <>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="p-2 border rounded w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Card Number"
                            className="p-2 border rounded w-full"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        />
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                placeholder="Expiry date"
                                className="p-2 border rounded w-full"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="CVC/CVV"
                                className="p-2 border rounded w-full"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                            />
                        </div>
                    </>
                )}

                {paymentMethod === 'paypal' && (
                    <input
                        type="email"
                        placeholder="PayPal email address"
                        className="p-2 border rounded w-full"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                    />
                )}

                {paymentMethod === 'cash' && (
                    <p className="text-gray-700">You will pay with cash upon delivery.</p>
                )}

                <div className="flex items-center space-x-2">
                    <span className="text-gray-500">
                        <svg className="h-4 w-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 00-2 0v4a1 1 0 002 0V7zm0 6a1 1 0 11-2 0 1 1 012 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                    <span className="text-gray-500 text-sm">Your transaction is secured with SSL encryption</span>
                </div>
                <button
                    className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isButtonDisabled}
                    onClick={handleConfirmPayment}
                >
                    Confirm Order
                </button>
            </div>
        </div>
    );
};

export default PaymentMethod;
