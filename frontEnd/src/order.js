import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserLoginContext } from './context/userLoginContext';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userLoginCredential } = useContext(UserLoginContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/order', {
          params: userLoginCredential // Replace with actual user ID parameter
        });
        if (response.status === 204) {
          alert("You have an empty orders history");
        } else {
            console.log(response.data.orders)
          setOrders(response.data.orders);
        }
      } catch (err) {
        console.error('Error fetching previous orders count:', err);
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userLoginCredential]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (orders.length === 0) {
    return <p className="text-center text-gray-500">You have no order history.</p>;
  }
 
  const datePattern=(date)=>{
    const dateObj=new Date(date)
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return formattedDate;
  }

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start items-start space-y-2 flex-col">
        <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order history</h1>
        <p className="text-base font-medium leading-6 text-gray-600">Check the status of recent orders, manage returns, and discover similar products.</p>
      </div>

      {orders.map((order, index) => (
        <div key={index} className="mt-10 flex flex-col justify-start items-start w-full space-y-4 md:space-y-6">
          <div className="flex justify-between items-start w-full p-4 border rounded-lg bg-white shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-5 text-gray-500">Order number</span>
                <span className="text-sm font-medium leading-5 text-gray-900">{order.OrderNo}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-5 text-gray-500">Date placed</span>
                <span className="text-sm font-medium leading-5 text-gray-900">{datePattern(order.ShippingDate)}</span>
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

          {order.products.map((product, idx) => (
            <div key={idx} className="flex flex-col md:flex-row justify-between items-start w-full p-4 border rounded-lg bg-white shadow">
              <div className="flex items-center w-full md:w-1/4">
                <img
                  className="w-24 h-24 object-cover rounded-lg"
                  src={
                    product.productId?.clothId?.imgUrl ||
                    product.productId?.fragranceId?.imgUrl ||
                    'placeholder_image_url' // Add a placeholder image URL
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
                    {product.productId?.clothId?.Description || product.productId?.fragranceId?.Description}
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm font-medium leading-5 text-green-600">Shipped on:{datePattern(order.ShippingDate)}</span>
                  <div className="flex space-x-4">
                    <Link to={`/details/${product.productId._id}`} className="text-sm font-medium leading-5 text-blue-600 hover:underline">
                      View product
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
