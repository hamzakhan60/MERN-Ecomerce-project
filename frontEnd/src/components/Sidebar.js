import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserLoginContext } from "../context/userLoginContext";

import {
  FaHome,
  FaBox,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import Dashboard from "./Dashboard";

const Sidebar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("Dashboard");
  const [totalRevenue, setTotalRevenue] = useState(15000);
  const [totalOrders, setTotalOrders] = useState(350);
  const [newCustomers, setCustomers] = useState(120);
  const { userLoginCredential, setuserLoginCredential } = useContext(UserLoginContext);
  const [salesByCategory, setsalesByCategory] = useState({
    labels: ["Clothe", "Fragrance"],
    data: [300, 500],
  });
  const [salesBySubcategory, setSalesBySubcategory] = useState({
    labels: ["Laptops", "Shirts", "Refrigerators"],
    data: [100, 200, 50],
  });
  const [monthlySales, setMonthlySales] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });
  const [salesByStitchType, setSalesByStitchType] = useState({
    labels: ["Hand Stitch", "Machine Stitch"],
    data: [150, 250],
  });
  const [salesByFragranceType, setSalesByFragranceType] = useState({
    labels: ["perfume", "Atar"],
    data: [0, 0],
  });

  const handleItemClick = (itemName) => {
    navigate(`/admin/${itemName}`);
    setActive(itemName);
  };

  useEffect(() => {
    const request = async () => {
      try {
        const response = await axios.get('http://localhost:8000/admin/home', {
          params: userLoginCredential,
        });
        console.log(response.data);
        setTotalRevenue(response.data.revenew);
        setTotalOrders(response.data.orders);
        setCustomers(response.data.customers);
        updateChartData(response.data.salesByCategory, setsalesByCategory);
        updateChartData(response.data.salesBySubCategoryOutput, setSalesBySubcategory);
        updateMonthlySale(response.data.monthlySalesOutput);
        updateChartData(response.data.stitchTypePipelineOutput, setSalesByStitchType);
        updateChartData(response.data.fragranceTypePipelineOutput, setSalesByFragranceType);
        console.log(salesByCategory);
      } catch (err) {
        console.error(err);
      }
    };

    request();
  }, []);

  const updateChartData = (response, setData) => {
    const newLabels = response.map(item => item._id);
    const newData = response.map(item => item.totalSales);

    setData({
      labels: newLabels,
      data: newData,
    });
  };

  const updateMonthlySale = (response) => {
    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const data1 = data.map((items, index1) => {
      let flag = 0;
      const a = response.map((item, index2) => {
        if (index1 === item.month - 1) {
          flag = 1;
          return item.orderCount;
        }
      });
      if (flag === 0)
        return 0;
      else
        return a;
    });
    setMonthlySales({
      labels: monthlySales.labels,
      data: data1,
    });
  }

  const handleLogout = () => {
    setuserLoginCredential(null);
    localStorage.removeItem('userData');
    navigate("/");
  }

  return (
    <div className="flex h-full bg-gray-900 text-white">
      <div className="bg-gray-800 text-white w-60">
        <div className="p-4 flex items-center text-xl font-bold">
          <FaBars className="mr-2" />
          Menu
        </div>
        <ul>
          <li className={`${active === "Dashboard" ? "bg-gray-700" : ""} hover:bg-gray-700 transition duration-300`}>
            <a
              onClick={() => handleItemClick("Dashboard")}
              className="flex items-center ml-4 p-4 cursor-pointer"
            >
              <FaHome className="mr-2" /> Dashboard
            </a>
          </li>
          <li className={`${active === "Products" ? "bg-gray-700" : ""} hover:bg-gray-700 transition duration-300`}>
            <a
              onClick={() => handleItemClick("Products")}
              className="flex items-center ml-4 p-4 cursor-pointer"
            >
              <FaBox className="mr-2" /> Products
            </a>
          </li>
          <li className={`${active === "Orders" ? "bg-gray-700" : ""} hover:bg-gray-700 transition duration-300`}>
            <a
              onClick={() => handleItemClick("Orders")}
              className="flex items-center ml-4 p-4 cursor-pointer"
            >
              <FaClipboardList className="mr-2" /> Orders
            </a>
          </li>
          <li className={`${active === "Customers" ? "bg-gray-700" : ""} hover:bg-gray-700 transition duration-300`}>
            <a
              onClick={() => handleItemClick("Customers")}
              className="flex items-center ml-4 p-4 cursor-pointer"
            >
              <FaUsers className="mr-2" /> Customers
            </a>
          </li>
        </ul>
        <div className="absolute bottom-0 w-60">
          <a
            onClick={() => handleLogout()}
            className="flex items-center ml-4 p-4 cursor-pointer hover:bg-red-700 transition duration-300"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </a>
        </div>
      </div>
      <div className="flex-1 bg-gray-900 p-4 h-full">
        {active === "Dashboard" && (
          <Dashboard
            totalRevenue={totalRevenue}
            totalOrders={totalOrders}
            newCustomers={newCustomers}
            salesByCategory={salesByCategory}
            salesBySubcategory={salesBySubcategory}
            monthlySales={monthlySales}
            salesByStitchType={salesByStitchType}
            salesByFragranceType={salesByFragranceType}
          />
        )}
        {active === "Products" && (
          <div>
            <h2 className="text-2xl font-bold">Products</h2>
            {/* Products component logic */}
          </div>
        )}
        {active === "Orders" && (
          <div>
            <h2 className="text-2xl font-bold">Orders</h2>
            {/* Orders component logic */}
          </div>
        )}
        {active === "Customers" && (
          <div>
            <h2 className="text-2xl font-bold">Customers</h2>
            {/* Customers component logic */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
