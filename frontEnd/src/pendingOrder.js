import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserLoginContext } from './context/userLoginContext';
import { PendingOrdersContext } from './context/pendingOrdersContext';
import axios from 'axios';

const PendingOrders = () => {
    const [updatedQuantities, setUpdatedQuantities] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);
    const { userLoginCredential } = useContext(UserLoginContext);
    const { pendingOrders, setPendingOrders } = useContext(PendingOrdersContext);
    const [subTotal, setSubtotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const getCart = () => {
            axios
                .get('http://localhost:8000/cart', {
                    params: userLoginCredential,
                })
                .then((response) => {
                    if (response.status === 204) {
                        setPendingOrders([]); // Update pendingOrders state
                        console.log('Empty Cart');
                    } else {
                        setPendingOrders(response.data.cartData.items); // Update pendingOrders state
                        setSubtotal(response.data.subTotal);
                        console.log(response.data.subTotal);
                        console.log(response.data.cartData.items);
                    }
                })
                .catch((err) => {
                    if (err.response) {
                        alert(err.response.data);
                    } else {
                        alert('Server Not Found');
                    }
                });
        };

        if (userLoginCredential) {
            getCart();
        } else {
            navigate('/login');
        }
    }, [navigate, userLoginCredential]);

    const handleQuantityChange = (product, newQuantity) => {
        setUpdatedQuantities((prev) => ({
            ...prev,
            [product._id]: newQuantity,
        }));
        setIsUpdated(true);
    };

    const handleRemoveItem = (productId) => {
        // Handle item removal logic
        console.log(`Remove item with ID: ${productId}`);
    };

    const handleUpdateCart = () => {
        // Handle cart update logic
        console.log('Cart updated with quantities:', updatedQuantities);
        setIsUpdated(false);
    };

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <>
            <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                <div className="flex justify-start items-start space-y-2 flex-col">
                    <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                        Pending Orders
                    </h1>
                    <p className="text-base font-medium leading-6 text-gray-600">
                        Review and manage your pending orders.
                    </p>
                </div>

                <div className="mt-10 flex flex-col justify-start items-start w-full space-y-4 md:space-y-6">
                    <div className="flex justify-between items-start w-full p-4 border rounded-lg bg-white shadow-lg">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full space-y-4 md:space-y-0 md:space-x-8">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium leading-5 text-gray-500">Order number</span>
                                <span className="text-sm font-medium leading-5 text-gray-900">#123</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium leading-5 text-gray-500">Date placed</span>
                                <span className="text-sm font-medium leading-5 text-gray-900">{formattedDate}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium leading-5 text-gray-500">Total amount</span>
                                <span className="text-sm font-medium leading-5 text-gray-900">{subTotal}</span>
                            </div>
                        </div>
                    </div>

                    {pendingOrders && pendingOrders.length > 0 ? (
                        pendingOrders.map((product, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col md:flex-row justify-between items-start w-full p-4 border rounded-lg bg-white shadow-lg"
                            >
                                <div className="flex items-center w-full md:w-1/4">
                                    <img
                                        className="w-24 h-24 object-cover rounded-lg"
                                        src={
                                            (product.productId.clothId && product.productId.clothId.imgUrl) ||
                                            (product.productId.fragranceId && product.productId.fragranceId.imgUrl)
                                        }
                                        alt="Loading.."
                                    />
                                </div>
                                <div className="flex flex-col justify-start items-start w-full md:w-3/4 space-y-4 mt-4 md:mt-0 md:ml-4">
                                    <div className="flex flex-col justify-start items-start space-y-2">
                                        <span className="text-lg font-medium leading-5 text-gray-900">
                                            {product.productId.ProductName}
                                        </span>
                                        <span className="text-sm leading-5 text-gray-500">{product.productId.Price}</span>
                                        <p className="text-sm leading-5 text-gray-700">
                                            {product.productId.clothId
                                                ? product.productId.clothId.Description
                                                : product.productId.fragranceId.Description}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                        <input
                                            type="number"
                                            min="1"
                                            value={updatedQuantities[product._id] || product.quantity}
                                            onChange={(e) => handleQuantityChange(product, parseInt(e.target.value))}
                                            className="w-20 p-2 border rounded"
                                        />
                                        <button
                                            type="button"
                                            className="text-black-600 hover:text-red-900"
                                            onClick={() => handleRemoveItem(product._id)}
                                        >
                                            {/* <XMarkIcon className="h-5 w-5" aria-hidden="true" /> */}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 mt-8">Your cart is empty</p>
                    )}

                    {isUpdated && (
                        <button
                            type="button"
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={handleUpdateCart}
                        >
                            Update Cart
                        </button>
                    )}
                </div>
            </div>

            {pendingOrders && pendingOrders.length > 0 && (
                <div className="flex flex-col justify-between items-baseline w-full space-y-6">
                    {/* Summary Section */}
                    <div className="bg-white shadow-lg border border-gray-300 w-1/2 p-6 space-y-6">
                        <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
                        <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                            <div className="flex justify-between w-full">
                                <p className="text-base leading-4 text-gray-800">Subtotal</p>
                                <p className="text-base leading-4 text-gray-600">{subTotal}</p>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base leading-4 text-gray-800">Discount</p>
                                <p className="text-base leading-4 text-gray-600">0</p>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base leading-4 text-gray-800">Shipping</p>
                                <p className="text-base leading-4 text-gray-600">500</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                            <p className="text-base font-semibold leading-4 text-gray-600">${subTotal + 500}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PendingOrders;
