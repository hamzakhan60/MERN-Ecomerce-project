import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserLoginContext } from "../context/userLoginContext";

const AdminOrderHistory = () => {
  const [usersOrders, setUsersOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { userLoginCredential } = useContext(UserLoginContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/admin/orders',{params:userLoginCredential,
      });
        if (response.status === 204) {
          alert("No orders found");
        } else {
          setUsersOrders(response.data);
          console.log(response.data);
        }
      } catch (err) {
        console.error('Error fetching user orders:', err);
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!usersOrders.length) {
    return <p className="text-center text-gray-500">No order history found.</p>;
  }

  const formatDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <button
        onClick={() => navigate('/admin/dashboard')}
        className="mb-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
      >
        Back to Home
      </button>

      {usersOrders.map((userOrder, userIndex) => (
        <div key={userIndex} className="mb-8">
          <div className="flex justify-start items-start space-y-2 flex-col mb-8">
            <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">User Order History</h1>
            <div className="bg-white p-4 border rounded-lg shadow w-full">
              <h2 className="text-2xl font-semibold leading-7 text-gray-800">User Details</h2>
              <p className="text-base font-medium leading-6 text-gray-600">Name: {userOrder.customerDetail.firstName} {userOrder.customerDetail.lastName}</p>
              <p className="text-base font-medium leading-6 text-gray-600">Email: {userOrder.customerDetail.login.email}</p>
              <p className="text-base font-medium leading-6 text-gray-600">Address: {userOrder.customerDetail.address.streetName}</p>
              <p className="text-base font-medium leading-6 text-gray-600">City: {userOrder.customerDetail.address.city}</p>
              <p className="text-base font-medium leading-6 text-gray-600">Country: {userOrder.customerDetail.address.country}</p>
            </div>
          </div>

          {userOrder.order.orders.map((order, orderIndex) => (
            <div key={orderIndex} className="mt-10 flex flex-col justify-start items-start w-full space-y-4 md:space-y-6">
              <div className="flex justify-between items-start w-full p-4 border rounded-lg bg-white shadow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full space-y-4 md:space-y-0 md:space-x-8">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium leading-5 text-gray-500">Order number</span>
                    <span className="text-sm font-medium leading-5 text-gray-900">{order.OrderNo}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium leading-5 text-gray-500">Date placed</span>
                    <span className="text-sm font-medium leading-5 text-gray-900">{formatDate(order.ShippingDate)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium leading-5 text-gray-500">Total amount</span>
                    <span className="text-sm font-medium leading-5 text-gray-900">{order.GrandTotal}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium leading-5 text-gray-500">Payment Method</span>
                    <span className="text-sm font-medium leading-5 text-gray-900">{order.paymentMethod}</span>
                  </div>
                </div>
              </div>

              {order.products.map((product, productIndex) => (
                <div key={productIndex} className="flex flex-col md:flex-row justify-between items-start w-full p-4 border rounded-lg bg-white shadow">
                  <div className="flex items-center w-full md:w-1/4">
                    <img
                      className="w-24 h-24 object-cover rounded-lg"
                      src={
                        product.productId?.clothId?.imgUrl ||
                        product.productId?.fragranceId?.imgUrl
                      
                      }
                      alt={product.productId?.ProductName || 'Product Image'}
                    />
                  </div>
                  <div className="flex flex-col justify-start items-start w-full md:w-3/4 space-y-4 mt-4 md:mt-0 md:ml-4">
                    <div className="flex flex-col justify-start items-start space-y-2">
                      <span className="text-lg font-medium leading-5 text-gray-900">{product.productId?.ProductName}</span>
                      <span className="text-sm leading-5 text-gray-500">{product.productId?.Price}</span>
                      <span className="text-sm leading-5 text-gray-500">QTY: {product.quantity}</span>
                      <span className="text-sm leading-5 text-gray-500">Size: {product.size}</span>
                      <p className="text-sm leading-5 text-gray-700">
                        { product.productId?.clothId?.Description ||
                        product.productId?.fragranceId?.Description}
                      </p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <span className="text-sm font-medium leading-5 text-green-600">Shipped on: {formatDate(order.ShippingDate)}</span>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminOrderHistory;
