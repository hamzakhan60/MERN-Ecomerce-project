import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for Chart.js
import { FaDollarSign, FaShoppingCart, FaUserPlus,FaMoneyBillWave } from "react-icons/fa";

const Dashboard = ({
  userGrowth,
  totalRevenue,
  totalOrders,
  newCustomers,
  salesByCategory,
  salesBySubcategory,
  monthlySales,
  salesByStitchType,
  salesByFragranceType,
}) => {
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  console.log(totalRevenue);


 

  return (
    <div className="p-4 space-y-4 bg-gray-900 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
          <FaMoneyBillWave className="text-3xl text-green-500 mr-4" />
          <div>
            <h3 className="text-xl font-bold">Total Revenue</h3>
            <p className="text-2xl">{totalRevenue} ₨.</p>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
          <FaShoppingCart className="text-3xl text-blue-500 mr-4" />
          <div>
            <h3 className="text-xl font-bold">Total Orders</h3>
            <p className="text-2xl">{totalOrders}</p>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
          <FaUserPlus className="text-3xl text-purple-500 mr-4" />
          <div>
            <h3 className="text-xl font-bold">Total Customers</h3>
            <p className="text-2xl">{newCustomers}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Sales by Category</h2>
          <div className="h-48">
            <Pie
              data={{
                labels: salesByCategory.labels,
                datasets: [
                  {
                    label: 'Sales by Category',
                    data: salesByCategory.data,
                    backgroundColor: ['rgba(255,99,132,0.6)', 'rgba(54,162,235,0.6)', 'rgba(255,206,86,0.6)'],
                  },
                ],
              }}
              options={commonOptions}
            />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Sales by Subcategory</h2>
          <div className="h-48">
            <Bar
              data={{
                labels: salesBySubcategory.labels,
                datasets: [
                  {
                    label: 'Sales by Subcategory',
                    data: salesBySubcategory.data,
                    backgroundColor: 'rgba(153,102,255,0.6)',
                  },
                ],
              }}
              options={commonOptions}
            />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Monthly Sales</h2>
          <div className="h-48">
            <Line
              data={{
                labels: monthlySales.labels,
                datasets: [
                  {
                    label: 'Monthly Sales',
                    data: monthlySales.data,
                    fill: false,
                    borderColor: 'rgba(255,159,64,1)',
                    tension: 0.4,
                  },
                ],
              }}
              options={commonOptions}
            />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Sales by Stitch Type</h2>
          <div className="h-48">
            <Bar
              data={{
                labels: salesByStitchType.labels,
                datasets: [
                  {
                    label: 'Sales by Stitch Type',
                    data: salesByStitchType.data,
                    backgroundColor: 'rgba(255,99,132,0.6)',
                  },
                ],
              }}
              options={commonOptions}
            />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Sales by Fragrance Type</h2>
          <div className="h-48">
            <Pie
              data={{
                labels: salesByFragranceType.labels,
                datasets: [
                  {
                    label: 'Sales by Fragrance Type',
                    data: salesByFragranceType.data,
                    backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,159,64,0.6)', 'rgba(54,162,235,0.6)'],
                  },
                ],
              }}
              options={commonOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
