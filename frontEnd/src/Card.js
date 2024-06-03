
import { AiOutlineHeart } from 'react-icons/ai';
import React, { useState,useEffect } from 'react';


const Card = ({ imageSrc, cardName, category, cutPrice, originalPrice, discount, onMouseEnter, onMouseLeave, style }) => {
 
  return (
    <div 
      className="max-w-xs h-100 rounded overflow-hidden shadow-lg" 
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave}
      style={style}
    >
      <img className="w-full" src={imageSrc} alt={cardName} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{cardName} <span className="text-gray-600">({category})</span></div>
        <div className="flex items-center mb-4">
          <span className="text-green-500 font-bold">{originalPrice}</span>
          <span className="text-gray-600 text-sm line-through ml-2">{cutPrice}</span>
          <span className="bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded-full ml-auto">{discount}% OFF</span>
        </div>
      </div>
     
    </div>
  );
};

export default Card;
