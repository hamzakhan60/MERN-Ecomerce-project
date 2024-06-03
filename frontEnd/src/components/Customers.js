import React, { useEffect, useState,useContext } from 'react';
import { FaTrash, FaPlus, FaSave, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserLoginContext } from "../context/userLoginContext";


const Customer = () => {
  const [customers, setCustomers] = useState(null);  // null indicates no data yet
  const [loading, setLoading] = useState(true);      // loading state
  const [error, setError] = useState(null);          // error state
  const [searchQuery, setSearchQuery] = useState('');
  const { userLoginCredential } = useContext(UserLoginContext);

  useEffect(() => {
    // Fetch customer data from the API
    axios.get('http://localhost:8000/admin/customers', {params:userLoginCredential,
  })
        .then(response => {
            setCustomers(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError('Error fetching customer data');
            setLoading(false);
        });
}, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  if (!customers || customers.length === 0) {
    return <div className="container mx-auto p-4">No customers found</div>;
  }

  const filteredCustomers = customers.filter(customer =>
    customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.login.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <Link to="/admin/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded flex items-center mb-4">
        <FaArrowLeft className="mr-2" /> Back
      </Link>
      <h1 className="text-2xl font-bold mb-4">Customer Details</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchQuery}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      {filteredCustomers.map(customer => (
        <div key={customer._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <div className="flex items-center mb-2">
            <span className="font-semibold text-gray-700">Name:</span>
            <span className="ml-2 text-gray-900">
              {customer.firstName} {customer.middleName} {customer.lastName}
            </span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-semibold text-gray-700">Date of Birth:</span>
            <span className="ml-2 text-gray-900">{new Date(customer.dateOfBirth).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-semibold text-gray-700">Phone Number:</span>
            <span className="ml-2 text-gray-900">{customer.phoneNumber}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="ml-2 text-gray-900">{customer.loginDetails.email}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-semibold text-gray-700">Address:</span>
            <span className="ml-2 text-gray-900">
              {customer.address.streetName}, {customer.address.city}, {customer.address.country}, {customer.address.pinCode}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Customer;
