// Categories.js
import React from 'react';

const Categories = () => {
  // Dummy data for categories
  const categories = ['Category 1', 'Category 2', 'Category 3'];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow-md">{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
