// AddtoFavorite.js
import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const AddtoFavorite = () => {
  const [favorites, setFavorites] = useState([]); // State to hold favorite card indices

  const toggleFavorite = (index) => {
    if (favorites.includes(index)) {
      setFavorites(favorites.filter((fav) => fav !== index));
    } else {
      setFavorites([...favorites, index]);
    }
  };

  // Dummy data for demonstration, replace with actual card data
  const cardData = [
    {
      id: 1,
      cardName: 'Card 1',
    },
    {
      id: 2,
      cardName: 'Card 2',
    },
    // Add more card data as needed
  ];

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Favorite Cards</h2>
        <div className="grid grid-cols-2 gap-4">
          {cardData.map((card, index) => (
            <div key={card.id} className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span>{card.cardName}</span>
              <button onClick={() => toggleFavorite(index)}>
                {favorites.includes(index) ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart />}
              </button>
            </div>
          ))}
        </div>
        <button className="mt-4 text-blue-500 hover:underline" onClick={() => setFavorites([])}>Clear Favorites</button>
        <button className="ml-2 text-blue-500 hover:underline" onClick={() => setFavorites(cardData.map((_, index) => index))}>Select All</button>
      </div>
    </div>
  );
};

export default AddtoFavorite;

