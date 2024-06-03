// Card.js
import React from 'react';

const Card = ({ icon, title, value, additionalInfo }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between h-40 w-80">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="text-3xl">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500">{additionalInfo}</p>
        <p className="text-2xl mt-2">{value}</p>
      </div>
    </div>
  );
};

export default Card;
