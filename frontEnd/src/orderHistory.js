import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PendingOrders from './pendingOrder';
import PaymentMethod from './paymentMethod';
import OrderDetails from './order';
import { UserLoginContext } from './context/userLoginContext';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    const { userLoginCredential } = useContext(UserLoginContext);
    const [showPendingOrders, setShowPendingOrders] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [previousOrdersCount, setPreviousOrdersCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('http://localhost:8000/user', {
                    params: userLoginCredential // Replace with actual user ID parameter
                });
                setUserDetails(response.data);
                console.log(response.data);
            } catch (err) {
                setUserDetails(null);
                console.error('Error fetching user details:', err);
            }
        };
        

        const fetchPreviousOrdersCount = async () => {
            try {
                const response = await axios.get('http://localhost:8000/order', {
                    params: userLoginCredential // Replace with actual user ID parameter
                });
                if (response.status === 204) {
                    setPreviousOrdersCount(0);
                } else {
                    console.log(response.data.orders);
                    setPreviousOrdersCount(response.data.orders.length );
                }
            } catch (err) {
                console.error('Error fetching previous orders count:', err);
            }
        };

        fetchUserDetails();
        fetchPreviousOrdersCount();
    }, [userLoginCredential]);

    const togglePendingOrders = () => {
        setShowPendingOrders(!showPendingOrders);
    };

    const handleProductDetails = () => {
        navigate('/profile');
    };

    return (
        <>
            <div className={`flex ${!showPendingOrders ? 'flex-col' : 'flex-row'}`}>
                <div className={`flex-1 ${!showPendingOrders ? 'w-full' : 'lg:w-2/3'}`}>
                    {showPendingOrders ? <PendingOrders /> : <OrderDetails />}
                </div>
                <div className="lg:w-1/3 lg:pl-6">
                    {showPendingOrders && <PaymentMethod />}
                </div>
                <button
                    className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg"
                    onClick={togglePendingOrders}
                >
                    {showPendingOrders ? 'View Order Details' : 'View Pending Orders'}
                </button>
            </div>
            {userDetails ? (
                <div className="bg-white shadow-lg border border-gray-300 w-full p-6 space-y-6">
                    <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer</h3>
                    <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch w-full space-y-6 md:space-y-0 md:space-x-6 lg:space-x-8 xl:space-x-0">
                        <div className="flex flex-col justify-start items-start flex-shrink-0 md:w-full">
                            <div className="flex justify-evenly w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                <img src={userDetails.avatarUrl || "https://i.ibb.co/5TSg7f6/Rectangle-18.png"} alt="avatar" />
                                <div className="flex justify-start items-start flex-col space-y-2 w-full">
                                    <p className="text-base font-semibold leading-4 text-left text-gray-800">{userDetails.firstName || 'Loading...'}</p>
                                    <p className="text-sm leading-5 text-gray-600">{previousOrdersCount} Previous Orders</p>
                                </div>
                                <div className="flex justify-between items-stretch w-full flex-col md:mt-0 space-y-4">
                                    <div className="flex justify-between md:justify-start flex-col space-y-4">
                                        <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                                        <p className="w-full text-center md:text-left text-sm leading-5 text-gray-600">{userDetails.address ? `${userDetails.address.streetName}, ${userDetails.address.city}, ${userDetails.address.country}` : 'Loading...'}</p>
                                    </div>
                                    <div className="flex justify-between md:justify-start flex-col space-y-4">
                                        <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
                                        <p className="w-full text-center md:text-left text-sm leading-5 text-gray-600">{userDetails.address ? `${userDetails.address.streetName}, ${userDetails.address.city}, ${userDetails.address.country}` : 'Loading...'}</p>
                                    </div>
                                </div>
                                <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                                    <button
                                        className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800"
                                        onClick={handleProductDetails}
                                    >
                                        Edit Details
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-center text-gray-800 md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 7L12 13L21 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="cursor-pointer text-sm leading-5">{userDetails.login ? userDetails.login.email : 'Loading...'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default OrderHistory;
